# /pilot section 5, After the pilot: today and three options (30 Oct 2026),
# drawn from the lab page /lab/pilot-after at 1440 and 375. Facts: the pilot
# run sheet ("Days 14 to 30"), the engagement process and the one-pager
# ("After day 14", "After the first one"), Will's 29 Oct 2026 dashboard
# decision, the 16 Sep 2026 founding-client offer. Pass an output folder as
# the first argument to keep the screenshots out of the dev watcher's tree,
# then copy them in.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-10-30"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}
OPTS = [
  ("today", "Today", "Three cards: the AI operating system, Keep it running as a retainer from $1,000 a month, and the first three. Straight after the pilot, keeping it running is $200 a month, so the middle card reads as the wrong price, and the day 30 choice (including taking it with you) is only in the questions."),
  ("a", "A. Day 30, three choices", "The section says what happens at day 30, as the run sheet and the one-pager give it: keep it running at $200 a month, take it with you onto your own accounts, or go ahead with the full build from $25,000 with the $3,500 taken off. The pause and the first three in one line under. Costs the least to build and answers the buyer's question about lock-in; it shows no product."),
  ("b", "B. The dashboard grows", "The three stages with their prices beside the dashboard the first AI employee ships in: Penny live on one card with work waiting, and the next AI employees queued in the same dashboard. It draws Will's 29 Oct decision, so the AI operating system is seen growing out of the first employee. Costs the most to build, and the drawing is new example data to keep true."),
  ("c", "C. The line goes on", "Section 3's timeline carried on past day 14: day 30 and your pick, the AI operating system within 60 days, then kept running from $1,000 a month. Reads as one story from the audit to the whole office; costs a second timeline two sections after the first, which may read as repetition."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); errs = []; over = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            pg.on("console", lambda m: errs.append("console: " + m.text[:160]) if m.type == "error" else None)
            await pg.goto("http://localhost:3000/lab/pilot-after", wait_until="load", timeout=180000)
            await pg.wait_for_function("() => document.querySelectorAll('section[data-shot]').length === 4", timeout=180000)
            await pg.wait_for_timeout(800)
            # The lab bar and the dev badge are fixed overlays, not the option: hide them.
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            await pg.evaluate("() => document.querySelectorAll('body *').forEach(el => { if (getComputedStyle(el).position === 'fixed') el.style.display = 'none' })")
            sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
            if sw > iw: over.append(f"at {vw}: scrollWidth {sw} > {iw}")
            for key, _, _ in OPTS:
                sec = pg.locator(f"section[data-shot='{key}']")
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(250)
                await sec.screenshot(path=str(A / f"pilot-after-{key}-{vw}.png"))
            await ctx.close()
        print("errors:", errs); print("overflow:", over or "none"); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{r}</span></div><div class="pair"><img src="assets-2026-10-30/pilot-after-{k}-1440.png" style="width:920px"><img src="assets-2026-10-30/pilot-after-{k}-375.png" style="width:250px"></div></section>' for k, n, r in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot, After the pilot</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1220px;margin:0 0 24px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px;max-width:1220px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 5, After the pilot: today and three ways</h1><p class="intro">Facts from the pilot run sheet, the engagement process and the one-pager; the dashboard from Will's 29 Oct decision. Heading kept as today in every option (it is a detail for after the pick). 1440 left, 375 right.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-30-pilot-after.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1280, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-30-pilot-after.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
