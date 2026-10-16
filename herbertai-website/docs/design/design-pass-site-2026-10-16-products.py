# Products, Herbert Reach three ways (16 Oct 2026). Lab page /lab/products
# (src/app/components/lab/ProductsOptions.js); today is the homepage where the
# section would go (Operating Systems straight into the founder note). Captured
# at 1440 in the finished state (reduced motion).
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-16"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important} .sticky{position:static!important} .fixed.bottom-0{display:none!important}"
Q = chr(0x2019)
OPTS = [
  ("1", "1. Its own band", f"The one dark section on the page, with the product name as the heading and {chr(0x201C)}by Herbert AI{chr(0x201D)} above it, so it reads as its own brand under the company (the Wispr Flow pattern). The dashboard plays once in view. The dark band also breaks the run of paper sections before the founder. Recommended."),
  ("2", "2. Screen and words", f"The site{Q}s layout A, the dashboard big and the product beside it, under a heading about software built once and run first. Calm and consistent with Operating Systems above it, so the product reads as one more section rather than a brand."),
  ("3", "3. The shelf", "The engine as the one product on a shelf, beside a dashed card saying the operating systems become products once each has run in three to five businesses. Shows the suite ambition; the risk is a roadmap on the homepage that is not yet real."),
]
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
        await pg.evaluate("() => { const s = [...document.querySelectorAll('section')].find(x => x.textContent.includes('Built for the office you actually run.')); window.scrollTo(0, s.getBoundingClientRect().bottom + window.scrollY - 450) }")
        await pg.wait_for_timeout(1500)
        await pg.screenshot(path=str(A / "products-today.png")); print("captured today")
        await pg.goto(BASE + "/lab/products", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
        for o in "123":
            await pg.evaluate(f"document.querySelector('[data-opt=\"{o}\"] section').scrollIntoView()"); await pg.wait_for_timeout(2500)
            sec = await pg.query_selector(f'[data-opt="{o}"] section')
            await sec.screenshot(path=str(A / f"products-{o}.png")); print("captured", o)
        print("errors:", errs)
        await b.close()
def sheet():
    rows = f'<section><div class="lab"><b>Today</b><span>No Products section: Operating Systems runs straight into the founder note.</span></div><img src="assets-2026-10-16/products-today.png"></section>'
    rows += "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><img src="assets-2026-10-16/products-{k}.png"></section>' for k, n, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Products: Herbert Reach three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}}</style><body>
<h1>Products: Herbert Reach three ways</h1><p class="intro">Homepage section 5. Herbert AI is the company and its own software carries its own name, the Wispr AI and Wispr Flow pattern. First the marketing engine under the placeholder name Herbert Reach (not final; the business-name check comes before it ships), shown as early access rather than a paywall while it runs Herbert AI{Q}s own ads. The dashboard is the one built for The Work on 13 October. The copy reuses the engine page{Q}s lines and claims no results. The link goes to the engine{Q}s example page for now; an early-access form on that page is a later build. Each option in place at 1440, finished state.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-16-products.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-16-products.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
