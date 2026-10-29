# /pilot rewritten to the site's tone of wording, plain facts (Will, 29 Oct
# 2026: "A"), drawn after the change at 1440 and 375: How it works (the eight
# rows), After the pilot and the questions (the body lines that broke the rule).
# Also checks no page overflows its viewport and no console errors. Runs on
# either machine: the Mac path is used when it exists, else Playwright's own.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-29"
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
SECTIONS = [("how", "Audit first. Then fourteen days."), ("after", "One job first. Then the system."), ("faq", "Before you book.")]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); errs = []; over = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            pg.on("console", lambda m: errs.append("console: " + m.text[:160]) if m.type == "error" else None)
            await pg.goto("http://localhost:3000/pilot", wait_until="load", timeout=180000)
            await pg.wait_for_function("() => document.body.textContent.includes('Audit first. Then fourteen days.')", timeout=180000)
            await pg.wait_for_timeout(600); await pg.add_style_tag(content=HIDE)
            for key, text in SECTIONS:
                await pg.evaluate("(t) => { const s=[...document.querySelectorAll('section')].find(s=>s.textContent.includes(t)); s.setAttribute('data-shot','1') }", text)
                sec = pg.locator("section[data-shot]").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                await sec.screenshot(path=str(A / f"{key}-{vw}.png"))
                await pg.evaluate("() => document.querySelector('section[data-shot]').removeAttribute('data-shot')")
            sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
            if sw > iw: over.append(f"/pilot at {vw}: scrollWidth {sw} > {iw}")
            # Every other page whose lines changed: overflow and errors, a full page shot for reference.
            for path in ["/services", "/pricing", "/faq", "/industries", "/industries/accountants", "/about"]:
                await pg.goto("http://localhost:3000" + path, wait_until="load", timeout=180000)
                await pg.wait_for_timeout(800); await pg.add_style_tag(content=HIDE)
                sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
                if sw > iw: over.append(f"{path} at {vw}: scrollWidth {sw} > {iw}")
                await pg.screenshot(path=str(A / f"page{path.replace('/', '-')}-{vw}.png"), full_page=True)
            await ctx.close()
        print("errors:", errs); print("overflow:", over or "none"); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b></div><div class="pair"><img src="assets-2026-10-29/{k}-1440.png" style="width:920px"><img src="assets-2026-10-29/{k}-375.png" style="width:250px"></div></section>' for k, n in [("how", "How it works, the eight rows as plain facts"), ("after", "After the pilot: the OS card opens on the dashboard fact, the first-three card loses its kicker"), ("faq", "Questions: no aside, no not-this-but-that, no we, no claim about what other people do")])
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot in plain facts</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1220px;margin:0 0 24px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1220px}} .lab b{{font-size:18px}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot rewritten to plain facts (Will, 29 Oct 2026: A)</h1><p class="intro">The three sections whose lines changed, as built. 1440 left, 375 right.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-29-tone-a.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1280, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-29-tone-a.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
