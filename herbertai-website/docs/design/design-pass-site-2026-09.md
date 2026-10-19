# Design pass: the organic site (herbert-aisolutions.com)

Started 16 Sep 2026, after M1 of docs/restructure-2026-09/PROJECT.md put the
ladder structure and copy on preview/ladder-restructure. Track: EXPRESSIVE
(marketing site; the charter's art-directed studio register). Will, 16 Sep:
"i dont like the pages in terms of colour and structure", "on the home page
its too wordy". The wordiness was cut the same day (fb6801e); colour and
structure are this pass.

Order, per design-taste: whole-site decisions first (palette, typeface,
density), then home section by section with three options each, then /pilot
and /pricing, then /work, /industries/*, /about. Nothing is built before Will
picks. No marketing-site register exists in design-taste yet; it gets written
from this pass's decisions at capture.

## Roadmap (the design pass roadmap, design-taste loop/roadmap.md)

Added 17 Oct 2026 (Will: "lets have a segmented phased approach/roadmap when
doing a design pass of a build"). The state of this pass at a glance; the
entries below it are the history. `[ ]` not started, `[~]` under way, `[x]`
done. Updated in the same commit as the work.

| Phase | State | Where it stands |
|---|---|---|
| 0. Charter | [x] | `CHARTER.md`, rewritten 22 Sep 2026 around "Runs itself" |
| 1. Concept | [x] | "Runs itself" picked over "Now hiring", 22 Sep 2026 |
| 2. Skeleton | [x] | Settled 14 Oct 2026; seven sections from 15 Oct (The Work folded into Operating Systems) |
| 3. Sections | [x] | All seven sections picked, built and detailed; Book the Audit done 20 Oct 2026 |
| 4. Whole page | [~] | 20 Oct: Founder moved to the bottom; open: the contact line beside the founder note, the repeated line, the motion run, the May footer |
| 5. Phones | [~] | AI Employees, Operating Systems, Products, Who Builds It and Book the Audit signed off as phone designs (to 20 Oct); Hero and How It Works unchecked |
| 6. Words and claims | [~] | Figures framed as worked examples with no labels; "Herbert Reach" settled 17 Oct (registers clear; always in full, since bare REACH is a live mark); "Herbert OS" still needs its checks; Herbert Reach sold as defined, marked In development, no link out (19 Oct) |
| 7. Other pages | [ ] | Industry pages on the new slugs, the AI Employees page, a Herbert Reach page, pricing, about |
| 8. Walkthrough and ship | [ ] | Lab removed, preview/runs-itself merged, production checked |

Phase 3, section by section (facts, options, pick, build, details):

| Section | Facts | Options | Pick | Build | Details | Where it stands |
|---|---|---|---|---|---|---|
| 1. Hero | n/a | [x] | [x] | [x] | [x] | Spacing and header details, 10 Oct |
| 2. How It Works | n/a | [x] | [x] | [x] | [x] | Five details, 11 and 12 Oct |
| 3. AI Employees | [x] | [x] | [x] | [x] | [x] | Five details and the avatar motion, 16 Oct |
| 4. Operating Systems | [x] | [x] | [x] | [x] | [x] | Value model 15 Oct; details 16 and 17 Oct; phone version on phones |
| 5. Products | [x] | [x] | [x] | [x] | [x] | Six details, 19 Oct 2026: Will’s line, his story as the facts, the full-product dashboard, In development in place of the note and link, the full-product phone version |
| 6. Who Builds It | [x] | [x] | [x] | [x] | [x] | Three details, 19 Oct 2026: said flat under Founder, no photo; the link to About and the phone layout kept |
| 7. Book the Audit | [x] | [x] | [x] | [x] | [x] | Four details, 20 Oct 2026: Will’s heading, one line for the facts, the hero’s button words and no small print, the phone kept |

## [~] M4.1 Whole-site decisions (options shown 16 Sep 2026)

### Scout

Seven references, hero at 1440 wide, captured with Playwright on 16 Sep 2026.
Sheet: `design-pass-site-2026-09-16-scout.png` (on disk, not committed; the
captures are third-party pages). Judged for what Herbert is trying to do: sell
a free audit and show working software, from one person in Adelaide.

1. Humaan, Perth (humaan.com). Warm off-white ground, one giant grotesque,
   deep green ink, a lime mark, pill nav, Lenis smooth scroll, video work
   panels. The closest cousin to the site now, with the green turned down.
2. Bakken & Baeck, Oslo (bakkenbaeck.com). Pure white, one sans, a two line
   sentence as the whole hero, client logos, work tiles with video. No
   decoration. A studio that builds products for others, including AI ones.
3. Mercury (mercury.com). Photographic dark hero, one blue button, custom
   sans, a long page of product screenshots. Sells software to small business
   owners at a premium.
4. Significa, Porto (significa.co). White page, big black grotesque, project
   thumbnails, then a row of flat colour-block tiles. Colour lives in the
   work, not the page.
5. Sanctuary Computer, NYC (sanctuary.computer). Blurred video behind a one
   sentence hero, the studio name in a display serif, client logos, an odd
   instrument widget. The stretch on tone.
6. Metalab (metalab.com). Black, a chrome 3D object, serif "We make
   interfaces", client pills, smooth scroll. The dark studio, included so the
   dark option is judged against the real thing.
7. Raw Materials (therawmaterials.com). Colour-block tile grid, giant
   grotesque, every section its own flat colour. Already in the swipe file.

### Palette, rendered on the real homepage

Boards: `design-pass-site-2026-09-16-{today,p1,p2,p3}.png`, generated by
`design-pass-site-2026-09-16-palettes.py` into `...-palettes.html`. Each is
the M1 homepage (nav, manifesto hero, how it works, the work, industries,
founder, close) at 1440 wide in Bricolage Grotesque and Geist, swatches at
104px above. The structure is held still on purpose so only the colour
differs; structure is the next round.

- Today, what ships now: cream #F5F0E5, ink #0A0A0A, neon green #00FF88
  (#00D924 on cream), ink close.
- Option 1, paper, ink and deep green: paper #FAFAF7 and #F1F0EA, warm-grey
  ink #151719, muted #6A6D6B, one deep green #0B7A3E for the button, the
  eyebrows, the second manifesto line and the closing flood (white type on
  it). The same green Will picked for the paid landing pages (S3, 11 Sep),
  so the two lanes match.
- Option 2, warm charcoal ground: charcoal #17181A and #1E1F22, bone type
  #F4F1EA, muted #9C9A93, the house neon #00FF88 kept as the only colour
  because it reads on dark; the work section flips to bone so screenshots
  read; the close flips to bone with an ink button.
- Option 3, colour blocks: every section its own flat colour. Sand #EDE4D3
  hero, deep green #0F5C3A how it works with bone type, bone #F8F5EE work,
  ink #141414 industries, sand founder, hot orange #FF4D1C close and button.
  The Raw Materials and Significa move. The stretch.

Recommendation: Option 1. Reasons: Will called the neon "a bit harsh" on the
paid pages and picked deep green there; Humaan shows warm-white plus deep
green plus a giant grotesque reading as AU studio craft; it is the least
work to carry across every page; it keeps the site off the three
anti-references (HQ, Linear, SMB template). Option 2 is the strongest look
but drifts toward the dark-studio register the charter set aside, and every
screenshot needs a light section. Option 3 is the most distinctive and the
most work, and orange next to green needs a firm hand on every page.

### Typeface and density, shown large

Board: `design-pass-site-2026-09-16-type.png`. The three manifesto lines at
120px in each candidate, Option 1 palette throughout.

- T1, Bricolage Grotesque 800 display plus Geist body. What ships now.
- T2, Geist only, 700 display with tight tracking. One family everywhere,
  the Bakken & Baeck and Significa move. Quieter, more product-like.
- T3, Instrument Serif roman display plus Geist body. Warmer, older-feeling,
  the Metalab and Sanctuary flavour; sits closer to HQ, an anti-reference.

Recommendation: keep T1. Bricolage is the one thing on the site that reads
as a studio rather than a product, and the manifesto lines were set in it.

Density: the same two sections at today's spacing (130 to 200px between
sections) and tighter (80 to 120px). Recommendation: tighter. Will's
complaint was getting sick of reading; less air between sections shortens
the page without cutting more words.

Will's pick (16 Sep 2026): "i like these two pages: https://www.symphonyai.com/ and
https://www.wix.com/symphony". Neither palette option was picked; the references are
the direction and the bar. Saved to design-taste swipe as
`expressive-bento-symphonyai.png` and `expressive-bento-wixsymphony.png`.

### The two references, dissected

- SymphonyAI (symphonyai.com): near-black ground (#1A1A1A, #000), white Inter, a
  3D animated hero with a scroll-swapped word, then a bento of flat colour tiles
  (blue #0074E8, orange, yellow #FFB600, teal #05D3AB, purple #A933FB, photos with
  colour overlays) carrying big numbers, then one section per industry with a
  coloured dot, three stats in that colour, the product screen framed in a
  rounded panel of that colour, and a pill button in it. GSAP.
- Symphony by Wix (wix.com/symphony): light grey ground (#F3F3F3), the hero as a
  serif regular line then a heavy sans line, eyebrows as {serif in braces}, a
  dark button with a lime arrow chip, AI agents drawn as a named orbit of
  coloured dots (Cal, Quinn, Pax, Remi) in a lilac panel and again on black, a
  marquee of colour tiles with numbers, split colour panels (olive, lilac),
  product mocks in coloured frames. Sells "a full team of AI agents" to small
  business, which is the AI employee framing.
- Shared, and so the thing to clone: AI employees as a named team; colour as flat
  tiles, several of them, not one accent; the product screen framed in its
  tile's colour; a neutral grotesque; big numbers on tiles; rounded panels.
  Where they differ is the ground: one dark, one light.

### Direction boards (16 Sep 2026)

`design-pass-site-2026-09-16-direction-{a,b,c}.png`, from
`design-pass-site-2026-09-16-directions.py`. Each is the homepage restructured to
the references, not just recoloured: manifesto beside an "AI employees" orbit
panel naming the four pilot employees; how it works as three number tiles (45
min, 14 days, from $25k, offer numbers, never proof numbers); the work as a
six-tile bento with the two real screenshots framed in their tile colour and the
other four as text tiles; industries as four panels with a colour dot each and a
framed screen; founder; close. Type is Geist throughout (Inter-like, matching
both references), Bricolage dropped; the serif line in the hero is Instrument
Serif, already loaded.

- A. Light, from Symphony by Wix: light grey ground, white panels, serif then
  heavy sans hero, dark button with a lime chip, lilac orbit panel, Wix tile
  colours (lime, blue, orange, yellow, purple, teal), dark close.
- B. Dark, from SymphonyAI: near-black ground, white type, the house green as the
  only button and the second manifesto line, SymphonyAI tile colours, white
  panels for the audit tile and the receptionist tile, green flood close.
- C. Mixed, both: light ground, the orbit panel and the close in near-black, the
  SymphonyAI tile colours deepened for a light ground, the house green as the
  chip on a dark button and as the 14-day tile, serif then heavy sans hero.

Recommendation: C. It keeps the two live demos (both white UIs) readable on a
light page, gives the SymphonyAI weight to the two places it matters (the team
panel and the close), keeps the house green in the site without leaning on it,
and gives each industry its own colour to carry onto its page and its demo. B is
the boldest and the closest clone but the white product screens fight a dark
ground everywhere; A reads more like Wix's own brand than Herbert's.

Flags: this leaves the May 2026 charter (cream, ink, neon, Bricolage) entirely;
CHARTER.md gets rewritten after the pick. The orbit panel puts "AI employees" on
the home hero, within the research's bound (the four named employees are what a
pilot delivers). Stat tiles from SymphonyAI cannot be copied with client
results; the tiles carry offer numbers only.

Will, 18 Sep 2026, on the three direction boards: "none of these really look
that good - i meant to use those references as an entire design reference, not
just colour, can u show 3 mockups of what the entire site could look like when
trying to use them as reference, and then maybe i can work on them per segment".
Lesson for the register: when Will names a reference, clone its composition
(sections, objects, rhythm, nav, type treatment), not its palette on the
existing page.

### Full homepage clones (18 Sep 2026)

`design-pass-site-2026-09-18-clone-{m1,m2,m3}.png`, from
`design-pass-site-2026-09-18-clones.py`. Each is the whole homepage composed
the way the reference composes its own, with Herbert's content.

- Mockup 1, SymphonyAI cloned: announcement bar, dark nav with a blue pill,
  centred hero with the swapped word ("Our software knows [accountants]") and
  the lit rails (a CSS stand-in for their 3D render), a three-card strip with
  coloured underlines, a stat bento on black (offer numbers and the two
  screenshots), one block per industry with a coloured dot, three points in
  that colour, a pill button and the screen framed in the colour, a "system it
  runs in" block, a centred close.
- Mockup 2, Symphony by Wix cloned: floating pill nav, serif-then-heavy hero
  with the big dark button and lime chip beside the lilac orbit panel, brace
  eyebrows, the tile marquee around a phone, the grey split with the labelled
  orbit, the two-tone panel with notification cards, three grey columns, the
  giant sans-and-serif heading, the dark team orbit with the four employees
  named, the numbered steps with the audit as a chat frame.
- Mockup 3, both composed as one page: Wix's nav, hero, chip button (house
  green) and team orbit on near-black; SymphonyAI's card strip, stat bento and
  four industry blocks on black; Wix's numbered steps; the giant heading as the
  close on black.

Stand-ins to note: the SymphonyAI hero object is CSS, not a 3D render; the
references' photos of people are replaced by colour or product screens until
there are photos; the notification cards, phone and chat frames carry made-up
example states, none of them client results.

Will, 18 Sep 2026, on the clones: "i think we disregard these, and restart from
the very start in the site rebuild, these dont look too great either. im
wondering how my loop started, initially you get references similar to the
vertical, and then i choose and we go from there? what did i do with rob".

Restart. What went wrong, for the record: the 16 Sep scout was heroes only
and never got a reaction; the two references Will then named were answered
with palette boards and then with static CSS mockups of the existing page
structure, and those sites look the way they do because of 3D renders, video,
photography and motion, none of which a static board can carry. The loop as
written says: scout, gut pick, dissect, clone in the real app, steer section
by section with the picked site as the bar. Whole-app decisions after the
pick, never before it.

## [~] Restart: scout, round two (18 Sep 2026)

Seven AI-for-business sites, full pages captured at 1440 (scratchpad
`scout2/`, sheet `design-pass-site-2026-09-18-scout2.png`): SymphonyAI and
Symphony by Wix (Will's two, kept), Sierra, Lindy, Relevance AI, Fin, Harvey
(the stretch). Cookie banners dismissed with reject or close only, never
accept. Will picks by gut; then the charter is rewritten from the pick and
the hero is built for real on a preview branch, motion included, with the
pick as the bar. The M1 site stays live meanwhile.

Will, 18 Sep 2026, on the scout: "idk how i feel about any of these to be honest.
idk how they would compare in the Herbert AI context ... maybe u can do mockups
of what it would look like based off each of these?"

### The lab (18 Sep 2026)

Seven mockups built as real pages with the motion running, one per reference,
on branch `preview/design-lab` under `/lab` (index) and `/lab/<slug>`:
symphonyai, wix-symphony, sierra, lindy, relevance, fin, harvey. Each is the
first screens of the Herbert AI homepage composed the way that reference
composes its own. Not indexed, not in the nav or sitemap, header and footer
hidden, a strip along the bottom switches between the seven. A roman cut of
Instrument Serif loads for the lab only (the site loads italic only). Verified
on the dev server: lint and build clean, console clean, no horizontal overflow
at 375 on any of the seven. Known stand-ins: Sierra's hero needs real footage
of a person or an office and has a labelled blur instead; the knot and the
rails are drawn, where the references use 3D renders; figures in the Relevance
mock are sample data and say so. Headlines vary to fit each reference's
mechanic; the locked manifesto returns once a direction is picked. Delete
`/lab` and `components/lab` after the pick.

Will, 18 Sep 2026, on the lab: "the thing with these demos is its just a copy of
these sites. nothings original ... what are the steps for original design,
there has to be some sort of basis at the start right?"

### The missing step: a concept (18 to 22 Sep 2026)

The loop went positioning, scout, pick, clone. It has no step where an idea
about the business is decided before any reference is looked at, which is
why every round came back as someone else's site with Herbert's words in it.
Steps for original work, as put to Will: a truth inventory (what is literally
true and specific: one person in Adelaide, the job everyone hates, a written
page in their own numbers, one AI employee with a person approving, live in
14 days or free, they own it, real systems to click); one concept sentence
that dramatises one truth, tested by whether the pricing page can be
described from it alone; a design language derived from the concept (one
signature device, what colour means, what motion means, what pictures are
of); references last, per layer, from outside the category; then the section
loop. To be added to design-taste as the step before the scout.

Three territories offered: "Now hiring" (the site as an employer's positions
board turned around), "The written page" (the audit report as the motif),
"Runs itself" (the site is the running system). Recommended "Now hiring".

Will, 22 Sep: "what does runs itself vs now hiring look like". Built as real
pages in the lab, `/lab/concept-now-hiring` and `/lab/concept-runs-itself`,
each with its device running (the position description filling itself in and
a stamp landing; the board of jobs completing with colour meaning only state)
and a strip showing how industries, pricing, the work and the audit or about
page follow from the idea. "Runs itself" keeps the locked manifesto as its
headline; "Now hiring" changes the headline and would need Will's yes on that.

Will's pick (22 Sep 2026): "i think the runs itself", and "add the concept step
as well". Concept step added to design-taste as `loop/concept.md`; SKILL.md,
master.md, scout.md and anti-patterns.md changed to match (claude-skills
04b2aa3). CHARTER.md rewritten around the concept. Now hiring stays in the lab
as a record; its position card may come back as a device on the industry pages.

## [~] M4.2 Home: the hero (options 22 Sep 2026)

Three hero options for "Runs itself", each also carrying one of the open
whole-site decisions (typeface, ground, the board's form), so one pick settles
the hero and those three. Each takes its board from a different object outside
the category, per the concept step. Live at `/lab/runs-itself-hero`, stacked,
each starting when it scrolls into view.

- A. The product window: light paper, Geist throughout, the board as a clean
  software window beside the manifesto. What the concept page showed.
- B. The departures board: light paper, Geist headline, the board as an airport
  split-flap board in Geist Mono, full width under the manifesto, letters
  flipping as each job lands.
- C. The andon board: dark ground, Bricolage display kept from the May site,
  three big lamps with counts (done, waiting on a person, queued) like a
  factory floor andon board, a ticker of the latest job beneath.

6 Oct 2026: a Run again button added to each option on Will's "rerun these".

Will's pick (6 Oct 2026): "i think B is cool, but the whole point of it is to
showcase the product is it not? so only A really makes sense". **A.** That
settles the three open whole-site decisions: Geist throughout, light paper
ground (#FAFAF8), and the board shown as the software itself. Register rule:
the hero's device shows the product, not a metaphor for it (design-taste
`registers/marketing-site.md`).

Built on branch `preview/runs-itself` (cut from the lab branch, main merged
in): `components/Hero.js` rewritten, the board engine moved to
`components/runs/board.js` and the homepage board to
`components/runs/HeroBoard.js`, the header takes the paper ground on `/` only
until the nav gets its own round. The rest of the homepage is still the May
register until its sections come up. `/start` loses its hero link and stays
linked from the footer and pricing. The seven reference clones and the lab's
roman serif were removed from the lab.
Verified on the dev server and in a visible headless browser: lint and build
clean, no console errors, the board starts within a second and finishes by
twelve, no horizontal overflow at 1440 or 375, reduced motion shows the
finished day at once.

Bar round (6 Oct 2026): ours against lindy.ai's first screen at 1440x900,
labels stripped, fresh Sonnet critic. Verdict: ours (B). Gap in the bar: its
product sits below the fold, so the first screen is a claim and logos. Gap in
ours: nothing proves the board is real, because it is "an example office" with
no client name or result. That gap is the deliberate cost of the no client
names, no proof numbers rule (Grain #15); the candidate fix that keeps the rule
is a link from the board to a demo that runs for real, offered to Will as a
tweak, not built.

Tweaks, round 1 (6 Oct 2026). Will: "what does add the demo link or bigger
board look like - can u do the 3 screenshots of the differences for each
section, like u are doing with robs build". So from here every section and
detail goes the Smith way: three options drawn on the real page (changed in the
browser only, the app untouched), stacked on one labelled board with today's
version for reference and zoomed crops where the difference is small, sent as a
PNG. Live pages only when the option is motion.

- Demo link (`design-pass-site-2026-10-06-hero-demo-link.png`): 1 under the
  board, a plain text link; 2 inside the window, a footer bar "This is an
  example office" with "Watch one run for real" (recommended); 3 beside the
  button, a line linking all four demos (a second action, and three of the four
  demos still wait on Will's approval).
- Bigger board (`design-pass-site-2026-10-06-hero-board-size.png`): 1 wider,
  about 60 percent with the headline at 72px; 2 full width under the headline,
  the sub-line and button beside the headline (recommended); 3 off the edge,
  larger and cut by the right edge of the screen.
- Generated by `design-pass-site-2026-10-06-hero-tweaks.py` against the dev
  server; raw captures in `assets-2026-10-06/`.

Also 6 Oct, Will: "lets make the Herbert AI in the top left Herbert AI instead
of herbert ai". Done in the header and the phone menu's header. The footer's
large "herbert ai." is not top left and is unchanged pending Will.

Will: "and then we should go through each little detail as well, like fonts,
spacing, etc." The hero's detail pass runs after the two tweak picks, one
detail at a time, three options each:
1. The logo mark: the black "h" tile still carries the May register's neon dot
   and green glow; under "colour means state" a green dot reads as "done".
2. Headline weight and letter spacing (Geist 700 at -0.045em today).
3. Headline size and line spacing.
4. Sub-line size, colour and position.
5. The button: shape and size, and the "45 minutes" note beside it.
6. Board type: the mono labels, the row text size, the state colours.
7. Spacing: above the headline, between the headline and the board, below
   the hero.
8. Header: nav size and weight, and the header button, which says "Free AI
   audit" with an arrow while the hero's says "Book a free AI audit".

Will, 6 Oct 2026, on the boards: "what 'demo' ? is this not the demo right
there. and why is done on the right and the approved are to the left?"

- Demo link: dropped. The board is the demo; the `/demo/*` pages are a longer
  version of the same made-up example (one firm's season with the emails), made
  for Harry to send prospects, so a link from the board proves nothing the
  board does not. The critic's "nothing proves it is real" gap is answered, if
  at all, by the work section further down (the live property dashboard), in
  its own round. Recorded as a rule candidate: on the homepage, the product
  shown is the demo; do not link out to another example of it.
- Status alignment: a real defect, fixed. Each board row is its own grid, so
  an auto-width status column took each row's own text width and short "Done"
  sat further right than long "Approved by Sarah, sent". The column is now a
  fixed 164px and every status dot starts at the same x (measured: all seven at
  1127px at 1440 wide). Cost: at today's board width the job text wraps to two
  lines, which strengthens the bigger-board tweak. The size board was redrawn
  with the fix.

Picks (6 Oct 2026), Will: "1, and yes make the footer Herbert AI too". Board size
option 1, wider: the board takes about 60 percent, the headline at
clamp(48px, 5vw, 72px), board rows at 15px. Building it found one more thing:
at 1024 wide the board's fixed columns squeezed each job to three or four lines,
so the side-by-side layout starts at 1280 (xl) and narrower screens stack the
headline above a full-width board. Checked at 1440, 1280, 1024, 768 and 375: no
horizontal overflow, statuses aligned, no console errors. Footer wordmark is
now "Herbert AI" (its green dot stays until the logo-mark detail).

Will, 6 Oct 2026: "what would the demo page actually look like? is it just the
same board but goes through more steps, or is there more". Answered with phone
captures of `/demo/accountants?for=Henderson & Co` at four moments (opens,
partway, done, an email opened). The demo is one industry in depth: the
prospect's firm name, a client list with per-client progress, one client's
timeline on a play bar, and the real email that client receives on tap. It is
drawn in the ops-tool look (Inter, indigo for sent), not the new site's.

## [~] Hero detail 1: the logo mark (options 6 Oct 2026)

Board: `design-pass-site-2026-10-06-logo-mark.png`, from
`design-pass-site-2026-10-06-logo-mark.py`. Today: the May register's black "h"
tile with a neon dot and a green glow. 1 wordmark only; 2 the tile kept, redrawn
in Geist, dot and glow removed; 3 the wordmark followed by the board's green
lamp, as if the business itself is running (recommended; it bends "green means
done" into "green means running"). The footer and the phone menu follow the
pick.

Will's picks (6 Oct 2026): "the demo do option 1 for the link then", and "i
like todays detail". So the demo link comes back after all, as option 1, the
plain link under the board ("See it run for an accounting firm"), once Will
saw the demo is one industry in depth rather than the same board; it goes to
`/demo/accountants` with no firm name, which reads "Demo prepared for your
business". The logo mark stays as today, recorded in the charter as the one
exception to "colour means state".

## [~] Hero detail 2: headline weight and letter spacing (options 6 Oct 2026)

Board: `design-pass-site-2026-10-06-headline-weight.png`. Today: Geist 700 at
-0.045em. 1 Geist 600 at -0.04em (recommended: the board reads as the
subject); 2 Geist 500 at -0.03em, the quietest; 3 Geist 800 at -0.05em, the
heaviest, which pushes "More money." onto two lines at 1440 and needs Geist 800
added to layout.js. Generated by `design-pass-site-2026-10-06-headline-weight.py`.
Will's pick (6 Oct 2026): "today". Geist 700 at -0.045em stays.

## [~] Hero detail 3: headline size and line spacing (options 6 Oct 2026)

Board: `design-pass-site-2026-10-06-headline-size.png`. Today: 72px at 1440
(clamp 48 to 72px), line height 0.95, four lines. 1 smaller, 60px at 1.0;
2 same size, looser lines at 1.05; 3 same size, tighter lines at 0.88
(recommended: one dense block that matches the bold weight Will kept). A bigger
size is not offered: measured at 1440, 72px is the largest that keeps four
lines beside the wider board, and 73px breaks a line (80px gave six lines on
the first draw). Generated by `design-pass-site-2026-10-06-headline-size.py`.
Will's pick (6 Oct 2026): "today". 72px at line height 0.95 stays.

## [~] Hero detail: how the text lines up with the board (options 6 Oct 2026)

Will, 6 Oct: "in designing web pages, i assume theres good design behind how
you align elements and stuff? ie having the text centred to the demo on the
right or whatever?" Measured at 1440: the left edge (logo, headline, button) and
the right edge (header button, board, demo link) already line up exactly; the
button sits 3px off the board's bottom by luck, and the headline's capitals
start 22px below the board's top, a near miss. Board:
`design-pass-site-2026-10-06-alignment.png`, each option clean and with pink
guide lines. 1 tops aligned (capitals on the board's top edge); 2 centred on
the board; 3 both edges, capitals on the top edge and the button on the bottom
edge, the gap above the button stretching to fit (recommended). Measured after
drawing: option 1 top 0px, option 3 top 0px and bottom 0px. Notes for whoever
builds it: the capitals start 0.118em below the headline's box (measured from
pixels; canvas font metrics were unreliable), and the page applies margin
changes with a short delay, so the board script converges in settled steps.
Will's pick (7 Oct 2026): "3". Built into `components/Hero.js` as layout, not
an offset: from 1280 up the hero is a two-row grid. Row one holds the text and
the board, so they share a top and bottom; the headline is pulled up 0.118em so
its capitals start on the board's top edge, and the button is pushed to the
row's bottom. Row two holds the note and the demo link on one baseline. The
board fills its cell, so the edges hold whatever the board's height. Below 1280
the items stack in reading order. Measured at 1440 and 1280: capitals within
1px of the board's top (from pixels), button bottom 0px from the board's
bottom, note and link baselines equal; no horizontal overflow at 1440, 1280,
1024 or 375; no console errors.




## [ ] M4.2 Home, section by section
## [ ] M4.3 /pilot and /pricing
## [ ] M4.4 /work, /industries/*, /about

## [~] Hero detail 4: the sub-line (options 7 Oct 2026)

Board: `design-pass-site-2026-10-07-subline.png`, from
`design-pass-site-2026-10-07-subline.py`, raw captures in `assets-2026-10-07/`.
The words stay; only size, colour and position change. Since alignment 3 the
text column has spare space, and the sub-line's position decides where it goes.
Today: 19px #333 under the headline, space above the button. 1 quieter, 17px
#666; 2 moved down to sit just above the button, the space moving between the
headline and the sub-line (recommended); 3 bigger, 22px in ink. All four keep
the button on the board's bottom edge (measured 0px).
Will's pick (7 Oct 2026): "today". 19px #333 under the headline stays.

## [x] Hero detail 5: the button (options 7 Oct 2026)

Board: `design-pass-site-2026-10-07-button.png`, from
`design-pass-site-2026-10-07-button.py`. Today: black pill, 16px, no arrow,
while the header button is a smaller pill with an arrow. 1 add the arrow, the
two buttons then match (recommended); 2 the arrow and squarer corners (10px)
matching the board's window, the header button following; 3 the arrow, 18px
and more padding. The note is unchanged in all three, and every option keeps
the button's bottom on the board's bottom edge (measured 0px).
Will's pick (7 Oct 2026): "2". Built: the hero button gets the arrow and 10px
corners; the header button goes to 8px and the phone menu's button to 10px.
The pill-shaped buttons on the other pages (`AuditButton` in
`components/site/shared.js`) stay until their pages come up. Measured at 1440
and 1280: button bottom 0px from the board's bottom, no overflow at 375, no
console errors.

## [x] Hero detail 6: the board's type and colours (options 7 Oct 2026)

Board: `design-pass-site-2026-10-07-board-type.png`, from
`design-pass-site-2026-10-07-board-type.py`. Each option changes one thing.
Today: Geist Mono for the header and times, employee name in ink, job in #333,
status words in green or amber. 1 no mono, the header and times in Geist;
2 the job first, the job in ink medium and the employee name in grey; 3 colour
only on the lamp, the status words grey and the dot carrying the state
(recommended: closest to "colour means state"). Stills show the finished day,
so every lamp is green; while the board runs, waiting rows show amber lamps
the same way.
Will's pick (7 Oct 2026): "today". The board's type and colours stay.

## [x] Hero detail 7: spacing (options 7 Oct 2026, picked 10 Oct 2026)

Board: `design-pass-site-2026-10-07-spacing.png`, from
`design-pass-site-2026-10-07-spacing.py`, each option as the whole 1440x900
first screen and again with the gaps measured. Today: 80px above the board's
top, 48px between the columns, 115px below; 143px of the next section shows
above the fold. 1 tighter, 56 / 40 / 75px, 207px of the next section shows with
its heading cut at the fold (recommended); 2 more air, 112px above and 147px
below with the column gap kept, 79px of the next section shows; 3 exactly one
screen, the hero filling the space under the header with the content centred,
the next section starting at the fold. Found while drawing: any column gap over
48px narrows the text column enough that "More money." breaks onto two lines
at 72px, so the gap can only shrink.
Will's pick (10 Oct 2026): "select 3 out of the choices", option 3, exactly one
screen. Built from xl up, where the text and the board sit side by side: the
hero fills the screen under the header and centres its content, with 32px as
the least padding above and below. Below xl the stacked hero is taller than a
screen anyway, so it keeps today's padding.

## [x] Hero detail 8: the header (options 10 Oct 2026, picked 10 Oct 2026)

Board: `design-pass-site-2026-10-10-header.png`, from
`design-pass-site-2026-10-10-header.py`, each option as the header at full size
and the whole 1440x900 first screen. Today the nav is five 14px medium links in
ink and the header button reads "Free AI audit" while the hero's reads "Book a
free AI audit". The header does not follow on scroll and the hero now fills the
rest of the first screen, so on the homepage the header button only ever shows
beside the hero's. 1 match the hero, the header button reads "Book a free AI
audit" in white, nav unchanged; 2 quieter nav, option 1's button with the nav in
regular weight and #555, ink on hover (recommended); 3 no header button on the
homepage, nav to the right edge, other pages keep it. Found while drawing: the
header is 75.5px with the button and 69px without, so option 3 needs the header
fixed at 75.5px to keep the hero ending on the fold.
Will's pick (10 Oct 2026): "3". Built: the header button is left off the
homepage only (every other page keeps it), and from md the header is fixed at
76px, so it is the same height with or without the button and the hero's
one-screen height in Hero.js reads 76px too. With the button gone the nav's
right edge lands on the board's right edge (1312px at 1440), the way the logo's
left edge lands on the headline's. Phones are unchanged; the button was never
in the phone header. This was the last hero detail.

## [x] Homepage section 2: How it works (options and pick 10 Oct 2026)

The hero is done (all eight details picked and built, 10 Oct 2026). Board:
`design-pass-site-2026-10-10-how-it-works.png`, from
`design-pass-site-2026-10-10-how-it-works.py`, each option drawn in place of
today's section on the real homepage at 1440 and shown whole in its finished
state. The options run at `/lab/how-it-works`
(`src/app/components/lab/HowItWorksOptions.js`), each with a Run again. The
heading, the audit button and the pricing link are the same in all three.
Today: the May register, cream, Bricolage, three columns, 971px, 173 words of
reading. A the first month as a board, one product window from the audit on day
1 to the first AI employee live on day 18 with the system queued for month 2
and the price beside each step, 924px, 21 words outside the window; B three
steps set plain, today's words on paper and Geist, nothing moves, 884px, 176
words; C each step shows what you get, the audit's written page, the first AI
employee running and the whole office's board beside the three steps, 1705px,
131 words of reading plus 156 inside the windows (recommended: it shows the
product at every step, Will's test for the hero).
Will's pick (10 Oct 2026): "B". Built in `src/app/page.js` as drawn: paper
ground with a hairline under the hero, the heading in Geist bold (36 to 52px,
left edge on the hero headline's at 128px), three columns ruled at the top with
"Step 1" to "Step 3", today's words from `RUNGS`, the audit button matching the
hero's, and no reveal animation. 884px tall at 1440; stacked at 375 with no
overflow. Options A and C stay in the lab until it is removed.

## [~] Homepage section 3: The work (options 10 Oct 2026)

Board: `design-pass-site-2026-10-10-the-work.png`, from
`design-pass-site-2026-10-10-the-work.py`, each option drawn in place of today's
section on the real homepage at 1440 and shown whole. Options at
`/lab/the-work` (`src/app/components/lab/WorkOptions.js`); nothing moves. The
two screens are the ones /work already uses (the property dashboard, live with
example data, and the accountant demo); the brokerage hub is never a picture
(de-branded only, gated on the client) and the marketing engine is internal, so
both stay as words. Today: the May register, cream, Bricolage, four white
cards with a green dot on every tag, 977px. A two screens, two lines, 1210px
(recommended: the section's job is proving the boards above are real); B four
systems set plain as a ruled list like How it works, 788px, no pictures; C the
live dashboard large with the other three beside it, 1099px.
Will's pick: (pending). Paused 11 Oct 2026: Will, "are we not going to go
through the things in section 2 ?". The section-level pick is followed by the
section's details, as in the hero round; this resumes after How it works'
details.
Will's pick (13 Oct 2026): "C - i think we need to have a different visual, and
what does clicking actually take you to". Clicked through: the dashboard opens
dashboard.herbert-aisolutions.com in a new tab (Northbridge Property Co.,
mock data, no login), whose Requests page shows an orange developer line
("Running in mock data mode. Set CLIENT API env vars...") and requests dated
late May; the demo opens /demo/accountants, playing; the hub and the marketing
engine both open /work, where they are paragraphs with no picture.

## [x] The work, option C's large visual (options and pick 13 Oct 2026)

Board: `design-pass-site-2026-10-13-work-visual.png`, from
`design-pass-site-2026-10-13-work-visual.py`; running at `/lab/the-work-visual`
(`src/app/components/lab/WorkVisualOptions.js`), C's layout with the tighter
spacing. 1 the accountant demo playing in a frame, the dashboard moving into
the list (recommended: on this site, so nothing goes stale, and it moves the
way the hero does); 2 the dashboard's requests table as a still without the
warning (needs the warning and dates fixed in the dashboard first); 3 the
property office drawn as a board in the site's style, clicking to the real
dashboard.
Will's pick (13 Oct 2026): "fix the dashboard and 2". The dashboard (repo
herbert-ai-dashboard, 85e4128, live the same day): the mock-mode warning is gone
from the Requests page, and the demo's dates move forward by whole days so the
newest request is always today or yesterday. The website: The work built as C
in `src/app/page.js`, the large visual a fresh still of the live requests table
(`public/work/property-dashboard-requests.png`, the Received column left out so
the picture never shows a date), cropped to the top of the table, with "All the
systems" under the list. 824px at 1440x900, so 76px of the next section shows;
on a 1280x800 laptop it is 18px short of that.

## How it works, details (from 11 Oct 2026)

The details of the built option B, one board each, the way the hero went:
1 the words, 2 the heading size, 3 the step label and price line, 4 the
closing button and link, 5 the spacing.

## [x] How it works detail 1: the words (options and pick 11 Oct 2026)

Board: `design-pass-site-2026-10-11-hiw-words.png`, from
`design-pass-site-2026-10-11-hiw-words.py`, the three steps close up at 1440
with only each paragraph changed. Today: the old site's words, 48, 32 and 40,
120 in all. 1 trimmed, two short sentences each keeping what happens, how long
and what they get, 71 words (recommended); 2 one line each, 32 words, losing the
audit's "three jobs, in your own figures" and the pilot's approval line; 3 three
facts each as short ruled lines, 55 words.
Will's pick (11 Oct 2026): "3 - i dont like the use of the language where it
says 45 minutes with Will - id prefer the copy to be generalised across the
board. so maybe something like 45 minutes spent auditing your business or
something". Built: each step is three ruled facts from a `facts` field on
`RUNGS` (components/site/shared.js); the audit's first fact reads "45 minutes
auditing your business". Across the board: every "45 minutes with Will" or
"Forty five minutes with Will" in site copy now says what happens instead (the
`RUNGS` body, /contact, /faq, /pilot description and FAQ, /pricing twice, the
industry pages and the demo pages), and the /pilot FAQ answer no longer has Will
as the one who quotes ("you get a quote for the pilot"). Left as they are, being
about who builds it rather than a step: the founder note on home, /about, the
FAQ answers on who builds and who you deal with, the reply previews on the
forms, and "call Will" on the demo pages. 856px at 1440, no overflow at 375.

## [x] How it works detail 2: the heading size (options and pick 11 Oct 2026)

Board: `design-pass-site-2026-10-11-hiw-heading.png`, from
`design-pass-site-2026-10-11-hiw-heading.py`, the whole section at 1440 with
only the heading changed. Today 52px on two lines (the hero is 72px, the step
titles 24px). 1 smaller, 40px on two lines, the hero staying the only big type
(recommended); 2 bigger, 64px on two lines; 3 one line, 44px across the width.
Will's pick (11 Oct 2026): "today". The heading stays at 52px on two lines;
nothing to build.

## [x] How it works detail 3: the step label and the price line (options 11 Oct 2026, picked 12 Oct 2026)

Board: `design-pass-site-2026-10-11-hiw-label-price.png`, from
`design-pass-site-2026-10-11-hiw-label-price.py`, the three steps close up at
1440. Today "Step 1" in grey above each title and the price in ink under the
facts. 1 price as the closing ruled line, a touch bolder, so each column is one
list (recommended); 2 price under the title in grey; 3 no step label.
Will's pick (12 Oct 2026): "today - should the prices even be shown? is that
good to do or not". Label and price stay as they are. On the question: the
16 Sep decision (publish, small number first; `product/research/markdown/
identity-2026-09-16/pricing-and-the-small-first-yes.md`) still stands, since
its check (Harry's "Price" reason, reviewed after ten audits) has not run. The
softer middle way offered: drop "$25,000" from the homepage's step 3 only and
leave it on /pricing, where the "you will be told" sentence sits.

## [x] How it works detail 4: the closing button and link (options and pick 12 Oct 2026)

Board: `design-pass-site-2026-10-12-hiw-close.png`, from
`design-pass-site-2026-10-12-hiw-close.py`, the section from the steps down at
1440. Today the black audit button with "See how it's priced" beside it
(recommended: both next steps after the prices). 1 button only; 2 link only;
3 both as links, the audit a bold underlined link.
Will's pick (12 Oct 2026): "2 and keep". Built: the section closes on "See how
it's priced" alone, the audit button removed (the hero's is one screen up and
the page ends on one). "keep": the prices stay on all three steps, including
"From $25,000" on the homepage. 828px at 1440, no overflow at 375.

## [x] How it works detail 5: spacing (options and pick 12 Oct 2026)

Board: `design-pass-site-2026-10-12-hiw-spacing.png`, from
`design-pass-site-2026-10-12-hiw-spacing.py`, the 1440x900 screen on scrolling
to the section, clean and measured (above the label / heading to steps / steps
to link / below the link). Today 129 / 64 / 66 / 131px, 828px tall. 1 tighter,
97 / 48 / 50 / 99px, 732px; 2 more air, 161 / 80 / 66 / 163px, 908px, fixed;
3 one screen like the hero, content centred, 900px at that screen
(recommended). 2 and 3 look almost alike at 900px tall and differ on other
screens.
Will's pick (12 Oct 2026): "1 - i think the hero is the main, and then it tells
a sort of story with the next few sections, so they all show a bit of the next
section". Built: 96px above and below, 48px heading to steps and steps to link,
at every width (the md overrides dropped). 732px at 1440; on scrolling to it,
168px of the next section shows under it. Phones unchanged. How it works is
done; The work resumes. The rule for the sections after it: sized so each
shows a bit of the next, the hero alone filling one screen.

## The work, details (from 13 Oct 2026)

1 the two rows that only open a paragraph, 2 the labels and link words. The
heading and spacing follow How it works.

## [~] The work detail 1: the two rows that only open a paragraph (options 13 Oct 2026)

Board: `design-pass-site-2026-10-13-work-rows.png`, from
`design-pass-site-2026-10-13-work-rows.py`. Today the brokerage hub and the
marketing engine both say "Read about it" and open the top of /work. 1 each
opens its own spot on /work, worded "Read its write-up"; 2 named, not linked
(recommended); 3 only what can be opened, the two rows removed.
Will's answer (13 Oct 2026), none of the three: "i was thinking maybe u can just
generate what the other things would look like, and then the link goes to
that? that way it looks very polished and we can edit how the generation
looks". Agreed as coded pages rather than generated images (image models garble
interface text and invent features; a coded page is exact, can move, and is
edited like any section), each labelled an example with made-up data. Will:
"go". Built: `/work/marketing-engine` and `/work/operations-hub` on
`components/runs/ExampleSystem.js` (the system's morning as a running board
beside what it does, then the audit). The homepage rows now say "See an
example". The hub page is held: `HUB_EXAMPLE_CLEARED` in
`components/site/shared.js` is false, so a production build returns 404 for it
and the homepage keeps the plain /work link (checked with a production build);
preview and local show it. It goes live when the client has said a de-branded
demo is fine (M2.1). Screens: `assets-2026-10-13/example-*.png`. Both pages get
their own detail pass next.

## Foundations round (13 Oct 2026)

Will paused the section pass to settle the site's foundations: "the point of
the page is to look visually appealing and grabs the eye, flashy and cool
visuals ... lets discuss the foundations and skeleton of the website". Settled
so far, all 13 Oct 2026:
- Industries, named as industries: Health, Property, Trades, Hospitality,
  Finance ("yes to the names"). Slugs follow, with redirects; /demo/* links
  stay.
- AI employees are the site's unit: a homepage roster and a page replacing
  "What gets built" ("yes to AI employees").
- Each AI employee has a plain first name beside its job and a dot-grid avatar
  ("job names plus dot avatars - something like Steve - Front Desk"); the
  avatar's dots light green when a job finishes and amber while it waits on a
  person. Clients name their own at kickoff ("we can have clients name their
  AI employee so it feels personal to them").
- "Bottleneck Pilot" is renamed "your first AI employee" across the site,
  skills and sales docs ("first AI employee"); contracts may still say pilot.
- Motion: three levels built to judge by feel at `/lab/motion`
  (`src/app/components/lab/MotionDemo.js`): 1 as the charter is now, 2 motion
  shows the system working (cards play their job, counters run, Approve gets
  pressed), 3 one scroll scene (the section holds and a tilted screen plays
  each employee's job, a cursor pressing Approve). Recommended 2 everywhere
  and 3 at most once a page.
Will's pick on motion (13 Oct 2026): "2 across the site plus 3 on the
homepage, names are good. instead of Ruby can u do Emma". Written into
CHARTER.md ("Motion shows the system working", "The AI employees"). The roster:
Steve, Penny, Max, Emma, Archie, Tess. Built the same day: the roster is
homepage section 2 (`components/runs/EmployeesSection.js`, data and avatar in
`components/runs/employees.js`), right after the hero. From 1024px it is the
scroll scene (six employees, 60vh of scroll each, the screen tilted in depth, a
cursor pressing Approve); below that, and with reduced motion, a grid of cards
that each play their job once on view. Checked at 1440 (headless, through the
scene), 600 (cards play through) and 375 (no overflow). Screen:
`assets-2026-10-13/home-employees-scene.png`. Its details come next.

## AI employees section: first round of tweaks (13 Oct 2026)

Will: "yeah does feel a bit long, and i dont like how for each employee u have
to keep scrolling for the jobs queue to keep going, maybe we can scroll through
each employee, and the jobs queue automatically activates? i was thinking going
from the hero to the next section having graphic animations again is a bit much
as well? idk what do u think". Agreed and built: scrolling now only picks the
employee and the active one's day plays by itself (650ms a step: the avatar
works, three lines, the cursor presses Approve, green); the scroll is 33vh an
employee, about two screens in all (1782px at 1440x900, down from 2340); and
the section moves after How it works, so the page goes moving, calm, moving,
calm (Hero, How it works, AI employees, The work).

## [x] The Work, done properly (options and pick 13 Oct 2026)

Will: "feels better, lets do the work section next properly", and "the title
for each section should be capitalised" (section labels now title case, in
CHARTER.md). Option C was picked before the foundations round; the section is
redrawn around what exists now (each system's own visual) and its place (after
the AI employees scene, so calm until the visitor interacts). Board:
`design-pass-site-2026-10-13-the-work-2.png`, from
`design-pass-site-2026-10-13-the-work-2.py`; running at `/lab/the-work-2`
(`src/app/components/lab/WorkSectionOptions.js`). Today C as built, 824px.
A option C with the list as switches, clicking swaps the big screen and plays
it once, 853px (recommended); B four screens at once in a 2x2 grid, hover
plays, 1342px; C tabs over a full-width stage, 1207px. The hub's visual stays
off the live site until Rob clears it (words in its slot until then).
Will's pick (13 Oct 2026): "i think A, but lets capitalise the wording, and
instead of having currently building, live click in, etc, we have the industry
name above it?". Built as `components/runs/WorkSection.js` on the homepage:
titles in title case ("A Property Manager's Dashboard", "An Accountant's
Document Chaser", "An Operations Hub for a Finance Brokerage", "A Marketing
Engine"), each under its industry (Property, Finance, Finance, Trades; the
engine's example is a plumbing business), the link words carrying what a click
does. Opens on the dashboard still; clicking swaps the screen and plays it
once. 865px at 1440x900 (35px of the next section shows); on phones the
caption under the screen hides because the list repeats it.

## Industries research before more sections (13 Oct 2026)

Will: "for some of these demo systems, they are just the AI employee again, eg
for the accountants document chaser. i think you should do some research into
these industries, and then determine actual AI Employees that we can build, and
then what an entirely built system would look like as well. and then the
marketing engine thing isnt really industry specific ... maybe we can have it
as Herbert AI products at the end of the entire page ... i feel as if it would
only really work for a business that is doing consumer based business, such as
trades". Five research briefs running in parallel (Health, Property, Trades,
Hospitality, Finance), each to `product/research/markdown/industries-2026-10-13/`:
the jobs that cost each business most, the software they run and whether it
has an API, four to six buildable AI employees, what the full system would look
like, who already sells to them, and the most convincing visual. The Work,
Industries and the AI employees roster are redrawn from the synthesis.

## Ideation round (13 Oct 2026)

Will, after the research: "i was thinking you would ideate or something as
well, based off the research into the different industries, and then come up
with ideas for different AI employees, as opposed to just doing what is already
in the industry". Five ideators ran in parallel on the research, seven lenses
each, 30 ideas kept, judged across industries in
`product/research/markdown/industries-2026-10-13-ideas.md`. Top five: Gus ·
Recoveries (property), Vic · Margins (trades), Fern · Scope (finance), Rita ·
Rebookings (hospitality), Joy · Milestones (health); Ray · Promises works in
every industry. Proposed homepage roster: those six, with the conventional leads
(Hazel, Emma, Max, Clara, Nora) and the first six names on the industry pages.
The visual pattern for every one: one line from a real record lighting up, one
card with one approve, one counter moving.
Will's pick on the roster (14 Oct 2026): "yes, the names u have are good".
Gus, Vic, Fern, Rita, Joy, Ray. He then asked for the homepage sections.

## Homepage sections settled (14 Oct 2026)

Will: "yes and products now - i saw how there is Wispr Flow, a product of Wispr
AI. i was thinking of doing a similar sort of strategy". The eight sections and
the product-naming pattern are in CHARTER.md ("Settled: the homepage"). Build
order: the roster swap and hero rows, then Industries (Property's system drawn
three ways, the other four follow the pick), then The Work, Products, Who Builds
It and Book the Audit, three options each. The marketing engine's product name
is Will's call before Products is drawn.

## [x] Roster swap and hero rows (14 Oct 2026)

Built from the settled roster: `components/runs/employees.js` carries Gus ·
Recoveries, Vic · Margins, Fern · Scope, Rita · Rebookings, Joy · Milestones
and Ray · Promises, each with a new 7x7 glyph (a dollar sign, three bars, a
page with one line lit, a return arrow, a flag, a tick), three lines of a day
from the ideation demo moments, and a stat with its own label ("$11,620 found
this month", "38 quotes checked"). The hero board's rows are the six at work
across five example businesses, so the hero introduces what the scroll scene
deepens; its header now reads "Today · five example businesses" (was "an
example office", one office cannot hold five industries). Found and fixed on
the way: a hydration error whenever reduced motion was on, because framer's
useReducedMotion is null on the server; reduced motion is now read with
useSyncExternalStore and a server snapshot of false. Checked headless at 1440
in both motion modes, no errors, and at 600 wide. The per-employee scene
treatment (one record line lighting up, one card, one approve, one counter) is
the next three-option board.

## Product name placeholder (14 Oct 2026)

Will: "we'll come back to this, Herbert Reach as a placeholder for now". The
Products section is drawn with "Herbert Reach"; the name is not final.

## [~] Industries: Property's system three ways (options 14 Oct 2026)

Homepage section 4 in layout A: the five industries listed beside one big
screen showing the active industry's full system. Property first, three ways,
from `industries-2026-10-13/property.md` sections 4 and 6; the other four follow
the pick. Board: `design-pass-site-2026-10-14-industries-property.png`, from
`design-pass-site-2026-10-14-industries-property.py`; running at
`/lab/industries-property` (`src/app/components/lab/IndustryOptions.js`), each
in place at 1440 then the screen close up. A the hub's morning, the approvals
screen at 7am with three decisions from Emma · Maintenance, Kate · Renewals and
Rose · Arrears approved one by one, the week's count and four boards beside;
B one repair start to finish, the tenant's 11:42pm text, the overnight
timeline and the property manager's single 7:05am approval on a split screen
(the research's pick; recommended); C the maintenance board with a no-hot-water
card moving New to Done overnight. Every name, address and figure is made up.
Found while drawing: the screen frame was 720px with 450px of content, a third
blank; now 520px.
Will (15 Oct 2026): "hmmmm im not sure. what is the point of this section,
we're showing demo dashboards, or how an employee might work". Answered: A and
C are dashboards the page already shows (hero, The Work, the example pages),
B is how an employee works (the scroll scene above it); the job nothing else
does is recognition, the visitor's own industry in its own words. Will: "show
me the recognition version". These three move to the Property industry page
(B as its lead visual, per the research).

## [~] Industries: the recognition version three ways (options 15 Oct 2026)

Board: `design-pass-site-2026-10-15-industries-recognition.png`, from
`design-pass-site-2026-10-15-industries-recognition.py`; running at
`/lab/industries-recognition` (`src/app/components/lab/IndustryRecognitionOptions.js`),
the same layout A with Property active. 1 the week: the admin jobs with the
hours each takes at an example agency, an AI employee attaching to each job it
would take, the software named underneath (recommended); 2 your software with
the employees in it: the systems the agency runs as a row, the employees
appearing between them with lines to what each reads and writes; 3 the team:
the industry's AI employees as a team sheet. Hours are the research's estimates
for an example agency and say so; shown as the size of the job, never a saving.
Will (15 Oct 2026): "i think id rather go back to yesterdays". The recognition
version is declined for the homepage; the Industries section shows each
industry's system or one job through it, from the 14 Oct board.
Will's pick (15 Oct 2026): "ok B". One job start to finish through the system,
on a split screen: the customer's message, the overnight timeline, the one
approval. Property as drawn; Trades, Health, Hospitality and Finance to follow
in the same shape from each research file's "what the website should show". The recognition content (the industry's jobs, hours and
software) belongs on the industry pages.

## [x] Industries built: five stories (15 Oct 2026)

Built from the B pick: `components/runs/IndustriesSection.js` (layout A, the
five industries listed beside one big screen, calm until clicked, opens on
Property), `components/runs/OneJob.js` (the one shape: the customer's message,
what happened with timestamps, the one approval, the day's count) and
`components/runs/industries.js` (the five stories, each the visual its research
file recommended: Property one repair after hours with Emma; Trades one quote
request answered in 52 seconds with Max · Sales Coordinator; Health one
cancellation filled by 8:11am with Hazel · Waitlist; Hospitality one function
enquiry answered in service with Clara · Functions; Finance one client's reply
read against last year's return with Nora · Tax Intake and Penny). Sits after
AI Employees and before The Work; the old cream industries strip is gone.
Checked headless: all five play to their approval, no errors, no overflow at
375; 94px of the next section shows at 1440x900, 6px at 1280x800. Sheet:
`design-pass-site-2026-10-15-industries-built.png`. Will's tweaks next, then
the section's details.

## Not on Track (15 Oct 2026)

The rebuild had a track.json for a day so the track mod could show it. Will:
"track doesnt really fit into a website redesign though, so it doesnt make
sense". Removed. This ledger is the rebuild's state; Track stays for builds
with milestones and gates.

## [x] The ladder named, the section renamed, The Work folded in (15 Oct 2026)

Will: "i was thinking we have a different sort of graphic for each thing. and
ive just realised for industries, it says what the graphic is meant to be, ie
an operations hub for a property agency, an office system for a trade
business, etc so the graphic doesnt actually reflect that. and im thinking the
industries page should actually be about the entirely built system, so maybe
we call that section Operating Systems or something. i think we define the
steps as being AI audit, AI employee, and then AI Operating System". Agreed:
the one-job split screen is the AI employee again, the right visual for the
AI Employees section and the industry pages, the wrong one under a list that
names a system. Asked two consequences: fold The Work into this section (the
built screens were going to appear twice on one page) and do the vocabulary
ripple in the same session. Will: "yes fold it in, AI Operating System is
good". So: the ladder is AI Audit, AI Employee, AI Operating System (step 3
on the site was "The system it runs in", now "Your AI operating system");
section 4 is Operating Systems, each industry’s entirely built system on the
screen, with the built ones carrying an open link and a Built tag; The Work is
gone and the homepage runs at seven sections; the five one-job stories move to
the industry pages. The list keeps the specific names (operations hub, office
system, patient board, functions office, season board) rather than "AI
operating system" five times.

## [~] Operating Systems: Property three ways (options 15 Oct 2026)

Board: `design-pass-site-2026-10-15-operating-systems.png`, from
`design-pass-site-2026-10-15-operating-systems.py`; running at
`/lab/operating-systems` (`src/app/components/lab/OperatingSystemOptions.js`),
layout A with Property active, today’s section first for comparison. All from
the Property research’s system section (section 4: the nine modules, the
hand-offs, the PMS that stays the trust ledger). 1 the hub whole: the app
shell, nine modules down the side with their counts, the approvals home screen
at 7am with three decisions approved one by one, the four boards’ numbers and
the six AI employees on the board underneath (recommended: the first version
the research scopes, and the one a visitor can picture logging into); 2 the
office map: one property’s record in the middle with its comms log and the
PMS, the six modules around it each with its employee, a job travelling the
wires and the employees handing work to each other (Owen’s inspection raises
a tap with Emma, Kate checks open maintenance before recommending a rent); 3
one day on the system: every module as a lane across a Tuesday with a now-line
moving, the day’s count and the person’s minutes on the right. Every name,
address and figure is made up. Found while drawing: 1 left its bottom third
blank until the four boards’ numbers went in; 2’s Maintenance panel overflowed
at four lines, now three; 3’s afternoon pills ran into the count card, moved
earlier and shortened.

## [~] Operating Systems: one screen per industry (second board, 15 Oct 2026)

Will on the first board: "i was thinking we could have a different looking
dashboard for each industry. i assume this dashboard you have made is based
off the smith build. are you able to look into what industry specific
dashboards or software look like to get a general idea, or even just think of
different looks/layouts and stuff for each industry dashboard. i like 1 though,
maybe if we can have it read a bit cleaner/less cluttered so it is easier to
follow?" (The Property screen was drawn from the property research, not the
Smith build; the shape, an approvals queue, is the hub’s shape, so the point
stood.) Five research agents looked at what each industry’s software opens to
(product/research/markdown/dashboards-2026-10-15/<industry>.md, screenshots
seen and named, what was not seen said so), and each screen is drawn in that
idiom. Board: `design-pass-site-2026-10-15-operating-systems-2.png`, from
`design-pass-site-2026-10-15-operating-systems-2.py`; running at
`/lab/operating-systems`, one section per industry with that industry active in
the list. Property: option 1 cleaned to three regions (the modules down the
side, the three decisions one line each, the week and the team), the research
confirming the idiom (a left rail of nouns, lists with who is on them, one
amber panel for the decision). Trades: the dispatch board (technicians as
rows, hours across, a now-line) over a pipeline strip with each AI employee
under its column, the one reply waiting on the owner on the right. Health: the
appointment book (time down the side, practitioners across), the cancelled
2:15pm the only dashed block, the wait-list offers the one approval. Hospitality:
the functions sales view (stages with counts and dollars, cards by stage, the
40th moving across with its timeline, deposits and rebookings, the week along
the bottom). Finance: the season board (five stages with count pills, the fat
waiting-on-client column, the AI employee as each card’s last line, a reply read
against last year’s checklist, one request approved). Colour stays state only:
appointment and job types are drawn as neutral tints, never the incumbents’
colour-by-type. Every name and figure made up, each screen says so. Checked
headless: all five play, no errors with motion on or off. Awaiting Will’s eye.

## [~] Operating Systems: saying the difference, A B C (15 Oct 2026)

Will on the second board: "i think these look good, but one thing i realised
is that there is likely systems that already exist for each of these
industries that are widely used. so im wondering how i can differentiate
myself from that ... at the moment it just looks like im selling a product
that these businesses already use?" and then "the idea that these systems
already exist in a monopolised version by existing companies is really
killing my ambition, but at the same time i am selling the automation layer
that is specific to a business, not generalised". The answer is in the 13 Oct
research, section 4 of each industry: the system of record is taken and cheap
(PropertyMe, ServiceM8, Cliniko, the booking platform, Xero), and the work
between the systems is open: the shared inbox as a work queue, the whiteboard,
the spreadsheet, the person’s memory. The incumbents are workbenches a person
operates; this is a workforce with one person deciding. The second board’s
screens had been drawn in the incumbents’ idioms on purpose and overshot into
"the product they already use". Board:
`design-pass-site-2026-10-15-difference.png`, from
`design-pass-site-2026-10-15-difference.py`; running at
`/lab/operating-systems-abc` (`src/app/components/lab/DifferentiationOptions.js`).
In all three the list names the gap beside the software (the work between
PropertyMe and your inbox; the office in front of ServiceM8; beside Cliniko:
the waitlist, recalls and funding; the functions office beside the booking
system; the season board beside Xero). A say it on the screen: the hub as
picked with the record named and kept in the frame and what is gone named,
heading "You keep your software. This is where the work gets done."
(recommended); B the motion is the difference: the manager’s own list for the
day in her words, thirteen of fourteen struck through by named employees, one
tap left for her, heading "Your software stays. The day runs itself."; C lead
with what is replaced: the desk, PropertyMe kept, the inbox, the whiteboard and
the spreadsheet going, one screen underneath, heading "Your software stays.
The inbox, the whiteboard and the spreadsheet go." Named software is named in
text only, never a logo. Awaiting Will’s pick.

## Wrong direction: naming the incumbents (15 Oct 2026)

Will on the third board: "i think this is going in the wrong direction", then
"naming propertyme, cliniko, etc. i think we need to think of what these
Operating Systems actually would be/look like. like how we found how we can
ensure the AI Employees exceed their 3500 valuation to the business, we need
to do the same sort of thing for the operating systems for each industry".
So: no incumbent names on the page (the A, B, C board’s list lines are out,
and the in-frame record bar with them); the section waits on a definition
and value pass per industry (what the operating system is for a 3 to 20
staff business, and how it clears its from-$25,000 price in that business’s
figures, the way each AI employee was shown to clear $3,500). That pass runs
under the quantify method in product/research/markdown. The five screens from
the second board stay as drawings until the definitions say what each
screen should show.

## Operating Systems: the definition and value pass (15 Oct 2026)

Done under the quantify method in the files repo:
`product/research/markdown/operating-systems-2026-10-15.md` with five
per-industry files. Each system is the roster on one board with the hand-offs,
one queue and the owner’s view; each has a value case in the reference
business’s figures (time at the staff rate, revenue after margin,
subscriptions not rented) against $37,000 to $58,000 in year one, and a floor
below which the owner is told no. Trades 1.3 to 3.8 times the price and
Property 1.1 to 3.7 clear it with room; Hospitality (0.7 to 2.4 on money) and
Health (0.6 to 2.1) clear it at the reference business; Finance (0.4 to 1.2)
only in the strong case, so its line stays to hours. For the section: each
screen becomes the owner’s view (Property’s Monday page, the trade
owner’s phone at 7am, the clinic’s weekly page, the venue’s board with a
till strip, the principal’s August Tuesday) with the model’s example line
under it, figures labelled example, no software names, no headcount; Property
first, Trades second, Finance last. The second board’s drawings are the
starting point, re-pointed. Awaiting Will’s read.

## [x] Operating Systems built: the owner’s view, five industries (15 Oct 2026)

Will: "go". Built from the model (operating-systems-2026-10-15.md, section 7
of each file): `components/runs/OperatingSystemsSection.js` (layout A, the
five industries listed beside one big screen, calm until clicked, then that
screen plays once; the model’s line for an example business under the
screen, said to be example figures; a built system carries its open link and
a Built tag; `initial` and `autoplay` props for the lab) and
`components/runs/os/` (shared frame, scaler, dots and roster glyphs; one file
per screen, each taking `play`). Property: the owner’s Monday page, six tiles,
the week as a job list with the employee on each row, one approval card, one
grey line about hours. Trades: the dispatch board with the owner’s 7am figures
under it, the one reply waiting on him, the morning’s feed. Hospitality: the
functions board with the till strip above it and the 40th moving across.
Health: the appointment book with the owner’s weekly page beside it. Finance:
the season board with the on-time figure, every waiting card saying what is
missing and since when, hours never dollars. No software names anywhere on
the screens. Order Property, Trades, Hospitality, Health, Finance. On the
homepage it replaces Industries and The Work (`page.js`); `IndustriesSection`,
`OneJob` and `WorkSection` stay in the tree for the industry pages and /work.
The lab page `/lab/operating-systems` now shows the real section five times;
the named-incumbents page is gone. Found while building: the Finance and
Hospitality card stacks were implicit-track grids that sized to the longest
line and spilled over their columns; `grid-cols-1` on the stacks fixed it.
Checked headless: lint clean; no errors or overflow at 1440, 1280 and 375 in
both motion modes with every tab clicked; the section is 810px at 1440x900
(90px of the next shows) and 798px at 1280x800. Sheet:
`design-pass-site-2026-10-15-operating-systems-built.png`. Will’s eye next;
then the details pass (the heading is still the Industries one).

## [x] AI Employees detail: the avatar’s wait wave and green sweep (16 Oct 2026)

Will: "when the things are yellow, i want the employee symbol to be sort of
loading with the yellow ... the yellow colour ripples through the symbol and
then the green ripples through", then "no the amber shouldnt stay, only the
green". `components/runs/employees.js` Avatar: in wait mode a wave of amber
passes diagonally through the lit dots (50ms a diagonal) and fades back to
ink, looping every 1.7 seconds while the job waits on a person; in done mode
green sweeps through once with the same timing and stays on every dot it
reaches. Scan mode (dots lighting one by one at work) unchanged. The same
avatar is used by the hero board, the one-job stories and the Operating
Systems screens, so they all behave the same. Checked in the browser by
sampling the scene avatar’s dot colours every 400ms: amber rises to all 19
lit dots and falls to none as the wave passes, then green takes over mid-sweep
(11 amber, 8 green) and all 19 stay green. Lint clean, no errors.

## [x] AI Employees: pacing (16 Oct 2026)

Will: "ok these operating systems look good and those graphics look good. for
the AI employees section, we didnt really go through it all properly did we.
im thinking for the AI employee stuff as well, each item that appears should
appear a bit slower, so the motion seems a bit more smoother". Done in
`EmployeesSection.js`: the scene’s step 650ms to 850ms, every entrance 0.3s to
0.6s on the site’s soft ease, the card interval 900ms to 1050ms, the employee
switch and the cursor 0.5s to 0.65s. Lint clean, plays without errors.

## [~] AI Employees details, 1 of 5: the heading (options 16 Oct 2026)

The section had its motion level (13 Oct) and the scroll scene (14 Oct) but
no details pass. Five details, each three ways on the real scene: the heading,
the left list, the card, the close, the phone cards. Board:
`design-pass-site-2026-10-16-emp-heading.png`, from
`design-pass-site-2026-10-16-emp-heading.py` (the h2 swapped in the page at
1440x900 with Gus’s day finished). Today "One job each. A person approves
what goes out."; 1 "Named, one job each, live in 14 days." (ties the section
to the ladder’s second rung; recommended); 2 "They do the job. Your team says
yes."; 3 "Six AI employees, one job each, every day."
Will’s pick (16 Oct 2026): "i think i like 2". The heading is "They do the job.
Your team says yes."

## [~] AI Employees details, 2 of 5: the left list (options 16 Oct 2026)

Board: `design-pass-site-2026-10-16-emp-list.png`, from
`design-pass-site-2026-10-16-emp-list.py` (the six rows rewritten in the page
on the real scene with the picked heading in place). Today: name and job
(Gus · Recoveries). 1: name and job with the industry at the right in small
mono type, so a visitor finds their industry in the list before the screen
tells them (recommended). 2: name and job with the employee’s one-line job
under it, taller rows, the list reads without the screen. 3: the scoreboard,
each row ending in what that employee has done this month, the figure the
card counts to.
Will’s pick (16 Oct 2026): "3 for the list". Built: each row ends in the
counter the card shows, dollars where the label says so (`countText`).

## [x] AI Employees detail: the avatar wave, made continuous (16 Oct 2026)

Will on the first version: "the switch between the amber and the green, the
final one appears a bit fast, and the second amber pass is a bit abrupt", then
"the transitions isnt entirely smooth". The cause was structural: each dot ran
its own keyframe loop with a rest between passes, so the band stopped and
restarted and the whole grid flooded amber, and on approval each dot froze
until its turn. Rewritten in `employees.js`: one phase value drives a single
amber pulse that travels diagonally and never restarts (1.8s a crossing,
entering from the top-left corner), and a second value moves the green front
across in 1.2s while the band keeps moving underneath; every dot’s colour is a
function of the two. Checked by sampling the scene avatar every 150ms: the
amber mass rises and falls as a smooth curve with no jumps, and the green
takes the dots over four samples while the amber fades. Lint clean.

## [x] AI Employees: the pulse kept at 1.2s, two faults fixed (16 Oct 2026)

Will: "keep" on the 1.2s amber pulse. Two faults he saw: "on the green pass,
theres yellow towards the end", because the amber band kept travelling under
the green front; now a third value, the band’s strength, fades to zero in
0.45s as the front starts, so the pass is green only (sampled: amber 0 for the
whole crossing). And "the card increasing in size takes away from the feel":
the feed area was 190px against 202px for three rows, so the card grew 7px as
the third line landed; the feed is now a fixed 210px on the scene card and
160px on the phone card (sampled: the scene card holds 408px through the
play).

## [~] AI Employees details, 3 of 5: the card (options 16 Oct 2026)

Board: `design-pass-site-2026-10-16-emp-card.png`, from
`design-pass-site-2026-10-16-emp-card.py` (the card’s markup edited in the
page on the real scene with the heading and the scoreboard list in place).
Today: the bar, the avatar, the name and the one-line job, three lines each
with a state line, Approve on the one that needed a person. 1: each line
carries its time at the right in mono, so the day reads as a day and the gap
to the person’s yes is visible (recommended). 2: the scoreboard’s figure on
the card at the top right, counting up as the lines land. 3: the wait line
opens into the approval card the Operating Systems screens use (the feed
would need to grow for it).
Will’s pick (16 Oct 2026): "1 and the card feels good now". Built: each line
carries its time at the right in mono on the scene card and the phone card
(`times` on each employee).

## [~] AI Employees details, 4 of 5: the close (options 16 Oct 2026)

Every other section closes on a link; this one ends on the card. Board:
`design-pass-site-2026-10-16-emp-close.png`, from
`design-pass-site-2026-10-16-emp-close.py` (drawn on the scene with the
heading, the scoreboard list and the timestamped card in place). Today: no
close. 1: a line under the list, "Your first one is $3,500, live in 14 days",
to the pilot page (the rung this section sells; recommended). 2: a line under
the list, "All six, and what each one does", to the AI Employees page that
replaces What gets built in the nav (/services stands in until it exists).
3: the card’s bar carries "See the Property page", so the close moves with
the scroll and the list carries no link.
Will’s pick (16 Oct 2026): "1". Built: the rung line under the list on the
scene and under the cards on phones, to /pilot (`Close`).

## [~] AI Employees details, 5 of 5: the phone cards (options 16 Oct 2026)

Board: `design-pass-site-2026-10-16-emp-phone.png`, from
`design-pass-site-2026-10-16-emp-phone.py` (the phone layout at 375 with every
card walked into view so each shows its finished day, then the markup edited
per option). Today: six cards in one column, each the avatar, name, job and
industry, the month’s figure, the one-line job and the three timed lines;
most of a screen each. 1: one at a time, the six avatars in a strip with the
active one lit and one card under them, a tap or swipe bringing the next, a
sixth of the height (recommended). 2: the scoreboard opened, the laptop
list’s six rows with the first opened into its three lines. 3: a row of
cards at most of the width with the next one’s edge showing.
Will’s pick (16 Oct 2026): "1". Built as `Phone` in EmployeesSection.js: the
six avatars in a strip (28px, the active one lit), one card under them keyed
by employee so it plays on each switch, a tap on an avatar or a swipe on the
card moving through the six, "n of 6 · swipe" at the right, the rung close
under it. The six-card grid stays for laptops with reduced motion. Found while
building: the strip overflowed 375 with the longer hint; tightened. With that
the AI Employees section’s five details are done.

## [~] Products: Herbert Reach three ways (options 16 Oct 2026)

Will: "products". The section from the 14 Oct settlement: Herbert AI is the
company and its software carries its own name (the Wispr AI and Wispr Flow
pattern); first the marketing engine under the placeholder "Herbert Reach",
early access rather than a paywall until it has numbers from Herbert AI’s own
ads (code/marketing-engine/PROJECT.md, open decisions). Board:
`design-pass-site-2026-10-16-products.png`, from
`design-pass-site-2026-10-16-products.py`; running at `/lab/products`
(`src/app/components/lab/ProductsOptions.js`). Today: no section, Operating
Systems runs straight into the founder note. 1 its own band: the one dark
section on the page, "by Herbert AI" over the product name as the heading, the
engine’s line and three facts, the early-access pill and why, the dashboard
playing beside it (recommended: the product reads as its own brand, and the
band breaks the run of paper sections before the founder). 2 screen and words:
layout A on paper under "Software we build once, and run ourselves first."
3 the shelf: the engine as the one product on a shelf beside a dashed card
saying the operating systems become products once each has run in three to
five businesses. The dashboard is the one built for The Work on 13 Oct; the
copy reuses the engine page’s lines and claims no results. The link goes to
the engine’s example page for now. Found while drawing: on the dark band the
dashboard inherited white text; it now sets its own ink. Awaiting Will’s pick.

## [~] Operating Systems details, 1 of 5: the heading (options 16 Oct 2026)

Will: "what about the operating systems section? have u skipped past that". It
had: the section was built and approved on 15 Oct but its details pass never
ran (the AI Employees details and then Products went first). Five details,
each three ways on the real section: the heading, the list, the line under the
screen, the close, the phone layout (at 375 the 1184-wide screen scales to
about a quarter and is hard to read). Board:
`design-pass-site-2026-10-16-os-heading.png`, from
`design-pass-site-2026-10-16-os-heading.py` (the h2 swapped on the homepage at
1440 with Property active). Today "Built for the office you actually run."
(the Industries heading, kept); 1 "The whole office, on one screen." (what it
is at this rung’s scale; recommended); 2 "Every job runs. You make the one
call." (what each screen shows); 3 "Your software stays. The work between it
runs itself." (the value model’s position, nothing named).
Will’s pick (16 Oct 2026): "1". The heading is "The whole office, on one
screen."

## [~] Operating Systems details, 2 of 5: the list (options 16 Oct 2026)

Board: `design-pass-site-2026-10-16-os-list.png`, from
`design-pass-site-2026-10-16-os-list.py` (the five rows rewritten on the
homepage with the picked heading in place). Today: the industry small, the
system’s name big. 1: the same with the value model’s headline figure under
each in small muted type (about 17 to 37 hours a week back; every quote
request answered within a minute; $43,000 to $89,000 a year kept or won; 3 to
5 cancelled slots filled a week; 420 to 580 staff hours a year) and one foot
line saying they are example figures (recommended: the list carries the value
before a screen is clicked). 2: the jobs that run by themselves in place of the
system’s name (repairs, late rent, renewals, enquiries). 3: the industry big
and the system’s name small, tighter rows.
Will’s pick (16 Oct 2026): "i like the industry first, with the what runs by
itself underneath". Built: the industry at 22px with its Built tag, the jobs
that run by themselves under it at 14px (`jobs` on each screen), rows at py-3;
the system’s name stays under the screen.

## [~] Operating Systems details, 3 of 5: the line under the screen (options 16 Oct 2026)

Board: `design-pass-site-2026-10-16-os-line.png`, from
`design-pass-site-2026-10-16-os-line.py` (the caption edited on the homepage
with the heading and the industry-first list in place). Today: the value
model’s full sentence, three lines, "Example figures for an example business."
on the end. 1: the figure as the sentence, one line ("About 17 to 37 hours of
office work a week back, for an agency of ten with 400 rentals. Example
figures."; recommended). 2: three ruled facts the way How It Works does it.
3: no line, the system’s name and the link only, since the list now says what
runs by itself.
Will’s pick (16 Oct 2026): "1 - and with those figures we have in the
sentence, it seems as if we have teeth in the game as well? where does the
example figures actually come from. we need to be weary of how we are selling
ourselves as well, if we say something like example figures, then maybe
someone may read that and then not be interested". Answered: the figures are
the quantify model’s estimates for a stated reference business (the 13 Oct
research’s hours, Seek and award rates, Easy Weddings, HBR and ATO data where
it exists), not client results; the only measured figure in the model is the
brokerage reader’s cost per document set. Built: `short` per screen, the
headline figure as one sentence naming the business it is worked for, and the
tag "Yours come out of the audit." in place of "Example figures for an example
business." The named business and the audit line make it a worked example;
"about" and the ranges stay; nothing reads as a result Herbert AI achieved.

## [~] Operating Systems details, 4 of 5: the close (options 16 Oct 2026)

Board: `design-pass-site-2026-10-16-os-close.png`, from
`design-pass-site-2026-10-16-os-close.py` (the links edited on the homepage
with the heading, the industry-first list and the one-sentence line in
place). Today: one link per screen beside its name (Built, open the dashboard;
see the Trades page) and nothing for the section. 1: a line under the list,
"Your AI operating system, from $25,000, scoped after the audit", to the
pricing page, the per-screen links staying (recommended: says what this costs
where AI Employees says what that costs). 2: the tag "Yours come out of the
audit" becomes the link to the audit booking. 3: the rung line under the list
and the per-screen links removed, one way out.
Will’s pick (16 Oct 2026): "3 for the close. i dont think we should have the
built thing for the industry as well, considering i havent actually built
much, it indicates a weak position". Built: the rung line under the list to
/pricing, inside the list column so it adds no height; the per-screen links
gone; the Built tag gone from the list and the caption (the open link to the
dashboard moves to the Property page). Section 770px at 1440x900, 758px at
1280x800.

## [~] Operating Systems: the title under the screen (options 16 Oct 2026)

Will: "i dont like how the title for each industry of what that board is
presents. eg 'An operations hub for a property agency' doesnt really present
well". Board: `design-pass-site-2026-10-16-os-title.png`, from
`design-pass-site-2026-10-16-os-title.py`. Today: the system described as a
thing. 1: named like the rung, "Property OS" (the two words the long-run plan
already uses; recommended). 2: what the screen is, "The agency’s Monday
page". 3: no title, the industry label and the line carry it. Awaiting
Will’s pick (16 Oct 2026): "1 for the title", then "idk about the name
'industry' OS though, but im stuck for a better idea". Built as Property OS,
Trades OS, Hospitality OS, Health OS, Finance OS for now (`system`; the
described system stays as `desc` for the industry pages); a names board
follows.

## [~] Operating Systems details, 5 of 5: the phone layout (options 16 Oct 2026)

Board: `design-pass-site-2026-10-16-os-phone.png`, from
`design-pass-site-2026-10-16-os-phone.py` (the section at 375 with everything
as built, the markup edited per option). Today: the laptop layout stacked,
the 1184-wide screen scaled to a quarter and unreadable. 1: the industries as
a scrolling row of pills under the heading, the screen under them. 2: the
pills, then the screen cropped to the owner’s one decision (the approval card
and the team) at a readable size, with "the one decision on the owner’s
phone; the whole office is on the laptop" under it (recommended). 3: no screen
on phones, the active row opening into its title and line. Awaiting Will’s
pick.

## [~] Operating Systems: the system’s name three ways (options 16 Oct 2026)

Will on "Property OS": "idk about the name 'industry' OS though, but im stuck
for a better idea". Board: `design-pass-site-2026-10-16-os-names.png`, from
`design-pass-site-2026-10-16-os-names.py`, the title under the screen only,
shown for Property. Today "Property OS" (short and owned; OS is jargon and
makes it sound like a shelf product when the price line says built and
scoped). 1 "Herbert for Property", the company’s name with the industry, a
name not a description, no jargon, and the pattern scales to the plan where
each system becomes a product beside Herbert Reach (recommended). 2 "The
agency’s office", whose office, matching the heading, different for each
(the trade one is the weakest). 3 "Your AI operating system", the rung said
once under every screen, the industry label above doing the telling.
Will (16 Oct 2026): "i think we need an actual product name", then on Herbert
Run (the recommendation, paired with Reach): "would i say, 'you now have a
Herbert Run', doesnt really sound great", then "Herbert OS ?". That is the
name: a noun you can have, the rung’s own words, and a pair with Herbert
Reach. Built: the title under each screen is "Herbert OS for Property" and so
on. The .com domains checked unregistered for herbertrun, herbertboard,
herbertkeep, herbertbase, herberthub, herbertdesk, herbertengine, herbertcore
and herbertos; .com.au and the business-name and trademark registers are the
pre-ship check, as for Reach.

## [x] Operating Systems: the title stays as the product plus the industry (17 Oct 2026)

Will on "Herbert OS for Property": "but then theres nothing that really
differentiates the industry type?", shown the title alone beside the title
with the industry’s description under it as an edition line; "keep". So the
title is the product and the industry, nothing under it; each version differs
by its screen, the jobs line in the list and the figure under the screen.
Will also: "ur meant to show me all the things in a screenshot", so the
section as built is captured whole, every industry clicked, in
`design-pass-site-2026-10-17-operating-systems-built.png` (from the script of
the same name). The phone-layout pick is still open.

## [x] Operating Systems: the audit tag off the line (17 Oct 2026)

Will: "for the operating systems i dont think i want the 'yours come out of
the audit' to be shown". Removed. The line under the screen is the figure as
one sentence naming the business it is worked for, with nothing after it.
The disclosure stays on the page: every drawn screen already says "Example
figures" in its own small print (Property, Trades, Hospitality, Health,
Finance).

## [~] Operating Systems: the close’s wording, and the phone layout redrawn (options 17 Oct 2026)

Will: "for the link i think i want it to say 'Your Herbert OS' or something
like that, idk lets ideate for that". Board:
`design-pass-site-2026-10-17-os-close-words.png`, from the script of the same
name, the link’s words only. Today "Your AI operating system, from $25,000,
scoped after the audit" to /pricing. 1 "Your Herbert OS, from $25,000" to
/pricing, the name and the price, the same shape as the AI Employees close
(recommended). 2 "Build your Herbert OS" to the audit booking. 3 "What would
your Herbert OS cost?" to /pricing.
Will also: "u havent shown me the phone layout options". The 16 Oct board had
gone out bundled with the names board and was drawn before the title and line
changes; redrawn on the section as it now stands:
`design-pass-site-2026-10-17-os-phone.png`. Today the laptop layout stacked;
1 pills then the screen; 2 pills then the screen cropped to the owner’s one
decision (recommended); 3 no screen, the active row opening into its title and
line.
Will (17 Oct 2026): "3, i like 2, but its cropped the employees", then "we
should almost have like a mobile version of the OS an owner can use it from".
Built: the close reads "What would your Herbert OS cost?" to /pricing. On
phones the section shows the industries as pills and, under them, the phone
version of that industry’s Herbert OS (`components/runs/os/mobile.js`): the
day’s numbers, the one thing waiting on the owner, and what was done for them,
the whole team visible, playing once on a tap (the approval goes amber to
green and its outcome lands at the top), "Example figures" in its own small
print. The laptop keeps the full screen and the industry list. Found while
building: the section was missing a React import (a 500 on the homepage until
fixed; lint does not check undefined names here), and the pill row widened the
grid column at 375 until the column got `min-w-0`. Checked at 1440, 1280, 375
and 320 in both motion modes with every tab played: no overflow, no errors.
Sheet: `design-pass-site-2026-10-17-os-mobile.png`, which also carries an
option: the phone version over the laptop screen’s corner
(`phoneOnDesktop`, lab only).
Will (17 Oct 2026): "phones only, and get rid of the example figures thing".
The laptop-phone option and its prop are removed; the phone version shows on
phones only. Every "Example figures" label is gone: the phone version’s
footer and the small print in all five laptop screens. What keeps the
figures honest now: each screen’s bar names it an example business, each
sentence under the screen names the business it is worked for, "about" and
the ranges stay, and the value model is the grounds. Checked: no label found
on any industry at 1440 or 375, no overflow, no errors. Sheet:
`design-pass-site-2026-10-17-os-final.png`. With this the Operating Systems
details are done.

## [~] Products, redrawn (options 17 Oct 2026)

Will: "show me the options". The 16 Oct board predated the Herbert OS name, so
redrawn on the current page: `design-pass-site-2026-10-17-products.png`, from
the script of the same name, today and each option at 1440 with the phone
beside it. 1 its own band (recommended) and 2 screen and words unchanged. 3
the shelf now reads "The Herbert products." with Herbert Reach (early access)
beside Herbert OS (from $25,000, its five industries, "What would your Herbert
OS cost?"), in place of the dashed "later" card. Seen on the board: on phones
the dashboard shrinks the way the Operating Systems screens did, so whichever
option lands gets a phone treatment.
Will’s pick (17 Oct 2026): "1 - the its own band looks cool, it gives a
distinctive premium feel".

## [x] Products built: its own band (17 Oct 2026)

`components/runs/ProductsSection.js` on the homepage between Operating Systems
and the founder note: the dark band from option 1, the marketing dashboard
playing once in view on a laptop, and on a phone `components/runs/ReachMobile.js`,
Herbert Reach as the owner runs it from their phone (the month’s numbers, the
Meta campaign waiting on them, what the engine did; the approval goes amber to
green and an enquiry lands at the top). The phone body and scaler are shared
with Herbert OS (`PhoneFrame`, `PhoneScaled` in `os/mobile.js`); the frame gets a
faint edge on the dark band. The link "See Herbert Reach" goes to the engine’s
example page for now. Checked at 1440, 1280, 375 and 320 in both motion modes:
no overflow, no errors; 200px of the next section shows at 1440x900, 167px at
1280x800. Sheet: `design-pass-site-2026-10-17-products-built.png` (the band at
laptop and phone, then the band in the page). Next: Who Builds It, still the
May register.

## [~] Products details, 1 of 5: the line under the name (options 17 Oct 2026)

Will: "details pass ? why do u keep skipping that". The same skip as
Operating Systems: "built" was treated as done. The method is pick, build,
details pass, then the next section; saved as a standing rule in memory
(site-rebuild-details-pass-every-section). Five details for the band: the
line under the name, the facts, the early-access note, the close, the phone
layout. Fixed directly as a bug, not a pick: the dashboard inside the band
called itself "Marketing engine" under a "Herbert Reach" heading; it now takes
the name (`EngineDashboard name=`), the /work example page unchanged. Board:
`design-pass-site-2026-10-17-products-line.png`. Today the engine page’s
sentence, three lines; 1 "Ads that run themselves. You approve anything new."
(recommended); 2 "Your Google ads written, tested and paused against what they
bring in."; 3 "The ad engine Herbert AI runs its own marketing on." Awaiting
Will’s pick.

## [~] Products, facts first: what Herbert Reach is (17 Oct 2026)

Will, on the line board: "i think we need to start with defining what your
idea of Herbert Reach is first". The roadmap’s step 1, skipped: the band was
drawn and its copy drafted with no settled definition. Draft definition, from
code/marketing-engine/PROJECT.md, BUILD-PLAN.md and the other session’s
research of 16 and 17 Oct (marketing-tools-2026-10-16.md,
cpl-strategies-2026-10-17.md and its actual-setup note), awaiting Will:

- One line: Herbert Reach turns a local service business’s ad budget into
  booked jobs. It sets up and runs the Google and Meta ads, answers every lead
  within a minute, and shows spend against booked jobs, with the owner
  approving anything new.
- For: owner-operated local service businesses, 3 to 20 staff, A$700 to A$3k
  a month on ads, no marketer and no agency (PROJECT.md says trades first).
- Three parts: ads (four questions in, campaigns built in the cheapest-lead
  setup, every ad approved, a weekly optimiser within guardrails); leads (a
  reply within a minute by text, email or call, a follow-up that stops on a
  reply, missed-call text-back, the booking written in); proof (spend, leads,
  booked jobs and revenue per campaign).
- Why it holds up: the platforms now own targeting and bidding and give ad
  generation away; what stays worth paying for is the lead side and the proof.
- Sold as: early access until it has real numbers from Herbert AI’s own ads,
  then a tiered subscription positioned against agencies (unpriced until the
  M1 pricing gate).
- Today: the machinery is built; nothing is serving (Meta v2 waits on the
  founder photo, Google paused since 18 Sep), so there are no numbers yet.

What it changes for the band: the facts list covers only the ads part; the
lead half and the proof, the parts the research says hold their value, are
missing. And "it runs Herbert AI’s own ads first" is only true once the Meta
campaign is live.

Will (17 Oct 2026): "ok im editing what Herbert Reach is in another session.
but pretty much, its for any and all industries, and its meant to serve as the
one stop shop for digital marketing for a business, where the premise is they
enter their business name, and then there is an AI agent that gathers all the
information about their business and industry, and then it is an optimised
intelligent digital marketing analytics dashboard, where all the actual
marketing and completely automated and optimised by a digital marketing agent
on the backend that determines and does the best practices on ensuring that
business has the best marketing they can get, while also being the cheapest
possible. i assume theres multiple agents on the backend that interact with
eachother or something, and theres different types of information each agent
uses to do its job". So the draft above is superseded by his definition, which
the other session is writing up. The band’s line, facts and visual wait for
that write-up; the visual should show the arc he describes (a business name
in, the research, the marketing running, the dashboard).

## [x] Products, facts: Herbert Reach defined (19 Oct 2026)

Will: "reach is defined". The definition is
`code/marketing-engine/docs/REACH-DEFINITION.md` (settled 17 Oct 2026): a small
business’s whole marketing department; the owner types the business name, AI
employees (researcher, strategist, creative, one per channel, lead, analyst)
research the business, decide and run the marketing on every channel it should
run on, answer every lead until it is a booked job, optimise cost per booked
job, and show it on one screen; any industry, 3 to 20 staff; the owner approves
two things only, a new ad or post and any spend increase; early access until
Herbert AI’s own ads have numbers. The name is settled (registers clear; use
"Herbert Reach" in full). What it changes in the band: the line, the facts and
the visual all describe an ad tool; they get redrawn. Details, now six: the
line, the facts, the visual (the arc from a business name to the dashboard),
the early-access note, the close, the phone layout.

## [~] Products details, 1 of 6: the line, from the definition (options 19 Oct 2026)

Board: `design-pass-site-2026-10-19-products-line.png`, from the script of the
same name, the band at 1440 with the top of the phone layout beside it. Today
"Ads that run themselves against real results: written, tested and paused by
the system, with anything new held for you to approve." (an ad tool, written
before the definition). 1 "Your whole marketing department. You approve what
goes out." (the definition’s one line in two halves; recommended). 2 "Type in
your business name. Herbert Reach does the marketing." 3 "A marketing
department of AI employees, on one screen."
Will (19 Oct 2026): "maybe, 'Your whole marketing department at the click of a
button'". Built as the line. It drops the approval rule, so the rule moves into
the facts (detail 2). The facts
and the dashboard are still the ads-only ones; details 2 and 3.

## [~] Products details, 2 of 6: the facts (options 19 Oct 2026)

Board: `design-pass-site-2026-10-19-products-facts.png`, with Will’s line in
place, laptop and the top of the phone. Today the three ads-only facts. 1 What
it does: "Learns your business from its name", "Runs your ads and posts, and
answers every lead within a minute", "Shows what you spent against the jobs it
booked", "You approve every new ad and any increase in spend" (recommended;
carries the approval rule the line dropped). 2 The team: Researcher,
Strategist, Creative, Lead employee, Analyst, one line each, the approval left
to the early-access note. 3 The first ten minutes: the account walkthrough as
four numbered steps. Will (19 Oct 2026): "uhh idk about any of these, they dont read that catchy. i
was thinking spruce up the energy/catchiness of the words". None picked.

## [~] Products details, 2 of 6, round 2: the facts with more energy (options 19 Oct 2026)

Board: `design-pass-site-2026-10-19-products-facts-r2.png`, from the script of
the same name, same band and line, only the ruled list changed. Every claim
kept inside the definition: landing pages dropped (not built yet), no results
promised, the approval rule in every option. 1 Five verbs, the verb in bold:
"Learns your business from its name", "Runs your ads and posts, and keeps
testing new ones", "Answers every lead inside a minute", "Shows every dollar
against the jobs it booked", "Asks you before any new ad or extra spend"
(recommended). 2 The department, a roster with the role in mono: Researcher
"Knows your business from its name", Strategist "Puts the budget where jobs are
cheapest", Creative "Makes ads that don’t look like everyone else’s", Lead
employee "Answers every enquiry inside a minute", Analyst "Cuts what wastes
money, backs what books jobs", You "Say yes to every new ad and any extra
spend". 3 Short lines, five sentences with full stops: "Type your business
name. Meet your marketing team.", "Ads and posts made, run and tested for
you.", "Every lead answered inside a minute.", "Every dollar tracked against
the jobs it books.", "Nothing new goes live without your yes." Will (19 Oct
2026): "none of these are grabbing my attention still. u need to figure out
how u can learn what is catchy ad copy". None picked.

## [~] Products details, 2 of 6, round 3: the facts by the catchy-copy method (options 19 Oct 2026)

Before drawing again, the method: research in the files repo,
`product/research/markdown/catchy-copy-2026-10-19/` (craft.md, the copywriting
sources; swipe.md, 250 real lines from 39 product sites and 28 award-winning
ad lines; science.md, the memorability studies; method.md, the method). The
causes it found: the writing-style Marketing rules were made for paragraphs
and rule out the devices short lines run on; Claude’s recommendations have
favoured precision where Will picks rhythm and one claim (the AI Employees
heading, the Operating Systems close, the Products line); and round 2's verb
plus noun rows are the commonest and least memorable feature-row shape.

Two sheets. `design-pass-site-2026-10-19-products-line-test.png`: 30 lines
that passed the gates (true today or flagged, no result promised, no ad
platform named, since Meta still waits on app review), scored out of 5 on
picture, prove, only us (Harry Dry's three questions), device, and Will's
shape, for Will to mark. `design-pass-site-2026-10-19-products-facts-r3.png`:
three lists on the band. 1 One-liners, set bigger and white: "Type your name.
Meet your marketing team.", "Marketing that picks up the phone.", "Benches
the ads that don’t book jobs.", "See what each job cost to win.", "Asks before it
spends a cent more." (recommended, the best scorers that each say a
different thing). 2 Heading and proof, the shape the best product lists use:
"One name to start.", "Marketing that picks up the phone.", "Benches the ads
that don’t pay.", "Asks before it spends a cent more.", each with one plain
sentence under it. 3 Two beats, the shape of Will's own picks: "Type your
name. Meet your marketing team.", "Busy? It’s already called them back.", "Bad
ads benched. Good ones fed.", "Every dollar spent, next to every job
booked.", "New ads wait for your yes. So does more spend." (a question row swapped out after the memorability studies leaned against questions as rows; "Busy?" stays, flagged, to test Will’s taste against them). Claims to clear in phase 6:
the start rows are true once the researcher is built (third in the build
order), and the optimiser benches on cost per enquiry until booked-job
feedback is built. Will (19 Oct 2026), after asking for a recommendation that does not repeat
itself: "i like the writes ads, runs ads, answers leads, books jobs, each as
its own line? and we could have a type your name at the start as well? sort
of telling a story of what the product does", then "what do u think of that?
maybe can u show me what that story looks like, and then what ur
recommendation looks like".

## [~] Products details, 2 of 6, round 4: the story (options 19 Oct 2026)

Board: `design-pass-site-2026-10-19-products-facts-r4.png`, from the script of
the same name, each row its own line with a mono step number. 1 Will’s story:
"Type your name.", "Writes ads.", "Runs ads.", "Answers leads.", "Books
jobs." 2 the same with "You approve." after "Writes ads.", the owner’s two
steps a shade softer (recommended: the band otherwise carries no approval
rule, and the site promises a person approves what goes out). 3 round 3’s
one-liners for comparison. Will (19 Oct 2026): "i think i like 1".

## [x] Products details, 2 of 6: the facts are Will’s story (19 Oct 2026)

Built: `STORY` in `components/runs/ProductsSection.js`, an ordered list of
five rows, each a mono step number (hidden from screen readers, the list is an
`ol`) and the step at 20px semibold white: "Type your name.", "Writes ads.",
"Runs ads.", "Answers leads.", "Books jobs." The approval rule is no longer on
the band (the phone version keeps "You approve every new ad"); Will chose the
story without it. Verified at 1440, 1280, 375 and 320, motion on and off: no
row wraps, no horizontal overflow, no console or page errors; the band is
807px at 1440x900 and 740px at 1280x800, so the next section still shows.
As built: `assets-2026-10-19/products-story-built-1440.png` and `-375.png`.
Claim to clear in phase 6: "Type your name." is true once the researcher is
built. Next: detail 3 of 6, the visual.

## [~] Products details, 3 of 6: the visual (options 19 Oct 2026)

Board: `design-pass-site-2026-10-19-products-visual.png`, from the script of
the same name, static mock-ups swapped into the band’s laptop frame at 1440
with the story’s matching row lit. Today: the ads-only dashboard, which shows
step 3 and part of 4 and nothing of 1, 2 or 5. 1 The story plays: one screen
per step, the list row lighting with it (the name and what the researcher
found; the first ads with one waiting on the owner in amber; the ads running
with a budget move; an enquiry called back and booked; the week of booked
jobs with cost per job), drawn on step 4 with all five in a strip
(recommended: every step visible, and the approval kept on screen in step 2).
2 One dashboard matched to the story: a tile per step from 2 to 5 and a
leads table, the lit row’s tile outlined. 3 The day’s feed: one day in story
order with the day’s numbers, closest to the Herbert OS screens above it.
Every figure belongs to Dave’s Plumbing, an example business; Google is the
only platform shown while Meta waits on app review. The phone version is
detail 6. Awaiting Will’s pick.

Will (19 Oct 2026), on the board: "i like todays visual i think, what do u
think". Recommended keeping it with three fixes (the landing page entry, the
Meta rows, cost per enquiry), then Will: "why doesnt Herbert Reach build
landing pages yet. we arent selling what we have built yet, we're selling the
full product. and we dont have to commit this products page yet, but lets
build it up".

## [x] Products details, 3 of 6: the visual is today’s layout, built up to the full product (19 Oct 2026)

Decision: the Products band sells Herbert Reach as defined
(code/marketing-engine/docs/REACH-DEFINITION.md), not only what is built; the
early-access note covers the gap and no result is promised. So landing pages
and Meta stay, and the claims flagged earlier against the build ("Type your
name.", benching on booked jobs) are clear. Built:
`components/runs/ReachDashboard.js`, today’s layout carrying the whole
department: tiles for spend across every channel, enquiries (every one called
back), jobs booked and cost per job; a chart of spend and booked jobs; a
channels table (Google ads, Meta ads, Google Business Profile, social posts,
email to past customers) with enquiries, jobs and cost per job; and the
morning as the AI employees (Researcher, Analyst, Creative with the new ad and
landing page held for the owner then approved, Social, Reviews, Leads with an
enquiry called back in 48 seconds and booked). Plays once in view; each feed
row carries its status on its time row so the whole dashboard fits the frame
(690px of 740). `EngineDashboard` stays for the /work example page. Verified
at 1440, 1280, 375 and 320, motion on and off: no overflow, no errors. Held back
at first at Will’s word, then committed on his "commit" (19 Oct 2026).
Screens: `assets-2026-10-19/products-reach-dash-1440.png` and `-mid-1440.png`.
Checked on the Vercel preview after the push: the band serves the story and
the full-product dashboard.

## [~] Products details, 4 of 6: the early-access note (options 19 Oct 2026)

By the Lines register (writing-style `references/lines.md`). Line test:
`design-pass-site-2026-10-19-products-note-test.png`, 24 lines that passed the
gates (true of Herbert Reach as defined, no result promised, no scarcity the
plan does not have), scored out of 5. Options:
`design-pass-site-2026-10-19-products-note.png`, the pill kept and only its
sentence changed. Today "It runs Herbert AI’s own ads first, and opens up once it
has the numbers to show for it." 1 "It spends Herbert AI’s money before it spends
yours." (recommended: the skin in the game Will named on the Operating Systems
figures, as a mirror) 2 "Herbert AI hired it first." 3 "Herbert AI is customer
one. Ask to be next.", the last three words a link to the audit (overlaps the
close, detail 5). Awaiting Will’s pick.
Will (19 Oct 2026), asking what the line is about, then: "i think we just
remove that, and the early access note. and instead of the see Herbert Reach,
we have a still in development, or in alpha phase, or something".

## [x] Products details, 4 and 5 of 6: no note, no link, a status label (19 Oct 2026)

Built: the early-access note and both "See Herbert Reach" links are gone from
`ProductsSection.js`; in their place, under the story, a mono pill with a grey
dot (grey is not live yet on this site) reading "In development" (`STATUS`).
Board: `design-pass-site-2026-10-19-products-status.png`, the built label beside
"Alpha" (software talk a plumber may not read) and "Coming soon" (promises
timing nobody has set), each swapped in the page. Verified at 1440, 1280, 375
and 320, motion on and off: no links or note left in the band, no overflow, no
errors; the band is 754px at 1440x900 and 687px at 1280x800. Charter section
5 updated (the name settled, sold as the full product, In development, no link
out until it opens). The band has no way out now; the page’s one action stays
the audit. Next: detail 6 of 6, the phone layout.
Will (19 Oct 2026): "keep".

## [~] Products details, 6 of 6: the phone layout (options 19 Oct 2026)

The phone version of Herbert Reach (`components/runs/ReachMobile.js`) was the
ads-only one (cost per enquiry, a Meta campaign card, a daily audit feed). It
is rebuilt as the full product to match `ReachDashboard`: spend across every
channel, jobs booked, cost per job; the Creative’s new ad and landing page
waiting on the owner, then approved; a hot water enquiry called back in 48
seconds and booked landing at the top, over the Analyst, Social and Reviews.
Committed with the board because options 1 and 3 both use it and the old
content was wrong for the full product. Board:
`design-pass-site-2026-10-19-products-phone.png`, the whole band at 375. Today
(captured before the rebuild). 1 the story then the rebuilt phone version
(recommended). 2 no phone version, the story alone (712px against 1385px). 3 the
phone version straight under the line, the story after it. All three checked at
375 and 320: nothing clipped inside the phone, no overflow, no errors. Awaiting
Will’s pick.
Will (19 Oct 2026): "1". Already built (bc3eb75): the story, then the
full-product phone version. Products is done: line, facts, visual, the note
and the link (In development in their place) and the phone layout.

## [~] Who Builds It, facts and options (19 Oct 2026)

Facts first. The 16 Sep decisions (`product/research/markdown/herbert-ai-identity-and-website-2026-09-16-decisions.md`)
put name, photo and first-person voice on the home founder note; the charter,
written after it on 22 Sep, says “A founder photo on About only”; no photo of
Will is on file (`FOUNDER_PHOTO` is null in page.js, a “W” tile stands in). The
section is the last one still in the May register (cream, the old display
font). Board: `design-pass-site-2026-10-19-founder.png`, the section replaced
in the page at 1440 and 375, Will’s first-person line kept as it stands. Today.
1 The note, set plain: the line large on the paper ground, the label and a link
to About, no photo, by the charter (recommended). 2 Name and photo: a portrait
slot beside the line, the 16 Sep decision, needing a real photo. 3 A signed
note: a heading (“One person builds it.”), the line as a paragraph with one more
sentence, and a sign-off (name, Founder, Adelaide, the email). Awaiting Will’s
pick.
Will (19 Oct 2026): "1".

## [x] Who Builds It built: the note, set plain (19 Oct 2026)

`FounderNote` in `src/app/page.js` rebuilt for the charter: the paper ground,
the label "Who Builds It", Will’s first-person line at clamp(26px, 3vw, 42px)
semibold, and "More about Will" to /about. No photo (the charter keeps it to
About), so `FOUNDER_PHOTO` and the "W" tile are gone, with the now unused
RevealOnScroll and Eyebrow imports. No motion. Verified at 1440, 1280, 375 and
320, motion on and off: no overflow, no errors; the section is 441px at
1440x900 and 428px at 1280x800, so the closing section shows under it. As
built: `assets-2026-10-19/founder-built-1440.png` and `-375.png`. Details:
1 the words, 2 the close, 3 the phone layout.

## [~] Who Builds It details, 1 of 3: the words (options 19 Oct 2026)

By the Lines register. Line test: `design-pass-site-2026-10-19-founder-words-test.png`,
16 lines that passed the gates (true, Will’s name kept, nothing that makes one
person read small, the weak position Will flagged on the Operating Systems
tags), scored out of 5. Options: `design-pass-site-2026-10-19-founder-words.png`,
only the line changed, the name on its own line. Today the 24-word line. 1
"I’m Will Herbert. I audit it. I build it. I answer for it." (recommended: the
three-verb story shape Will picked for Products, ending on accountability) 2
"I’m Will Herbert. You talk to the person who builds it." 3 "I’m Will Herbert.
The one who builds it is the one you call." Awaiting Will’s pick.
Will (19 Oct 2026): "i feel like the who builds it is a bit cheesey? idk".
Assessed: the label is plain, the cheese is the first-person pitch in a page
where Herbert AI speaks in the third person, made worse by the slogan devices
in the three options. Offered 1 keep the fact and drop the pitch, or 2 cut the
section from home. Will: "1".

## [~] Who Builds It details, 1 of 3, round 2: said flat (options 19 Oct 2026)

Board: `design-pass-site-2026-10-19-founder-flat.png`. The label becomes
"Founder" and the line a plain third-person fact: "Herbert AI is Will Herbert,
in Adelaide. He builds every system, and you deal with him from the audit to
the day it goes live." Today; 1 at today’s size (recommended); 2 quieter, at
body size in grey. Awaiting Will’s pick.
Will (19 Oct 2026): "1 - i think we do Herbert AI was founded by Will Herbert,
based in Adelaide. idk if we need the 'he builds every system' part, what do u
think". Recommended dropping "builds every system" (reads small, goes stale
with a first hire) and keeping the no hand-off promise. Will: "you deal with
him from the audit to the day it goes live reads as if its a pain point".
Offered "works with you", "is with you", or the first sentence alone. Will: "1".

## [x] Who Builds It details, 1 of 3: the words (19 Oct 2026)

Built: the label "Founder" and the line "Herbert AI was founded by Will
Herbert, based in Adelaide. He works with you from the audit to the day it
goes live." at today’s size. Verified at 1440, 1280, 375 and 320, motion on
and off: no overflow, no errors, the link to /about. Charter section 6 updated.
Lesson for the Lines register: "deal with" reads as a chore even when the
promise is good; check verbs for the feeling they carry, not only the fact.

## [~] Who Builds It details, 2 and 3 of 3: the close and the phone (options 19 Oct 2026)

One board, batched: `design-pass-site-2026-10-19-founder-close.png`. The close:
today "More about Will" to /about (recommended: keep, it fits the Founder label
and About holds the photo and the longer story); 2 "Book an audit with Will",
which asks twice in a row with the audit section next; 3 no link. The phone
layout as built at 375 and 320: one column, the line at 26px, nothing cut off,
no overflow (recommended: keep). Awaiting Will’s word on both.
Will (19 Oct 2026): "keep both". Who Builds It is done: built as the note set
plain, the words said flat under Founder, the close and the phone kept.

## [~] Book the Audit, facts and options (19 Oct 2026)

Facts: the one action is the free AI audit (`AUDIT_HREF`, /pilot#book, a form
of name, business, email and phone that sends to Web3Forms, with an
auto-reply promising a call that day to set a time); the audit facts are
`RUNGS[0]`; a sample audit page exists at /pilot/sample-audit. Today is the May
register (the display font, the neon green button), the last of it on the
page. Board: `design-pass-site-2026-10-19-audit.png`, the section replaced in
the page at 1440 and 375, today’s heading kept in all three (its words are a
detail after the pick). 1 The facts as steps: the ink band, the heading left,
the three audit facts as numbered rows right (the Products story form), the
button and a link to the sample audit. 2 One line and the button, on the paper
ground. 3 The form, right here: the heading and the facts left, the booking
form right (recommended: someone who read the whole page books without loading
another; building it moves the /pilot form into one shared component). The
form line says “You get a call to set a time”, what happens, not who (11 Oct
rule). Awaiting Will’s pick.
Will (20 Oct 2026): "3".

## [x] Book the Audit built: the form, right here (20 Oct 2026)

`components/site/AuditForm.js` is now the one booking form: the Web3Forms
endpoint, the hidden fields and auto-reply, `SourceFields` attribution and the
honeypot, with `source` naming the page in the email subject. /pilot#book uses
it with `look="pilot"` and the message box, unchanged: checked against the
live site, the same fields, subject and 959px section. The homepage’s
`FinalCTA` is rebuilt for the charter: the ink band, "Book the Audit", today’s
heading in Geist, the three audit facts from `RUNGS[0]` as numbered rows, and
the form on a paper card (`look="paper"`, four required fields, subject "New
AI audit request · home", "Free. You get a call to set a time."), the contact
line under it. The neon green button is gone from the page. Verified at 1440,
1280, 375 and 320, motion on and off: no overflow, no errors; the section is
570px at 1440. The form was not submitted (it would send a real booking).
Charter section 7 updated. As built: `assets-2026-10-19/audit-built-1440.png`
and `-375.png`. Details: 1 the heading, 2 the facts, 3 the form’s words, 4 the
phone layout.

## [~] Book the Audit details, 1 of 4: the heading (options 20 Oct 2026)

By the Lines register. Line test: `design-pass-site-2026-10-20-audit-heading-test.png`,
14 lines that passed the gates (true of the audit as /pilot describes it, no
result promised, a question allowed as a single close). Options:
`design-pass-site-2026-10-20-audit-heading.png`, only the h2 changed. Today
"Got a job everyone hates doing?" 1 "Your worst jobs, on one page." (recommended:
the written page with the three costliest jobs, made physical) 2 "Book the
audit. Keep the page." 3 "Which job would you hand over first?" Awaiting
Will’s pick.
Will (20 Oct 2026): "i think i like today". The heading stays "Got a job
everyone hates doing?"; logged in writing-style `references/lines.md` (the
owner’s own question beat the deliverable made physical).

## [~] Book the Audit details, 2 of 4: the facts (options 20 Oct 2026)

Board: `design-pass-site-2026-10-20-audit-facts.png`, the rows replaced in the
page. Today the three facts of How It Works’ step 1, word for word, a screen
up the same page. 1 What happens next: "You get a call to set a time.", "45
minutes on how your business runs.", "A written page in two business days.",
"Yours to keep, either way." (recommended; the form’s small print would drop
to "Free." so the call is not said twice). 2 What is on the page: "The three
jobs eating the most hours.", "What each one costs you a year.", "Which one to
hand over first." 3 No list: one line, "45 minutes, a written page back."
Awaiting Will’s pick.
Will (20 Oct 2026): "3", then, mid-build: "i think maybe we do 'Got a job
eating your time and money?' instead".

## [x] Book the Audit details, 1 and 2 of 4: the heading and the facts (20 Oct 2026)

Built: the heading is Will’s own, "Got a job eating your time and money?" (the
question shape he kept, with "eating" from the line test’s fifth line), and
the fact rows are gone for one line, "45 minutes, a written page back." (How It
Works already gives the audit’s facts). Verified at 1440, 1280, 375 and 320,
motion on and off: no overflow, no errors; the section is 569px at 1440. As
built: `assets-2026-10-19/audit-built-1440.png` and `-375.png`. Next: details
3 and 4, the form’s words and the phone layout.

## [~] Book the Audit details, 3 and 4 of 4: the form’s words and the phone (options 20 Oct 2026)

One board, batched: `design-pass-site-2026-10-20-audit-form.png`. The button
and small print: today "Book my free audit" and "Free. You get a call to set a
time."; 1 "Book a free AI audit", the hero’s words, so the one action reads the
same at the top and bottom of the page (recommended); 2 "Book my audit" with
"Free. You get a call the same day."; 3 today’s button with "Free and no
obligation. You get a call the same day." The phone layout as built at 375 and
320: nothing cut off, no overflow (recommended: keep). Awaiting Will’s word.
Will (20 Oct 2026): "1, remove the 'free, you get a call to set a time'".

## [x] Book the Audit details, 3 and 4 of 4 (20 Oct 2026)

Built: the homepage form’s button reads "Book a free AI audit", the hero’s
words, and carries no small print (`AuditForm` look "paper"; /pilot keeps its
own button and note, checked). The phone layout kept as built. Verified at
1440, 1280, 375 and 320, motion on and off: no overflow, no errors; the
section is 535px at 1440. Book the Audit is done, and with it phase 3: all
seven homepage sections have been picked, built and through their details
pass. Next: phase 4, the whole page (rhythm, spacing, transitions, repeated
words, motion level).

## [~] Phase 4, the whole page: findings (20 Oct 2026)

As built: `assets-2026-10-20/home-whole-1440.png` and `home-whole-375.png`
(reduced motion, every section scrolled through first). Measured at 1440x900:

| Section | Ground | Height | Moves |
|---|---|---|---|
| Hero | paper | 824 (+76 header, fills the screen) | yes, the board |
| How It Works | paper | 732 | no |
| AI Employees | paper | 1533 (the scroll scene) | yes |
| Operating Systems | paper | 748 | yes, the screen plays |
| Products | ink | 754 | yes, the dashboard plays |
| Founder | paper | 441 | no |
| Book the Audit | ink | 535 | no |

Findings:
1. Spacing holds: only the hero fills a screen; every other section shows a
   bit of the next (the AI Employees scene is long by design).
2. The ending flickers: four paper sections, then ink, a 441px paper strip,
   and ink again. The short Founder band between two dark bands reads as a
   stripe. Recommended: move Founder up, between Operating Systems and
   Products, so the page runs light then dark: five paper sections, then the
   two ink bands (Products, Book the Audit) to the end, split by a hairline.
   That changes the settled order, so it is Will’s call.
3. "45 minutes, a written page back" appears word for word under the hero’s
   button and again in Book the Audit. Recommended: keep, as a bookend (the
   same promise at the first button and beside the form).
4. Motion: three sections in a row play (AI Employees, Operating Systems,
   Products), then the page goes calm. Each plays once in view and they are
   different kinds of motion. Recommended: keep.
Repeated words counted on the page: "audit" 7, "free" 7, "45 minutes" 3,
"written page" 3, "Adelaide" 3; none read as padding beyond finding 3.
5. The footer is still the May register (cream, the old type), the last of it
   under the homepage, and it sits on every page. Recommended: bring it onto
   the paper ground in Geist, the same columns, as a phase 4 fix.

Finding 2 drawn: `design-pass-site-2026-10-20-page-order.png`, the whole page
at 1440 three ways: today; 1 Founder moved up between Operating Systems and
Products, light then dark (recommended); 2 Founder turned ink, three dark bands
to the end. Awaiting Will’s word on findings 2 to 5.
Will (20 Oct 2026): "i think we have founder at the bottom".

## [x] Phase 4, finding 2: the founder note at the bottom (20 Oct 2026)

Built: the homepage order is Hero, How It Works, AI Employees, Operating
Systems, Products, Book the Audit, Founder. Products and Book the Audit run
dark together with a hairline between them (`border-white/10` on the booking
section), and the founder note closes the page above the footer. Verified at
1440, 1280, 375 and 320, motion on and off: no overflow, no errors. Charter’s
section list renumbered. As built: `assets-2026-10-20/home-end-1440.png` and
`home-whole-1440.png`. New, from the move: the contact line under the form
("Will Herbert · Adelaide · email") now sits straight above the founder note,
which says the same. Findings 3, 4 and 5 (the repeated line, the motion run,
the May footer) still open.

