# Book the Audit, the last homepage section, three ways on the real page (19
# Oct 2026). Facts: the one action on the site is the free AI audit
# (AUDIT_HREF, /pilot#book, a form of name, business, email and phone); the
# audit facts are RUNGS[0] (45 minutes, a written page in two business days,
# the three jobs costing most in the owner's figures, yours to keep); there is
# a sample audit page (/pilot/sample-audit). Today is the May register (the
# display font, the neon green button). The heading is kept in every option;
# its words are a detail after the pick. Drawn by replacing the section.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-19"
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019)
MONO = "font-family:var(--font-geist-mono),ui-monospace,monospace"
FACTS = ["45 minutes auditing your business.", "A written page in two business days.", "The three jobs costing you most, in your figures."]
HEAD = "Got a job everyone hates doing?"

def wrap(inner, dark, m):
    bg = "#111" if dark else "#FAFAF8"; fg = "#fff" if dark else "#111"
    pad = "72px 24px 80px" if m else "112px 48px 120px"
    border = "" if dark else "border-top:1px solid rgba(17,17,17,.1);"
    return f'<div style="background:{bg};color:{fg};{border}"><div style="max-width:1280px;margin:0 auto;padding:{pad}">{inner}</div></div>'

def label(dark):
    return f'<p style="font-size:15px;font-weight:500;color:{"rgba(255,255,255,.6)" if dark else "#555"};margin:0 0 16px">Book the Audit</p>'

def h2(m, dark=True):
    return f'<h2 style="margin:0;font-weight:700;letter-spacing:-0.04em;line-height:0.98;font-size:{"40px" if m else "clamp(44px,4.6vw,68px)"};max-width:14ch">{HEAD}</h2>'

def facts(dark=True):
    c = "#fff" if dark else "#111"; line = "rgba(255,255,255,.15)" if dark else "rgba(17,17,17,.12)"; num = "rgba(255,255,255,.4)" if dark else "#999"
    rows = "".join(f'<li style="display:flex;align-items:baseline;gap:16px;padding:12px 0;border-top:1px solid {line}"><span style="{MONO};font-size:11px;letter-spacing:.12em;color:{num};width:20px;flex-shrink:0">{i:02d}</span><span style="font-size:19px;font-weight:600;letter-spacing:-0.015em;color:{c}">{f}</span></li>' for i, f in enumerate(FACTS, 1))
    return f'<ol style="list-style:none;margin:0;padding:0;border-bottom:1px solid {line}">{rows}</ol>'

def button(dark, text="Book a free AI audit"):
    bg, fg = ("#fff", "#111") if dark else ("#111", "#fff")
    return f'<a href="#" style="display:inline-flex;align-items:center;gap:8px;background:{bg};color:{fg};border-radius:10px;padding:14px 24px;font-size:16px;font-weight:500;text-decoration:none">{text} &rarr;</a>'

def contact(dark):
    return f'<p style="margin:22px 0 0;{MONO};font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:{"rgba(255,255,255,.4)" if dark else "#888"}">Will Herbert · Adelaide · hello@herbert-aisolutions.com</p>'

def opt1(m):
    sample = '<a href="#" style="margin-left:22px;font-size:15px;font-weight:500;color:#fff;text-decoration:underline;text-underline-offset:4px;text-decoration-color:rgba(255,255,255,.4)">See a sample audit</a>'
    left = f'<div>{label(True)}{h2(m)}</div>'
    right = f'<div style="{"margin-top:32px" if m else ""}">{facts()}<div style="margin-top:28px;display:flex;align-items:center;flex-wrap:wrap;gap:14px 0">{button(True)}{sample}</div>{contact(True)}</div>'
    grid = "" if m else "display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:end"
    return wrap(f'<div style="{grid}">{left}{right}</div>', True, m)

def opt2(m):
    sub = f'<p style="margin:22px 0 30px;font-size:19px;line-height:1.45;color:#333;max-width:40ch">45 minutes auditing your business, and a written page back in two business days.</p>'
    return wrap(f'{label(False)}{h2(m, False)}{sub}{button(False)}{contact(False)}', False, m)

def field(lbl, ph):
    return f'<label style="display:block"><span style="display:block;font-size:12.5px;color:#666;margin-bottom:6px">{lbl}</span><span style="display:block;border:1px solid rgba(17,17,17,.15);border-radius:10px;padding:12px 14px;font-size:15px;color:#999;background:#fff">{ph}</span></label>'

def opt3(m):
    form = f'''<div style="background:#FAFAF8;color:#111;border-radius:16px;padding:{"22px" if m else "28px"}">
<div style="display:grid;grid-template-columns:{"1fr" if m else "1fr 1fr"};gap:14px">{field("Your name", "Your name")}{field("Business name", "Your business")}{field("Email", "you@business.com")}{field("Phone", "0400 000 000")}</div>
<div style="margin-top:20px">{button(False, "Book my free audit")}</div>
<p style="margin:14px 0 0;font-size:13px;color:#777">Free. You get a call to set a time.</p></div>'''
    left = f'<div>{label(True)}{h2(m)}<div style="margin-top:32px">{facts()}</div></div>'
    grid = "" if m else "display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:end"
    right = f'<div style="{"margin-top:36px" if m else ""}">{form}{contact(True)}</div>'
    return wrap(f'<div style="{grid}">{left}{right}</div>', True, m)

OPTS = [
  ("today", "Today", None, "The May register: the display font, the neon green button, one line under the heading."),
  ("1", "1. The facts as steps", opt1, "The ink band, the heading on the left, the three audit facts as numbered rows on the right (the same form as the Products story), the button and a link to the sample audit. Ends the page on what the owner gets."),
  ("2", "2. One line and the button", opt2, "The paper ground, the heading, one sentence, the button. Matches the hero" + Q + "s calm; the page ends quietly."),
  ("3", "3. The form, right here", opt3, "The ink band, the heading and the three facts on the left, the booking form on the right: name, business, email, phone. Someone who read the whole page books without loading another. Recommended. Building it means moving the /pilot form into one shared component so the two never drift."),
]
JS = """(html) => { const s = [...document.querySelectorAll('section')].find(x => x.textContent.includes('hates doing')); s.className = ''; s.innerHTML = html; s.setAttribute('data-audit', '1'); }"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for vw, vh, tag in [(1440, 900, "laptop"), (375, 812, "phone")]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=2)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            for key, name, fn, note in OPTS:
                await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
                sec = pg.locator("section", has_text="hates doing").first
                await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(1000)
                if fn:
                    await pg.evaluate(JS, fn(tag == "phone")); await pg.wait_for_timeout(300)
                    sec = pg.locator("section[data-audit]").first
                await sec.screenshot(path=str(A / f"audit-{key}-{tag}.png"))
                ov = await pg.evaluate("document.documentElement.scrollWidth - window.innerWidth")
                print("captured", key, tag, "overflow", ov)
            await ctx.close()
        print("errors:", errs); await b.close()
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{d}</span></div><div class="pair"><img class="wide" src="assets-2026-10-19/audit-{k}-laptop.png"><img class="phone" src="assets-2026-10-19/audit-{k}-phone.png"></div></section>' for k, n, f, d in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>Book the Audit: three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1400px;margin:0 0 24px}}
section{{margin-bottom:40px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
.pair{{display:flex;gap:20px;align-items:flex-start}} img.wide{{display:block;width:1100px;border:1px solid #333}} img.phone{{display:block;width:280px;border:1px solid #333}}</style><body>
<h1>Book the Audit: three ways</h1><p class="intro">Section 7, the last on the homepage. The one action on the site is the free AI audit; today it is the only section still on the May neon green button. The heading is kept in every option; its words are a detail after the pick.</p>{rows}</body>"""
    f = D / "design-pass-site-2026-10-19-audit.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-19-audit.png"), full_page=True); await b.close()
    print("sheet done")

asyncio.run(main())
