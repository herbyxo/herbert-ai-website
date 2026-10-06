# Hero tweak boards, 6 Oct 2026: three options each for "add the demo link" and
# "bigger board", drawn on the real homepage (dev server on :3000) by changing
# the page in the browser only, so no app code changes to show an option.
# Output: assets-2026-10-06/*.png and design-pass-site-2026-10-06-hero-*.png.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

D = Path(__file__).parent
A = D / "assets-2026-10-06"
URL = "http://localhost:3000/"

COMMON = """
const h1 = document.querySelector('h1'); const sec = h1.closest('section'); const box = sec.firstElementChild;
const left = box.children[0]; const board = box.querySelector('[role=group]'); const cta = left.lastElementChild;
const LINK = 'color:#111;font-weight:500;text-decoration:underline;text-underline-offset:4px;text-decoration-color:rgba(17,17,17,.3)';
"""
VARIANTS = {
  "today": "",
  "link-1": """const w = document.createElement('div'); board.replaceWith(w); w.appendChild(board);
    w.insertAdjacentHTML('beforeend', `<div data-x style="text-align:right;margin-top:14px;font-size:14px"><a style="${LINK}">See it run for an accounting firm &rarr;</a></div>`);""",
  "link-2": """board.insertAdjacentHTML('beforeend', `<div data-x style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 20px;border-top:1px solid rgba(17,17,17,.1);background:#FAFAF8;font-size:13.5px">
      <span style="font-family:var(--font-geist-mono),monospace;font-size:12px;color:#777">This is an example office</span><a style="${LINK}">Watch one run for real &rarr;</a></div>`);""",
  "link-3": """cta.insertAdjacentHTML('afterend', `<p data-x style="margin-top:18px;font-size:15px;color:#555;line-height:1.6;max-width:44ch">Or watch one run: ${['an accounting firm','a clinic','a trades office','a property manager'].map(t => `<a style="${LINK}">${t}</a>`).join(', ')}.</p>`);""",
  "size-1": """box.style.gridTemplateColumns = '0.72fr 1.28fr'; h1.style.fontSize = '72px';
    board.querySelectorAll('.grid').forEach(r => { r.style.fontSize = '15px' });""",
  "size-2": """box.style.display = 'block';
    Object.assign(left.style, { display: 'grid', gridTemplateColumns: '1.35fr 1fr', columnGap: '48px', alignItems: 'end' });
    Object.assign(h1.style, { gridRow: '1 / span 2', fontSize: '84px' });
    const p = left.querySelector('p'); Object.assign(p.style, { gridColumn: '2', marginTop: '0', alignSelf: 'end' }); Object.assign(cta.style, { gridColumn: '2', alignSelf: 'start' });
    board.style.marginTop = '44px'; board.querySelectorAll('.grid').forEach(r => { r.style.fontSize = '15px' });""",
  "size-3": """sec.style.overflow = 'hidden'; box.style.gridTemplateColumns = '0.8fr 1.2fr'; h1.style.fontSize = '84px';
    board.style.marginRight = '-320px'; board.style.alignSelf = 'center';
    board.querySelectorAll('.grid').forEach(r => { r.style.fontSize = '16px'; r.style.paddingTop = '15px'; r.style.paddingBottom = '15px' });""",
}

async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, js in VARIANTS.items():
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page()
            await pg.goto(URL, wait_until="networkidle"); await pg.wait_for_timeout(1800)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            await pg.evaluate("() => {" + COMMON + js + "}"); await pg.wait_for_timeout(400)
            await pg.screenshot(path=str(A / f"hero-{name}.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 900})
            if name.startswith("link"):
                r = await pg.evaluate("() => { const e = document.querySelector('[data-x]').getBoundingClientRect(); return {x: e.x, y: e.y, w: e.width, h: e.height} }")
                x = max(0, r["x"] - 60); y = max(0, r["y"] - 150); w = min(1440 - x, r["w"] + 120); h = r["h"] + 210
                await pg.screenshot(path=str(A / f"hero-{name}-zoom.png"), clip={"x": x, "y": y, "width": w, "height": h})
            await ctx.close(); print("captured", name)
        await b.close()

SHEETS = {
  "demo-link": dict(
    title="Hero tweak: add the demo link",
    intro="Today the board says “an example office” and nothing lets a visitor see one run for real. Each option adds that, keeping the rule of no client names or results. Zoomed crops on the right.",
    opts=[
      ("1", "Under the board", "A plain text link below the window: “See it run for an accounting firm”. The quietest; it reads as a footnote.", "link-1"),
      ("2", "Inside the window", "A footer bar in the product window: “This is an example office” left, “Watch one run for real” right. Answers “is this real?” at the spot the question comes up. Recommended.", "link-2"),
      ("3", "Beside the button", "A line under the audit button linking all four demos. The most proof, but it puts a second action next to the one button, and three of the four demos still wait on your approval.", "link-3"),
    ]),
  "board-size": dict(
    title="Hero tweak: bigger board",
    intro="Today the board takes a little over half the width beside the headline. Each option gives the product more room. Phones stack the same way in all three.",
    opts=[
      ("1", "Wider", "Same layout, the board takes about 60 percent and the headline steps down slightly. The smallest change.", "size-1"),
      ("2", "Full width under the headline", "The headline on the left with the sub-line and button beside it, the board across the whole page below. The most room for each job’s words, and still all in the first screen. Recommended.", "size-2"),
      ("3", "Off the edge", "The board larger and running off the right edge of the screen, cut by it. The product-shot move: it says there is more than fits. Loses the status column on smaller laptops.", "size-3"),
    ]),
}

def sheet(key, s):
    zoom = key == "demo-link"
    rows = ""
    for n, name, note, v in s["opts"]:
        imgs = f'<img class="full" src="assets-2026-10-06/hero-{v}.png">' + (f'<img class="zoom" src="assets-2026-10-06/hero-{v}-zoom.png">' if zoom else "")
        rows += f'<section><div class="lab"><b>{n}. {name}</b><span>{note}</span></div><div class="imgs{" z" if zoom else ""}">{imgs}</div></section>'
    return f"""<!doctype html><meta charset=utf-8><title>{s['title']}</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}}
h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
.today{{display:flex;gap:22px;align-items:flex-start;margin-bottom:34px;padding-bottom:30px;border-bottom:1px solid #333}} .today img{{width:560px;border:1px solid #333}} .today b{{display:block;font-size:16px;margin-bottom:4px}} .today span{{color:#999}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.imgs{{display:flex;gap:18px;align-items:flex-start}} .imgs img{{border:1px solid #333;display:block}} .imgs .full{{width:1400px}} .imgs.z .full{{width:940px}} .imgs .zoom{{width:440px}}
</style><body><h1>{s['title']}</h1><p class="intro">{s['intro']}</p>
<div class="today"><img src="assets-2026-10-06/hero-today.png"><div><b>Today</b><span>What the preview branch shows now, for comparison. Not an option.</span></div></div>{rows}</body>"""

async def render():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 1480, "height": 1000}, device_scale_factor=1.25)
        for key, s in SHEETS.items():
            html = D / f"design-pass-site-2026-10-06-hero-{key}.html"
            html.write_text(sheet(key, s))
            await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
            await pg.screenshot(path=str(D / f"design-pass-site-2026-10-06-hero-{key}.png"), full_page=True); print("sheet", key)
        await b.close()

asyncio.run(capture()); asyncio.run(render())
