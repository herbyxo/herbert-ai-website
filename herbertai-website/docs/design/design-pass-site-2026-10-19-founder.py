# Who Builds It, three ways on the real page (19 Oct 2026). Facts first: the
# 16 Sep decisions put name, photo and first-person voice on the home founder
# note; the charter (22 Sep, later) says "A founder photo on About only"; no
# photo file exists (page.js FOUNDER_PHOTO is null, a "W" tile stands in). So
# the options cover both: no photo, a photo slot, and a signed note. Drawn by
# replacing the founder section in the page; copy is Will's first-person line
# as it stands, the words are their own detail later. Paper ground, Geist, no
# motion (nothing finishes here).
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-19"
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
LINE = "I" + Q + "m Will Herbert. I build every system myself, in Adelaide, and you deal with me from the audit to the day it goes live."
WRAP = "max-width:1280px;margin:0 auto;padding:{pad}"
LABEL = '<p style="font-size:15px;font-weight:500;color:#555;margin:0 0 16px">Who Builds It</p>'
LINK = '<a href="#" style="display:inline-block;margin-top:26px;font-size:15px;font-weight:500;color:#111;text-decoration:underline;text-underline-offset:4px;text-decoration-color:rgba(17,17,17,.3)">More about Will &rarr;</a>'

def section(inner, mobile):
    pad = "72px 24px" if mobile else "96px 48px"
    return f'<div style="background:#FAFAF8;color:#111;border-top:1px solid rgba(17,17,17,.1)"><div style="{WRAP.format(pad=pad)}">{inner}</div></div>'

def opt1(m):
    size = "26px" if m else "clamp(30px,3vw,42px)"
    return section(f'{LABEL}<p style="margin:0;font-size:{size};line-height:1.25;font-weight:600;letter-spacing:-0.025em;max-width:28ch">{LINE}</p>{LINK}', m)

def photo(m):
    w = "100%" if m else "300px"
    return f'<div style="width:{w};aspect-ratio:4/5;border-radius:14px;background:repeating-linear-gradient(45deg,#ECEAE4,#ECEAE4 14px,#E4E1DA 14px,#E4E1DA 28px);display:grid;place-items:center;color:#777;font-size:14px;flex-shrink:0">Your photo here</div>'

def opt2(m):
    size = "24px" if m else "clamp(28px,2.6vw,38px)"
    txt = f'<div>{LABEL}<p style="margin:0;font-size:{size};line-height:1.28;font-weight:600;letter-spacing:-0.025em;max-width:26ch">{LINE}</p>{LINK}</div>'
    if m:
        return section(f'{txt}<div style="margin-top:36px">{photo(m)}</div>', m)
    return section(f'<div style="display:grid;grid-template-columns:300px 1fr;gap:64px;align-items:center">{photo(m)}{txt}</div>', m)

def opt3(m):
    size = "20px" if m else "22px"
    sign = '<div style="margin-top:28px;padding-top:18px;border-top:1px solid rgba(17,17,17,.12);display:flex;flex-wrap:wrap;gap:6px 28px;align-items:baseline"><span style="font-size:18px;font-weight:600;letter-spacing:-0.01em">Will Herbert</span><span style="font-family:var(--font-geist-mono),ui-monospace,monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#777">Founder · Adelaide</span><span style="font-family:var(--font-geist-mono),ui-monospace,monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#777">hello@herbert-aisolutions.com</span></div>'
    body = "I build every system myself, in Adelaide, and you deal with me from the audit to the day it goes live. No account managers, no hand-offs to a team you never meet."
    head = "36px" if m else "clamp(36px,3.6vw,52px)"
    inner = f'{LABEL}<h2 style="margin:0;font-size:{head};line-height:1;font-weight:700;letter-spacing:-0.04em;max-width:18ch">One person builds it.</h2><div style="max-width:60ch"><p style="margin:22px 0 0;font-size:{size};line-height:1.5;color:#333">{body}</p>{sign}{LINK}</div>'
    return section(inner, m)

OPTS = [
  ("today", "Today", None, "The May register: cream ground, a " + chr(0x201C) + "W" + chr(0x201D) + " tile where the photo would go, the old display font. The only section left in it."),
  ("1", "1. The note, set plain", opt1, "Your first-person line set large on the paper ground, the label and a link to About, no photo, by the charter (" + chr(0x201C) + "A founder photo on About only" + chr(0x201D) + "). Calm, and needs nothing from you. Recommended."),
  ("2", "2. Name and photo", opt2, "The 16 Sep decision: a portrait beside the line. Only works with a real photo of you, which does not exist yet; reverses the charter for the home page."),
  ("3", "3. A signed note", opt3, "A short heading, the line as a paragraph with one more sentence, and a sign-off: your name, Founder, Adelaide, the email. Personal without a photo; the extra sentence is copy to clear."),
]
JS = """(html) => { const s = [...document.querySelectorAll('section')].find(x => x.textContent.includes('More about Will')); s.className = ''; s.innerHTML = html; s.setAttribute('data-founder', '1'); }"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, fn, note in OPTS:
                await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
                sec = pg.locator("section", has_text="More about Will").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(1200)
                if fn:
                    await pg.evaluate(JS, fn(tag == "phone"))
                    await pg.wait_for_timeout(300)
                    sec = pg.locator("section[data-founder]").first
                await sec.screenshot(path=str(A / f"founder-{key}-{tag}.png"))
                ov = await pg.evaluate("document.documentElement.scrollWidth - window.innerWidth")
                print("captured", key, tag, "overflow", ov)
            await ctx.close()
        print("errors:", errs)
        await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img class="wide" src="assets-2026-10-19/founder-{k}-laptop.png"><img class="phone" src="assets-2026-10-19/founder-{k}-phone.png"></div></section>' for k, n, f, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>Who Builds It: three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 24px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1100px;border:1px solid #333}} img.phone{{display:block;width:280px;border:1px solid #333}}</style><body>
<h1>Who Builds It: three ways</h1><p class="intro">Section 6, step 2. Facts first: the 16 Sep decisions put your name, photo and voice on the home founder note; the charter, written after it on 22 Sep, says a founder photo on About only; and no photo of you exists on file yet. So one option has no photo, one has a photo slot, one sits between. Your first-person line is kept as it stands; the words are a detail after the pick.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-19-founder.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-19-founder.png"), full_page=True); await b.close()
    print("sheet done")

asyncio.run(main())
