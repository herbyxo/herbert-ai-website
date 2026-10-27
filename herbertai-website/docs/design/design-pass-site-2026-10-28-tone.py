# The site's tone of wording, settled before more lines get rewritten (28 Oct
# 2026). Will: "i think the problem we have been having is that we did not
# establish a tone of wording across the site", after "One job and a name, say
# an AI document chaser" (an aside) and "A progress update, not a project plan"
# (a not-this-but-that slogan) on How it works. Three tones, each applied to the
# same eight timeline lines and drawn in the page, at 1440 and 375. Facts are
# the pilot run sheet's (business/sales/pilot-build-runsheet.md, "What the
# client sees"): a one page role card in plain English on day 1, confirmed by
# the client; built in their own tools; someone on the team reviews drafts in a
# shadow run; day 14 the system on their data, the approval screen and a log, a
# walkthrough with the team; a twelve month roadmap.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-28"
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
Q = chr(0x2019)
TONES = [
  ("today", "Today", "Mixed: some plain facts, an aside (say an AI document chaser), a not-this-but-that line.", None),
  ("a", "A. Plain facts", "Say what happens, in the plain words a buyer could check: short statements of fact, the same grammar on every line, no asides, no slogans, no not-this-but-that. The business speaks; steps say what happens. Recommended: it is how the lines you kept already read (One call on how your business runs, Your written report, No obligation).", [
    ["How your business runs and where the hours go"],
    ["The three jobs costing you most, in your figures"],
    ["Its job, in plain English, confirmed with you on day one", "Built inside the tools you already use", "Its drafts checked by your team before it goes live"],
    ["Running on your real data, your team approving what goes out", "A walkthrough with your team", "A twelve month roadmap of the next jobs"],
  ]),
  ("b", "B. The owner" + Q + "s voice", "How an owner would put it to another owner: you-statements, contractions, conversational.", [
    ["Where your week goes"],
    ["What your three worst jobs cost you a year"],
    ["You sign off on its job before anything" + Q + "s built", "It works in the tools you" + Q + "ve already got", "Your team sees its drafts before it goes live"],
    ["It" + Q + "s doing the job, and your team okays what goes out", "Everyone" + Q + "s shown how it works", "A plan for what to hand over next"],
  ]),
  ("c", "C. Spec sheet", "Terse noun phrases, like a product" + Q + "s spec list: the fewest words that name the thing.", [
    ["Your business, mapped"],
    ["Three jobs, costed in your figures"],
    ["A role card on day one", "Your existing tools", "A trial run your team reviews"],
    ["Live on your data, approvals on", "A team walkthrough", "A twelve month roadmap"],
  ]),
]
SET = """(facts) => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('Audit first. Then fourteen days.')); sec.setAttribute('data-how','1');
 sec.querySelectorAll('ol').forEach(ol=>{ [...ol.children].forEach((li,i)=>{ const ul=li.querySelector('ul'); const tpl=ul.firstElementChild; ul.innerHTML=''; facts[i].forEach(f=>{ const x=tpl.cloneNode(true); x.textContent=f; ul.appendChild(x); }); }); }); }"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, rule, facts in TONES:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                if facts: await pg.evaluate(SET, facts)
                else: await pg.evaluate("() => { [...document.querySelectorAll('section')].find(s=>s.textContent.includes('Audit first. Then fourteen days.')).setAttribute('data-how','1') }")
                sec = pg.locator("section[data-how]").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                await sec.screenshot(path=str(A / f"tone-{key}-{vw}.png"))
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{r}</span></div><div class="pair"><img src="assets-2026-10-28/tone-{k}-1440.png" style="width:920px"><img src="assets-2026-10-28/tone-{k}-375.png" style="width:250px"></div></section>' for k, n, r, f in TONES)
    html = f"""<!doctype html><meta charset=utf-8><title>The site's tone of wording</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1220px;margin:0 0 24px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1220px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>The site{Q}s tone of wording: three ways</h1><p class="intro">The same eight lines (How it works) written in three tones. The one you pick becomes the rule for every line on the site, and the rest of /pilot gets rewritten to it. Facts are the pilot run sheet{Q}s. 1440 left, 375 right.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-28-tone.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1280, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-28-tone.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
