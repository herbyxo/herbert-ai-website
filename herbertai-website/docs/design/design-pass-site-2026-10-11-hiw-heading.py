# How it works, detail 2: the heading size (11 Oct 2026). Three options drawn on
# the real homepage at 1440x900 by changing the page in the browser only: the
# section heading's size (and, for option 3, its width). Captures the whole
# section, and the hero above it for scale.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-11"; A.mkdir(exist_ok=True)
URL = "http://localhost:3000/"
VARIANTS = {
  "today": None,
  "h-1": {"fontSize": "40px"},
  "h-2": {"fontSize": "64px"},
  "h-3": {"fontSize": "44px", "maxWidth": "none"},
}
async def capture():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, css in VARIANTS.items():
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); await pg.goto(URL, wait_until="networkidle"); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(1200)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            if css:
                await pg.evaluate("(c) => Object.assign(document.querySelectorAll('main section')[1].querySelector('h2').style, c)", css); await pg.wait_for_timeout(300)
            el = await pg.evaluate_handle("() => document.querySelectorAll('main section')[1]")
            out[name] = await pg.evaluate("(s) => { const h = s.querySelector('h2'); const r = h.getBoundingClientRect(); return { size: Math.round(parseFloat(getComputedStyle(h).fontSize)), lines: Math.round(r.height / parseFloat(getComputedStyle(h).lineHeight)), h: Math.round(s.getBoundingClientRect().height) } }", el)
            await el.as_element().screenshot(path=str(A / f"hiw-heading-{name}.png"))
            print("captured", name, out[name]); await ctx.close()
        await b.close()
    return out
Q = chr(0x2019)
def opts(m):
    return [
      ("1", "Smaller", f"{m['h-1']['size']}px on {m['h-1']['lines']} lines. The hero{Q}s 72px stays the only big type on the page and the three steps carry the section; the scale steps down 72, 40, 24. Recommended.", "h-1"),
      ("2", "Bigger", f"{m['h-2']['size']}px on {m['h-2']['lines']} lines, close to the hero{Q}s 72px. Each section opens as loudly as the page does; the strongest break between sections, and the least difference between the hero and everything after it.", "h-2"),
      ("3", "One line", f"{m['h-3']['size']}px across the width on {m['h-3']['lines']} line, so the heading reads in one glance and sits over all three columns instead of the first one.", "h-3"),
    ]
def sheet(m):
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><img src="assets-2026-10-11/hiw-heading-{v}.png"></section>' for n, t, d, v in opts(m))
    t = m["today"]
    return f"""<!doctype html><meta charset=utf-8><title>How it works, detail 2: the heading size</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333}} .today{{border-bottom:1px solid #333;padding-bottom:32px;margin-bottom:34px}}</style><body>
<h1>How it works, detail 2: the heading size</h1><p class="intro">The whole section as built, drawn on the real homepage at 1440 wide. Only the heading changes. For scale: the hero headline above it is 72px and the step titles are 24px.</p>
<section class="today"><div class="lab"><b>Today</b><span>{t['size']}px on {t['lines']} lines. For comparison, not an option.</span></div><img src="assets-2026-10-11/hiw-heading-today.png"></section>{rows}</body>"""
async def render(m):
    html = D / "design-pass-site-2026-10-11-hiw-heading.html"; html.write_text(sheet(m))
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-11-hiw-heading.png"), full_page=True); await b.close()
m = asyncio.run(capture()); asyncio.run(render(m)); print("sheet done")
