# Products, three ways, redrawn (17 Oct 2026). Lab page /lab/products. Each
# option at 1440 and at 375 (finished state, reduced motion); today is the
# homepage where the section would go (Operating Systems into the founder note).
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-17"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important} .sticky{position:static!important} .fixed.bottom-0{display:none!important}"
Q = chr(0x2019); L = chr(0x201C); R = chr(0x201D)
OPTS = [
  ("1", "1. Its own band", f"The one dark section on the page. {L}by Herbert AI{R} over {L}Herbert Reach{R} as the heading, the line, three facts, the early-access pill and why, the dashboard playing beside it. The product reads as its own brand under the company, the Wispr Flow pattern, and the band breaks the run of paper sections before the founder. Recommended."),
  ("2", "2. Screen and words", f"The site{Q}s usual layout on paper, under {L}Software we build once, and run ourselves first.{R} Calm and consistent with Operating Systems above it; the product reads as one more section rather than a brand."),
  ("3", "3. The shelf", f"The Herbert products side by side under {L}The Herbert products.{R}: Herbert Reach in early access, Herbert OS from $25,000 with its five industries. Shows the family; the risk is that Herbert OS repeats the section right above it."),
]
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
            await pg.evaluate(f"() => {{ const s = [...document.querySelectorAll('section')].find(x => x.textContent.includes('The whole office, on one screen.') && x.getBoundingClientRect().height > 0); window.scrollTo(0, s.getBoundingClientRect().bottom + window.scrollY - {int(vh * 0.45)}) }}")
            await pg.wait_for_timeout(1200)
            await pg.screenshot(path=str(A / f"products-today-{tag}.png")); print("captured today", tag)
            await pg.goto(BASE + "/lab/products", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
            for o in "123":
                await pg.evaluate(f"document.querySelector('[data-opt=\"{o}\"] section').scrollIntoView()"); await pg.wait_for_timeout(2000)
                sec = await pg.query_selector(f'[data-opt="{o}"] section')
                await sec.screenshot(path=str(A / f"products-{o}-{tag}.png")); print("captured", o, tag)
            over = await pg.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
            print(tag, "overflow:", over)
            await ctx.close()
        print("errors:", errs)
        await b.close()
def row(key, title, note):
    return f'<section><div class="lab"><b>{title}</b><span>{note}</span></div><div class="pair"><img class="wide" src="assets-2026-10-17/products-{key}-laptop.png"><img class="phone" src="assets-2026-10-17/products-{key}-phone.png"></div></section>'
def sheet():
    rows = row("today", "Today", "No Products section: Operating Systems runs straight into the founder note.")
    rows += "".join(row(k, n, d) for k, n, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Products: three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1100px;border:1px solid #333}} img.phone{{display:block;width:280px;border:1px solid #333}}</style><body>
<h1>Products: three ways</h1><p class="intro">Homepage section 5, redrawn on the current page. Herbert AI is the company and its own software carries its own name: Herbert Reach (the marketing engine, placeholder name, early access while it runs Herbert AI{Q}s own ads) and now Herbert OS. Each option at laptop width, with the phone beside it. The copy reuses the engine page{Q}s lines and claims no results; no {L}example figures{R} labels.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-17-products.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-17-products.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
