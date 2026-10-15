# Operating Systems built (15 Oct 2026): the homepage section after the
# definition and value pass, each industry clicked in turn, captured at 1440
# in the finished state (reduced motion) plus the phone layout at 375.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-15"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
IDS = ["property", "trades", "hospitality", "health", "finance"]
Q = chr(0x2019)
NOTES = {
  "property": "The owner{0}s Monday page: six tiles in the stat-strip idiom, the week as a list of jobs with the employee on each row, one approval card, one grey line about hours. Built, with the open link.",
  "trades": "The dispatch board the office lives in, with the owner{0}s 7am figures under it, the one reply waiting on him and the morning{0}s feed.",
  "hospitality": "The functions board with a dollar on every stage, the till strip above it, the 40th moving across with its timeline, the one approval, deposits and rebookings, the week along the bottom.",
  "health": "The appointment book with the owner{0}s weekly page beside it: one line read in five seconds, its parts in plain rows, the wait-list offers as the one approval, the slot filled.",
  "finance": "The season board: counters and the on-time figure, the fat waiting-on-client column where every card says what is missing and since when, one reply read against last year{0}s list, one Approve and send. Hours, never dollars.",
}
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        await pg.goto(BASE + "/", wait_until="networkidle"); await pg.add_style_tag(content=HIDE)
        sec = pg.locator("section", has_text="Built for the office you actually run.").first
        await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(1200)
        tabs = sec.get_by_role("tab")
        for i, o in enumerate(IDS):
            await tabs.nth(i).click(); await pg.wait_for_timeout(1200)
            await sec.screenshot(path=str(A / f"os3-{o}.png")); print("captured", o)
        await ctx.close()
        ctx = await b.new_context(viewport={"width": 375, "height": 812}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); await pg.goto(BASE + "/", wait_until="networkidle"); await pg.add_style_tag(content=HIDE)
        sec = pg.locator("section", has_text="Built for the office you actually run.").first
        await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(1000)
        await sec.screenshot(path=str(A / "os3-mobile.png")); print("captured mobile")
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{o.title()}</b><span>{NOTES[o].format(Q)}</span></div><img src="assets-2026-10-15/os3-{o}.png"></section>' for o in IDS)
    rows += '<section><div class="lab"><b>Phone</b><span>The section at 375: the screen scaled, the line, the link, the list.</span></div><img class="phone" src="assets-2026-10-15/os3-mobile.png"></section>'
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems built</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}} img.phone{{width:375px}}</style><body>
<h1>Operating Systems built</h1><p class="intro">Homepage section 4 after the definition and value pass: each screen is the owner{Q}s view of that industry{Q}s operating system, work already done with one decision left, and under it the model{Q}s line for an example business, said to be example figures. No software names. The Work is folded in: Property carries its open link and a Built tag. Calm until clicked, then that screen plays once. Every name and figure is made up.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-15-operating-systems-built.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-15-operating-systems-built.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
