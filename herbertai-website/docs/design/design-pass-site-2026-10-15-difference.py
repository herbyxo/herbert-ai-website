# Operating Systems: saying the difference, A B C (15 Oct 2026). Will: "at the
# moment it just looks like im selling a product that these businesses already
# use". Lab page /lab/operating-systems-abc
# (src/app/components/lab/DifferentiationOptions.js), Property active, each
# option with its own heading and caption and the list naming the gap; captured
# at 1440 in the finished state (reduced motion), in place and close up.
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
        await pg.goto(BASE + "/lab/operating-systems-abc", wait_until="networkidle"); await pg.add_style_tag(content=HIDE)
        for o in "abc":
            await pg.evaluate(f"document.querySelector('[data-opt=\"{o}\"] section').scrollIntoView()"); await pg.wait_for_timeout(2500)
            sec = await pg.query_selector(f'[data-opt="{o}"] section')
            await sec.screenshot(path=str(A / f"diff-{o}.png"))
            vis = await pg.query_selector(f'[data-opt="{o}"] section .relative.w-full')
            await vis.screenshot(path=str(A / f"diff-{o}-zoom.png"))
            print("captured", o)
        print("errors:", errs)
        await b.close()
Q = chr(0x2019)
OPTS = [
  ("A", "Say it on the screen", f"The hub you picked, with three additions: the record named and kept inside the frame (PropertyMe stays the trust ledger, never replaced), what is gone named (the shared inbox as the work queue, the whiteboard, the maintenance spreadsheet), and the heading and the list naming the gap instead of a product category. Cheapest, and I think most of the fix. Recommended.", "a"),
  ("B", "The motion is the difference", f"The screen is the manager{Q}s own list for Tuesday, in her words, written Monday evening. As it plays the AI employees take thirteen of the fourteen items, each struck through with who did it and when, and the one that needs a person waits for her tap. The before and the after on one screen; the hub itself moves to the Property page.", "b"),
  ("C", "Lead with what is replaced", f"The desk: four windows, PropertyMe kept as the record, the shared inbox, the whiteboard and the maintenance spreadsheet going one by one, and one screen underneath that reads and writes the record and does the work. The most explicit about the competition, and the least like a product screenshot.", "c"),
]
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><img src="assets-2026-10-15/diff-{v}.png"><img class="zoom" src="assets-2026-10-15/diff-{v}-zoom.png"></section>' for n, t, d, v in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems: saying the difference</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}} img.zoom{{width:1100px}}</style><body>
<h1>Operating Systems: saying the difference</h1><p class="intro">The same section three ways, Property active. In all three the list names the gap each system fills beside the software the business already runs (the work between PropertyMe and your inbox; the office in front of ServiceM8; beside Cliniko: the waitlist, recalls and funding; the functions office beside the booking system; the season board beside Xero), so the five lines carry the position whichever screen you pick. What changes is the screen and the heading. Each shown in place at 1440, then the screen close up, in its finished state; all three play at /lab/operating-systems-abc. Every name and figure is made up.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-15-difference.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-15-difference.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
