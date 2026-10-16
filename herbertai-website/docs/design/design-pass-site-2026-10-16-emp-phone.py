# AI Employees details, 5 of 5: the phone cards three ways (16 Oct 2026). The
# phone layout is a grid of cards, each playing its day once in view. Drawn on
# the real page at 375 (reduced motion, so every card shows its finished day),
# the markup edited for each option; today first.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-16"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
OPTS = [
  ("today", "Today", "Six cards, one column", "Each card: the avatar, name, job and industry, the month{0}s figure, the one-line job, the three lines with their times; each plays once as it scrolls into view. Long: six cards is most of a screen each."),
  ("1", "1. One at a time", "An avatar strip, one card", "The six avatars in a row, the active one lit; one card under them plays, and a tap on an avatar (or a swipe) brings the next. The phone version of the scene: a sixth of the height. Recommended."),
  ("2", "2. The scoreboard, opened", "Six rows, the first opened", "The list from the laptop layout, each row name, job and the month{0}s figure; a tap opens a row into its three lines. Reads as the roster first, the days second."),
  ("3", "3. A row of cards", "Cards side by side, the next one peeking", "The cards in a horizontal row at most of the width, so the next card{0}s edge shows and invites a swipe; each plays as it arrives."),
]
JS = """(opt) => {
  const sec = [...document.querySelectorAll('section')].find(s => s.textContent.includes('They do the job.') && s.getBoundingClientRect().width > 0);
  const grid = sec.querySelector('.grid');
  const cards = [...grid.children];
  const mk = (tag, cls, html) => { const el = document.createElement(tag); el.className = cls; el.innerHTML = html; return el; };
  if (opt === '1') {
    cards.slice(1).forEach(c => c.style.display = 'none');
    const strip = mk('div', 'flex items-center justify-between mb-4', '');
    const row = mk('div', 'flex items-center gap-3', '');
    cards.forEach((c, i) => { const s = c.querySelector('svg').cloneNode(true); s.setAttribute('width', '30'); s.setAttribute('height', '30'); s.style.opacity = i ? '0.3' : '1'; row.appendChild(s); });
    strip.appendChild(row); strip.appendChild(mk('span', 'text-[12px] text-[#777] tabular-nums', '1 of 6 · tap or swipe'));
    grid.parentElement.insertBefore(strip, grid);
  }
  if (opt === '2') {
    grid.className = 'mt-10 border-t border-[#111]/10';
    cards.forEach((c, i) => {
      const name = c.querySelector('.text-\\\\[17px\\\\]') || c.querySelectorAll('p')[0];
      const job = c.querySelectorAll('p')[1];
      const count = c.querySelector('.text-\\\\[22px\\\\]') || c.querySelectorAll('p')[3];
      const label = c.querySelectorAll('p')[4];
      const svg = c.querySelector('svg'); svg.setAttribute('width', '26'); svg.setAttribute('height', '26');
      const feed = [...c.children][2];
      const row = mk('div', 'py-3.5 border-b border-[#111]/10', '');
      const head = mk('div', 'flex items-center gap-3', '');
      head.appendChild(svg);
      head.appendChild(mk('span', 'text-[16px] font-semibold', name.textContent + ' <span class="font-normal text-[#777] text-[15px]">· ' + job.textContent + '</span>'));
      const right = mk('span', 'ml-auto text-right leading-tight', '<span class="block text-[15px] font-semibold tabular-nums">' + count.textContent + '</span><span class="block text-[11px] text-[#999]">' + label.textContent + '</span>');
      head.appendChild(right);
      row.appendChild(head);
      if (i === 0) { feed.className = 'mt-2 pl-[38px]'; feed.style.height = 'auto'; row.appendChild(feed); }
      c.replaceWith(row);
    });
  }
  if (opt === '3') {
    grid.className = 'mt-12 flex gap-3 overflow-hidden';
    cards.forEach(c => { c.style.flex = '0 0 86%'; });
  }
}"""
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 375, "height": 812}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        for key, name, sub, note in OPTS:
            await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
            await pg.evaluate("() => { const s = [...document.querySelectorAll('section')].find(s => s.textContent.includes('They do the job.') && s.getBoundingClientRect().width > 0); s.scrollIntoView(); }")
            await pg.wait_for_timeout(800)
            # every card plays once it scrolls into view, so walk through them first
            n = await pg.evaluate("() => { const s = [...document.querySelectorAll('section')].find(s => s.textContent.includes('They do the job.') && s.getBoundingClientRect().width > 0); return s.querySelector('.grid').children.length }")
            for i in range(n):
                await pg.evaluate("(i) => { const s = [...document.querySelectorAll('section')].find(s => s.textContent.includes('They do the job.') && s.getBoundingClientRect().width > 0); s.querySelector('.grid').children[i].scrollIntoView({ block: 'center' }) }", i)
                await pg.wait_for_timeout(500)
            await pg.evaluate("() => { const s = [...document.querySelectorAll('section')].find(s => s.textContent.includes('They do the job.') && s.getBoundingClientRect().width > 0); s.scrollIntoView(); }")
            await pg.wait_for_timeout(600)
            await pg.evaluate(JS, key); await pg.wait_for_timeout(400)
            h = await pg.evaluate_handle("() => [...document.querySelectorAll('section')].find(s => s.textContent.includes('They do the job.') && s.getBoundingClientRect().width > 0)")
            await h.as_element().screenshot(path=str(A / f"emp-phone-{key}.png")); print("captured", key)
        print("errors:", errs)
        await b.close()
def sheet():
    cells = "".join(f'<div class="cell"><div class="lab"><b>{n}</b><span class="h2">{s.format(Q)}</span><span>{d.format(Q)}</span></div><img src="assets-2026-10-16/emp-phone-{k}.png"></div>' for k, n, s, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>AI Employees: the phone cards three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
.row{{display:flex;gap:28px;align-items:flex-start}} .cell{{width:400px}} .lab{{margin-bottom:10px;min-height:150px}} .lab b{{font-size:19px;display:block}} .lab .h2{{display:block;font-size:16px;margin:4px 0}} .lab span{{color:#bbb;font-size:13px}}
img{{display:block;width:375px;border:1px solid #333}}</style><body>
<h1>AI Employees: the phone cards three ways</h1><p class="intro">Detail 5 of 5. The phone layout at 375 with every card showing its finished day, the heading, the timestamps and the close in place. Today is the full six-card column; the other three change how six employees fit a phone.</p><div class="row">{cells}</div></body>"""
async def render():
    html = D / "design-pass-site-2026-10-16-emp-phone.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1800, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-16-emp-phone.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
