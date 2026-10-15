# Operating Systems, one screen per industry (15 Oct 2026, second board). Will
# picked option 1 (the hub whole) "if we can have it read a bit cleaner/less
# cluttered", and asked for "a different looking dashboard for each industry"
# drawn from what each industry's software looks like (research:
# product/research/markdown/dashboards-2026-10-15/). Lab page
# /lab/operating-systems (src/app/components/lab/OperatingSystemOptions.js),
# one section per industry; captured at 1440 in the finished state (reduced
# motion), in place and close up. Property's first draft shown first.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-15"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important} .sticky{position:static!important} .fixed.bottom-0{display:none!important}"
IDS = ["property", "trades", "health", "hospitality", "finance"]
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        await pg.goto(BASE + "/lab/operating-systems", wait_until="networkidle"); await pg.add_style_tag(content=HIDE)
        for o in IDS:
            if not await pg.query_selector(f'[data-opt="{o}"]'): print("missing", o); continue
            await pg.evaluate(f"document.querySelector('[data-opt=\"{o}\"] section').scrollIntoView()"); await pg.wait_for_timeout(2500)
            sec = await pg.query_selector(f'[data-opt="{o}"] section')
            await sec.screenshot(path=str(A / f"os2-{o}.png"))
            vis = await pg.query_selector(f'[data-opt="{o}"] section .relative.w-full')
            await vis.screenshot(path=str(A / f"os2-{o}-zoom.png"))
            print("captured", o)
        print("errors:", errs)
        await b.close()
Q = chr(0x2019)
NOTES = {
  "property": ("Property, cleaned up", f"Your pick, option 1, read cleaner: three regions (the modules down the side, the three decisions, the week and the team), one line per decision, nothing else. The research found every property system is a left rail of nouns, lists of jobs with who is on them, and one amber panel for the decision, which is what this is."),
  "trades": ("Trades, the dispatch board", f"What ServiceM8 and simPRO open to: technicians as rows, hours across, a now-line, grey job blocks. The two dashed blocks are the scheduler’s placements going solid, and the unassigned job slides into Jack’s 2pm. Under it the pipeline strip trade software keeps (Fergus), with each AI employee under its column; on the right the one reply waiting on the owner, then the morning’s feed."),
  "health": ("Health, the appointment book", f"What every clinic system opens to: time down the side, practitioners across, blocks with a name, a time and glyphs, one column unavailable till 1pm. The cancelled 2:15pm is the only dashed block; the wait-list offers on the right are the one approval, and the slot fills as it plays."),
  "hospitality": ("Hospitality, the functions pipeline", f"What functions software (Tripleseat, Perfect Venue) opens to: a sales view, not a calendar. Stages with counts and dollars across the top, cards by stage, the 40th moving from New to Site visit as it plays with its timeline on the card; Clara’s reply the one approval, deposits and rebookings under it, the week along the bottom."),
  "finance": ("Finance, the season board", f"What practice software shows (FYI, Karbon): a jobs board by stage with count pills and the fat “waiting on client” column, the AI employee as the last line of each card. On the right, one reply read against the checklist built from last year’s return, and one request approved; a finished file moves to Ready to prepare and the counters tick."),
}
def sheet():
    rows = f'<section><div class="lab"><b>Property, first draft</b><span>Option 1 as drawn on the first board: the one you picked, before the clean-up.</span></div><img class="zoom" src="assets-2026-10-15/os2-property-before.png"></section>'
    for o in IDS:
        if not (A / f"os2-{o}.png").exists(): continue
        t, d = NOTES.get(o, (o.title(), ""))
        rows += f'<section><div class="lab"><b>{t}</b><span>{d}</span></div><img src="assets-2026-10-15/os2-{o}.png"><img class="zoom" src="assets-2026-10-15/os2-{o}-zoom.png"></section>'
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems: one screen per industry</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}} img.zoom{{width:1100px}}</style><body>
<h1>Operating Systems: one screen per industry</h1><p class="intro">Your pick, option 1 (the hub whole), cleaned up, then the other four industries, each drawn in its own software{Q}s idiom from the dashboards research. Each shown in place at 1440 with that industry active in the list, then the screen close up, in its finished state. All five play when they come into view at /lab/operating-systems. Every name, address and figure is made up.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-15-operating-systems-2.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-15-operating-systems-2.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
