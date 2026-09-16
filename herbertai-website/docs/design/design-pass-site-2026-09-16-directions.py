# Three homepage direction boards built from Will's two references (16 Sep 2026):
# symphonyai.com (dark, bento of colour tiles, framed product screens) and
# wix.com/symphony (light, serif + heavy sans hero, AI agents as a named orbit).
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
D = Path(__file__).parent
PUB = D.parent.parent / "public" / "work"

DIRS = {
 "a": dict(name="Direction A. Light, from Symphony by Wix", note="Light grey ground, white panels, the hero as serif then heavy sans, a dark button with a lime chip, the AI employees as a named orbit in a lilac panel, colour in the tiles.",
   sw=[("#F3F3F1","ground"),("#1E1E1E","ink"),("#C8F35C","lime"),("#3B6CF6","blue"),("#F26B2E","orange"),("#DCD4F5","lilac"),("#2FBF9A","teal")],
   css="--bg:#F3F3F1;--panel:#FFFFFF;--ink:#1E1E1E;--muted:#5E5E5E;--line:#E2E2DE;--btn:#2B2B2B;--btn-fg:#F3F3F1;--chip:#C8F35C;--chip-fg:#1E1E1E;--team-bg:#DCD4F5;--team-fg:#1E1E1E;--close-bg:#141414;--close-fg:#F3F3F1;--t-blue:#3B6CF6;--t-orange:#F26B2E;--t-green:#C8F35C;--t-green-fg:#1E1E1E;--t-yellow:#FFC63D;--t-purple:#8B5CF6;--t-teal:#2FBF9A;--t-pink:#F5A3E1;--tile2:#1E1E1E;--tile2-fg:#F3F3F1;--h1a:'Instrument Serif',serif;--h1a-w:400;--h1a-ls:-0.02em;--h2c:var(--ink);--eyebrow-font:'Instrument Serif',serif;--eyebrow-size:26px;--eyebrow-tt:none;--eyebrow-ls:0;--eyebrow-open:'{';--eyebrow-close:'}'"),
 "b": dict(name="Direction B. Dark, from SymphonyAI", note="Near-black ground, white type in one grotesque, the house green as the only button, a bento of flat colour tiles with the product screens framed in their tile's colour, big numbers where the offer has them. The close is a green flood.",
   sw=[("#111111","ground"),("#FFFFFF","type"),("#00FF88","green"),("#0074E8","blue"),("#FF8A00","orange"),("#FFB600","yellow"),("#A933FB","purple")],
   css="--bg:#111111;--panel:#1A1A1A;--ink:#FFFFFF;--muted:#B0B0B0;--line:#2A2A2A;--btn:#00FF88;--btn-fg:#0A0A0A;--chip:#0A0A0A;--chip-fg:#00FF88;--team-bg:#1A1A1A;--team-fg:#FFFFFF;--close-bg:#00FF88;--close-fg:#0A0A0A;--t-blue:#0074E8;--t-orange:#FF8A00;--t-green:#00FF88;--t-green-fg:#0A0A0A;--t-yellow:#FFB600;--t-purple:#A933FB;--t-teal:#05D3AB;--t-pink:#FF5CA8;--tile2:#FFFFFF;--tile2-fg:#111111;--h1a:Geist,sans-serif;--h1a-w:700;--h1a-ls:-0.04em;--h2c:#00FF88;--eyebrow-font:'Geist Mono',monospace;--eyebrow-size:12px;--eyebrow-tt:uppercase;--eyebrow-ls:0.18em;--eyebrow-open:'';--eyebrow-close:''"),
 "c": dict(name="Direction C. Mixed, both references", note="Light ground for the page, the AI employee orbit and the close in near-black like Wix's team section, the SymphonyAI tile colours deepened for a light ground, the house green as the chip on a dark button. Serif then heavy sans in the hero.",
   sw=[("#F4F4F2","ground"),("#141414","ink"),("#00FF88","green"),("#0B5FD9","blue"),("#F07A12","orange"),("#06B894","teal"),("#8A2BE2","purple")],
   css="--bg:#F4F4F2;--panel:#FFFFFF;--ink:#1A1A1A;--muted:#5C5C5C;--line:#E3E3DF;--btn:#1A1A1A;--btn-fg:#FFFFFF;--chip:#00FF88;--chip-fg:#0A0A0A;--team-bg:#141414;--team-fg:#F4F4F2;--close-bg:#141414;--close-fg:#F4F4F2;--t-blue:#0B5FD9;--t-orange:#F07A12;--t-green:#00FF88;--t-green-fg:#0A0A0A;--t-yellow:#F5B400;--t-purple:#8A2BE2;--t-teal:#06B894;--t-pink:#E84393;--tile2:#1A1A1A;--tile2-fg:#F4F4F2;--h1a:'Instrument Serif',serif;--h1a-w:400;--h1a-ls:-0.02em;--h2c:var(--ink);--eyebrow-font:'Geist Mono',monospace;--eyebrow-size:12px;--eyebrow-tt:uppercase;--eyebrow-ls:0.18em;--eyebrow-open:'';--eyebrow-close:''"),
}

def board(k, d):
    sw = "".join(f'<div class="sw"><div class="chip" style="background:{h}"></div><div class="hex">{h}</div><div class="lab">{l}</div></div>' for h,l in d["sw"])
    return f"""
<section class="board" id="{k}" style="{d['css']}">
 <div class="head"><div><div class="bn">{d['name']}</div><div class="bnote">{d['note']}</div></div><div class="sws">{sw}</div></div>
 <div class="site">
  <nav><div class="mark">Herbert AI</div><div class="links"><span>How it works</span><span>What gets built</span><span>Industries</span><span>Pricing</span><span>About</span></div><div class="btn">Free AI audit<span class="arrow">&rarr;</span></div></nav>

  <div class="hero">
   <div class="hl">
    <h1><span class="l1">Less admin.</span><br><span class="l2">More money.</span><br><span class="l3">Built to run itself.</span></h1>
    <p class="sub">Custom software and AI for small businesses, built in Adelaide.</p>
    <div class="row"><div class="btn big">Book a free AI audit<span class="arrow">&rarr;</span></div><span class="ghost">Start a project &rarr;</span></div>
   </div>
   <div class="team">
    <div class="tt">Your AI employees</div>
    <div class="orbit">
     <div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div>
     <div class="core">H</div>
     <div class="dot d1" style="--c:var(--t-blue)"><i></i><b>Document chaser</b></div>
     <div class="dot d2" style="--c:var(--t-teal)"><i></i><b>Front desk assistant</b></div>
     <div class="dot d3" style="--c:var(--t-orange)"><i></i><b>Quote follow-up</b></div>
     <div class="dot d4" style="--c:var(--t-purple)"><i></i><b>Maintenance coordinator</b></div>
    </div>
    <div class="tc">One per job. Your team approves what goes out.</div>
   </div>
  </div>

  <div class="sec how">
   <div class="eyebrow">How it works</div>
   <h2>Start with the job that costs you most.</h2>
   <div class="tiles3">
    <div class="tile panel"><div class="num">45 min</div><h3>A free AI audit</h3><p>A written page: the three jobs eating the most hours, what each costs you a year, and which one to hand over first.</p><div class="price">Free</div></div>
    <div class="tile green"><div class="num">14 days</div><h3>Your first AI employee</h3><p>One job, live on your real data, or it&rsquo;s free. Your team approves anything that goes out.</p><div class="price">$3,500 fixed</div></div>
    <div class="tile ink"><div class="num">From $25k</div><h3>The system it runs in</h3><p>Files, comms and follow-ups on one system your team works out of every day. The pilot comes off the price.</p><div class="price">Scoped after the audit</div></div>
   </div>
   <div class="row"><div class="btn">Book a free AI audit<span class="arrow">&rarr;</span></div><span class="ghost u">See how it&rsquo;s priced</span></div>
  </div>

  <div class="sec work">
   <div class="eyebrow">The work</div>
   <h2>The systems, not the slides.</h2>
   <div class="bento">
    <div class="wt" style="--c:var(--t-blue);--fg:#fff"><div class="frame"><img src="file://{PUB}/property-dashboard.png"></div><div class="wtx"><span class="tag">Live, click in</span><h3>A property manager&rsquo;s dashboard</h3><span class="link">Open it &rarr;</span></div></div>
    <div class="wt" style="--c:var(--t-teal);--fg:#0A0A0A"><div class="frame"><img src="file://{PUB}/accountants-demo.png"></div><div class="wtx"><span class="tag">Demo, plays itself</span><h3>An accountant&rsquo;s document chaser</h3><span class="link">See it &rarr;</span></div></div>
    <div class="wt txt" style="--c:var(--t-orange);--fg:#0A0A0A"><div class="bigline">Every client file on one board.</div><div class="wtx"><span class="tag">Currently building</span><h3>An operations hub for a finance brokerage</h3><span class="link">See it &rarr;</span></div></div>
    <div class="wt txt" style="--c:var(--t-yellow);--fg:#0A0A0A"><div class="bigline">Ads written, tested and paused by the system.</div><div class="wtx"><span class="tag">Built</span><h3>A marketing engine</h3><span class="link">See it &rarr;</span></div></div>
    <div class="wt txt" style="--c:var(--t-purple);--fg:#fff"><div class="bigline">Bookings, website and payments in one.</div><div class="wtx"><span class="tag">Built</span><h3>A barbershop platform</h3><span class="link">See it &rarr;</span></div></div>
    <div class="wt txt" style="--c:var(--tile2);--fg:var(--tile2-fg)"><div class="bigline">Hear it take a call.</div><div class="wtx"><span class="tag">Live recording</span><h3>The voice receptionist</h3><span class="link">Play &rarr;</span></div></div>
   </div>
  </div>

  <div class="sec ind">
   <div class="eyebrow">Industries</div>
   <h2>Built for the office you actually run.</h2>
   <div class="ind4">
    <div class="ip"><div class="ih"><i style="background:var(--t-blue)"></i><h3>Accountants and bookkeepers</h3></div><div class="emp">An AI document chaser</div><p>Sends each client their own checklist, reminds them about only what is still missing, matches what comes back to the file.</p><div class="screen" style="--c:var(--t-blue)"><img src="file://{PUB}/accountants-demo.png"></div></div>
    <div class="ip"><div class="ih"><i style="background:var(--t-teal)"></i><h3>Allied health</h3></div><div class="emp">An AI front desk assistant</div><p>Collects intake forms before the first visit, chases the referral, sends recalls, follows up a missed appointment the same day.</p><div class="screen fake" style="--c:var(--t-teal)"><span>Intake form sent</span><span>Referral chased</span><span>Recall due Tue</span><span>No-show followed up</span></div></div>
    <div class="ip"><div class="ih"><i style="background:var(--t-orange)"></i><h3>Trades with an office</h3></div><div class="emp">An AI quote follow-up</div><p>Follows every quote up on a schedule, answers the common questions, flags the ones worth a call, hands the won job to the tech.</p><div class="screen fake" style="--c:var(--t-orange)"><span>Quote 1042 followed up</span><span>Customer replied</span><span>Worth a call</span><span>Job to Dave</span></div></div>
    <div class="ip"><div class="ih"><i style="background:var(--t-purple)"></i><h3>Real estate and property management</h3></div><div class="emp">An AI maintenance coordinator</div><p>Logs the tenant&rsquo;s request, gets the landlord&rsquo;s approval, dispatches the tradie, keeps everyone updated.</p><div class="screen" style="--c:var(--t-purple)"><img src="file://{PUB}/property-dashboard.png"></div></div>
   </div>
  </div>

  <div class="sec founder"><div class="ph">W</div><div><div class="eyebrow">Who builds it</div><p class="big">I&rsquo;m Will Herbert. I build every system myself, in Adelaide, and you deal with me from the audit to the day it goes live.</p><span class="ghost u">More about Will</span></div></div>

  <div class="close"><div><h2>Got a job everyone<br>hates doing?</h2><p>Forty five minutes, free, a written page back.</p></div><div class="right"><div class="btn inv">Book a free AI audit<span class="arrow">&rarr;</span></div><div class="mono">Will Herbert &middot; Adelaide<br>hello@herbert-aisolutions.com</div></div></div>
 </div>
</section>"""

CSS = """
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500&family=Instrument+Serif&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box} body{margin:0;background:#2a2a2a;font-family:Geist,-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
.board{width:1440px;margin:0 auto 60px;background:#2a2a2a}
.head{display:flex;justify-content:space-between;align-items:flex-start;gap:40px;padding:34px 40px 26px;background:#1c1c1c;color:#eee}
.bn{font-size:26px;font-weight:600;letter-spacing:-0.01em} .bnote{font-size:15px;color:#aaa;margin-top:8px;max-width:640px;line-height:1.45}
.sws{display:flex;gap:12px} .sw{text-align:center} .chip{width:84px;height:84px;border-radius:12px;border:1px solid #444} .hex{font-family:"Geist Mono",monospace;font-size:11px;margin-top:8px;color:#ddd} .lab{font-size:11px;color:#888}
.site{background:var(--bg);color:var(--ink)}
nav{display:flex;align-items:center;justify-content:space-between;padding:24px 48px} .mark{font-weight:800;font-size:20px;letter-spacing:-0.03em} .links{display:flex;gap:30px;font-size:15px;font-weight:500;opacity:.85}
.btn{display:inline-flex;align-items:center;gap:14px;background:var(--btn);color:var(--btn-fg);border-radius:14px;padding:12px 14px 12px 22px;font-weight:600;font-size:16px} .btn .arrow{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:9px;background:var(--chip);color:var(--chip-fg);font-size:18px} .btn.big{font-size:22px;padding:16px 16px 16px 28px;border-radius:16px} .btn.big .arrow{width:44px;height:44px;border-radius:11px} .btn.inv{background:var(--close-fg);color:var(--close-bg)}
.hero{display:grid;grid-template-columns:1fr 600px;gap:60px;align-items:center;padding:70px 48px 100px}
h1{margin:0;font-size:112px;line-height:.95;letter-spacing:-0.04em;font-weight:800} h1 .l1{font-family:var(--h1a);font-weight:var(--h1a-w);letter-spacing:var(--h1a-ls)} h1 .l2{color:var(--h2c)}
.sub{font-size:21px;color:var(--muted);margin:36px 0 34px;max-width:38ch;line-height:1.4}
.row{display:flex;align-items:center;gap:26px} .ghost{font-weight:500;font-size:16px} .u{text-decoration:underline;text-underline-offset:5px;text-decoration-color:var(--line)}
.team{background:var(--team-bg);color:var(--team-fg);border-radius:40px;padding:34px 34px 28px;height:560px;display:flex;flex-direction:column;align-items:center} .tt{font-weight:600;font-size:18px} .tc{font-size:14px;opacity:.75;margin-top:auto}
.orbit{position:relative;width:440px;height:420px;margin-top:10px} .ring{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border:1.5px dotted currentColor;opacity:.45;border-radius:50%} .r1{width:150px;height:150px} .r2{width:270px;height:270px} .r3{width:390px;height:390px}
.core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:58px;height:58px;border-radius:16px;background:var(--team-fg);color:var(--team-bg);display:grid;place-items:center;font-weight:800;font-size:22px}
.dot{position:absolute;display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;white-space:nowrap} .dot i{width:26px;height:26px;border-radius:50%;background:var(--c);border:5px solid var(--team-bg);box-shadow:0 0 0 2px var(--c);display:inline-block}
.d1{left:50%;top:14px;transform:translateX(-50%)} .d2{right:-10px;top:50%;transform:translateY(-50%);flex-direction:row-reverse} .d3{left:50%;bottom:14px;transform:translateX(-50%)} .d4{left:-40px;top:50%;transform:translateY(-50%)}
.sec{padding:110px 48px} .eyebrow{font-family:var(--eyebrow-font);font-size:var(--eyebrow-size);text-transform:var(--eyebrow-tt);letter-spacing:var(--eyebrow-ls);margin-bottom:18px;opacity:.85} .eyebrow::before{content:var(--eyebrow-open)} .eyebrow::after{content:var(--eyebrow-close)}
h2{font-size:72px;line-height:.98;letter-spacing:-0.04em;font-weight:800;margin:0 0 48px;max-width:40ch}
.tiles3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-bottom:44px} .tile{border-radius:26px;padding:34px;min-height:330px;display:flex;flex-direction:column} .tile.panel{background:var(--panel);border:1px solid var(--line)} .tile.green{background:var(--t-green);color:var(--t-green-fg)} .tile.ink{background:var(--tile2);color:var(--tile2-fg)}
.num{font-size:72px;font-weight:800;letter-spacing:-0.045em;line-height:1;margin-bottom:34px} .tile h3{font-size:24px;font-weight:600;letter-spacing:-0.01em;margin:0 0 10px} .tile p{font-size:15.5px;line-height:1.5;opacity:.8;margin:0} .price{margin-top:auto;padding-top:24px;font-family:"Geist Mono";font-size:11px;letter-spacing:.18em;text-transform:uppercase}
.bento{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px} .wt{background:var(--c);color:var(--fg);border-radius:26px;overflow:hidden;min-height:420px;display:flex;flex-direction:column} .frame{padding:22px 22px 0} .frame img{width:100%;height:230px;object-fit:cover;object-position:top;border-radius:14px 14px 0 0;display:block;box-shadow:0 -1px 0 rgba(0,0,0,.08)} .wtx{padding:22px 26px 26px;display:flex;flex-direction:column;flex:1} .tag{font-family:"Geist Mono";font-size:11px;letter-spacing:.18em;text-transform:uppercase;opacity:.8;margin-bottom:10px} .wt h3{font-size:22px;font-weight:600;letter-spacing:-0.02em;margin:0 0 18px} .link{margin-top:auto;font-size:14px;font-weight:600} .bigline{padding:30px 26px 0;font-size:40px;font-weight:800;letter-spacing:-0.035em;line-height:1;flex:1}
.ind4{display:grid;grid-template-columns:1fr 1fr;gap:18px} .ip{background:var(--panel);border:1px solid var(--line);border-radius:26px;padding:32px 32px 0;overflow:hidden;display:flex;flex-direction:column} .ih{display:flex;align-items:center;gap:12px;margin-bottom:12px} .ih i{width:12px;height:12px;border-radius:50%;display:inline-block} .ih h3{font-size:30px;font-weight:700;letter-spacing:-0.03em;margin:0} .emp{font-size:19px;font-weight:600;margin-bottom:8px} .ip p{font-size:15px;line-height:1.5;color:var(--muted);margin:0 0 22px;max-width:52ch}
.screen{margin-top:auto;background:var(--c);border-radius:18px 18px 0 0;padding:16px 16px 0;height:210px;overflow:hidden} .screen img{width:100%;height:100%;object-fit:cover;object-position:top;border-radius:10px 10px 0 0;display:block} .screen.fake{display:flex;flex-wrap:wrap;gap:10px;align-content:flex-start;padding:18px} .screen.fake span{background:rgba(255,255,255,.92);color:#111;border-radius:999px;padding:9px 14px;font-size:13.5px;font-weight:600}
.founder{display:grid;grid-template-columns:200px 1fr;gap:56px;align-items:start} .ph{width:200px;height:200px;border-radius:28px;background:var(--panel);border:1px solid var(--line);display:grid;place-items:center;font-weight:800;font-size:56px} .big{font-size:22px;line-height:1.45;max-width:60ch;margin:0 0 22px}
.close{padding:150px 48px;background:var(--close-bg);color:var(--close-fg);display:grid;grid-template-columns:7fr 5fr;gap:64px;align-items:end} .close h2{margin:0;color:var(--close-fg)} .close p{font-size:19px;opacity:.7;margin:32px 0 0} .right{display:flex;flex-direction:column;align-items:flex-end;gap:22px} .mono{font-family:"Geist Mono";font-size:11px;letter-spacing:.18em;text-transform:uppercase;opacity:.55;text-align:right;line-height:1.7}
</style>"""

html = "<!doctype html><meta charset=utf-8><title>Design pass, direction boards from the two references, 16 Sep 2026</title>" + CSS + "<body>" + "".join(board(k, v) for k, v in DIRS.items()) + "</body>"
(D / "design-pass-site-2026-09-16-directions.html").write_text(html)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 1520, "height": 1000}, device_scale_factor=1.5)
        await pg.goto(f"file://{D}/design-pass-site-2026-09-16-directions.html")
        await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(2500)
        print("fonts:", sorted(set(await pg.evaluate("[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family)"))))
        for k in DIRS:
            await pg.locator(f"#{k}").screenshot(path=str(D / f"design-pass-site-2026-09-16-direction-{k}.png"))
        await b.close()
asyncio.run(main())
print("ok")
