# /pilot section 7, the close: the details sheet (22 Nov 2026), straight after
# the build (Will: "do B, the form again"). Four details, three ways each, drawn
# from /lab/pilot-close-details (the section's own component with the lab props
# and the real footer). Detail 1 is words, so it comes with the page's labels
# and headings read as a set and a line test of 33 closes scored on the Lines
# register. Tidy checks at 1440, 1280, 375 and 320. Pass an output folder as the
# first argument.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-11-22"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}

SET = [("1", "AI Audit", "Find the job eating your time and money."), ("2", "What you get back", "What your admin costs, written down."),
       ("3", "The timeline", "Your first AI employee in four steps."), ("4", "What it fixes", "The jobs everyone hates doing."),
       ("5", "What comes next", "One job first. Then the system."), ("6", "Questions", "Before you book."),
       ("7", "Book the Audit", "Ready?"), ("home", "Book the Audit", "Got a job eating your time and money?")]

# Out of 5, a point each, half for partly: Picture, Prove, Only us, Device,
# Will's shape (for a close, the question the owner already asks themselves).
LINES = [
    ("Ready?", 0, 0, 0, 0.5, 0.5, "as built"),
    ("Got a job eating your time and money?", 1, 0, 0.5, 1, 1, "Will's own, the home page's close; on /pilot it answers the first section's line"),
    ("Find the job eating your time and money.", 1, 0, 0.5, 1, 0.5, "the first section's heading word for word"),
    ("Ready when you are.", 0, 0, 0, 1, 0.5, ""),
    ("Got a job everyone hates doing?", 1, 0, 0, 0.5, 1, "section 4's heading is nearly the same"),
    ("Book the 45 minutes.", 0.5, 0.5, 0.5, 0, 0.5, ""),
    ("Which job goes first?", 0.5, 0, 0.5, 0.5, 1, ""),
    ("What would you hand over first?", 0.5, 0, 0, 0.5, 1, ""),
    ("Start with the job that costs you most.", 0.5, 0, 0, 0, 0.5, "the home page's How It Works heading"),
    ("Got a job you'd hand over tomorrow?", 1, 0, 0, 0.5, 1, ""),
    ("Your first AI employee starts here.", 0.5, 0, 0.5, 0, 0.5, ""),
    ("One call. One job. Fourteen days.", 0.5, 0.5, 0.5, 1, 0, "slogan three"),
    ("Still reading? Book it.", 0, 0, 0, 1, 0, "cheeky"),
    ("Seen enough?", 0, 0, 0, 0.5, 0.5, ""),
    ("Ready to find yours?", 0, 0, 0, 0.5, 0.5, "gate: yours what"),
    ("Ready to find the job?", 0.5, 0, 0, 0, 0.5, ""),
    ("Got one in mind?", 0, 0, 0, 0.5, 1, "gate: one what"),
    ("Which job eats your week?", 1, 0, 0.5, 0.5, 1, ""),
    ("45 minutes on how your business runs.", 0.5, 0.5, 0.5, 0, 0.5, ""),
    ("Let's find the job.", 0.5, 0, 0, 0, 0.5, ""),
    ("Free, 45 minutes, yours to keep.", 0, 0.5, 0.5, 1, 0, "slogan three"),
    ("Got a job you'd happily hand over?", 1, 0, 0, 0.5, 1, ""),
    ("What's the job everyone hates?", 1, 0, 0, 0.5, 1, "the first form's own question"),
    ("Book your free AI audit.", 0, 0, 0, 0, 0.5, "repeats the button"),
    ("Find out what your admin costs.", 0.5, 0.5, 0.5, 0, 0.5, "near section 2's heading"),
    ("Ready to hand one over?", 0.5, 0, 0, 0.5, 0.5, ""),
    ("Got a Monday report?", 1, 0, 0, 0.5, 0.5, "gate: one office's job"),
    ("Your turn.", 0, 0, 0, 0.5, 0, ""),
    ("Start with one job.", 0.5, 0, 0, 0, 1, ""),
    ("Talk today.", 0.5, 0.5, 0, 0, 0.5, "the thanks page's heading"),
    ("What’s eating your week?", 1, 0, 0, 1, 1, "a familiar phrase, the owner's question"),
    ("Done reading?", 0, 0, 0, 0.5, 0, ""),
    ("(no heading, the label alone)", 0, 0, 0, 0, 0.5, "judged on the page: a form under a bare label"),
]
DRAWN = {"Ready?": "1 (as built)", "Got a job eating your time and money?": "2 (recommended)", "What’s eating your week?": "3"}

DETAILS = [
    ("1", "The heading", ["d1-1", "d1-2", "d1-3"],
     "Recommended 2, Got a job eating your time and money?: your own line, the home page's close, the question the owner already asks themselves, and on /pilot it answers the first section's \"Find the job eating your time and money.\" from the other end of the page. It scores 3.5, the top of the test. 1, Ready?, scores 1. 3 scores 3 and is new."),
    ("2", "The label", ["d2-1", "d2-2", "d2-3"],
     "Recommended 1, Book the Audit, as built: the home page's label, in title case, which the charter sets for every label (your 13 Oct call). 2 drops it. 3 matches /pilot's other five labels, which are sentence case against the charter; that is for /pilot's words pass, not this section."),
    ("3", "The fields", ["d3-1", "d3-2", "d3-3"],
     "Recommended 1, four fields, as built: you said you call them and they tell you about the job, and someone who has read the whole page is near to booking, so the end form asks least. The first form keeps the job box. 2 asks it here too, so every /pilot lead arrives with the job named on the leads page. 3 shows the box without requiring it."),
    ("4", "The ground", ["d4-1", "d4-2", "d4-3"],
     "Recommended 1, the dark band, as built: it marks the end of the page and is the home page's own ending, so the two pages close the same way. 2 keeps the page's paper. 3 repeats the first section's layout with its three terms, a bookend, and is the tallest on a phone; its terms leave a word alone on a line at 375 and 320, as the first section's own terms do today (logged for /pilot's phone pass)."),
]

TIDY_JS = r"""(id) => { const s = document.querySelector(`[data-shot='${id}'] section`); const out = [];
  for (const el of s.querySelectorAll('h2, p, label, button, div')) { if (!el.offsetParent || el.querySelector('p, div, label')) continue;
    const tn = []; const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); while (w.nextNode()) tn.push(w.currentNode);
    const words = []; for (const n of tn) { const re = /\S+/g; let m; while ((m = re.exec(n.data))) { const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length); const b = r.getBoundingClientRect(); if (b.width) words.push({ t: m[0], top: Math.round(b.top) }); } }
    if (words.length < 3) continue; const tops = [...new Set(words.map(x => x.top))]; if (tops.length < 2) continue;
    const last = Math.max(...tops); const on = words.filter(x => Math.abs(x.top - last) < 4); if (on.length === 1) out.push(on[0].t); }
  return [out, Math.round(s.getBoundingClientRect().height)] }"""


def score(l):
    return l[1] + l[2] + l[3] + l[4] + l[5]


async def main():
    heights = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); errs = []; over = []; tidy = []
        for vw, vh, dpr, shoot in [(1440, 900, 1, True), (1280, 800, 1, False), (375, 812, 2, True), (320, 700, 2, False)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            pg.on("console", lambda m: errs.append("console: " + m.text[:160]) if m.type == "error" and "same id" not in m.text else None)
            await pg.goto("http://localhost:3000/lab/pilot-close-details", wait_until="load", timeout=180000)
            await pg.wait_for_function("() => document.querySelectorAll('[data-shot]').length === 12", timeout=180000)
            await pg.wait_for_timeout(800); await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            await pg.evaluate("() => document.querySelectorAll('body *').forEach(el => { if (getComputedStyle(el).position === 'fixed') el.style.display = 'none' })")
            sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
            if sw > iw: over.append(f"at {vw}: {sw} > {iw}")
            for _, _, ids, _ in DETAILS:
                for key in ids:
                    w, h = await pg.evaluate(TIDY_JS, key); heights[(key, vw)] = h
                    if w: tidy.append(f"{key} at {vw}: {w}")
                    if shoot:
                        sec = pg.locator(f"[data-shot='{key}'] section")
                        await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(150)
                        await sec.screenshot(path=str(A / f"pilot-close-{key}-{vw}.png"))
            await ctx.close()
        print("errors:", errs or "none"); print("overflow:", over or "none"); print("tidy:", tidy or "clean")
        print("heights:", {f"{k}@{v}": h for (k, v), h in heights.items() if v in (1440, 375)}); await b.close()
    st = "".join(f"<tr{' class=pick' if n in ('7', 'home') else ''}><td>{n}</td><td>{l}</td><td>{h}</td></tr>" for n, l, h in SET)
    lt = "".join(f"<tr{' class=pick' if l[0] in DRAWN else ''}><td>{i + 1}</td><td>{l[0]}</td><td>{l[1]}</td><td>{l[2]}</td><td>{l[3]}</td><td>{l[4]}</td><td>{l[5]}</td><td><b>{score(l)}</b></td><td>{DRAWN.get(l[0], '')}</td><td>{l[6]}</td></tr>" for i, l in enumerate(LINES))
    blocks = ""
    for n, name, ids, rec in DETAILS:
        figs = "".join(f'<div class="opt"><div class="cap">{n}.{i + 1}{" (as built)" if i == 0 else ""} · {heights[(k, 1440)]}px at 1440, {heights[(k, 375)]}px at 375</div><div class="pair"><img src="assets-2026-11-22/pilot-close-{k}-1440.png" style="width:640px"><img src="assets-2026-11-22/pilot-close-{k}-375.png" style="width:190px"></div></div>' for i, k in enumerate(ids))
        blocks += f'<section><h2>Detail {n} of 4, {name.lower()}</h2><p class="intro">{rec}</p><div class="row">{figs}</div></section>'
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot the close, details</title><style>
body{{margin:0;background:#151515;color:#eee;font:14px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:19px;margin:30px 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1300px;margin:0 0 14px}}
table{{border-collapse:collapse;max-width:1300px;width:100%}} td,th{{text-align:left;padding:4px 9px;border-bottom:1px solid #333;vertical-align:top}} th{{color:#aaa;font-weight:500}} tr.pick td{{color:#fff;background:#222}} .lt td:nth-child(n+3):nth-child(-n+8){{text-align:center;width:40px}}
.row{{display:flex;flex-direction:column;gap:22px}} .cap{{color:#bbb;margin-bottom:6px}} .pair{{display:flex;gap:16px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 7, the close: the details, three ways each (22 Nov 2026)</h1>
<p class="intro">Built as B, the form again (Will, 22 Nov 2026). Four details, numbered: 1 the heading, 2 the label, 3 the fields, 4 the ground. The first way of each is what is built now. Answer with four numbers, one per detail.</p>
<h2>The page's labels and headings, top to bottom, and the home page's close</h2><table>{st}</table>
<h2>Line test for detail 1: 33 closes</h2>
<p class="intro">Out of 5, a point each, half for partly: Picture, Prove, Only us, Device, Will's shape. Highlighted: the three drawn below.</p>
<table class="lt"><tr><th>#</th><th>Heading</th><th>Pic</th><th>Prove</th><th>Only</th><th>Dev</th><th>Shape</th><th>/5</th><th>Drawn</th><th>Note</th></tr>{lt}</table>
{blocks}</body>"""
    f = D / "design-pass-site-2026-11-22-pilot-close-details.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1400, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-11-22-pilot-close-details.png"), full_page=True); await b.close()
    print("sheet done")

asyncio.run(main())
