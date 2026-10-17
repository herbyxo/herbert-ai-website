# Operating Systems as built after its details pass (17 Oct 2026): the homepage
# section with every industry clicked in turn at 1440 (finished state, reduced
# motion), then the phone layout at 375.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-17"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
IDS = ["property", "trades", "hospitality", "health", "finance"]
Q = chr(0x2019)
NOTES = {
  "property": "Herbert OS for Property. The owner{0}s Monday page; under it the figure as one sentence for an agency of ten with 400 rentals, and {1}Yours come out of the audit.{2}",
  "trades": "Herbert OS for Trades. The dispatch board with the owner{0}s 7am figures; every quote request answered within a minute, for a 10-person air conditioning business.",
  "hospitality": "Herbert OS for Hospitality. The functions board with the till strip; 11 to 15 hours a week back and the margin kept or won, for a 110-seat restaurant.",
  "health": "Herbert OS for Health. The appointment book with the owner{0}s weekly page; three to five cancelled slots filled a week, for a six-practitioner clinic.",
  "finance": "Herbert OS for Finance. The season board; 420 to 580 staff hours a year back, most of them in tax season, for a six-person practice. Hours, never dollars.",
}
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
        sec = pg.locator("section", has_text="The whole office, on one screen.").first
        await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(1200)
        tabs = sec.get_by_role("tab")
        for i, o in enumerate(IDS):
            await tabs.nth(i).click(); await pg.wait_for_timeout(1200)
            await sec.screenshot(path=str(A / f"os-built-{o}.png")); print("captured", o)
        await ctx.close()
        ctx = await b.new_context(viewport={"width": 375, "height": 812}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
        sec = pg.locator("section", has_text="The whole office, on one screen.").first
        await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(1000)
        await sec.screenshot(path=str(A / "os-built-phone.png")); print("captured phone")
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{o.title()}</b><span>{NOTES[o].format(Q, chr(0x201C), chr(0x201D))}</span></div><img src="assets-2026-10-17/os-built-{o}.png"></section>' for o in IDS)
    rows += '<section><div class="lab"><b>Phone, as it is today</b><span>The laptop layout stacked at 375: the screen scaled to a quarter. The phone board (three ways) is still waiting on your pick.</span></div><img class="phone" src="assets-2026-10-17/os-built-phone.png"></section>'
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems, as built</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}} img.phone{{width:375px}}</style><body>
<h1>Operating Systems, as built</h1><p class="intro">The section after its details pass, every pick in place: heading {chr(0x201C)}The whole office, on one screen.{chr(0x201D)}; the list as the industry big with the jobs that run by themselves under it; the title {chr(0x201C)}Herbert OS for {chr(0x2026)}{chr(0x201D)} with no subtitle; the figure as one sentence for a named example business, closed with {chr(0x201C)}Yours come out of the audit.{chr(0x201D)}; one close, the rung and its price, under the list; no Built tag and no per-screen links. Calm until clicked, then that screen plays once. Every name and figure is made up.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-17-operating-systems-built.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-17-operating-systems-built.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
