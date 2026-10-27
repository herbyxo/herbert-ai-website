# /pilot section 2, the written page sheet: proof without "made-up" (27 Oct
# 2026). Will: "it kills our proof if we say its made up and a sample... we dont
# have to say its made up", then "does that image of the audit actually
# represent what an actual audit would look like", then "show me images of your
# examples". Facts: the sheet is the real report template's first section
# (business/sales/audit-report-template.md: the title, Where the time goes with
# Job, Who does it, Hours a week, Cost a year); the template goes on to "Start
# here" (the first AI employee, hours taken over, saving, $3,500, payback); the
# total line is the sample page's, not the template's. The sample's Start here
# is the document chaser: saving about $13,800 a year, payback about three
# months. The figures are illustrative, so the sheet keeps a small note.
# Drawn by changing the sheet in the page, at 1440 and 375.
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-27"
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
Q = chr(0x2019)
FIND = "const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('What your admin costs')); sec.setAttribute('data-s2','1'); const sh=sec.querySelector('div.bg-white'); const label=sh.querySelector('p'); const total=sh.lastElementChild; const phone=innerWidth<768;"
NOTE = "const n=document.createElement('p'); n.textContent='Figures are illustrative.'; n.style.cssText='margin-top:16px;font-size:12.5px;color:#777'; sh.appendChild(n);"
START = f"""const st=document.createElement('div'); st.style.cssText='margin-top:22px;padding-top:18px;border-top:1px solid rgba(17,17,17,.12)';
 const cols = phone ? 'grid-template-columns:1fr;gap:10px' : 'grid-template-columns:1fr 1fr 1.4fr;gap:18px';
 const cell=(k,v)=>'<div><p style="margin:0;font-family:var(--font-geist-mono),monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#666">'+k+'</p><p style="margin:4px 0 0;font-size:15px;font-weight:500;color:#111;line-height:1.35">'+v+'</p></div>';
 st.innerHTML='<p style="margin:0;font-family:var(--font-geist-mono),monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#666">Start here</p><p style="margin:6px 0 12px;font-size:20px;font-weight:600;letter-spacing:-0.02em">The document chaser</p><div style="display:grid;'+cols+'">'+cell('Saving','About $13,800 a year')+cell('Payback','About three months')+cell('Build','$3,500 fixed, live in 14 days or it{Q}s free')+'</div>';"""
OPTS = [
  ("today", "Today", "", "Label: Sample audit page · a made-up practice. The table and a total line."),
  ("1", "1. The label changed, a small note", "label.textContent='What your page looks like'; " + NOTE,
   "The label says what the sheet is (the format you get); the made-up note shrinks to a small grey line at the foot."),
  ("2", "2. As 1, with Start here, like the real report", "label.textContent='What your page looks like'; total.remove(); " + START + " sh.appendChild(st); " + NOTE,
   "The real report" + Q + "s first two sections: the table, then the first AI employee with its saving, payback and price. The total line goes, as the template has none. Recommended: true to what they get, and the saving and payback are the strongest proof on it."),
  ("3", "3. As 2, keeping the total line", "label.textContent='What your page looks like'; " + START + " sh.appendChild(st); " + NOTE,
   "The table, the total, then Start here. The total would be added to the real template so they match."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, js, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                await pg.evaluate("() => {" + FIND + js + "}")
                sec = pg.locator("section[data-s2]").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                await sec.screenshot(path=str(A / f"proof-{key}-{vw}.png"))
                print(key, vw, "overflow", await pg.evaluate("document.documentElement.scrollWidth-innerWidth"))
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img src="assets-2026-10-27/proof-{k}-1440.png" style="width:900px"><img src="assets-2026-10-27/proof-{k}-375.png" style="width:270px"></div></section>' for k, n, j, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot written page: the proof</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1200px;margin:0 0 24px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1200px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot What you get back: the sheet as proof</h1><p class="intro">The sheet is your real report template{Q}s first section. These drop "made-up" from the label and show more of the real report. 1440 left, 375 right.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-27-pilot-sheet-proof.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1260, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-27-pilot-sheet-proof.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
