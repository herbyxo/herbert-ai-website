# How it works, detail 4: the closing button and link (12 Oct 2026). Three
# options drawn on the real homepage at 1440x900 by changing the page in the
# browser only. Captures the section from the steps down, so the close is seen
# against what it follows.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-12"; A.mkdir(exist_ok=True)
URL = "http://localhost:3000/"
CORE = """const s = document.querySelectorAll('main section')[1];
const btn = s.querySelector('a[href="/pilot#book"]'); const link = s.querySelector('a[href="/pricing"]');"""
LINKY = "Object.assign(btn.style, { background: 'none', color: '#111', padding: '0', borderRadius: '0', fontSize: '15px', fontWeight: '600', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: 'rgba(17,17,17,.3)' });"
VARIANTS = {
  "today": "",
  "c-1": "link.style.display = 'none';",
  "c-2": "btn.style.display = 'none';",
  "c-3": LINKY,
}
async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, js in VARIANTS.items():
            ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); await pg.goto(URL, wait_until="networkidle"); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(1200)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            if js:
                await pg.evaluate("() => {" + CORE + js + "}"); await pg.wait_for_timeout(300)
            r = await pg.evaluate("() => { const s = document.querySelectorAll('main section')[1]; const g = s.querySelector('h3').closest('.grid').getBoundingClientRect(); const sb = s.getBoundingClientRect(); return { x: g.x + scrollX, y: g.y + scrollY, w: g.width, bottom: sb.bottom + scrollY } }")
            await pg.screenshot(path=str(A / f"hiw-close-{name}.png"), full_page=True, clip={"x": r["x"] - 32, "y": r["y"] - 28, "width": r["w"] + 64, "height": r["bottom"] - r["y"] + 28})
            print("captured", name); await ctx.close()
        await b.close()
Q = chr(0x2019); L = chr(0x201C); R = chr(0x201D)
OPTS = [
  ("1", "Button only", f"The audit button alone, so the section ends on its one action. The prices are already on the steps; anyone who wants more finds Pricing in the header.", "c-1"),
  ("2", "Link only", f"{L}See how it{Q}s priced{R} alone. The hero{Q}s audit button is one screen up and the page ends on one, so this section only points to the detail.", "c-2"),
  ("3", "Both as links", f"The audit becomes a bold underlined link beside the pricing link, so the close is quieter and the steps carry the section. The page{Q}s black buttons stay for the hero and the end.", "c-3"),
]
def sheet():
    rows = "".join(f'<section><div class="lab"><b>{n}. {t}</b><span>{d}</span></div><img src="assets-2026-10-12/hiw-close-{v}.png"></section>' for n, t, d, v in OPTS)
    return f"""<!doctype html><meta charset=utf-8><title>How it works, detail 4: the close</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1100px;margin:0 0 26px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px;max-width:1100px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img{{display:block;width:1100px;border:1px solid #333}} .today{{border-bottom:1px solid #333;padding-bottom:32px;margin-bottom:34px}}</style><body>
<h1>How it works, detail 4: the closing button and link</h1><p class="intro">The section from the steps down, drawn on the real homepage at 1440 wide. Only the close changes.</p>
<section class="today"><div class="lab"><b>Today</b><span>The black audit button, matching the hero{Q}s, with {L}See how it{Q}s priced{R} beside it. Both next steps a reader has after the prices: book, or read more. Recommended, for comparison.</span></div><img src="assets-2026-10-12/hiw-close-today.png"></section>{rows}</body>"""
async def render():
    html = D / "design-pass-site-2026-10-12-hiw-close.html"; html.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{html}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-12-hiw-close.png"), full_page=True); await b.close()
asyncio.run(capture()); asyncio.run(render()); print("sheet done")
