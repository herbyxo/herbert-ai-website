# Critique fix 4 (Will, 20 Oct 2026: "1 and 4"): body text from 15px to 16 or
# 17px. Drawn by a stylesheet that lifts the small sizes on the homepage's own
# copy (14, 15, 16px classes) and leaves the product screens and the hero board
# alone, on How It Works and Operating Systems at 1440x900.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-20"
HIDE = "nextjs-portal{display:none!important}"
SKIP = ':not(:is([role="group"] *, [style*="scale("] *))'
def css(m):
    return "".join(f'section [class~="text-[{a}px]"]{SKIP}{{font-size:{b}px!important}}' for a, b in m)
OPTS = [
  ("today", "Today", None, "Body copy at 15px, list lines at 14, the step facts at 16."),
  ("16", "1. Up 1px: body at 16", css([(14, 15), (15, 16), (16, 17)]), "Every small size up 1px: body copy 16, list lines 15, facts 17. Where most of the ten sites sit. Recommended."),
  ("17", "2. Up 2px: body at 17", css([(14, 16), (15, 17), (16, 18)]), "Up 2px: body copy 17, list lines 16, facts 18. Roomier, closer to Stripe's 18; lines wrap sooner in the narrow columns."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=1)
        pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
        for key, name, style, note in OPTS:
            await pg.goto("http://localhost:3000/", wait_until="networkidle", timeout=180000)
            await pg.add_style_tag(content=HIDE)
            if style:
                await pg.add_style_tag(content=style)
            for t, tag in [("Start with the job", "hiw"), ("The whole office", "os")]:
                sec = pg.locator("section", has_text=t).first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(1200)
                await sec.screenshot(path=str(A / f"bodytext-{key}-{tag}.png"))
            ov = await pg.evaluate("document.documentElement.scrollWidth - window.innerWidth")
            print(key, "overflow", ov)
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img src="assets-2026-10-20/bodytext-{k}-hiw.png"><img src="assets-2026-10-20/bodytext-{k}-os.png"></div></section>' for k, n, s, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>Body text sizes</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 20px}}
section{{margin-bottom:34px}} .lab{{margin-bottom:10px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:16px;align-items:flex-start}} img{{display:block;width:690px;border:1px solid #333}}</style><body>
<h1>Body text sizes</h1><p class="intro">Critique fix 4. How It Works on the left, Operating Systems on the right, at 1440x900. The product screens and the hero board keep their own sizes.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-20-bodytext.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.5)
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-20-bodytext.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
