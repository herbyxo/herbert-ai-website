# Products details, 6 of 6: the phone layout, three ways at 375 (whole band),
# beside today. The phone version of Herbert Reach was the ads-only one; option
# 1 is it rebuilt as the full product (ReachMobile, matching ReachDashboard).
# 2 drops the phone version so the story carries the band; 3 moves it above
# the story. Today was captured before the rebuild.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-19"
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
MOVE = {
  "1": None,
  "2": "(band) => { band.querySelector('.lg\\\\:hidden').style.display = 'none'; }",
  "3": "(band) => { const ph = band.querySelector('.lg\\\\:hidden'); const ol = band.querySelector('ol'); ph.style.margin = '24px 0 8px'; ol.parentNode.insertBefore(ph, ol); }",
}
NOTES = [
  ("today", "Today", "The ads-only phone version: cost per enquiry, a Meta campaign card, a daily audit feed. It no longer matches the laptop dashboard or the story."),
  ("1", "1. The full product on the phone", "The same phone, rebuilt to match the laptop: spend across every channel, jobs booked, cost per job; the Creative" + chr(0x2019) + "s new ad and landing page waiting on you; a booked lead landing at the top. The story, then the owner running it from their phone. Recommended."),
  ("2", "2. No phone version", "The story carries the band on its own: about half the height, nothing to show the product working."),
  ("3", "3. Phone first", "The phone version straight under the line, the story after it as the caption. Shows the product first, but the story lands after a long scroll."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); out = {}
        for vw, vh in [(375, 812), (320, 700)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            for key in ["1", "2", "3"]:
                await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
                band = pg.locator("section", has_text="by Herbert AI").first
                await band.scroll_into_view_if_needed(); await pg.wait_for_timeout(1200)
                if MOVE[key]:
                    await band.evaluate(MOVE[key])
                await pg.wait_for_timeout(300)
                info = await pg.evaluate("""() => { const band=[...document.querySelectorAll('section')].find(x=>x.textContent.includes('by Herbert AI')); const scr=band.querySelector('.lg\\\\:hidden .rounded-\\\\[36px\\\\]'); return {h: Math.round(band.getBoundingClientRect().height), overflow: document.documentElement.scrollWidth - window.innerWidth, phoneClipped: scr ? scr.scrollHeight - scr.clientHeight : null}; }""")
                print(vw, key, info, errs)
                if vw == 375:
                    await band.screenshot(path=str(A / f"products-phone-{key}.png"))
            await ctx.close()
        await b.close()
    cols = "".join(f'<figure><figcaption><b>{n}</b><span>{d}</span></figcaption><img src="assets-2026-10-19/products-phone-{k}.png"></figure>' for k, n, d in NOTES)
    html = f"""<!doctype html><meta charset=utf-8><title>Products: the phone layout</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1500px;margin:0 0 24px}}
.row{{display:flex;gap:22px;align-items:flex-start}} figure{{margin:0;width:340px}} figcaption{{min-height:150px;margin-bottom:10px}} figcaption b{{display:block;font-size:18px;margin-bottom:4px}} figcaption span{{color:#bbb;font-size:14px}} img{{width:340px;display:block;border:1px solid #333}}</style><body>
<h1>Products: the phone layout</h1><p class="intro">Detail 6 of 6, the last for this section. The whole band at 375, each option beside today. Checked at 320 as well.</p><div class="row">{cols}</div></body>"""
    f = D / "design-pass-site-2026-10-19-products-phone.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1520, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-19-products-phone.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
