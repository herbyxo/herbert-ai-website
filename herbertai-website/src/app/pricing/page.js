import Link from 'next/link'
import RevealOnScroll from '../components/motion/RevealOnScroll'

export const metadata = {
  title: 'Pricing',
  description:
    'Herbert AI prices every project on scope — no public price list, no off-the-shelf packages. Tell me what you need and you get one fixed quote and a real timeline. No hourly creep, no lock-in.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing · Herbert AI',
    description: 'Priced on scope, not on a menu. Every project quoted on what you actually need.',
    url: '/pricing',
  },
}

const faqs = [
  {
    q: 'Why don\'t you list prices?',
    a: 'Because every business is different. A "barbershop website" costs different things depending on whether you need bookings, payments, gift vouchers, or just a brochure. A flat price list either prices the simple jobs too high or the complex ones too low. Quoting on scope gets you the right number for your actual situation.',
  },
  {
    q: 'How does getting a quote work?',
    a: 'Tell me what you need — through the project brief or a quick email. I\'ll ask enough questions to scope it honestly, then send a fixed quote and a timeline, usually within a day. If it\'s not worth building, I\'ll tell you that instead.',
  },
  {
    q: 'What\'s the minimum engagement?',
    a: 'No minimum. Smallest job I\'ve done was a one-page site fix for a few hours. Largest was a 6-week full-stack rebuild. I\'ll quote either honestly.',
  },
  {
    q: 'Any lock-in or contracts?',
    a: 'No. Fixed-quote builds pay on delivery. Retainers are month-to-month, cancel anytime. Hourly is invoiced for actual time spent — if it took less than expected, you pay less.',
  },
  {
    q: 'Do you take a deposit?',
    a: 'For fixed-quote builds over a couple of weeks, yes — usually 30% on scope sign-off, balance on delivery. Smaller jobs invoiced on completion.',
  },
  {
    q: 'Can I pay monthly instead of upfront?',
    a: 'Yes — for larger builds I\'ll often split the fixed quote across the build window (e.g. three monthly payments across a 6-week build). Or keep it on retainer once the system is live.',
  },
]

export default function Pricing() {
  return (
    <>
      {/* ─── Hero — static (above the fold, must paint on first load) ─ */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32">
          <Eyebrow>Pricing</Eyebrow>
          <h1
            className="font-display text-ink max-w-[14ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            Priced on scope.
            <br />
            Not on a menu.
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[56ch]">
            No two businesses need the same thing, so I don&rsquo;t run a price list. Tell me what
            you&rsquo;re after and I&rsquo;ll quote it &mdash; one fixed number, a real timeline, and
            no hourly creep or lock-in.
          </p>
          <Link
            href="/start"
            data-magnetic
            className="mt-10 bg-ink text-cream px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:bg-ink-soft transition-colors"
          >
            Get a quote <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>

      {/* ─── How it works — editorial split ───────────────────────── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <RevealOnScroll>
              <Eyebrow>How it works</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <h2
                className="font-display text-ink max-w-[12ch]"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
              >
                One number. A real timeline.
              </h2>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.12} className="max-w-[60ch] space-y-5 text-[16px] text-muted leading-[1.7] pt-1">
            <div className="space-y-5">
              <p>
                You tell me what you want built &mdash; or what&rsquo;s slow, broken, or missing &mdash;
                and I scope it properly before quoting. Every quote includes a written scope of what
                gets built, a fixed price (not a range), a delivery date, what&apos;s in scope and what
                isn&apos;t, and what happens if you want to change something mid-build.
              </p>
              <p>
                Depending on the work, that&rsquo;s a fixed quote for a defined build, an hourly rate
                for small tweaks, or a monthly retainer for anything that needs to keep running. I&rsquo;ll
                tell you which one actually makes sense for your job.
              </p>
              <p>
                If the project comes in faster than expected, the price stays the same — but I&apos;ll
                mention it before billing. If something genuinely outside the scope comes up, I quote
                it separately rather than letting it creep into the original number. For retainers, the
                monthly number covers everything in scope — no hidden per-call or per-request fees.
              </p>
              <p>
                And I always aim to come in competitive &mdash; within your budget, and sharp against
                anyone else out there.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── FAQs ─────────────────────────────────────────────────── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
          <RevealOnScroll>
            <Eyebrow>Pricing FAQs</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <h2
              className="font-display text-ink max-w-[14ch] mb-14"
              style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
            >
              Common questions. Straight answers.
            </h2>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-5">
            {faqs.map((f, i) => (
              <RevealOnScroll key={f.q} delay={(i % 2) * 0.08}>
                <div className="bg-white border border-line rounded-3xl p-7 lift h-full">
                  <h3 className="text-[17px] font-medium text-ink mb-2.5 tracking-[-0.01em]">{f.q}</h3>
                  <p className="text-[15px] text-muted leading-[1.6]">{f.a}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Closing CTA — full-bleed ink (matches homepage FinalCTA) ─ */}
      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-32 md:py-44">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Eyebrow color="white">Get a quote</Eyebrow>
              <h2
                className="font-display text-cream"
                style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 800 }}
              >
                Tell me what
                <br />
                you&rsquo;re after.
              </h2>
              <p className="mt-9 text-[17px] md:text-[19px] text-cream/65 leading-[1.55] max-w-[52ch]">
                Send me a bit about your business and what you want built. You&apos;ll get a fixed
                quote and a real timeline back &mdash; or a clear no if it&apos;s not worth doing.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-5 lg:items-end">
              <Link
                href="/start"
                data-magnetic
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
              >
                Get a quote <span aria-hidden>&rarr;</span>
              </Link>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40 lg:text-right">
                Fixed quote, usually within a day
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ─── Eyebrow ──────────────────────────────────────────────────── */
function Eyebrow({ children, color = 'ink' }) {
  const isWhite = color === 'white'
  return (
    <div className={`flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] ${isWhite ? 'text-cream/55' : 'text-muted'}`}>
      <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />
      {children}
    </div>
  )
}
