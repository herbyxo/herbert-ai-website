# The work, option C's large visual (13 Oct 2026). Will picked C and asked for
# a different visual. Three options built as a lab page (/lab/the-work-visual,
# src/app/components/lab/WorkVisualOptions.js) in option C's layout with the
# tighter spacing; this script captures each section whole in its finished
# state (reduced motion) at 1440, plus today's C with the old screenshot.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-13"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); await pg.goto(BASE + "/lab/the-work-visual", wait_until="networkidle"); await pg.evaluate("document.fonts.ready")
        HIDE = "nextjs-portal{display:none!important} .sticky{position:static!important} .fixed.bottom-0{display:none!important}"
        await pg.add_style_tag(content=HIDE)
        for o in "abc":
            await pg.evaluate(f"document.querySelector('[data-opt={o}] section').scrollIntoView()"); await pg.wait_for_timeout(2500)
            for fr in pg.frames[1:]:
                try: await fr.add_style_tag(content="nextjs-portal{display:none!important}")
                except Exception: pass
            await pg.wait_for_timeout(300)
            el = await pg.query_selector(f"[data-opt={o}] section")
            await el.screenshot(path=str(A / f"work-visual-{o}.png")); print("captured", o)
        lab = await ctx.new_page(); await lab.goto(BASE + "/lab/the-work", wait_until="networkidle"); await lab.evaluate("document.fonts.ready")
        await lab.add_style_tag(content=HIDE)
        el = await lab.query_selector("[data-opt=c] section"); await el.scroll_into_view_if_needed(); await lab.wait_for_timeout(800)
        await el.screenshot(path=str(A / "work-visual-was.png")); print("captured was")
        await b.close()
Q = chr(0x2019); L = chr(0x201C); R = chr(0x201D)
OPTS = [
  ("1", "The accountant demo, playing", f"The demo itself in a frame, running its tax season right there in the section: checklists going out, reminders, files marked ready. It is on this site, so nothing about it can go stale or show a warning, and it is the one thing on the page that moves the way the hero does. Clicking opens the full demo. The dashboard moves into the list. Recommended.", "a"),
  ("2", "The dashboard, cleaned up", f"The property dashboard{Q}s requests table as a still, minus the developer warning it shows today. The real software, but its own colours (yellow, blue, green and red tags) sit oddly on this site, and its requests are dated late May, so the warning and the dates need fixing in the dashboard before it ships.", "b"),
  ("3", "The property office as a board", f"The property office{Q}s morning drawn in the site{Q}s own board style, matching the hero: requests logged, a landlord approval waiting, then approved. Clicking opens the real dashboard. Consistent, but it is a drawing of the software, not the software.", "c"),
]
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><img src="assets-2026-10-13/work-visual-{v}.png"></section>' for n, t, d, v in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>The work: option C, the large visual</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333}} .today{{border-bottom:1px solid #333;padding-bottom:32px;margin-bottom:34px}}</style><body>
<h1>The work: option C, the large visual</h1><p class="intro">Option C as you picked it, one system large and the rest listed beside it, with three different large visuals. Shown whole at 1440 in their finished state, with the tighter spacing from How it works. 1 and 3 move; they run at /lab/the-work-visual.</p>
<section class="today"><div class="lab"><b>C as drawn</b><span>The old dashboard screenshot. For comparison, not an option.</span></div><img src="assets-2026-10-13/work-visual-was.png"></section>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-13-work-visual.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-13-work-visual.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
