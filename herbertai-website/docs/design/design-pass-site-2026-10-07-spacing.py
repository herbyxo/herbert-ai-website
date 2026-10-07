# Hero detail 7, spacing (7 Oct 2026): three options drawn on the real homepage
# at 1440x900 by changing the page in the browser only. Each is captured as the
# whole first screen (so the fold shows) and again with the three gaps measured:
# above the headline, between the text and the board, and below the hero.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-07"; A.mkdir(exist_ok=True)
URL = "http://localhost:3000/"
CORE = "const sec = document.querySelector('h1').closest('section'); const box = sec.firstElementChild;"
VARIANTS = {
  "today": "",
  "space-1": "Object.assign(box.style, { paddingTop: '56px', paddingBottom: '72px', columnGap: '40px' });",
  "space-2": "Object.assign(box.style, { paddingTop: '112px', paddingBottom: '144px' });",
  "space-3": """const hh = document.querySelector('header').getBoundingClientRect().height;
    Object.assign(sec.style, { minHeight: (innerHeight - hh) + 'px', display: 'flex', flexDirection: 'column', justifyContent: 'center' });
    Object.assign(box.style, { width: '100%', paddingTop: '32px', paddingBottom: '32px' });""",
}
MARKS = """() => { const sec = document.querySelector('h1').closest('section'); const s = sec.getBoundingClientRect();
  const board = document.querySelector('[role=group]').getBoundingClientRect(); const col = document.querySelector('h1').parentElement.getBoundingClientRect();
  const link = [...document.querySelectorAll('a')].find(a => a.innerText.startsWith('See it run')).getBoundingClientRect();
  const R = Math.round; const top = R(board.top - s.top), gap = R(board.left - col.right), bottom = R(s.bottom - link.bottom);
  const add = (css, label) => { const e = document.createElement('div'); e.style.cssText = 'position:absolute;z-index:9999;pointer-events:none;background:rgba(255,45,149,.16);border:1px solid #FF2D95;font:600 12px/1 -apple-system,sans-serif;color:#C2185B;display:flex;align-items:center;justify-content:center;' + css; e.textContent = label; document.body.appendChild(e) };
  add(`left:${board.left + 40}px;width:70px;top:${s.top}px;height:${top}px`, top + 'px');
  add(`left:${col.right}px;width:${gap}px;top:${board.top + 160}px;height:40px`, gap + 'px');
  add(`left:${board.left + 40}px;width:70px;top:${link.bottom}px;height:${bottom}px`, bottom + 'px');
  return { top, gap, bottom, heroEnds: R(s.bottom), fold: innerHeight } }"""
async def capture():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, js in VARIANTS.items():
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); await pg.goto(URL, wait_until="networkidle"); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(1500)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            if js:
                await pg.evaluate("() => {" + CORE + js + "}"); await pg.wait_for_timeout(500)
            await pg.screenshot(path=str(A / f"spacing-{name}-clean.png"))
            out[name] = await pg.evaluate(MARKS); await pg.wait_for_timeout(100)
            await pg.screenshot(path=str(A / f"spacing-{name}-marks.png"))
            await ctx.close(); print("captured", name, out[name])
        await b.close()
    return out
def opts(m):
    f = lambda k: m[k]["fold"] - m[k]["heroEnds"]
    return [
      ("1", "Tighter", f"Less space above, between and below. More of the next section shows above the fold ({f('space-1')}px of it), and the cut-off heading at the fold pulls people into scrolling. Recommended.", "space-1"),
      ("2", "More air", f"More space above and below; the gap between the text and the board stays, because any wider and \u201cMore money.\u201d breaks onto two lines. Calmer and more premium, but on a laptop only {f('space-2')}px of the next section shows, so little hints that the page keeps going.", "space-2"),
      ("3", "Exactly one screen", f"The hero fills the screen under the header with the content centred in it, and the next section starts right at the fold. Clean, but nothing below hints that the page keeps going.", "space-3"),
    ]
def sheet(m):
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><div class="imgs"><img src="assets-2026-10-07/spacing-{v}-clean.png"><img src="assets-2026-10-07/spacing-{v}-marks.png"></div></section>' for n, t, d, v in opts(m))
    t = m["today"]
    return f"""<!doctype html><meta charset=utf-8><title>Hero detail 7: spacing</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1150px;margin:0 0 26px}}
section{{margin-bottom:32px}} .lab{{margin-bottom:10px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.imgs{{display:flex;gap:16px}} .imgs img{{width:690px;border:1px solid #333;display:block}} .today{{border-bottom:1px solid #333;padding-bottom:28px;margin-bottom:30px}}</style><body>
<h1>Hero detail 7: spacing</h1><p class="intro">The whole first screen of a 1440 by 900 laptop, so the fold (the bottom edge) shows. Clean on the left; on the right the three gaps are measured: above the headline, between the text and the board, and below the hero.</p>
<section class="today"><div class="lab"><b>Today</b><span>{t['top']}px above, {t['gap']}px between, {t['bottom']}px below; {t['fold'] - t['heroEnds']}px of the next section shows above the fold. For comparison, not an option.</span></div><div class="imgs"><img src="assets-2026-10-07/spacing-today-clean.png"><img src="assets-2026-10-07/spacing-today-marks.png"></div></section>{rows}</body>"""
async def render(m):
    html = D / "design-pass-site-2026-10-07-spacing.html"; html.write_text(sheet(m))
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1480, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-07-spacing.png"), full_page=True); await b.close()
m = asyncio.run(capture()); asyncio.run(render(m)); print("sheet done")
