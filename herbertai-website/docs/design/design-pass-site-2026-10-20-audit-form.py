# Book the Audit details, 3 and 4 of 4 on one board (Grain #32, batch): the
# form's button and small print three ways at 1440 and 375, and the phone layout
# as built at 375 and 320. The hero's button reads "Book a free AI audit"; the
# form's "Book my free audit". Every small print is true of the auto-reply (a
# call that day to set a time) and says what happens, not who (11 Oct rule).
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-19"
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
OPTS = [
  ("today", "Today", None, None, "Book my free audit, then Free. You get a call to set a time. The button words differ from the hero" + chr(0x2019) + "s."),
  ("1", "1. The hero" + chr(0x2019) + "s words", "Book a free AI audit", None, "The same words as the hero" + chr(0x2019) + "s button, so the one action reads the same at the top and the bottom of the page. Recommended."),
  ("2", "2. Shorter", "Book my audit", "Free. You get a call the same day.", "Two words lighter; the small print carries free and the same-day call."),
  ("3", "3. No obligation", "Book my free audit", "Free and no obligation. You get a call the same day.", "Answers the worry before it is asked; a longer small print."),
]
JS = """([btn, note]) => { const s = [...document.querySelectorAll('section')].filter(x => x.textContent.includes('Book the Audit')).pop(); const b = s.querySelector('button[type=submit]'); if (btn) b.firstChild.textContent = btn + ' '; if (note) b.nextElementSibling.textContent = note; }"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone"), (320, 700, "p320")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, btn, note, d in OPTS:
                if tag == "p320" and key != "today":
                    continue
                await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
                sec = pg.locator("section", has_text="Book the Audit").last
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(1000)
                if btn or note:
                    await pg.evaluate(JS, [btn, note]); await pg.wait_for_timeout(200)
                out = A / f"audit-form-{key}-{tag}.png"
                if tag == "laptop":
                    await sec.screenshot(path=str(out))
                else:
                    await sec.screenshot(path=str(out))
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img class="wide" src="assets-2026-10-19/audit-form-{k}-laptop.png"><img class="phone" src="assets-2026-10-19/audit-form-{k}-phone.png"></div></section>' for k, n, bt, nt, d in OPTS)
    phone = '<section><div class="lab"><b>Detail 4: the phone layout, as built</b><span>375 and 320. The heading, the line, then the form with its four fields stacked; nothing cut off, no sideways scroll. Recommended: keep.</span></div><div class="pair"><img class="phone" src="assets-2026-10-19/audit-form-today-phone.png"><img class="phone" src="assets-2026-10-19/audit-form-today-p320.png"></div></section>'
    html = f"""<!doctype html><meta charset=utf-8><title>Book the Audit: the form and the phone</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 24px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1100px;border:1px solid #333}} img.phone{{display:block;width:280px;border:1px solid #333}}</style><body>
<h1>Book the Audit: the form and the phone</h1><p class="intro">Details 3 and 4 of 4, the last of the homepage. The button and small print three ways, then the phone layout as built.</p>{rows}{phone}</body>"""
    f = D / "design-pass-site-2026-10-20-audit-form.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-20-audit-form.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
