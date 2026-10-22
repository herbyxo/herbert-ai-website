# /pilot section 2, the written page: details 3, the phone order (22 Oct 2026).
# Facts: on a phone the section stacks label, heading, the "Read the whole
# sample" link, then the sheet, so the link offers the rest of the sample
# before any of it is seen. Below 1024px the grid is one column. Drawn by moving
# the link in the page at 375 (and at 1440 for option 2, which changes laptops).
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-22"
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
FIND = "const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('What your admin costs')); const g=sec.querySelector('.grid'); const sheet=g.children[1]; const lp=[...sec.querySelectorAll('p')].find(p=>p.textContent.includes('Read the whole sample'));"
OPTS = [
  ("today", "Today", None, "Label, heading, the link, then the sheet."),
  ("1", "1. The link under the sheet, on phones", FIND + "g.appendChild(lp); lp.style.marginTop='20px';",
   "Read the sheet, then the link offers the rest. Laptops unchanged (the link stays beside the sheet). Recommended: the offer comes after the proof."),
  ("2", "2. The link at the foot of the sheet, every width", FIND + "sheet.appendChild(lp); lp.style.marginTop='18px'; lp.style.paddingTop='16px'; lp.style.borderTop='1px solid rgba(17,17,17,.1)';",
   "The link becomes the sheet's last line on phones and laptops, so the text column on a laptop is the label and heading only."),
  ("3", "3. A full-width button under the sheet, on phones", FIND + "g.appendChild(lp); lp.style.marginTop='20px'; const a=lp.querySelector('a'); a.style.cssText='display:flex;gap:6px;justify-content:center;border:1px solid rgba(17,17,17,.2);border-radius:10px;padding:13px 16px;text-decoration:none;font-size:16px;font-weight:500;color:#111';",
   "As 1, with the link as an outlined button the width of the sheet: a bigger target for a thumb."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, dpr in [(375, 812, 2), (1440, 900, 1)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, js, note in OPTS:
                if vw == 1440 and key not in ("today", "2"): continue
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                if js: await pg.evaluate("() => {" + js + "}")
                sec = pg.locator("section", has_text="What your admin costs").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                ov = await pg.evaluate("document.documentElement.scrollWidth - innerWidth")
                await sec.screenshot(path=str(A / f"written-phone-{key}-{vw}.png"))
                print(key, vw, "overflow", ov)
            await ctx.close()
        print("errors:", errs); await b.close()
    phones = "".join(f'<figure><figcaption><b>{n}</b><br>{d}</figcaption><img src="assets-2026-10-22/written-phone-{k}-375.png" style="width:280px"></figure>' for k, n, j, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot written page on a phone</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:19px;margin:30px 0 10px}} .intro{{color:#aaa;max-width:1240px;margin:0 0 20px}}
.row{{display:flex;gap:22px;align-items:flex-start}} figure{{margin:0;width:280px}} figcaption{{color:#bbb;font-size:13.5px;min-height:96px;margin-bottom:8px}} figcaption b{{color:#fff;font-size:15px}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 2, details 3: the order on a phone</h1><p class="intro">At 375. Today the link to the whole sample comes before the sheet. Options 1 and 3 change phones only; option 2 also changes laptops (below).</p>
<div class="row">{phones}</div>
<h2>Option 2 on a laptop (1440): the link moves into the sheet</h2><div class="row"><img src="assets-2026-10-22/written-phone-2-1440.png" style="width:1000px"></div></body>"""
    f = D / "design-pass-site-2026-10-22-pilot-written-phone.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1320, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-22-pilot-written-phone.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
