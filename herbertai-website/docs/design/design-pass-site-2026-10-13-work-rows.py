# The work, detail 1: the two rows that only open a paragraph (13 Oct 2026).
# The brokerage hub and the marketing engine both link to /work, where each is
# a paragraph with no picture. Three options drawn on the real homepage at 1440
# by changing the page in the browser only; the section captured whole.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-13"; A.mkdir(exist_ok=True)
URL = "http://localhost:3000/"
CORE = """const sec = document.querySelectorAll('main section')[2];
const rows = [...sec.querySelectorAll('a')].filter(a => a.innerText.includes('Read about it'));"""
VARIANTS = {
  "today": "",
  "r-1": "rows.forEach(a => { const v = [...a.children].pop(); v.firstChild.textContent = 'Read its write-up '; });",
  "r-2": "rows.forEach(a => { const d = document.createElement('div'); d.className = a.className; d.innerHTML = a.innerHTML; [...d.children].pop().remove(); a.replaceWith(d) });",
  "r-3": "rows.forEach(a => a.remove());",
}
async def capture():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, js in VARIANTS.items():
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); await pg.goto(URL, wait_until="networkidle"); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(1200)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            if js:
                await pg.evaluate("() => {" + CORE + js + "}"); await pg.wait_for_timeout(300)
            el = await pg.evaluate_handle("() => document.querySelectorAll('main section')[2]")
            await pg.evaluate("(s) => s.scrollIntoView()", el); await pg.wait_for_timeout(800)
            await pg.evaluate("Promise.all([...document.images].filter(i => !i.complete).map(i => new Promise(r => { i.onload = i.onerror = r })))")
            out[name] = await pg.evaluate("(s) => Math.round(s.getBoundingClientRect().height)", el)
            await el.as_element().screenshot(path=str(A / f"work-rows-{name}.png")); print("captured", name, out[name]); await ctx.close()
        await b.close()
    return out
Q = chr(0x2019); L = chr(0x201C); R = chr(0x201D)
def opts(m):
    return [
      ("1", "Each opens its own write-up", f"Each row links to its own spot on /work, which scrolls straight to that system (the page gets an anchor per system), and the link says {L}Read its write-up{R} so nobody expects a demo. The click still ends at a paragraph.", "r-1"),
      ("2", "Named, not linked", f"The two rows stay as plain names with no link: they show the range of what has been built, and nothing promises a click it cannot pay off. {L}All the systems{R} is still there for anyone who wants the detail. Recommended.", "r-2"),
      ("3", "Only what can be opened", f"The two rows go, so the section shows the dashboard and the demo, the two things a visitor can actually open, and {L}All the systems{R}. Tightest, but the list looks thin, and the build that is underway disappears from the homepage. {m['r-3']}px.", "r-3"),
    ]
def sheet(m):
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><img src="assets-2026-10-13/work-rows-{v}.png"></section>' for n, t, d, v in opts(m))
    return f"""<!doctype html><meta charset=utf-8><title>The work, detail 1: the two paragraph rows</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333}} .today{{border-bottom:1px solid #333;padding-bottom:32px;margin-bottom:34px}}</style><body>
<h1>The work, detail 1: the two rows that only open a paragraph</h1><p class="intro">The section as built, drawn on the real homepage at 1440. The brokerage hub and the marketing engine both say {L}Read about it{R} and open /work, where each is a paragraph with no picture.</p>
<section class="today"><div class="lab"><b>Today</b><span>Both rows link to the top of /work. For comparison, not an option.</span></div><img src="assets-2026-10-13/work-rows-today.png"></section>{rows}</body>"""
async def render(m):
    html = D / "design-pass-site-2026-10-13-work-rows.html"; html.write_text(sheet(m))
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-13-work-rows.png"), full_page=True); await b.close()
m = asyncio.run(capture()); asyncio.run(render(m)); print("sheet done")
