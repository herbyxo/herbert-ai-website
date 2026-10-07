import Link from 'next/link'
import { AUDIT_HREF } from './site/shared'
import HeroBoard from './runs/HeroBoard'

// Homepage hero, rebuilt 6 Oct 2026 for the "Runs itself" concept
// (docs/design/CHARTER.md): the locked manifesto beside the product itself, an
// example office's board with its jobs finishing. Picks from the design pass
// (docs/design/design-pass-site-2026-09.md): option A the product window, board
// size 1 wider, the demo link under the board, alignment 3 both edges, and
// button option 2, the arrow with corners matching the board's window (7 Oct 2026).
//
// Alignment, from xl (1280) up: a two-row grid. Row one holds the text and the
// board, so they share a top and a bottom: the headline is pulled up 0.118em so
// its capitals (not its line box) start on the board's top edge, measured from
// pixels, and the audit button is pushed to the bottom of the row so it ends on
// the board's bottom edge. Row two holds the note and the demo link on one
// baseline.
// Because the edges come from the grid, they hold whatever height the board is.
// Below xl the same items stack in reading order: headline, sub-line, button,
// note, board, link.
//
// The May 2026 hero (green-flood wipe, Bricolage display) is in git history.

export default function Hero() {
  return (
    <section className="bg-[#FAFAF8] text-[#111]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-12 md:pt-20 pb-20 md:pb-28 grid xl:grid-cols-[0.72fr_1.28fr] xl:gap-x-12">
        <div className="order-1 flex flex-col xl:col-start-1 xl:row-start-1">
          <h1
            className="font-bold tracking-[-0.045em] leading-[0.95] xl:-mt-[0.118em]"
            style={{ fontSize: 'clamp(48px, 5vw, 72px)' }}
          >
            Less admin.
            <br />
            More money.
            <br />
            Built to run itself.
          </h1>
          <p className="mt-7 mb-8 text-[19px] leading-[1.45] max-w-[38ch] text-[#333]">
            Custom software and AI for small businesses, built in Adelaide.
          </p>
          <a
            href={AUDIT_HREF}
            className="mt-auto self-start inline-flex items-center gap-2 bg-[#111] text-white rounded-[10px] px-6 py-3.5 text-[16px] font-medium hover:bg-[#2a2a2a] transition-colors"
          >
            Book a free AI audit <span aria-hidden>&rarr;</span>
          </a>
        </div>
        <span className="order-2 mt-3 xl:mt-3.5 xl:self-baseline text-[15px] text-[#555] xl:col-start-1 xl:row-start-2">
          45 minutes, a written page back
        </span>
        <div className="order-3 mt-12 xl:mt-0 xl:col-start-2 xl:row-start-1 xl:[&>*]:h-full">
          <HeroBoard />
        </div>
        {/* Demo link, option 1 (Will, 6 Oct 2026): a plain link under the board to
            the deeper demo, one firm's season with the emails its clients get. */}
        <div className="order-4 mt-3.5 xl:self-baseline text-right xl:col-start-2 xl:row-start-2">
          <Link
            href="/demo/accountants"
            className="text-[14px] font-medium text-[#111] underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111] transition-colors"
          >
            See it run for an accounting firm <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
