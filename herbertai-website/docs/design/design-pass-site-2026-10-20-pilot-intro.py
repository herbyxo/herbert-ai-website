# /pilot details, 2 of 9: the hero's intro and terms (20 Oct 2026). Today's
# terms mix the audit with the pilot ($3,500, 14 days, 100% credited); the hero
# offers the audit. Three ways, drawn by editing the hero in the page.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-20" / "pilot"
Q = chr(0x2019)
INTRO_SHORT = "45 minutes on how your business runs: where the hours go, what each repetitive job costs you a year, and which one to hand over first."
AUDIT_TERMS = [["Free", "No obligation"], ["45 min", "On how the business runs"], ["2 days", "Business days to your written page"], ["Yours", "To keep, either way"]]
OPTS = [
  ("today", "Today", None, "The intro, then four terms: Free, $3,500, 14 days, 100%. Three of the four are the pilot" + Q + "s terms, not the audit" + Q + "s."),
  ("1", "1. The audit" + Q + "s own terms", {"intro": INTRO_SHORT, "terms": AUDIT_TERMS}, "A one-sentence intro and four terms that are all about the audit: free, 45 minutes, two business days, yours to keep. The pilot" + Q + "s terms move to How it works and the questions, where they are explained. Recommended."),
  ("2", "2. No terms", {"intro": None, "terms": None}, "Today" + Q + "s intro alone; the form beside it carries the eye. The calmest first screen."),
  ("3", "3. One quiet line", {"intro": INTRO_SHORT, "line": "Free · 45 minutes · a written page in two business days · yours to keep"}, "The short intro and the audit" + Q + "s terms as one line of small print. Light, but the terms lose their weight."),
]
JS = """(o) => { const sec = document.querySelector('#book'); const left = sec.querySelector('.min-w-0'); const p = left.querySelector('p.mt-6'); const grid = left.querySelector('.grid');
  if (o.intro) p.textContent = o.intro;
  if (o.terms === null && !o.line) { grid.remove(); return; }
  if (o.terms) { grid.innerHTML = ''; o.terms.forEach(([n, l]) => { const d = document.createElement('div'); d.className = 'border-t border-[#111]/12 pt-3'; d.innerHTML = '<div style="font-size:26px;font-weight:600;letter-spacing:-0.02em">' + n + '</div><div style="margin-top:4px;font-size:14px;line-height:1.35;color:#777">' + l + '</div>'; grid.appendChild(d); }); }
  if (o.line) { const q = document.createElement('p'); q.textContent = o.line; q.style.cssText = 'margin-top:28px;font-size:15px;color:#555'; grid.replaceWith(q); } }"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=1 if vw > 400 else 2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            for key, name, o, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content="nextjs-portal{display:none!important}")
                if o: await pg.evaluate(JS, o); await pg.wait_for_timeout(200)
                out = A / f"intro-{key}-{tag}.png"
                if tag == "laptop": await pg.screenshot(path=str(out))
                else:
                    sec = pg.locator("#book"); box = await sec.bounding_box()
                    await pg.screenshot(path=str(out), clip={"x": 0, "y": box["y"], "width": vw, "height": min(box["height"], 760)}, full_page=True)
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img class="wide" src="assets-2026-10-20/pilot/intro-{k}-laptop.png"><img class="phone" src="assets-2026-10-20/pilot/intro-{k}-phone.png"></div></section>' for k, n, o, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot: the intro and terms</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 24px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1100px;border:1px solid #333}} img.phone{{display:block;width:280px;border:1px solid #333}}</style><body>
<h1>/pilot: the intro and terms</h1><p class="intro">Details 2 of 9. Your heading is in place. The first screen at 1440 and the top of the phone, with only the intro and the terms changed.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-20-pilot-intro.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-20-pilot-intro.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
