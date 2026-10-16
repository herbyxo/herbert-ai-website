# AI Employees details, 2 of 5: the left list three ways (16 Oct 2026). Drawn
# on the real scroll scene at 1440x900 with Gus's day finished, the six rows
# rewritten in the page for each option; today first.
import asyncio, json
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-16"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
ROSTER = [
  ["Gus", "Recoveries", "Property", "Compares every signed agreement with what the ledger actually charged", "$11,620", "found this month"],
  ["Vic", "Margins", "Trades", "Tells the owner which kinds of jobs are priced wrong", "38", "quotes checked"],
  ["Fern", "Scope", "Finance", "Flags client requests outside the engagement letter before the work starts", "$3,100", "free work caught"],
  ["Rita", "Rebookings", "Hospitality", "Brings back every function when its date comes round again", "14", "dates held"],
  ["Joy", "Milestones", "Health", "Remembers the goal each patient named and asks how it went", "23", "goals remembered"],
  ["Ray", "Promises", "Every industry", "Keeps every promise made to a customer, or the customer hears first", "52", "promises tracked"],
]
OPTS = [
  ("today", "Today", "Name and job", "Gus · Recoveries. The roster as a list of names and jobs, the active one lit."),
  ("1", "1. Name, job, industry", "Name and job, the industry at the right", "The same row with the industry it was built for at the right in small mono type, so the visitor finds their own industry in the list before the screen tells them. Recommended."),
  ("2", "2. Name and the job in a sentence", "Name, the one-line job under it", "Each row carries the employee{0}s one-line job (the same line the card shows), so the list reads without the screen. Taller rows."),
  ("3", "3. The scoreboard", "Name and job, the count at the right", "Each row ends in what that employee has done this month, the figure the card counts up to: $11,620 found, 38 quotes checked. Reads as a team sheet with results."),
]
JS = """([opt, roster]) => {
  const ul = [...document.querySelectorAll('ul')].find(u => u.textContent.includes('Recoveries') && u.textContent.includes('Promises'));
  [...ul.children].forEach((li, i) => {
    const [name, job, where, what, count, label] = roster[i];
    const svg = li.querySelector('svg');
    li.innerHTML = '';
    li.appendChild(svg);
    const mk = (tag, cls, text) => { const el = document.createElement(tag); el.className = cls; el.textContent = text; return el; };
    if (opt === 'today') { li.appendChild(mk('span', 'text-[16px] font-semibold', name)); li.appendChild(mk('span', 'text-[15px] text-[#777]', '· ' + job)); }
    if (opt === '1') { li.appendChild(mk('span', 'text-[16px] font-semibold', name)); li.appendChild(mk('span', 'text-[15px] text-[#777]', '· ' + job)); li.appendChild(mk('span', 'ml-auto font-mono text-[11px] uppercase tracking-[0.12em] text-[#999]', where)); }
    if (opt === '2') { const d = document.createElement('div'); d.className = 'min-w-0'; d.appendChild(mk('p', 'text-[16px] font-semibold leading-tight', name + ' · ' + job)); d.appendChild(mk('p', 'text-[14px] text-[#777] leading-snug mt-0.5', what)); li.appendChild(d); li.style.alignItems = 'flex-start'; }
    if (opt === '3') { li.appendChild(mk('span', 'text-[16px] font-semibold', name)); li.appendChild(mk('span', 'text-[15px] text-[#777]', '· ' + job)); const r = document.createElement('span'); r.className = 'ml-auto text-right leading-tight'; r.appendChild(mk('span', 'block text-[15px] font-semibold tabular-nums', count)); r.appendChild(mk('span', 'block text-[11px] text-[#999]', label)); li.appendChild(r); }
  });
}"""
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        await pg.goto(BASE + "/", wait_until="networkidle", timeout=120000); await pg.add_style_tag(content=HIDE)
        sec = pg.locator("section", has_text="They do the job.").first
        box = await sec.bounding_box()
        await pg.evaluate(f"window.scrollTo(0, {int(box['y']) + 10})"); await pg.wait_for_timeout(7500)
        for key, name, sub, note in OPTS:
            await pg.evaluate(JS, [key, ROSTER]); await pg.wait_for_timeout(300)
            await pg.screenshot(path=str(A / f"emp-list-{key}.png")); print("captured", key)
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span class="h2">{s}</span><span>{d.format(Q)}</span></div><img src="assets-2026-10-16/emp-list-{k}.png"></section>' for k, n, s, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>AI Employees: the left list three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:17px;margin:4px 0}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}}</style><body>
<h1>AI Employees: the left list three ways</h1><p class="intro">Detail 2 of 5. The scene with your heading in place and Gus{Q}s day finished; only the six rows on the left change. The active row stays lit and the played ones go green as before.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-16-emp-list.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-16-emp-list.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
