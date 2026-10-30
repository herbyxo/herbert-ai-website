# /pilot section 3, How it works: the heading and the rows under Live, again
# (30 Oct 2026). Will: "idk about the heading for that 'audit first, then
# fourteen days' and idk about any of the wording under live". The 23 Oct test
# found that a heading summarising all four stops fails because the first two
# stops repeat the hero; the way in is Will's own answer to "what happens after
# the audit?". Two sheets: the line test (every draft scored, Lines register)
# and the options drawn on the live section at 1440 and 375 by changing the
# words in the page. Pass an output folder as the first argument.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-10-30"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}
Q = "’"

# The heading line test. Score out of 5, a point each, half for partly:
# Picture (a word you can see), Prove (true and checkable), Only us (could a
# competitor say it), Device (a shape that holds), Will's shape (one or two
# beats, a plain statement, never a slogan couplet or a mirrored three; the
# owner's own words win). Six went out at the gates before scoring.
HEADINGS = [
  (1, "Audit first. Then fourteen days.", "today", 0.5, 1, 0.5, 1, 0, "a two-beat slogan couplet: shape 0, as on 23 Oct"),
  (2, "What happens after you book.", "", 0.5, 1, 0.5, 0.5, 1, "the owner" + Q + "s own question, as a statement"),
  (3, "From the audit to day 14.", "", 0.5, 1, 1, 0.5, 1, "the span the line covers"),
  (4, "Your first AI employee, from the call to day 14.", "", 1, 1, 1, 0.5, 0.5, "names the thing; a tail"),
  (5, "How the first job gets handed over.", "", 1, 0.5, 0.5, 0.5, 1, ""),
  (6, "Four steps from the call to live.", "", 0.5, 1, 0.5, 0.5, 0.5, ""),
  (7, "What happens, and when.", "", 0, 1, 0, 0.5, 1, "nothing to picture"),
  (8, "Booked, built, live.", "", 0.5, 1, 0.5, 1, 0, "a self-mythologising three"),
  (9, "The fourteen days, step by step.", "", 0.5, 1, 0.5, 0.5, 0.5, ""),
  (10, "Audit to live in fourteen days.", "", 0.5, 1, 1, 0.5, 0.5, ""),
  (11, "A call, a report, then fourteen days.", "", 1, 1, 0.5, 1, 0, "a three"),
  (12, "After the audit, fourteen days.", "", 0.5, 1, 0.5, 0.5, 0.5, ""),
  (13, "What you get, and when.", "", 0.5, 1, 0, 0.5, 1, ""),
  (14, "The job handed over in fourteen days.", "", 1, 1, 0.5, 0.5, 1, "near the 23 Oct line he passed on"),
  (15, "One call. One report. One AI employee.", "", 1, 1, 1, 1, 0, "a mirrored three: shape 0"),
  (16, "From the call to a working AI employee.", "", 1, 1, 1, 0.5, 0.5, ""),
  (17, "Here is how it goes.", "", 0, 1, 0, 0.5, 1, ""),
  (18, "Two weeks, four stops.", "", 0.5, 1, 0.5, 1, 0, "a couplet"),
  (19, "What happens between the call and day 14.", "", 0.5, 1, 1, 0.5, 1, ""),
  (20, "Fourteen days from go.", "", 0.5, 1, 1, 0.5, 0.5, "the page" + Q + "s own phrase"),
  (21, "The audit, the build, then live.", "", 0.5, 1, 0.5, 1, 0, "a three"),
  (22, "How your first AI employee gets built.", "", 1, 1, 1, 0.5, 1, "doubles the label above it: How it works / How your..."),
  (23, "What the first two weeks look like.", "", 0.5, 1, 0.5, 0.5, 1, ""),
  (24, "From booking to day 14.", "", 0.5, 1, 0.5, 0.5, 1, ""),
  (25, "Four stops, then it" + Q + "s running.", "", 0.5, 1, 0.5, 0.5, 0.5, ""),
  (26, "A call, a report, a build, a walkthrough.", "", 1, 1, 0.5, 1, 0, "a four"),
  (27, "Everything between booking and day 14.", "", 0.5, 1, 0.5, 0.5, 1, ""),
  (28, "The first job, start to finish.", "", 1, 1, 0.5, 0.5, 1, ""),
  (29, "What happens after the audit.", "", 0.5, 1, 0.5, 0.5, 1, "the 24 Oct way back in, as a statement"),
  (30, "Your first AI employee in four steps.", "", 1, 1, 1, 0.5, 1, "the four stops, named for what they make"),
]
DRAW_H = {"a": (30, "A. Your first AI employee in four steps.", "Recommended: top score with his shape, the four stops named for what they make."),
          "b": (3, "B. From the audit to day 14.", "The span the line covers, nothing more."),
          "c": (2, "C. What happens after you book.", "The owner" + Q + "s own question as a statement; the 24 Oct way back in.")}

# The rows under Live. Facts (the run sheet, "What the client sees", day 14):
# the system working on their data, the approval screen, a log of what it did
# and why, a walkthrough with the team, the roadmap of the next jobs. Scored as
# sets: Picture, True, Same grammar as the other stops' rows, Plain to a
# stranger, Will's shape.
ROWS = [
  ("today", "Today", ["Working on your actual clients, your team okaying every message before it is sent", "A walkthrough with your team", "The next jobs worth handing over, in order"], 0.5, 1, 0.5, 1, 0, "the first row carries two facts; okaying; Will: idk about any of it"),
  ("a", "A", ["Doing the job on your actual clients", "Nothing sent until your team says yes", "A walkthrough with your team", "The next jobs to hand over, in order"], 1, 1, 1, 1, 1, "recommended: one fact a row, and \"your team says yes\" is his own heading" + Q + "s phrase"),
  ("b", "B", ["Your team uses it the same day", "A yes from your team before anything is sent", "A walkthrough so everyone knows how", "The next jobs, in order"], 1, 1, 0.5, 1, 0.5, "the owner" + Q + "s day: rows 1 and 3 are the pre-tone-pass rows he never objected to"),
  ("c", "C", ["The job running on your clients", "An approve button on every message", "A log of what it did and why", "A team walkthrough"], 1, 1, 1, 1, 0.5, "the run sheet" + Q + "s own list: the log is a new fact, the next jobs drop to the questions"),
]

SET_H = "(t) => { const h = [...document.querySelectorAll('h2')].find(h => h.textContent.includes('Audit first.')); h.textContent = t }"
SET_ROWS = """(rows) => { const sec = [...document.querySelectorAll('section')].find(s => s.textContent.includes('Audit first.') || s.querySelector('h2'));
  const s2 = [...document.querySelectorAll('section')].find(s => s.querySelector('ol') && s.textContent.includes('14 days from your go'));
  s2.querySelectorAll('ol').forEach(ol => { const li = ol.children[3]; const ul = li.querySelector('ul'); const tpl = ul.firstElementChild; ul.innerHTML = '';
    rows.forEach(r => { const x = tpl.cloneNode(true); x.textContent = r; ul.appendChild(x) }) }) }"""
MARK = "() => { const s = [...document.querySelectorAll('section')].find(s => s.querySelector('ol') && s.textContent.includes('14 days from your go')); s.setAttribute('data-shot','1') }"

def score(r): return r[3] + r[4] + r[5] + r[6] + r[7]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); errs = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            shots = [("h-today", None, None)] + [(f"h-{k}", HEADINGS[n - 1][1], None) for k, (n, _, _) in DRAW_H.items()] + [(f"r-{k}", None, rows) for k, _, rows, *_ in ROWS if k != "today"]
            for key, h, rows in shots:
                await pg.goto("https://herbert-aisolutions.com/pilot", wait_until="networkidle", timeout=120000)
                await pg.add_style_tag(content="nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}")
                if h: await pg.evaluate(SET_H, h)
                if rows: await pg.evaluate(SET_ROWS, rows)
                await pg.evaluate(MARK)
                sec = pg.locator("section[data-shot]").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                await sec.screenshot(path=str(A / f"how-{key}-{vw}.png"))
            await ctx.close()
        print("errors:", errs); await b.close()
    # Sheet 1: the line test.
    hrows = "".join(f"<tr><td>{n}</td><td>{t}{' <i>(today)</i>' if tag else ''}</td><td>{p1}</td><td>{p2}</td><td>{p3}</td><td>{p4}</td><td>{p5}</td><td><b>{score((n,t,tag,p1,p2,p3,p4,p5,note))}</b></td><td>{note}</td></tr>" for n, t, tag, p1, p2, p3, p4, p5, note in HEADINGS)
    rrows = "".join(f"<tr><td>{lab}</td><td>{' / '.join(rows)}</td><td>{p1}</td><td>{p2}</td><td>{p3}</td><td>{p4}</td><td>{p5}</td><td><b>{p1+p2+p3+p4+p5}</b></td><td>{note}</td></tr>" for k, lab, rows, p1, p2, p3, p4, p5, note in ROWS)
    sheet = f"""<!doctype html><meta charset=utf-8><title>/pilot How it works, line test</title><style>
body{{margin:0;background:#151515;color:#eee;font:14px/1.4 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:24px;margin:0 0 6px;font-weight:600}} h2{{font-size:18px;margin:28px 0 8px;font-weight:600}} p{{color:#aaa;max-width:1100px;margin:0 0 14px}}
table{{border-collapse:collapse;width:100%}} td,th{{text-align:left;padding:5px 9px;border-bottom:1px solid #333;vertical-align:top}} th{{color:#aaa;font-weight:500}} td:nth-child(n+3):nth-child(-n+8){{text-align:center;width:52px}} i{{color:#888}}</style><body>
<h1>/pilot section 3, How it works: the heading and the rows under Live (line test, 30 Oct 2026)</h1>
<p>Out of 5, a point each, half for partly: Picture, Prove, Only us, Device, Will{Q}s shape. Six drafts went out at the gates. A, B and C are drawn on the page in the other sheet.</p>
<h2>The heading, 30 lines</h2><table><tr><th>#</th><th>Line</th><th>Pic</th><th>Prove</th><th>Only us</th><th>Device</th><th>Shape</th><th>/5</th><th>Note</th></tr>{hrows}</table>
<h2>The rows under Live, as sets</h2><p>Scored as sets: Picture, True, Same grammar as the other stops{Q} rows, Plain to a stranger, Will{Q}s shape.</p>
<table><tr><th></th><th>Rows</th><th>Pic</th><th>True</th><th>Grammar</th><th>Plain</th><th>Shape</th><th>/5</th><th>Note</th></tr>{rrows}</table></body>"""
    f1 = D / "design-pass-site-2026-10-30-pilot-how-lines.html"; f1.write_text(sheet, encoding="utf-8")
    # Sheet 2: the options drawn.
    def pair(key, lab, note): return f'<section><div class="lab"><b>{lab}</b><span>{note}</span></div><div class="pair"><img src="assets-2026-10-30/how-{key}-1440.png" style="width:920px"><img src="assets-2026-10-30/how-{key}-375.png" style="width:250px"></div></section>'
    body = '<h2>The heading (rows as today)</h2>' + pair("h-today", "Today: Audit first. Then fourteen days.", "") + "".join(pair(f"h-{k}", lab, note) for k, (n, lab, note) in DRAW_H.items())
    body += '<h2>The rows under Live (heading as today)</h2>' + "".join(pair(f"r-{k}", f"{lab}: " + " / ".join(rows), note) for k, lab, rows, *_, note in ROWS if k != "today")
    board = f"""<!doctype html><meta charset=utf-8><title>/pilot How it works, the words</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:20px;margin:30px 0 14px;font-weight:600}} .intro{{color:#aaa;max-width:1220px;margin:0 0 24px}}
section{{margin-bottom:34px}} .lab{{margin-bottom:10px;max-width:1220px}} .lab b{{font-size:17px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 3, How it works: the heading and the rows under Live, three ways each</h1><p class="intro">Drawn by changing the words on the live section. Pick one heading and one set of rows. 1440 left, 375 right.</p>{body}</body>"""
    f2 = D / "design-pass-site-2026-10-30-pilot-how-words.html"; f2.write_text(board, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1280, "height": 1000})
        await pg.goto(f1.as_uri()); await pg.wait_for_timeout(500); await pg.screenshot(path=str(D / "design-pass-site-2026-10-30-pilot-how-lines.png"), full_page=True)
        await pg.goto(f2.as_uri()); await pg.wait_for_timeout(800); await pg.screenshot(path=str(D / "design-pass-site-2026-10-30-pilot-how-words.png"), full_page=True)
        await b.close()
    print("sheets done")
asyncio.run(main())
