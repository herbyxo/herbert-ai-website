# Hero detail 5, the button (7 Oct 2026): three options drawn on the real
# homepage at 1440 by changing the page in the browser only. Today the hero
# button is a black pill with no arrow, while the header button is a smaller
# black pill with an arrow. The "45 minutes" note stays as it is in all three.
# Every option keeps the button's bottom on the board's bottom edge.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-07"; A.mkdir(exist_ok=True)
URL = "http://localhost:3000/"
CORE = """const h1 = document.querySelector('h1'); const btn = h1.parentElement.querySelector('a');
const hbtn = [...document.querySelectorAll('header a')].find(a => a.innerText.includes('Free AI audit'));
const arrow = () => { if (!btn.querySelector('[data-arrow]')) btn.insertAdjacentHTML('beforeend', ' <span data-arrow aria-hidden>&rarr;</span>') };"""
VARIANTS = {
  "today": "",
  "btn-1": "arrow();",
  "btn-2": "arrow(); btn.style.borderRadius = '10px'; hbtn.style.borderRadius = '8px';",
  "btn-3": "arrow(); Object.assign(btn.style, { fontSize: '18px', padding: '18px 32px' });",
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
            info = await pg.evaluate("() => {" + CORE + "const b = document.querySelector('[role=group]').getBoundingClientRect(); return { btnVsBoard: Math.round(btn.getBoundingClientRect().bottom - b.bottom) } }")
            r = await pg.evaluate("() => { const col = document.querySelector('h1').parentElement; const p = col.querySelector('p').getBoundingClientRect(); const note = [...document.querySelectorAll('section span')].find(e => e.innerText.startsWith('45 minutes')).getBoundingClientRect(); return {x: p.x, top: p.top, bottom: note.bottom} }")
            await pg.screenshot(path=str(A / f"button-{name}-zoom.png"), clip={"x": r["x"] - 24, "y": r["top"] - 20, "width": 470, "height": r["bottom"] - r["top"] + 40})
            await pg.screenshot(path=str(A / f"button-{name}-full.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 760})
            await ctx.close(); print("captured", name, info)
        await b.close()
Q = chr(0x2019)
OPTS = [
  ("1", "Add the arrow", f"Same black pill, with the arrow the header button already has. The smallest change, and the two buttons on the screen match. Recommended.", "btn-1"),
  ("2", "Squarer corners", f"The arrow, and the corners rounded to match the board{Q}s window instead of a full pill, so the button looks like part of the software. The header button follows. Moves furthest from the old site{Q}s pill shape.", "btn-2"),
  ("3", "Bigger", f"The arrow, larger text and more padding, so the button carries more weight against the 72px headline. The loudest.", "btn-3"),
]
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><div class="imgs"><img class="zoom" src="assets-2026-10-07/button-{v}-zoom.png"><img class="full" src="assets-2026-10-07/button-{v}-full.png"></div></section>' for n, t, d, v in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Hero detail 5: the button</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1150px;margin:0 0 26px}}
section{{margin-bottom:32px}} .lab{{margin-bottom:10px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.imgs{{display:flex;gap:18px;align-items:flex-start}} .imgs img{{border:1px solid #333;display:block;background:#FAFAF8}} .zoom{{width:420px}} .full{{width:960px}}
.today{{border-bottom:1px solid #333;padding-bottom:28px;margin-bottom:30px}}</style><body><h1>Hero detail 5: the button</h1>
<p class="intro">Today the hero button is a black pill with no arrow, and the header button is a smaller black pill with one. The “45 minutes, a written page back” note stays as it is in all three. Each option keeps the button{Q}s bottom on the board{Q}s bottom edge. Button zoomed on the left, in place on the right.</p>
<section class="today"><div class="lab"><b>Today</b><span>Black pill, 16px, no arrow. For comparison, not an option.</span></div><div class="imgs"><img class="zoom" src="assets-2026-10-07/button-today-zoom.png"><img class="full" src="assets-2026-10-07/button-today-full.png"></div></section>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-07-button.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-07-button.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
