# Operating Systems details, the title under the screen three ways (16 Oct
# 2026). Will: "i dont like how the title for each industry of what that board
# is presents. eg 'An operations hub for a property agency' doesnt really
# present well". Drawn on the real homepage at 1440x900 with the heading, the
# industry-first list and the one-sentence line in place, Property active; the
# title edited in the page. Today first.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-16"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
OPTS = [
  ("today", "Today", "An operations hub for a property agency", "The system described as a thing: a hub for an agency, a season board for a practice. Reads like a catalogue entry under a screen that already shows it."),
  ("1", "1. Named like the rung", "Property OS", "The system named the way the ladder names it: the AI operating system for Property, shortened to the two words the long-run plan already uses (FinanceOS, BusinessOS). Short, owned, the same shape for all five. Recommended."),
  ("2", "2. What the screen is", "The agency{0}s Monday page", "The title says what the owner is looking at: the agency{0}s Monday page, the trade office{0}s 7am, the clinic{0}s week, the venue{0}s functions board, the practice{0}s season. Closest to the screens, different for each."),
  ("3", "3. No title", "Property, then the line", "The title goes; the industry label and the one-sentence line carry it, and the screen{0}s own bar says what it is. The list already names the industry big, so nothing is lost."),
]
JS = """(opt) => {
  const title = [...document.querySelectorAll('p')].find(p => p.textContent.trim() === 'An operations hub for a property agency' && p.className.includes('text-[22px]'));
  if (opt === '1') title.textContent = 'Property OS';
  if (opt === '2') title.textContent = 'The agency\\u2019s Monday page';
  if (opt === '3') title.remove();
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
            await sec.screenshot(path=str(A / f"os-title-{key}.png")); print("captured", key)
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span class="h2">{chr(0x201C)}{s.format(Q)}{chr(0x201D)}</span><span>{d.format(Q)}</span></div><img src="assets-2026-10-16/os-title-{k}.png"></section>' for k, n, s, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems: the title under the screen three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:17px;margin:4px 0}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}}</style><body>
<h1>Operating Systems: the title under the screen three ways</h1><p class="intro">The line under the screen that names the system. Today it describes it (an operations hub for a property agency); the three options name it like the rung, say what the screen is, or drop it. The industry label and the one-sentence line stay in every option.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-16-os-title.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-16-os-title.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
