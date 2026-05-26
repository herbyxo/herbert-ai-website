import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Blendz By Ben — Custom Booking Site',
  description:
    'How Herbert AI replaced a generic Setmore booking page for a busy Adelaide barbershop with a custom site, owner dashboard, and SMS automation. $400/mo in bookings retained.',
  alternates: { canonical: '/case-studies/blendz' },
  openGraph: {
    title: 'Blendz By Ben · Herbert AI Case Study',
    description: 'Custom booking site that retained $400/mo in lost bookings for an Adelaide barbershop.',
    url: '/case-studies/blendz',
  },
}

const gallery = [
  { src: '/portfolio/home_-_haircut.png', alt: 'Blendz homepage with hero and service preview' },
  { src: '/portfolio/services_-_haircut.png', alt: 'Services page listing haircut and beard services' },
  { src: '/portfolio/book_-_haircut.png', alt: 'Booking flow with calendar and time slot selection' },
  { src: '/portfolio/about_-_haircut.png', alt: 'About page with shop story and barber bios' },
]

export default function BlendzCaseStudy() {
  return (
    <article className="bg-cream">
      {/* ─── Editorial header ────────────────────────────────────────── */}
      <header className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-12 pb-20 md:pt-20 md:pb-32">
        <div className="mb-12">
          <Link href="/case-studies" className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors inline-flex items-center gap-2">
            <span aria-hidden>←</span> All case studies
          </Link>
        </div>

        {/* Meta strip */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
            Case study № 01
          </span>
          <span>·</span>
          <span>Hospitality</span>
          <span>·</span>
          <span>Adelaide, AU</span>
          <span>·</span>
          <span>Custom site + dashboard</span>
        </div>

        <h1 className="text-[56px] md:text-[88px] lg:text-[112px] font-semibold tracking-[-0.04em] leading-[0.92] mb-12 max-w-[16ch] text-ink">
          A booking site <span className="serif-em text-green-deep">that paid for itself.</span>
        </h1>

        <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-end max-w-[1100px]">
          <p className="text-[20px] md:text-[24px] text-ink-soft leading-[1.45] max-w-[52ch] font-light">
            Blendz By Ben is a busy Adelaide barbershop. Before the rebuild he had no real
            website — just a generic Setmore booking page on someone else&apos;s domain.
            No brand. No story. No control. We built him his own.
          </p>
          <a
            href="https://blendzbyben.com"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 bg-ink text-cream px-6 py-3.5 rounded-full font-medium text-[15px] inline-flex items-center gap-2 hover:bg-ink-soft transition-colors lift"
          >
            Visit the site <span aria-hidden>↗</span>
          </a>
        </div>
      </header>

      {/* ─── Headline stat band ──────────────────────────────────────── */}
      <section className="border-y border-line bg-cream-alt reveal">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-14 md:py-20">
          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            <StatBlock big="$400" unit="/mo" label="In bookings retained" />
            <StatBlock big="~3" unit="wks" label="Brief to live site" />
            <StatBlock big="1" unit="hr/day" label="Admin time eliminated" />
            <StatBlock big="0" unit="lock-in" label="Owns the system outright" />
          </div>
        </div>
      </section>

      {/* ─── BEFORE — editorial reading column ──────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
        <div className="max-w-[820px] mx-auto reveal">
          <SectionLabel n="01" label="Before" />
          <h2 className="text-[40px] md:text-[60px] font-medium tracking-[-0.03em] leading-[1.05] mb-12 max-w-[18ch] text-ink">
            A booking widget on <span className="serif-em text-green-deep">somebody else&apos;s site.</span>
          </h2>

          <div className="text-[18px] md:text-[19px] text-ink-soft leading-[1.75] space-y-6">
            <p className="drop-cap">
              Blendz didn&apos;t really have a website. The only public-facing page was a
              <a href="https://blendzbyben.setmore.com" target="_blank" rel="noreferrer" className="text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-green-deep transition"> Setmore booking page</a> —
              a generic template on Setmore&apos;s own domain, the same one you&apos;d see for any
              hairdresser, dentist, or massage therapist using the platform.
            </p>
            <p>
              No brand. No story. No control over the layout. Customers landing on the
              page from Google or Instagram had no way to tell whether they were on
              Blendz&apos;s real site or just a third-party booking form.
            </p>
            <p>
              Beyond that, anything outside the booking widget itself happened in Instagram DMs —
              questions about services, schedule changes, rebooks. Ben spent his evenings replying
              to messages and confirming the next day&apos;s schedule by hand.
            </p>
          </div>
        </div>

        {/* Full-bleed before screenshots */}
        <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-5 reveal">
          {[
            { src: '/portfolio/blendz-before-1.png', alt: 'Old Setmore booking page header with generic template layout' },
            { src: '/portfolio/blendz-before-2.png', alt: 'Old Setmore services list and contact details' },
          ].map((img) => (
            <figure key={img.src} className="bg-ink rounded-3xl border border-line overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                width={1920}
                height={920}
                className="w-full h-auto"
              />
            </figure>
          ))}
        </div>
        <p className="text-center mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          blendzbyben.setmore.com · the &quot;before&quot;
        </p>
      </section>

      {/* ─── Pull quote ──────────────────────────────────────────────── */}
      <section className="bg-ink text-white reveal">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 py-28 md:py-40 text-center relative">
          <div className="hero-blob absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none" />
          <div className="relative">
            <span className="font-serif text-green text-[80px] md:text-[120px] leading-none block mb-2">&ldquo;</span>
            <blockquote className="text-[32px] md:text-[48px] font-medium tracking-[-0.02em] leading-[1.18] max-w-[28ch] mx-auto mb-10">
              Will rebuilt my whole booking system from scratch. I stopped losing bookings
              and I&apos;m not stuck in DMs every night.{' '}
              <span className="serif-em text-green">Worth every dollar.</span>
            </blockquote>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
              Ben · Owner, Blendz By Ben
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE BUILT ─────────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
        <div className="max-w-[820px] mx-auto mb-16 md:mb-20 reveal">
          <SectionLabel n="02" label="What we built" />
          <h2 className="text-[40px] md:text-[60px] font-medium tracking-[-0.03em] leading-[1.05] max-w-[18ch] text-ink">
            One system, <span className="serif-em text-green-deep">end to end.</span>
          </h2>
        </div>

        {/* Build items — alternating editorial row layout */}
        <div className="space-y-16 md:space-y-24 mb-20">
          {[
            {
              n: '01',
              title: 'Custom site',
              body: 'Built from scratch — homepage, services, booking, about, contact. Designed around the actual brand, not a template. Own domain, own design system, own everything.',
            },
            {
              n: '02',
              title: 'Booking flow',
              body: 'Calendar-first booking with service selection, time slot, contact details. SMS confirmation on submit, reminder 24 hours before. Lives on his own site, not on someone else\'s.',
            },
            {
              n: '03',
              title: 'Owner dashboard',
              body: "Private dashboard for Ben — today's schedule, upcoming bookings, customer history. No more flipping between apps to know who's coming in next.",
            },
            {
              n: '04',
              title: 'Automation',
              body: 'SMS and email confirmations, reminders, follow-ups. The system runs itself once a booking comes in. Ben gets his evenings back.',
            },
          ].map((b, i) => (
            <div
              key={b.title}
              className={`grid md:grid-cols-[140px_1fr] gap-6 md:gap-16 items-baseline reveal ${i % 2 ? 'md:pl-16' : ''}`}
            >
              <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
                <span className="text-green-deep">№</span> {b.n}
              </div>
              <div className="max-w-[60ch]">
                <h3 className="text-[28px] md:text-[36px] font-medium tracking-[-0.02em] mb-3 text-ink">
                  {b.title}<span className="serif-em text-green-deep">.</span>
                </h3>
                <p className="text-[16px] md:text-[18px] text-muted leading-[1.65]">{b.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* After gallery */}
        <div className="grid sm:grid-cols-2 gap-5 reveal">
          {gallery.map((img) => (
            <figure key={img.src} className="bg-cream-alt rounded-3xl border border-line overflow-hidden lift">
              <Image
                src={img.src}
                alt={img.alt}
                width={1200}
                height={750}
                className="w-full h-auto"
              />
            </figure>
          ))}
        </div>
        <p className="text-center mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          blendzbyben.com · the &quot;after&quot;
        </p>
      </section>

      {/* ─── AFTER — reading column ─────────────────────────────────── */}
      <section className="bg-cream-alt border-y border-line">
        <div className="max-w-[820px] mx-auto px-6 lg:px-12 py-24 md:py-36 reveal">
          <SectionLabel n="03" label="After" />
          <h2 className="text-[40px] md:text-[60px] font-medium tracking-[-0.03em] leading-[1.05] mb-12 max-w-[18ch] text-ink">
            One source of truth. <span className="serif-em text-green-deep">No more DMs.</span>
          </h2>

          <div className="text-[18px] md:text-[19px] text-ink-soft leading-[1.75] space-y-6">
            <p>
              Every booking now flows through the site. Ben sees his day on one dashboard
              in the morning. Customers get SMS confirmation and a reminder the day before.
              Drop-off from missed messages went to roughly zero.
            </p>
            <p>
              The site also reads like a real brand. Google walk-ins started converting
              because the page actually looks like the shop. Ben&apos;s evening admin time
              dropped from about an hour to a few minutes.
            </p>
            <p>
              He owns the system outright — no monthly platform fee, no lock-in.
              When he wants a tweak, he messages me.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ──────────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 py-24 md:py-32 max-w-[1280px] mx-auto reveal">
        <div className="bg-ink text-white rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="hero-blob absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none" />
          <div className="relative">
            <Eyebrow color="white" center>Want something like this?</Eyebrow>
            <h2 className="text-[40px] md:text-[64px] font-medium leading-[1.02] tracking-[-0.03em] mb-6 max-w-[18ch] mx-auto">
              Book a <span className="serif-em text-green">free demo.</span>
            </h2>
            <p className="text-white/70 text-[17px] leading-[1.6] mb-10 max-w-[52ch] mx-auto">
              30-minute call, no pitch. Tell me what&apos;s broken — I&apos;ll tell you whether it&apos;s worth building.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
              >
                Book a free demo <span aria-hidden>→</span>
              </Link>
              <Link
                href="/case-studies"
                className="text-white px-6 py-3.5 rounded-full font-medium text-[16px] inline-flex items-center gap-2 border border-white/20 hover:border-white/50 transition-colors"
              >
                More case studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

/* ─── Tiny helpers ─────────────────────────────────────────────────── */

function SectionLabel({ n, label }) {
  return (
    <div className="flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
      <span className="text-green-deep">№ {n}</span>
      <span className="w-8 h-px bg-line" />
      {label}
    </div>
  )
}

function StatBlock({ big, unit, label }) {
  return (
    <div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-[48px] md:text-[60px] font-medium tracking-[-0.04em] leading-none text-ink">{big}</span>
        <span className="text-[18px] md:text-[20px] text-muted font-light">{unit}</span>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{label}</div>
    </div>
  )
}

function Eyebrow({ children, color = 'ink', center }) {
  const isWhite = color === 'white'
  return (
    <div className={`flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] ${isWhite ? 'text-white/55' : 'text-muted'} ${center ? 'justify-center' : ''}`}>
      <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />
      {children}
      {center && <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />}
    </div>
  )
}
