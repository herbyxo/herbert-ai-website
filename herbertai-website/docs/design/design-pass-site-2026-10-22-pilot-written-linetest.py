# /pilot section 2, details 2 again: the line test (22 Oct 2026). Will rejected
# the first three drafts ("none of those options are that great"); they had
# skipped the line test (writing-style references/lines.md). Facts: the audit is
# 45 minutes on how the business runs; the page comes back within two business
# days and is yours to keep either way (the hero's terms); costs are worked out
# from the owner's own hours and hourly rates (the sample page's method note);
# the whole page goes on to the first AI employee to build and the next twelve
# months; the sample is a made-up four person practice and must say so. The
# sheet already shows the jobs, who, hours, cost a year and the total, so the
# "made-up" note can move into the sheet's own label, leaving the line free.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-22"
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
Q = chr(0x2019)
# (line, device, gate note or None, Picture, Prove, Only us, Device, Will's shape)
LINES = [
  ("Ever added it up?", "question", None, .5, 0, 0, 1, 1),
  ("Ever added up what the chasing costs you?", "question", None, 1, 0, 0, 1, 1),
  ("You know it takes hours. Here is what those hours cost.", "fact, kicker", None, .5, .5, 0, 1, .5),
  ("Every job, in hours and dollars, on one page.", "the deliverable", None, 1, .5, .5, .5, .5),
  ("Yours comes back in two business days, worked out from your own figures.", "fact", None, .5, 1, .5, 0, .5),
  ("Worked out from your own hourly rates, not guesses.", "contrast", None, .5, 1, .5, 1, .5),
  ("Yours is worked out from your own hours and rates.", "plain statement", None, .5, 1, .5, 0, 1),
  ("Yours to keep, whether or not you build anything.", "plain statement", None, .5, 1, 1, .5, 1),
  ("The page is yours to keep, whatever you decide.", "plain statement", None, .5, 1, 1, .5, 1),
  (f"Here it{Q}s a made-up practice. In yours, the figures are your own.", "mirror", None, .5, 1, .5, 1, 0),
  ("Where the week goes, and what it costs a year.", "pair", None, 1, .5, 0, .5, .5),
  ("The jobs nobody wants, costed.", "fact, kicker", None, 1, .5, .5, 1, .5),
  ("Turns out it all adds up.", "familiar phrase", None, 0, 0, 0, 1, .5),
  ("It all adds up. This page shows how much.", "familiar phrase", None, .5, .5, 0, 1, .5),
  ("Shown here on a made-up accounting practice.", "plain statement", None, .5, .5, 0, 0, 1),
  ("Same page, your figures.", "pair", None, .5, .5, .5, 1, .5),
  ("Back in two business days, and yours to keep.", "pair", None, .5, 1, 1, .5, 1),
  ("Written up from your answers, back in two business days.", "fact", None, .5, 1, .5, .5, .5),
  ("What the chasing, retyping and reminding cost, in dollars a year.", "three", None, 1, 1, .5, .5, .5),
  ("The hours you guess at, in dollars.", "twist", None, .5, .5, .5, 1, .5),
  ("Hours you know about, in dollars you don" + Q + "t.", "mirror", None, .5, 0, 0, 1, 0),
  ("This one is made up. Yours won" + Q + "t be.", "mirror", None, 0, .5, 0, 1, 0),
  ("Ever wondered where Tuesday went?", "owner" + Q + "s moment", None, 1, 0, 0, 1, .5),
  ("Your admin, in black and white.", "familiar phrase", "says the heading again", 1, 0, 0, 1, .5),
  ("One page. Every job costed. The first one to hand over.", "three", None, 1, .5, .5, 1, 0),
  ("What it costs you to do it all by hand.", "plain statement", None, .5, 0, 0, 0, 1),
  ("The cost of doing it all by hand, worked out.", "fact, kicker", None, .5, .5, 0, .5, 1),
  ("From your own hours and rates, back in two business days, yours to keep.", "three", None, .5, 1, 1, .5, .5),
  ("A made-up practice here. Yours uses your own figures.", "pair", None, .5, 1, .5, .5, .5),
  ("Most owners have never added it up.", "owner" + Q + "s moment", "fails true: cannot be checked", 0, 0, 0, 0, 0),
  ("Half of it is usually one job.", "number", "fails true: usually is unproven", 0, 0, 0, 0, 0),
  ("No line. The heading, the link and the sheet carry it.", "none", None, 0, 1, 0, 0, 1),
]
OPTS = [
  ("a", "A. No line", None, "The heading, the link and the sheet. The made-up note moves into the sheet" + Q + "s label. Recommended: the sheet now shows what the line used to list, and three times on this page Will has kept the page moving by dropping a line that explained."),
  ("b", "B. Line 17", "Back in two business days, and yours to keep.", "The top score (4 of 5), two plain facts. It repeats two of the hero" + Q + "s four terms."),
  ("c", "C. Line 6", "Worked out from your own hourly rates, not guesses.", "Says what makes the figures worth reading: they are the owner" + Q + "s own, not an industry average (3.5 of 5)."),
]
SET = """(o) => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('What you get back')); const p=sec.querySelector('h2').nextElementSibling;
  if (o.text) p.textContent=o.text; else p.remove();
  const sh=[...sec.querySelectorAll('div')].find(d=>d.textContent.startsWith('Sample audit page')); sh.querySelector('p').textContent='Sample audit page · a made-up practice'; }"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, text, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                await pg.evaluate(SET, {"text": text})
                sec = pg.locator("section", has_text="What you get back").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                if vw == 375:
                    box = await pg.evaluate("() => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('What you get back')); const r=sec.getBoundingClientRect(); const sh=[...sec.querySelectorAll('div')].find(d=>d.textContent.startsWith('Sample audit page')).getBoundingClientRect(); return {x:0,y:r.top+scrollY,width:innerWidth,height:sh.top-r.top+150} }")
                    await pg.screenshot(path=str(A / f"written-lt-{key}-375.png"), full_page=True, clip=box)
                else:
                    await sec.screenshot(path=str(A / f"written-lt-{key}-1440.png"))
            await ctx.close()
        print("errors:", errs); await b.close()
    scored = [(i + 1, l, dev, gate, pic, prv, only, d, shape, pic + prv + only + d + shape) for i, (l, dev, gate, pic, prv, only, d, shape) in enumerate(LINES)]
    def fmt(x): return ("%g" % x)
    passed = sorted([s for s in scored if not s[3]], key=lambda s: -s[9])
    failed = [s for s in scored if s[3]]
    trs = "".join(f'<tr><td class=n>{n}</td><td class=l>{l}</td><td>{dev}</td><td>{fmt(a)}</td><td>{fmt(b_)}</td><td>{fmt(c)}</td><td>{fmt(d)}</td><td>{fmt(e)}</td><td class=t>{fmt(t)}</td></tr>' for n, l, dev, g, a, b_, c, d, e, t in passed)
    fails = "".join(f'<li><b>{n}</b> {l} <span>({g})</span></li>' for n, l, dev, g, *_ in failed)
    opts = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span>{"" if not t else f"<p class=q>{t}</p>"}</div><div class="pair"><img src="assets-2026-10-22/written-lt-{k}-1440.png" style="width:900px"><img src="assets-2026-10-22/written-lt-{k}-375.png" style="width:300px"></div></section>' for k, n, t, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot written page: line test</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:20px;margin:30px 0 12px}} .intro{{color:#aaa;max-width:1240px;margin:0 0 18px}}
table{{border-collapse:collapse;width:100%;max-width:1240px}} th,td{{text-align:left;padding:7px 10px;border-bottom:1px solid #2c2c2c;vertical-align:top}} th{{color:#999;font-weight:500;font-size:13px}} td{{color:#bbb;font-size:14px}} td.n{{color:#888;width:28px}} td.l{{color:#fff;font-size:15px}} td.t{{color:#fff;font-weight:600}}
ul{{color:#bbb;max-width:1240px;padding-left:18px}} ul span{{color:#888}} section{{margin-bottom:34px}} .lab{{margin-bottom:10px;max-width:1240px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .q{{margin:6px 0 0;color:#fff;font-size:16px}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 2, the line under the heading: line test</h1>
<p class="intro">{len(LINES)} lines, numbered so you can point at parts. Scored out of 5, a point each, half for partly: Picture (a word you can see), Prove (checkable on the page or the sample), Only us (would not work with a competitor{Q}s name in front), Device, Will{Q}s shape (plain, the owner{Q}s words, no slogan couplets, fewer words over explaining). In every option the made-up note moves into the sheet{Q}s label: "Sample audit page · a made-up practice".</p>
<table><tr><th>#</th><th>Line</th><th>Device</th><th>Picture</th><th>Prove</th><th>Only us</th><th>Device</th><th>Shape</th><th>Score /5</th></tr>{trs}</table>
<h2>Out at the gates</h2><ul>{fails}</ul>
<h2>Three options on the page</h2>{opts}</body>"""
    f = D / "design-pass-site-2026-10-22-pilot-written-linetest.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1320, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-22-pilot-written-linetest.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
