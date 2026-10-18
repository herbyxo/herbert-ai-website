# Products details, 2 of 6, round 2: the facts redrawn for energy (Will, 19 Oct
# 2026: "they dont read that catchy... spruce up the energy/catchiness of the
# words"). Same band, same line, only the ruled list changes. Every claim stays
# inside the definition (code/marketing-engine/docs/REACH-DEFINITION.md): no
# landing pages (not built), no results promised, the approval rule kept.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-19"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019); L = chr(0x201C); R = chr(0x201D)
B = '<b style="font-weight:600;color:#fff">{}</b> {}'
M = '<span style="display:inline-block;width:132px;flex-shrink:0;font-family:var(--font-geist-mono),ui-monospace,monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);padding-top:3px">{}</span><span>{}</span>'
OPTS = [
  ("today", "Today", ["Google ads written, tested and paused against results", "A landing page for every ad group", "A daily audit that flags what is wasting money"], None, "Written before the definition: three facts about ads only."),
  ("r2-1", "1. Five verbs", [B.format(*x) for x in [("Learns", "your business from its name"), ("Runs", "your ads and posts, and keeps testing new ones"), ("Answers", "every lead inside a minute"), ("Shows", "every dollar against the jobs it booked"), ("Asks", "you before any new ad or extra spend")]], "verbs", "What the department does, verb first, the verbs in bold so the list scans in a second: learns, runs, answers, shows, asks. Short rows, the approval rule is the last verb. Recommended."),
  ("r2-2", "2. The department", [M.format(*x) for x in [("Researcher", "Knows your business from its name"), ("Strategist", "Puts the budget where jobs are cheapest"), ("Creative", "Makes ads that don" + Q + "t look like everyone else" + Q + "s"), ("Lead employee", "Answers every enquiry inside a minute"), ("Analyst", "Cuts what wastes money, backs what books jobs"), ("You", "Say yes to every new ad and any extra spend")]], "roles", "The line promises a department, so the list is the roster, ending on the owner as the boss. Pays the line off word for word; six rows, the tallest option."),
  ("r2-3", "3. Short lines", ["Type your business name. Meet your marketing team.", "Ads and posts made, run and tested for you.", "Every lead answered inside a minute.", "Every dollar tracked against the jobs it books.", "Nothing new goes live without your yes."], None, "Five complete short sentences with full stops, the most ad-like rhythm. Strongest first line; reads more like a slogan stack than facts."),
]
JS = """([items, kind]) => { const band = [...document.querySelectorAll('section')].find(x => x.textContent.includes('by Herbert AI')); const ul = band.querySelector('ul'); const cls = ul.querySelector('li').className; ul.innerHTML = ''; items.forEach(t => { const li = document.createElement('li'); li.className = cls; li.innerHTML = t; if (kind === 'roles') { li.style.display = 'flex'; li.style.gap = '8px'; } ul.appendChild(li); }); }"""
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, items, kind, note in OPTS:
                await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
                band = pg.locator("section", has_text="by Herbert AI").first
                await band.scroll_into_view_if_needed(); await pg.wait_for_timeout(1200)
                await pg.evaluate(JS, [items, kind]); await pg.wait_for_timeout(300)
                if tag == "laptop":
                    await band.screenshot(path=str(A / f"products-facts-{key}-{tag}.png"))
                else:
                    box = await band.bounding_box()
                    await pg.screenshot(path=str(A / f"products-facts-{key}-{tag}.png"), clip={"x": 0, "y": box["y"] + await pg.evaluate("window.scrollY"), "width": vw, "height": min(box["height"], 720)}, full_page=True)
                print("captured", key, tag)
            await ctx.close()
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img class="wide" src="assets-2026-10-19/products-facts-{k}-laptop.png"><img class="phone" src="assets-2026-10-19/products-facts-{k}-phone.png"></div></section>' for k, n, items, kind, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Products: the facts, round 2</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:15px;margin:4px 0;color:#ddd}} .lab span{{color:#bbb}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1100px;border:1px solid #333}} img.phone{{display:block;width:280px;border:1px solid #333}}</style><body>
<h1>Products: the facts, round 2</h1><p class="intro">Detail 2 of 6, redrawn for energy after {L}they dont read that catchy{R}. Your line stays: {L}Your whole marketing department at the click of a button.{R} Only the ruled list changes. Every claim stays inside the Herbert Reach definition: no landing pages (not built yet), no results promised, and the approval rule is kept in every option. The dashboard is still the ads-only one; that is detail 3.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-19-products-facts-r2.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-19-products-facts-r2.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
