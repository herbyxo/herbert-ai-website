# How it works, detail 1: the words (11 Oct 2026). Three options drawn on the
# real homepage at 1440x900 by changing the page in the browser only: each
# step's paragraph is replaced, the titles and prices stay. Captures the whole
# section and counts the words in the three step paragraphs.
import asyncio, json
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-11"; A.mkdir(exist_ok=True)
URL = "http://localhost:3000/"
Q = chr(0x2019)
TEXT = {
  "w-1": [
    "45 minutes with Will on how your business runs. Within two business days you get a written page: the three jobs costing you most, in your own figures.",
    "One AI employee for the top job, live on your real data in 14 days. Your team approves anything that goes out.",
    f"The next jobs follow, on one system your team works out of and your business owns. The pilot{Q}s $3,500 comes off.",
  ],
  "w-2": [
    "45 minutes with Will, then a written page within two business days.",
    "One AI employee for one job, live in 14 days.",
    "Your files, comms and follow-ups on one system you own.",
  ],
  "w-3": [
    ["45 minutes with Will", "A written page in two business days", "The three jobs costing you most, in your figures"],
    ["One AI employee, one job", "Live on your real data in 14 days", "Your team approves what goes out"],
    ["Files, comms and follow-ups on one system", "Your business owns it", f"The pilot{Q}s $3,500 comes off"],
  ],
}
SWAP = """(t) => { const s = document.querySelectorAll('main section')[1];
  [...s.querySelectorAll('h3')].forEach((h, i) => { const p = h.nextElementSibling; const v = t[i];
    if (Array.isArray(v)) { const ul = document.createElement('ul'); ul.style.cssText = 'margin:0;padding:0;list-style:none';
      v.forEach(x => { const li = document.createElement('li'); li.textContent = x; li.style.cssText = 'font-size:16px;line-height:1.45;color:#444;padding:8px 0;border-top:1px solid rgba(17,17,17,.08)'; ul.appendChild(li) });
      p.replaceWith(ul) } else { p.textContent = v } }) }"""
COUNT = """() => { const s = document.querySelectorAll('main section')[1]; return [...s.querySelectorAll('h3')].map(h => h.nextElementSibling.innerText.split(/\\s+/).filter(Boolean).length) }"""
async def capture():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name in ["today", "w-1", "w-2", "w-3"]:
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); await pg.goto(URL, wait_until="networkidle"); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(1200)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            if name != "today":
                await pg.evaluate(SWAP, TEXT[name]); await pg.wait_for_timeout(300)
            el = await pg.evaluate_handle("() => document.querySelectorAll('main section')[1]")
            words = await pg.evaluate(COUNT); h = await pg.evaluate("(s) => Math.round(s.getBoundingClientRect().height)", el)
            grid = await pg.evaluate_handle("() => document.querySelectorAll('main section')[1].querySelector('h3').closest('.grid')")
            box = await grid.as_element().bounding_box()
            await pg.screenshot(path=str(A / f"hiw-words-{name}.png"), full_page=True, clip={"x": box["x"] - 32, "y": box["y"] - 28, "width": box["width"] + 64, "height": box["height"] + 56})
            out[name] = {"words": words, "total": sum(words), "h": h}; print("captured", name, out[name]); await ctx.close()
        await b.close()
    return out
def opts(m):
    return [
      ("1", "Trimmed", f"Each step in two short sentences, keeping every fact a buyer needs: what happens, how long, what they get. {m['w-1']['total']} words across the three, against today{Q}s {m['today']['total']}. Recommended: it reads in one pass and loses nothing that matters.", "w-1"),
      ("2", "One line each", f"One sentence per step, {m['w-2']['total']} words in all. The fastest read; the price lines and the pricing link carry the rest, but the audit loses its {chr(0x201C)}three jobs, in your own figures{chr(0x201D)} detail and the pilot loses {chr(0x201C)}your team approves what goes out{chr(0x201D)}.", "w-2"),
      ("3", "Three facts each", f"Each step as three short ruled lines instead of a paragraph, {m['w-3']['total']} words in all. Scans like a spec sheet; the most structured, and the least like a person talking.", "w-3"),
    ]
def sheet(m):
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><img src="assets-2026-10-11/hiw-words-{v}.png"></section>' for n, t, d, v in opts(m))
    t = m["today"]
    return f"""<!doctype html><meta charset=utf-8><title>How it works, detail 1: the words</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333}} .today{{border-bottom:1px solid #333;padding-bottom:32px;margin-bottom:34px}}</style><body>
<h1>How it works, detail 1: the words</h1><p class="intro">The section as built from option B, drawn on the real homepage at 1440 wide. Shown close up: the three steps only. Only each step{Q}s paragraph changes; the heading above, the step titles, the prices and the button below stay as they are.</p>
<section class="today"><div class="lab"><b>Today</b><span>The words carried over from the old site: {t['words'][0]}, {t['words'][1]} and {t['words'][2]} words, {t['total']} in all. For comparison, not an option.</span></div><img src="assets-2026-10-11/hiw-words-today.png"></section>{rows}</body>"""
async def render(m):
    html = D / "design-pass-site-2026-10-11-hiw-words.html"; html.write_text(sheet(m))
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-11-hiw-words.png"), full_page=True); await b.close()
m = asyncio.run(capture()); asyncio.run(render(m)); print("sheet done")
