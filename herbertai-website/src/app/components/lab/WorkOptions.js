import Link from 'next/link'

// Design pass, homepage section 3 "The work" (10 Oct 2026): three options for
// the section under How it works, on the "Runs itself" charter (paper ground,
// Geist, colour means state, pictures are the instruments). Nothing here
// moves. The two screens are the ones /work already uses: the property
// dashboard (live, mock data) and the accountant demo. The brokerage hub is
// never shown as a picture (de-branded only, gated on the client), and the
// marketing engine is an internal tool, so those two stay as words. The
// picked one moves into page.js and this file goes with the lab.

const SYSTEMS = [
  { tag: 'Live, click in', title: 'A property manager’s dashboard', href: 'https://dashboard.herbert-aisolutions.com', external: true, image: '/work/property-dashboard.png', bar: 'dashboard.herbert-aisolutions.com · live, example data' },
  { tag: 'Demo, plays itself', title: 'An accountant’s document chaser', href: '/demo/accountants', external: false, image: '/work/accountants-demo.png', bar: 'Demo · an example accounting firm' },
  { tag: 'Currently building', title: 'An operations hub for a finance brokerage', href: '/work', external: false },
  { tag: 'Built', title: 'A marketing engine', href: '/work', external: false },
]

function Go({ s, children, className = '' }) {
  return s.external ? (
    <a href={s.href} target="_blank" rel="noreferrer" className={className}>{children}</a>
  ) : (
    <Link href={s.href} className={className}>{children}</Link>
  )
}

function verb(s) {
  return s.external ? 'Open it' : s.image ? 'See it run' : 'Read about it'
}

function Head() {
  return (
    <div className="mb-12 md:mb-16">
      <p className="text-[15px] font-medium text-[#555] mb-4">The work</p>
      <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
        The systems, not the slides.
      </h2>
    </div>
  )
}

function AllLink() {
  return (
    <div className="mt-12 md:mt-14">
      <Link
        href="/work"
        className="text-[15px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111] transition-colors"
      >
        All the systems
      </Link>
    </div>
  )
}

function Section({ children }) {
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">{children}</div>
    </section>
  )
}

function Screen({ s, className = '' }) {
  return (
    <div className={`rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden ${className}`}>
      <div className="px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono text-[#555] truncate">{s.bar}</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={s.image} alt={`${s.title}, a screen from it`} className="w-full aspect-[16/10] object-cover object-top" />
    </div>
  )
}

function Row({ s }) {
  return (
    <Go s={s} className="group grid grid-cols-[1fr_auto] md:grid-cols-[200px_minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 py-5 border-t border-[#111]/15">
      <span className="text-[15px] font-medium text-[#777]">{s.tag}</span>
      <span className="col-start-1 md:col-start-auto text-[20px] md:text-[22px] font-semibold tracking-[-0.02em]">{s.title}</span>
      <span className="row-start-1 col-start-2 md:row-start-auto md:col-start-auto text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 group-hover:decoration-[#111] transition-colors whitespace-nowrap">
        {verb(s)} <span aria-hidden>&rarr;</span>
      </span>
    </Go>
  )
}

/* ─── A: two screens, two lines ─────────────────────────────── */

export function OptionA() {
  const shown = SYSTEMS.filter((s) => s.image)
  const told = SYSTEMS.filter((s) => !s.image)
  return (
    <Section>
      <Head />
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
        {shown.map((s) => (
          <Go key={s.title} s={s} className="group block">
            <Screen s={s} className="group-hover:border-[#111]/30 transition-colors" />
            <p className="mt-5 text-[15px] font-medium text-[#777]">{s.tag}</p>
            <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{s.title}</p>
            <p className="mt-2 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 group-hover:decoration-[#111] transition-colors inline-block">
              {verb(s)} <span aria-hidden>&rarr;</span>
            </p>
          </Go>
        ))}
      </div>
      <div className="mt-14 border-b border-[#111]/15">
        {told.map((s) => <Row key={s.title} s={s} />)}
      </div>
      <AllLink />
    </Section>
  )
}

/* ─── B: four systems, set plain ────────────────────────────── */

export function OptionB() {
  return (
    <Section>
      <Head />
      <div className="border-b border-[#111]/15">
        {SYSTEMS.map((s) => <Row key={s.title} s={s} />)}
      </div>
      <AllLink />
    </Section>
  )
}

/* ─── C: the live one large, the rest beside it ─────────────── */

export function OptionC() {
  const [live, ...rest] = SYSTEMS
  return (
    <Section>
      <Head />
      <div className="grid lg:grid-cols-[1.28fr_0.72fr] gap-x-12 gap-y-10 items-start">
        <Go s={live} className="group block">
          <Screen s={live} className="group-hover:border-[#111]/30 transition-colors" />
          <p className="mt-5 text-[15px] font-medium text-[#777]">{live.tag}</p>
          <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{live.title}</p>
          <p className="mt-2 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 group-hover:decoration-[#111] transition-colors inline-block">
            {verb(live)} <span aria-hidden>&rarr;</span>
          </p>
        </Go>
        <div className="border-b border-[#111]/15">
          {rest.map((s) => (
            <Go key={s.title} s={s} className="group block py-5 border-t border-[#111]/15">
              <span className="block text-[15px] font-medium text-[#777]">{s.tag}</span>
              <span className="block mt-1 text-[20px] font-semibold tracking-[-0.02em]">{s.title}</span>
              <span className="inline-block mt-2 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 group-hover:decoration-[#111] transition-colors">
                {verb(s)} <span aria-hidden>&rarr;</span>
              </span>
            </Go>
          ))}
        </div>
      </div>
      <AllLink />
    </Section>
  )
}

/* ─── the lab page: all three stacked ───────────────────────── */

const OPTIONS = [
  ['a', 'A. Two screens, two lines', 'The dashboard and the accountant demo as real screens, the hub and the marketing engine as plain lines under them.', OptionA],
  ['b', 'B. Four systems, set plain', 'The four as a ruled list, like How it works: what each is, its name, and a link. No pictures.', OptionB],
  ['c', 'C. The live one large', 'The dashboard a visitor can click into, large, with the other three listed beside it.', OptionC],
]

export default function WorkOptions() {
  return (
    <main className="bg-[#FAFAF8] pb-16">
      {OPTIONS.map(([id, name, note, Opt]) => (
        <div key={id} data-opt={id}>
          <div className="sticky top-0 z-10 bg-[#111] text-white px-6 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
            <b className="text-[15px]">{name}</b>
            <span className="opacity-70">{note}</span>
          </div>
          <Opt />
        </div>
      ))}
    </main>
  )
}
