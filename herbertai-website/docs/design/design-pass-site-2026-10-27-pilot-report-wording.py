# /pilot after Will's "2" (27 Oct 2026): the audit is a written report, not one
# page. The site's "written page" wording is swapped for "written report"; two
# details need his pick: the hero label that said "Your costs, on one page", and
# the written page sheet, whose label becomes "What your report looks like".
# The sheet also gets the option of showing page 2 of the real report (the
# template filled with the same example, rendered through the Word brand
# template). Drawn in the page at 1440 and 375.
import asyncio, os, base64
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-27"
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
Q = chr(0x2019)
P2 = base64.b64encode(open("/private/tmp/claude-501/-Users-willherbert-Files-Herbert-AI/db937ed3-8e12-46e8-a542-e4688751ed7c/scratchpad/report-render/p2hi-2.png", "rb").read()).decode()
LABELS = [("l1", "1. Your costs, in a written report", "Your costs, in a written report", "Says what arrives and what is in it. Recommended."),
          ("l2", "2. Your written report", "Your written report", "The shortest; the timeline below says what is in it."),
          ("l3", "3. Your costs, written up", "Your costs, written up", "Plain, and echoes the section heading What your admin costs, written down.")]
SETL = "(t) => { const g=document.getElementById('book').querySelector('.grid .grid'); g.children[2].children[1].textContent=t; }"
FIND = "const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('What your admin costs')); sec.setAttribute('data-s2','1'); const sh=sec.querySelector('div.bg-white'); const label=sh.querySelector('p'); const total=sh.lastElementChild; const phone=innerWidth<768;"
NOTE = "const n=document.createElement('p'); n.textContent='Figures are illustrative.'; n.style.cssText='margin-top:16px;font-size:12.5px;color:#777'; sh.appendChild(n);"
START = f"""const st=document.createElement('div'); st.style.cssText='margin-top:22px;padding-top:18px;border-top:1px solid rgba(17,17,17,.12)';
 const cols = phone ? 'grid-template-columns:1fr;gap:10px' : 'grid-template-columns:1fr 1fr 1.4fr;gap:18px';
 const cell=(k,v)=>'<div><p style="margin:0;font-family:var(--font-geist-mono),monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#666">'+k+'</p><p style="margin:4px 0 0;font-size:15px;font-weight:500;color:#111;line-height:1.35">'+v+'</p></div>';
 st.innerHTML='<p style="margin:0;font-family:var(--font-geist-mono),monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#666">Start here</p><p style="margin:6px 0 12px;font-size:20px;font-weight:600;letter-spacing:-0.02em">The document chaser</p><div style="display:grid;'+cols+'">'+cell('Saving','About $13,800 a year')+cell('Payback','About three months')+cell('Build','$3,500 fixed, live in 14 days or it{Q}s free')+'</div>';"""
SHEETS = [
  ("s1", "1. The sheet, the label changed, a small note", "label.textContent='What your report looks like'; " + NOTE, "The table and total as now; the label says what it is; Figures are illustrative at the foot."),
  ("s2", "2. As 1, with Start here", "label.textContent='What your report looks like'; total.remove(); " + START + " sh.appendChild(st); " + NOTE, "The report" + Q + "s first two sections: the table, then the first AI employee with its saving, payback and price."),
  ("s3", "3. A page of the real report", "const img=document.createElement('img'); img.src='data:image/png;base64,'+P2; img.alt='Page 2 of an audit report'; img.style.cssText='display:block;width:100%;height:auto;border-radius:6px'; const cap=document.createElement('p'); cap.textContent='Page 2 of 3. Figures are illustrative.'; cap.style.cssText='margin-top:12px;font-size:12.5px;color:#777'; sh.innerHTML=''; sh.style.padding=phone?'10px':'14px'; sh.appendChild(img); sh.appendChild(cap);",
   "The actual document, exactly as it is sent: your Word template, the table, then Start here. True to the format; on a phone the text is small, and the link opens the whole sample. Recommended: it is the real thing."),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, dpr in [(1440, 900, 1), (375, 812, 2)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, text, note in LABELS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE); await pg.evaluate(SETL, text); await pg.wait_for_timeout(300)
                clip = {"x": 0, "y": 0, "width": 375, "height": 520} if vw == 375 else {"x": 100, "y": 220, "width": 620, "height": 420}
                await pg.screenshot(path=str(A / f"rep-{key}-{vw}.png"), clip=clip)
            for key, name, js, note in SHEETS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                await pg.evaluate("(P2) => {" + FIND + js + "}", P2)
                sec = pg.locator("section[data-s2]").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(500)
                await sec.screenshot(path=str(A / f"rep-{key}-{vw}.png"))
            await ctx.close()
        print("errors:", errs); await b.close()
    lab = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img src="assets-2026-10-27/rep-{k}-1440.png" style="width:560px"><img src="assets-2026-10-27/rep-{k}-375.png" style="width:240px"></div></section>' for k, n, t, d in LABELS)
    sht = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img src="assets-2026-10-27/rep-{k}-1440.png" style="width:880px"><img src="assets-2026-10-27/rep-{k}-375.png" style="width:260px"></div></section>' for k, n, j, d in SHEETS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot: report, not page</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:21px;margin:30px 0 12px;color:#fff}} .intro{{color:#aaa;max-width:1200px;margin:0 0 12px}}
section{{margin-bottom:28px}} .lab{{margin-bottom:8px;max-width:1200px}} .lab b{{font-size:17px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:18px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot: the audit as a written report</h1><p class="intro">Every "written page" on the site now reads "written report". Two details need your pick. Answer with both, say "label 1, sheet 3".</p>
<h2>The hero label under 2 days (was Your costs, on one page)</h2>{lab}<h2>The written report sheet</h2>{sht}</body>"""
    f = D / "design-pass-site-2026-10-27-pilot-report-wording.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1240, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(1000)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-27-pilot-report-wording.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
