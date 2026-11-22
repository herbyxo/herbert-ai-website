# /pilot section 7, the close, as built (Will, 22 Nov 2026: "do B, the form
# again"). Checks the real page at 1440, 1280, 375 and 320, motion on and off:
# no overflow, no page or console errors, no word alone on a line in the close,
# no id used twice on the page, every label in both forms pointing at a field in
# its own form, a click on the end form's labels focusing its own fields, and
# the two forms sending the same hidden fields but for the subject line. Nothing
# is submitted. Then the as-built sheet. Pass an output folder as the first
# argument.
import asyncio, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-11-22"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}

CHECK_JS = r"""() => {
  const ids = [...document.querySelectorAll('[id]')].map(e => e.id); const dup = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))];
  const forms = [...document.querySelectorAll('form[action*="web3forms"]')];
  const labels = forms.map(f => [...f.querySelectorAll('label[for]')].every(l => { const t = document.getElementById(l.htmlFor); return t && f.contains(t) }));
  const hidden = forms.map(f => Object.fromEntries([...f.querySelectorAll('input[type=hidden]')].filter(i => !['page', 'landing_page', 'first_referrer'].includes(i.name)).map(i => [i.name, i.value])));
  const diff = forms.length === 2 ? Object.keys({ ...hidden[0], ...hidden[1] }).filter(k => hidden[0][k] !== hidden[1][k]) : ['forms: ' + forms.length];
  const req = forms.map(f => [...f.querySelectorAll('[required]')].map(e => e.name));
  return { forms: forms.length, dup, labels, diff, subjects: hidden.map(h => h.subject), required: req } }"""
TIDY_JS = r"""() => { const s = [...document.querySelectorAll('section')].find(x => x.querySelector('h2')?.textContent.trim() === 'Ready?'); const out = [];
  for (const el of s.querySelectorAll('h2, p, label, button')) { if (!el.offsetParent) continue;
    const tn = []; const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); while (w.nextNode()) tn.push(w.currentNode);
    const words = []; for (const n of tn) { const re = /\S+/g; let m; while ((m = re.exec(n.data))) { const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length); const b = r.getBoundingClientRect(); if (b.width) words.push({ t: m[0], top: Math.round(b.top) }); } }
    if (words.length < 3) continue; const tops = [...new Set(words.map(x => x.top))]; if (tops.length < 2) continue;
    const last = Math.max(...tops); const on = words.filter(x => Math.abs(x.top - last) < 4); if (on.length === 1) out.push(on[0].t); }
  return [out, Math.round(s.getBoundingClientRect().height)] }"""


async def main():
    errs, over, tidy, facts, heights = [], [], [], [], {}
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH)
        for vw, vh, dpr in [(1440, 900, 1), (1280, 800, 1), (375, 812, 2), (320, 700, 2)]:
            for motion in ["no-preference", "reduce"]:
                ctx = await b.new_context(viewport={"width": vw, "height": vh}, reduced_motion=motion, device_scale_factor=dpr)
                pg = await ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
                pg.on("console", lambda m: errs.append("console: " + m.text[:160]) if m.type == "error" else None)
                await pg.goto("http://localhost:3000/pilot", wait_until="load", timeout=180000)
                await pg.wait_for_timeout(900); await pg.add_style_tag(content="nextjs-portal{display:none!important}")
                await pg.evaluate("() => document.querySelectorAll('body *').forEach(el => { if (getComputedStyle(el).position === 'fixed') el.style.display = 'none' })")
                sw, iw = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
                if sw > iw: over.append(f"{vw} {motion}: {sw} > {iw}")
                w, h = await pg.evaluate(TIDY_JS); heights[vw] = h
                if w: tidy.append(f"{vw} {motion}: {w}")
                if vw == 1440 and motion == "no-preference":
                    c = await pg.evaluate(CHECK_JS)
                    facts.append(f"forms on the page {c['forms']}, ids used twice {c['dup'] or 'none'}, every label points into its own form {all(c['labels'])}")
                    facts.append(f"hidden fields that differ between the two forms: {c['diff']}; subjects {c['subjects']}")
                    facts.append(f"required fields: first form {c['required'][0]}, end form {c['required'][1]}")
                    await pg.locator("label[for='end-email']").click()
                    foc = await pg.evaluate("() => document.activeElement.id")
                    facts.append(f"clicking the end form's Email label focuses #{foc}")
                    await pg.locator("label[for='email']").click()
                    foc2 = await pg.evaluate("() => document.activeElement.id")
                    facts.append(f"clicking the first form's Email label focuses #{foc2}")
                if motion == "no-preference":
                    sec = pg.locator("section:has(h2:text-is('Ready?'))")
                    await sec.scroll_into_view_if_needed(); await pg.wait_for_timeout(250)
                    box = await sec.bounding_box(); foot = await pg.locator("footer").bounding_box()
                    await pg.screenshot(path=str(A / f"pilot-close-built-{vw}.png"), full_page=True,
                                        clip={"x": 0, "y": box["y"] - 260 + await pg.evaluate("() => window.scrollY"), "width": vw, "height": box["height"] + 260 + foot["height"]})
                await ctx.close()
        ctx = await b.new_context(viewport={"width": 1440, "height": 900}); pg = await ctx.new_page()
        await pg.goto("http://localhost:3000/", wait_until="load", timeout=180000); await pg.wait_for_timeout(600)
        home = await pg.evaluate("() => [...document.querySelectorAll('form[action*=\"web3forms\"] input:not([type=hidden])')].map(i => i.id)")
        facts.append(f"home page form ids unchanged: {home}")
        await b.close()
    print("errors:", errs or "none"); print("overflow:", over or "none"); print("tidy:", tidy or "clean")
    for f in facts: print(f)
    print("close heights:", heights)
    imgs = "".join(f'<figure><figcaption>{vw}</figcaption><img src="assets-2026-11-22/pilot-close-built-{vw}.png" style="width:{w}px"></figure>' for vw, w in [(1440, 900), (1280, 900), (375, 260), (320, 230)])
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot the close, as built</title><style>
body{{margin:0;background:#151515;color:#eee;font:14px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1200px;margin:0 0 18px}}
.wrap{{display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start}} figure{{margin:0}} figcaption{{color:#aaa;margin-bottom:6px}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 7, the close, as built (Will, 22 Nov 2026: B, the form again)</h1>
<p class="intro">The real page's end at 1440, 1280, 375 and 320: the bottom of the questions, the dark close band with the form, the footer. {' · '.join(facts)}.</p>
<div class="wrap">{imgs}</div></body>"""
    f = D / "design-pass-site-2026-11-22-pilot-close-built.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1300, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-11-22-pilot-close-built.png"), full_page=True); await b.close()
    print("sheet done")

asyncio.run(main())
