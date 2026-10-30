# /pilot section 5, After the pilot: the details pass (30 Oct 2026), after
# Will's pick ("B, dashboard"). Drawn from /lab/pilot-after-details, which
# renders the section's own component with different props: details 1 and 3
# at 1440 (3 cropped to where the options differ), detail 2 the dashboard
# alone, detail 4 at 375. Option 1 of each is as built. Pass an output folder
# as the first argument to keep the screenshots out of the dev watcher's tree.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-10-30"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}
DETAILS = [
  ("d1", "Detail 1 of 5, the stages beside the dashboard", 1440, [
    "1, as built: Day 14, Day 30, within 60 days, the list about the dashboard's height (recommended: day 30's $200 is the fact the section was missing, and it stays a stage)",
    "2, four: support after the build as a fourth stage, Kept running from $1,000 a month; the first three alone in the line under; the list runs taller than the dashboard",
    "3, two: Day 14 and the AI operating system; day 30's choice drops into the line under, which gets long"]),
  ("d2", "Detail 2 of 5, what the dashboard shows", 1440, [
    "1, as built: Penny live with a request waiting, Nora, Fern and Ray queued as On the roadmap",
    "2, each queued card says its job in a line, taken from the homepage roster (recommended: On the roadmap reads as names until it says what they would do)",
    "3, a second card live: Penny and Nora both working, Fern and Ray queued, no Day 14 in the bar"]),
  ("d3", "Detail 3 of 5, the line under", 1440, [
    "1, as built: support after the full build from $1,000 a month, and the first three",
    "2, support moves into the third stage's price; the first three alone under (recommended: each price sits with its stage, as the timeline does)",
    "3, no line: support in the third stage, and the first three left to /pricing"]),
  ("d4", "Detail 4 of 5, the phone order", 375, [
    "1, as built: the three stages, then the dashboard",
    "2, the dashboard first, then the stages",
    "3, the dashboard after Day 14, beside the line that says one card in your dashboard (recommended: the picture lands where the line names it, not three blocks later)"]),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); errs = []; over = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            pg.on("console", lambda m: errs.append("console: " + m.text[:160]) if m.type == "error" else None)
            await pg.goto("http://localhost:3000/lab/pilot-after-details", wait_until="load", timeout=180000)
            await pg.wait_for_function("() => document.querySelectorAll('[data-shot]').length === 12", timeout=180000)
            await pg.wait_for_timeout(800)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            await pg.evaluate("() => document.querySelectorAll('body *').forEach(el => { if (getComputedStyle(el).position === 'fixed') el.style.display = 'none' })")
            sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
            if sw > iw: over.append(f"at {vw}: scrollWidth {sw} > {iw}")
            for key, _, width, opts in DETAILS:
                if width != vw: continue
                for i in range(1, 4):
                    sid = f"{key}-{i}"; loc = pg.locator(f"[data-shot='{sid}']")
                    await loc.scroll_into_view_if_needed(); await pg.wait_for_timeout(200)
                    out = str(A / f"pilot-after-{sid}-{vw}.png")
                    if key == "d3":
                        box = await pg.evaluate("""(sid) => { const s = document.querySelector(`[data-shot='${sid}']`); const li = [...s.querySelectorAll('li')].find(l => l.textContent.includes('Within 60 days'));
                          const sb = s.getBoundingClientRect(), lb = li.getBoundingClientRect(); return { x: sb.left + window.scrollX, y: lb.top + window.scrollY - 16, width: sb.width, height: sb.bottom - lb.top + 16 } }""", sid)
                        await pg.screenshot(path=out, clip=box, full_page=True)
                    else:
                        await loc.screenshot(path=out)
            await ctx.close()
        print("errors:", errs); print("overflow:", over or "none"); await b.close()
    rows = ""
    for key, title, width, opts in DETAILS:
        if key in ("d2", "d4"):
            w = 250 if key == "d4" else 400
            cells = "".join(f'<figure><figcaption>{o}</figcaption><img src="assets-2026-10-30/pilot-after-{key}-{i+1}-{width}.png" style="width:{w}px"></figure>' for i, o in enumerate(opts))
            rows += f'<section><h2>{title}</h2><div class="row">{cells}</div></section>'
        else:
            cells = "".join(f'<figure class="stack"><figcaption>{o}</figcaption><img src="assets-2026-10-30/pilot-after-{key}-{i+1}-{width}.png" style="width:920px"></figure>' for i, o in enumerate(opts))
            rows += f'<section><h2>{title}</h2>{cells}</section>'
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot After the pilot, details</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:20px;margin:0 0 12px;font-weight:600}} .intro{{color:#aaa;max-width:1220px;margin:0 0 24px}}
section{{margin-bottom:44px}} .row{{display:flex;gap:20px;align-items:flex-start}} figure{{margin:0}} .stack{{margin-bottom:18px}} figcaption{{color:#bbb;margin-bottom:6px;max-width:400px}} .stack figcaption{{max-width:920px}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 5, After the pilot: the details pass</h1><p class="intro">Will picked B on 30 Oct 2026. Four details drawn three ways from the section's own component; option 1 of each is what is built now. Detail 5, the heading ("One job first. Then the system."), is kept unless a line test is wanted.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-30-pilot-after-details.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1320, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-30-pilot-after-details.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
