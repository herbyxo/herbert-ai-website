# Products details, 3 of 6: the visual beside the story, three ways. The
# facts became Will's story on 19 Oct 2026 ("Type your name. Writes ads. Runs
# ads. Answers leads. Books jobs."), so the ads-only dashboard beside it no
# longer matches. Drawn by swapping the screen inside the band's laptop frame
# (1184x740, scaled like the real one) with static mock-ups, and lighting the
# list row the screen belongs to. The phone layout is detail 6.
import asyncio, html as H
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent; A = D / "assets-2026-10-19"; A.mkdir(exist_ok=True)
BASE = "http://localhost:3000"
HIDE = "nextjs-portal{display:none!important}"
Q = chr(0x2019); L = chr(0x201C); R = chr(0x201D)
DONE, WAIT, QUEUE = "#12B76A", "#F5A623", "#BDBDBD"
MONO = "font-family:var(--font-geist-mono),ui-monospace,monospace"

def dot(c, s=8):
    return f'<span style="display:inline-block;width:{s}px;height:{s}px;border-radius:99px;background:{c};flex-shrink:0"></span>'

def frame(body, right=""):
    return f'''<div style="width:1184px;height:740px;background:#fff;color:#111;display:flex;flex-direction:column;font-size:14px">
<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 22px;border-bottom:1px solid rgba(17,17,17,.08);{MONO};font-size:12px;color:#555"><span>Herbert Reach · Dave{Q}s Plumbing, an example business</span><span>{right}</span></div>
<div style="flex:1;min-height:0;padding:22px 30px;zoom:1.3">{body}</div></div>'''

card = "border:1px solid rgba(17,17,17,.1);border-radius:14px;background:#fff"
muted = "color:#777"

# Option 1, the story plays: one screen per step.
F1 = frame(f'''<div style="max-width:620px;margin:10px auto 0">
<p style="{muted};font-size:13px;margin:0 0 8px">Your business name</p>
<div style="{card};padding:16px 18px;font-size:22px;font-weight:600;letter-spacing:-.01em">Dave{Q}s Plumbing, Adelaide<span style="display:inline-block;width:2px;height:24px;background:#111;margin-left:3px;vertical-align:-4px"></span></div>
<p style="{muted};font-size:13px;margin:26px 0 6px">What it found</p>
{"".join(f'<div style="display:flex;gap:12px;align-items:baseline;padding:11px 0;border-top:1px solid rgba(17,17,17,.08)">{dot(DONE)}<span style="width:120px;{muted}">{k}</span><span style="font-weight:500">{v}</span></div>' for k, v in [("Services", "Hot water, blocked drains, gas fitting, emergencies"), ("Area", "Southern suburbs of Adelaide"), ("Reviews", "4.8 from 212 on Google"), ("Voice", "Plain, friendly, quick to answer"), ("Competitors", "3 plumbers running ads near you")])}
<div style="margin-top:22px;display:inline-block;background:#111;color:#fff;border-radius:10px;padding:11px 18px;font-weight:500">Looks right</div></div>''', "Step 1 of 5")

def gad(head, desc, state):
    s = {"done": (DONE, "Approved"), "wait": (WAIT, "Waiting on you"), "queue": (QUEUE, "Drafting")}[state]
    return f'''<div style="{card};padding:18px 20px;display:flex;flex-direction:column;gap:6px">
<p style="margin:0;font-size:12px;{muted}"><b style="color:#111">Ad</b> · daves-plumbing.com.au</p>
<p style="margin:0;font-size:18px;font-weight:600;color:#1a4fd6;letter-spacing:-.01em">{head}</p>
<p style="margin:0;font-size:14px;line-height:1.45;color:#333">{desc}</p>
<div style="margin-top:10px;display:flex;align-items:center;gap:8px;font-size:13px">{dot(s[0])}<span>{s[1]}</span>{'<span style="margin-left:auto;background:#111;color:#fff;border-radius:8px;padding:6px 12px;font-weight:500">Approve</span>' if state == "wait" else ""}</div></div>'''

F2 = frame(f'''<p style="margin:0 0 4px;font-size:22px;font-weight:600;letter-spacing:-.02em">Your first ads, written</p>
<p style="margin:0 0 20px;{muted}">From what it found, and what the three plumbers near you are running.</p>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
{gad("Hot Water Out? Fixed Today", "Licensed plumbers across the southern suburbs. Same-day hot water repairs, 4.8 stars from 212 reviews.", "done")}
{gad("Blocked Drain? Cleared Today", "Local plumbers, upfront prices, no call-out surprises. Call Dave" + Q + "s Plumbing now.", "wait")}
{gad("Gas Fitter, Southern Suburbs", "Licensed gas fitting for cooktops, heaters and hot water. Quotes the same day.", "queue")}
</div>''', "Step 2 of 5")

rows3 = [("Hot water repairs", "Live", DONE, "$612", "18", "$34"), ("Blocked drains", "Live", DONE, "$420", "13", "$32"), ("Emergency plumber", "Live", DONE, "$508", "11", "$46"), ("Gas fitting", "Paused, $76 an enquiry", QUEUE, "$302", "4", "$76")]
F3 = frame(f'''<div style="display:grid;grid-template-columns:1.6fr 1fr;gap:20px;height:100%">
<div style="{card};padding:6px 0"><table style="width:100%;border-collapse:collapse;font-size:14px">
<tr style="{muted};font-size:12px"><td style="padding:12px 20px">Campaign</td><td>Status</td><td style="text-align:right">Spend</td><td style="text-align:right">Enquiries</td><td style="text-align:right;padding-right:20px">Each</td></tr>
{"".join(f'<tr style="border-top:1px solid rgba(17,17,17,.08)"><td style="padding:14px 20px;font-weight:500">{n}</td><td><span style="display:inline-flex;align-items:center;gap:7px">{dot(c, 7)}{s}</span></td><td style="text-align:right">{sp}</td><td style="text-align:right">{e}</td><td style="text-align:right;padding-right:20px">{each}</td></tr>' for n, s, c, sp, e, each in rows3)}
</table></div>
<div style="display:flex;flex-direction:column;gap:14px">
<div style="{card};padding:18px 20px"><p style="margin:0;font-size:12px;{muted}">This month</p><p style="margin:6px 0 0;font-size:30px;font-weight:600;letter-spacing:-.02em">$1,842</p><p style="margin:2px 0 0;{muted};font-size:13px">of your $2,000 budget</p></div>
<div style="{card};padding:18px 20px"><p style="margin:0;font-size:12px;{muted}">6:00am</p><p style="margin:6px 0 0;font-weight:500">Moved $60 from gas fitting to hot water</p><p style="margin:4px 0 0;{muted};font-size:13px;line-height:1.4">Hot water enquiries cost $34, gas fitting $76. Your total is unchanged.</p></div>
</div></div>''', "Step 3 of 5")

F4 = frame(f'''<div style="max-width:700px;margin:0 auto;display:flex;flex-direction:column;gap:14px">
<div style="{card};padding:18px 22px"><div style="display:flex;gap:10px;align-items:center;font-size:13px">{dot("#111")}<b>New enquiry</b><span style="{muted}">from the hot water ad</span><span style="margin-left:auto;{muted}">2:14pm</span></div>
<p style="margin:10px 0 0;font-size:17px;line-height:1.45">Sarah K. · {L}No hot water since this morning, two kids. Can someone come today?{R}</p></div>
<div style="{card};padding:18px 22px"><div style="display:flex;gap:10px;align-items:center;font-size:13px">{dot(DONE)}<b>Called back</b><span style="{muted}">3 minute call</span><span style="margin-left:auto;{muted}">2:15pm</span></div>
<p style="margin:10px 0 0;font-size:15px;line-height:1.5;color:#333">Gas hot water service, about 15 years old, not lighting. Prefers this afternoon. Sent a text with the booking and Dave{Q}s name.</p></div>
<div style="{card};padding:18px 22px;border-color:{DONE}"><div style="display:flex;gap:10px;align-items:center;font-size:13px">{dot(DONE)}<b>Job booked</b><span style="margin-left:auto;{muted}">2:18pm</span></div>
<p style="margin:10px 0 0;font-size:20px;font-weight:600;letter-spacing:-.01em">Today, 4:30pm · Hot water service · Morphett Vale</p></div>
</div>''', "Step 4 of 5")

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
jobs = {0: [("8:30", "Blocked drain, Reynella")], 1: [("10:00", "Hot water, Hallett Cove"), ("2:00", "Gas cooktop, Aldinga")], 2: [("9:00", "Hot water, Seaford")], 3: [("8:30", "Blocked drain, Noarlunga"), ("1:30", "Leaking tap, Christies Beach"), ("4:30", "Hot water, Morphett Vale")], 4: [("11:00", "Blocked drain, Sheidow Park")]}
cal = "".join(f'<div style="display:flex;flex-direction:column;gap:8px"><p style="margin:0;font-size:12px;{muted}">{d}</p>' + "".join(f'<div style="border-radius:10px;background:#E8F7EE;color:#0E6B40;padding:9px 11px;font-size:12.5px;line-height:1.35"><b>{t}</b><br>{j}</div>' for t, j in jobs[i]) + "</div>" for i, d in enumerate(days))
F5 = frame(f'''<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
{"".join(f'<div style="{card};padding:16px 18px"><p style="margin:0;font-size:12px;{muted}">{k}</p><p style="margin:6px 0 0;font-size:28px;font-weight:600;letter-spacing:-.02em">{v}</p><p style="margin:2px 0 0;font-size:12.5px;{muted}">{s}</p></div>' for k, v, s in [("Ad spend", "$1,842", "of $2,000"), ("Enquiries", "46", "all called back"), ("Jobs booked", "19", "from those enquiries"), ("Cost per job", "$97", "was $131")])}
</div>
<p style="margin:24px 0 10px;font-size:13px;{muted}">Booked this week</p>
<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px">{cal}</div>''', "Step 5 of 5")
FRAMES = [F1, F2, F3, F4, F5]

# Option 2, one dashboard matched to the story: four tiles, one per step.
def tile(k, v, s, on=False):
    return f'<div style="{card};padding:16px 18px;{"border-color:#111;box-shadow:0 0 0 1px #111" if on else ""}"><p style="margin:0;font-size:12px;{muted}">{k}</p><p style="margin:6px 0 0;font-size:28px;font-weight:600;letter-spacing:-.02em">{v}</p><p style="margin:2px 0 0;font-size:12.5px;{muted}">{s}</p></div>'
leads = [("2:14pm", "Sarah K.", "Hot water", "Called 2:15pm", "Booked today 4:30pm", DONE), ("11:52am", "Tom R.", "Blocked drain", "Called 11:53am", "Booked Thu 8:30am", DONE), ("10:20am", "Priya S.", "Gas cooktop", "Called 10:21am", "Quote sent", WAIT), ("9:05am", "Mark L.", "Leaking tap", "Called 9:06am", "Booked Thu 1:30pm", DONE)]
O2 = frame(f'''<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
{tile("Ads written", "12", "1 waiting on you")}{tile("Ads running", "4", "$1,842 of $2,000")}{tile("Leads answered", "46", "each called inside a minute", True)}{tile("Jobs booked", "19", "$97 each")}
</div>
<div style="{card};margin-top:18px;padding:6px 0"><table style="width:100%;border-collapse:collapse;font-size:14px">
<tr style="{muted};font-size:12px"><td style="padding:12px 20px">Enquiry</td><td>Who</td><td>For</td><td>Answered</td><td style="padding-right:20px">Outcome</td></tr>
{"".join(f'<tr style="border-top:1px solid rgba(17,17,17,.08)"><td style="padding:14px 20px;{muted}">{t}</td><td style="font-weight:500">{w}</td><td>{f}</td><td>{a}</td><td style="padding-right:20px"><span style="display:inline-flex;align-items:center;gap:7px">{dot(c, 7)}{o}</span></td></tr>' for t, w, f, a, o, c in leads)}
</table></div>''', "Today")

# Option 3, the day's feed in story order.
feed = [("6:00am", "Research", "Two new competitor ads found near you", DONE, "Done"), ("6:05am", "Ads", "Two new ads written to test against your best", WAIT, "Waiting on you"), ("7:10am", "Ads", "Approved by Dave, now live", DONE, "Live"), ("9:05am", "Leads", "Mark L., leaking tap: called back inside a minute", DONE, "Booked Thu 1:30pm"), ("11:52am", "Leads", "Tom R., blocked drain: called back inside a minute", DONE, "Booked Thu 8:30am"), ("2:14pm", "Leads", "Sarah K., no hot water: called back inside a minute", DONE, "Booked today 4:30pm")]
O3 = frame(f'''<div style="display:grid;grid-template-columns:1.7fr 1fr;gap:26px;height:100%">
<div><p style="margin:0 0 14px;font-size:22px;font-weight:600;letter-spacing:-.02em">Today at Dave{Q}s Plumbing</p>
{"".join(f'<div style="display:flex;gap:14px;align-items:baseline;padding:13px 0;border-top:1px solid rgba(17,17,17,.08)"><span style="{MONO};font-size:12px;{muted};width:62px;flex-shrink:0">{t}</span><span style="width:74px;flex-shrink:0;font-weight:600">{k}</span><span style="flex:1">{x}</span><span style="display:inline-flex;align-items:center;gap:7px;font-size:13px;white-space:nowrap">{dot(c, 7)}{s}</span></div>' for t, k, x, c, s in feed)}
</div>
<div style="display:flex;flex-direction:column;gap:14px">{tile("Spent today", "$61", "of $66 a day")}{tile("Enquiries", "4", "all called back")}{tile("Jobs booked", "3", "$20 each today")}</div>
</div>''', "Today")

OPTS = [
  ("today", "Today", None, None, "The ads-only dashboard from before Herbert Reach was defined: campaigns, spend, a morning feed. It shows step 3 and part of 4, and says nothing about steps 1, 2 and 5."),
  ("1", "1. The story plays", F4, 3, "The screen shows the step the list is on, and the row lights up: your name and what it found, the first ads with one waiting on you, the ads running, an enquiry called back and booked, then the week of booked jobs. Five screens, one after another, once in view. Every step of the story is something you can see, and the approval shows up as the amber card in step 2. Recommended. Shown here on step 4; all five are in the strip below."),
  ("2", "2. One dashboard, matched to the story", O2, 3, "One screen with a tile per step (ads written, ads running, leads answered, jobs booked) and the leads table under them. As the list lights a row, its tile is outlined. Cheaper to build, but step 1 has no tile and it reads as a report, not a story."),
  ("3", "3. The day" + Q + "s feed", O3, None, "One day in story order: research, ads written, approved, then each enquiry called back and booked, with the day" + Q + "s numbers beside it. The closest to the Herbert OS screens above it, so the page repeats itself, and the list is not lit."),
]
JS = """([html, active]) => { const band = [...document.querySelectorAll('section')].find(x => x.textContent.includes('by Herbert AI')); if (html) { const inner = band.querySelector('.hidden.lg\\\\:block > div > div'); inner.innerHTML = html; } if (active !== null) { band.querySelectorAll('ol li').forEach((li, i) => { const t = li.querySelector('span:last-child'); t.style.color = i === active ? '#fff' : 'rgba(255,255,255,.35)'; }); } }"""

async def capture():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce", device_scale_factor=2)
        pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
        async def load():
            await pg.goto(BASE + "/", wait_until="networkidle", timeout=180000); await pg.add_style_tag(content=HIDE)
            band = pg.locator("section", has_text="by Herbert AI").first
            await band.scroll_into_view_if_needed(); await pg.wait_for_timeout(1200)
            return band
        for key, name, html, active, note in OPTS:
            band = await load()
            if html: await pg.evaluate(JS, [html, active])
            await pg.wait_for_timeout(300)
            await band.screenshot(path=str(A / f"products-visual-{key}.png")); print("captured", key)
        band = await load()
        for i, f in enumerate(FRAMES):
            await pg.evaluate(JS, [f, i]); await pg.wait_for_timeout(200)
            await pg.locator("section", has_text="by Herbert AI").first.locator(".hidden.lg\\:block > div[style*='aspect-ratio']").first.screenshot(path=str(A / f"products-visual-1-step{i + 1}.png"))
        print("frames done; errors:", errs)
        await b.close()

def sheet():
    rows = ""
    for key, name, html, active, note in OPTS:
        rows += f'<section><div class="lab"><b>{H.escape(name)}</b><span>{H.escape(note)}</span></div><img class="wide" src="assets-2026-10-19/products-visual-{key}.png">'
        if key == "1":
            rows += '<div class="strip">' + "".join(f'<figure><img src="assets-2026-10-19/products-visual-1-step{i}.png"><figcaption>{i:02d} {s}</figcaption></figure>' for i, s in enumerate(["Type your name.", "Writes ads.", "Runs ads.", "Answers leads.", "Books jobs."], 1)) + "</div>"
        rows += "</section>"
    return f"""<!doctype html><meta charset=utf-8><title>Products: the visual three ways</title><style>
body{{margin:0;background:#151515;color:#eee;font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1380px;margin:0 0 26px}}
section{{margin-bottom:46px}} .lab{{margin-bottom:10px;max-width:1400px}} .lab b{{font-size:19px;margin-right:12px}} .lab span{{color:#bbb}}
img.wide{{display:block;width:1400px;border:1px solid #333}} .strip{{display:flex;gap:12px;margin-top:12px}} .strip figure{{margin:0;width:272px}} .strip img{{width:272px;display:block;border:1px solid #333;border-radius:6px}} figcaption{{color:#aaa;font-size:13px;margin-top:6px}}</style><body>
<h1>Products: the visual three ways</h1><p class="intro">Detail 3 of 6. Your story is built into the band, so the screen beside it should show the same story. Drawn at 1440 on the real band; the phone version is detail 6. Every figure belongs to an example plumbing business, and no ad platform but Google is shown, since Meta still waits on app review.</p>{rows}</body>"""

async def render():
    f = D / "design-pass-site-2026-10-19-products-visual.html"; f.write_text(sheet())
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1500, "height": 1000}, device_scale_factor=1.25)
        await pg.goto(f"file://{f}"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-10-19-products-visual.png"), full_page=True); await b.close()

asyncio.run(capture()); asyncio.run(render()); print("sheet done")
