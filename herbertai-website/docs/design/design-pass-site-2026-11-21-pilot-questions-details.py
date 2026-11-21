# /pilot section 6, Questions: the details sheet (21 Nov 2026), straight after
# the build (Will: "A, folded"). Five details, three ways each, drawn from
# /lab/pilot-questions-details, which renders the section's own component with
# the lab props. Detail 1 is words, so it comes with the page's labels and
# headings read as a set and a line test of 32 headings scored on the Lines
# register (writing-style references/lines.md). Tidy checks (a word alone on a
# line, overflow, errors) at 1440, 1280, 375 and 320. Pass an output folder as
# the first argument.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-11-21"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}

SET = [("1", "AI Audit", "Find the job eating your time and money."), ("2", "What you get back", "What your admin costs, written down."),
       ("3", "The timeline", "Your first AI employee in four steps."), ("4", "What it fixes", "The jobs everyone hates doing."),
       ("5", "What comes next", "One job first. Then the system."), ("6", "Questions", "Before you book."),
       ("7", "", "Ready? Book your free AI audit ↑")]

# Out of 5, a point each, half for partly: Picture, Prove, Only us, Device,
# Will's shape. A gate failure is noted and the line not drawn.
LINES = [
    ("Before you book.", 0.5, 0, 0, 0.5, 1, "today; hands straight to section 7's \"Ready?\""),
    ("What owners ask first.", 0.5, 0.5, 0, 0, 1, ""),
    ("What owners ask before they book.", 0.5, 0.5, 0, 0, 0.5, "long"),
    ("Still deciding?", 0.5, 0, 0, 0.5, 1, ""),
    ("Asked on every call.", 0.5, 0.5, 0, 0.5, 0.5, "gate: not true, some came from replies"),
    ("The questions every owner asks.", 0, 0, 0, 0, 0.5, ""),
    ("Before you give it 45 minutes.", 1, 0.5, 0.5, 0.5, 0.5, "the audit's own number"),
    ("What you'd ask on the call.", 0.5, 0, 0.5, 0.5, 1, ""),
    ("Questions, answered plainly.", 0, 0, 0, 0, 0, "describes its own tone"),
    ("The fine print, in plain English.", 0.5, 0.5, 0, 1, 0, "slogan"),
    ("No fine print.", 0.5, 0.5, 0, 1, 0.5, "gate: the agreement has clauses"),
    ("Everything you'd ask first.", 0, 0, 0, 0, 0.5, "gate: twelve, not everything"),
    ("What stops people booking.", 0.5, 0.5, 0, 0.5, 0.5, "talks about the reader, not to them"),
    ("The catch? There isn't one.", 0.5, 0, 0, 1, 0, "slogan couplet; gate: a promise"),
    ("Asked and answered.", 0, 0, 0, 1, 0.5, ""),
    ("What’s the catch?", 0.5, 0, 0, 1, 1, "the owner's own question, a familiar phrase"),
    ("Fair questions.", 0, 0, 0, 0.5, 0.5, ""),
    ("Your questions, before the call.", 0.5, 0, 0, 0, 0.5, ""),
    ("Before the 45 minutes.", 1, 0.5, 0.5, 0, 0.5, ""),
    ("Ask anything.", 0, 0, 0, 0, 0, "gate: a fixed list"),
    ("What owners want to know.", 0, 0, 0, 0, 0.5, ""),
    ("The questions that come up.", 0, 0, 0, 0, 0.5, ""),
    ("Twelve questions owners ask.", 0.5, 0.5, 0, 1, 0.5, "a number"),
    ("What every office asks first.", 0.5, 0, 0, 0, 0.5, ""),
    ("Before you hand anything over.", 1, 0, 0.5, 0.5, 1, "echoes section 4; the audit hands nothing over"),
    ("Before you hand over a job.", 1, 0, 0.5, 0.5, 0.5, ""),
    ("Questions from real calls.", 0.5, 1, 0.5, 0, 0.5, "partly true: calls and replies"),
    ("What people ask on the call.", 0.5, 0.5, 0.5, 0, 0.5, ""),
    ("The doubts, answered.", 0, 0, 0, 0.5, 0, ""),
    ("Still got a question?", 0.5, 0, 0, 0.5, 1, "after twelve, reads as a close"),
    ("Read this before you book.", 0, 0, 0, 0, 0.5, ""),
    ("(no heading, the label alone)", 0, 0, 0, 0, 0.5, "judged on the page: twelve questions under a bare label"),
]
DRAWN = {"Before you book.": "1 (recommended)", "What’s the catch?": "2", "Before you give it 45 minutes.": "3"}

DETAILS = [
    ("1", "The heading", ["d1-1", "d1-2", "d1-3"],
     "Recommended 1, Before you book.: it scores 2, below the other two, but it hands straight to section 7's \"Ready? Book your free AI audit\" and every question under it is one asked before booking. 2 is the owner's own question and scores 2.5. 3 is the top score, 3, and carries the audit's own number, but it takes two lines at laptop and phone width where the others take one."),
    ("2", "What's open on load", ["d2-1", "d2-2", "d2-3"],
     "Recommended 2, all closed: the plus on every row already says it opens, and the two runs end level, where the first open leaves the left run two rows longer. 3 opens every answer on laptops, which is B from the options on a laptop, and folds them on phones."),
    ("3", "The sign on each row", ["d3-1", "d3-2", "d3-3"],
     "Recommended 1, plus and minus, as built: the plainest mark that a row opens and closes. 2, a chevron, reads as a menu. 3, the ring, makes each row's sign a button and adds twelve circles to the section."),
    ("4", "The order and runs", ["d4-1", "d4-2", "d4-3"],
     "Recommended 1, two runs of six, as built: the order already runs audit, cost, then clients and data, and the runs end level. 2 names the three runs, which helps a reader find the data questions but leaves seven rows on the left and five on the right. 3, one column, is twice as tall at laptop width."),
    ("5", "Phones", ["d5-1", "d5-2", "d5-3"],
     "Recommended 1, twelve rows, as built: already half today's height on a phone, and every question can be seen without a second tap. 2 shows three and folds nine behind \"Nine more questions\", a fold inside a fold. 3 drops the questions to 16px, so more sit on one line, a size below the page's other questions. Laptops are the same in all three."),
]

TIDY_JS = r"""(id) => { const s = document.querySelector(`section[data-shot='${id}']`); const out = [];
  for (const el of s.querySelectorAll('h2, h3, p, summary span')) { if (!el.offsetParent || !el.getClientRects().length) continue;
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
            pg.on("console", lambda m: errs.append("console: " + m.text[:160]) if m.type == "error" else None)
            await pg.goto("http://localhost:3000/lab/pilot-questions-details", wait_until="load", timeout=180000)
            await pg.wait_for_function("() => document.querySelectorAll('section[data-shot]').length === 15", timeout=180000)
            await pg.wait_for_timeout(800); await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            await pg.evaluate("() => document.querySelectorAll('body *').forEach(el => { if (getComputedStyle(el).position === 'fixed') el.style.display = 'none' })")
            sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
            if sw > iw: over.append(f"at {vw}: {sw} > {iw}")
            for _, _, ids, _ in [(d[0], d[1], d[2], d[3]) for d in DETAILS]:
                for key in ids:
                    w, h = await pg.evaluate(TIDY_JS, key); heights[(key, vw)] = h
                    if w: tidy.append(f"{key} at {vw}: {w}")
                    if shoot:
                        sec = pg.locator(f"section[data-shot='{key}']")
                        await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(150)
                        await sec.screenshot(path=str(A / f"pilot-questions-{key}-{vw}.png"))
            await ctx.close()
        print("errors:", errs or "none"); print("overflow:", over or "none"); print("tidy:", tidy or "clean")
        print("heights:", {f"{k}@{v}": h for (k, v), h in heights.items() if v in (1440, 375)}); await b.close()
    st = "".join(f"<tr{' class=pick' if n == '6' else ''}><td>{n}</td><td>{l}</td><td>{h}</td></tr>" for n, l, h in SET)
    lt = "".join(f"<tr{' class=pick' if l[0] in DRAWN else ''}><td>{i + 1}</td><td>{l[0]}</td><td>{l[1]}</td><td>{l[2]}</td><td>{l[3]}</td><td>{l[4]}</td><td>{l[5]}</td><td><b>{score(l)}</b></td><td>{DRAWN.get(l[0], '')}</td><td>{l[6]}</td></tr>" for i, l in enumerate(LINES))
    blocks = ""
    for n, name, ids, rec in DETAILS:
        figs = "".join(f'<div class="opt"><div class="cap">{n}.{i + 1}{" (as built)" if i == 0 else ""} · {heights[(k, 1440)]}px at 1440, {heights[(k, 375)]}px at 375</div><div class="pair"><img src="assets-2026-11-21/pilot-questions-{k}-1440.png" style="width:640px"><img src="assets-2026-11-21/pilot-questions-{k}-375.png" style="width:190px"></div></div>' for i, k in enumerate(ids))
        blocks += f'<section><h2>Detail {n} of 5, {name.lower()}</h2><p class="intro">{rec}</p><div class="row">{figs}</div></section>'
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot Questions, details</title><style>
body{{margin:0;background:#151515;color:#eee;font:14px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:19px;margin:30px 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1300px;margin:0 0 14px}}
table{{border-collapse:collapse;max-width:1300px;width:100%}} td,th{{text-align:left;padding:4px 9px;border-bottom:1px solid #333;vertical-align:top}} th{{color:#aaa;font-weight:500}} tr.pick td{{color:#fff;background:#222}} .lt td:nth-child(n+3):nth-child(-n+8){{text-align:center;width:40px}}
.row{{display:flex;flex-direction:column;gap:22px}} .cap{{color:#bbb;margin-bottom:6px}} .pair{{display:flex;gap:16px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 6, Questions: the details, three ways each (21 Nov 2026)</h1>
<p class="intro">Built as A, folded (Will, 21 Nov 2026). Five details, numbered: 1 the heading, 2 what is open on load, 3 the sign on each row, 4 the order and runs, 5 phones. The first way of each is what is built now. Answer with five numbers, one per detail.</p>
<h2>The page's labels and headings, top to bottom</h2><table>{st}</table>
<h2>Line test for detail 1: 32 headings</h2>
<p class="intro">Out of 5, a point each, half for partly: Picture, Prove, Only us, Device, Will's shape. Highlighted: the three drawn below.</p>
<table class="lt"><tr><th>#</th><th>Heading</th><th>Pic</th><th>Prove</th><th>Only</th><th>Dev</th><th>Shape</th><th>/5</th><th>Drawn</th><th>Note</th></tr>{lt}</table>
{blocks}</body>"""
    f = D / "design-pass-site-2026-11-21-pilot-questions-details.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1400, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-11-21-pilot-questions-details.png"), full_page=True); await b.close()
    print("sheet done")

asyncio.run(main())
