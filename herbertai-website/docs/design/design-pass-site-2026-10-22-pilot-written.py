# /pilot section 2, the written page: the layout three ways (22 Oct 2026).
# Facts: the section shows /pilot/sample-audit-page.jpg, a capture taken before
# the 21 Oct colour pass, so it still shows the old cream and no longer matches
# the sample page. It is shown at 29% of its size on a laptop (725px of 2496) and
# 13% on a phone, so the table of jobs, hours and costs cannot be read. The
# sample page's own data is the `jobs` list in sample-audit/page.js (three jobs,
# who does each, hours a week, cost a year) and the line "Together about
# $40,000 a year, and about half of it is one job." Drawn by replacing the
# section's right side (and, for 2, its layout) in the page.
import asyncio, os, base64, json
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-22"; A.mkdir(exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
JOBS = [
  ["Chasing clients for documents: bank statements, receipts, signed declarations, the questionnaire that never comes back", "Admin", "8", "$19,760"],
  ["Writing the same emails by hand: lodgement reminders, “your return is ready to sign”, “we need one more thing”", "Senior accountant", "4", "$13,000"],
  ["Retyping a new client’s details from the engagement form into the practice software, the tax agent portal and the engagement letter", "Admin", "3", "$7,410"],
]
MONO = "font-family:var(--font-geist-mono),ui-monospace,monospace"

def sheet(phone):
    head = f'<p style="{MONO};font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#666;margin:0 0 10px">Sample audit page</p><p style="font-weight:700;letter-spacing:-0.03em;line-height:1.02;font-size:{"24px" if phone else "30px"};margin:0 0 22px;max-width:22ch">AI audit: a four person accounting practice.</p><p style="{MONO};font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#666;margin:0 0 8px">Where the time goes</p>'
    if phone:
        rows = "".join(f'<li style="padding:14px 0;border-top:1px solid rgba(17,17,17,.1)"><p style="margin:0;font-size:14px;line-height:1.45;color:#2a2a2a">{j}</p><p style="margin:8px 0 0;{MONO};font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:#666">{w} · {h} hours a week · <span style="color:#111">{c} a year</span></p></li>' for j, w, h, c in JOBS)
        body = f'<ul style="list-style:none;margin:0;padding:0;border-bottom:1px solid rgba(17,17,17,.1)">{rows}</ul>'
    else:
        th = f'style="text-align:left;{MONO};font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#666;font-weight:400;padding:0 16px 10px 0"'
        td = 'style="padding:12px 16px 12px 0;border-top:1px solid rgba(17,17,17,.1);font-size:14px;line-height:1.45;color:#2a2a2a;vertical-align:top"'
        rows = "".join(f'<tr><td {td}>{j}</td><td {td}>{w}</td><td {td}>{h}</td><td {td[:-1]};font-weight:600;color:#111">{c}</td></tr>' for j, w, h, c in JOBS)
        body = f'<table style="width:100%;border-collapse:collapse"><thead><tr><th {th}>Job</th><th {th}>Who does it</th><th {th}>Hours a week</th><th {th}>Cost a year</th></tr></thead><tbody>{rows}</tbody></table>'
    total = f'<p style="margin:18px 0 0;font-size:{"16px" if phone else "17px"};line-height:1.45;color:#111">Together about $40,000 a year, and about half of it is one job.</p>'
    return f'<a href="/pilot/sample-audit" data-sheet style="display:block;min-width:0;border:1px solid rgba(17,17,17,.12);border-radius:12px;background:#fff;box-shadow:0 30px 80px -40px rgba(0,0,0,.35);padding:{"22px 20px" if phone else "34px 38px"};color:#111;text-decoration:none">{head}{body}{total}</a>'

async def capture(pg, phone):
    # The sample page now, its title and the time table, the note and byline hidden.
    await pg.goto(BASE + "/pilot/sample-audit", wait_until="networkidle", timeout=180000)
    await pg.add_style_tag(content=HIDE)
    r = await pg.evaluate("""() => { const h1=document.querySelector('h1'); const lab=h1.previousElementSibling || h1; const note=[...document.querySelectorAll('p')].find(p=>p.textContent.startsWith('This is a sample')); const by=[...document.querySelectorAll('p')].find(p=>p.textContent.startsWith('Prepared by'));
      if (note) (note.closest('div[class*=rounded]')||note).style.display='none'; if (by) by.style.display='none';
      const tot=[...document.querySelectorAll('p')].find(p=>p.textContent.startsWith('Together about'));
      const top=lab.getBoundingClientRect().top+scrollY-24; const bottom=tot.getBoundingClientRect().bottom+scrollY+14; return [top,bottom] }""")
    await pg.wait_for_timeout(300)
    w = await pg.evaluate("innerWidth")
    return await pg.screenshot(full_page=True, clip={"x": 0, "y": r[0], "width": w, "height": r[1] - r[0]})

async def fresh_top(pg):
    # A like-for-like retake of today's crop (aspect 2496x2040) in the new colours.
    await pg.goto(BASE + "/pilot/sample-audit", wait_until="networkidle", timeout=180000)
    await pg.add_style_tag(content=HIDE + " header{display:none!important}")
    y = await pg.evaluate("() => { const h1=document.querySelector('h1'); return (h1.previousElementSibling||h1).getBoundingClientRect().top+scrollY-48 }")
    return await pg.screenshot(full_page=True, clip={"x": 72, "y": y, "width": 1296, "height": round(1296 * 2040 / 2496)})

def data_url(png): return "data:image/png;base64," + base64.b64encode(png).decode()

SWAP_IMG = """(src) => { const i=[...document.querySelectorAll('section img')].find(x=>x.src.includes('sample-audit')); i.removeAttribute('srcset'); i.removeAttribute('sizes'); i.src=src; }"""
FULL = """(src) => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('What you get back')); const g=sec.querySelector('.grid'); g.style.display='block'; const left=g.children[0]; const a=g.children[1];
  left.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:0 56px;align-items:end'; const kids=[...left.children]; const L=document.createElement('div'); const R=document.createElement('div'); L.append(kids[0], kids[1]); R.append(...kids.slice(2)); left.append(L,R); R.firstElementChild.style.marginTop='0';
  a.style.marginTop='40px'; const i=a.querySelector('img'); i.removeAttribute('srcset'); i.removeAttribute('sizes'); i.src=src; }"""
FULL_PHONE = """(src) => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('What you get back')); const a=sec.querySelector('.grid').children[1]; const i=a.querySelector('img'); i.removeAttribute('srcset'); i.removeAttribute('sizes'); i.src=src; }"""
SHEET = """(html) => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('What you get back')); const g=sec.querySelector('.grid'); g.children[1].outerHTML=html; }"""

OPTS = [
  ("today", "Today", "The capture from before the colour pass, still on the old cream, at 29% of its size: the table's words are about 4px tall."),
  ("1", "1. Today's layout, a fresh capture", "The same two columns with the picture retaken on today's colours. The smallest change; the table still cannot be read, and the picture goes stale again whenever the sample page changes."),
  ("2", "2. The page full width", "The heading and line on top, then a capture of the sample page's title and its time table across the full width, near its real size: every job, hour and cost can be read. Still a picture, so it needs retaking when the sample page changes."),
  ("3", "3. The sheet, live", "Today's two columns, with the picture replaced by a sheet built from the sample page's own list of jobs: the title, the three jobs with who does them, the hours and the cost a year, and the total. Real text, so it reads on a phone and can never drift from the sample page. Recommended."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        cap = await b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2, reduced_motion="reduce")
        cp = await cap.new_page()
        top_png = await fresh_top(cp)
        wide_png = await capture(cp, False)
        await cap.close()
        cap = await b.new_context(viewport={"width": 375, "height": 812}, device_scale_factor=2, reduced_motion="reduce")
        cp = await cap.new_page(); phone_png = await capture(cp, True); await cap.close()
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone")]:
            phone = tag == "phone"
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=2 if phone else 1)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, note in OPTS:
                await pg.goto(BASE + "/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                if key == "1": await pg.evaluate(SWAP_IMG, data_url(top_png))
                if key == "2": await pg.evaluate(FULL_PHONE if phone else FULL, data_url(phone_png if phone else wide_png))
                if key == "3": await pg.evaluate(SHEET, sheet(phone))
                await pg.wait_for_timeout(700)
                sec = pg.locator("section", has_text="What you get back").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                ov = await pg.evaluate("document.documentElement.scrollWidth - innerWidth")
                await sec.screenshot(path=str(A / f"written-{key}-{tag}.png"))
                print(key, tag, "overflow", ov, "height", round((await sec.bounding_box())["height"]))
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img class="wide" src="assets-2026-10-22/written-{k}-laptop.png"><img class="phone" src="assets-2026-10-22/written-{k}-phone.png"></div></section>' for k, n, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot section 2: the written page</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 24px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1080px;border:1px solid #333}} img.phone{{display:block;width:300px;border:1px solid #333}}</style><body>
<h1>/pilot section 2, the written page: three layouts</h1><p class="intro">The section that shows what the audit hands back. Today's picture is a capture from before the colour change, shown too small to read. Laptop at 1440 on the left, phone at 375 on the right. The heading and words are kept; they are a detail after the pick.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-22-pilot-written.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1480, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(1000)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-22-pilot-written.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
