# /pilot hero, remaining detail 1 of 3: the form side (20 Oct 2026). Today a
# loose "Prefer to talk now? 0448 111 840" line sits under the form card.
# Three ways, drawn by moving it in the page; laptop and phone.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-20" / "pilot"
Q = chr(0x2019)
OPTS = [
  ("today", "Today", None, "The card, then a loose line under it: Prefer to talk now? 0448 111 840."),
  ("1", "1. The call inside the card", "inside", "The number moves into the card under the button as " + chr(0x201C) + "Or call 0448 111 840" + chr(0x201D) + ", so the two ways to book read as one block. Recommended."),
  ("2", "2. The form alone", "remove", "No number on the first screen; one way to book. The number stays in the footer."),
  ("3", "3. The call with the terms", "left", "The number sits on the left under the four terms, with the facts, and the card stands alone."),
]
JS = """(mode) => { const sec = document.querySelector('#book'); const cols = sec.querySelectorAll(':scope > div > .min-w-0'); const right = cols[1]; const left = cols[0]; const line = right.querySelector(':scope > p'); const card = right.querySelector(':scope > div');
  if (mode === 'remove') { line.remove(); return; }
  if (mode === 'inside') { line.remove(); const p = document.createElement('p'); p.innerHTML = 'Or call <a style="font-weight:500;color:#111;text-decoration:underline;text-underline-offset:4px;text-decoration-color:rgba(17,17,17,.3)">0448 111 840</a>'; p.style.cssText = 'margin-top:14px;font-size:15px;color:#555'; card.querySelector('form').appendChild(p); return; }
  if (mode === 'left') { line.style.marginTop = '28px'; left.appendChild(line); return; } }"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=1 if vw > 400 else 2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            for key, name, mode, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content="nextjs-portal{display:none!important}")
                if mode: await pg.evaluate(JS, mode); await pg.wait_for_timeout(200)
                out = A / f"formside-{key}-{tag}.png"
                if tag == "laptop": await pg.screenshot(path=str(out))
                else:
                    sec = pg.locator("#book"); box = await sec.bounding_box()
                    await pg.screenshot(path=str(out), clip={"x": 0, "y": box["y"], "width": vw, "height": box["height"]}, full_page=True)
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img class="wide" src="assets-2026-10-20/pilot/formside-{k}-laptop.png"><img class="phone" src="assets-2026-10-20/pilot/formside-{k}-phone.png"></div></section>' for k, n, m, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot hero: the form side</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 24px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1100px;border:1px solid #333}} img.phone{{display:block;width:280px;border:1px solid #333}}</style><body>
<h1>/pilot hero: the form side</h1><p class="intro">Section 1, the hero, remaining detail 1 of 3. The first screen at 1440, and the whole hero on a phone.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-20-pilot-formside.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-20-pilot-formside.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
