# /pilot section 4, What it fixes: today and three ways (3 Nov 2026). Will (30
# Oct 2026): "section 4 isnt done"; its 27 Oct details pass had no options
# step. Today, B and C are drawn from /lab/pilot-fixes; A, the section
# removed, is drawn on the real page as section 3 then section 5. Pass an
# output folder as the first argument to keep shots out of the dev watcher.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-11-03"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
OPTS = [
  ("today", "Today", "Six office jobs, a name and a sentence each. Generic: a reader has to translate each one into their own office."),
  ("a", "A. Remove the section", "The timeline runs straight into What comes next. The written report in section 2 already shows the jobs with hours and costs, and the form asks for the reader's own job, so this section repeats both in general terms. The page gets shorter by one screen."),
  ("b", "B. By industry", "The job each kind of office loses most to, in the industry pages' own words, each linking to its page. The reader finds their own office and its job in one line. Costs: four rows where there were six, and hospitality has no page yet so it is not listed."),
  ("c", "C. With the AI employee that takes it", "Today's six jobs, each with an example AI employee from the roster above it, so the jobs read as work someone takes off your hands. Costs: the most visual weight of the four, and the pairings are examples."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); errs = []; over = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            pg.on("console", lambda m: errs.append("console: " + m.text[:160]) if m.type == "error" else None)
            await pg.goto("http://localhost:3000/lab/pilot-fixes", wait_until="load", timeout=180000)
            await pg.wait_for_function("() => document.querySelectorAll('section[data-shot]').length === 3", timeout=180000)
            await pg.wait_for_timeout(800); await pg.add_style_tag(content=HIDE)
            await pg.evaluate("() => document.querySelectorAll('body *').forEach(el => { if (getComputedStyle(el).position === 'fixed') el.style.display = 'none' })")
            sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
            if sw > iw: over.append(f"lab at {vw}: {sw} > {iw}")
            for key in ("today", "b", "c"):
                sec = pg.locator(f"section[data-shot='{key}']")
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(250)
                await sec.screenshot(path=str(A / f"pilot-fixes-{key}-{vw}.png"))
            # A: the real page with section 4 taken out, section 3 then section 5.
            await pg.goto("http://localhost:3000/pilot", wait_until="load", timeout=180000)
            await pg.wait_for_function("() => document.body.textContent.includes('The jobs everyone hates doing.')", timeout=180000)
            await pg.wait_for_timeout(600); await pg.add_style_tag(content=HIDE)
            await pg.evaluate("""() => { const secs = [...document.querySelectorAll('section')];
              secs.find(s => s.textContent.includes('The jobs everyone hates doing.')).style.display = 'none';
              const s3 = secs.find(s => s.textContent.includes('Your first AI employee in four steps.')); const s5 = secs.find(s => s.textContent.includes('One job first. Then the system.'));
              const w = document.createElement('div'); w.setAttribute('data-shot','a'); s3.parentNode.insertBefore(w, s3); w.appendChild(s3); w.appendChild(s5) }""")
            await pg.wait_for_timeout(300)
            await pg.locator("[data-shot='a']").screenshot(path=str(A / f"pilot-fixes-a-{vw}.png"))
            await ctx.close()
        print("errors:", errs or "none"); print("overflow:", over or "none"); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{r}</span></div><div class="pair"><img src="assets-2026-11-03/pilot-fixes-{k}-1440.png" style="width:920px"><img src="assets-2026-11-03/pilot-fixes-{k}-375.png" style="width:250px"></div></section>' for k, n, r in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot What it fixes, three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1220px;margin:0 0 24px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px;max-width:1220px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 4, What it fixes: today and three ways</h1><p class="intro">Will (30 Oct 2026): "section 4 isnt done". Its 27 Oct details pass had no options step, so these are the options it never had. A is the real page with the section taken out. 1440 left, 375 right.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-11-03-pilot-fixes.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1280, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-11-03-pilot-fixes.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
