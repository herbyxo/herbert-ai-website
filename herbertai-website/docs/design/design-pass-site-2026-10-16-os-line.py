# Operating Systems details, 3 of 5: the line under the screen three ways (16
# Oct 2026). Drawn on the real homepage at 1440x900 with the heading and the
# industry-first list in place, Property active; the caption edited in the
# page. Today first.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-16"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
OPTS = [
  ("today", "Today", "The model{0}s full line", "The value model{0}s sentence for an example agency, three lines long, with {1}Example figures for an example business.{2} on the end."),
  ("1", "1. The figure as the sentence", "One line: the headline figure and the business it is for", "{1}About 17 to 37 hours of office work a week back, for an agency of ten with 400 rentals. Example figures.{2} Shorter, and the number lands first. Recommended."),
  ("2", "2. Three facts", "The line split into three ruled facts, the way How It Works does it", "17 to 37 hours of office work a week back; the landlords kept who would otherwise drift; a person asked before anything with money or a notice goes out. Scans faster than a sentence; takes a little more height."),
  ("3", "3. No line", "The system{0}s name and the link only", "The list now says what runs by itself, so the line goes; the screen and the name carry the section. Shortest; loses the figure from the homepage (it stays on the industry page)."),
]
JS = """(opt) => {
  const cap = [...document.querySelectorAll('p')].find(p => p.textContent.includes('For an agency of ten with 400 rentals'));
  const mk = (tag, cls, html) => { const el = document.createElement(tag); el.className = cls; el.innerHTML = html; return el; };
  if (opt === '1') cap.innerHTML = 'About 17 to 37 hours of office work a week back, for an agency of ten with 400 rentals. <span class="text-[#999]">Example figures.</span>';
  if (opt === '2') { const ul = mk('ul', 'mt-3 border-b border-[#111]/12 max-w-[60ch]', ''); ['17 to 37 hours of office work a week back', 'The landlords kept who would otherwise drift away', 'A person asked before anything with money or a notice goes out'].forEach(t => ul.appendChild(mk('li', 'py-2 border-t border-[#111]/12 text-[15px] text-[#333]', t))); const foot = mk('p', 'mt-2 text-[13px] text-[#999]', 'Example figures for an example agency.'); cap.replaceWith(ul); ul.after(foot); }
  if (opt === '3') cap.remove();
}"""
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        for key, name, sub, note in OPTS:
            await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
            await pg.evaluate("() => document.querySelector('[role=tablist][aria-label=\"Operating systems\"]').closest('section').scrollIntoView()"); await pg.wait_for_timeout(1200)
            await pg.evaluate(JS, key); await pg.wait_for_timeout(300)
            sec = await pg.query_selector('section:has([role=tablist][aria-label="Operating systems"])')
            await sec.screenshot(path=str(A / f"os-line-{key}.png")); print("captured", key)
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span class="h2">{s.format(Q, chr(0x201C), chr(0x201D))}</span><span>{d.format(Q, chr(0x201C), chr(0x201D))}</span></div><img src="assets-2026-10-16/os-line-{k}.png"></section>' for k, n, s, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems: the line under the screen three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:17px;margin:4px 0}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}}</style><body>
<h1>Operating Systems: the line under the screen three ways</h1><p class="intro">Detail 3 of 5. The section with your heading and the industry-first list in place, Property active; only the line under the screen changes. Whichever you pick applies to all five, each from its value model line.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-16-os-line.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-16-os-line.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
