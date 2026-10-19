# Critique fix 1 (Will, 20 Oct 2026: "1 and 4"): the Operating Systems and
# Herbert Reach screens at full size instead of 61% (text 7 to 8px). Each
# layout is drawn by moving the section's own elements in the page at 1440x900,
# so the screens re-scale the way the built version would (Scaled reads its
# width). Three ways for each section, beside today.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-20"; A.mkdir(exist_ok=True)
HIDE = "nextjs-portal{display:none!important}"

OS_FIND = "const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('The whole office')); const grid=sec.querySelector('.grid'); const left=grid.children[0]; const right=grid.children[1]; const tabs=right.querySelector('[aria-label=\"Operating systems\"]'); const close=right.querySelector(':scope > p');"
OS = [
  ("os-today", "Today", None, "The screen in a column at 61%, its text 7.4px; the industries listed beside it."),
  ("os-1", "1. Tabs above, the screen full width", OS_FIND + """
grid.style.display='block'; left.parentNode.insertBefore(tabs, left); tabs.className=''; tabs.style.cssText='display:flex;border-bottom:1px solid rgba(17,17,17,.15);margin-bottom:20px';
[...tabs.children].forEach(b=>{ const on=b.getAttribute('aria-selected')==='true'; b.className=''; b.style.cssText='flex:1;text-align:left;padding:10px 14px 12px;border-bottom:2px solid '+(on?'#111':'transparent')+';margin-bottom:-1px;background:none'; b.children[0].style.fontSize='19px'; b.children[1].style.fontSize='13px'; });
right.style.marginTop='18px'; right.appendChild(close); close.style.marginTop='0';""", "The industries become tabs across the top and the screen runs the full width at its real size: text 12 to 13px, like an app window with its own tabs. Recommended."),
  ("os-2", "2. The screen full width, the industries under it", OS_FIND + """
grid.style.display='block'; tabs.className=''; tabs.style.cssText='display:grid;grid-template-columns:repeat(5,1fr);gap:0 20px;margin-top:22px';
left.after(tabs); [...tabs.children].forEach(b=>{ const on=b.getAttribute('aria-selected')==='true'; b.className=''; b.style.cssText='text-align:left;padding:12px 0 0;border-top:2px solid '+(on?'#111':'rgba(17,17,17,.15)')+';background:none'; b.children[0].style.fontSize='19px'; b.children[1].style.fontSize='13px'; });
right.style.marginTop='18px'; tabs.after(close); close.style.marginTop='18px';""", "The screen first at full size, the five industries in a row beneath it like a caption you pick from. The screen leads; choosing an industry comes after seeing one."),
  ("os-3", "3. Two columns, a wider screen", OS_FIND + """
grid.style.gridTemplateColumns='1.62fr 0.38fr'; [...tabs.children].forEach(b=>{ b.children[0].style.fontSize='18px'; b.children[1].style.display='none'; });""", "The smallest change: the list narrows to names only and the screen widens. Text reaches about 9px, still under a readable size."),
]

RE_FIND = "const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('by Herbert AI')); const grid=sec.querySelector('.grid'); const left=grid.children[0]; const right=grid.children[1]; const ps=[...left.children];"
RE = [
  ("re-today", "Today", None, "The story beside the dashboard at 61%, its text 8px."),
  ("re-1", "1. The name and story on top, the dashboard full width", RE_FIND + """
grid.style.display='block'; const a=document.createElement('div'); const b=document.createElement('div'); ps.forEach(el=>{ (el.tagName==='OL'||el.textContent.trim()==='In development') ? b.appendChild(el) : a.appendChild(el); });
left.appendChild(a); left.appendChild(b); left.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:end'; b.querySelector('ol').style.marginTop='0'; right.style.marginTop='40px';""", "The name and your line on the left, the story on the right, and the dashboard under them at its real size. Every number on it can be read. Recommended."),
  ("re-2", "2. The story as a row, the dashboard full width", RE_FIND + """
grid.style.display='block'; const ol=left.querySelector('ol'); ol.style.cssText='display:grid;grid-template-columns:repeat(5,1fr);gap:0 20px;margin-top:28px;border-bottom:0'; [...ol.children].forEach(li=>{ li.style.borderTop='2px solid rgba(255,255,255,.2)'; li.style.flexDirection='column'; li.style.gap='6px'; }); right.style.marginTop='36px';""", "The five steps run left to right above the dashboard, so the story reads like the product's own progress bar."),
  ("re-3", "3. Two columns, a wider dashboard", RE_FIND + """
grid.style.gridTemplateColumns='0.48fr 1.52fr';""", "The smallest change: the story column narrows and the dashboard widens. Text reaches about 9px, still under a readable size."),
]

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=1)
        pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
        for group, text in [(OS, "The whole office"), (RE, "by Herbert AI")]:
            for key, name, js, note in group:
                await pg.goto("http://localhost:3000/", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                sec = pg.locator("section", has_text=text).first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(1500)
                if js:
                    await pg.evaluate("() => {" + js + "}"); await pg.wait_for_timeout(700)
                k = await pg.evaluate(f"() => {{ const s=[...document.querySelectorAll('section')].find(x=>x.textContent.includes({text!r})); const el=[...s.querySelectorAll('[style*=\"scale(\"]')].find(e=>e.getBoundingClientRect().width>0); return el ? parseFloat(el.style.transform.match(/scale\\(([0-9.]+)/)[1]) : null; }}")
                h = await pg.evaluate(f"() => Math.round([...document.querySelectorAll('section')].find(x=>x.textContent.includes({text!r})).getBoundingClientRect().height)")
                await sec.screenshot(path=str(A / f"fullsize-{key}.png"))
                print(key, "scale", k, "section height", h)
        print("errors:", errs); await b.close()
    def block(group):
        return "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><img src="assets-2026-10-20/fullsize-{k}.png"></section>' for k, n, j, d in group)
    html = f"""<!doctype html><meta charset=utf-8><title>The system screens at full size</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:21px;margin:30px 0 14px}} .intro{{color:#aaa;max-width:1400px;margin:0 0 20px}}
section{{margin-bottom:34px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} img{{display:block;width:1400px;border:1px solid #333}}</style><body>
<h1>The system screens at full size</h1><p class="intro">Critique fix 1. Today both screens are shrunk to 61%, with text at 7 to 8px. Each option is the real section with its elements moved, at 1440x900.</p>
<h2>Operating Systems</h2>{block(OS)}<h2>Herbert Reach</h2>{block(RE)}</body>"""
    f = D / "design-pass-site-2026-10-20-fullsize.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1)
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(1000)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-20-fullsize.png"), full_page=True); await b.close()
    print("sheet done")

asyncio.run(main())
