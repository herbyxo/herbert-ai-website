# Products details, 2 of 6: the facts three ways, from the definition
# (code/marketing-engine/docs/REACH-DEFINITION.md). Drawn on the homepage band
# with Will's line in place, at 1440 and the top of the phone layout; only the
# ruled list changes. The approval rule lives here now the line drops it.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-19"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019); L = chr(0x201C); R = chr(0x201D)
OPTS = [
  ("today", "Today", ["Google ads written, tested and paused against results", "A landing page for every ad group", "A daily audit that flags what is wasting money"], "Written before the definition: three facts about ads only."),
  ("1", "1. What it does", ["Learns your business from its name", "Runs your ads and posts, and answers every lead within a minute", "Shows what you spent against the jobs it booked", "You approve every new ad and any increase in spend"], "Four plain facts in the order the owner meets them: the start, the work, the proof, and the approval rule that keeps the owner in charge. Recommended."),
  ("2", "2. The team", ["Researcher · learns your business from its name", "Strategist · picks the channels and splits the budget", "Creative · makes the ads and posts", "Lead employee · answers every enquiry within a minute", "Analyst · makes each booked job cheaper"], "The AI employees as a team sheet, the way the AI Employees section above presents them. Shows it is a department, not a tool; five rows, and the approval rule is left to the early-access note."),
  ("3", "3. The first ten minutes", ["1. Type in your business name", "2. Check what it found: services, area, offer, voice", "3. Set the budget and approve the first ads", "4. From then on it asks only about new ads and spend"], "The account walkthrough from the definition, as numbered steps. Makes the click concrete; says least about the work after the start."),
]
JS = """(items) => { const band = [...document.querySelectorAll('section')].find(x => x.textContent.includes('by Herbert AI')); const ul = band.querySelector('ul'); const cls = ul.querySelector('li').className; ul.innerHTML = ''; items.forEach(t => { const li = document.createElement('li'); li.className = cls; li.textContent = t; ul.appendChild(li); }); }"""
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, items, note in OPTS:
                await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
                band = pg.locator("section", has_text="by Herbert AI").first
                await band.scroll_into_view_if_needed(); await pg.wait_for_timeout(1200)
                await pg.evaluate(JS, items); await pg.wait_for_timeout(300)
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
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span class="h2">{" / ".join(items)}</span><span>{d.format(Q)}</span></div><div class="pair"><img class="wide" src="assets-2026-10-19/products-facts-{k}-laptop.png"><img class="phone" src="assets-2026-10-19/products-facts-{k}-phone.png"></div></section>' for k, n, items, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Products: the facts three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:15px;margin:4px 0;color:#ddd}} .lab span{{color:#bbb}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1100px;border:1px solid #333}} img.phone{{display:block;width:280px;border:1px solid #333}}</style><body>
<h1>Products: the facts three ways</h1><p class="intro">Detail 2 of 6. Your line is in place: {L}Your whole marketing department at the click of a button.{R} It drops the approval rule, so the facts carry it now (or the early-access note, in option 2). Only the ruled list changes; the dashboard is still the ads-only one and is detail 3.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-19-products-facts.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-19-products-facts.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
