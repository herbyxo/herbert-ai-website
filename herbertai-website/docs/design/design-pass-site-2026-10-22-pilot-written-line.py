# /pilot section 2, the written page: details 2, the line under the heading
# (22 Oct 2026). Facts: today's line repeats "four person accounting practice",
# which the sheet's title beside it already says, and lists the jobs, hours and
# costs the sheet now shows. The whole sample goes on to "Start here" (the
# first AI employee to build) and "The next twelve months"; the hero's terms
# say the written page comes back within two business days. Drawn by replacing
# the line's text in the page, at 1440 and 375.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-22"
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
Q = chr(0x2019)
OPTS = [
  ("today", "Today", None, "Names the practice again and lists what the sheet beside it already shows."),
  ("1", "1. What else the whole page has", "A sample, for a made-up practice. The whole page goes on to the first AI employee to build and a plan for the next twelve months.",
   "Says it is a sample, then what the sheet does not show, so the link has a reason to be clicked."),
  ("2", "2. Yours, then this one", f"Yours comes back like this within two business days, from your own figures. This one is for a made-up practice.",
   "Turns the sample into a promise about the reader" + Q + "s own page, in the hero" + Q + "s terms (two business days), and keeps the made-up note. Recommended: the section is called What you get back, and this line says it."),
  ("3", "3. The made-up note only", "A sample, for a made-up practice. Every figure on it is illustrative.",
   "The shortest: the sheet does the showing, the line only says it is not a real business."),
]
JS = "(t) => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('What you get back')); const p=sec.querySelector('h2').nextElementSibling; p.textContent=t; }"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, text, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                if text: await pg.evaluate(JS, text)
                sec = pg.locator("section", has_text="What you get back").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                if vw == 375:
                    box = await pg.evaluate("() => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('What you get back')); const r=sec.getBoundingClientRect(); const sh=[...sec.querySelectorAll('div')].find(d=>d.textContent.startsWith('Sample audit page')).getBoundingClientRect(); return {x:0,y:r.top+scrollY,width:innerWidth,height:sh.top-r.top+160} }")
                    await pg.screenshot(path=str(A / f"written-line-{key}-{vw}.png"), full_page=True, clip=box)
                else:
                    await sec.screenshot(path=str(A / f"written-line-{key}-{vw}.png"))
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span>{"" if not t else f"<p class=q>{t}</p>"}</div><div class="pair"><img src="assets-2026-10-22/written-line-{k}-1440.png" style="width:900px"><img src="assets-2026-10-22/written-line-{k}-375.png" style="width:300px"></div></section>' for k, n, t, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot written page: the line</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1240px;margin:0 0 24px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1240px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .q{{margin:6px 0 0;color:#fff;font-size:16px}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 2, details 2: the line under the heading</h1><p class="intro">Today{Q}s line names the practice again and lists the jobs, hours and costs the sheet beside it already shows. At 1440 (left) and 375 (right).</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-22-pilot-written-line.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1300, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-22-pilot-written-line.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
