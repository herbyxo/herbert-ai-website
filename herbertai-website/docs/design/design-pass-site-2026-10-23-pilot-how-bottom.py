# /pilot section 3, How it works: the timeline at the bottom (23 Oct 2026).
# Will: "maybe we move the timeline to be at the bottom?" A line at the foot of
# the stops works like a chart's axis: whatever hangs off it is level by
# construction. Three ways, drawn by replacing the list in the page at 1440
# and 1024 (phones keep the line down the left; shown once). Every option drops
# "Yours to keep either way".
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-23"
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
HIDE = "nextjs-portal{display:none!important} .reveal,.reveal-slow{opacity:1!important;transform:none!important}"
Q = chr(0x2019)
STEPS = [
  ("45 minutes", "The free AI audit", ["How your business runs and where the hours go"], "Free"),
  ("Within two business days", "Your written page", ["The three jobs costing you most, in your figures"], None),
  ("14 days from your go", "Your first AI employee, built", ["Built around the tools you already use", "One job and a name, say an AI document chaser", "A progress update, not a project plan"], f"$3,500 fixed. Live in 14 days or it{Q}s free."),
  ("Day 14", "Live", ["Your team uses it the same day", "A walkthrough so everyone knows how", "A twelve month roadmap of the next jobs"], None),
]
FACT = "font-size:17px;line-height:1.45;color:#444;padding:8px 0;border-top:1px solid rgba(17,17,17,.08);list-style:none"
WHEN = "font-size:16px;font-weight:500;color:#777;margin:0"
PRICE = "font-size:15px;font-weight:500;color:#111;margin:0"
H3 = "font-size:24px;font-weight:600;letter-spacing:-0.02em;margin:0 0 10px"
def facts(fs): return '<ul style="margin:0;padding:0">' + "".join(f'<li style="{FACT}">{f}</li>' for f in fs) + "</ul>"
def axis(i, build):
    ticks = "".join(f'<span style="flex:1;border-left:1px solid rgba(17,17,17,{".5" if d in (0, 13) else ".2"});height:{"12" if d in (0, 13) else "7"}px"></span>' for d in range(14))
    t = f'<span style="position:absolute;left:0;right:0;bottom:2px;display:flex;align-items:flex-end;height:12px">{ticks}</span>' if build else ""
    line = "#111" if i < 3 else "transparent"
    return f'<div style="position:relative;height:2px;background:{line};margin-right:-28px">{t}<span style="position:absolute;left:0;top:-5px;width:12px;height:12px;border-radius:50%;background:#111"></span></div>'
def ol(kind):
    # Rows, not columns: the line is one row across every stop, so it is
    # straight whatever hangs above or below it.
    COLS = "display:grid;grid-template-columns:0.8fr 1fr 1.6fr 1fr"
    def row(cells, align="start", extra=""):
        return f'<div style="{COLS};align-items:{align};{extra}">' + "".join(f'<div style="min-width:0;padding-right:28px">{c}</div>' for c in cells) + "</div>"
    axis_row = row([axis(i, i == 2) for i in range(4)], extra="margin-top:30px")
    if kind in ("axis", "sit"):
        content = row([f'<h3 style="{H3}">{t}</h3>{facts(fs)}' for (w, t, fs, pr) in STEPS], "start" if kind == "axis" else "end")
        labels = row([f'<p style="{WHEN}">{w}</p>' + (f'<p style="{PRICE};margin-top:6px">{pr}</p>' if pr else "") for (w, t, fs, pr) in STEPS], extra="margin-top:18px")
        return f'<div style="margin-top:56px">{content}{axis_row}{labels}</div>'
    content = row([f'<p style="{WHEN};margin-bottom:14px">{w}</p><h3 style="{H3}">{t}</h3>{facts(fs)}' for (w, t, fs, pr) in STEPS])
    prices = row([f'<p style="{PRICE}">{pr}</p>' if pr else "" for (w, t, fs, pr) in STEPS], "end", "margin-top:30px")
    axis_row = row([axis(i, i == 2) for i in range(4)], extra="margin-top:14px")
    return f'<div style="margin-top:56px">{content}{prices}{axis_row}</div>'
OPTS = [
  ("1", "1. The line as an axis", "axis", "Titles and facts above, starting level; the line along the bottom; under it, each stop" + Q + "s when and its price, level by construction. Reads like a chart. Recommended."),
  ("2", "2. Everything sits on the line", "sit", "Each stop" + Q + "s text rests on the line, so the bottoms meet and the tops are ragged; the when and price under the line."),
  ("3", "3. Today" + Q + "s order, the line under", "foot", "As built, with the line moved to the foot and the prices sitting on it; the when stays above each title."),
]
SWAP = "(html) => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('Audit first. Then fourteen days.')); sec.querySelector('ol').outerHTML=html; }"
PHONE = """() => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('Audit first. Then fourteen days.')); const ol=sec.querySelector('ol');
 [...ol.querySelectorAll('li li')].filter(x=>x.textContent.startsWith('Yours to keep')).forEach(x=>x.remove());
 [...ol.children].forEach(li=>{ const p=[...li.children].find(c=>c.tagName==='P'&&/^Free$|^\\$3,500/.test(c.textContent)); if(p){ li.querySelector('h3').after(p); p.style.margin='0 0 10px'; p.style.padding='0'; } }); }"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); errs = []
        for vw, vh in [(1440, 900), (1024, 768)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce")
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, kind, note in OPTS:
                await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
                await pg.add_style_tag(content=HIDE)
                await pg.evaluate(SWAP, ol(kind))
                sec = pg.locator("section", has_text="Audit first. Then fourteen days.").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
                lv = await pg.evaluate("() => { const sec=[...document.querySelectorAll('section')].find(s=>s.textContent.includes('Audit first. Then fourteen days.')); return [...sec.querySelectorAll('p')].filter(p=>/^Free$|^\\$3,500/.test(p.textContent)).map(p=>Math.round(p.getBoundingClientRect().top)) }")
                await sec.screenshot(path=str(A / f"how-bottom-{key}-{vw}.png"))
                print(key, vw, "price tops", lv, "overflow", await pg.evaluate("document.documentElement.scrollWidth-innerWidth"))
            await ctx.close()
        ctx = await b.new_context(viewport={"width": 375, "height": 812}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); await pg.goto("http://localhost:3000/pilot", wait_until="networkidle"); await pg.add_style_tag(content=HIDE); await pg.evaluate(PHONE)
        sec = pg.locator("section", has_text="Audit first. Then fourteen days.").first
        await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(300); await sec.screenshot(path=str(A / "how-bottom-phone-375.png"))
        print("errors:", errs); await b.close()
    rws = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img src="assets-2026-10-23/how-bottom-{k}-1440.png" style="width:800px"><img src="assets-2026-10-23/how-bottom-{k}-1024.png" style="width:569px"></div></section>' for k, n, kind, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot How it works: the line at the bottom</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:19px;margin:30px 0 10px}} .intro{{color:#aaa;max-width:1400px;margin:0 0 24px}}
section{{margin-bottom:38px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:18px;margin-right:12px}} .lab span{{color:#bbb}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot How it works: the timeline at the bottom</h1><p class="intro">Will{Q}s idea, three ways, at 1440 (left) and 1024 (right). A line at the foot works like a chart{Q}s axis: what hangs off it is level by construction. Yours to keep either way is gone in all three.</p>{rws}
<h2>On a phone (all three): the line stays down the left, each price under its title</h2><div class="pair"><img src="assets-2026-10-23/how-bottom-phone-375.png" style="width:280px"></div></body>"""
    f = D / "design-pass-site-2026-10-23-pilot-how-bottom.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE); pg = await b.new_page(viewport={"width": 1480, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-23-pilot-how-bottom.png"), full_page=True); await b.close()
    print("sheet done")
asyncio.run(main())
