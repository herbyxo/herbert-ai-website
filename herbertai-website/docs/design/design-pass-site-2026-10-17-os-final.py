# Operating Systems as built, final (17 Oct 2026): every industry at 1440
# (laptop screen) and at 375 (the phone version), finished state, with no
# "example figures" label anywhere and the phone version on phones only.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-17"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
IDS = ["property", "trades", "hospitality", "health", "finance"]
NAMES = ["Property", "Trades", "Hospitality", "Health", "Finance"]
Q = chr(0x2019)
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []; labels = 0
        for vw, vh, tag, name in [(1440, 900, "laptop", "Operating systems"), (375, 812, "phone", "Choose an industry")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
            sec = pg.locator("section", has_text="The whole office, on one screen.").first
            await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(1000)
            tabs = sec.get_by_role("tablist", name=name).get_by_role("tab")
            for i, o in enumerate(IDS):
                await tabs.nth(i).click(); await pg.wait_for_timeout(800)
                labels += await sec.get_by_text("Example figures").count()
                await sec.screenshot(path=str(A / f"os-final-{tag}-{o}.png")); print("captured", tag, o)
            over = await pg.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
            print(tag, "overflow:", over)
            await ctx.close()
        print("example-figures labels found:", labels, "errors:", errs)
        await b.close()
def sheet():
    laptops = "".join(f'<section><div class="lab"><b>{n}</b></div><img class="wide" src="assets-2026-10-17/os-final-laptop-{o}.png"></section>' for o, n in zip(IDS, NAMES))
    phones = "".join(f'<div class="cell"><p class="cap"><b>{n}</b></p><img class="phone" src="assets-2026-10-17/os-final-phone-{o}.png"></div>' for o, n in zip(IDS, NAMES))
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems, as built</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:20px;margin:30px 0 12px;font-weight:600}} .intro{{color:#aaa;max-width:1300px;margin:0 0 22px}}
section{{margin-bottom:30px}} .lab b{{font-size:18px}} img.wide{{display:block;width:1300px;border:1px solid #333;margin-top:8px}}
.row{{display:flex;gap:22px;align-items:flex-start}} .cell{{width:244px}} .cap{{margin:0 0 8px}} img.phone{{display:block;width:244px;border:1px solid #333}}</style><body>
<h1>Operating Systems, as built</h1><p class="intro">Every pick in place: {chr(0x201C)}The whole office, on one screen.{chr(0x201D)}; the industry big with the jobs that run by themselves under it; the title {chr(0x201C)}Herbert OS for {chr(0x2026)}{chr(0x201D)}; the figure as one sentence for a named example business, no tag and no {chr(0x201C)}example figures{chr(0x201D)} label anywhere; one close, {chr(0x201C)}What would your Herbert OS cost?{chr(0x201D)}, to pricing. On phones the industries are pills and the screen is the phone version of Herbert OS. Laptop first, every industry; then the phone, every industry.</p>
<h2>Laptop, 1440</h2>{laptops}
<h2>Phone, 375</h2><div class="row">{phones}</div></body>"""
async def render():
    html = D / "design-pass-site-2026-10-17-os-final.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1400, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-17-os-final.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
