# Products details, 1 of 6: the line under the name, from the settled
# definition (code/marketing-engine/docs/REACH-DEFINITION.md, 17 Oct 2026).
# Drawn on the homepage band at 1440 and 375 (finished state); only the line
# changes. The facts and the dashboard are still the ads-only ones; they are
# details 2 and 3.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-19"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019); L = chr(0x201C); R = chr(0x201D)
TODAY = "Ads that run themselves against real results: written, tested and paused by the system, with anything new held for you to approve."
OPTS = [
  ("today", "Today", TODAY, "Written before the definition: describes an ad tool, which Herbert Reach no longer is."),
  ("1", "1. The department", "Your whole marketing department. You approve what goes out.", "The definition{0}s one line, cut to its two halves: what it is, and the rule that keeps the owner in charge (and keeps the site{0}s promise true). Recommended."),
  ("2", "2. The start", "Type in your business name. Herbert Reach does the marketing.", "Leads with the premise: one input, everything else done. The most distinctive of the three; it says less about the approval."),
  ("3", "3. The team", "A marketing department of AI employees, on one screen.", "Ties Herbert Reach to the AI Employees section above: the same idea, sold as one product. Explains the how; the least plain of the three."),
]
JS = """([today, text]) => { const p = [...document.querySelectorAll('p')].find(x => x.textContent.trim() === today); p.textContent = text; }"""
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, text, note in OPTS:
                await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
                band = pg.locator("section", has_text="by Herbert AI").first
                await band.scroll_into_view_if_needed(); await pg.wait_for_timeout(1200)
                await pg.evaluate(JS, [TODAY, text]); await pg.wait_for_timeout(300)
                if tag == "laptop":
                    await band.screenshot(path=str(A / f"products-line-{key}-{tag}.png"))
                else:
                    box = await band.bounding_box()
                    await pg.screenshot(path=str(A / f"products-line-{key}-{tag}.png"), clip={"x": 0, "y": box["y"] + await pg.evaluate("window.scrollY"), "width": vw, "height": min(box["height"], 640)}, full_page=True)
                print("captured", key, tag)
            await ctx.close()
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span class="h2">{L}{t}{R}</span><span>{d.format(Q)}</span></div><div class="pair"><img class="wide" src="assets-2026-10-19/products-line-{k}-laptop.png"><img class="phone" src="assets-2026-10-19/products-line-{k}-phone.png"></div></section>' for k, n, t, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Products: the line, from the definition</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:17px;margin:4px 0}} .lab span{{color:#bbb}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1100px;border:1px solid #333}} img.phone{{display:block;width:280px;border:1px solid #333}}</style><body>
<h1>Products: the line under the name, from the definition</h1><p class="intro">Detail 1 of 6 for the Products band, restarted now Herbert Reach is defined: a small business{Q}s whole marketing department, any industry, the owner approving only new ads and spend. Only the line changes here; the facts and the dashboard are still the ads-only ones from before the definition and are the next two details. Laptop with the top of the phone layout beside it.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-19-products-line.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-19-products-line.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
