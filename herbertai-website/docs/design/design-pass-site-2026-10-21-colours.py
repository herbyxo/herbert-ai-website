# Stopgap colour pass (Will, 21 Oct 2026: "go through all my pages and just make
# them the same colour theme so at least it all matches for now while im still
# redesigning the pages"). Every organic page at 1440 (full page) and 375 (first
# screen), plus a check that no element still computes to the May palette:
# neon green rgb(0,255,136), deep green rgb(0,217,36) or cream rgb(245,240,229).
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-21"; A.mkdir(exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
PAGES = ["/", "/pilot", "/services", "/work", "/work/operations-hub", "/work/marketing-engine", "/industries", "/industries/accountants",
         "/pricing", "/about", "/contact", "/faq", "/start", "/start/thanks", "/pilot/thanks", "/pilot/sample-audit",
         "/ai-receptionist", "/web-design-adelaide", "/google-ads-adelaide", "/privacy"]
OLD = ["rgb(0, 255, 136)", "rgb(0, 217, 36)", "rgb(245, 240, 229)", "rgb(239, 233, 220)", "rgb(226, 219, 203)", "rgb(107, 102, 96)"]
CHECK = """(old) => { const hits = []; for (const el of document.querySelectorAll('body *')) { if (el.closest('svg')) continue; const cs = getComputedStyle(el);
  for (const p of ['backgroundColor','color','borderTopColor']) { if (old.includes(cs[p]) && !(p==='borderTopColor' && cs.borderTopWidth==='0px')) hits.push(el.tagName+'.'+String(el.className).slice(0,40)+' '+p+' '+cs[p]); } } return hits.slice(0,6); }"""
def key(p): return (p.strip("/").replace("/", "-") or "home")
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=1)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for path in PAGES:
                await pg.goto("http://localhost:3000" + path, wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content="nextjs-portal{display:none!important} *{animation:none!important;transition:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}")
                h = await pg.evaluate("document.documentElement.scrollHeight")
                for y in range(0, h, 700): await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(60)
                await pg.evaluate("window.scrollTo(0,0)"); await pg.wait_for_timeout(400)
                ov = await pg.evaluate("document.documentElement.scrollWidth - window.innerWidth")
                hits = await pg.evaluate(CHECK, OLD)
                await pg.screenshot(path=str(A / f"colours-{key(path)}-{tag}.png"), full_page=(tag == "laptop"))
                print(f"{path:28} {tag:6} overflow {ov:3}  old-palette {len(hits)} {hits[:2]}")
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{p}</b></div><div class="pair"><img class="wide" src="assets-2026-10-21/colours-{key(p)}-laptop.png"><img class="phone" src="assets-2026-10-21/colours-{key(p)}-phone.png"></div></section>' for p in PAGES)
    html = f"""<!doctype html><meta charset=utf-8><title>Every page on one palette</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1200px;margin:0 0 24px}}
section{{margin-bottom:36px}} .lab b{{font-size:18px}} .lab{{margin-bottom:8px}} .pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:900px;border:1px solid #333}} img.phone{{display:block;width:280px;border:1px solid #333}}</style><body>
<h1>Every page on one palette</h1><p class="intro">The stopgap while the redesign continues: paper #FAFAF8 and ink #111 everywhere, neutral greys and lines, no neon green. Fonts and layouts are unchanged; the paid /lp pages keep their own palette. Laptop full page on the left, the phone's first screen on the right.</p>{rows}</body>"""
    (D / "design-pass-site-2026-10-21-colours.html").write_text(html)
    print("sheet done")
asyncio.run(main())
