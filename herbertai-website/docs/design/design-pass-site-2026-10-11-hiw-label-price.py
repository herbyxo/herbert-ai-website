# How it works, detail 3: the step label and the price line (11 Oct 2026).
# Three options drawn on the real homepage at 1440x900 by changing the page in
# the browser only. Captures the three steps close up.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-11"; A.mkdir(exist_ok=True)
URL = "http://localhost:3000/"
CORE = """const s = document.querySelectorAll('main section')[1];
const cols = [...s.querySelectorAll('h3')].map(h => ({ h, label: h.previousElementSibling, ul: h.nextElementSibling, price: h.parentElement.lastElementChild }));"""
VARIANTS = {
  "today": "",
  "lp-1": "cols.forEach(c => Object.assign(c.price.style, { marginTop: '0', paddingTop: '10px', borderTop: '1px solid rgba(17,17,17,.15)', fontWeight: '600', fontSize: '15px' }));",
  "lp-2": "cols.forEach(c => { c.h.after(c.price); Object.assign(c.price.style, { marginTop: '-4px', marginBottom: '14px', color: '#555', fontWeight: '500', fontSize: '15px' }) });",
  "lp-3": "cols.forEach(c => { c.label.style.display = 'none' });",
}
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, js in VARIANTS.items():
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); await pg.goto(URL, wait_until="networkidle"); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(1200)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            if js:
                await pg.evaluate("() => {" + CORE + js + "}"); await pg.wait_for_timeout(300)
            grid = await pg.evaluate_handle("() => document.querySelectorAll('main section')[1].querySelector('h3').closest('.grid')")
            box = await grid.as_element().bounding_box()
            await pg.screenshot(path=str(A / f"hiw-lp-{name}.png"), full_page=True, clip={"x": box["x"] - 32, "y": box["y"] - 28, "width": box["width"] + 64, "height": box["height"] + 56})
            print("captured", name); await ctx.close()
        await b.close()
Q = chr(0x2019); L = chr(0x201C); R = chr(0x201D)
OPTS = [
  ("1", "Price as the closing line", f"The price becomes the last ruled line of each step, a touch bolder, so every column reads as one list: title, three facts, price. The smallest change. Recommended.", "lp-1"),
  ("2", "Price under the title", f"The price moves up to sit under each step{Q}s title in grey, so the cost is read with the name before the facts. The audit{Q}s {L}Free{R} then sits right under {L}A free AI audit{R}.", "lp-2"),
  ("3", f"No step label", f"{L}Step 1{R} to {L}Step 3{R} go; the order is already left to right and the titles say what each is. Less above each title, but on a phone, where the steps stack, nothing numbers them.", "lp-3"),
]
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><img src="assets-2026-10-11/hiw-lp-{v}.png"></section>' for n, t, d, v in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>How it works, detail 3: step label and price</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333}} .today{{border-bottom:1px solid #333;padding-bottom:32px;margin-bottom:34px}}</style><body>
<h1>How it works, detail 3: the step label and the price line</h1><p class="intro">The three steps close up, drawn on the real homepage at 1440 wide. Only the {L}Step{R} label and the price line change.</p>
<section class="today"><div class="lab"><b>Today</b><span>{L}Step 1{R} in grey above each title; the price in ink under the facts. For comparison, not an option.</span></div><img src="assets-2026-10-11/hiw-lp-today.png"></section>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-11-hiw-label-price.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-11-hiw-label-price.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
