# /pilot section 4, What it fixes: the details pass (3 Nov 2026) after Will's
# pick ("C"), drawn from /lab/pilot-fixes-details with the section's own
# component. Details 1 and 2 at 1440, detail 3 at 375. Option 1 of each is as
# built. Pass an output folder as the first argument.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-11-03"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}
DETAILS = [
  ("d1", "Detail 1 of 3, the employee line", 1440, [
    "1, as built: avatar, name and job (recommended: the job beside the name is the idiom of section 5's dashboard and the homepage roster, so the three read as one system)",
    "2, avatar and name: quieter, but a bare name says less than a name with its job",
    "3, the avatar beside the job title, no line: tightest, the employees become icons"]),
  ("d2", "Detail 2 of 3, the note under the grid", 1440, [
    "1, as built: \"Example AI employees, one for each job. Yours are named at kickoff.\"",
    "2, shorter: \"Example AI employees. Yours are named at kickoff.\" (recommended: \"one for each job\" repeats what the grid already shows)",
    "3, none: the charter wants examples to say so, so dropping it breaks that rule"]),
  ("d3", "Detail 3 of 3, the phone layout", 375, [
    "1, as built: six cards stacked, about two screens long",
    "2, two across, no sentence: one screen, the job names and employees only (recommended: the names carry the section on a phone, and the sentences stay on laptops)",
    "3, one column, no sentence: shorter than today, longer than 2"]),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); errs = []; over = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            pg.on("console", lambda m: errs.append("console: " + m.text[:160]) if m.type == "error" else None)
            await pg.goto("http://localhost:3000/lab/pilot-fixes-details", wait_until="load", timeout=180000)
            await pg.wait_for_function("() => document.querySelectorAll('section[data-shot]').length === 9", timeout=180000)
            await pg.wait_for_timeout(800); await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            await pg.evaluate("() => document.querySelectorAll('body *').forEach(el => { if (getComputedStyle(el).position === 'fixed') el.style.display = 'none' })")
            sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
            if sw > iw: over.append(f"at {vw}: {sw} > {iw}")
            for key, _, width, _ in DETAILS:
                if width != vw: continue
                for i in range(1, 4):
                    loc = pg.locator(f"section[data-shot='{key}-{i}']")
                    await loc.scroll_into_view_if_needed(); await pg.wait_for_timeout(200)
                    await loc.screenshot(path=str(A / f"pilot-fixes-{key}-{i}-{vw}.png"))
            await ctx.close()
        print("errors:", errs or "none"); print("overflow:", over or "none"); await b.close()
    rows = ""
    for key, title, width, opts in DETAILS:
        if key == "d3":
            cells = "".join(f'<figure><figcaption>{o}</figcaption><img src="assets-2026-11-03/pilot-fixes-{key}-{i+1}-{width}.png" style="width:250px"></figure>' for i, o in enumerate(opts))
            rows += f'<section><h2>{title}</h2><div class="row">{cells}</div></section>'
        else:
            cells = "".join(f'<figure class="stack"><figcaption>{o}</figcaption><img src="assets-2026-11-03/pilot-fixes-{key}-{i+1}-{width}.png" style="width:920px"></figure>' for i, o in enumerate(opts))
            rows += f'<section><h2>{title}</h2>{cells}</section>'
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot What it fixes, details</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:20px;margin:0 0 12px;font-weight:600}} .intro{{color:#aaa;max-width:1220px;margin:0 0 24px}}
section{{margin-bottom:44px}} .row{{display:flex;gap:20px;align-items:flex-start}} figure{{margin:0}} .stack{{margin-bottom:18px}} figcaption{{color:#bbb;margin-bottom:6px;max-width:250px}} .stack figcaption{{max-width:920px}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 4, What it fixes: the details pass</h1><p class="intro">Will picked C on 3 Nov 2026. Three details drawn three ways from the section's own component; option 1 of each is what is built now. The heading and the six sentences were settled on 27 Oct.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-11-03-pilot-fixes-details.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1280, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-11-03-pilot-fixes-details.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
