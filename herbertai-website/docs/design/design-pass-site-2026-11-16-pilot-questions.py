# /pilot section 6, Questions: the options sheet (16 Nov 2026). Will: "Yes,
# section 6". The sheet opens with the brief (who reaches this section and what
# they come with, from the build's own records), then the question set with the
# source of each question, then today and A, B and C drawn from
# /lab/pilot-questions at 1440 and 375, with the tidy checks (a word alone on a
# line, horizontal overflow) measured at 1440, 1280, 375 and 320. Pass an output
# folder as the first argument.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-11-16"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}

BRIEF = [
    ("Who reaches it", "An owner or office manager of a 3 to 20 person office (accountants, clinics, trades offices, property managers, venues) who has read the offer, the sample report, the timeline, the jobs and the stages, and has not booked. Most arrive from a cold email, a LinkedIn message, a referral or a door knock, and open the site to check the person and the work are real."),
    ("What they come with", "One doubt that stops the booking. From the records: wanting a person before a commitment (\"Can we catch up first?\"), wanting proof (\"can you send me somewhere to have a look at what you do\"), price (the $25,000 floor put a clinic owner off; he never pushed back on $3,500), the risk of AI writing to their clients, their clients' data, \"why can't I build it myself\" (a technical owner, 29 Oct), and being pitched a problem that was only typical of the industry (\"you are on the wrong track for our business\")."),
    ("What they leave with", "The one answer, then the form one link up (section 7), or a clear reason it is not for them."),
    ("Today", "Eight questions, all open, two columns, about 700 words. All eight are about the terms; three repeat /pricing. None answers data, AI writing to clients, what happens if Herbert AI stops, or ChatGPT."),
    ("What bounds it", "Answers match the services agreement: data with providers hosting in Australia (cl. 9), never used to train an AI model (cl. 9), every record the client's (cl. 7.1), a licence to the code that never ends (cl. 7.2), Herbert AI hosting while support runs, then moved to the client's accounts (cl. 7.4), nothing switched off or held back (cl. 8.2). The FAQPage data reads the same questions, so what is shown is what AI search reads. No client names. Not drafted: \"Have you done this in my field?\" The true answer in most fields is not yet, and whether the site says so is Will's call."),
]

QSET = [
    ("The audit", "Why is the audit free?", "Today's first question; \"How do I know it saves anything?\" (clinic call prep)"),
    ("The audit", "Do I have to buy anything after it?", "Today; \"probably need more information before I try it\" (reply rules, 12 Nov)"),
    ("The audit", "What counts as a job worth handing over?", "Today; \"you are on the wrong track for our business\" (the job is theirs to name)"),
    ("The cost", "What does $3,500 get me?", "Today; /pricing asks it too"),
    ("The cost", "What if it is not live in 14 days?", "Today; the guarantee is said nowhere else in the page's body"),
    ("The cost", "What does \"the $3,500 taken off\" mean?", "Today; the phrase is section 5's"),
    ("The cost", "What does it cost after day 30?", "Today, cut to the choice"),
    ("Clients and data", "Is my clients' information safe?", "New. \"Patient data and privacy\" (clinic call prep); \"customer data cannot leave Australia\" (29 Oct call)"),
    ("Clients and data", "Will it talk to my clients on its own?", "New here, on /faq already. \"AI talking to patients is risky\" (clinic call prep)"),
    ("Clients and data", "Do I have to change my software?", "Today. \"Cliniko and HotDoc already do this\"; \"works with the software they already use\", never \"any software\" (call prep)"),
    ("Clients and data", "What happens if Herbert AI stops?", "New. \"You're one person\" (clinic call prep); agreement cl. 7.2, 8.1, 8.2"),
    ("Clients and data", "Couldn't I just use ChatGPT?", "New. Asked on the 29 Oct call; the objection handler's site-safe answer"),
]

OPTS = [
    ("today", "Today", "Eight questions about the terms, every answer open, about 700 words in two columns."),
    ("a", "A. Twelve, folded", "Recommended. The twelve questions owners actually ask, each one line with its answer a tap away (the first drawn open). The reader has one doubt; twelve questions scan in one screen and nothing is cut. Costs a tap per answer, and it is the one place on the site that opens."),
    ("b", "B. Twelve, open, in three groups", "The same twelve, every answer open, grouped as the audit, the cost and your clients and your data. Nothing to tap and the groups say what each column covers. The longest of the three: nearly as tall as today at laptop width and taller on a phone, because four questions were added and only cut answers paid for them."),
    ("c", "C. Five, a line each", "The five that stop a booking, each answered in one line, question left and answer right, then a link to /faq for the rest. The shortest. The money questions after the first lean on section 5 above, and /faq does not yet carry the data, Herbert AI stopping or ChatGPT answers."),
]

TIDY_JS = r"""(id) => { const s = document.querySelector(`section[data-shot='${id}']`);
  const out = [];
  for (const el of s.querySelectorAll('h2, h3, p, dt, dd')) { if (!el.offsetParent) continue;
    const tn = []; const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); while (w.nextNode()) tn.push(w.currentNode);
    const words = []; for (const n of tn) { const re = /\S+/g; let m; while ((m = re.exec(n.data))) { const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length); const b = r.getBoundingClientRect(); if (b.width) words.push({ t: m[0], top: Math.round(b.top) }); } }
    if (words.length < 3) continue; const tops = [...new Set(words.map(x => x.top))]; if (tops.length < 2) continue;
    const last = Math.max(...tops); const on = words.filter(x => Math.abs(x.top - last) < 4); if (on.length === 1) out.push(on[0].t);
  }
  return [out, Math.round(s.getBoundingClientRect().height)] }"""


async def main():
    heights = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); errs = []; over = []; tidy = []
        for vw, vh, dpr, shoot in [(1440, 900, 1, True), (1280, 800, 1, False), (375, 812, 2, True), (320, 700, 2, False)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            pg.on("console", lambda m: errs.append("console: " + m.text[:160]) if m.type == "error" else None)
            await pg.goto("http://localhost:3000/lab/pilot-questions", wait_until="load", timeout=180000)
            await pg.wait_for_function("() => document.querySelectorAll('section[data-shot]').length === 4", timeout=180000)
            await pg.wait_for_timeout(800); await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            await pg.evaluate("() => document.querySelectorAll('body *').forEach(el => { if (getComputedStyle(el).position === 'fixed') el.style.display = 'none' })")
            sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
            if sw > iw: over.append(f"at {vw}: {sw} > {iw}")
            for key, _, _ in OPTS:
                w, h = await pg.evaluate(TIDY_JS, key)
                heights[(key, vw)] = h
                if w: tidy.append(f"{key} at {vw}: single-word lines {w}")
                if shoot:
                    sec = pg.locator(f"section[data-shot='{key}']")
                    await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(200)
                    await sec.screenshot(path=str(A / f"pilot-questions-{key}-{vw}.png"))
            await ctx.close()
        print("errors:", errs or "none"); print("overflow:", over or "none"); print("tidy:", tidy or "clean")
        print("section heights:", {f"{k}@{v}": h for (k, v), h in heights.items()}); await b.close()
    brief = "".join(f"<tr><td>{k}</td><td>{v}</td></tr>" for k, v in BRIEF)
    qset = "".join(f"<tr><td>{g}</td><td>{q}</td><td>{s}</td></tr>" for g, q, s in QSET)
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{r}</span> <i>Section height {heights[(k, 1440)]}px at 1440, {heights[(k, 375)]}px at 375.</i></div><div class="pair"><img src="assets-2026-11-16/pilot-questions-{k}-1440.png" style="width:920px"><img src="assets-2026-11-16/pilot-questions-{k}-375.png" style="width:250px"></div></section>' for k, n, r in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot Questions, options</title><style>
body{{margin:0;background:#151515;color:#eee;font:14px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:19px;margin:30px 0 10px;font-weight:600}} .intro{{color:#aaa;max-width:1220px;margin:0 0 18px}}
table{{border-collapse:collapse;width:100%;max-width:1220px}} td,th{{text-align:left;padding:6px 10px;border-bottom:1px solid #333;vertical-align:top}} th{{color:#aaa;font-weight:500}} td:first-child{{color:#aaa;white-space:nowrap}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1220px}} .lab b{{font-size:17px;margin-right:12px}} .lab span{{color:#bbb}} .lab i{{color:#888;font-style:normal}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 6, Questions: today and three ways (16 Nov 2026)</h1>
<p class="intro">The section sits between What comes next and the link back up to the form: the last place a reader who has not booked looks for the one answer that stops them. The label and heading stay as they are in every option; words are the details pass.</p>
<h2>The brief</h2><table>{brief}</table>
<h2>The question set: twelve, and where each came from</h2>
<p class="intro">A and B use all twelve. C keeps the audit's first two, the 14 days, data and talking to clients.</p>
<table><tr><th>Group</th><th>Question</th><th>Source</th></tr>{qset}</table>
<h2>Today and three ways, drawn (1440 left, 375 right)</h2>{rows}</body>"""
    f = D / "design-pass-site-2026-11-16-pilot-questions.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1300, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-11-16-pilot-questions.png"), full_page=True); await b.close()
    print("sheet done")

asyncio.run(main())
