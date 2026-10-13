import Link from 'next/link'
import Hero from './components/Hero'
import RevealOnScroll from './components/motion/RevealOnScroll'
import { INDUSTRIES, RUNGS, Eyebrow, AuditButton } from './components/site/shared'

// Home, restructured 16 Sep 2026 around the ladder (free audit, first AI
// employee, the system it runs in). The three bucket chapters are retired from
// home; their capability content lives on /services. Plan and decisions:
// docs/restructure-2026-09/PROJECT.md.

// Founder photo: drop the file at public/will.jpg and set this to '/will.jpg'.
const FOUNDER_PHOTO = null

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Proof />
      <IndustriesStrip />
      <FounderNote />
      <FinalCTA />
    </>
  )
}

// How it works, rebuilt 10 Oct 2026 for the "Runs itself" charter: design pass
// option B, the three steps set plain (Will: "B"). The steps on the paper
// ground in Geist, columns ruled at the top, the audit button matching the
// hero's. Detail 1, the words (11 Oct 2026): three short facts per step instead
// of a paragraph (Will: "3"), and the copy says what happens, never who does it
// ("45 minutes auditing your business", not "45 minutes with Will"). Detail 4,
// the close (12 Oct 2026): the pricing link alone (Will: "2"); the hero's audit
// button is one screen up and the page ends on one. Detail 5, spacing (12 Oct
// 2026): tighter, 96px above and below and 48px inside (Will: "1 - i think the
// hero is the main, and then it tells a sort of story with the next few
// sections, so they all show a bit of the next section").
// Nothing moves: on this site motion means a job finishing, and
// this section has no jobs on it. Options A and C live in
// components/lab/HowItWorksOptions.js until the lab is removed, then in git
// history.
function HowItWorks() {
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
        <div className="mb-12">
          <p className="text-[15px] font-medium text-[#555] mb-4">How it works</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            Start with the job that costs you most.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
          {RUNGS.map((r, i) => (
            <div key={r.n} className="border-t border-[#111]/15 pt-6">
              <p className="text-[15px] font-medium text-[#777] mb-5">Step {i + 1}</p>
              <h3 className="text-[24px] font-semibold tracking-[-0.02em] mb-3">{r.title}</h3>
              <ul>
                {r.facts.map((f) => (
                  <li key={f} className="text-[16px] leading-[1.45] text-[#444] py-2 border-t border-[#111]/8">{f}</li>
                ))}
              </ul>
              <p className="mt-5 text-[14px] font-medium">{r.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link
            href="/pricing"
            className="text-[15px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111] transition-colors"
          >
            See how it&apos;s priced
          </Link>
        </div>
      </div>
    </section>
  )
}

// The work, rebuilt 13 Oct 2026 for the "Runs itself" charter: design pass
// option C, one system large and the rest listed beside it (Will: "C - i think
// we need to have a different visual"), with visual 2, the property
// dashboard's requests table as a still (Will: "fix the dashboard and 2"). The
// dashboard itself was fixed the same day (its mock-mode warning removed, its
// demo dates moving forward to today), and the still leaves out the Received
// column, since a picture cannot keep its dates current the way the live page
// does. Spacing matches How it works, and the still is cropped to the top of
// the table with "All the systems" under the list, so on a 900px-tall laptop
// the next section shows under this one (Will's rule). Options A and
// B, and visuals 1 and 3, live in components/lab/ until the lab is removed.
const PROOF = [
  {
    tag: 'Live, click in',
    title: 'A property manager’s dashboard',
    href: 'https://dashboard.herbert-aisolutions.com',
    external: true,
    verb: 'Open it',
  },
  {
    tag: 'Demo, plays itself',
    title: 'An accountant’s document chaser',
    href: '/demo/accountants',
    external: false,
    verb: 'See it run',
  },
  {
    tag: 'Currently building',
    title: 'An operations hub for a finance brokerage',
    href: '/work',
    external: false,
    verb: 'Read about it',
  },
  {
    tag: 'Built',
    title: 'A marketing engine',
    href: '/work',
    external: false,
    verb: 'Read about it',
  },
]

function ProofLink({ p, className, children }) {
  return p.external ? (
    <a href={p.href} target="_blank" rel="noreferrer" className={className}>{children}</a>
  ) : (
    <Link href={p.href} className={className}>{children}</Link>
  )
}

function Proof() {
  const [live, ...rest] = PROOF
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
        <div className="mb-12">
          <p className="text-[15px] font-medium text-[#555] mb-4">The work</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            The systems, not the slides.
          </h2>
        </div>
        <div className="grid lg:grid-cols-[1.28fr_0.72fr] gap-x-12 gap-y-10 items-start">
          <ProofLink p={live} className="group block">
            <div className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden group-hover:border-[#111]/30 transition-colors">
              <div className="px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono text-[#555] truncate">
                dashboard.herbert-aisolutions.com &middot; live, example data
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/work/property-dashboard-requests.png"
                alt="The property dashboard's maintenance requests: each tenant's issue, its urgency and where it is up to"
                width={2400}
                height={1520}
                loading="lazy"
                className="w-full aspect-[1200/560] object-cover object-top"
              />
            </div>
            <p className="mt-5 text-[15px] font-medium text-[#777]">{live.tag}</p>
            <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{live.title}</p>
            <p className="mt-2 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 group-hover:decoration-[#111] transition-colors inline-block">
              {live.verb} <span aria-hidden>&rarr;</span>
            </p>
          </ProofLink>
          <div className="border-b border-[#111]/15">
            {rest.map((p) => (
              <ProofLink key={p.title} p={p} className="group block py-5 border-t border-[#111]/15">
                <span className="block text-[15px] font-medium text-[#777]">{p.tag}</span>
                <span className="block mt-1 text-[20px] font-semibold tracking-[-0.02em]">{p.title}</span>
                <span className="inline-block mt-2 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 group-hover:decoration-[#111] transition-colors">
                  {p.verb} <span aria-hidden>&rarr;</span>
                </span>
              </ProofLink>
            ))}
            <div className="py-5 border-t border-[#111]/15">
              <Link
                href="/work"
                className="text-[15px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111] transition-colors"
              >
                All the systems
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IndustriesStrip() {
  return (
    <section className="bg-cream-alt">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
        <RevealOnScroll className="max-w-[44ch] mb-14">
          <div>
            <Eyebrow>Industries</Eyebrow>
            <h2
              className="font-display text-ink"
              style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}
            >
              Built for the office you actually run.
            </h2>
          </div>
        </RevealOnScroll>
        <div className="border-b border-line">
          {INDUSTRIES.map((ind, i) => (
            <RevealOnScroll key={ind.slug} delay={i * 0.05}>
              <Link
                href={`/industries/${ind.slug}`}
                className="grid md:grid-cols-[1fr_auto] md:items-baseline gap-x-8 py-7 md:py-8 border-t border-line transition-[padding] duration-300 md:hover:pl-3 group"
              >
                <h3
                  className="font-display text-ink leading-[1] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(26px, 3.4vw, 34px)', fontWeight: 800 }}
                >
                  {ind.name}
                </h3>
                <span className="mt-3 md:mt-0 text-[13px] font-medium text-ink inline-flex items-center gap-1.5">
                  {ind.employee} <span aria-hidden className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

function FounderNote() {
  return (
    <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36 grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start">
        <div className="w-40 h-40 md:w-52 md:h-52 rounded-3xl overflow-hidden bg-cream-alt border border-line shrink-0">
          {FOUNDER_PHOTO ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={FOUNDER_PHOTO} alt="Will Herbert" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center font-display text-ink text-[56px] font-bold tracking-[-0.04em]">W</div>
          )}
        </div>
        <RevealOnScroll className="max-w-[60ch]">
          <div>
            <Eyebrow>Who builds it</Eyebrow>
            <p className="text-[19px] md:text-[22px] text-ink leading-[1.45] tracking-[-0.01em]">
              I&apos;m Will Herbert. I build every system myself, in Adelaide, and you deal
              with me from the audit to the day it goes live.
            </p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
              More about Will
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="bg-ink text-cream relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-40 md:py-52">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <h2
              className="font-display text-cream"
              style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 800 }}
            >
              Got a job everyone
              <br />
              hates doing?
            </h2>
            <p className="mt-9 text-[17px] md:text-[19px] text-cream/65 leading-[1.55] max-w-[54ch]">
              Forty five minutes, free, a written page back.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6 lg:items-end">
            <AuditButton dark />
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40 lg:text-right">
              Will Herbert &middot; Adelaide
              <br />
              hello@herbert-aisolutions.com
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
