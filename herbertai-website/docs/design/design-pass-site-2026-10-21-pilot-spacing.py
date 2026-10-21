# /pilot section 1, the hero: remaining detail 2 of 3, spacing (21 Oct 2026).
# Facts, measured on the page: at 1440x900 the hero ends at 697px, so the top
# 105px of the sample page pokes into the first screen (25px at 1280x800); the
# card and the text are centred against each other, so the card starts 10px
# below the label at 1440 and 27px above it at 1280. The homepage hero fills the
# first screen and ends at the fold (Hero.js, xl:min-h-[calc(100svh-76px)]).
# Three ways, drawn by changing the hero's own classes in the page.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-21"; A.mkdir(exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
FIND = "const sec=document.getElementById('book'); const grid=sec.firstElementChild; const left=grid.children[0]; const right=grid.children[1]; const h1=left.querySelector('h1');"
FILL = "sec.style.cssText='display:flex;flex-direction:column;justify-content:center;min-height:calc(100svh - 76px)'; grid.style.paddingTop='32px'; grid.style.paddingBottom='32px'; grid.style.width='100%';"
OPTS = [
  ("today", "Today", None, "The hero ends at 697px; the top of the sample page shows under it. Card and text centred against each other."),
  ("1", "1. Fill the first screen, tops level", FIND + FILL + "grid.style.alignItems='start';",
   "Like the homepage hero: the hero takes the first screen and ends at the fold, the block centred in it. The card's top is level with the label. Nothing from the next section shows until you scroll. Recommended: same as the homepage, and the form gets the whole screen."),
  ("2", "2. Fill the first screen, card level with the heading", FIND + FILL + "grid.style.alignItems='start'; right.style.marginTop=(h1.getBoundingClientRect().top-left.getBoundingClientRect().top)+'px';",
   "As 1, but the card starts at the heading, so the label stands alone above both."),
  ("3", "3. Today's height, tops level", FIND + "grid.style.alignItems='start';",
   "The smallest change: the same paddings, the card's top level with the label. The top of the sample page still shows at the bottom of the screen."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, tag in [(1440, 900, "1440"), (1280, 800, "1280")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=1)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, js, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content="nextjs-portal{display:none!important}")
                if js: await pg.evaluate("() => {" + js + "}")
                await pg.wait_for_timeout(500)
                m = await pg.evaluate("() => { const s=document.getElementById('book'); const g=s.firstElementChild; const l=g.children[0].firstElementChild; const r=g.children[1]; return [Math.round(s.getBoundingClientRect().bottom), Math.round(l.getBoundingClientRect().top), Math.round(r.getBoundingClientRect().top)] }")
                await pg.screenshot(path=str(A / f"pilot-spacing-{key}-{tag}.png"))
                print(key, tag, "hero bottom, label top, card top:", m)
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img src="assets-2026-10-21/pilot-spacing-{k}-1440.png" style="width:720px"><img src="assets-2026-10-21/pilot-spacing-{k}-1280.png" style="width:640px"></div></section>' for k, n, j, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot hero spacing</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1380px;margin:0 0 24px}}
section{{margin-bottom:38px}} .lab{{margin-bottom:10px;max-width:1380px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot hero, detail 2 of 3: spacing</h1><p class="intro">The first screen at 1440x900 (left) and 1280x800 (right), the two common laptop sizes. Today the hero ends partway down and the top of the sample page shows under it, and the card and text are centred against each other, so their tops never line up.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-21-pilot-spacing.html"; f.write_text(html)
    print("sheet done")
asyncio.run(main())
