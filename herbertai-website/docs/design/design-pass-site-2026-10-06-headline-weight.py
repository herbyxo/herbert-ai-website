# Hero detail 2, headline weight and letter spacing (6 Oct 2026): three options
# drawn on the real homepage by changing the page in the browser only. The site
# loads Geist 400 to 700, so option 3 pulls Geist 800 from Google Fonts into the
# page for the capture; picking it means adding 800 to layout.js.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-06"
URL = "http://localhost:3000/"
VARIANTS = {"today": (None, None), "weight-1": ("600", "-0.04em"), "weight-2": ("500", "-0.03em"), "weight-3": ("800", "-0.05em")}
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, (w, ls) in VARIANTS.items():
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); await pg.goto(URL, wait_until="networkidle"); await pg.wait_for_timeout(1500)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            if w == "800":
                await pg.add_style_tag(url="https://fonts.googleapis.com/css2?family=Geist:wght@800&display=block")
                await pg.evaluate("document.fonts.load('800 72px Geist')"); await pg.wait_for_timeout(1200)
            if w:
                await pg.evaluate(f"() => {{ const h = document.querySelector('h1'); h.style.fontWeight = '{w}'; h.style.letterSpacing = '{ls}' }}")
            await pg.wait_for_timeout(300)
            info = await pg.evaluate("() => { const h = document.querySelector('h1'); const cs = getComputedStyle(h); return cs.fontWeight + ' ' + cs.letterSpacing + ' ' + [...document.fonts].filter(f => f.family.includes('Geist') && f.weight == cs.fontWeight && f.status === 'loaded').length }")
            r = await pg.evaluate("() => { const e = document.querySelector('h1').getBoundingClientRect(); return {x: e.x, y: e.y, w: e.width, h: e.height} }")
            await pg.screenshot(path=str(A / f"headline-{name}-zoom.png"), clip={"x": r["x"] - 20, "y": r["y"] - 16, "width": 470, "height": r["h"] + 32})
            await pg.screenshot(path=str(A / f"headline-{name}-full.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 900})
            await ctx.close(); print("captured", name, "| weight, spacing, loaded faces:", info)
        await b.close()
OPTS = [
  ("1", "Semibold, slightly looser", "Geist 600 at -0.04em. Still strong, a touch calmer, closer to the weight of the board’s own labels.", "weight-1"),
  ("2", "Medium, open", "Geist 500 at -0.03em. How product companies set big headlines now: the quietest, lets the board carry the page.", "weight-2"),
  ("3", "Extra bold, tighter", "Geist 800 at -0.05em. The heaviest, closest to the punch of the old site’s headline. Needs one more font weight loaded.", "weight-3"),
]
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><div class="imgs"><img class="zoom" src="assets-2026-10-06/headline-{v}-zoom.png"><img class="full" src="assets-2026-10-06/headline-{v}-full.png"></div></section>' for n, t, d, v in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Hero detail 2: headline weight</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:32px}} .lab{{margin-bottom:10px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.imgs{{display:flex;gap:18px;align-items:flex-start}} .imgs img{{border:1px solid #333;display:block;background:#FAFAF8}} .zoom{{width:470px}} .full{{width:900px}}
.today{{border-bottom:1px solid #333;padding-bottom:28px;margin-bottom:30px}}</style><body><h1>Hero detail 2: headline weight and letter spacing</h1>
<p class="intro">Same words, same size (72px at this width), only the weight and the space between letters change. The headline is shown at full size on the left and in place on the right.</p>
<section class="today"><div class="lab"><b>Today</b><span>Geist 700 (bold) at -0.045em. For comparison, not an option.</span></div><div class="imgs"><img class="zoom" src="assets-2026-10-06/headline-today-zoom.png"><img class="full" src="assets-2026-10-06/headline-today-full.png"></div></section>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-06-headline-weight.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-06-headline-weight.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
