# /pilot section 5, After the pilot, as built from Will's pick (30 Oct 2026:
# "B, dashboard"): the section on the real page at 1440, 1280, 1024, 375 and
# 320, with overflow and error checks over the whole page. Pass an output
# folder as the first argument to keep the screenshots out of the dev
# watcher's tree, then copy them in.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-10-30"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}
WIDTHS = [(1440, 900, 1), (1280, 800, 1), (1024, 768, 1), (375, 812, 2), (320, 640, 2)]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); errs = []; over = []
        for vw, vh, dpr in WIDTHS:
            for motion in ("reduce", "no-preference"):
                ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion=motion, device_scale_factor=dpr)
                pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
                pg.on("console", lambda m: errs.append("console: " + m.text[:160]) if m.type == "error" else None)
                await pg.goto("http://localhost:3000/pilot", wait_until="load", timeout=180000)
                await pg.wait_for_function("() => document.body.textContent.includes('Your dashboard') || document.body.textContent.includes('An example accounting practice')", timeout=180000)
                await pg.wait_for_timeout(700)
                await pg.add_style_tag(content="nextjs-portal{display:none!important}")
                sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
                if sw > iw: over.append(f"{vw} motion {motion}: scrollWidth {sw} > {iw}")
                if motion == "reduce":
                    await pg.evaluate("() => [...document.querySelectorAll('section')].find(s => s.textContent.includes('One job first. Then the system.')).setAttribute('data-shot','1')")
                    sec = pg.locator("section[data-shot]").first
                    await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(250)
                    await sec.screenshot(path=str(A / f"pilot-after-built-{vw}.png"))
                await ctx.close()
        print("errors:", errs); print("overflow:", over or "none"); await b.close()
    cells = "".join(f'<figure><figcaption>{w}</figcaption><img src="assets-2026-10-30/pilot-after-built-{w}.png" style="width:{min(w, 920) if w > 400 else 250}px"></figure>' for w, _, _ in WIDTHS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot After the pilot, as built</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1220px;margin:0 0 24px}}
.grid{{display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start}} figure{{margin:0}} figcaption{{color:#aaa;margin-bottom:6px}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 5, After the pilot, as built (Will, 30 Oct 2026: B)</h1><p class="intro">The section on the real page at 1440, 1280, 1024, 375 and 320.</p><div class="grid">{cells}</div></body>"""
    f = D / "design-pass-site-2026-10-30-pilot-after-built.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1280, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-30-pilot-after-built.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
