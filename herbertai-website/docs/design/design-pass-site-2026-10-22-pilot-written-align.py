# /pilot section 2, the written page: details 1, how the text sits against the
# sheet (22 Oct 2026). Facts: the text column is centred against the live
# sheet, so at 1440 the label starts about 150px below the sheet's top and the
# link ends about 150px above its bottom. In the hero Will picked the card level
# with the heading ("square and uniform"). Drawn by changing the grid's
# alignment in the page, at 1440 and 1024.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-22"
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
FIND = "const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('What you get back')); const g=sec.querySelector('.grid'); const left=g.children[0]; const sheet=g.children[1]; const h2=left.querySelector('h2');"
OPTS = [
  ("today", "Today", None, "The text centred against the sheet: neither tops nor bottoms line up."),
  ("1", "1. Tops level", FIND + "g.style.alignItems='start';", "The label and the sheet start on the same line."),
  ("2", "2. The sheet level with the heading", FIND + "g.style.alignItems='start'; sheet.style.marginTop=(h2.getBoundingClientRect().top-left.getBoundingClientRect().top)+'px';", "As the hero: the sheet starts at the heading, the label alone above. Recommended: the same rule as the section above it, so the page reads square all the way down."),
  ("3", "3. Bottoms level", FIND + "g.style.alignItems='end';", "The link's line and the sheet's bottom edge line up; the heading sits lower, near the table."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh in [(1440, 900), (1024, 768)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce")
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, js, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                if js: await pg.evaluate("() => {" + js + "}")
                sec = pg.locator("section", has_text="What you get back").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(400)
                await sec.screenshot(path=str(A / f"written-align-{key}-{vw}.png"))
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img src="assets-2026-10-22/written-align-{k}-1440.png" style="width:760px"><img src="assets-2026-10-22/written-align-{k}-1024.png" style="width:560px"></div></section>' for k, n, j, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot written page: alignment</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1340px;margin:0 0 24px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1340px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 2, details 1: the text against the sheet</h1><p class="intro">At 1440 (left) and 1024 (right). Today the text column is centred against the sheet. Phones are unchanged in every option (the text sits above the sheet).</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-22-pilot-written-align.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1420, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-22-pilot-written-align.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
