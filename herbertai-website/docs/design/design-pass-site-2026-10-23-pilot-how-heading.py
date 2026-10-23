# /pilot section 3, How it works: the heading, line test (23 Oct 2026). Will:
# "i dont like the title for section 3". Today: "Audit first. Then fourteen
# days.", a two-beat slogan couplet, the shape his Lines register scores 0.
# Facts: the timeline under it runs the free audit (45 minutes), the written
# page (within two business days), the first AI employee built (14 days from
# the go), live on day 14; the pilot is "$3,500 fixed. Live in 14 days or it's
# free." The hero above says "Find the job eating your time and money." (his own
# phrase). Drawn by replacing the heading text in the page, at 1440 and 375.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-23"
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
Q = chr(0x2019)
# (line, device, gate note or None, Picture, Prove, Only us, Device, Will's shape)
LINES = [
  ("Audit first. Then fourteen days.", "today, couplet", None, .5, 1, .5, 1, 0),
  ("One job off your plate in 14 days.", "familiar phrase bent", None, 1, .5, .5, 1, 1),
  ("The job eating your time, handed over in 14 days.", "callback to the hero", None, 1, 1, .5, .5, 1),
  ("Your worst job, handed over in 14 days.", "plain statement", None, 1, 1, .5, 0, 1),
  ("Live 14 days after you say go.", "plain statement", None, .5, 1, .5, .5, 1),
  (f"Live in 14 days, or it{Q}s free.", "condition", None, 0, 1, 1, .5, 1),
  ("From a 45 minute chat to a job that runs itself.", "from, to", None, 1, 1, .5, .5, .5),
  ("Your first AI employee in 14 days.", "plain statement", None, .5, 1, .5, 0, 1),
  ("14 days from go to live.", "from, to", None, .5, 1, .5, .5, .5),
  ("From the audit to day 14.", "from, to", None, .5, 1, .5, .5, .5),
  ("Two weeks from yes to running.", "from, to", None, .5, 1, .5, .5, .5),
  (f"Done in 14 days, or it{Q}s free.", "condition", None, 0, 1, 1, .5, .5),
  ("How your first job gets handed over.", "plain statement", None, 1, .5, 0, 0, 1),
  ("What you get, and when.", "pair", None, 0, 1, 0, .5, 1),
  ("Live on day 14.", "plain statement", None, .5, 1, .5, 0, .5),
  ("Start small. Go live in 14 days.", "couplet", None, 0, 1, .5, 1, 0),
  ("What happens after you book.", "plain statement", None, 0, 1, 0, 0, 1),
  ("How a job leaves your desk.", "picture", None, 1, 0, 0, .5, .5),
  ("Four steps, 14 days.", "couplet", None, 0, 1, 0, 1, 0),
  ("One job, handed over for good.", "plain statement", None, 1, 0, 0, 0, .5),
  ("The job you hate, sorted in 14 days.", "owner" + Q + "s words", None, 1, .5, .5, .5, .5),
  ("Your first job runs itself by day 14.", "plain statement", None, .5, .5, .5, .5, .5),
  ("Book on Monday. Live a fortnight later.", "couplet", None, .5, .5, .5, 1, 0),
  ("No heading: the label and the timeline", "none", None, 0, 1, 0, 0, .5),
  ("A fortnight, start to finish.", "familiar phrase", "fails true: the audit and the page come before the 14 days", 0, 0, 0, 0, 0),
  ("Two weeks, not two months.", "contrast", "fails true: nothing on the page shows the two months", 0, 0, 0, 0, 0),
  ("Faster than hiring.", "contrast", "fails true: cannot be checked", 0, 0, 0, 0, 0),
  ("The job you hate, gone in 14 days.", "owner" + Q + "s words", "promises a result: the employee does the job, the team still approves", 0, 0, 0, 0, 0),
  ("The whole thing takes 14 days.", "plain statement", "fails true: the audit and the page come first", 0, 0, 0, 0, 0),
  ("Here" + Q + "s what happens next.", "plain statement", "says nothing alone", 0, 0, 0, 0, 0),
]
OPTS = [
  ("a", "A. Line 3", "The job eating your time, handed over in 14 days.", "Picks up your hero line (\"Find the job eating your time and money.\") and finishes it: the hero finds the job, this section hands it over. Recommended: the page tells one story, in your own words (4 of 5)."),
  ("b", "B. Line 2", "One job off your plate in 14 days.", "A familiar phrase bent to fit, the shape of \"at the click of a button\" (4 of 5)."),
  ("c", "C. Line 6", f"Live in 14 days, or it{Q}s free.", "The pilot" + Q + "s promise as the heading, a big claim said plainly (3.5 of 5). The price line on the timeline says it again."),
]
SET = "(t) => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('Audit first. Then fourteen days.')); sec.querySelector('h2').textContent=t; sec.setAttribute('data-how','1'); }"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, text, note in [("today", "Today", "Audit first. Then fourteen days.", "")] + OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                await pg.evaluate(SET, text)
                sec = pg.locator("section[data-how]").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                if vw == 375:
                    box = await pg.evaluate("() => { const s=document.querySelector('section[data-how]'); const r=s.getBoundingClientRect(); return {x:0,y:r.top+scrollY,width:innerWidth,height:Math.min(r.height,760)} }")
                    await pg.screenshot(path=str(A / f"how-head-{key}-375.png"), full_page=True, clip=box)
                else:
                    await sec.screenshot(path=str(A / f"how-head-{key}-1440.png"))
            await ctx.close()
        print("errors:", errs); await b.close()
    scored = [(i + 1, l, dev, gate, a, b_, c, d, e, a + b_ + c + d + e) for i, (l, dev, gate, a, b_, c, d, e) in enumerate(LINES)]
    fmt = lambda x: "%g" % x
    passed = sorted([s for s in scored if not s[3]], key=lambda s: -s[9]); failed = [s for s in scored if s[3]]
    trs = "".join(f'<tr><td class=n>{n}</td><td class=l>{l}</td><td>{dev}</td><td>{fmt(a)}</td><td>{fmt(b_)}</td><td>{fmt(c)}</td><td>{fmt(d)}</td><td>{fmt(e)}</td><td class=t>{fmt(t)}</td></tr>' for n, l, dev, g, a, b_, c, d, e, t in passed)
    fails = "".join(f'<li><b>{n}</b> {l} <span>({g})</span></li>' for n, l, dev, g, *_ in failed)
    opts = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span><p class=q>{t}</p></div><div class="pair"><img src="assets-2026-10-23/how-head-{k}-1440.png" style="width:900px"><img src="assets-2026-10-23/how-head-{k}-375.png" style="width:280px"></div></section>' for k, n, t, d in [("today", "Today", "Audit first. Then fourteen days.", "Two beats, a slogan couplet.")] + OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot How it works: the heading</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:20px;margin:30px 0 12px}} .intro{{color:#aaa;max-width:1240px;margin:0 0 18px}}
table{{border-collapse:collapse;width:100%;max-width:1240px}} th,td{{text-align:left;padding:7px 10px;border-bottom:1px solid #2c2c2c}} th{{color:#999;font-weight:500;font-size:13px}} td{{color:#bbb;font-size:14px}} td.n{{color:#888;width:28px}} td.l{{color:#fff;font-size:15px}} td.t{{color:#fff;font-weight:600}}
ul{{color:#bbb;max-width:1240px;padding-left:18px}} ul span{{color:#888}} section{{margin-bottom:34px}} .lab{{margin-bottom:10px;max-width:1240px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .q{{margin:6px 0 0;color:#fff;font-size:16px}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 3, How it works: the heading, line test</h1>
<p class="intro">{len(LINES)} lines, numbered so you can point at parts. Scored out of 5, a point each, half for partly: Picture, Prove (checkable on the page), Only us, Device, Will{Q}s shape (plain, the owner{Q}s words, one beat, no slogan couplets, which score 0). The label above it stays How it works.</p>
<table><tr><th>#</th><th>Heading</th><th>Device</th><th>Picture</th><th>Prove</th><th>Only us</th><th>Device</th><th>Shape</th><th>Score /5</th></tr>{trs}</table>
<h2>Out at the gates</h2><ul>{fails}</ul><h2>On the page</h2>{opts}</body>"""
    f = D / "design-pass-site-2026-10-23-pilot-how-heading.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1320, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-23-pilot-how-heading.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
