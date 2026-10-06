import Link from 'next/link'
import { AUDIT_HREF } from './site/shared'
import HeroBoard from './runs/HeroBoard'

// Homepage hero, rebuilt 6 Oct 2026 for the "Runs itself" concept
// (docs/design/CHARTER.md): the locked manifesto beside the product itself, an
// example office's board with its jobs finishing. Picked in the design pass as
// option A, the product window, then board size option 1, wider (6 Oct 2026)
// (docs/design/design-pass-site-2026-09.md).
// The May 2026 hero (green-flood wipe, Bricolage display) is in git history.

export default function Hero() {
  return (
    <section className="bg-[#FAFAF8] text-[#111]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-12 md:pt-20 pb-20 md:pb-28 grid xl:grid-cols-[0.72fr_1.28fr] gap-12 items-end">
        <div>
          <h1 className="font-bold tracking-[-0.045em] leading-[0.95]" style={{ fontSize: 'clamp(48px, 5vw, 72px)' }}>
            Less admin.
            <br />
            More money.
            <br />
            Built to run itself.
          </h1>
          <p className="mt-7 text-[19px] leading-[1.45] max-w-[38ch] text-[#333]">
            Custom software and AI for small businesses, built in Adelaide.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={AUDIT_HREF}
              className="bg-[#111] text-white rounded-full px-6 py-3.5 text-[16px] font-medium hover:bg-[#2a2a2a] transition-colors"
            >
              Book a free AI audit
            </a>
            <span className="text-[15px] text-[#555]">45 minutes, a written page back</span>
          </div>
        </div>
        <div>
          <HeroBoard />
          {/* Demo link, option 1 (Will, 6 Oct 2026): a plain link under the board
              to the deeper demo, one firm's season with the emails its clients get. */}
          <div className="mt-3.5 text-right">
            <Link
              href="/demo/accountants"
              className="text-[14px] font-medium text-[#111] underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111] transition-colors"
            >
              See it run for an accounting firm <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
