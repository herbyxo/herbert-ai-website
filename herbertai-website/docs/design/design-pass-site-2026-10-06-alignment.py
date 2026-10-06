# Hero detail: how the text column lines up with the board (6 Oct 2026). Three
# options drawn on the real homepage at 1440 by changing the page in the browser
# only, each captured clean and with guide lines on the shared edges.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-06"
URL = "http://localhost:3000/"
CORE = """
const h1 = document.querySelector('h1'); const box = h1.closest('section').firstElementChild; const left = box.children[0];
const board = document.querySelector('[role=group]'); const cta = left.lastElementChild;
const btn = [...cta.querySelectorAll('a')][0];
// Where the capitals start, measured from pixels on 6 Oct 2026: 8px below the
// headline box at 72px, about 0.118em. Canvas font metrics gave a different
// answer on a second run, so the measured ratio is used instead.
function capTop() { return h1.getBoundingClientRect().top + 0.118 * parseFloat(getComputedStyle(h1).fontSize) }
"""
# Each variant: a one-off setup, then a step that nudges toward the target from
# wherever the page is. The page applies margin changes with a short delay, so
# the step runs several times with a pause between, rather than reset-and-measure.
NUM = "const px = v => parseFloat(v || '0');"
VARIANTS = {
  "today": ("", ""),
  "align-1": ("box.style.alignItems = 'start';",
              NUM + "left.style.marginTop = (px(left.style.marginTop) + board.getBoundingClientRect().top - capTop()) + 'px';"),
  "align-2": ("box.style.alignItems = 'start';",
              NUM + "const b = board.getBoundingClientRect(), l = left.getBoundingClientRect(); left.style.marginTop = (px(left.style.marginTop) + (b.top + b.height / 2) - (l.top + l.height / 2)) + 'px';"),
  "align-3": ("box.style.alignItems = 'start'; Object.assign(left.style, { display: 'flex', flexDirection: 'column' }); cta.style.marginTop = 'auto'; left.style.height = left.getBoundingClientRect().height + 'px';",
              NUM + "left.style.marginTop = (px(left.style.marginTop) + board.getBoundingClientRect().top - capTop()) + 'px'; left.style.height = (px(left.style.height) + board.getBoundingClientRect().bottom - btn.getBoundingClientRect().bottom) + 'px';"),
}
GUIDES = """() => { const b = document.querySelector('[role=group]').getBoundingClientRect(); const L = 128, R = 1312;
  const add = (css) => { const e = document.createElement('div'); e.setAttribute('data-guide', ''); e.style.cssText = 'position:absolute;z-index:9999;pointer-events:none;background:#FF2D95;' + css; document.body.appendChild(e) };
  add(`left:0;width:1440px;top:${b.top + scrollY}px;height:1px`); add(`left:0;width:1440px;top:${b.bottom + scrollY}px;height:1px`);
  add(`top:0;height:900px;left:${L}px;width:1px`); add(`top:0;height:900px;left:${R}px;width:1px`); }"""
MEASURE = CORE + """return { capVsBoardTop: Math.round(capTop() - board.getBoundingClientRect().top), buttonVsBoardBottom: Math.round(btn.getBoundingClientRect().bottom - board.getBoundingClientRect().bottom) }"""
async def capture():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, js in VARIANTS.items():
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); await pg.goto(URL, wait_until="networkidle"); await pg.wait_for_timeout(1500)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(800)
            setup, step = js
            if setup:
                await pg.evaluate("() => {" + CORE + setup + "}"); await pg.wait_for_timeout(800)
                for _ in range(4):
                    await pg.evaluate("() => {" + CORE + step + "}"); await pg.wait_for_timeout(800)
            out[name] = await pg.evaluate("() => {" + MEASURE + "}")
            await pg.screenshot(path=str(A / f"align-{name}-clean.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 760})
            await pg.evaluate(GUIDES); await pg.wait_for_timeout(100)
            await pg.screenshot(path=str(A / f"align-{name}-guides.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 760})
            await ctx.close(); print("captured", name, out[name])
        await b.close()
    return out
def opts(m):
    return [
      ("1", "Tops aligned", f"The headline’s capitals start exactly on the board’s top edge, and the bottoms fall where they fall. Reads as two things side by side, starting together.", "align-1"),
      ("2", "Centred", f"The text column sits on the board’s middle. Balanced and common, but neither edge lines up, so nothing ties the two columns together.", "align-2"),
      ("3", "Both edges", f"The headline’s capitals start on the board’s top edge and the audit button ends on its bottom edge; the gap between the sub-line and the button stretches to fit. The two columns read as one block. Recommended.", "align-3"),
    ]
def sheet(m):
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><div class="imgs"><img src="assets-2026-10-06/align-{v}-clean.png"><img src="assets-2026-10-06/align-{v}-guides.png"></div></section>' for n, t, d, v in opts(m))
    t = m["today"]
    return f"""<!doctype html><meta charset=utf-8><title>Hero detail: alignment</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1150px;margin:0 0 26px}}
section{{margin-bottom:32px}} .lab{{margin-bottom:10px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.imgs{{display:flex;gap:16px}} .imgs img{{width:690px;border:1px solid #333;display:block}} .today{{border-bottom:1px solid #333;padding-bottom:28px;margin-bottom:30px}}</style><body>
<h1>Hero detail: how the text lines up with the board</h1><p class="intro">Each option clean on the left and with guide lines on the right: pink lines mark the shared left and right edges and the board’s top and bottom. The left and right edges already line up everywhere; this is about the top and bottom.</p>
<section class="today"><div class="lab"><b>Today</b><span>The bottoms are 3px apart by luck, and the headline’s capitals start {t['capVsBoardTop']}px below the board’s top: a near miss, which reads as a mistake rather than a choice. Not an option.</span></div><div class="imgs"><img src="assets-2026-10-06/align-today-clean.png"><img src="assets-2026-10-06/align-today-guides.png"></div></section>{rows}</body>"""
async def render(m):
    html = D / "design-pass-site-2026-10-06-alignment.html"; html.write_text(sheet(m))
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1480, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-06-alignment.png"), full_page=True); await b.close()
m = asyncio.run(capture()); asyncio.run(render(m)); print("sheet done")
