# AI Employees details, 4 of 5: the close three ways (16 Oct 2026). The
# charter says every section closes on a link; this one ends on the card
# today. Drawn on the real scroll scene at 1440x900 with the heading, the
# scoreboard list and the timestamped card in place; today first.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-16"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
OPTS = [
  ("today", "Today", "No close", "The section ends on the card; nothing says where to go next."),
  ("1", "1. The rung", "A line under the list: your first one is $3,500, live in 14 days", "Closes on the ladder{0}s second rung, the thing this section sells, linking to the pilot page where the audit is booked. Recommended."),
  ("2", "2. The roster", "A line under the list: all six, and what each one does", "Closes on the roster itself, linking to the AI Employees page (the one that replaces What gets built in the nav; /services stands in until it exists)."),
  ("3", "3. On the card", "The card{0}s bar carries the link to that employee{0}s industry page", "Each employee{0}s card links to its industry page, so the close moves with the scroll; the list carries no link."),
]
JS = """(opt) => {
  const ul = [...document.querySelectorAll('ul')].find(u => u.textContent.includes('Recoveries') && u.textContent.includes('Promises'));
  const mk = (tag, cls, html) => { const el = document.createElement(tag); el.className = cls; el.innerHTML = html; return el; };
  if (opt === '1') ul.parentElement.appendChild(mk('p', 'mt-6 text-[15px]', '<a class="font-medium underline underline-offset-4 decoration-[#111]/30" href="/pilot">Your first one is $3,500, live in 14 days <span aria-hidden>&rarr;</span></a>'));
  if (opt === '2') ul.parentElement.appendChild(mk('p', 'mt-6 text-[15px]', '<a class="font-medium underline underline-offset-4 decoration-[#111]/30" href="/services">All six, and what each one does <span aria-hidden>&rarr;</span></a>'));
  if (opt === '3') { const bar = [...document.querySelectorAll('.rounded-2xl .font-mono')].find(d => d.textContent.includes('an example business')); const right = bar.lastElementChild; right.innerHTML = '<a class="underline underline-offset-4 decoration-[#111]/30 text-[#111]" href="/industries/real-estate">See the Property page &rarr;</a>'; }
}"""
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        for key, name, sub, note in OPTS:
            await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
            sec = pg.locator("section", has_text="They do the job.").first
            box = await sec.bounding_box()
            await pg.evaluate(f"window.scrollTo(0, {int(box['y']) + 10})"); await pg.wait_for_timeout(7500)
            await pg.evaluate(JS, key); await pg.wait_for_timeout(300)
            await pg.screenshot(path=str(A / f"emp-close-{key}.png")); print("captured", key)
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span class="h2">{s.format(Q)}</span><span>{d.format(Q)}</span></div><img src="assets-2026-10-16/emp-close-{k}.png"></section>' for k, n, s, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>AI Employees: the close three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:17px;margin:4px 0}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}}</style><body>
<h1>AI Employees: the close three ways</h1><p class="intro">Detail 4 of 5. The scene with the heading, the scoreboard list and the timestamped card in place, Gus{Q}s day finished. Every other section closes on a link; this one ends on the card today. Where the link goes and what it says.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-16-emp-close.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-16-emp-close.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
