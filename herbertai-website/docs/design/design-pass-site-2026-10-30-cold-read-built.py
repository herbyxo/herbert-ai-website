# The cold read built (Will, 30 Oct 2026: "All 69"): the changed sections on
# the real pages at 1440 and 375, and an overflow and error check over every
# organic page at both widths. Pass an output folder as the first argument to
# keep the screenshots out of the dev watcher's tree, then copy them in.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-10-30"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
SHOTS = [
  ("/", "home-hero", "Less admin.", "Home, the hero: the line under the button now says what the audit is"),
  ("/", "home-how", "Start with the job that costs you most.", "Home, How It Works: step 2 opens on what an AI employee is; messages, not comms; priced, not scoped"),
  ("/pilot", "pilot-how", "Audit first. Then fourteen days.", "/pilot, How it works: the build stop opens on what an AI employee is, tested on your real work, the next jobs in order"),
  ("/pilot", "pilot-next", "One job first. Then the system.", "/pilot, What comes next (was After the pilot): hosted by Herbert AI, your own systems, priced"),
  ("/pilot", "pilot-faq", "Before you book.", "/pilot, the questions: no pilot, no bottleneck, no credited in full"),
  ("/services", "services-top", "One AI employee first. Then the system.", "/services, the intro: every client, software that does one office job every day"),
  ("/services", "services-growth", "Growth, once the office runs itself.", "/services, what comes after: marketing in the owner's words"),
  ("/work", "work-hero", "Real software, running.", "/work: the heading"),
  ("/pricing", "pricing-top", "The audit is free.", "/pricing: four steps"),
  ("/pricing", "pricing-faq", "Why do builds start at $25,000?", "/pricing, the questions: one system your whole team logs into, paid when it goes live, your own systems"),
  ("/industries", "industries-top", "Built for the office you actually run.", "/industries: the AI employee defined on first use"),
  ("/about", "about-builder", "No agency. No template.", "/about: every login"),
  ("/faq", "faq", "How long does it take?", "/faq: working in 14 days, a delivery date in writing, your own systems, a licence that never expires"),
]
PAGES = ["/", "/pilot", "/services", "/work", "/industries", "/industries/accountants", "/pricing", "/about", "/faq", "/contact", "/start"]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); errs = []; over = []; missing = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            pg.on("console", lambda m: errs.append("console: " + m.text[:160]) if m.type == "error" else None)
            for path in PAGES:
                await pg.goto("http://localhost:3000" + path, wait_until="load", timeout=180000)
                await pg.wait_for_timeout(900); await pg.add_style_tag(content=HIDE)
                sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
                if sw > iw: over.append(f"{path} at {vw}: scrollWidth {sw} > {iw}")
                for spath, key, text, _ in SHOTS:
                    if spath != path: continue
                    ok = await pg.evaluate("""(t) => { const all = [...document.querySelectorAll('section')].filter(s => s.textContent.includes(t));
                        if (!all.length) return false; const s = all[all.length - 1]; s.setAttribute('data-shot', '1'); return true }""", text)
                    if not ok: missing.append(f"{path} {key} at {vw}"); continue
                    sec = pg.locator("section[data-shot]").first
                    await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(250)
                    await sec.screenshot(path=str(A / f"cold-{key}-{vw}.png"))
                    await pg.evaluate("() => document.querySelector('section[data-shot]').removeAttribute('data-shot')")
            await ctx.close()
        print("errors:", errs); print("overflow:", over or "none"); print("missing:", missing or "none"); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{lab}</b></div><div class="pair"><img src="assets-2026-10-30/cold-{k}-1440.png" style="width:920px"><img src="assets-2026-10-30/cold-{k}-375.png" style="width:250px"></div></section>' for _, k, _, lab in SHOTS)
    html = f"""<!doctype html><meta charset=utf-8><title>The cold read, built</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1220px;margin:0 0 24px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1220px}} .lab b{{font-size:17px}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>The cold read, built (Will, 30 Oct 2026: "All 69")</h1><p class="intro">The sections whose lines changed, as built. 1440 left, 375 right.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-30-cold-read-built.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1280, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-30-cold-read-built.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
