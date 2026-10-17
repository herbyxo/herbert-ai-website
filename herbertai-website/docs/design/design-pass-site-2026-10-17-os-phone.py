# Operating Systems details, 5 of 5: the phone layout three ways (16 Oct 2026).
# At 375 the 1184-wide screen scales to about a quarter and cannot be read.
# Drawn on the real homepage at 375 (reduced motion), the markup edited for
# each option; today first.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-17"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
OPTS = [
  ("today", "Today", "The laptop layout stacked", "The heading, the whole screen scaled to the phone{0}s width (unreadable), the title and line, then the five rows and the close. Tall, and the screen is decoration."),
  ("1", "1. Pills, then the screen", "The industries as a row of pills above the screen", "The five industries become a scrolling row of pills under the heading; the screen sits under them with the title and line, then the close. The order a thumb expects: choose, then see. The screen is still small."),
  ("2", "2. The one decision", "The screen cropped to the owner{0}s one call", "Instead of the whole office, the phone shows the part a phone would show: the approval card and the team, cropped from the screen at a readable size, with the title and line under it and the pills above. The office is on the laptop; the decision is on the phone. Recommended."),
  ("3", "3. No screen", "The list opens into the line", "The screen goes on phones. The five rows stay, and the active one opens into its title and one-sentence line, then the close. Shortest; nothing moves."),
]
JS = """(opt) => {
  const sec = document.querySelector('[role=tablist][aria-label="Operating systems"]').closest('section');
  const list = sec.querySelector('[role=tablist]');
  const listCol = list.parentElement;
  const grid = listCol.parentElement;
  const screenCol = grid.children[0];
  const scaled = screenCol.querySelector('.relative.w-full');
  const caption = screenCol.querySelector('.mt-4');
  const close = listCol.querySelector('p.mt-6');
  const mk = (tag, cls, html) => { const el = document.createElement(tag); el.className = cls; el.innerHTML = html; return el; };
  const pills = () => { const row = mk('div', 'flex gap-2 overflow-x-auto pb-2 -mx-6 px-6', ''); [...list.children].forEach((b, i) => { const n = b.querySelector('span').textContent; row.appendChild(mk('span', 'shrink-0 rounded-full px-3.5 py-1.5 text-[14px] font-medium border ' + (i === 0 ? 'bg-[#111] text-white border-[#111]' : 'border-[#111]/20 text-[#111]'), n)); }); return row; };
  if (opt === '1') { grid.insertBefore(pills(), screenCol); list.remove(); }
  if (opt === '2') {
    grid.insertBefore(pills(), screenCol); list.remove();
    const inner = scaled.firstElementChild; const w = scaled.clientWidth; const k = w / 300;
    scaled.style.aspectRatio = '300 / 420'; inner.style.transform = 'scale(' + k + ')'; inner.style.transformOrigin = 'top left'; inner.style.marginLeft = (-(1184 - 300 - 4) * k) + 'px'; inner.style.marginTop = (-42 * k) + 'px';
    scaled.after(mk('p', 'mt-2 text-[12px] text-[#999]', 'The one decision on the owner\\u2019s phone; the whole office is on the laptop.'));
  }
  if (opt === '3') {
    screenCol.remove();
    const first = list.children[0];
    first.appendChild(mk('span', 'block mt-2 text-[18px] font-semibold tracking-[-0.02em]', 'Herbert OS for Property'));
    first.appendChild(mk('span', 'block mt-1 text-[14px] leading-[1.5] text-[#555]', 'About 17 to 37 hours of office work a week back, for an agency of ten with 400 rentals.'));
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
            await pg.evaluate("() => document.querySelector('[role=tablist][aria-label=\"Operating systems\"]').closest('section').scrollIntoView()"); await pg.wait_for_timeout(1200)
            await pg.evaluate(JS, key); await pg.wait_for_timeout(400)
            sec = await pg.query_selector('section:has([role=tablist][aria-label="Operating systems"]), section:has(h2)')
            sec = await pg.query_selector('section:has(h2:text("The whole office"))')
            await sec.screenshot(path=str(A / f"os-phone-{key}.png")); print("captured", key)
        print("errors:", errs)
        await b.close()
def sheet():
    cells = "".join(f'<div class="cell"><div class="lab"><b>{n}</b><span class="h2">{s.format(Q)}</span><span>{d.format(Q)}</span></div><img src="assets-2026-10-17/os-phone-{k}.png"></div>' for k, n, s, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems: the phone layout three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
.row{{display:flex;gap:28px;align-items:flex-start}} .cell{{width:400px}} .lab{{margin-bottom:10px;min-height:170px}} .lab b{{font-size:19px;display:block}} .lab .h2{{display:block;font-size:16px;margin:4px 0}} .lab span{{color:#bbb;font-size:13px}}
img{{display:block;width:375px;border:1px solid #333}}</style><body>
<h1>Operating Systems: the phone layout three ways</h1><p class="intro">Detail 5 of 5, redrawn on the section as it now stands (Herbert OS titles, the line with no tag, one close under the list). Today stacks the laptop layout; the three options change what a phone shows of a 1184-wide screen.</p><div class="row">{cells}</div></body>"""
async def render():
    html = D / "design-pass-site-2026-10-17-os-phone.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1800, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-17-os-phone.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
