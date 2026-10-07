# Hero detail 6, the board's type and colours (7 Oct 2026): three options drawn
# on the real homepage at 1440 by changing the page in the browser only. Each
# changes one thing about the board, so the difference reads on its own.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-07"; A.mkdir(exist_ok=True)
URL = "http://localhost:3000/"
CORE = """const g = document.querySelector('[role=group]'); const head = g.firstElementChild;
const rows = [...g.querySelectorAll('.grid')];"""
VARIANTS = {
  "today": "",
  "type-1": """const sans = 'var(--font-geist), -apple-system, sans-serif';
    head.style.fontFamily = sans; head.style.fontSize = '13px';
    rows.forEach(r => { r.children[0].style.fontFamily = sans; r.children[0].style.fontSize = '13px' });""",
  "type-2": """rows.forEach(r => { Object.assign(r.children[1].style, { color: '#777', fontWeight: '400', fontSize: '14px' }); Object.assign(r.children[2].style, { color: '#111', fontWeight: '500' }) });""",
  "type-3": """rows.forEach(r => { r.children[3].style.color = '#555' }); [...head.querySelectorAll('b')].forEach(b => b.style.color = '#111');""",
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
            el = await pg.query_selector("[role=group]")
            await el.screenshot(path=str(A / f"board-{name}-zoom.png"))
            await pg.screenshot(path=str(A / f"board-{name}-full.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 760})
            await ctx.close(); print("captured", name)
        await b.close()
Q = chr(0x2019)
OPTS = [
  ("1", "No mono", f"The header and the times move from the typewriter-style mono into the site{Q}s own font. Quieter and more like a finished product; loses a little of the {Q}software log{Q} feel.", "type-1"),
  ("2", "The job first", f"The job text goes black and medium weight and the employee{Q}s name goes grey, so the eye lands on what happened, not on who did it.", "type-2"),
  ("3", "Colour only on the lamp", f"The status words go grey and only the dot carries the colour, so the board reads black and white with green lamps. Closest to the charter{Q}s rule that colour means state and nothing else. Recommended.", "type-3"),
]
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><div class="imgs"><img class="zoom" src="assets-2026-10-07/board-{v}-zoom.png"><img class="full" src="assets-2026-10-07/board-{v}-full.png"></div></section>' for n, t, d, v in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Hero detail 6: the board</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1150px;margin:0 0 26px}}
section{{margin-bottom:32px}} .lab{{margin-bottom:10px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.imgs{{display:flex;gap:18px;align-items:flex-start}} .imgs img{{border:1px solid #333;display:block;background:#FAFAF8}} .zoom{{width:700px}} .full{{width:680px}}
.today{{border-bottom:1px solid #333;padding-bottom:28px;margin-bottom:30px}}</style><body><h1>Hero detail 6: the board{Q}s type and colours</h1>
<p class="intro">Each option changes one thing about the board. The board is shown large on the left and in place on the right.</p>
<section class="today"><div class="lab"><b>Today</b><span>Mono for the header and times, employee name in black, job in dark grey, status words in green or amber. For comparison, not an option.</span></div><div class="imgs"><img class="zoom" src="assets-2026-10-07/board-today-zoom.png"><img class="full" src="assets-2026-10-07/board-today-full.png"></div></section>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-07-board-type.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-07-board-type.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
