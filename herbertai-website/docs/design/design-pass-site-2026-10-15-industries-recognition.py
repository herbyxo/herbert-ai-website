# Industries, Property's system three ways (14 Oct 2026). Built as a lab page
# (/lab/industries-recognition, src/app/components/lab/IndustryOptions.js) in the
# section's layout A with Property active; captured whole at 1440 in the
# finished state (reduced motion), plus each visual close up.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-15"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important} .sticky{position:static!important} .fixed.bottom-0{display:none!important}"
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        await pg.goto(BASE + "/lab/industries-recognition", wait_until="networkidle"); await pg.add_style_tag(content=HIDE)
        for o in "abc":
            await pg.evaluate(f"document.querySelector('[data-opt={o}] section').scrollIntoView()"); await pg.wait_for_timeout(2500)
            sec = await pg.query_selector(f"[data-opt={o}] section")
            await sec.screenshot(path=str(A / f"ind-rec-{o}.png"))
            vis = await pg.query_selector(f"[data-opt={o}] section .relative.w-full")
            await vis.screenshot(path=str(A / f"ind-rec-{o}-zoom.png"))
            print("captured", o)
        print("errors:", errs)
        await b.close()
Q = chr(0x2019)
OPTS = [
  ("1", "The week", f"A week at an example agency as a list of the admin jobs with the hours each takes, and as it plays an AI employee attaches to each job it would take, with the software it plugs into named underneath. Reads top to bottom like the owner{Q}s own week. Recommended.", "a"),
  ("2", "Your software, with the employees in it", f"The systems the agency already runs (inbox and phone, PropertyMe, Inspection Express, Xero) as a row, and the AI employees appearing between them with lines to what each reads and writes. Recognition by tool names; shows nothing is replaced.", "b"),
  ("3", "The team", f"The industry{Q}s AI employees as a team sheet: avatar, name and job, one line of what it does, the job it takes and the hours that job runs to at an example agency, what it plugs into. The most like a staff page.", "c"),
]
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><img src="assets-2026-10-15/ind-rec-{v}.png"><img class="zoom" src="assets-2026-10-15/ind-rec-{v}-zoom.png"></section>' for n, t, d, v in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Industries: recognition three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}} img.zoom{{width:1100px}}</style><body>
<h1>Industries: recognition three ways</h1><p class="intro">The same section in your layout A, but with the recognition job: a visitor sees their own industry{Q}s week, the AI employee that would take each job, and the software it plugs into, then goes to the industry page. Property drawn three ways; the other four follow the pick. Hours are the research{Q}s estimates for an example agency and say so. Each shown in place at 1440, then the screen close up, in its finished state. All three play when they come into view at /lab/industries-recognition. Every name, address and figure is made up.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-15-industries-recognition.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-15-industries-recognition.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
