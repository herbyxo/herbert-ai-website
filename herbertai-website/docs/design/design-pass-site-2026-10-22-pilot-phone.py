# /pilot section 1, the hero: remaining detail 3 of 3, the phone layout (22 Oct
# 2026). Facts at 375x812: the four terms take 208px as a 2x2 grid (453 to
# 661); the form card starts at 709px, so the first screen shows only its top
# edge and the "Your name" label; the book button is at 1265px, a screen and a
# half down. Laptop layout unchanged in every option (lg: only applies from
# 1024px). Three ways, drawn by moving the hero's own elements.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-22"; A.mkdir(exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
FIND = "const s=document.getElementById('book'); const g=s.firstElementChild; const left=g.children[1]; const intro=left.children[1]; const terms=left.children[2]; const card=g.lastElementChild;"
OPTS = [
  ("today", "Today", None, "Heading, intro, the four terms as a 2x2 grid, then the form. The first screen ends at the form's top edge."),
  ("1", "1. The form after the intro, the terms under it", FIND + "card.style.marginTop='32px'; card.after(terms); terms.style.marginTop='36px';",
   "Heading, intro, then the form: the name, business, email and phone fields show in the first screen. The four terms follow the button as the small print you read before pressing. Recommended: on a phone the page is there to take the booking."),
  ("2", "2. The terms in one row", FIND + "terms.style.cssText='display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:28px'; [...terms.children].forEach(t=>{ t.children[0].style.fontSize='18px'; t.children[1].style.fontSize='12px'; }); card.style.marginTop='32px';",
   "Today's order with the terms as one row of four, smaller. The form starts about 170px higher: its first field shows in the first screen."),
  ("3", "3. A button to the form", FIND + "const a=document.createElement('a'); a.href='#name'; a.textContent='Book a free AI audit ↓'; a.style.cssText='display:inline-flex;margin-top:24px;background:#111;color:#fff;border-radius:10px;padding:14px 24px;font-size:16px;font-weight:500;text-decoration:none'; intro.after(a);",
   "Today's order, with the form's button under the intro on phones only, jumping down to the form. The action is in the first screen; the form stays after the terms."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        ctx = await b.new_context(viewport={"width": 375, "height": 812}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        for key, name, js, note in OPTS:
            await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            if js: await pg.evaluate("() => {" + js + "}")
            await pg.wait_for_timeout(400)
            m = await pg.evaluate("() => { const s=document.getElementById('book'); const t=e=>Math.round(e.getBoundingClientRect().top); return {cardTop: t(s.firstElementChild.lastElementChild.querySelector('form') ? s.querySelector('form').closest('.rounded-2xl') : s), firstInput: t(s.querySelector('input#name')), button: t(s.querySelector('button[type=submit]')), heroBottom: Math.round(s.getBoundingClientRect().bottom), overflow: document.documentElement.scrollWidth-innerWidth} }")
            await pg.screenshot(path=str(A / f"pilot-phone-{key}-first.png"))
            await pg.screenshot(path=str(A / f"pilot-phone-{key}-hero.png"), full_page=True, clip={"x": 0, "y": 0, "width": 375, "height": m["heroBottom"]})
            print(key, m)
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><figure><img src="assets-2026-10-22/pilot-phone-{k}-first.png" style="width:300px"><figcaption>First screen</figcaption></figure><figure><img src="assets-2026-10-22/pilot-phone-{k}-hero.png" style="width:300px"><figcaption>The whole hero</figcaption></figure></div></section>' for k, n, j, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot hero on a phone</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1300px;margin:0 0 24px}}
.grid{{display:grid;grid-template-columns:repeat(2,1fr);gap:28px 40px;max-width:1400px}} section{{margin:0}} .lab{{margin-bottom:10px;min-height:66px}} .lab b{{font-size:18px;margin-right:10px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:16px;align-items:flex-start}} figure{{margin:0}} figcaption{{color:#888;font-size:13px;margin-top:6px}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot hero, detail 3 of 3: the phone layout</h1><p class="intro">At 375x812. Today the first screen ends at the form's top edge and the book button is a screen and a half down. The laptop layout is the same in every option.</p><div class="grid">{rows}</div></body>"""
    f = D / "design-pass-site-2026-10-22-pilot-phone.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1480, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-22-pilot-phone.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
