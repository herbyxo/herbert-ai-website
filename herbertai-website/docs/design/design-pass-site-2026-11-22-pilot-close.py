# /pilot section 7, the close: the options sheet (22 Nov 2026). Will: "Yes,
# section 7". The sheet opens with the brief, then today and A, B and C drawn
# from /lab/pilot-close as the page's end (section 6 above, the real footer
# below) at 1440 and 375, with the tidy checks (a word alone on a line,
# overflow, errors) at 1440, 1280, 375 and 320, and the real /pilot's height on
# a phone. Pass an output folder as the first argument.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-11-22"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}

OPTS = [
    ("today", "Today", "A one-line text link, \"Ready? Book your free AI audit\", then the footer, whose Talk column links to the form again. The page ends on a link, which the register keeps for the sections between."),
    ("a", "A. The button", "Recommended. The page ends on the black audit button in the hero's words, \"Book a free AI audit\", beside \"Ready?\", and jumps to the form. It is the register's rule as Will set it on the home page: the button at the start and at the end, a text link between. Costs one more black button on the page."),
    ("b", "B. The form again", "The home page's dark close band with the form in it, so nobody scrolls back up. The form then appears twice on one page, the dark band is the home page's own ending, and the form's field ids need a prefix so the two copies do not clash."),
    ("c", "C. No close", "The questions end the page and the footer's \"Book a free AI audit\" is the way back. The shortest end; the page then closes on a folded list and a small footer link, with no button."),
]

TIDY_JS = r"""(id) => { const s = document.querySelector(`[data-shot='${id}']`); const close = s.querySelector('[data-close]'); const out = [];
  for (const el of (close ? close.querySelectorAll('h2, p, a') : [])) { if (!el.offsetParent || el.querySelector('p')) continue;
    const tn = []; const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); while (w.nextNode()) tn.push(w.currentNode);
    const words = []; for (const n of tn) { const re = /\S+/g; let m; while ((m = re.exec(n.data))) { const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length); const b = r.getBoundingClientRect(); if (b.width) words.push({ t: m[0], top: Math.round(b.top) }); } }
    if (words.length < 3) continue; const tops = [...new Set(words.map(x => x.top))]; if (tops.length < 2) continue;
    const last = Math.max(...tops); const on = words.filter(x => Math.abs(x.top - last) < 4); if (on.length === 1) out.push(on[0].t); }
  const q = s.querySelector('section'); const f = s.querySelector('footer');
  return [out, close ? Math.round(close.getBoundingClientRect().height) : 0, Math.round(f.getBoundingClientRect().top - q.getBoundingClientRect().bottom)] }"""


async def main():
    meas = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); errs = []; over = []; tidy = []
        ctx = await b.new_context(viewport={"width": 375, "height": 812})
        pg = await ctx.new_page(); await pg.goto("http://localhost:3000/pilot", wait_until="load", timeout=180000); await pg.wait_for_timeout(800)
        pilot_h = await pg.evaluate("() => document.documentElement.scrollHeight"); await ctx.close()
        for vw, vh, dpr, shoot in [(1440, 900, 1, True), (1280, 800, 1, False), (375, 812, 2, True), (320, 700, 2, False)]:
            ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion="reduce", device_scale_factor=dpr)
            pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
            pg.on("console", lambda m: errs.append("console: " + m.text[:160]) if m.type == "error" else None)
            await pg.goto("http://localhost:3000/lab/pilot-close", wait_until="load", timeout=180000)
            await pg.wait_for_function("() => document.querySelectorAll('[data-shot]').length === 4", timeout=180000)
            await pg.wait_for_timeout(800); await pg.add_style_tag(content="nextjs-portal{display:none!important}")
            await pg.evaluate("() => document.querySelectorAll('body *').forEach(el => { if (getComputedStyle(el).position === 'fixed') el.style.display = 'none' })")
            sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
            if sw > iw: over.append(f"at {vw}: {sw} > {iw}")
            for key, _, _ in OPTS:
                w, h, gap = await pg.evaluate(TIDY_JS, key); meas[(key, vw)] = (h, gap)
                if w: tidy.append(f"{key} at {vw}: {w}")
                if shoot:
                    sec = pg.locator(f"[data-shot='{key}']")
                    await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(200)
                    await sec.screenshot(path=str(A / f"pilot-close-{key}-{vw}.png"))
            await ctx.close()
        print("errors:", errs or "none"); print("overflow:", over or "none"); print("tidy:", tidy or "clean")
        print("close heights:", {f"{k}@{v}": m[0] for (k, v), m in meas.items() if v in (1440, 375)}); print("/pilot at 375:", pilot_h); await b.close()
    brief = [
        ("Who reaches it", f"An owner who has read all of /pilot, from the form at the top through the sample report, the timeline, the jobs, the stages and the twelve questions, and has not booked. On a phone the page is {pilot_h:,}px tall, so the form is a long way up."),
        ("What they leave with", "One action: the form. The anchor link jumps there instantly; the question is what the page ends on."),
        ("Today", "A one-line text link, then the footer, whose Talk column has \"Book a free AI audit\" as well."),
        ("What bounds it", "The marketing-site register (Will, 10 and 12 Oct 2026, on the home page): the black audit button appears at the hero and at the end, and the sections between close on a text link. /pilot's hero carries the form instead of a button. The home page ends on the form in a dark band. /pilot does not move. The audit form's field ids are fixed, so a second copy on one page needs a prefix. The words (\"Ready?\") are the details pass, with a line test."),
    ]
    bt = "".join(f"<tr><td>{k}</td><td>{v}</td></tr>" for k, v in brief)
    rows = "".join(f'<section><div class="lab"><b>{n}</b><span>{r}</span> <i>The close is {meas[(k, 1440)][0]}px tall at 1440, {meas[(k, 375)][0]}px at 375.</i></div><div class="pair"><img src="assets-2026-11-22/pilot-close-{k}-1440.png" style="width:900px"><img src="assets-2026-11-22/pilot-close-{k}-375.png" style="width:240px"></div></section>' for k, n, r in OPTS)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot the close, options</title><style>
body{{margin:0;background:#151515;color:#eee;font:14px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} h2{{font-size:19px;margin:30px 0 10px;font-weight:600}} .intro{{color:#aaa;max-width:1200px;margin:0 0 18px}}
table{{border-collapse:collapse;width:100%;max-width:1200px}} td{{text-align:left;padding:6px 10px;border-bottom:1px solid #333;vertical-align:top}} td:first-child{{color:#aaa;white-space:nowrap}}
section{{margin-bottom:36px}} .lab{{margin-bottom:10px;max-width:1200px}} .lab b{{font-size:17px;margin-right:12px}} .lab span{{color:#bbb}} .lab i{{color:#888;font-style:normal}} .pair{{display:flex;gap:20px;align-items:flex-start}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 7, the close: today and three ways (22 Nov 2026)</h1>
<p class="intro">The last thing on /pilot, after the twelve questions and before the footer. Each option is drawn as the page's end: the questions above, the close, the real footer below.</p>
<h2>The brief</h2><table>{bt}</table>
<h2>Today and three ways (1440 left, 375 right)</h2>{rows}</body>"""
    f = D / "design-pass-site-2026-11-22-pilot-close.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1240, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-11-22-pilot-close.png"), full_page=True); await b.close()
    print("sheet done")

asyncio.run(main())
