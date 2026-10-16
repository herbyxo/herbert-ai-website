# Operating Systems details, 4 of 5: the close three ways (16 Oct 2026). Drawn
# on the real homepage at 1440x900 with the heading, the industry-first list
# and the one-sentence line in place, Property active; the links edited in
# the page. Today first.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-16"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
OPTS = [
  ("today", "Today", "One link per screen", "Each industry{0}s link sits beside its name under the screen: {1}Built. Open the dashboard{2} for Property, {1}See the Trades page{2} for the rest. The section as a whole closes on nothing."),
  ("1", "1. The rung", "A line under the list: from $25,000, scoped after the audit", "The section closes on the ladder{0}s third rung and its price, to the pricing page; the per-screen links stay. Says what this costs where the AI Employees section says what that costs. Recommended."),
  ("2", "2. The audit, from the line", "The tag under the screen becomes the link", "{1}Yours come out of the audit{2} turns into the link, to the audit booking. The close is the next step the line already names; the per-screen links stay and the list carries nothing."),
  ("3", "3. One close only", "The rung line under the list, and no per-screen link", "The rung line as in 1, with the per-screen links removed so the section has one way out. Cleaner; loses the open link to the built dashboard from the homepage."),
]
JS = """(opt) => {
  const list = document.querySelector('[role=tablist][aria-label="Operating systems"]');
  const mk = (tag, cls, html) => { const el = document.createElement(tag); el.className = cls; el.innerHTML = html; return el; };
  const rung = () => mk('p', 'mt-6 text-[15px]', '<a class="font-medium underline underline-offset-4 decoration-[#111]/30" href="/pricing">Your AI operating system, from $25,000, scoped after the audit <span aria-hidden>&rarr;</span></a>');
  const perScreen = [...document.querySelectorAll('a')].find(a => a.textContent.includes('Open the dashboard'));
  if (opt === '1') list.after(rung());
  if (opt === '2') { const tag = [...document.querySelectorAll('span')].find(s => s.textContent.trim() === 'Yours come out of the audit.'); tag.innerHTML = '<a class="font-medium text-[#111] underline underline-offset-4 decoration-[#111]/30" href="/pilot#book">Yours come out of the audit <span aria-hidden>&rarr;</span></a>'; }
  if (opt === '3') { list.after(rung()); if (perScreen) perScreen.remove(); }
}"""
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        for key, name, sub, note in OPTS:
            await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
            await pg.evaluate("() => document.querySelector('[role=tablist][aria-label=\"Operating systems\"]').closest('section').scrollIntoView()"); await pg.wait_for_timeout(1200)
            await pg.evaluate(JS, key); await pg.wait_for_timeout(300)
            sec = await pg.query_selector('section:has([role=tablist][aria-label="Operating systems"])')
            await sec.screenshot(path=str(A / f"os-close-{key}.png")); print("captured", key)
        print("errors:", errs)
        await b.close()
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span class="h2">{s.format(Q, chr(0x201C), chr(0x201D))}</span><span>{d.format(Q, chr(0x201C), chr(0x201D))}</span></div><img src="assets-2026-10-16/os-close-{k}.png"></section>' for k, n, s, d in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>Operating Systems: the close three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:44px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab .h2{{display:block;font-size:17px;margin:4px 0}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333;margin-bottom:12px}}</style><body>
<h1>Operating Systems: the close three ways</h1><p class="intro">Detail 4 of 5. The section with the heading, the industry-first list and the one-sentence line in place, Property active; only the links change. Every other section closes on a link; this one has a link per screen and none for the section.</p>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-16-os-close.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-16-os-close.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
