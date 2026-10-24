# /pilot section 4, What it fixes: its details pass on one board (24 Oct 2026).
# Will: "no lets just do the details pass". Three details:
# 1 the heading: "The job everyone hates doing." is his own phrase (the form
#   asks "What's the job in your office everyone hates doing?"), but it names
#   one job above a grid of six.
# 2 the six descriptions: several are slogan beats ("Entered once, synced
#   everywhere.", "drafted for you, checked by you, sent in seconds.", "on
#   time, every time"), the shape his Lines register scores 0; body copy is the
#   Marketing register, plain complete sentences, the business speaking.
# 3 heading wraps: at 1440 this heading leaves "doing." alone on its second
#   line and How it works leaves "days." alone; text-wrap: balance evens them.
# Drawn by changing the section in the page, at 1440 and 375.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-24"; A.mkdir(exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
Q = chr(0x2019)
FIND = "const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('What it fixes')); sec.setAttribute('data-fix','1'); const h=sec.querySelector('h2'); const g=sec.querySelector('.grid');"
HEADS = [
  ("h0", "Today", None, "One job named above six."),
  ("h1", "1. The jobs everyone hates doing.", "h.textContent='The jobs everyone hates doing.';", "Your phrase with one letter changed, so it matches the six under it. Recommended."),
  ("h2", f"2. Got a job everyone hates doing?", "h.textContent='Got a job everyone hates doing?';", "Your original question, the one you kept on the homepage before you rewrote it: the reader finds theirs in the grid."),
  ("h3", "3. Which job does everyone hate doing?", "h.textContent='Which job does everyone hate doing?';", "Asks the reader to pick one from the six."),
]
PLAIN = [
  "Follow-ups for documents, invoices and approvals go out on time without anyone writing them.",
  "Details entered once reach every system that needs them, instead of being keyed in three times.",
  "Quotes, confirmations and updates are drafted for you to check and send.",
  "Confirmations, reschedules and reminders are handled without anyone touching the calendar.",
  "Job details that live in one person" + Q + "s head or inbox go on one screen the whole team can see.",
  "The numbers someone compiles by hand every week are compiled for you.",
]
DESCS = [
  ("d0", "Today", None, "Fragments and slogan beats: Entered once, synced everywhere; drafted for you, checked by you, sent in seconds; on time, every time."),
  ("d1", "1. Plain sentences", "const ps=[...g.querySelectorAll('p')]; ps.forEach((p,i)=>p.textContent=PLAIN[i]);", "Each one a plain sentence about what changes, no beats. Recommended: the same facts, said the way the rest of the page says things."),
  ("d2", "2. The names only", "[...g.querySelectorAll('p')].forEach(p=>p.remove()); [...g.querySelectorAll('h3')].forEach(t=>{t.style.fontSize='26px'; t.style.letterSpacing='-0.02em'}); [...g.children].forEach(c=>{c.style.paddingTop='18px'; c.style.paddingBottom='10px'});", "Six jobs named and nothing under them, larger: the reader recognises theirs and moves on."),
  ("d3", "3. One line for the six", "[...g.querySelectorAll('p')].forEach(p=>p.remove()); const p=document.createElement('p'); p.textContent='Each one is a job your AI employee takes over, and your team approves what goes out.'; p.style.cssText='margin-top:28px;font-size:17px;line-height:1.5;color:#555;max-width:52ch'; g.after(p);", "The names only, then one plain line under the grid for all six."),
]
WRAPS = [
  ("w0", "Today", None, "doing. alone on the second line; How it works leaves days. alone."),
  ("w1", "1. Balanced headings", "document.querySelectorAll('h1,h2').forEach(x=>x.style.textWrap='balance');", "Every heading on the page breaks into even lines (text-wrap: balance), so no word sits alone. Recommended: the page-wide fix, one line of CSS."),
]
async def shoot(pg, js, path, phone, wrapcrop=False, extra=None):
    await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
    await pg.add_style_tag(content=HIDE)
    await pg.evaluate("(PLAIN) => {" + FIND + (js or "") + "}", PLAIN)
    sec = pg.locator("section[data-fix]").first
    await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
    if wrapcrop:
        box = await pg.evaluate("() => { const s=document.querySelector('section[data-fix]'); const h=s.querySelector('h2').getBoundingClientRect(); return {x:0,y:h.top+scrollY-70,width:innerWidth,height:h.height+110} }")
        await pg.screenshot(path=path, full_page=True, clip=box)
    elif phone:
        box = await pg.evaluate("() => { const s=document.querySelector('section[data-fix]'); const r=s.getBoundingClientRect(); return {x:0,y:r.top+scrollY,width:innerWidth,height:Math.min(r.height,900)} }")
        await pg.screenshot(path=path, full_page=True, clip=box)
    else:
        await sec.screenshot(path=path)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        c1 = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce"); pg = await c1.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        c2 = await b.new_context(viewport={"width": 375, "height": 812}, reduced_motion="reduce", device_scale_factor=2); pp = await c2.new_page()
        for k, n, js, d in HEADS: await shoot(pg, js, str(A / f"fix-{k}-1440.png"), False, wrapcrop=True)
        for k, n, js, d in DESCS:
            await shoot(pg, js, str(A / f"fix-{k}-1440.png"), False)
            await shoot(pp, js, str(A / f"fix-{k}-375.png"), True)
        for k, n, js, d in WRAPS:
            await shoot(pg, js, str(A / f"fix-{k}-1440.png"), False, wrapcrop=True)
            # How it works heading too
            await pg.goto("http://localhost:3000/pilot", wait_until="networkidle"); await pg.add_style_tag(content=HIDE)
            if js: await pg.evaluate("() => {" + js + "}")
            box = await pg.evaluate("() => { const h=[...document.querySelectorAll('h2')].find(x=>x.textContent.startsWith('Audit first')); h.scrollIntoView(); const r=h.getBoundingClientRect(); return {x:0,y:r.top+scrollY-70,width:innerWidth,height:r.height+110} }")
            await pg.wait_for_timeout(300); await pg.screenshot(path=str(A / f"fix-{k}-how-1440.png"), full_page=True, clip=box)
        await c1.close(); await c2.close()
        print("errors:", errs); await b.close()
    def block(title, rows, phone):
        out = f"<h2>{title}</h2>"
        for k, n, js, d in rows:
            imgs = f'<img src="assets-2026-10-24/fix-{k}-1440.png" style="width:{"900" if phone else "760"}px">'
            if phone: imgs += f'<img src="assets-2026-10-24/fix-{k}-375.png" style="width:260px">'
            if k.startswith("w"): imgs += f'<img src="assets-2026-10-24/fix-{k}-how-1440.png" style="width:560px">'
            out += f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair">{imgs}</div></section>'
        return out
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot What it fixes: details</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:21px;margin:34px 0 12px;color:#fff}} .intro{{color:#aaa;max-width:1300px;margin:0 0 10px}}
section{{margin-bottom:26px}} .lab{{margin-bottom:8px;max-width:1300px}} .lab b{{font-size:17px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:18px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 4, What it fixes: the details pass</h1><p class="intro">Three details on one board; answer each with its number, say "heading 1, descriptions 1, wraps 1". At 1440, and 375 where the phone changes.</p>
{block("Detail 1: the heading (one job named above six)", HEADS, False)}
{block("Detail 2: the six descriptions", DESCS, True)}
{block("Detail 3: headings that leave one word alone (this one and How it works)", WRAPS, False)}</body>"""
    f = D / "design-pass-site-2026-10-24-pilot-fixes.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1340, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(1000)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-24-pilot-fixes.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
