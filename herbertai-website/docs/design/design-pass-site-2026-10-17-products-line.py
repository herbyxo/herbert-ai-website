# Products details, 1 of 5: the line under the name three ways (17 Oct 2026).
# Drawn on the homepage band at 1440 (finished state); only the line changes.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-17"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019); L = chr(0x201C); R = chr(0x201D)
TODAY = "Ads that run themselves against real results: written, tested and paused by the system, with anything new held for you to approve."
OPTS = [
  ("today", "Today", TODAY, "The engine page{0}s sentence. Accurate, but three lines under a 64px name, and the facts below repeat half of it."),
  ("1", "1. Runs itself", "Ads that run themselves. You approve anything new.", "Two short sentences: what it does and the rule that keeps the owner in charge. Ties to the site{0}s {1}Built to run itself{2} and to the AI Employees heading{0}s rhythm; the facts below carry the detail. Recommended."),
  ("2", "2. What it does, plainly", "Your Google ads written, tested and paused against what they bring in.", "One plain sentence of the job, no approval line (the early-access note and the facts carry the rest). Concrete; less of a line, more of a description."),
  ("3", "3. The story", "The ad engine Herbert AI runs its own marketing on.", "Leads with the dogfood: Herbert AI uses it first. Honest and different from any ad tool{0}s pitch, but it says who uses it before what it does."),
]
JS = """([today, text]) => { const p = [...document.querySelectorAll('p')].find(x => x.textContent.trim() === today); p.textContent = text; }"""
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        for key, name, text, note in OPTS:
            await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
            band = pg.locator("section", has_text="by Herbert AI").first
            await band.scroll_into_view_if_needed(); await pg.wait_for_timeout(1500)
            await pg.evaluate(JS, [TODAY, text]); await pg.wait_for_timeout(300)
            await band.screenshot(path=str(A / f"products-line-{key}.png")); print("captured", key)
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span class="h2">{L}{t}{R}</span><span>{d.format(Q, L, R)}</span></div><img src="assets-2026-10-17/products-line-{k}.png"></section>' for k, n, t, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Products: the line three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:17px;margin:4px 0}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}}</style><body>
<h1>Products: the line under the name three ways</h1><p class="intro">Detail 1 of 5 for the Products band (then the facts, the early-access note, the close, the phone layout). The band as built at 1440; only the line under {L}Herbert Reach{R} changes. The dashboard{Q}s bar now says Herbert Reach, not Marketing engine.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-17-products-line.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-17-products-line.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
