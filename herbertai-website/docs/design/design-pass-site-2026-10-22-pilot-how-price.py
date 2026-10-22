# /pilot section 3, How it works: details 1, the pilot's price (22 Oct 2026).
# Facts: the page states the pilot's price only in an FAQ question ("What do I
# actually get for $3,500?") and in After the pilot ("with the pilot's $3,500
# taken off"); the timeline's build stop does not say what it costs. The
# homepage says it in RUNGS[1].price: "$3,500 fixed. Live in 14 days or it's
# free." Drawn by adding the line in the page, at 1440 and 375.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-22"
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
Q = chr(0x2019)
PRICE = f"$3,500 fixed. Live in 14 days or it{Q}s free."
FIND = "const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('Audit first. Then fourteen days.')); const ol=sec.querySelector('ol'); const lis=[...ol.children];"
OPTS = [
  ("today", "Today", None, "The build stop says what happens, not what it costs. The price is only in an FAQ question and After the pilot."),
  ("1", "1. On the build stop", FIND + f"const p=document.createElement('p'); p.textContent={PRICE!r}; p.style.cssText='margin-top:18px;font-size:15px;font-weight:500;color:#111'; lis[2].appendChild(p); const f=document.createElement('p'); f.textContent='Free'; f.style.cssText='margin-top:18px;font-size:15px;font-weight:500;color:#111'; lis[0].appendChild(f);",
   "Each stop that costs something says so, in the homepage" + Q + "s words: Free under the audit, the pilot" + Q + "s price and promise under the build. Recommended: the price sits on what it pays for, and the words match the homepage."),
  ("2", "2. One line under the timeline", FIND + f"const p=document.createElement('p'); p.textContent='The audit is free. The build is $3,500 fixed, live in 14 days or it{Q}s free.'; p.style.cssText='margin-top:40px;font-size:19px;line-height:1.45;color:#111;max-width:60ch;padding-top:20px;border-top:1px solid rgba(17,17,17,.12)'; ol.after(p);",
   "The prices together in one sentence after the four stops."),
  ("3", "3. In the build stop" + Q + "s when line", FIND + f"lis[2].querySelector('p').textContent='14 days from your go · $3,500 fixed'; lis[0].querySelector('p').textContent='45 minutes · free';",
   "The price joins the grey line above each title, so the timeline stays as it is. Drops the promise (or it" + Q + "s free)."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, js, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                if js: await pg.evaluate("() => {" + js + "}")
                sec = pg.locator("section", has_text="Audit first. Then fourteen days.").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                await sec.screenshot(path=str(A / f"how-price-{key}-{vw}.png"))
            await ctx.close()
        print("errors:", errs); await b.close()
    rws = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img src="assets-2026-10-22/how-price-{k}-1440.png" style="width:960px"><img src="assets-2026-10-22/how-price-{k}-375.png" style="width:270px"></div></section>' for k, n, j, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot How it works: the price</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1260px;margin:0 0 24px}}
section{{margin-bottom:38px}} .lab{{margin-bottom:10px;max-width:1260px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 3, details 1: the pilot{Q}s price</h1><p class="intro">On this page the pilot{Q}s price appears only in an FAQ question and in After the pilot. 1440 left, 375 right.</p>{rws}</body>"""
    f = D / "design-pass-site-2026-10-22-pilot-how-price.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1340, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-22-pilot-how-price.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
