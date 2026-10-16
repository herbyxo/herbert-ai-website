# AI Employees details, 1 of 5: the heading three ways (16 Oct 2026). Drawn on
# the real scroll scene at 1440x900 with the first employee's day finished,
# the h2 swapped in the page for each option; today first.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-16"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
OPTS = [
  ("today", "Today", "One job each. A person approves what goes out.", "What the section says now: the unit and the rule, in two short sentences."),
  ("1", "1. Named, and live in 14 days", "Named, one job each, live in 14 days.", "Ties the section to the ladder{0}s second rung: the thing you can buy, with its name and its promise. Recommended."),
  ("2", "2. The division of labour", "They do the job. Your team says yes.", "The shortest statement of how the two work together; the approve button under it is the proof."),
  ("3", "3. The roster", "Six AI employees, one job each, every day.", "Counts the roster and says the cadence; reads as a team sheet."),
]
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        await pg.goto(BASE + "/", wait_until="networkidle", timeout=120000); await pg.add_style_tag(content=HIDE)
        sec = pg.locator("section", has_text="A person approves what goes out.").first
        box = await sec.bounding_box()
        await pg.evaluate(f"window.scrollTo(0, {int(box['y']) + 10})"); await pg.wait_for_timeout(7500)
        for key, name, h2, note in OPTS:
            await pg.evaluate("(t) => { const h = [...document.querySelectorAll('h2')].find(x => x.textContent.includes('One job each') || x.dataset.opt); h.dataset.opt = '1'; h.textContent = t }", h2)
            await pg.wait_for_timeout(300)
            await pg.screenshot(path=str(A / f"emp-heading-{key}.png"))
            print("captured", key)
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span class="h2">“{h}”</span><span>{d.format(Q)}</span></div><img src="assets-2026-10-16/emp-heading-{k}.png"></section>' for k, n, h, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>AI Employees: the heading three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:17px;margin:4px 0}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}}</style><body>
<h1>AI Employees: the heading three ways</h1><p class="intro">Detail 1 of 5 for the AI Employees section. The scroll scene as built at 1440x900 with Gus{Q}s day finished, only the heading changed. The label stays "AI Employees". Then the left list, the card, the close and the phone cards, each the same way.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-16-emp-heading.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-16-emp-heading.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
