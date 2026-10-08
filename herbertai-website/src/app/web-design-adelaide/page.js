import RevealOnScroll from '../components/motion/RevealOnScroll'
import MockupLeadForm from '../components/MockupLeadForm'
import MockupProof from '../components/MockupProof'
import { OG_IMAGE } from '@/app/components/site/og'

export const metadata = {
  title: { absolute: 'Web Design Adelaide | Free Homepage Mockup in 48 Hours' },
  description:
    'Adelaide web design for small business. See your new website before you spend a cent: free homepage mockup in 48 hours, fixed quote, live in weeks. Custom-coded, no templates, no agency retainers.',
  alternates: { canonical: '/web-design-adelaide' },
  openGraph: {
    title: 'Web Design Adelaide · Herbert AI',
    description:
      'See your new website before you spend a cent: free homepage mockup in 48 hours, fixed quote, live in weeks.',
    url: '/web-design-adelaide',
    images: [OG_IMAGE],
  },
}

const faqs = [
  {
    q: 'How much does a website cost?',
    a: 'Every site is quoted on scope. A clean five-page site costs a lot less than one with bookings and payments. You’ll get one fixed price with your mockup. No hourly billing, no agency retainers, no surprises.',
  },
  {
    q: 'Is the mockup really free?',
    a: 'Yes. You get a real homepage design for your business within 48 hours, before any money changes hands. If you don’t go ahead, that’s completely fine, and it costs you nothing.',
  },
  {
    q: 'How long does the full build take?',
    a: 'Most sites go live in two to four weeks from sign-off. Bigger builds with bookings or dashboards run longer, and your quote comes with a real timeline.',
  },
  {
    q: 'Who actually does the work?',
    a: 'Will Herbert, Adelaide-based and solo. You talk directly to the person designing and building your site. No account managers, no handoffs, no offshore team.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
}

export default function WebDesignAdelaide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ─── Hero, static (above the fold, must paint on first load) ─ */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-20 md:pt-40 md:pb-28">
          <Eyebrow>Web design · Adelaide</Eyebrow>
          <h1
            className="font-display text-ink max-w-[14ch]"
            style={{
              fontSize: 'var(--text-display-lg)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              fontWeight: 800,
            }}
          >
            Adelaide web design for <em className="serif-em">small business.</em>
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[58ch]">
            See your new website before you spend a cent. Tell me about your business and
            I&apos;ll design a free homepage mockup within 48 hours: your branding, your
            services, a real design you can click. Like it? You get a fixed quote and a
            live site in weeks. No templates, no agency retainers.
          </p>
          {/* The capture itself, not a link to it. This used to be an anchor
              that scrolled to a six-field form 31% down the document, which put
              every field below the fold: 57% of page-viewing time is spent
              above it (NN/g eyetracking), and mobile is 83% of the traffic.
              Two fields, because a mockup cannot start without knowing the
              business and where to send it. Anyone who wants to say more still
              gets the full form below. */}
          <div className="mt-10 max-w-[720px]">
            <MockupLeadForm variant="compact" />
          </div>

          {/* Proof strip */}
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[760px]">
            <Stat n="48h" label="Mockup turnaround" />
            <Stat n="$0" label="To see your design" />
            <Stat n="2–4 wks" label="Typical build" />
            <Stat n="100%" label="Yours to own" />
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display text-ink mb-14" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            Mockup first.
            <br />
            Money later.
          </h2>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
            <Step
              n="01"
              title="Tell me about your business"
              body="Two minutes in the form below: what you do, who your customers are, a link to your current site if you have one."
            />
            <Step
              n="02"
              title="Free mockup in 48 hours"
              body="I design your actual homepage: your name, your services, your branding. A real design you can look at, not a sales call. No payment, no obligation."
            />
            <Step
              n="03"
              title="Like it? Fixed quote, live in weeks"
              body="If you want it built, you get one fixed price and a real timeline. If not, no hard feelings, and the mockup cost you nothing."
            />
          </div>
        </div>
      </section>

      <MockupProof />

      {/* ─── Why a mockup / proof ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>Why a free mockup</Eyebrow>
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
            <RevealOnScroll>
              <div>
                <h2 className="font-display text-ink max-w-[14ch]" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
                  The mockup is the pitch.
                </h2>
                <p className="mt-6 text-[16px] md:text-[17px] text-muted leading-[1.55] max-w-[52ch]">
                  Anyone can show you a polished portfolio of someone else&apos;s business.
                  I&apos;d rather show you yours. The mockup is real design work with your
                  name, your services and your customers, so the thing you&apos;re judging is
                  the actual thing you&apos;d be buying.
                </p>
                <p className="mt-5 text-[16px] md:text-[17px] text-muted leading-[1.55] max-w-[52ch]">
                  If it&apos;s not right, you say no and keep your money. If it is, you
                  already know exactly what you&apos;re getting before you spend a dollar.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <div className="space-y-5 md:pt-4">
                <ProofPoint
                  title="Real systems, not just pages"
                  body="Recent work includes a full custom booking platform with online payments, an owner dashboard, SMS reminders and automated review collection, built and shipped solo in weeks."
                />
                <ProofPoint
                  title="One person, start to finish"
                  body="You deal directly with the person designing and coding your site. No account managers, no handoffs, nothing lost in translation."
                />
                <ProofPoint
                  title="Nothing to cancel, ever"
                  body="The mockup is free and the build is a fixed quote. No subscriptions, no retainers, no contracts that outlive their usefulness."
                />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ─── What's included ─── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>What you get</Eyebrow>
          <h2 className="font-display text-ink mb-14" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            Custom-coded.
            <br />
            Not a template.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 max-w-[1000px]">
            <Inclusion title="Built custom, loads fast" body="Hand-coded on the same stack the big tech companies use, not Wix, not a WordPress theme. Fast on a phone in a car park." />
            <Inclusion title="Designed to win customers" body="Clear offer, proof, and a way to contact you on every page. A website that earns its keep, not a brochure." />
            <Inclusion title="Bookings & payments" body="Need appointments, online payments, or a quote form? Built in. Full booking systems are part of the kit." />
            <Inclusion title="Google-ready" body="SEO foundations done properly (titles, speed, structure, local keywords) so Adelaide customers can actually find you." />
            <Inclusion title="Hosting & care" body="I host it, watch it, and fix it. You run your business; the site just works." />
            <Inclusion title="You own everything" body="The site, the code, the domain and the content are all yours. No lock-in, no hostage fees." />
          </div>
        </div>
      </section>

      {/* ─── Form ─── */}
      <section id="mockup" className="bg-cream scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 grid md:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
          <div>
            <Eyebrow>Free mockup</Eyebrow>
            <h2 className="font-display text-ink" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
              See your new site in 48 hours.
            </h2>
            <p className="mt-6 text-[16px] md:text-[17px] text-muted leading-[1.55] max-w-[46ch]">
              Fill this in and I&apos;ll personally design your homepage mockup within 48
              hours, free and with no obligation. You&apos;ll get it by email with a fixed quote
              if you want the full build.
            </p>
            <p className="mt-6 text-[14px] text-muted">
              Prefer to talk?{' '}
              <a href="tel:+61448111840" className="text-ink font-medium hover:text-green-deep transition-colors">
                0448 111 840
              </a>{' '}
              (Will, Adelaide)
            </p>
          </div>

          <RevealOnScroll>
            <div className="bg-cream border border-line rounded-3xl p-8 md:p-10">
              <MockupLeadForm />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>Common questions</Eyebrow>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-[1000px]">
            {faqs.map((f) => (
              <Faq key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA: the one green-flood moment ─── */}
      <section className="bg-green">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 text-center">
          <h2 className="font-display text-ink mx-auto max-w-[18ch]" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            Your new website, designed by Thursday.
          </h2>
          {/* The form itself, not a link back up to it. This anchored to
              #mockup, which sits ABOVE the FAQ, so the single button at the point
              of highest intent scrolled the reader backwards past content they
              had already read. Same component, same endpoint, same redirect. */}
          <div className="mt-10 max-w-[620px] mx-auto text-left">
            <MockupLeadForm variant="compact" onGreen />
          </div>
        </div>
      </section>
    </>
  )
}

/* ─── helpers ──────────────────────────────────────────────────── */

function Stat({ n, label }) {
  return (
    <div>
      <div className="font-display text-ink text-[28px] md:text-[34px] font-bold tracking-[-0.02em]">{n}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{label}</div>
    </div>
  )
}

function Step({ n, title, body }) {
  return (
    <RevealOnScroll>
      <div>
        <div className="font-mono text-[12px] tracking-[0.18em] text-green-deep mb-4">{n}</div>
        <h3 className="text-[20px] md:text-[22px] font-semibold tracking-[-0.01em] text-ink mb-3">{title}</h3>
        <p className="text-[15px] md:text-[16px] text-muted leading-[1.55]">{body}</p>
      </div>
    </RevealOnScroll>
  )
}

function ProofPoint({ title, body }) {
  return (
    <div className="bg-cream-alt border border-line rounded-3xl p-6">
      <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-ink mb-2">{title}</h3>
      <p className="text-[14px] text-muted leading-[1.55]">{body}</p>
    </div>
  )
}

function Inclusion({ title, body }) {
  return (
    <div>
      <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink mb-2">{title}</h3>
      <p className="text-[15px] text-muted leading-[1.55]">{body}</p>
    </div>
  )
}

function Faq({ q, a }) {
  return (
    <div>
      <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-ink mb-3">{q}</h3>
      <p className="text-[15px] md:text-[16px] text-muted leading-[1.55]">{a}</p>
    </div>
  )
}


function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
      <span className="w-8 h-px bg-ink" />
      {children}
    </div>
  )
}
