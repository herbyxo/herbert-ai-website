# Operating Systems details, 1 of 5: the heading three ways (16 Oct 2026). The
# section still carries the Industries heading. Drawn on the real homepage at
# 1440x900 with Property active, the h2 swapped in the page; today first.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-16"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
OPTS = [
  ("today", "Today", "Built for the office you actually run.", "The heading from the Industries section, kept when the section became Operating Systems. It says who it is for, not what the section shows."),
  ("1", "1. What it is", "The whole office, on one screen.", "Says what the operating system is at the scale this rung sells: not one job, the whole office. Sits under the AI Employees heading without repeating it. Recommended."),
  ("2", "2. The owner{0}s view", "Every job runs. You make the one call.", "Says what each screen shows: the work already done and one decision left. Closest to the screens, and an echo of the AI Employees heading."),
  ("3", "3. The position", "Your software stays. The work between it runs itself.", "The position from the value model, with no software named: the business keeps what it runs and the system does the work in between. The most explicit about why this is not a product they already own."),
]
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
        await pg.evaluate("() => { const h = [...document.querySelectorAll('h2')].find(x => x.textContent.includes('Built for the office')); h.dataset.opt = '1'; h.closest('section').scrollIntoView() }")
        await pg.wait_for_timeout(1500)
        for key, name, h2, note in OPTS:
            await pg.evaluate("(t) => { const h = document.querySelector('h2[data-opt]'); h.textContent = t }", h2)
            await pg.wait_for_timeout(300)
            sec = await pg.query_selector("section:has(h2[data-opt])")
            await sec.screenshot(path=str(A / f"os-heading-{key}.png")); print("captured", key)
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n.format(Q)}</b><span class="h2">{chr(0x201C)}{h}{chr(0x201D)}</span><span>{d.format(Q)}</span></div><img src="assets-2026-10-16/os-heading-{k}.png"></section>' for k, n, h, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems: the heading three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:17px;margin:4px 0}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}}</style><body>
<h1>Operating Systems: the heading three ways</h1><p class="intro">Detail 1 of 5 for the Operating Systems section, which was built and approved but never had its details pass. The section as it is on the homepage at 1440 with Property active; only the heading changes. The label stays {chr(0x201C)}Operating Systems{chr(0x201D)}. Then the list, the line under the screen, the close and the phone layout, each the same way.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-16-os-heading.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-16-os-heading.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
