# /pilot section 1, the hero: the four terms again (27 Oct 2026). Will: "what
# is the 45 min? and the to keep, either way under yours is a bit cringey?"
# Facts: the 45 minutes is the audit call (business/sales/ai-audit.md, "The
# call, forty five minutes": how the business runs, the jobs that repeat, three
# numbers for each); with the intro sentence gone, "On how the business runs"
# no longer says it is a call. The page is the owner's to keep whether or not
# they go ahead. He cut "Yours to keep either way" from How it works on 23 Oct.
# Drawn by changing the terms in the page, at 1440 and 375.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-27"; A.mkdir(exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important}"
OPTS = [
  ("today", "Today", None, "45 min / On how the business runs no longer says it is a call; Yours / To keep, either way."),
  ("1", "1. Three terms, the 45 minutes named", [["Free", "No obligation"], ["45 min", "One call on how your business runs"], ["2 days", "To your written page"]],
   "Yours goes, as it did from How it works; the 45 minutes says it is a call; 2 days says what arrives. Recommended."),
  ("2", "2. Three terms, one or two words each", [["Free", "No obligation"], ["45 min", "One call"], ["2 days", "Your written page"]],
   "The same three, as short as they go; the call" + chr(0x2019) + "s subject is left to the form beside it."),
  ("3", "3. Four terms, Yours said plainly", [["Free", "No obligation"], ["45 min", "One call on how your business runs"], ["2 days", "To your written page"], ["Yours", "The page, whatever you decide"]],
   "Keeps the fourth fact (the page stays with you) in plainer words."),
]
SET = """(terms) => { const g=document.getElementById('book').querySelector('.grid .grid'); const tpl=g.firstElementChild;
 g.innerHTML=''; terms.forEach(([n,l])=>{ const c=tpl.cloneNode(true); c.children[0].textContent=n; c.children[1].textContent=l; g.appendChild(c); });
 g.style.gridTemplateColumns = (innerWidth>=640 || terms.length===3) ? 'repeat('+terms.length+', minmax(0,1fr))' : ''; }"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, terms, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                if terms: await pg.evaluate(SET, terms)
                await pg.wait_for_timeout(300)
                await pg.screenshot(path=str(A / f"terms-{key}-{vw}.png"))
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img src="assets-2026-10-27/terms-{k}-1440.png" style="width:900px"><img src="assets-2026-10-27/terms-{k}-375.png" style="width:280px"></div></section>' for k, n, t, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot hero: the terms</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1220px;margin:0 0 24px}}
section{{margin-bottom:34px}} .lab{{margin-bottom:10px;max-width:1220px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot hero: the four terms</h1><p class="intro">The 45 minutes is the audit call; with the intro gone the terms have to say so. The first screen at 1440 and 375.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-27-pilot-terms.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1280, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-27-pilot-terms.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
