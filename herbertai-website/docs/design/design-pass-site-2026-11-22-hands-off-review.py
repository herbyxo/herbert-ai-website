# The hands-off pass's review sheets (22 Nov 2026). Will: "you just automate the
# design pass and choose the recommendations, and then I'll see." One sheet per
# page, as built: the page at 1440 and 375, the picks in words, the close calls
# marked. Each page is also measured at 1440, 1280, 1024, 375, 360 and 320 for
# overflow and errors. Pass an output folder as the first argument.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-11-22"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}

PAGES = [
    ("pilot", "/pilot", "How it works: whole page, phones and words", "Every section was picked by Will. This pass only fixed what the whole-page audit found.", [
        "Labels in title case, the charter's rule: What You Get Back, The Timeline, What It Fixes, What Comes Next. The names are unchanged.",
        "On phones the first section's three terms are a row each, the figure left and its line right. Three narrow columns left \"report\" and \"runs\" alone on a line.",
        "Timeline titles a size smaller between 1024 and 1280 wide, where \"Your written report\" split.",
        "The six job cards go to one column below 360 wide, where \"The Monday report\" did not fit half a column.",
        "Edit and Skip wrap as a pair under Approve and send at 320.",
        "The form's job box is tall enough on phones to show its whole example.",
    ], [
        "The terms' phone layout changed from three columns, which was part of the first section picked on 22 Oct.",
    ]),
    ("faq", "/faq", "FAQ", "Reached from the footer and from AI search by someone after one answer.", [
        "The thirteen questions folded, the way /pilot's are, so questions look and work one way across the site. Weighed against today's open cards and against folding the page into /pilot.",
        "Heading \"What owners ask.\" in place of \"Common questions. Straight answers.\", a mirrored pair.",
        "No intro paragraph. An \"Email a question\" link sits under the list, where the need arises.",
        "Answers in plain facts: the five industries as the site now names them, the software line as /pilot's (\"works with\", checked in the audit), the ownership answer as the agreement has it.",
        "\"Is there any lock-in?\" in place of \"Are there contracts or lock-in?\", since a build does come with an agreement. \"Where is Herbert AI based?\" in place of \"Where are you based?\".",
        "Ends on the shared close: the form under \"Got a job eating your time and money?\".",
    ], [
        "The heading is new and was not line-tested with Will.",
        "The contracts question was reworded.",
    ]),
    ("pricing", "/pricing", "Pricing", "Reached from the menu, the home page and /pilot by someone checking the price before giving time.", [
        "The four prices as steps in the home page's How It Works form (step, name, price, facts), starting on the first screen. Weighed against today's numbered rows on a second screen and against a row of four price tiles above the detail.",
        "Heading kept: \"The audit is free. The rest is fixed.\". The line under it cut to two facts.",
        "No button in the first section: the header's \"Free AI audit\" is on the same screen.",
        "The seven money questions folded under \"What you pay, and when.\".",
        "\"What does $3,500 get me?\" (dropped \"actually\"), \"When do I pay?\" (was \"Deposits and payment?\"), \"Is there any lock-in?\".",
        "Step 3's last line ends at \"you are told so\"; the tail about an AI employee not being the right next step did not belong to that step.",
        "Ends on the shared close.",
    ], [
        "\"What you pay, and when.\" is new and was not line-tested with Will.",
        "The kept heading is two beats; it reads as two plain facts, not a slogan, but it is the same shape he has rejected when it was cute.",
    ]),
    ("about", "/about", "About", "Opened by someone who arrived from an email, LinkedIn or a referral to check the person is real.", [
        "Three parts and the close: who builds it, why one builder, recent work.",
        "The \"W\" tile standing in for a photo is gone. The page takes a real photo when one is added.",
        "The three steps with prices are gone from this page; the home page, /pilot and /pricing carry them.",
        "\"You deal with the person building it.\" in place of \"No agency. No template.\", a mirrored pair. The paragraphs under it say the same things as plain facts.",
        "Added from the agreement: every build comes with a written guide another developer could run it from. It answers \"you are one person\".",
        "A sentence that pointed at \"the phone demo on the services page\" is gone with that page.",
        "Recent work as two plain rows, the brokerage first.",
        "The email address sits under the introduction.",
    ], [
        "The steps section was cut from the page.",
        "The \"Why one builder\" heading is new.",
        "The brokerage row no longer says \"Currently building\".",
    ]),
    ("sample-audit", "/pilot/sample-audit", "Sample audit report", "Opened from /pilot's \"Read the whole sample\" by someone who wants to see what the audit gives back.", [
        "The report drawn as the document itself, on a white sheet.",
        "Its sections and voice are the report Herbert AI now sends: Purpose, Findings, Recommendation, Further Options, Assumptions, Next Step, Contact, in the business-document register.",
        "\"The next twelve months\" is Further Options, as in the template.",
        "Every figure is unchanged.",
        "\"The pilot\" is \"the first build\"; \"Scoped\" is \"Priced after the first build\".",
        "Ends on the shared close.",
    ], [
        "/pilot's own sheet still heads its table \"Where the time goes\" with \"Job\" and \"Who does it\", where the report now says Findings, \"Task\" and \"Performed by\". Left as picked on 22 Oct.",
    ]),
    ("thanks", "/pilot/thanks", "After the form", "Where every audit form lands.", [
        "\"Your request is in.\" in place of \"Got it. Talk today.\": the page opens on what happened.",
        "Third person: \"Expect a call the same day\", not \"I'll call you\". \"Check your email for a confirmation.\"",
        "The header shows no audit button here: the person has just booked.",
    ], [
        "The heading was replaced.",
    ]),
    ("privacy", "/privacy", "Privacy policy", "A policy, so it follows the business-document register.", [
        "Herbert AI in the third person, Title Case headings, Purpose first and Contact last.",
        "Brought up to date: the site has one form now, the audit request, and no longer keeps its own page-view count (removed 3 Nov).",
        "\"Privacy Policy\" in place of \"Your data, plainly.\".",
        "No sales close on a policy.",
    ], [
        "The forms paragraph still says an AI model sorts the request and a reply may go by email or text. That was carried over and not re-checked against the engine today.",
    ]),
    ("home", "/", "Home", "Every section was picked by Will. Wrapping only, and the shared close.", [
        "No word alone on a line in How It Works, the AI Employees and Operating Systems headings and the line under the hero. No words changed.",
        "The close is the shared band, so the home page, /pilot and every other page end the same way.",
    ], [
        "The closing heading is now centred against the form, as asked for on /pilot. It sat at the form's foot.",
        "The hero's headline puts \"itself.\" on a fourth line at laptop width. Not changed: the hero is locked.",
    ]),
]

CHECK = "() => [document.documentElement.scrollWidth - window.innerWidth, document.documentElement.scrollHeight]"


async def main():
    facts = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH)
        for key, path, *_ in PAGES:
            errs, over = [], []
            for vw, vh, dpr in [(1440, 900, 1), (1280, 800, 1), (1024, 768, 1), (375, 812, 2), (360, 740, 1), (320, 700, 1)]:
                ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
                pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
                pg.on("console", lambda m: errs.append("console: " + m.text[:120]) if m.type == "error" else None)
                await pg.goto("http://localhost:3000" + path, wait_until="networkidle", timeout=180000)
                await pg.wait_for_timeout(700); await pg.add_style_tag(content="nextjs-portal{display:none!important}")
                o, h = await pg.evaluate(CHECK)
                if o > 0: over.append(f"{vw}: {o}px")
                if vw in (1440, 375):
                    await pg.screenshot(path=str(A / f"review-{key}-{vw}.png"), full_page=True)
                    facts.setdefault(key, {})[vw] = h
                await ctx.close()
            facts[key]["errs"] = errs; facts[key]["over"] = over
            print(key, "overflow:", over or "none", "errors:", errs[:2] or "none", "heights:", facts[key][1440], facts[key][375])
        await b.close()
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH)
        for key, path, title, brief, picks, calls in PAGES:
            f = facts[key]
            pk = "".join(f"<li>{x}</li>" for x in picks); cc = "".join(f"<li>{x}</li>" for x in calls)
            html = f"""<!doctype html><meta charset=utf-8><title>{title}</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.5 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 6px;font-weight:600}} h2{{font-size:17px;margin:22px 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0}}
ul{{margin:0;padding-left:20px;max-width:1100px}} li{{margin:4px 0}} .cc li{{color:#f5c26b}} .meta{{color:#888;margin-top:14px}}
.pair{{display:flex;gap:24px;align-items:flex-start;margin-top:22px}} img{{display:block;border:1px solid #333}}</style><body>
<h1>{title} <span style="color:#888;font-weight:400">{path}</span></h1>
<p class="intro">{brief} Picked by Claude, hands-off, 22 Nov 2026. On the preview branch, not live.</p>
<h2>Picks</h2><ul>{pk}</ul>
<h2>Close calls, for Will</h2><ul class="cc">{cc}</ul>
<p class="meta">Checked at 1440, 1280, 1024, 375, 360 and 320: overflow {', '.join(f['over']) or 'none'}, errors {len(f['errs']) or 'none'}. Page height {f[1440]:,}px at 1440, {f[375]:,}px at 375.</p>
<div class="pair"><img src="assets-2026-11-22/review-{key}-1440.png" style="width:820px"><img src="assets-2026-11-22/review-{key}-375.png" style="width:250px"></div></body>"""
            fp = D / f"design-pass-site-2026-11-22-review-{key}.html"; fp.write_text(html, encoding="utf-8")
            pg = await b.new_page(viewport={"width": 1200, "height": 1000})
            await pg.goto(fp.as_uri()); await pg.wait_for_timeout(600)
            await pg.screenshot(path=str(D / f"design-pass-site-2026-11-22-review-{key}.png"), full_page=True); await pg.close()
        await b.close()
    print("sheets done")

asyncio.run(main())
