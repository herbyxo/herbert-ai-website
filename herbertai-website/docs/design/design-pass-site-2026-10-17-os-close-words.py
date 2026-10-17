# Operating Systems: the close's wording three ways (17 Oct 2026). Will: "for
# the link i think i want it to say 'Your Herbert OS' or something like that,
# idk lets ideate for that". Drawn on the real homepage at 1440x900 with the
# section as built (no audit tag), Property active; only the link changes.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-17"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
OPTS = [
  ("today", "Today", "Your AI operating system, from $25,000, scoped after the audit", "/pricing", "The rung, its price and its condition. Long, and it names the category rather than the product the section just named five times."),
  ("1", "1. The name and the price", "Your Herbert OS, from $25,000", "/pricing", "The product name and what it costs, nothing else; the same shape as the AI Employees close ({1}Your first one is $3,500, live in 14 days{2}). Short enough to read in one glance. Recommended."),
  ("2", "2. The action", "Build your Herbert OS", "/pilot#book", "A verb instead of a price, to the audit booking, since that is where a build starts. Warmer, but the cost question it leaves open is the one an owner has."),
  ("3", "3. The question", "What would your Herbert OS cost?", "/pricing", "Asks the owner{0}s own question and answers it on the pricing page. Invites the click; the page has to land the $25,000 well."),
]
JS = """([text, href]) => { const a = [...document.querySelectorAll('a')].find(x => x.textContent.includes('Your AI operating system, from $25,000')); a.setAttribute('href', href); a.innerHTML = text + ' <span aria-hidden>&rarr;</span>'; }"""
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        for key, name, text, href, note in OPTS:
            await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
            await pg.evaluate("() => document.querySelector('[role=tablist][aria-label=\"Operating systems\"]').closest('section').scrollIntoView()"); await pg.wait_for_timeout(1200)
            await pg.evaluate(JS, [text, href]); await pg.wait_for_timeout(300)
            sec = await pg.query_selector('section:has([role=tablist][aria-label="Operating systems"])')
            await sec.screenshot(path=str(A / f"os-close-words-{key}.png")); print("captured", key)
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span class="h2">{chr(0x201C)}{t}{chr(0x201D)} <em>to {h}</em></span><span>{d.format(Q, chr(0x201C), chr(0x201D))}</span></div><img src="assets-2026-10-17/os-close-words-{k}.png"></section>' for k, n, t, h, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems: the close{Q}s wording three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:17px;margin:4px 0}} .lab em{{color:#888;font-style:normal;font-size:13px;margin-left:6px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}}</style><body>
<h1>Operating Systems: the close{Q}s wording three ways</h1><p class="intro">The one link under the list, on the section as built (the audit tag under the screen is gone). Only the link{Q}s words and where it goes change.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-17-os-close-words.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-17-os-close-words.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
