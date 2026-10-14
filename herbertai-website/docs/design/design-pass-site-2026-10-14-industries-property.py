# Industries, Property's system three ways (14 Oct 2026). Built as a lab page
# (/lab/industries-property, src/app/components/lab/IndustryOptions.js) in the
# section's layout A with Property active; captured whole at 1440 in the
# finished state (reduced motion), plus each visual close up.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-14"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important} .sticky{position:static!important} .fixed.bottom-0{display:none!important}"
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        await pg.goto(BASE + "/lab/industries-property", wait_until="networkidle"); await pg.add_style_tag(content=HIDE)
        for o in "abc":
            await pg.evaluate(f"document.querySelector('[data-opt={o}] section').scrollIntoView()"); await pg.wait_for_timeout(2500)
            sec = await pg.query_selector(f"[data-opt={o}] section")
            await sec.screenshot(path=str(A / f"ind-prop-{o}.png"))
            vis = await pg.query_selector(f"[data-opt={o}] section .relative.w-full")
            await vis.screenshot(path=str(A / f"ind-prop-{o}-zoom.png"))
            print("captured", o)
        print("errors:", errs)
        await b.close()
Q = chr(0x2019)
OPTS = [
  ("A", f"The hub{Q}s morning", f"The approvals screen a principal opens at 7am: three decisions waiting, each from a named AI employee (Emma · Maintenance, Kate · Renewals, Rose · Arrears), approved one by one as it plays; the week{Q}s count and the four boards beside it. Shows the whole system at once, and that a person decides everything that matters.", "a"),
  ("B", "One repair, start to finish", f"A tenant{Q}s 11:42pm text, the overnight timeline with real timestamps, and the property manager{Q}s single approval at 7:05am, on a split screen, with the week{Q}s count under it. The research{Q}s own pick: the problem every agency owner recognises, and the landlord{Q}s limit and the person{Q}s yes are on screen, so {chr(0x201C)}what if it gets it wrong{chr(0x201D)} is answered before it is asked. Recommended.", "b"),
  ("C", "The maintenance board", "The jobs board with a no-hot-water card moving across it overnight from New to Done, pausing once for a person. Closest to the real product, and the busiest picture.", "c"),
]
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><img src="assets-2026-10-14/ind-prop-{v}.png"><img class="zoom" src="assets-2026-10-14/ind-prop-{v}-zoom.png"></section>' for n, t, d, v in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Industries: Property three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}} img.zoom{{width:1100px}}</style><body>
<h1>Industries: Property three ways</h1><p class="intro">Homepage section 4 in your layout A: the five industries listed on the right, the big screen showing the active industry{Q}s full system. Property is drawn three ways; the other four industries follow whichever you pick. Each shown in place at 1440, then the screen close up, in its finished state. All three play when they come into view at /lab/industries-property. Every name, address and figure is made up.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-14-industries-property.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-14-industries-property.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
