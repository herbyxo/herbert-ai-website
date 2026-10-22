# /pilot section 2: the label above the heading, line test (22 Oct 2026). Will:
# "idk if i like the 'what you get back' as the heading". Facts: the label is
# the small grey line above each section heading on /pilot. The page's labels
# are AI Audit, What you get back, How it works, What it fixes, After the pilot,
# Questions; the homepage's are names (How it works, AI Employees, Operating
# Systems, Products, Book the Audit, Founder), and Will trimmed "Free AI Audit"
# to "AI Audit". The hero's terms already call the thing "your written page"
# ("2 days: Business days to your written page") and promise it is "Yours: To
# keep, either way". The heading under the label stays "What your admin costs,
# written down."; the sheet's own label is "Sample audit page · a made-up
# practice". Drawn by replacing the label's text in the page.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-22"
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
# (label, device, gate note or None, Picture, Prove, Only us, Device, Will's shape)
LINES = [
  ("What you get back", "today", None, .5, 1, 0, .5, .5),
  ("The written page", "name", None, 1, 1, .5, 0, 1),
  ("Your written page", "name", None, 1, 1, .5, 0, 1),
  ("The page you keep", "name", None, 1, 1, 1, 0, 1),
  ("Your page to keep", "name", None, 1, 1, 1, 0, .5),
  ("Yours to keep", "familiar phrase", None, 0, 1, 1, .5, .5),
  ("What you keep", "phrase", None, .5, 1, .5, .5, .5),
  ("The audit page", "name", None, 1, .5, .5, 0, 1),
  ("Your audit page", "name", None, 1, .5, .5, 0, 1),
  ("The audit, written up", "name", None, 1, 1, .5, 0, .5),
  ("Two days later", "time jump", None, .5, 1, .5, 1, .5),
  ("In two days", "time jump", None, .5, 1, .5, .5, .5),
  ("After the audit", "sequence", None, .5, .5, 0, .5, .5),
  ("What comes back", "phrase", None, .5, 1, 0, .5, .5),
  ("On paper", "familiar phrase", None, 1, .5, 0, 1, .5),
  ("The write-up", "name", None, 1, .5, 0, 0, .5),
  ("Your write-up", "name", None, 1, .5, 0, 0, .5),
  ("Your page", "name", None, 1, .5, 0, 0, .5),
  ("The page", "name", None, 1, .5, 0, 0, .5),
  ("The numbers", "name", None, .5, .5, 0, 0, .5),
  ("Your numbers", "name", None, .5, .5, 0, 0, .5),
  ("What the audit finds", "phrase", None, .5, .5, 0, 0, .5),
  ("The findings", "name", None, 0, .5, 0, 0, .5),
  ("Afterwards", "sequence", None, 0, .5, 0, 0, .5),
  ("No label", "none", None, 0, 0, 0, 0, .5),
  ("Where the time goes", "name", "says the sheet's own label again", 0, 0, 0, 0, 0),
  ("Sample audit", "name", "says the sheet's own label again", 0, 0, 0, 0, 0),
  ("Written down", "phrase", "says the heading again", 0, 0, 0, 0, 0),
  ("What it costs", "phrase", "says the heading again", 0, 0, 0, 0, 0),
  ("The results", "name", "promises a result", 0, 0, 0, 0, 0),
  ("The deliverable", "name", "corporate word", 0, 0, 0, 0, 0),
]
OPTS = [
  ("today", "Today", "What you get back", "A phrase about receiving, where the page's other labels name the thing."),
  ("a", "A. Line 2", "The written page", "The hero's own name for it (\"Business days to your written page\"), as a plain name like AI Audit and How it works. Recommended: one name for the thing across the page (3.5 of 5)."),
  ("b", "B. Line 4", "The page you keep", "The top score (4 of 5): names the page and the fact that it is yours either way, which the hero's terms also say."),
  ("c", "C. Line 11", "Two days later", "A time jump after the hero's AI Audit, so the labels read in order: the audit, then what arrives (3.5 of 5)."),
]
SET = "(t) => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('What your admin costs')); sec.querySelector('h2').previousElementSibling.textContent=t; }"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, text, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                await pg.evaluate(SET, text)
                sec = pg.locator("section", has_text="What your admin costs").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                if vw == 375:
                    box = await pg.evaluate("() => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('What your admin costs')); const r=sec.getBoundingClientRect(); const sh=[...sec.querySelectorAll('div')].find(d=>d.textContent.startsWith('Sample audit page')).getBoundingClientRect(); return {x:0,y:r.top+scrollY,width:innerWidth,height:sh.top-r.top+150} }")
                    await pg.screenshot(path=str(A / f"written-label-{key}-375.png"), full_page=True, clip=box)
                else:
                    await sec.screenshot(path=str(A / f"written-label-{key}-1440.png"))
            await ctx.close()
        print("errors:", errs); await b.close()
    scored = [(i + 1, l, dev, gate, a, b_, c, d, e, a + b_ + c + d + e) for i, (l, dev, gate, a, b_, c, d, e) in enumerate(LINES)]
    fmt = lambda x: "%g" % x
    passed = sorted([s for s in scored if not s[3]], key=lambda s: -s[9]); failed = [s for s in scored if s[3]]
    trs = "".join(f'<tr><td class=n>{n}</td><td class=l>{l}</td><td>{dev}</td><td>{fmt(a)}</td><td>{fmt(b_)}</td><td>{fmt(c)}</td><td>{fmt(d)}</td><td>{fmt(e)}</td><td class=t>{fmt(t)}</td></tr>' for n, l, dev, g, a, b_, c, d, e, t in passed)
    fails = "".join(f'<li><b>{n}</b> {l} <span>({g})</span></li>' for n, l, dev, g, *_ in failed)
    opts = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img src="assets-2026-10-22/written-label-{k}-1440.png" style="width:900px"><img src="assets-2026-10-22/written-label-{k}-375.png" style="width:300px"></div></section>' for k, n, t, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot written page: the label</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:20px;margin:30px 0 12px}} .intro{{color:#aaa;max-width:1240px;margin:0 0 18px}}
table{{border-collapse:collapse;width:100%;max-width:1240px}} th,td{{text-align:left;padding:7px 10px;border-bottom:1px solid #2c2c2c}} th{{color:#999;font-weight:500;font-size:13px}} td{{color:#bbb;font-size:14px}} td.n{{color:#888;width:28px}} td.l{{color:#fff;font-size:15px}} td.t{{color:#fff;font-weight:600}}
ul{{color:#bbb;max-width:1240px;padding-left:18px}} ul span{{color:#888}} section{{margin-bottom:34px}} .lab{{margin-bottom:10px;max-width:1240px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 2: the label above the heading, line test</h1>
<p class="intro">{len(LINES)} labels, numbered. Scored out of 5 as before: Picture, Prove, Only us, Device, Will's shape (a plain name for the thing, like AI Audit and How it works; he trimmed Free AI Audit to AI Audit). The heading under it stays "What your admin costs, written down."</p>
<table><tr><th>#</th><th>Label</th><th>Device</th><th>Picture</th><th>Prove</th><th>Only us</th><th>Device</th><th>Shape</th><th>Score /5</th></tr>{trs}</table>
<h2>Out at the gates</h2><ul>{fails}</ul><h2>On the page</h2>{opts}</body>"""
    f = D / "design-pass-site-2026-10-22-pilot-written-label.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1320, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-22-pilot-written-label.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
