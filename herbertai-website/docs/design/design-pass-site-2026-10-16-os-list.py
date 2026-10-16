# Operating Systems details, 2 of 5: the list three ways (16 Oct 2026). Drawn
# on the real homepage at 1440x900 with the picked heading and Property
# active, the five rows rewritten in the page; today first.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-16"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
ROWS = [
  ["Property", "An operations hub for a property agency", "about 17 to 37 hours a week back", "Repairs, late rent, renewals, enquiries"],
  ["Trades", "An office system for a trade business", "every quote request answered within a minute", "Quotes, bookings, invoices, chasing"],
  ["Hospitality", "A functions office for a venue", "$43,000 to $89,000 a year kept or won", "Functions, deposits, rebookings"],
  ["Health", "A patient board for a clinic", "3 to 5 cancelled slots filled a week", "Cancellations, referrals, recalls, letters"],
  ["Finance", "A season board for an accounting practice", "420 to 580 staff hours a year", "Client replies, requests, lodgments, debtors"],
]
OPTS = [
  ("today", "Today", "Industry, then the system{0}s name", "The row as built: the industry small, the system{0}s name big, Property with its Built tag."),
  ("1", "1. With the figure", "Industry, the system{0}s name, the figure under it", "Each row ends with the model{0}s headline figure for an example business, small and muted, with one line at the foot saying they are example figures. The list carries the value before a screen is clicked. Recommended."),
  ("2", "2. What runs by itself", "Industry, then the jobs", "The system{0}s name gives way to the jobs it runs: repairs, late rent, renewals, enquiries. Reads as what happens, not what it is called; the name stays under the screen."),
  ("3", "3. Industry first", "The industry big, the system{0}s name small", "The hierarchy flipped so a visitor finds their industry at a glance, the system{0}s name under it; tighter rows, so the list sits inside the screen{0}s height."),
]
JS = """([opt, rows]) => {
  const list = document.querySelector('[role=tablist][aria-label="Operating systems"]');
  [...list.children].forEach((b, i) => {
    const [ind, sys, fig, jobs] = rows[i];
    const built = b.querySelector('.font-mono');
    const mk = (tag, cls, text) => { const el = document.createElement(tag); el.className = cls; el.textContent = text; return el; };
    const on = b.getAttribute('aria-selected') === 'true';
    b.innerHTML = '';
    const head = mk('span', 'flex items-center gap-2 text-[15px] font-medium text-[#777]', ind); if (built) head.appendChild(built);
    if (opt === 'today') { b.appendChild(head); b.appendChild(mk('span', 'block mt-1 text-[20px] font-semibold tracking-[-0.02em]' + (on ? '' : ' text-[#111]/70'), sys)); }
    if (opt === '1') { b.appendChild(head); b.appendChild(mk('span', 'block mt-1 text-[20px] font-semibold tracking-[-0.02em]' + (on ? '' : ' text-[#111]/70'), sys)); b.appendChild(mk('span', 'block mt-1 text-[13px] text-[#777]', fig)); }
    if (opt === '2') { b.appendChild(head); b.appendChild(mk('span', 'block mt-1 text-[20px] font-semibold tracking-[-0.02em]' + (on ? '' : ' text-[#111]/70'), jobs)); }
    if (opt === '3') { b.className = b.className.replace('py-4', 'py-3'); const h = mk('span', 'flex items-center gap-2 text-[22px] font-semibold tracking-[-0.02em]' + (on ? '' : ' text-[#111]/70'), ind); if (built) h.appendChild(built); b.appendChild(h); b.appendChild(mk('span', 'block mt-0.5 text-[14px] text-[#777]', sys)); }
  });
  if (opt === '1') { const foot = document.createElement('p'); foot.className = 'mt-3 text-[12.5px] text-[#999]'; foot.textContent = 'Example figures for example businesses.'; list.after(foot); }
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
            await pg.evaluate(JS, [key, ROWS]); await pg.wait_for_timeout(300)
            sec = await pg.query_selector('section:has([role=tablist][aria-label="Operating systems"])')
            await sec.screenshot(path=str(A / f"os-list-{key}.png")); print("captured", key)
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span class="h2">{s.format(Q)}</span><span>{d.format(Q)}</span></div><img src="assets-2026-10-16/os-list-{k}.png"></section>' for k, n, s, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems: the list three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:17px;margin:4px 0}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}}</style><body>
<h1>Operating Systems: the list three ways</h1><p class="intro">Detail 2 of 5. The section with your heading in place and Property active; only the five rows on the right change. Figures in option 1 are the value model{Q}s lines for example businesses.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-16-os-list.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-16-os-list.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
