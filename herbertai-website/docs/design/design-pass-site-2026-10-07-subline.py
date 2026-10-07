# Hero detail 4, the sub-line (7 Oct 2026): three options drawn on the real
# homepage at 1440 by changing the page in the browser only. The words stay
# ("Custom software and AI for small businesses, built in Adelaide."); only the
# size, colour and position change. Since alignment option 3 the button sits on
# the board's bottom edge, so the space in the text column is flexible and where
# the sub-line sits decides where that space goes.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-07"; A.mkdir(exist_ok=True)
URL = "http://localhost:3000/"
CORE = "const h1 = document.querySelector('h1'); const p = h1.parentElement.querySelector('p'); const btn = h1.parentElement.querySelector('a');"
VARIANTS = {
  "today": "",
  "sub-1": "Object.assign(p.style, { fontSize: '17px', color: '#666', maxWidth: '36ch' });",
  "sub-2": "Object.assign(p.style, { marginTop: 'auto', marginBottom: '28px' }); btn.style.marginTop = '0';",
  "sub-3": "Object.assign(p.style, { fontSize: '22px', color: '#111', lineHeight: '1.4', maxWidth: '30ch', marginTop: '32px' });",
}
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, js in VARIANTS.items():
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); await pg.goto(URL, wait_until="networkidle"); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(1500)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            if js:
                await pg.evaluate("() => {" + CORE + js + "}"); await pg.wait_for_timeout(500)
            info = await pg.evaluate("() => {" + CORE + "const b = document.querySelector('[role=group]').getBoundingClientRect(); return { btnVsBoard: Math.round(btn.getBoundingClientRect().bottom - b.bottom), lines: Math.round(p.getBoundingClientRect().height / parseFloat(getComputedStyle(p).lineHeight)) } }")
            r = await pg.evaluate("() => { const e = document.querySelector('h1').parentElement.getBoundingClientRect(); return {x: e.x, y: e.y, w: e.width, h: e.height} }")
            await pg.screenshot(path=str(A / f"subline-{name}-zoom.png"), clip={"x": r["x"] - 20, "y": r["y"] - 16, "width": r["w"] + 30, "height": r["h"] + 60})
            await pg.screenshot(path=str(A / f"subline-{name}-full.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 760})
            await ctx.close(); print("captured", name, info)
        await b.close()
OPTS = [
  ("1", "Quieter", "17px in a lighter grey, right under the headline. The headline and the board do the talking; the sub-line reads as a caption.", "sub-1"),
  ("2", "Moved down to the button", "Same size, but it sits just above the button, so the headline stands alone at the top and the sub-line and button read as one group. The space moves between the headline and the sub-line. Recommended.", "sub-2"),
  ("3", "Bigger, in ink", "22px in the headline’s black, right under it, so it reads as the second half of the statement. The loudest; it competes a little with the board.", "sub-3"),
]
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><div class="imgs"><img class="zoom" src="assets-2026-10-07/subline-{v}-zoom.png"><img class="full" src="assets-2026-10-07/subline-{v}-full.png"></div></section>' for n, t, d, v in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Hero detail 4: the sub-line</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1150px;margin:0 0 26px}}
section{{margin-bottom:32px}} .lab{{margin-bottom:10px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.imgs{{display:flex;gap:18px;align-items:flex-start}} .imgs img{{border:1px solid #333;display:block;background:#FAFAF8}} .zoom{{width:420px}} .full{{width:960px}}
.today{{border-bottom:1px solid #333;padding-bottom:28px;margin-bottom:30px}}</style><body><h1>Hero detail 4: the sub-line</h1>
<p class="intro">The words stay: “Custom software and AI for small businesses, built in Adelaide.” Only the size, colour and position change. Since the button now sits on the board’s bottom edge, the text column has spare space, and where the sub-line sits decides where that space goes. Text column zoomed on the left, in place on the right.</p>
<section class="today"><div class="lab"><b>Today</b><span>19px dark grey, right under the headline, with the spare space between it and the button. For comparison, not an option.</span></div><div class="imgs"><img class="zoom" src="assets-2026-10-07/subline-today-zoom.png"><img class="full" src="assets-2026-10-07/subline-today-full.png"></div></section>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-07-subline.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-07-subline.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
