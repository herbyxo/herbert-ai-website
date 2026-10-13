# The Work, done properly (13 Oct 2026): three section layouts built as a lab
# page (/lab/the-work-2, src/app/components/lab/WorkSectionOptions.js), each
# calm until the visitor interacts. Captured whole at 1440 in the finished
# state (reduced motion), A twice (as it loads, and with the marketing engine
# picked), plus today's section from the homepage.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-13"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important} .sticky{position:static!important} .fixed.bottom-0{display:none!important}"
async def capture():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        home = await ctx.new_page(); await home.goto(BASE + "/", wait_until="networkidle"); await home.add_style_tag(content=HIDE)
        el = await home.evaluate_handle("() => [...document.querySelectorAll('main section')].find(s => s.offsetParent !== null && s.innerText.includes('The systems, not the slides'))")
        await home.evaluate("(s) => s.scrollIntoView()", el); await home.wait_for_timeout(1200)
        out["today"] = await home.evaluate("(s) => Math.round(s.getBoundingClientRect().height)", el)
        await el.as_element().screenshot(path=str(A / "work2-today.png"))
        lab = await ctx.new_page(); await lab.goto(BASE + "/lab/the-work-2", wait_until="networkidle"); await lab.add_style_tag(content=HIDE)
        for o in "abc":
            await lab.evaluate(f"document.querySelector('[data-opt={o}] section').scrollIntoView()"); await lab.wait_for_timeout(3500)
            for fr in lab.frames[1:]:
                try: await fr.add_style_tag(content="nextjs-portal{display:none!important}")
                except Exception: pass
            el = await lab.query_selector(f"[data-opt={o}] section")
            out[o] = await lab.evaluate("(s) => Math.round(s.getBoundingClientRect().height)", el)
            await el.screenshot(path=str(A / f"work2-{o}.png"))
        await lab.click("[data-opt=a] [role=tab]:nth-child(4)"); await lab.wait_for_timeout(1500)
        await (await lab.query_selector("[data-opt=a] section")).screenshot(path=str(A / "work2-a-engine.png"))
        print(out); await b.close()
    return out
Q = chr(0x2019)
def opts(m):
    return [
      ("A", "Option C, with the list as switches", f"Your pick kept: one screen large, the four beside it, and clicking one swaps the screen and plays it once. It opens on the live dashboard; the second picture is the same section with the marketing engine picked. {m['a']}px. Recommended: every system gets the big screen, the section stays calm until clicked, and it keeps the shape you chose.", ["a", "a-engine"]),
      ("B", "Four screens at once", f"All four screens in a 2 by 2 grid, each playing when hovered. The most to look at, and nothing to click to find it, but each screen is smaller, and on a phone it is four screens to scroll past. {m['b']}px.", ["b"]),
      ("C", "Tabs over a full-width stage", f"Four tabs across the top and one wide screen, swapping and playing on click. The biggest screen, and the tallest section ({m['c']}px), so the next section does not show under it.", ["c"]),
    ]
def sheet(m):
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div>' + "".join(f'<img src="assets-2026-10-13/work2-{v}.png">' for v in vs) + '</section>' for n, t, d, vs in opts(m))
    return f"""<!doctype html><meta charset=utf-8><title>The Work, done properly</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}} .today{{border-bottom:1px solid #333;padding-bottom:32px;margin-bottom:34px}}</style><body>
<h1>The Work, done properly</h1><p class="intro">The section after the AI employees scene, so each option stays calm until the visitor clicks or hovers; then that system plays once. Every system now has its own visual: the live property dashboard, the accountant demo, the brokerage hub{Q}s pipeline (shown on the live site only once Rob clears it; words until then) and the marketing engine{Q}s dashboard. Shown at 1440, finished state. They run at /lab/the-work-2.</p>
<section class="today"><div class="lab"><b>Today</b><span>Option C as built: the dashboard still, the rest as a list. {m['today']}px. For comparison, not an option.</span></div><img src="assets-2026-10-13/work2-today.png"></section>{rows}</body>"""
async def render(m):
    html = D / "design-pass-site-2026-10-13-the-work-2.html"; html.write_text(sheet(m))
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-13-the-work-2.png"), full_page=True); await b.close()
m = asyncio.run(capture()); asyncio.run(render(m)); print("sheet done")
