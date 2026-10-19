# Products details, 4 and 5 of 6 together (Will, 19 Oct 2026: "i think we just
# remove that, and the early access note. and instead of the see Herbert Reach,
# we have a still in development, or in alpha phase, or something"). Built with
# "In development"; the label swapped in the page for the two other wordings,
# laptop band and phone top, plus the build check at four widths.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-19"
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
LABELS = [("dev", "In development", "Built. Plain, and every owner knows what it means; no promise of when. Recommended."), ("alpha", "Alpha", "Software talk: reads as early to people who build software, and may mean nothing to a plumber."), ("soon", "Coming soon", "The familiar phrase, but it promises timing nobody has set.")]
JS = """(t) => { const band = [...document.querySelectorAll('section')].find(x => x.textContent.includes('by Herbert AI')); const p = [...band.querySelectorAll('p')].find(x => x.textContent.trim() === 'In development' || x.dataset.status); p.dataset.status = '1'; p.lastChild.textContent = t; }"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for motion in ["reduce", "no-preference"]:
            for vw, vh in [(1440, 900), (1280, 800), (375, 812), (320, 700)]:
                ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion=motion, device_scale_factor=2)
                pg = await ctx.new_page(); errs = []
                pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
                pg.on("console", lambda m: errs.append(m.text[:160]) if m.type == "error" else None)
                r = await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                band = pg.locator("section", has_text="by Herbert AI").first
                await band.scroll_into_view_if_needed(); await pg.wait_for_timeout(1500)
                info = await pg.evaluate("""() => { const band=[...document.querySelectorAll('section')].find(x=>x.textContent.includes('by Herbert AI')); return {overflow: document.documentElement.scrollWidth - window.innerWidth, h: Math.round(band.getBoundingClientRect().height), links: band.querySelectorAll('a').length, early: band.textContent.includes('Early access')}; }""")
                print(motion, vw, r.status, info, "errors:", errs)
                if motion == "reduce" and vw in (1440, 375):
                    for key, t, _ in LABELS:
                        await pg.evaluate(JS, t); await pg.wait_for_timeout(150)
                        out = A / f"products-status-{key}-{'laptop' if vw == 1440 else 'phone'}.png"
                        if vw == 1440:
                            await band.screenshot(path=str(out))
                        else:
                            box = await band.bounding_box()
                            await pg.screenshot(path=str(out), clip={"x": 0, "y": box["y"] + await pg.evaluate("window.scrollY"), "width": vw, "height": min(box["height"], 640)}, full_page=True)
                await ctx.close()
        await b.close()
    rows = "".join(f'<section><div class="lab"><b>{i}. {t}</b><span>{n}</span></div><div class="pair"><img class="wide" src="assets-2026-10-19/products-status-{k}-laptop.png"><img class="phone" src="assets-2026-10-19/products-status-{k}-phone.png"></div></section>' for i, (k, t, n) in enumerate(LABELS, 1))
    html = f"""<!doctype html><meta charset=utf-8><title>Products: the status label</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1380px;margin:0 0 24px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1100px;border:1px solid #333}} img.phone{{display:block;width:280px;border:1px solid #333}}</style><body>
<h1>Products: the status label</h1><p class="intro">Details 4 and 5 of 6 together. The early-access note and the link are gone; a status label sits where the link was, a grey dot because grey means not live yet on this site. Built with In development; the other two are swapped in the page.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-19-products-status.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-19-products-status.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
