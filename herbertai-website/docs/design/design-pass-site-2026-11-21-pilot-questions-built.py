# /pilot section 6, Questions, as built (Will, 21 Nov 2026: "A, folded"). Checks
# the real page at 1440, 1280, 375 and 320, motion on and off: no overflow, no
# page or console errors, no word alone on a line in the section, the FAQPage
# data carrying the same twelve questions the section shows, and a closed
# question opening on a click (its answer shown, the sign turned to a minus).
# Then the as-built sheet: the section at each width, and at 1440 with a second
# question opened. Pass an output folder as the first argument.
import asyncio, json, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent
A = D / "assets-2026-11-21"; A.mkdir(parents=True, exist_ok=True)
EXE = os.path.expanduser("~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell")
LAUNCH = {"executable_path": EXE} if os.path.exists(EXE) else {}

SEC = "section:has(h2:text-is('Before you book.'))"
TIDY_JS = r"""(sel) => { const s = document.querySelector(sel); const out = [];
  for (const el of s.querySelectorAll('h2, h3, p')) { if (!el.offsetParent || !el.getClientRects().length) continue;
    const tn = []; const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); while (w.nextNode()) tn.push(w.currentNode);
    const words = []; for (const n of tn) { const re = /\S+/g; let m; while ((m = re.exec(n.data))) { const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length); const b = r.getBoundingClientRect(); if (b.width) words.push({ t: m[0], top: Math.round(b.top) }); } }
    if (words.length < 3) continue; const tops = [...new Set(words.map(x => x.top))]; if (tops.length < 2) continue;
    const last = Math.max(...tops); const on = words.filter(x => Math.abs(x.top - last) < 4); if (on.length === 1) out.push(on[0].t); }
  return out }"""


async def main():
    errs, over, tidy, facts = [], [], [], []
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
                sel = "section:has(> div > h2)"
                w = await pg.evaluate(TIDY_JS.replace("document.querySelector(sel)", "[...document.querySelectorAll('section')].find(x => x.querySelector('h2')?.textContent.trim() === 'Before you book.')"), None)
                if w: tidy.append(f"{vw} {motion}: {w}")
                if vw == 1440 and motion == "no-preference":
                    shown = await pg.evaluate("() => [...[...document.querySelectorAll('section')].find(x => x.querySelector('h2')?.textContent.trim() === 'Before you book.').querySelectorAll('summary h3')].map(h => h.textContent.trim())")
                    ld = await pg.evaluate("() => [...document.querySelectorAll('script[type=\"application/ld+json\"]')].map(s => s.textContent)")
                    faq = [j for j in (json.loads(x) for x in ld) if isinstance(j, dict) and j.get("@type") == "FAQPage"]
                    names = [q["name"] for q in faq[0]["mainEntity"]] if faq else []
                    facts.append(f"questions shown {len(shown)}, in FAQPage {len(names)}, identical {shown == names}")
                    opened = await pg.evaluate("() => [...document.querySelectorAll('details')].filter(d => d.open).length")
                    facts.append(f"open on load: {opened}")
                    s = pg.locator(SEC)
                    await s.scroll_into_view_if_needed(); await pg.wait_for_timeout(200)
                    await s.screenshot(path=str(A / "pilot-questions-built-1440.png"))
                    tgt = pg.locator("summary:has(h3:text-is('Is my clients’ information safe?'))")
                    await tgt.click(); await pg.wait_for_timeout(200)
                    st = await pg.evaluate("""() => { const d = [...document.querySelectorAll('details')].find(x => x.querySelector('h3').textContent.trim() === 'Is my clients’ information safe?');
                      const p = d.querySelector('p'); const minus = [...d.querySelectorAll('summary span')].find(x => x.textContent.trim() === '−');
                      return [d.open, p.getBoundingClientRect().height > 0, getComputedStyle(minus).display !== 'none'] }""")
                    facts.append(f"click opens: open {st[0]}, answer shown {st[1]}, minus shown {st[2]}")
                    await s.screenshot(path=str(A / "pilot-questions-built-1440-opened.png"))
                elif motion == "no-preference":
                    s = pg.locator(SEC)
                    await s.scroll_into_view_if_needed(); await pg.wait_for_timeout(200)
                    await s.screenshot(path=str(A / f"pilot-questions-built-{vw}.png"))
                await ctx.close()
        await b.close()
    print("errors:", errs or "none"); print("overflow:", over or "none"); print("tidy:", tidy or "clean")
    for f in facts: print(f)
    shots = [("1440", 920), ("1440-opened", 920), ("1280", 920), ("375", 250), ("320", 220)]
    imgs = "".join(f'<figure><figcaption>{k.replace("-opened", ", a second question opened")}</figcaption><img src="assets-2026-11-21/pilot-questions-built-{k}.png" style="width:{w}px"></figure>' for k, w in shots)
    html = f"""<!doctype html><meta charset=utf-8><title>/pilot Questions, as built</title><style>
body{{margin:0;background:#151515;color:#eee;font:14px/1.45 -apple-system,Helvetica,Arial,sans-serif;padding:36px 40px}} h1{{font-size:26px;margin:0 0 8px;font-weight:600}} .intro{{color:#aaa;max-width:1220px;margin:0 0 18px}}
.wrap{{display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start}} figure{{margin:0}} figcaption{{color:#aaa;margin-bottom:6px}} img{{display:block;border:1px solid #333}}</style><body>
<h1>/pilot section 6, Questions, as built (Will, 21 Nov 2026: A, folded)</h1>
<p class="intro">The real page at 1440, 1280, 375 and 320. The twelve questions owners ask, folded, the first open; the FAQPage data carries the same twelve. {' · '.join(facts)}.</p>
<div class="wrap">{imgs}</div></body>"""
    f = D / "design-pass-site-2026-11-21-pilot-questions-built.html"; f.write_text(html, encoding="utf-8")
    async with async_playwright() as p:
        b = await p.chromium.launch(**LAUNCH); pg = await b.new_page(viewport={"width": 1300, "height": 1000})
        await pg.goto(f.as_uri()); await pg.wait_for_timeout(800)
        await pg.screenshot(path=str(D / "design-pass-site-2026-11-21-pilot-questions-built.png"), full_page=True); await b.close()
    print("sheet done")

asyncio.run(main())
