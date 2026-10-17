# Products built (17 Oct 2026): the dark band at 1440 and 375 (finished state),
# plus the page from Operating Systems through Products into the founder note
# at 1440, to see the band in the page's rhythm.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-17"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019); L = chr(0x201C); R = chr(0x201D)
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
            band = pg.locator("section", has_text="by Herbert AI").first
            await band.scroll_into_view_if_needed(); await pg.wait_for_timeout(1500)
            await band.screenshot(path=str(A / f"products-built-{tag}.png")); print("captured band", tag)
            if tag == "laptop":
                await pg.evaluate("() => { const s = [...document.querySelectorAll('section')].find(x => x.textContent.includes('The whole office, on one screen.')); window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY) }")
                await pg.wait_for_timeout(800)
                os = pg.locator("section", has_text="The whole office, on one screen.").first
                ob = await os.bounding_box(); bb = await band.bounding_box()
                fn = pg.locator("section", has_text="Who builds it").first
                fb = await fn.bounding_box()
                top = ob["y"]; bottom = (fb["y"] + min(fb["height"], 380)) if fb else bb["y"] + bb["height"]
                await pg.screenshot(path=str(A / "products-built-flow.png"), full_page=True, clip={"x": 0, "y": top + await pg.evaluate("window.scrollY"), "width": vw, "height": bottom - top})
                print("captured flow")
            await ctx.close()
        print("errors:", errs)
        await b.close()
def sheet():
    return f"""<!doctype html><meta charset=utf-8><title>Products, built</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:19px;margin:30px 0 10px;font-weight:600}} .intro{{color:#aaa;max-width:1300px;margin:0 0 22px}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1060px;border:1px solid #333}} img.phone{{display:block;width:300px;border:1px solid #333}} img.flow{{display:block;width:800px;border:1px solid #333}}</style><body>
<h1>Products, built</h1><p class="intro">Homepage section 5 as built from your pick: its own dark band, {L}by Herbert AI{R} over {L}Herbert Reach{R}, early access while it runs Herbert AI{Q}s own ads. On a laptop the marketing dashboard plays once in view; on a phone the band shows Herbert Reach as the owner would run it from their phone (the month{Q}s numbers, the one campaign waiting on them, what the engine did), the same rule as Herbert OS. Then the band in the page: Operating Systems above, the founder note below.</p>
<h2>The band, laptop and phone</h2><div class="pair"><img class="wide" src="assets-2026-10-17/products-built-laptop.png"><img class="phone" src="assets-2026-10-17/products-built-phone.png"></div>
<h2>In the page, 1440</h2><img class="flow" src="assets-2026-10-17/products-built-flow.png"></body>"""
async def render():
    html = D / "design-pass-site-2026-10-17-products-built.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-17-products-built.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
