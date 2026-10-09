# Hero detail 8, the header (10 Oct 2026): three options drawn on the real
# homepage at 1440x900 by changing the page in the browser only. Today the nav is
# five 14px medium links in ink, and the header button reads "Free AI audit"
# while the hero's reads "Book a free AI audit". The header does not follow on
# scroll, and since spacing option 3 the hero fills the rest of the first screen,
# so on the homepage the header button only ever shows beside the hero's button.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-10"; A.mkdir(exist_ok=True)
URL = "http://localhost:3000/"
CORE = """const hdr = document.querySelector('header'); const nav = hdr.querySelector('nav');
const hbtn = [...hdr.querySelectorAll('a')].find(a => a.innerText.includes('Free AI audit'));
const words = () => { hbtn.innerHTML = 'Book a free AI audit <span aria-hidden>&rarr;</span>'; hbtn.style.color = '#fff' };"""
VARIANTS = {
  "today": "",
  "head-1": "words();",
  "head-2": "words(); nav.style.fontWeight = '400'; nav.querySelectorAll('a > span:first-child').forEach(s => s.style.color = '#555');",
  "head-3": "hbtn.parentElement.style.display = 'none';",
}
async def capture():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, js in VARIANTS.items():
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); await pg.goto(URL, wait_until="networkidle"); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(1500)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            if js:
                await pg.evaluate("() => {" + CORE + js + "}"); await pg.wait_for_timeout(500)
            out[name] = await pg.evaluate("() => ({ header: document.querySelector('header').getBoundingClientRect().height })")
            await pg.screenshot(path=str(A / f"header-{name}-strip.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 96})
            await pg.screenshot(path=str(A / f"header-{name}-full.png"))
            await ctx.close(); print("captured", name, out[name])
        await b.close()
    return out
Q = chr(0x2019); L = chr(0x201C); R = chr(0x201D)
OPTS = [
  ("1", "Match the hero", f"The header button reads {L}Book a free AI audit{R} like the hero{Q}s, with white text like the hero{Q}s, so the page uses one name for the one action. Nav unchanged.", "head-1"),
  ("2", "Quieter nav", f"Option 1{Q}s button, and the nav drops to regular weight in grey (#555), turning ink on hover. The headline and the board become the loudest things on the screen and the nav reads as a utility, the way Linear and Vercel set theirs. Recommended.", "head-2"),
  ("3", "No header button on the homepage", f"The header button goes from the homepage only, so the first screen has one action, the hero{Q}s, and the nav moves to the right edge. Other pages keep the button. The header gets shorter without it, so if picked the header is fixed at today{Q}s height to keep the hero ending on the fold.", "head-3"),
]
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><img class="strip" src="assets-2026-10-10/header-{v}-strip.png"><img class="full" src="assets-2026-10-10/header-{v}-full.png"></section>' for n, t, d, v in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Hero detail 8: the header</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1150px;margin:0 0 26px}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;border:1px solid #333;background:#FAFAF8}} .strip{{width:1420px;margin-bottom:12px}} .full{{width:720px}}
.today{{border-bottom:1px solid #333;padding-bottom:30px;margin-bottom:32px}}</style><body><h1>Hero detail 8: the header</h1>
<p class="intro">The header at full size on top, the whole 1440 by 900 first screen below it. Today the nav is five 14px medium links in ink and the header button reads {L}Free AI audit{R} while the hero{Q}s reads {L}Book a free AI audit{R}. The header does not follow on scroll and the hero now fills the rest of the screen, so on the homepage the header button only ever shows beside the hero{Q}s button.</p>
<section class="today"><div class="lab"><b>Today</b><span>For comparison, not an option.</span></div><img class="strip" src="assets-2026-10-10/header-today-strip.png"><img class="full" src="assets-2026-10-10/header-today-full.png"></section>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-10-header.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-10-header.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
