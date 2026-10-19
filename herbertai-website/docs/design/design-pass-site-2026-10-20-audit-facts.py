# Book the Audit details, 2 of 4: the facts under the heading (20 Oct 2026).
# Today they are RUNGS[0].facts, word for word the facts under How It Works'
# step 1 higher on the same page. Three other ways, each drawn by replacing the
# rows in the page; every row is true of the audit as /pilot describes it
# (the same-day call, 45 minutes, the page in two business days, its three
# contents, yours to keep either way).
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-19"
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
OPTS = [
  ("today", "Today", None, "The same three facts as How It Works" + Q + " step 1, a screen or so up the page."),
  ("1", "1. What happens next", ["You get a call to set a time.", "45 minutes on how your business runs.", "A written page in two business days.", "Yours to keep, either way."], "The steps after the form, in order, the story shape of your Products list. Says what booking leads to and ends on the reassurance. Recommended."),
  ("2", "2. What is on the page", ["The three jobs eating the most hours.", "What each one costs you a year.", "Which one to hand over first."], "What the written page tells them, from /pilot. The most concrete, and nothing on the page repeats it."),
  ("3", "3. No list", "NONE", "The heading and the form alone, with one line under the heading: 45 minutes, a written page back. The calmest close, the shortest section."),
]
JS = """(rows) => { const s = [...document.querySelectorAll('section')].filter(x => x.textContent.includes('Book the Audit')).pop(); const ol = s.querySelector('ol'); if (rows === 'NONE') { const p = document.createElement('p'); p.textContent = '45 minutes, a written page back.'; p.style.cssText = 'margin-top:22px;font-size:19px;line-height:1.45;color:rgba(255,255,255,.7)'; ol.replaceWith(p); return; } const tpl = ol.querySelector('li'); ol.innerHTML = ''; rows.forEach((t, i) => { const li = tpl.cloneNode(true); li.children[0].textContent = String(i + 1).padStart(2, '0'); li.children[1].textContent = t; ol.appendChild(li); }); }"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, rows, note in OPTS:
                await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
                sec = pg.locator("section", has_text="Book the Audit").last
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(1000)
                if rows:
                    await pg.evaluate(JS, rows); await pg.wait_for_timeout(200)
                out = A / f"audit-facts-{key}-{tag}.png"
                if tag == "laptop":
                    await sec.screenshot(path=str(out))
                else:
                    box = await sec.bounding_box()
                    await pg.screenshot(path=str(out), clip={"x": 0, "y": box["y"] + await pg.evaluate("window.scrollY"), "width": vw, "height": min(box["height"], 640)}, full_page=True)
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img class="wide" src="assets-2026-10-19/audit-facts-{k}-laptop.png"><img class="phone" src="assets-2026-10-19/audit-facts-{k}-phone.png"></div></section>' for k, n, r, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>Book the Audit: the facts</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 24px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1100px;border:1px solid #333}} img.phone{{display:block;width:280px;border:1px solid #333}}</style><body>
<h1>Book the Audit: the facts</h1><p class="intro">Detail 2 of 4. Your heading stays. Today the rows repeat How It Works' step 1 word for word; three other ways, each true of the audit as /pilot describes it.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-20-audit-facts.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-20-audit-facts.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
