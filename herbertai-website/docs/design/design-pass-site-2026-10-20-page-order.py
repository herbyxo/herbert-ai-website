# Phase 4, finding 2: the end of the homepage flickers (ink Products, a 441px
# paper Founder strip, ink Book the Audit). The whole page three ways at 1440,
# side by side: today; Founder moved up between Operating Systems and Products
# (light then dark); Founder turned ink (three dark bands to the end).
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-20"; A.mkdir(exist_ok=True)
FIND = "const secs=[...document.querySelectorAll('section')].filter((s,i,a)=>!a.some(o=>o!==s&&o.contains(s))); const by=(t)=>secs.find(s=>s.textContent.includes(t));"
OPTS = [
  ("today", "Today", None, "Four paper sections, ink Products, the paper Founder strip, ink Book the Audit."),
  ("moved", "1. Founder moved up", FIND + "const f=by('Herbert AI was founded'); const p=by('by Herbert AI'); p.parentNode.insertBefore(f,p); p.style.borderTop='0'; const b=by('Book the Audit'); b.style.borderTop='1px solid rgba(255,255,255,.12)';", "Light then dark: five paper sections, then Products and Book the Audit as one dark run split by a hairline. The founder note follows the systems Will builds. Recommended."),
  ("dark", "2. Founder turned ink", FIND + "const f=by('Herbert AI was founded'); f.style.background='#111'; f.style.color='#fff'; f.style.borderTop='1px solid rgba(255,255,255,.12)'; f.querySelectorAll('p').forEach((x,i)=>{ if(i===0) x.style.color='rgba(255,255,255,.6)'; }); f.querySelector('a').style.color='#fff'; const b=by('Book the Audit'); b.style.borderTop='1px solid rgba(255,255,255,.12)';", "Keeps the order; the last three sections become one dark run. Heavier, and the founder note reads as part of the sales close."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=1)
        pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        for key, name, js, note in OPTS:
            await pg.goto("http://localhost:3000/", wait_until="networkidle", timeout=180000)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            h = await pg.evaluate("document.documentElement.scrollHeight")
            for y in range(0, h, 700):
                await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(100)
            if js:
                await pg.evaluate(js); await pg.wait_for_timeout(300)
            await pg.evaluate("window.scrollTo(0,0)"); await pg.wait_for_timeout(400)
            await pg.screenshot(path=str(A / f"page-order-{key}.png"), full_page=True)
            print("captured", key)
        print("errors:", errs); await b.close()
    cols = "".join(f'<figure><figcaption><b>{n}</b><span>{d}</span></figcaption><img src="assets-2026-10-20/page-order-{k}.png"></figure>' for k, n, j, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>Homepage: the order at the end</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 24px}}
.row{{display:flex;gap:28px;align-items:flex-start}} figure{{margin:0;width:460px}} figcaption{{min-height:120px;margin-bottom:10px}} figcaption b{{display:block;font-size:18px;margin-bottom:4px}} figcaption span{{color:#bbb;font-size:14px}} img{{width:460px;display:block;border:1px solid #333}}</style><body>
<h1>Homepage: the order at the end</h1><p class="intro">Phase 4, finding 2. The whole page at 1440, three ways, scaled down to compare the run of light and dark.</p><div class="row">{cols}</div></body>"""
    f = D / "design-pass-site-2026-10-20-page-order.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-20-page-order.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
