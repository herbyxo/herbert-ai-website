# /pilot skeleton, three ways, drawn as whole pages in the "Runs itself"
# register (Will, 20 Oct 2026: "show me A B and C so i know what im looking
# at"). Each page replaces /pilot's <main> on the dev server, so the header,
# footer and fonts are the real ones; the copy is today's /pilot copy, the
# sample audit is a crop of the real /pilot/sample-audit page, and each
# section carries a numbered tag. Words and details come after the pick.
import asyncio, base64
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-20" / "pilot"; A.mkdir(parents=True, exist_ok=True)
Q = chr(0x2019)
MONO = "font-family:var(--font-geist-mono),ui-monospace,monospace"
INK, PAPER = "#111", "#FAFAF8"

def tag(n, name, dark=False):
    c = "rgba(255,255,255,.55)" if dark else "#B4532A"
    return f'<div style="{MONO};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:{c};margin-bottom:14px">{n} · {name}</div>'

def wrap(inner, dark=False, pad="96px 48px", border=True):
    bg, fg = (INK, "#fff") if dark else (PAPER, INK)
    b = "border-top:1px solid rgba(17,17,17,.1);" if (border and not dark) else ""
    return f'<section style="background:{bg};color:{fg};{b}"><div style="max-width:1280px;margin:0 auto;padding:{pad}">{inner}</div></section>'

def label(t, dark=False):
    return f'<p style="font-size:16px;font-weight:500;color:{"rgba(255,255,255,.6)" if dark else "#555"};margin:0 0 16px">{t}</p>'

def h1(t, size="clamp(48px,5vw,72px)"):
    return f'<h1 style="margin:0;font-weight:700;letter-spacing:-0.045em;line-height:0.95;font-size:{size};max-width:14ch">{t}</h1>'

def h2(t):
    return f'<h2 style="margin:0;font-weight:700;letter-spacing:-0.04em;line-height:1;font-size:clamp(36px,3.6vw,52px);max-width:18ch">{t}</h2>'

def button(t, dark=False):
    bg, fg = ("#fff", INK) if dark else (INK, "#fff")
    return f'<a style="display:inline-flex;align-items:center;gap:8px;background:{bg};color:{fg};border-radius:10px;padding:14px 24px;font-size:16px;font-weight:500">{t} &rarr;</a>'

TERMS = [("Free", "45 minute audit, written up"), ("$3,500", "Your first AI employee, fixed"), ("14 days", "Live, or it" + Q + "s free"), ("100%", "Credited to a bigger build")]
def terms(dark=False):
    line = "rgba(255,255,255,.15)" if dark else "rgba(17,17,17,.12)"
    sub = "rgba(255,255,255,.55)" if dark else "#777"
    cells = "".join(f'<div style="border-top:1px solid {line};padding-top:12px"><div style="font-size:26px;font-weight:600;letter-spacing:-0.02em">{n}</div><div style="font-size:13px;color:{sub};margin-top:4px">{l}</div></div>' for n, l in TERMS)
    return f'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:40px;max-width:760px">{cells}</div>'

INTRO = "A free 45 minute AI audit: where the hours go, what each repetitive job costs you a year, and which one to hand to software first. Written up within two business days, yours to keep."

def field(lbl, ph, tall=False):
    h = "88px" if tall else "auto"
    return f'<label style="display:block"><span style="display:block;font-size:12.5px;color:#666;margin-bottom:6px">{lbl}</span><span style="display:block;border:1px solid rgba(17,17,17,.15);border-radius:10px;padding:12px 14px;font-size:16px;color:#999;background:#fff;height:{h}">{ph}</span></label>'

def form(narrow=False):
    grid = "1fr 1fr"
    return f'''<div style="background:{PAPER};color:{INK};border-radius:16px;padding:28px;border:1px solid rgba(17,17,17,.1)">
<div style="display:grid;grid-template-columns:{grid};gap:14px">{field("Your name", "Your name")}{field("Business name", "Your business")}{field("Email", "you@business.com")}{field("Phone", "0400 000 000")}</div>
<div style="margin-top:14px">{field("What" + Q + "s the job in your office everyone hates doing?", "e.g. Chasing clients for documents, then copying the details into our system", True)}</div>
<div style="margin-top:20px">{button("Book a free AI audit")}</div></div>'''

STEPS = [("Step 1", "The free AI audit", ["45 minutes auditing your business", "A written page in two business days", "The three jobs costing you most, in your figures"]),
         ("Step 2", "Your first AI employee, built", ["Built around the tools you already use", "One job and a name, say an AI document chaser", "A progress update, not a project plan"]),
         ("Step 3", "Live on day 14", ["Your team uses it the same day", "A walkthrough so everyone knows how", "A twelve month roadmap of the next jobs"])]
def how(n, tagname="How it works"):
    cols = "".join(f'<div style="border-top:1px solid rgba(17,17,17,.15);padding-top:24px"><p style="font-size:16px;font-weight:500;color:#777;margin:0 0 20px">{s}</p><h3 style="margin:0 0 12px;font-size:24px;font-weight:600;letter-spacing:-0.02em">{t}</h3>' + "".join(f'<div style="font-size:17px;line-height:1.45;color:#444;padding:8px 0;border-top:1px solid rgba(17,17,17,.08)">{f}</div>' for f in fs) + '</div>' for s, t, fs in STEPS)
    return wrap(tag(n, tagname) + label("How it works") + h2("Audit first. Then fourteen days.") + f'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:48px;margin-top:48px">{cols}</div>')

FIXES = [("Chasing", "Documents, invoices, approvals. The follow-up goes out on time, every time."), ("Re-typing", "The same details keyed into three systems. Entered once, synced everywhere."), ("The same emails", "Quotes, confirmations, updates: drafted for you, checked by you."), ("Booking admin", "Confirmations, reschedules and reminders handled for you."), ("Handovers", "Job details that live in one person" + Q + "s inbox, on one screen."), ("The Monday report", "The numbers you compile by hand every week, compiled for you.")]
def fixes(n):
    cells = "".join(f'<div style="border-top:1px solid rgba(17,17,17,.15);padding-top:16px"><div style="font-size:20px;font-weight:600;letter-spacing:-0.015em">{t}</div><div style="font-size:16px;line-height:1.5;color:#555;margin-top:6px">{b}</div></div>' for t, b in FIXES)
    return wrap(tag(n, "What it fixes") + label("What it fixes") + h2("The job everyone hates doing.") + f'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:28px 48px;margin-top:44px">{cells}</div>')

AFTER = [("Your AI operating system", "When one job runs itself, the next ones follow: files, comms and follow-ups on one system. From $25,000, scoped after the audit."), ("Keep it running", "A retainer from $1,000 a month: hosting, fixes, small changes and a monthly report. Month to month."), ("The first three", "The first three pilot clients who agree to a case study get 90 days of included care instead of 30.")]
def after(n):
    cells = "".join(f'<div style="border-top:1px solid rgba(17,17,17,.15);padding-top:16px"><div style="font-size:20px;font-weight:600;letter-spacing:-0.015em">{t}</div><div style="font-size:16px;line-height:1.5;color:#555;margin-top:6px">{b}</div></div>' for t, b in AFTER)
    return wrap(tag(n, "After the pilot") + label("After the pilot") + h2("One job first. Then the system.") + f'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:48px;margin-top:44px">{cells}</div>')

QS = ["What is the AI audit, and why is it free?", "Do I have to buy the pilot after the audit?", "What counts as a bottleneck?", "What do I actually get for $3,500?", "What does " + chr(0x201C) + "credited in full" + chr(0x201D) + " mean?", "Are there ongoing costs after the pilot?", "What if it is not live in 14 days?", "Do I have to change my existing software?"]
def questions(n):
    cells = "".join(f'<div style="border-top:1px solid rgba(17,17,17,.12);padding:16px 0"><div style="font-size:18px;font-weight:600;letter-spacing:-0.01em">{q}</div><div style="font-size:16px;line-height:1.5;color:#666;margin-top:6px">The answer, two or three plain sentences, as on /pilot today.</div></div>' for q in QS)
    return wrap(tag(n, "Questions") + label("Questions") + h2("Before you book.") + f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 48px;margin-top:36px">{cells}</div>')

def written_page(n, img):
    inner = tag(n, "The written page") + f'''<div style="display:grid;grid-template-columns:0.72fr 1.28fr;gap:48px;align-items:center">
<div>{label("What you get back")}{h2("A written page on what your admin costs.")}<p style="margin:20px 0 0;font-size:17px;line-height:1.5;color:#555;max-width:40ch">This one is a sample, for a made-up four person accounting practice: the jobs, the hours, what each costs a year, and the first one to hand over.</p><p style="margin:22px 0 0;font-size:16px;font-weight:500;text-decoration:underline;text-underline-offset:4px">Read the whole sample &rarr;</p></div>
<div style="border-radius:12px;overflow:hidden;border:1px solid rgba(17,17,17,.12);box-shadow:0 30px 80px -40px rgba(0,0,0,.35);height:560px;background:#fff"><img src="data:image/png;base64,{img}" style="width:100%;display:block"></div></div>'''
    return wrap(inner)

def book_section(n, dark=True):
    inner = tag(n, "Book", dark) + f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:end"><div>{label("Book the Audit", dark)}{h2("Book your free AI audit.")}<p style="margin:20px 0 0;font-size:17px;line-height:1.5;color:{"rgba(255,255,255,.7)" if dark else "#555"};max-width:40ch">You get a call the same day to set a time. Forty five minutes, no preparation.</p></div><div>{form()}</div></div>'
    return wrap(inner, dark)

def hero_a():
    return wrap(tag(1, "Hero") + label("Free AI audit") + h1("Find the job that costs you most.") + f'<p style="margin:28px 0 32px;font-size:19px;line-height:1.45;color:#333;max-width:46ch">{INTRO}</p>' + button("Book my free AI audit") + terms(), pad="64px 48px 96px", border=False)

def hero_b():
    left = f'<div>{label("Free AI audit")}{h1("Find the job that costs you most.", "clamp(44px,4.4vw,64px)")}<p style="margin:24px 0 0;font-size:19px;line-height:1.45;color:#333;max-width:40ch">{INTRO}</p>{terms()}</div>'
    return wrap(tag(1, "Hero, with the form") + f'<div style="display:grid;grid-template-columns:0.95fr 1.05fr;gap:56px;align-items:center">{left}<div>{form()}</div></div>', pad="56px 48px 88px", border=False)

def close_line(n):
    return wrap(tag(n, "Closing line") + f'<div style="display:flex;align-items:end;justify-content:space-between;gap:40px"><h2 style="margin:0;font-weight:700;letter-spacing:-0.04em;line-height:1;font-size:clamp(36px,3.6vw,52px)">Fourteen days from now, it' + Q + 's done.</h2>' + button("Book my free AI audit") + '</div>', pad="80px 48px")

def back_link(n):
    return wrap(tag(n, "Back to the form") + f'<p style="margin:0;font-size:20px;font-weight:600">Ready? <span style="text-decoration:underline;text-underline-offset:5px">Book your free AI audit &uarr;</span></p>', pad="56px 48px 72px")

def page(kind, img):
    if kind == "A":
        return hero_a() + how(2) + fixes(3) + after(4) + book_section(5) + questions(6) + close_line(7)
    if kind == "B":
        return hero_b() + written_page(2, img) + how(3) + fixes(4) + after(5) + questions(6) + back_link(7)
    return hero_a() + fixes(2) + how(3) + written_page(4, img) + after(5) + questions(6) + book_section(7)

NOTES = {
 "A": ("A. Today" + Q + "s order, restyled", "Hero, how it works, what it fixes, after the pilot, the form, questions, a closing line. The form sits two thirds down."),
 "B": ("B. The form first", "The offer and the form on the first screen, then the written page shown at size, how it works, what it fixes, after the pilot, questions, and a link back up. Recommended."),
 "C": ("C. The homepage" + Q + "s shape", "Hero, what it fixes, how it works, the written page, after the pilot, questions, and the form as the last section, on the ink band like the homepage."),
}

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=1)
        pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
        await pg.goto("http://localhost:3000/pilot/sample-audit", wait_until="networkidle", timeout=180000)
        await pg.add_style_tag(content="nextjs-portal{display:none!important}")
        for y in range(0, 4400, 500):
            await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(150)
        await pg.evaluate("window.scrollTo(0,0)"); await pg.wait_for_timeout(500)
        crop = await pg.screenshot(clip={"x": 96, "y": 150, "width": 1248, "height": 1020}, full_page=True)
        img = base64.b64encode(crop).decode()
        for kind in ["A", "B", "C"]:
            await pg.goto("http://localhost:3000/pilot", wait_until="networkidle", timeout=180000)
            await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            await pg.evaluate("(html) => { document.querySelector('main').innerHTML = html; }", page(kind, img))
            await pg.wait_for_timeout(600)
            h = await pg.evaluate("document.documentElement.scrollHeight")
            await pg.screenshot(path=str(A / f"skeleton-{kind}.png"), full_page=True)
            await pg.screenshot(path=str(A / f"skeleton-{kind}-fold.png"))
            print(kind, h)
        print("errors:", errs); await b.close()
    cols = "".join(f'<figure><figcaption><b>{NOTES[k][0]}</b><span>{NOTES[k][1]}</span></figcaption><img src="assets-2026-10-20/pilot/skeleton-{k}.png"></figure>' for k in ["A", "B", "C"])
    folds = "".join(f'<figure><figcaption><b>{NOTES[k][0]}: the first screen</b></figcaption><img src="assets-2026-10-20/pilot/skeleton-{k}-fold.png"></figure>' for k in ["A", "B", "C"])
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot: three skeletons</title><style>
body{{margin:0;background:#151515;color:#eee;font:14px/1.4 -apple-system,Helvetica,Arial,sans-serif;padding:30px 34px}} h1{{font-size:24px;margin:0 0 6px}} .intro{{color:#aaa;margin:0 0 18px;max-width:1500px}}
.row{{display:flex;gap:26px;align-items:flex-start;margin-bottom:34px}} figure{{margin:0;width:470px}} figcaption{{margin-bottom:8px;min-height:72px}} figcaption b{{font-size:16px;display:block;margin-bottom:3px}} figcaption span{{color:#aaa}} img{{width:470px;display:block;border:1px solid #333}}</style><body>
<h1>/pilot: three skeletons</h1><p class="intro">The whole page each way at 1440, in the new register, scaled down; the first screens are under them at the same scale. Copy is today's /pilot copy and the sample is the real sample audit page; the numbered tags name each section. Words and details come after the pick.</p>
<div class="row">{folds}</div><div class="row">{cols}</div></body>"""
    f = D / "design-pass-site-2026-10-20-pilot-skeleton.html"; f.write_text(html)
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1560, "height": 1000})
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(1000)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-20-pilot-skeleton.png"), full_page=True); await b.close()
    print("sheet done")

asyncio.run(main())
