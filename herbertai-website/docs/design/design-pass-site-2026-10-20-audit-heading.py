# Book the Audit details, 1 of 4: the heading, by the Lines register (a scored
# line test and three options on the page). A question works as a single close
# (writing-style references/lines.md); every line is true of the audit as
# RUNGS[0] and /pilot describe it, and promises no result.
import asyncio, json, html as H
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-19"; A.mkdir(exist_ok=True)
SRC = json.loads((D / "design-pass-site-2026-10-20-audit-heading.json").read_text())
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
JS = """([items, kind]) => { const s = [...document.querySelectorAll('section')].filter(x => x.textContent.includes('Book the Audit')).pop(); s.querySelector('h2').innerHTML = items[0]; }"""

async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for o in SRC["lists"]:
                await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
                band = pg.locator("section", has_text="Book the Audit").last
                await band.scroll_into_view_if_needed(); await pg.wait_for_timeout(1200)
                await pg.evaluate(JS, [o["rows"], o.get("kind")]); await pg.wait_for_timeout(300)
                out = A / f"audit-heading-{o['key']}-{tag}.png"
                if tag == "laptop":
                    await band.screenshot(path=str(out))
                else:
                    box = await band.bounding_box()
                    await pg.screenshot(path=str(out), clip={"x": 0, "y": box["y"] + await pg.evaluate("window.scrollY"), "width": vw, "height": min(box["height"], 560)}, full_page=True)
                print("captured", o["key"], tag)
            await ctx.close()
        print("errors:", errs)
        await b.close()

CSS = """body{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}
h1{font-size:26px;margin:0 0 8px;font-weight:600} h2{font-size:20px;margin:34px 0 12px;font-weight:600} .intro{color:#aaa;max-width:1300px;margin:0 0 22px}
section{margin-bottom:44px} .lab{margin-bottom:10px;max-width:1400px} .lab b{font-size:19px;margin-right:12px} .lab span{color:#bbb}
.pair{display:flex;gap:20px;align-items:flex-start} img.wide{display:block;width:1100px;border:1px solid #333} img.phone{display:block;width:280px;border:1px solid #333}
table{border-collapse:collapse;width:100%;max-width:1420px} td,th{border-top:1px solid #2c2c2c;padding:9px 10px;vertical-align:top;text-align:left} th{color:#888;font-weight:500;font-size:13px}
td.n{color:#777;width:34px} td.line{font-size:21px;font-weight:600;color:#fff;letter-spacing:-.01em;width:470px} td.s{font-variant-numeric:tabular-nums;width:46px;text-align:center} td.t{color:#aaa;font-size:13.5px} td.tot{font-weight:700;color:#fff}
.key{color:#999;font-size:13.5px;max-width:1300px;margin:0 0 10px}"""

def sheet_lists():
    rows = "".join(f'<section><div class="lab"><b>{H.escape(o["name"])}</b><span>{H.escape(o["note"])}</span></div><div class="pair"><img class="wide" src="assets-2026-10-19/audit-heading-{o["key"]}-laptop.png"><img class="phone" src="assets-2026-10-19/audit-heading-{o["key"]}-phone.png"></div></section>' for o in SRC["lists"])
    return f"<!doctype html><meta charset=utf-8><title>Book the Audit: the heading</title><style>{CSS}</style><body><h1>Book the Audit: the heading</h1><p class='intro'>{H.escape(SRC['intro'])}</p>{rows}</body>"

def sheet_test():
    head = "".join(f"<th>{H.escape(c)}</th>" for c in SRC["test"]["cols"])
    body = ""
    for i, r in enumerate(SRC["test"]["rows"], 1):
        sc = "".join(f'<td class="s">{v}</td>' for v in r["scores"])
        body += f'<tr><td class="n">{i}</td><td class="line">{H.escape(r["line"])}</td>{sc}<td class="s tot">{sum(r["scores"]):.1f}</td><td class="t">{H.escape(r["why"])}</td></tr>'
    return f"<!doctype html><meta charset=utf-8><title>Book the Audit: the heading line test</title><style>{CSS}</style><body><h1>Book the Audit: the heading line test</h1><p class='intro'>{H.escape(SRC['test']['intro'])}</p><p class='key'>{H.escape(SRC['test']['key'])}</p><table><tr><th>#</th><th>Line</th>{head}<th>Total</th><th>Why</th></tr>{body}</table></body>"

async def render():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        for name, fn in [("design-pass-site-2026-10-20-audit-heading", sheet_lists), ("design-pass-site-2026-10-20-audit-heading-test", sheet_test)]:
            f = D / f"{name}.html"; f.write_text(fn())
            await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
            await pg.screenshot(path=str(D / f"{name}.png"), full_page=True)
        await b.close()

asyncio.run(capture()); asyncio.run(render()); print("sheets done")
