# /pilot details, 4 of 9: How it works, the heading three ways, each with the
# price lines the hero gave up in detail 2 (Free; $3,500 fixed; live in 14
# days or it's free), the homepage's How It Works pattern. Plain statements
# only. The 14 days run from the kickoff, not the audit (the /pilot answer).
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-20" / "pilot"
Q = chr(0x2019)
PRICES = ["Free", "$3,500 fixed", "Live in 14 days, or it" + Q + "s free"]
OPTS = [
  ("today", "Today", None, False, "The heading is itself a two-beat couplet, and no step says what it costs."),
  ("1", "1. The promise, plainly", "Live 14 days after you say go.", True, "A plain statement with the one number that matters, true to the terms: the clock starts at the kickoff, not the audit. Price lines under the steps. Recommended."),
  ("2", "2. Today" + Q + "s heading, with prices", "Audit first. Then fourteen days.", True, "The heading kept, the price lines added."),
  ("3", "3. What the section is", "How your first job gets handed over.", True, "Says what the three steps describe; no number in it."),
]
JS = """([h, prices]) => { const s = [...document.querySelectorAll('section')].find(x => x.textContent.includes('Live on day 14')); if (h) s.querySelector('h2').textContent = h; if (prices) { [...s.querySelectorAll('.border-t.pt-6')].forEach((col, i) => { const p = document.createElement('p'); p.textContent = prices[i]; p.style.cssText = 'margin-top:20px;font-size:15px;font-weight:500;color:#111'; col.appendChild(p); }); } }"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=1 if vw > 400 else 2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            for key, name, h, prices, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content="nextjs-portal{display:none!important}")
                sec = pg.locator("section", has_text="Live on day 14").first
                await pg.evaluate(JS, [h, PRICES if prices else None]); await pg.wait_for_timeout(200)
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                out = A / f"how-{key}-{tag}.png"
                if tag == "laptop": await sec.screenshot(path=str(out))
                else:
                    box = await sec.bounding_box()
                    await pg.screenshot(path=str(out), clip={"x": 0, "y": box["y"] + await pg.evaluate("scrollY"), "width": vw, "height": min(box["height"], 900)}, full_page=True)
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img class="wide" src="assets-2026-10-20/pilot/how-{k}-laptop.png"><img class="phone" src="assets-2026-10-20/pilot/how-{k}-phone.png"></div></section>' for k, n, h, pr, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot: how it works</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 24px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1100px;border:1px solid #333}} img.phone{{display:block;width:280px;border:1px solid #333}}</style><body>
<h1>/pilot: how it works</h1><p class="intro">Details 4 of 9. The heading three ways, each with the price lines the hero gave up: Free; $3,500 fixed; live in 14 days, or it's free.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-20-pilot-how.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-20-pilot-how.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
