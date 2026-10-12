# How it works, detail 5: spacing (12 Oct 2026). Three options drawn on the real
# homepage at 1440x900 by changing the page in the browser only. Each is
# captured as the screen a visitor sees on scrolling to the section (its top at
# the top of the window), clean and with the four gaps measured: above the
# label, heading to steps, steps to link, and below the link.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-12"; A.mkdir(exist_ok=True)
URL = "http://localhost:3000/"
CORE = """const sec = document.querySelectorAll('main section')[1]; const box = sec.firstElementChild;
const head = box.children[0]; const close = box.children[2];"""
VARIANTS = {
  "today": "",
  "sp-1": "Object.assign(box.style, { paddingTop: '96px', paddingBottom: '96px' }); head.style.marginBottom = '48px'; close.style.marginTop = '48px';",
  "sp-2": "Object.assign(box.style, { paddingTop: '160px', paddingBottom: '160px' }); head.style.marginBottom = '80px';",
  "sp-3": "Object.assign(sec.style, { minHeight: innerHeight + 'px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }); Object.assign(box.style, { width: '100%', paddingTop: '64px', paddingBottom: '64px' });",
}
MARKS = """() => { const sec = document.querySelectorAll('main section')[1]; const s = sec.getBoundingClientRect(); const box = sec.firstElementChild;
  const label = box.children[0].getBoundingClientRect(); const grid = box.children[1].getBoundingClientRect(); const link = box.children[2].querySelector('a').getBoundingClientRect();
  const R = Math.round; const top = R(label.top - s.top), head = R(grid.top - box.children[0].querySelector('h2').getBoundingClientRect().bottom), close = R(link.top - grid.bottom), bottom = R(s.bottom - link.bottom);
  const add = (y, h, label) => { const e = document.createElement('div'); e.style.cssText = `position:absolute;z-index:9999;pointer-events:none;background:rgba(255,45,149,.16);border:1px solid #FF2D95;font:600 12px/1 -apple-system,sans-serif;color:#C2185B;display:flex;align-items:center;justify-content:center;left:${grid.left + 420}px;width:70px;top:${y + scrollY}px;height:${h}px`; e.textContent = label; document.body.appendChild(e) };
  add(s.top, top, top + 'px'); add(grid.top - head, head, head + 'px'); add(grid.bottom, close, close + 'px'); add(link.bottom, bottom, bottom + 'px');
  return { top, head, close, bottom, h: R(s.height) } }"""
async def capture():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, js in VARIANTS.items():
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); await pg.goto(URL, wait_until="networkidle"); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(1200)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            if js:
                await pg.evaluate("() => {" + CORE + js + "}"); await pg.wait_for_timeout(400)
            await pg.evaluate("window.scrollTo(0, document.querySelectorAll('main section')[1].getBoundingClientRect().top + scrollY)"); await pg.wait_for_timeout(500)
            await pg.screenshot(path=str(A / f"hiw-sp-{name}-clean.png"))
            out[name] = await pg.evaluate(MARKS); await pg.wait_for_timeout(100)
            await pg.screenshot(path=str(A / f"hiw-sp-{name}-marks.png"))
            print("captured", name, out[name]); await ctx.close()
        await b.close()
    return out
Q = chr(0x2019)
def g(m, k): x = m[k]; return f"{x['top']} / {x['head']} / {x['close']} / {x['bottom']}px, {x['h']}px tall"
def opts(m):
    return [
      ("1", "Tighter", f"{g(m, 'sp-1')}. The section is three short lists now, so it reads as one compact block and the next section shows at the bottom of the screen.", "sp-1"),
      ("2", "More air", f"{g(m, 'sp-2')}. Calmer and more spaced out, at a fixed size: on a 900px-tall laptop it looks almost the same as 3, but on a shorter screen it runs on past the fold and on a taller one the next section shows.", "sp-2"),
      ("3", "One screen", f"{g(m, 'sp-3')}. Like the hero you picked: the section fills whatever screen it is on with its content centred, so each scroll stop lands on one whole section. Recommended, for one rhythm down the page; on a large monitor the space above and below grows with the screen.", "sp-3"),
    ]
def sheet(m):
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><div class="imgs"><img src="assets-2026-10-12/hiw-sp-{v}-clean.png"><img src="assets-2026-10-12/hiw-sp-{v}-marks.png"></div></section>' for n, t, d, v in opts(m))
    return f"""<!doctype html><meta charset=utf-8><title>How it works, detail 5: spacing</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1150px;margin:0 0 26px}}
section{{margin-bottom:32px}} .lab{{margin-bottom:10px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.imgs{{display:flex;gap:16px}} .imgs img{{width:690px;border:1px solid #333;display:block}} .today{{border-bottom:1px solid #333;padding-bottom:28px;margin-bottom:30px}}</style><body>
<h1>How it works, detail 5: spacing</h1><p class="intro">The screen a visitor sees on a 1440 by 900 laptop after scrolling to the section, clean on the left and measured on the right: above the label, heading to steps, steps to link, below the link.</p>
<section class="today"><div class="lab"><b>Today</b><span>{g(m, 'today')}. For comparison, not an option.</span></div><div class="imgs"><img src="assets-2026-10-12/hiw-sp-today-clean.png"><img src="assets-2026-10-12/hiw-sp-today-marks.png"></div></section>{rows}</body>"""
async def render(m):
    html = D / "design-pass-site-2026-10-12-hiw-spacing.html"; html.write_text(sheet(m))
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1480, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-12-hiw-spacing.png"), full_page=True); await b.close()
m = asyncio.run(capture()); asyncio.run(render(m)); print("sheet done")
