# /about, /contact and /start moved from Will's first person to the third
# person (the 19 Oct 2026 rule: founder copy names him, the brand speaks), on
# Will's word, 30 Oct 2026. Drawn after the change at 1440 and 375. Pass an
# output folder as the first argument to keep the screenshots out of the dev
# watcher's tree (webpack rebuilds on writes into docs/), then copy them in.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-10-30"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
SHOTS = [
  ("/about", "about-hero", "Will Herbert builds the software", "/about, the hero: Will Herbert in the third person"),
  ("/about", "about-builder", "You talk to the person building it", "/about, Why one builder: no sales rep, Will runs the audit, does the build, gives the walkthrough"),
  ("/about", "about-close", "Forty five minutes. No pitch.", "/about, the close: the audit goes through how your week runs"),
  ("/contact", "contact-hero", "exist yet.", "/contact: Say what is slow, no phone call promised (there is no number on the page)"),
  ("/start", "start-hero", "Tell Herbert AI about", "/start: Tell Herbert AI about your business, a reply comes back within a business day"),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); errs = []; over = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            pg.on("console", lambda m: errs.append("console: " + m.text[:160]) if m.type == "error" else None)
            cur = None
            for path, key, text, _ in SHOTS:
                if cur != path:
                    await pg.goto("http://localhost:3000" + path, wait_until="load", timeout=180000)
                    await pg.wait_for_function("(t) => document.body.textContent.includes(t)", arg=text, timeout=180000)
                    await pg.wait_for_timeout(600); await pg.add_style_tag(content=HIDE); cur = path
                    sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
                    if sw > iw: over.append(f"{path} at {vw}: scrollWidth {sw} > {iw}")
                await pg.evaluate("(t) => { const s=[...document.querySelectorAll('section')].find(s=>s.textContent.includes(t)); s.setAttribute('data-shot','1') }", text)
                sec = pg.locator("section[data-shot]").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                await sec.screenshot(path=str(A / f"{key}-{vw}.png"))
                await pg.evaluate("() => document.querySelector('section[data-shot]').removeAttribute('data-shot')")
            await ctx.close()
        print("errors:", errs); print("overflow:", over or "none"); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{lab}</b></div><div class="pair"><img src="assets-2026-10-30/{k}-1440.png" style="width:920px"><img src="assets-2026-10-30/{k}-375.png" style="width:250px"></div></section>' for _, k, _, lab in SHOTS)
    html = f"""<!doctype html><meta charset=utf-8><title>About, contact and start in the third person</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1220px;margin:0 0 24px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1220px}} .lab b{{font-size:18px}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/about, /contact and /start in the third person (Will, 30 Oct 2026: yes)</h1><p class="intro">The sections whose lines changed, as built. 1440 left, 375 right.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-30-third-person.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1280, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-30-third-person.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
