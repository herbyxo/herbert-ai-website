# /pilot section 4, What it fixes, redone as one unit (4 Nov 2026). Will: "do
# all the employees actually match to the text underneath them? ie intake and
# retyping idk if that really matches, same as the maintenance one". Three
# sheets in one: the fit check (each employee against its own lines on the
# site, the rule written 4 Nov), the line test for the six card titles, and
# today plus A, B and C drawn from /lab/pilot-fixes-redo at 1440 and 375, with
# the tidy checks (an employee line past its card, a word alone on a line)
# measured on every option. Pass an output folder as the first argument.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-11-04"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}

# Titles for A and C, four drafts a card. Out of 5, a point each, half for
# partly: Picture, True to that employee's work, Plain to a stranger, the set's
# grammar (a noun phrase, the thing that piles up), Will's shape (short, plain,
# the owner's own word).
LINES = [
  ("Penny · Requests", [("Missing documents", 1, 1, 1, 1, 1), ("Chasing documents", 1, 1, 1, 0, 1), ("Document chasing", 1, 1, 0.5, 1, 0.5), ("Paperwork", 0.5, 0.5, 1, 1, 0.5)]),
  ("Max · Sales Coordinator", [("Quote questions", 1, 1, 1, 1, 1), ("Quote follow-up", 0.5, 0.5, 0.5, 1, 0.5), ("Customer questions", 0.5, 1, 1, 1, 0.5), ("Answering quotes", 0.5, 1, 1, 0, 0.5)]),
  ("Hazel · Waitlist", [("Cancellations", 1, 1, 1, 1, 1), ("Empty appointments", 1, 1, 1, 1, 0.5), ("Last-minute gaps", 1, 1, 0.5, 1, 0.5), ("The wait list", 0.5, 1, 1, 1, 0)]),
  ("Emma · Maintenance", [("Repairs", 1, 1, 1, 1, 1), ("Tenant requests", 0.5, 1, 1, 1, 0.5), ("Maintenance requests", 1, 1, 1, 1, 0), ("Booking tradies", 1, 1, 1, 0, 0.5)]),
  ("Clara · Functions", [("Event enquiries", 1, 1, 1, 1, 1), ("Party bookings", 1, 0.5, 1, 1, 1), ("Function enquiries", 1, 1, 1, 1, 0), ("Enquiries", 0, 1, 1, 1, 0.5)]),
  ("Rose · Arrears", [("Late rent", 1, 1, 1, 1, 1), ("Rent reminders", 1, 1, 1, 1, 0.5), ("Chasing rent", 1, 1, 1, 0, 1), ("Arrears", 0.5, 1, 0, 1, 0)]),
]
NOTES = {"Maintenance requests": "repeats the line above it", "Function enquiries": "repeats the line above it", "Arrears": "a trade word, and repeats the line above it", "The wait list": "names the tool, not the job"}

# Fit check: every employee shown, against its own lines on the site.
FIT = [
  ("Penny · Requests", "Missing documents", "Finance screen: \"9 reminders sent, 2nd round\"; her card reads a client's reply against last year and drafts the request for what is missing", "fits", "A, B, C"),
  ("Max · Sales Coordinator", "Quote questions / The same emails", "Trades screen: \"Reply to Priya sent, quote unchanged\", \"Booked Thu 10am measure and quote\"", "fits", "A, B, C"),
  ("Hazel · Waitlist", "Cancellations", "Health screen: \"2:15pm with Chris opened up. Three patients on the wait list want it\", then \"Sam T. booked into 2:15pm with Chris\"", "fits", "A, C"),
  ("Emma · Maintenance", "Repairs", "Property screen: \"Plumber $380, inside the landlord's $500 limit. Booked 8:30am unless you say no\", then \"Plumber booked for 8:30am, tenant told\"", "fits", "A, C"),
  ("Clara · Functions", "Event enquiries", "Hospitality screen: \"Tom asked about a 40th for 60 ... $79 a head, proposal attached, visit Sunday 10am?\", then \"Site visit booked\"", "fits", "A, C"),
  ("Rose · Arrears", "Late rent", "Property screen: \"8 Sturt St, 15 days behind\", then \"Reminder sent, promised Wednesday\"", "fits", "A, C"),
  ("Kit · Dispatch", "Handovers", "Trades screen: \"Placed it with Sam, 40 min from his 8am\"; Kit has no title anywhere, so Dispatch is new", "fits, title new", "B"),
  ("Ivy · Data Entry, Bea · Bookings, Ned · Reports", "Re-typing, Booking admin, The Monday report", "New example employees: on the site nowhere, so nothing to contradict and nothing showing them at work", "new", "B"),
]

OPTS = [
  ("today", "Today", "Two pairings wrong (Nora on re-typing, Emma on handovers), two loose (Rita on booking admin, Vic on the Monday report)."),
  ("a", "A. Six jobs, six offices", "Recommended. Six jobs everyone hates, from every kind of office the site sells to (two from property), each under the employee the site already shows doing it, each sentence written from that employee's own work. Every pairing checks out, every title is the top line of its test, and a reader sees their own office in the set."),
  ("b", "B. Today's six jobs, matched", "Today's six jobs and sentences kept. Penny and Max stay, Kit takes Handovers as Dispatch, and three new example employees take the jobs nobody on the site does. The jobs stay general, and three of the six people exist nowhere else."),
  ("c", "C. What they did today", "A's six employees and titles, each with a line of its work in its screen's own words, the way the charter says copy should read (\"Chased 6 clients for missing payslips\"). The most concrete; it reads as a log, so a stranger infers the job from the result."),
]

WIDOW_JS = r"""(id) => { const s = document.querySelector(`section[data-shot='${id}']`);
  const over = [...s.querySelectorAll('p.whitespace-nowrap')].filter(p => { const c = p.closest('div.min-w-0'); return c && p.getBoundingClientRect().right > c.getBoundingClientRect().right + 1 }).map(p => p.textContent);
  const vis = [...s.querySelectorAll('div.min-w-0 p')].filter(p => !p.classList.contains('whitespace-nowrap') && p.offsetParent !== null);
  const widows = vis.map(p => { const w = p.textContent.trim().split(/\s+/); const h = p.innerHTML; p.innerHTML = w.map(x => '<span>' + x + '</span>').join(' ');
    const sp = [...p.querySelectorAll('span')]; const t = sp[sp.length - 1].getBoundingClientRect().top; const n = sp.filter(x => Math.abs(x.getBoundingClientRect().top - t) < 2).length; p.innerHTML = h; return n === 1 ? w[w.length - 1] : null }).filter(Boolean);
  return [over, widows] }"""


def score(t):
    return t[1] + t[2] + t[3] + t[4] + t[5]


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); errs = []; over = []; tidy = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            pg.on("console", lambda m: errs.append("console: " + m.text[:160]) if m.type == "error" else None)
            await pg.goto("http://localhost:3000/lab/pilot-fixes-redo", wait_until="load", timeout=180000)
            await pg.wait_for_function("() => document.querySelectorAll('section[data-shot]').length === 4", timeout=180000)
            await pg.wait_for_timeout(800); await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            await pg.evaluate("() => document.querySelectorAll('body *').forEach(el => { if (getComputedStyle(el).position === 'fixed') el.style.display = 'none' })")
            sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
            if sw > iw: over.append(f"at {vw}: {sw} > {iw}")
            for key, _, _ in OPTS:
                o, w = await pg.evaluate(WIDOW_JS, key)
                if o or w: tidy.append(f"{key} at {vw}: overrun {o or '-'}, single-word lines {w or '-'}")
                sec = pg.locator(f"section[data-shot='{key}']")
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(200)
                await sec.screenshot(path=str(A / f"pilot-fixes-redo-{key}-{vw}.png"))
            await ctx.close()
        print("errors:", errs or "none"); print("overflow:", over or "none"); print("tidy:", tidy or "clean"); await b.close()
    lt = ""
    for emp, drafts in LINES:
        best = max(drafts, key=score)
        for d in drafts:
            lt += f"<tr{' class=pick' if d is best else ''}><td>{emp}</td><td>{d[0]}</td><td>{d[1]}</td><td>{d[2]}</td><td>{d[3]}</td><td>{d[4]}</td><td>{d[5]}</td><td><b>{score(d)}</b></td><td>{NOTES.get(d[0], '')}</td></tr>"
    fit = "".join(f"<tr><td>{e}</td><td>{j}</td><td>{ev}</td><td>{v}</td><td>{o}</td></tr>" for e, j, ev, v, o in FIT)
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{r}</span></div><div class="pair"><img src="assets-2026-11-04/pilot-fixes-redo-{k}-1440.png" style="width:920px"><img src="assets-2026-11-04/pilot-fixes-redo-{k}-375.png" style="width:250px"></div></section>' for k, n, r in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot What it fixes, redone</title><style>
body{{margin:0;background:#151515;color:#eee;font:14px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:19px;margin:30px 0 10px;font-weight:600}} .intro{{color:#aaa;max-width:1220px;margin:0 0 18px}}
table{{border-collapse:collapse;width:100%;max-width:1220px}} td,th{{text-align:left;padding:5px 9px;border-bottom:1px solid #333;vertical-align:top}} th{{color:#aaa;font-weight:500}} tr.pick td{{color:#fff;background:#222}} .lt td:nth-child(n+3):nth-child(-n+8){{text-align:center;width:46px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1220px}} .lab b{{font-size:17px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 4, What it fixes, redone as one unit (4 Nov 2026)</h1>
<p class="intro">Will: "do all the employees actually match to the text underneath them?" Every option keeps his 4 Nov details (name and job above the title, no note, phones two across) and the heading, his own line. A and C use only employees the site already shows doing that job.</p>
<h2>The fit check: each employee against its own work on the site</h2>
<table><tr><th>Employee</th><th>Card</th><th>Where the site shows it doing this</th><th>Fit</th><th>In</th></tr>{fit}</table>
<h2>Line test: the six card titles for A and C, four drafts each</h2>
<p class="intro">Out of 5, a point each, half for partly: Picture, True to that employee's work, Plain to a stranger, the set's grammar (a noun phrase naming the thing that piles up), Will's shape. The highlighted line in each group is the one used.</p>
<table class="lt"><tr><th>Employee</th><th>Title</th><th>Pic</th><th>True</th><th>Plain</th><th>Gram</th><th>Shape</th><th>/5</th><th>Note</th></tr>{lt}</table>
<h2>Today and three ways, drawn (1440 left, 375 right)</h2>{rows}</body>"""
    f = D / "design-pass-site-2026-11-04-pilot-fixes-redo.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1300, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-11-04-pilot-fixes-redo.png"), full_page=True); await b.close()
    print("sheet done")

asyncio.run(main())
