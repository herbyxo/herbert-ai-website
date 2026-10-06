# Hero detail 3, headline size and line spacing (6 Oct 2026): three options drawn
# on the real homepage at 1440 by changing the page in the browser only. Weight
# stays Geist 700 at -0.045em (Will's pick for detail 2). Smaller screens scale
# from the same clamp, so the pick sets the top of the range.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-06"
URL = "http://localhost:3000/"
Q, L, R = chr(0x2019), chr(0x201C), chr(0x201D)
VARIANTS = {"today": (None, None), "size-1": ("60px", "1"), "size-2": ("72px", "1.05"), "size-3": ("72px", "0.88")}
async def capture():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, (fs, lh) in VARIANTS.items():
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); await pg.goto(URL, wait_until="networkidle"); await pg.wait_for_timeout(1500)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            if fs:
                await pg.evaluate(f"() => {{ const h = document.querySelector('h1'); h.style.fontSize = '{fs}'; h.style.lineHeight = '{lh}' }}")
            await pg.wait_for_timeout(300)
            info = await pg.evaluate("() => { const h = document.querySelector('h1'); const cs = getComputedStyle(h); const range = document.createRange(); range.selectNodeContents(h); const lines = new Set([...range.getClientRects()].map(r => Math.round(r.top))).size; return {size: cs.fontSize, lh: cs.lineHeight, lines} }")
            out[name] = info
            r = await pg.evaluate("() => { const e = document.querySelector('h1').getBoundingClientRect(); const bd = document.querySelector('[role=group]').getBoundingClientRect(); return {x: e.x, y: e.y, w: e.width, h: e.height, stop: bd.left} }")
            await pg.screenshot(path=str(A / f"hsize-{name}-zoom.png"), clip={"x": r["x"] - 20, "y": r["y"] - 16, "width": min(500, r["stop"] - r["x"] + 4), "height": r["h"] + 32})
            await pg.screenshot(path=str(A / f"hsize-{name}-full.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 900})
            await ctx.close(); print("captured", name, info)
        await b.close()
    return out
def opts(info):
    return [
      ("1", "Smaller, more air", f"60px with the lines a full line apart. The board becomes the biggest thing on the screen; the headline reads as a caption to it. {info['size-1']['lines']} lines.", "size-1"),
      ("2", "Same size, looser lines", f"72px with a little more space between lines (1.05). Easier to read top to bottom, a softer block. {info['size-2']['lines']} lines.", "size-2"),
      ("3", "Same size, tighter lines", f"72px with the lines pulled closer (0.88). The densest, loudest block. A bigger size is not on offer: 72px is the largest that keeps four lines beside the wider board, and 73px breaks a line. {info['size-3']['lines']} lines.", "size-3"),
    ]
def sheet(info):
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><div class="imgs"><img class="zoom" src="assets-2026-10-06/hsize-{v}-zoom.png"><img class="full" src="assets-2026-10-06/hsize-{v}-full.png"></div></section>' for n, t, d, v in opts(info))
    return f"""<!doctype html><meta charset=utf-8><title>Hero detail 3: headline size</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:32px}} .lab{{margin-bottom:10px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.imgs{{display:flex;gap:18px;align-items:flex-start}} .imgs img{{border:1px solid #333;display:block;background:#FAFAF8}} .zoom{{width:470px}} .full{{width:870px}}
.today{{border-bottom:1px solid #333;padding-bottom:28px;margin-bottom:30px}}</style><body><h1>Hero detail 3: headline size and line spacing</h1>
<p class="intro">Same words and weight (Geist bold, your pick), shown at a 1440 wide screen. Only the size and the space between lines change; phones scale down from the same setting. Headline at full size on the left, in place on the right.</p>
<section class="today"><div class="lab"><b>Today</b><span>72px, lines 0.95 apart, {info['today']['lines']} lines. For comparison, not an option.</span></div><div class="imgs"><img class="zoom" src="assets-2026-10-06/hsize-today-zoom.png"><img class="full" src="assets-2026-10-06/hsize-today-full.png"></div></section>{rows}</body>"""
async def render(info):
    html = D / "design-pass-site-2026-10-06-headline-size.html"; html.write_text(sheet(info))
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-06-headline-size.png"), full_page=True); await b.close()
info = asyncio.run(capture()); asyncio.run(render(info)); print("sheet done")
