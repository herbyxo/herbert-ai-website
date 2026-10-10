# Homepage section 3, The work (10 Oct 2026): three options drawn on the real
# homepage at 1440x900. The options are built as a lab page (/lab/the-work,
# src/app/components/lab/WorkOptions.js); this script takes each one's markup
# and puts it in place of today's section on the homepage, in the browser only,
# then captures the whole section.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-10"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
IDX = 2  # hero, how it works, the work
async def capture():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        lab = await ctx.new_page(); await lab.goto(BASE + "/lab/the-work", wait_until="networkidle"); await lab.evaluate("document.fonts.ready")
        html = {o: await lab.evaluate(f"document.querySelector('[data-opt={o}] section').outerHTML") for o in "abc"}
        for name in ["today", "a", "b", "c"]:
            pg = await ctx.new_page(); await pg.goto(BASE + "/", wait_until="networkidle"); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(1200)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            if name != "today":
                await pg.evaluate(f"(h) => {{ document.querySelectorAll('main section')[{IDX}].outerHTML = h }}", html[name])
            await pg.evaluate(f"window.scrollTo(0, document.querySelectorAll('main section')[{IDX}].offsetTop)"); await pg.wait_for_timeout(1800)
            await pg.evaluate("Promise.all([...document.images].filter(i => !i.complete).map(i => new Promise(r => { i.onload = i.onerror = r })))")
            el = await pg.evaluate_handle(f"() => document.querySelectorAll('main section')[{IDX}]")
            out[name] = await pg.evaluate("(s) => ({ h: Math.round(s.getBoundingClientRect().height) })", el)
            await el.as_element().screenshot(path=str(A / f"work-{name}.png"))
            print("captured", name, out[name]); await pg.close()
        await b.close()
    return out
Q = chr(0x2019)
def opts(m):
    return [
      ("A", "Two screens, two lines", f"The property dashboard and the accountant demo as real screens side by side, each with what it is and a link; the brokerage hub and the marketing engine as plain lines under them, since neither can be shown as a picture. {m['a']['h']}px. Recommended: this is the section that proves the boards above are real, and a screen proves it faster than a name.", "a"),
      ("B", "Four systems, set plain", f"The four as a ruled list in the style you picked for How it works: what each is, its name, a link. No pictures. The calmest, and the shortest at {m['b']['h']}px, but nothing on it shows the software.", "b"),
      ("C", "The live one large", f"The dashboard a visitor can click into, large on the left, with the other three listed beside it. One picture, the one that is live. {m['c']['h']}px.", "c"),
    ]
def sheet(m):
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><img src="assets-2026-10-10/work-{v}.png"></section>' for n, t, d, v in opts(m))
    t = m["today"]
    return f"""<!doctype html><meta charset=utf-8><title>Homepage: The work</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1150px;margin:0 0 26px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333}} .today{{border-bottom:1px solid #333;padding-bottom:32px;margin-bottom:34px}}</style><body>
<h1>Homepage: The work</h1><p class="intro">The section under How it works, each option drawn in place on the real homepage at 1440 wide and shown whole. The heading and the {chr(0x201C)}All the systems{chr(0x201D)} link are the same in all three. The two screens are the ones the /work page already uses; the brokerage hub is never shown as a picture and the marketing engine is an internal tool, so both stay as words.</p>
<section class="today"><div class="lab"><b>Today</b><span>The May register: cream ground, Bricolage heading, four white cards with a green dot on each tag, {t['h']}px. For comparison, not an option.</span></div><img src="assets-2026-10-10/work-today.png"></section>{rows}</body>"""
async def render(m):
    html = D / "design-pass-site-2026-10-10-the-work.html"; html.write_text(sheet(m))
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-10-the-work.png"), full_page=True); await b.close()
m = asyncio.run(capture()); asyncio.run(render(m)); print("sheet done")
