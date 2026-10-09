# Homepage section 2, How it works (10 Oct 2026): three options drawn on the
# real homepage at 1440x900. The options are built as a lab page that runs
# (/lab/how-it-works, src/app/components/lab/HowItWorksOptions.js); this script
# takes each one's finished state (reduced motion) and puts it in place of
# today's section on the homepage, in the browser only, then captures the whole
# section and counts its words.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-10"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
SEC = "() => document.querySelectorAll('main section')[1]"
async def capture():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        lab = await ctx.new_page(); await lab.goto(BASE + "/lab/how-it-works", wait_until="networkidle")
        await lab.evaluate("document.fonts.ready")
        for o in "abc":  # scroll each into view so its boards start, then take the finished markup
            await lab.evaluate(f"document.querySelector('[data-opt={o}] section').scrollIntoView()"); await lab.wait_for_timeout(800)
            for el in await lab.query_selector_all(f"[data-opt={o}] [role], [data-opt={o}] .rounded-xl"):
                await el.scroll_into_view_if_needed(); await lab.wait_for_timeout(300)
        await lab.wait_for_timeout(1500)
        html = {o: await lab.evaluate(f"document.querySelector('[data-opt={o}] section').outerHTML") for o in "abc"}
        for name in ["today", "a", "b", "c"]:
            pg = await ctx.new_page(); await pg.goto(BASE + "/", wait_until="networkidle"); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(1200)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            if name != "today":
                await pg.evaluate("(h) => { const s = document.querySelectorAll('main section')[1]; s.outerHTML = h }", html[name]); await pg.wait_for_timeout(400)
            else:  # today's section reveals on scroll: bring it in and let it settle
                await pg.evaluate("window.scrollTo(0, document.querySelectorAll('main section')[1].offsetTop)"); await pg.wait_for_timeout(1800)
            el = await pg.evaluate_handle(SEC)
            info = await pg.evaluate("(s) => { const n = (t) => t.split(/\\s+/).filter(Boolean).length; const inWin = [...s.querySelectorAll('.rounded-xl')].reduce((a, w) => a + n(w.innerText), 0); return { h: Math.round(s.getBoundingClientRect().height), words: n(s.innerText) - inWin, inWin } }", el)
            await el.as_element().screenshot(path=str(A / f"hiw-{name}.png"))
            out[name] = info; print("captured", name, info); await pg.close()
        await b.close()
    return out
Q = chr(0x2019); L = chr(0x201C); R = chr(0x201D)
def opts(m):
    t = m["today"]
    return [
      ("A", "The first month as a board", f"One product window: an example office{Q}s first month, from the audit on day 1 to the first AI employee live on day 18, with the system queued for month 2 and the price beside each step. The shortest section ({m['a']['h']}px against today{Q}s {t['h']}px) and it runs like the hero, but it is a second board straight under the first. {m['a']['words']} words of reading outside the window.", "a"),
      ("B", "Three steps, set plain", f"Today{Q}s three steps and words, moved onto the paper ground and Geist. Nothing moves. The safest change, and the most reading: {m['b']['words']} words.", "b"),
      ("C", "Each step shows what you get", f"Each step beside the thing it produces: the audit{Q}s written page, the first AI employee running, the whole office{Q}s board. It shows the product at every step and cuts the reading to {m['c']['words']} words, though the windows add {m['c']['inWin']} of their own, and it is the tallest section ({m['c']['h']}px). Recommended.", "c"),
    ]
def sheet(m):
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><img src="assets-2026-10-10/hiw-{v}.png"></section>' for n, t, d, v in opts(m))
    t = m["today"]
    return f"""<!doctype html><meta charset=utf-8><title>Homepage: How it works</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1150px;margin:0 0 26px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px;max-width:1150px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333}} .today{{border-bottom:1px solid #333;padding-bottom:32px;margin-bottom:34px}}</style><body>
<h1>Homepage: How it works</h1><p class="intro">The section under the hero, each option drawn in place on the real homepage at 1440 wide and shown whole, in its finished state. The heading, the audit button and the pricing link are the same in all three. The running version is the lab page.</p>
<section class="today"><div class="lab"><b>Today</b><span>The May register: cream ground, Bricolage heading, three columns, {t['h']}px tall. {t['words']} words of reading. For comparison, not an option.</span></div><img src="assets-2026-10-10/hiw-today.png"></section>{rows}</body>"""
async def render(m):
    html = D / "design-pass-site-2026-10-10-how-it-works.html"; html.write_text(sheet(m))
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-10-how-it-works.png"), full_page=True); await b.close()
m = asyncio.run(capture()); asyncio.run(render(m)); print("sheet done")
