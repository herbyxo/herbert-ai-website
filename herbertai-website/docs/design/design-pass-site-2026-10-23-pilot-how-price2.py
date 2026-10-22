# /pilot section 3, How it works: the prices again (23 Oct 2026). Will: "yeah
# idk about the gap, but idk alternatives. i also dont like the yours to keep
# either way". Facts: prices at the foot of the stops are level only by sitting
# under the tallest stop (Live, three facts), which leaves a gap under the
# audit's single fact. Places that are level by construction: above the line,
# or straight under the titles (level while every title fits one line). Every
# option drops "Yours to keep either way" from the written page stop. Drawn in
# the page at 1440, 1024 and 375.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-23"; A.mkdir(exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
Q = chr(0x2019)
FIND = """const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('Audit first. Then fourteen days.')); const ol=sec.querySelector('ol'); const lis=[...ol.children];
 [...ol.querySelectorAll('li li')].filter(x=>x.textContent.startsWith('Yours to keep')).forEach(x=>x.remove());
 const prices=lis.map(li=>[...li.children].find(c=>c.tagName==='P'&&/^Free$|^\\$3,500/.test(c.textContent))); const wide=innerWidth>=1024;"""
OPTS = [
  ("today", "Today", None, "Built: the prices at the foot of the stops, level with the bottom of Live, so there is a gap under the audit" + Q + "s one fact. Still has Yours to keep either way."),
  ("1", "1. Above the line", FIND + """
 if (wide) { ol.style.marginTop='92px'; prices.forEach((p,i)=>{ if(!p) return; p.style.cssText='position:absolute;left:0;top:-46px;margin:0;padding:0;font-size:15px;font-weight:500;color:#111;white-space:nowrap'; }); }
 else { prices.forEach(p=>{ if(!p) return; const h=p.parentElement.querySelector('h3'); h.after(p); p.style.margin='0 0 10px'; p.style.padding='0'; }); }""",
   "The prices sit above the timeline over their stops: level by construction, no gap, and they read as what each stretch costs. On a phone each price goes under its title. Recommended."),
  ("2", "2. Under the titles", FIND + """
 prices.forEach(p=>{ if(!p) return; const h=p.parentElement.querySelector('h3'); h.after(p); p.style.margin='0 0 12px'; p.style.paddingTop='0'; });""",
   "Each price straight under its title, before the facts. Level while every title fits on one line: at 1024 The free AI audit wraps onto two lines and its price drops below the build's."),
  ("3", "3. At the foot, as today", FIND,
   "Today" + Q + "s placement without Yours to keep either way. The prices stay level and the gap under the audit stays."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, dpr in [(1440, 900, 1), (1024, 768, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, js, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                if js: await pg.evaluate("() => {" + js + "}")
                sec = pg.locator("section", has_text="Audit first. Then fourteen days.").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                lv = await pg.evaluate("() => { const ol=[...document.querySelectorAll('section ol')].find(o=>o.textContent.includes('Your written page')); return [...ol.querySelectorAll('p')].filter(p=>/^Free$|^\\$3,500/.test(p.textContent)).map(p=>Math.round(p.getBoundingClientRect().top)) }")
                ov = await pg.evaluate("document.documentElement.scrollWidth - innerWidth")
                await sec.screenshot(path=str(A / f"how-price2-{key}-{vw}.png"))
                print(key, vw, "price tops", lv, "overflow", ov)
            await ctx.close()
        print("errors:", errs); await b.close()
    rws = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img src="assets-2026-10-23/how-price2-{k}-1440.png" style="width:720px"><img src="assets-2026-10-23/how-price2-{k}-1024.png" style="width:512px"><img src="assets-2026-10-23/how-price2-{k}-375.png" style="width:220px"></div></section>' for k, n, j, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot How it works: the prices</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1460px;margin:0 0 24px}}
section{{margin-bottom:38px}} .lab{{margin-bottom:10px;max-width:1460px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:18px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot How it works: where the prices sit</h1><p class="intro">At the foot of the stops the prices are level only by sitting under the tallest stop, which leaves the gap. Options 1 to 3 drop Yours to keep either way. 1440, 1024 and 375.</p>{rws}</body>"""
    f = D / "design-pass-site-2026-10-23-pilot-how-price2.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1560, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-23-pilot-how-price2.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
