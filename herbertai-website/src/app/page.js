import Link from 'next/link'
import Hero from './components/Hero'
import EmployeesSection from './components/runs/EmployeesSection'
import OperatingSystemsSection from './components/runs/OperatingSystemsSection'
import ProductsSection from './components/runs/ProductsSection'
import { RUNGS } from './components/site/shared'
import AuditForm from './components/site/AuditForm'

// Home, restructured 16 Sep 2026 around the ladder (free audit, first AI
// employee, your AI operating system). The three bucket chapters are retired from
// home; their capability content lives on /services. Plan and decisions:
// docs/restructure-2026-09/PROJECT.md.

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <EmployeesSection />
      <OperatingSystemsSection />
      <ProductsSection />
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
          <p className="text-[15px] font-medium text-[#555] mb-4">How It Works</p>
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

// Operating Systems: components/runs/OperatingSystemsSection.js (15 Oct 2026).
// The Work is folded into it; WorkSection.js stays for the /work page.

// Who Builds It, rebuilt 19 Oct 2026 for the "Runs itself" charter: option 1,
// the note set plain (Will: "1"). Will's first-person line large on the paper
// ground, the label and a link to About; no photo, since the charter keeps the
// founder photo to About ("A founder photo on About only", 22 Sep 2026). Nothing
// moves: no job finishes here. Options 2 (name and photo) and 3 (a signed note)
// are drawn in docs/design/design-pass-site-2026-10-19-founder.png.
// Detail 1, the words (19 Oct 2026): said flat, in the third person, under the
// label Founder (Will: "i feel like the who builds it is a bit cheesey", then
// his first sentence, and "works with you" over "deal with", which "reads as if
// its a pain point").
function FounderNote() {
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
        <p className="text-[15px] font-medium text-[#555] mb-4">Founder</p>
        <p className="font-semibold tracking-[-0.025em] leading-[1.25] max-w-[28ch]" style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}>
          Herbert AI was founded by Will Herbert, based in Adelaide. He works with you
          from the audit to the day it goes live.
        </p>
        <p className="mt-7">
          <Link href="/about" className="text-[15px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">
            More about Will <span aria-hidden>&rarr;</span>
          </Link>
        </p>
      </div>
    </section>
  )
}

// Book the Audit, rebuilt 20 Oct 2026 for the "Runs itself" charter: option 3,
// the form right here (Will: "3"). The ink band; the heading and the audit's
// three facts as numbered rows on the left (the same form as the Products
// story), the booking form on the right, so someone who read the whole page
// books without loading /pilot. The form is the shared AuditForm, the same one
// /pilot#book uses. Options 1 and 2 are drawn in
// docs/design/design-pass-site-2026-10-19-audit.png.
function FinalCTA() {
  const facts = RUNGS[0].facts.map((f) => `${f}.`)
  return (
    <section className="bg-[#111] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-24 pb-28 grid lg:grid-cols-2 gap-x-16 gap-y-12 items-end">
        <div className="min-w-0">
          <p className="text-[15px] font-medium text-white/60 mb-4">Book the Audit</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[0.98] max-w-[14ch]" style={{ fontSize: 'clamp(40px, 4.6vw, 68px)' }}>
            Got a job everyone hates doing?
          </h2>
          <ol className="mt-8 border-b border-white/15">
            {facts.map((f, i) => (
              <li key={f} className="flex items-baseline gap-4 py-3 border-t border-white/15">
                <span aria-hidden className="w-5 shrink-0 font-mono text-[11px] tracking-[0.12em] text-white/40">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[19px] font-semibold tracking-[-0.015em]">{f}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="min-w-0">
          <div className="rounded-2xl bg-[#FAFAF8] text-[#111] p-6 sm:p-7">
            <AuditForm source="home" look="paper" message={false} />
          </div>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
            Will Herbert &middot; Adelaide &middot; hello@herbert-aisolutions.com
          </p>
        </div>
      </div>
    </section>
  )
}
