# Who Builds It details, 2 and 3 of 3 on one board (Grain #32, batch): the close
# three ways (today, the audit with Will, no link) at 1440 and 375, and the
# phone layout as built at 375 and 320, which needs no change of its own.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-19"
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
OPTS = [
  ("today", "Today: More about Will", None, "Goes to About, where the photo and the longer story live. Fits the Founder label. Recommended: keep."),
  ("audit", "2. Book an audit with Will", "(s) => { const a = s.querySelector('a'); a.firstChild.textContent = 'Book an audit with Will '; }", "Turns the note into a second call to action, but the next section is the audit booking, so the page asks twice in a row."),
  ("none", "3. No link", "(s) => { s.querySelector('a').parentElement.remove(); }", "The section ends on the line; About is still in the header. Cleanest, loses the way to the longer story."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone"), (320, 700, "p320")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, js, note in OPTS:
                if tag == "p320" and key != "today":
                    continue
                await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
                sec = pg.locator("section", has_text="Herbert AI was founded").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(1000)
                if js:
                    await sec.evaluate(js); await pg.wait_for_timeout(200)
                await sec.screenshot(path=str(A / f"founder-close-{key}-{tag}.png"))
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img class="wide" src="assets-2026-10-19/founder-close-{k}-laptop.png"><img class="phone" src="assets-2026-10-19/founder-close-{k}-phone.png"></div></section>' for k, n, j, d in OPTS)
    phone = '<section><div class="lab"><b>Detail 3: the phone layout, as built</b><span>375 and 320. One column, the line at 26px, nothing cut off, no sideways scroll. Recommended: keep as it is.</span></div><div class="pair"><img class="phone" src="assets-2026-10-19/founder-close-today-phone.png"><img class="phone" src="assets-2026-10-19/founder-close-today-p320.png"></div></section>'
    html = f"""<!doctype html><meta charset=utf-8><title>Founder: the close and the phone</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 24px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1100px;border:1px solid #333}} img.phone{{display:block;width:280px;border:1px solid #333}}</style><body>
<h1>Founder: the close and the phone</h1><p class="intro">Who Builds It, details 2 and 3 of 3, on one board. The close three ways, then the phone layout as built.</p>{rows}{phone}</body>"""
    f = D / "design-pass-site-2026-10-19-founder-close.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-19-founder-close.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
