# /pilot hero: the label under "48 hours", line test (27 Oct 2026). Will: "1,
# instead of 2 days, do 48 hours, and i want somethign else underneath it, idk
# what though". Facts: the written page carries the jobs eating the most
# hours, what each costs a year in the owner's figures, which to hand over
# first, and a twelve month roadmap. The other two terms read "Free / No
# obligation" and "45 min / One call on how your business runs". Drawn in the
# hero (three terms, the third "48 hours"), at 1440 and 375.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-27"
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
LINES = [
  ("To your written page", "today's pick", None, .5, 1, 0, 0, .5),
  ("Your costs, on one page", "pair", None, 1, 1, .5, .5, 1),
  ("Your numbers, on one page", "pair", None, 1, 1, .5, .5, 1),
  ("The job to hand over first", "the deliverable", None, .5, 1, 1, 0, 1),
  ("What each job costs you", "owner" + Q + "s words", None, .5, 1, .5, 0, 1),
  ("Your jobs, costed", "fact, kicker", None, .5, 1, .5, 1, .5),
  ("What your admin costs, on paper", "callback to section 2", None, 1, 1, .5, .5, .5),
  ("Your written audit", "plain", None, .5, 1, 0, 0, 1),
  ("Your three costliest jobs", "number", None, .5, 1, .5, 0, .5),
  ("In your inbox", "picture", None, 1, .5, 0, .5, 1),
  ("The page, in your inbox", "picture", None, 1, .5, 0, .5, .5),
  ("What to hand over first", "plain", None, .5, 1, 1, 0, .5),
  ("Your plan, in writing", "pair", None, .5, 1, 0, .5, .5),
  ("Your figures, written down", "callback", None, .5, 1, .5, .5, .5),
  ("Until your written page", "plain", None, .5, 1, 0, 0, .5),
  ("Your audit, written up", "plain", None, .5, 1, 0, 0, .5),
  ("One page, your numbers", "pair", None, 1, 1, .5, .5, .5),
  ("Where the hours go, costed", "fact, kicker", None, .5, 1, .5, .5, .5),
  ("Your roadmap", "plain", None, 0, 1, 0, 0, .5),
  ("Every job, costed", "fact, kicker", "fails true: the page costs the jobs found, not every job", 0, 0, 0, 0, 0),
  ("Your results", "plain", "promises a result", 0, 0, 0, 0, 0),
  ("Your report", "plain", "says nothing of what is in it", 0, 0, 0, 0, 0),
  ("No waiting around", "familiar phrase", "says nothing of the page", 0, 0, 0, 0, 0),
]
OPTS = [
  ("a", "A. Line 2", "Your costs, on one page", "Says what arrives and what is on it, in four words (4 of 5). Recommended."),
  ("b", "B. Line 4", "The job to hand over first", "The page" + Q + "s answer, the thing the owner acts on (3.5 of 5)."),
  ("c", "C. Line 5", "What each job costs you", "The owner" + Q + "s own question, answered (3 of 5)."),
]
SET = """(label) => { const g=document.getElementById('book').querySelector('.grid .grid'); const tpl=g.firstElementChild;
 const terms=[["Free","No obligation"],["45 min","One call on how your business runs"],["48 hours",label]];
 g.innerHTML=''; terms.forEach(([n,l])=>{ const c=tpl.cloneNode(true); c.children[0].textContent=n; c.children[1].textContent=l; g.appendChild(c); });
 g.style.gridTemplateColumns='repeat(3, minmax(0,1fr))'; }"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, label, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                await pg.evaluate(SET, label); await pg.wait_for_timeout(300)
                if vw == 375:
                    await pg.screenshot(path=str(A / f"terms-label-{key}-375.png"), clip={"x": 0, "y": 0, "width": 375, "height": 560})
                else:
                    await pg.screenshot(path=str(A / f"terms-label-{key}-1440.png"), clip={"x": 100, "y": 220, "width": 620, "height": 420})
            await ctx.close()
        print("errors:", errs); await b.close()
    scored = [(i + 1, l, dev, gate, a, b_, c, d, e, a + b_ + c + d + e) for i, (l, dev, gate, a, b_, c, d, e) in enumerate(LINES)]
    fmt = lambda x: "%g" % x
    passed = sorted([s for s in scored if not s[3]], key=lambda s: -s[9]); failed = [s for s in scored if s[3]]
    trs = "".join(f'<tr><td class=n>{n}</td><td class=l>{l}</td><td>{dev}</td><td>{fmt(a)}</td><td>{fmt(b_)}</td><td>{fmt(c)}</td><td>{fmt(d)}</td><td>{fmt(e)}</td><td class=t>{fmt(t)}</td></tr>' for n, l, dev, g, a, b_, c, d, e, t in passed)
    fails = "".join(f'<li><b>{n}</b> {l} <span>({g})</span></li>' for n, l, dev, g, *_ in failed)
    opts = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span><p class=q>48 hours / {t}</p></div><div class="pair"><img src="assets-2026-10-27/terms-label-{k}-1440.png" style="width:620px"><img src="assets-2026-10-27/terms-label-{k}-375.png" style="width:280px"></div></section>' for k, n, t, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot hero: the 48 hours label</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:20px;margin:30px 0 12px}} .intro{{color:#aaa;max-width:1100px;margin:0 0 18px}}
table{{border-collapse:collapse;width:100%;max-width:1100px}} th,td{{text-align:left;padding:7px 10px;border-bottom:1px solid #2c2c2c}} th{{color:#999;font-weight:500;font-size:13px}} td{{color:#bbb;font-size:14px}} td.n{{color:#888;width:28px}} td.l{{color:#fff;font-size:15px}} td.t{{color:#fff;font-weight:600}}
ul{{color:#bbb;max-width:1100px;padding-left:18px}} ul span{{color:#888}} section{{margin-bottom:30px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .q{{margin:6px 0 0;color:#fff;font-size:16px}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot hero: the label under 48 hours</h1>
<p class="intro">{len(LINES)} labels, numbered. Scored out of 5 as before: Picture, Prove, Only us, Device, Will{Q}s shape. The other two terms are Free / No obligation and 45 min / One call on how your business runs.</p>
<table><tr><th>#</th><th>Label</th><th>Device</th><th>Picture</th><th>Prove</th><th>Only us</th><th>Device</th><th>Shape</th><th>Score /5</th></tr>{trs}</table>
<h2>Out at the gates</h2><ul>{fails}</ul><h2>In the hero</h2>{opts}</body>"""
    f = D / "design-pass-site-2026-10-27-pilot-terms-label.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1200, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-27-pilot-terms-label.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
