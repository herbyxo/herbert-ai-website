# Hero detail 1, the logo mark (6 Oct 2026): three options drawn on the real
# header by changing the page in the browser only. Today's mark is the May
# register's black "h" tile with a neon dot and a green glow.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-06"
URL = "http://localhost:3000/"
COMMON = "const a = document.querySelector('header a[href=\"/\"]'); const svg = a.querySelector('svg'); const word = a.querySelector('span');"
LAMP = "display:inline-block;width:9px;height:9px;border-radius:50%;background:#12B76A;box-shadow:0 0 0 3px rgba(18,183,106,.18);margin-left:2px;align-self:center"
VARIANTS = {
  "today": "",
  "mark-1": "svg.remove(); word.style.fontSize = '18px';",
  "mark-2": "svg.style.filter = 'none'; svg.querySelector('circle').remove(); const t = svg.querySelector('text'); t.setAttribute('font-family', 'Geist, -apple-system, sans-serif'); t.setAttribute('y', '23.5');",
  "mark-3": f"svg.remove(); word.style.fontSize = '18px'; word.insertAdjacentHTML('afterend', `<span aria-hidden style=\"{LAMP}\"></span>`);",
}
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, js in VARIANTS.items():
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); await pg.goto(URL, wait_until="networkidle"); await pg.wait_for_timeout(1500)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            await pg.evaluate("() => {" + COMMON + js + "}"); await pg.wait_for_timeout(300)
            await pg.screenshot(path=str(A / f"logo-{name}-strip.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 430})
            await ctx.close()
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=4)
            pg = await ctx.new_page(); await pg.goto(URL, wait_until="networkidle"); await pg.wait_for_timeout(1500)
            await pg.evaluate("() => {" + COMMON + js + "}"); await pg.wait_for_timeout(300)
            r = await pg.evaluate("() => { const e = document.querySelector('header a[href=\"/\"]').getBoundingClientRect(); return {x: e.x, y: e.y, w: e.width, h: e.height} }")
            await pg.screenshot(path=str(A / f"logo-{name}-zoom.png"), clip={"x": r["x"] - 16, "y": r["y"] - 14, "width": 230, "height": r["h"] + 28})
            await ctx.close(); print("captured", name)
        await b.close()
OPTS = [
  ("1", "Wordmark only", "The tile and dot go; “Herbert AI” in Geist stands alone. The quietest, and nothing on the page is green that does not mean a state.", "mark-1"),
  ("2", "The tile, no dot", "The black “h” tile stays as an app-icon style mark, redrawn in Geist, with the neon dot and glow removed. Keeps a mark for the browser tab and social images.", "mark-2"),
  ("3", "Wordmark with a status lamp", "The wordmark followed by the board’s own green lamp, as if the business itself is running. It ties the mark to the concept; it bends “green means done” into “green means running”. Recommended.", "mark-3"),
]
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><div class="imgs"><img class="zoom" src="assets-2026-10-06/logo-{v}-zoom.png"><img class="strip" src="assets-2026-10-06/logo-{v}-strip.png"></div></section>' for n, t, d, v in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Hero detail 1: the logo mark</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:32px}} .lab{{margin-bottom:10px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.imgs{{display:flex;gap:18px;align-items:flex-start}} .imgs img{{border:1px solid #333;display:block}} .zoom{{width:420px;background:#FAFAF8}} .strip{{width:960px}}
.today{{border-bottom:1px solid #333;padding-bottom:28px;margin-bottom:30px}}</style><body><h1>Hero detail 1: the logo mark</h1>
<p class="intro">Today the mark is the May register’s black “h” tile with a neon dot and a green glow. Under the new rules green means “done”, so the dot either goes or earns a meaning. The mark is zoomed on the left, the header in place on the right. The footer and the phone menu follow the pick.</p>
<section class="today"><div class="lab"><b>Today</b><span>For comparison, not an option.</span></div><div class="imgs"><img class="zoom" src="assets-2026-10-06/logo-today-zoom.png"><img class="strip" src="assets-2026-10-06/logo-today-strip.png"></div></section>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-06-logo-mark.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-06-logo-mark.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
