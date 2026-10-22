# /pilot section 3, How it works: the layout three ways (22 Oct 2026). Facts:
# the section is three columns (Step, title, three facts), the same layout as
# the homepage's How It Works, which covers the ladder (audit, first employee,
# operating system) where this covers the pilot (audit, the 14 day build, live
# on day 14). The heading is "Audit first. Then fourteen days."; nothing in the
# section shows the fourteen days. Every fact below is today's STEPS text or the
# hero's terms (written page within two business days, yours to keep either
# way). Drawn by replacing the section's grid in the page, at 1440 and 375.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-22"
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
STEPS = [
  ("45 minutes", "The free AI audit", ["How your business runs and where the hours go"]),
  ("Within two business days", "Your written page", ["The three jobs costing you most, in your figures", "Yours to keep either way"]),
  ("14 days from your go", "Your first AI employee, built", ["Built around the tools you already use", "One job and a name, say an AI document chaser", "A progress update, not a project plan"]),
  ("Day 14", "Live", ["Your team uses it the same day", "A walkthrough so everyone knows how", "A twelve month roadmap of the next jobs"]),
]
FACT = "font-size:17px;line-height:1.45;color:#444;padding:8px 0;border-top:1px solid rgba(17,17,17,.08);list-style:none"
def facts(fs): return '<ul style="margin:0;padding:0">' + "".join(f'<li style="{FACT}">{f}</li>' for f in fs) + "</ul>"
def timeline(phone):
    if phone:
        rows = "".join(f'<div style="position:relative;padding:0 0 30px 28px;border-left:2px solid {"#111" if i < 3 else "transparent"};margin-left:5px"><span style="position:absolute;left:-7px;top:2px;width:12px;height:12px;border-radius:50%;background:#111"></span><p style="font-size:15px;font-weight:500;color:#777;margin:0 0 6px;line-height:1">{w}</p><h3 style="font-size:22px;font-weight:600;letter-spacing:-0.02em;margin:0 0 8px">{t}</h3>{facts(fs)}</div>' for i, (w, t, fs) in enumerate(STEPS))
        return f'<div style="margin-top:40px">{rows}</div>'
    ticks = "".join(f'<span style="flex:1;border-left:1px solid rgba(17,17,17,{".5" if d in (1, 14) else ".2"});height:{"12" if d in (1, 14) else "7"}px"></span>' for d in range(1, 15))
    cols = []
    for i, (w, t, fs) in enumerate(STEPS):
        build = i == 2
        top = f'<div style="display:flex;align-items:flex-end;height:14px;margin-bottom:-1px">{ticks}</div>' if build else '<div style="height:14px"></div>'
        cols.append(f'<div style="min-width:0">{top}<div style="position:relative;border-top:2px solid {"transparent" if i == 3 else "#111"};padding:22px 28px 0 0"><span style="position:absolute;top:-7px;left:0;width:12px;height:12px;border-radius:50%;background:#111"></span><p style="font-size:16px;font-weight:500;color:#777;margin:0 0 14px">{w}</p><h3 style="font-size:24px;font-weight:600;letter-spacing:-0.02em;margin:0 0 10px">{t}</h3>{facts(fs)}</div></div>')
    return f'<div style="margin-top:52px;display:grid;grid-template-columns:0.8fr 1fr 1.6fr 1fr">{"".join(cols)}</div>'
def rows(phone):
    out = []
    for i, (w, t, fs) in enumerate([("Step 1", "The free AI audit", ["45 minutes auditing your business", "A written page in two business days", "The three jobs costing you most, in your figures"]), ("Step 2", "Your first AI employee, built", ["Built around the tools you already use", "One job and a name, say an AI document chaser", "A progress update, not a project plan"]), ("Step 3", "Live on day 14", ["Your team uses it the same day", "A walkthrough so everyone knows how", "A twelve month roadmap of the next jobs"])]):
        grid = "" if phone else "display:grid;grid-template-columns:0.9fr 1.1fr;gap:48px;align-items:start;"
        out.append(f'<div style="{grid}border-top:1px solid rgba(17,17,17,.15);padding:26px 0"><div><p style="font-size:16px;font-weight:500;color:#777;margin:0 0 10px">{w}</p><h3 style="font-size:{"24" if phone else "30"}px;font-weight:600;letter-spacing:-0.025em;margin:0 0 {"12" if phone else "0"}px">{t}</h3></div>{facts(fs)}</div>')
    return f'<div style="margin-top:44px;border-bottom:1px solid rgba(17,17,17,.15)">{"".join(out)}</div>'
OPTS = [
  ("today", "Today", None, "Three columns: step, title, three facts. The same layout as the homepage" + chr(0x2019) + "s How It Works, a section above on the visitor" + chr(0x2019) + "s way here."),
  ("1", "1. The fourteen days as a timeline", timeline,
   "A line across the section from the audit to day 14, the build segment marked in fourteen ticks: the audit, your written page within two business days, the build from your go, live on day 14. Shows what the heading promises, and no longer repeats the homepage. Recommended."),
  ("2", "2. The steps as rows", rows,
   "One row per step, the title on the left and its facts on the right, read top to bottom like the homepage" + chr(0x2019) + "s Herbert Reach story. Calmer, and different from the homepage, but the fourteen days are still only words."),
  ("3", "3. The steps as cards", None,
   "Today" + chr(0x2019) + "s three columns as three white cards, the step number large: the software" + chr(0x2019) + "s white, like the form card and the sheet above."),
]
CARDS = """() => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('Audit first. Then fourteen days.')); const g=sec.querySelector('.grid'); g.style.gap='20px';
 [...g.children].forEach((c,i)=>{ c.style.cssText='background:#fff;border:1px solid rgba(17,17,17,.12);border-radius:14px;padding:26px 26px 18px;box-shadow:0 20px 50px -36px rgba(0,0,0,.35)'; const n=c.firstElementChild; n.textContent=String(i+1).padStart(2,'0'); n.style.cssText='font-size:44px;font-weight:600;letter-spacing:-0.03em;color:#111;margin:0 0 18px;line-height:1'; }); }"""
SWAP = "(html) => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('Audit first. Then fourteen days.')); sec.querySelector('.grid').outerHTML=html; }"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, fn, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                if fn: await pg.evaluate(SWAP, fn(vw == 375))
                if key == "3": await pg.evaluate(CARDS)
                sec = pg.locator("section", has_text="Audit first. Then fourteen days.").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(400)
                ov = await pg.evaluate("document.documentElement.scrollWidth - innerWidth")
                await sec.screenshot(path=str(A / f"how-{key}-{vw}.png"))
                print(key, vw, "overflow", ov, "height", round((await sec.bounding_box())["height"]))
            await ctx.close()
        print("errors:", errs); await b.close()
    rws = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img src="assets-2026-10-22/how-{k}-1440.png" style="width:960px"><img src="assets-2026-10-22/how-{k}-375.png" style="width:270px"></div></section>' for k, n, f, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot How it works: three layouts</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1260px;margin:0 0 24px}}
section{{margin-bottom:38px}} .lab{{margin-bottom:10px;max-width:1260px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 3, How it works: three layouts</h1><p class="intro">Today this section uses the homepage{chr(0x2019)}s How It Works layout, and nothing in it shows the fourteen days its heading promises. Every fact is today{chr(0x2019)}s or the hero{chr(0x2019)}s; the words are this section{chr(0x2019)}s details pass. 1440 left, 375 right.</p>{rws}</body>"""
    f = D / "design-pass-site-2026-10-22-pilot-how.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1340, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-22-pilot-how.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
