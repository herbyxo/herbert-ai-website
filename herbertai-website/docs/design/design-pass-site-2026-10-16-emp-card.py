# AI Employees details, 3 of 5: the card three ways (16 Oct 2026). Drawn on the
# real scroll scene at 1440x900 with the picked heading and list in place and
# Gus's day finished; the card's markup edited in the page for each option.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-16"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
OPTS = [
  ("today", "Today", "Name, the job in a sentence, three lines with their state", "The card as built: the bar, the avatar, the name and the one-line job, the day{0}s three lines each with a state line, the Approve button on the one that needed a person."),
  ("1", "1. Timestamps", "Each line carries its time", "The three lines get a time at the right in mono, so the day reads as a day (7:02, 7:15, 9:30) and the gap between the job and the person{0}s yes is visible. Recommended."),
  ("2", "2. The counter on the card", "The month{0}s figure at the top right, counting up", "The scoreboard{0}s figure for this employee sits on the card and counts up as the lines land, so the list and the card say the same number."),
  ("3", "3. The approval as a card", "The line that needed a person becomes a small approval card", "The wait line opens into the approval card the Operating Systems screens use (what it wants to do, Approve, then Approved by Jess), so the human step is the biggest thing on the card."),
]
JS = """(opt) => {
  const card = [...document.querySelectorAll('.rounded-2xl')].find(c => c.textContent.includes('Compares every signed agreement'));
  const feed = card.querySelector('.h-\\\\[210px\\\\]') || [...card.querySelectorAll('div')].find(d => d.className.includes('h-[210px]'));
  const rows = [...feed.children];
  const times = ['7:02am', '7:15am', '9:30am'];
  const mk = (tag, cls, text) => { const el = document.createElement(tag); el.className = cls; el.textContent = text; return el; };
  if (opt === '1') {
    rows.forEach((r, i) => { const t = mk('span', 'font-mono text-[11.5px] text-[#999] tabular-nums shrink-0', times[i]); t.style.alignSelf = 'flex-start'; t.style.marginTop = '2px'; r.appendChild(t); });
  }
  if (opt === '2') {
    const head = card.querySelector('.flex.items-center.gap-4');
    const c = document.createElement('div'); c.className = 'ml-auto text-right';
    c.appendChild(mk('p', 'text-[26px] font-semibold tracking-[-0.02em] tabular-nums leading-none', '$11,620'));
    c.appendChild(mk('p', 'text-[12px] text-[#888] mt-1', 'found this month'));
    head.appendChild(c);
  }
  if (opt === '3') {
    feed.style.height = 'auto';
    const r = rows[1];
    r.innerHTML = '';
    r.className = 'py-3 border-t border-[#111]/8';
    const box = document.createElement('div'); box.className = 'rounded-xl border p-3.5'; box.style.borderColor = '#12B76A';
    const top = document.createElement('div'); top.className = 'flex items-center gap-2.5';
    const svg = card.querySelector('svg').cloneNode(true); svg.setAttribute('width', '28'); svg.setAttribute('height', '28'); top.appendChild(svg);
    top.appendChild(mk('p', 'text-[12.5px]', 'Gus · Recoveries · 7:15am'));
    box.appendChild(top);
    box.appendChild(mk('p', 'mt-2 text-[14px] leading-[1.4] text-[#333]', 'Water usage $214 was never passed to the tenant at 7 Park Ave. Invoice it against the lease?'));
    box.appendChild(mk('div', 'mt-2.5 rounded-[7px] text-center text-[12px] py-1.5 bg-[#E8F7EE] text-[#0E8F53]', 'Approved by Jess · 7:40am, invoiced'));
    r.appendChild(box);
  }
}"""
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        for key, name, sub, note in OPTS:
            await pg.goto(BASE + "/", wait_until="networkidle", timeout=120000); await pg.add_style_tag(content=HIDE)
            sec = pg.locator("section", has_text="They do the job.").first
            box = await sec.bounding_box()
            await pg.evaluate(f"window.scrollTo(0, {int(box['y']) + 10})"); await pg.wait_for_timeout(7500)
            await pg.evaluate(JS, key); await pg.wait_for_timeout(300)
            await pg.screenshot(path=str(A / f"emp-card-{key}.png")); print("captured", key)
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span class="h2">{s.format(Q)}</span><span>{d.format(Q)}</span></div><img src="assets-2026-10-16/emp-card-{k}.png"></section>' for k, n, s, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>AI Employees: the card three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:17px;margin:4px 0}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}}</style><body>
<h1>AI Employees: the card three ways</h1><p class="intro">Detail 3 of 5. The scene with your heading and the scoreboard list in place, Gus{Q}s day finished; only the card changes. Each option plays the same way as today (the lines arrive, the cursor presses Approve, the avatar goes green).</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-16-emp-card.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-16-emp-card.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
