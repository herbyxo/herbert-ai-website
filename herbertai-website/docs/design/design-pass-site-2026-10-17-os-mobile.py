# Operating Systems: the phone version of Herbert OS (17 Oct 2026). Will picked
# phone layout 2 ("i like 2, but its cropped the employees"), then: "we should
# almost have like a mobile version of the OS an owner can use it from". Built
# as components/runs/os/mobile.js; on phones the section shows the pills and
# the phone version. Captured at 375 for every industry (finished state), then
# the laptop option with the phone over the screen's corner, then the laptop
# as built (no phone) for comparison.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-17"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important} .sticky{position:static!important} .fixed.bottom-0{display:none!important}"
IDS = ["property", "trades", "hospitality", "health", "finance"]
NAMES = ["Property", "Trades", "Hospitality", "Health", "Finance"]
Q = chr(0x2019)
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 375, "height": 812}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
        sec = pg.locator("section", has_text="The whole office, on one screen.").first
        await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(1000)
        pills = sec.get_by_role("tablist", name="Choose an industry").get_by_role("tab")
        for i, o in enumerate(IDS):
            await pills.nth(i).click(); await pg.wait_for_timeout(900)
            await sec.screenshot(path=str(A / f"os-mobile-{o}.png")); print("captured phone", o)
        over = await pg.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
        print("phone overflow:", over)
        await ctx.close()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        await pg.goto(BASE + "/lab/operating-systems", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
        await pg.evaluate("document.querySelector('[data-opt=\"phone-desktop\"] section').scrollIntoView()"); await pg.wait_for_timeout(2000)
        el = await pg.query_selector('[data-opt="phone-desktop"] section')
        await el.screenshot(path=str(A / "os-mobile-laptop-overlap.png")); print("captured laptop overlap")
        await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
        sec = pg.locator("section", has_text="The whole office, on one screen.").first
        await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(1000)
        await sec.screenshot(path=str(A / "os-mobile-laptop-today.png")); print("captured laptop today")
        print("errors:", errs)
        await b.close()
def sheet():
    cells = "".join(f'<div class="cell"><p class="cap"><b>{n}</b></p><img class="phone" src="assets-2026-10-17/os-mobile-{o}.png"></div>' for o, n in zip(IDS, NAMES))
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems: the phone version</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:20px;margin:36px 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1300px;margin:0 0 22px}}
.row{{display:flex;gap:22px;align-items:flex-start;flex-wrap:nowrap}} .cell{{width:300px}} .cap{{margin:0 0 8px;color:#ddd}}
img.phone{{display:block;width:300px;border:1px solid #333}} img.wide{{display:block;width:1300px;border:1px solid #333;margin-bottom:12px}} .lab{{color:#bbb;max-width:1300px;margin-bottom:10px}}</style><body>
<h1>Operating Systems: the phone version of Herbert OS</h1><p class="intro">On phones the section now shows the industries as pills and, under them, the phone version of that industry{Q}s Herbert OS: the day{Q}s numbers, the one thing waiting on the owner, and what was done for them, with the whole team visible. It plays once when an industry is tapped (the approval goes from amber to green and its outcome lands at the top). The close reads {chr(0x201C)}What would your Herbert OS cost?{chr(0x201D)}. Each shown at 375, finished state. Every name and figure is made up.</p>
<div class="row">{cells}</div>
<h2>On a laptop: an option</h2><p class="lab">Whether the phone version also shows on a laptop, over the screen{Q}s corner, so a laptop visitor sees they can run it from their phone. First the option, then the laptop as built (no phone).</p>
<p class="lab"><b>Option: the phone over the screen{Q}s corner</b></p><img class="wide" src="assets-2026-10-17/os-mobile-laptop-overlap.png">
<p class="lab"><b>As built: the laptop screen only</b></p><img class="wide" src="assets-2026-10-17/os-mobile-laptop-today.png">
</body>"""
async def render():
    html = D / "design-pass-site-2026-10-17-os-mobile.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1400, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-17-os-mobile.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
