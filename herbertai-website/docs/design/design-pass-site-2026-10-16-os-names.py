# Operating Systems: the system's name three ways (16 Oct 2026). Will picked
# "Property OS" then: "idk about the name 'industry' OS though, but im stuck
# for a better idea". Three names that are names, not descriptions, drawn on
# the real section with everything else as built; today (Property OS) first.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-16"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
OPTS = [
  ("today", "Today", "Property OS", "Named like the rung. Short and owned, but OS is software jargon, and it makes the thing sound like a product on a shelf when the price line says it is built and scoped."),
  ("1", "1. The family name", "Herbert for Property", "The company{0}s name with the industry: Herbert for Property, Herbert for Trades, Herbert for Health. A name rather than a description, no jargon, and it scales to the plan where each system becomes a product beside Herbert Reach. Recommended."),
  ("2", "2. Whose office", "The agency{0}s office", "Matches the heading: the whole office, on one screen, and this is whose. The agency{0}s office, the trade office, the venue{0}s office, the clinic{0}s office, the practice{0}s office. Concrete, and different for each; the weakest is the trade one."),
  ("3", "3. The rung, said once", "Your AI operating system", "The same title under every screen, the industry label above it doing the telling. Honest to the ladder and never jargon-free, since OS is spelt out; five identical titles as you click through."),
]
NAMES = {
  "today": "Property OS", "1": "Herbert for Property", "2": "The agency\\u2019s office", "3": "Your AI operating system",
}
JS = """([opt, name]) => { const title = [...document.querySelectorAll('p')].find(p => p.textContent.trim() === 'Property OS' && p.className.includes('text-[22px]')); title.textContent = name; }"""
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        for key, name, sub, note in OPTS:
            await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
            await pg.evaluate("() => document.querySelector('[role=tablist][aria-label=\"Operating systems\"]').closest('section').scrollIntoView()"); await pg.wait_for_timeout(1200)
            await pg.evaluate(JS, [key, NAMES[key].encode().decode('unicode_escape')]); await pg.wait_for_timeout(300)
            sec = await pg.query_selector('section:has([role=tablist][aria-label="Operating systems"])')
            await sec.screenshot(path=str(A / f"os-names-{key}.png")); print("captured", key)
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span class="h2">{chr(0x201C)}{s.format(Q)}{chr(0x201D)}</span><span>{d.format(Q)}</span></div><img src="assets-2026-10-16/os-names-{k}.png"></section>' for k, n, s, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems: the system{Q}s name three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:17px;margin:4px 0}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}}</style><body>
<h1>Operating Systems: the system{Q}s name three ways</h1><p class="intro">The title under the screen, after "Property OS" was picked and doubted. Three names that are names rather than descriptions, each shown for Property; the same pattern applies to the other four. Everything else is as built.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-16-os-names.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-16-os-names.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
