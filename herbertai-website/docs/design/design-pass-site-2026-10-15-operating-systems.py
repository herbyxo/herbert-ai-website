# Operating Systems, Property's system three ways (15 Oct 2026). The section
# formerly Industries, now about the entirely built system, with The Work folded
# in. Built as a lab page (/lab/operating-systems,
# src/app/components/lab/OperatingSystemOptions.js) in the section's layout A
# with Property active; captured whole at 1440 in the finished state (reduced
# motion), plus each screen close up, with today's section from / first.
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
        await pg.goto(BASE + "/", wait_until="networkidle"); await pg.add_style_tag(content=HIDE)
        today = pg.locator("section", has_text="Built for the office you actually run.").first
        await today.scroll_into_view_if_needed(); await pg.wait_for_timeout(1500)
        await today.screenshot(path=str(A / "os-prop-today.png")); print("captured today")
        await pg.goto(BASE + "/lab/operating-systems", wait_until="networkidle"); await pg.add_style_tag(content=HIDE)
        for o in "123":
            await pg.evaluate(f"document.querySelector('[data-opt=\"{o}\"] section').scrollIntoView()"); await pg.wait_for_timeout(2500)
            sec = await pg.query_selector(f'[data-opt="{o}"] section')
            await sec.screenshot(path=str(A / f"os-prop-{o}.png"))
            vis = await pg.query_selector(f'[data-opt="{o}"] section .relative.w-full')
            await vis.screenshot(path=str(A / f"os-prop-{o}-zoom.png"))
            print("captured", o)
        print("errors:", errs)
        await b.close()
Q = chr(0x2019)
OPTS = [
  ("1", "The hub, whole", f"The app shell: nine modules down the side with their counts, the approvals home screen a principal opens at 7am (three decisions from Emma, Kate and Rose, approved one by one as it plays), the six AI employees on the board underneath. Closest to the first version the research scopes, and the one a visitor can picture logging into. Recommended.", "1"),
  ("2", "The office map", f"One property{Q}s record in the middle with its comms log and the PMS it syncs to (never replaced); the six modules around it, each with its employee; a job travels the wires as it plays and the employees hand work to each other (Owen{Q}s inspection raises a tap with Emma, Kate checks open maintenance before recommending a rent). The only one that shows the hand-offs, which is what makes it a system and not six tools.", "2"),
  ("3", "One day on the system", f"Every module as a lane across a Tuesday, from the 11:42pm text to the 3:30pm promise paid, a now-line moving across as it plays; the day{Q}s count on the right with the minutes the person spent. The busiest picture and the most like a story.", "3"),
]
def sheet():
    rows = f'<section><div class="lab"><b>Today</b><span>The Industries section as built on the 15th: one job start to finish on a split screen. The AI employee again, not the system.</span></div><img src="assets-2026-10-15/os-prop-today.png"></section>'
    rows += "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><img src="assets-2026-10-15/os-prop-{v}.png"><img class="zoom" src="assets-2026-10-15/os-prop-{v}-zoom.png"></section>' for n, t, d, v in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems: Property three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}} img.zoom{{width:1100px}}</style><body>
<h1>Operating Systems: Property three ways</h1><p class="intro">Homepage section 4, renamed Operating Systems, with The Work folded in (built systems carry an open link and a Built tag). The screen now shows the entirely built system for the active industry. Property is drawn three ways from the research{Q}s system section; the other four follow whichever you pick. Each shown in place at 1440, then the screen close up, in its finished state. All three play when they come into view at /lab/operating-systems. Every name, address and figure is made up.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-15-operating-systems.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-15-operating-systems.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
