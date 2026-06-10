import Link from 'next/link'
import Image from 'next/image'
import RevealOnScroll from '../components/motion/RevealOnScroll'

export const metadata = {
  title: 'Web Design Adelaide — Free Homepage Mockup in 48 Hours',
  description:
    'Adelaide web design for small business. See your new website before you spend a cent — free homepage mockup in 48 hours, fixed quote, live in weeks. Custom-coded, no templates, no agency retainers.',
  alternates: { canonical: '/web-design-adelaide' },
  openGraph: {
    title: 'Web Design Adelaide · Herbert AI',
    description:
      'See your new website before you spend a cent — free homepage mockup in 48 hours, fixed quote, live in weeks.',
    url: '/web-design-adelaide',
  },
}

export default function WebDesignAdelaide() {
  return (
    <>
      {/* ─── Hero — static (above the fold, must paint on first load) ─ */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-20 md:pt-40 md:pb-28">
          <Eyebrow>Web design — Adelaide</Eyebrow>
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
            I&apos;ll design a free homepage mockup within 48 hours — your branding, your
            services, a real design you can click. Like it? You get a fixed quote and a
            live site in weeks. No templates, no agency retainers.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#mockup"
              data-magnetic
              className="inline-flex items-center gap-2 bg-green text-ink px-7 py-3.5 rounded-full font-semibold text-[15px] hover:shadow-[0_0_28px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
            >
              Get my free mockup <span aria-hidden>&rarr;</span>
            </a>
            <Link
              href="/case-studies/blendz"
              data-magnetic
              className="inline-flex items-center gap-2 border border-line text-ink px-7 py-3.5 rounded-full font-semibold text-[15px] hover:border-ink transition-colors"
            >
              See a live build
            </Link>
          </div>

          {/* Proof strip */}
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[760px]">
            <Stat n="48h" label="Mockup turnaround" />
            <Stat n="$0" label="To see your design" />
            <Stat n="2–4 wks" label="Typical build" />
            <Stat n="100%" label="Yours — you own it" />
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
              body="Two minutes in the form below — what you do, who your customers are, a link to your current site if you have one."
            />
            <Step
              n="02"
              title="Free mockup in 48 hours"
              body="I design your actual homepage — your name, your services, your branding. A real design you can look at, not a sales call. No payment, no obligation."
            />
            <Step
              n="03"
              title="Like it? Fixed quote, live in weeks"
              body="If you want it built, you get one fixed price and a real timeline. If not, no hard feelings — the mockup cost you nothing."
            />
          </div>
        </div>
      </section>

      {/* ─── Live work / proof ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>Recent build</Eyebrow>
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
            <RevealOnScroll>
              <div>
                <h2 className="font-display text-ink" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
                  Blendz By Ben
                </h2>
                <p className="mt-6 text-[16px] md:text-[17px] text-muted leading-[1.55] max-w-[52ch]">
                  A busy barbershop running on a generic booking page. Herbert AI built the
                  full thing custom — website, online bookings with card payments and
                  tipping, an owner dashboard, SMS reminders, and an automated Google
                  review funnel. Built solo, shipped in weeks.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/case-studies/blendz"
                    data-magnetic
                    className="inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 rounded-full font-semibold text-[14px] hover:bg-ink-soft transition-colors"
                  >
                    Read the case study <span aria-hidden>&rarr;</span>
                  </Link>
                  <a
                    href="https://blendzbyben.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
                  >
                    blendzbyben.com {'↗'}
                  </a>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <Link href="/case-studies/blendz" className="block rounded-3xl overflow-hidden border border-line lift">
                <Image
                  src="/portfolio/blendz/home.png"
                  alt="Blendz By Ben — custom barbershop website and booking system built by Herbert AI"
                  width={1440}
                  height={900}
                  className="w-full h-auto"
                />
              </Link>
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
            <Inclusion title="Built custom, loads fast" body="Hand-coded on the same stack the big tech companies use — not Wix, not a WordPress theme. Fast on a phone in a car park." />
            <Inclusion title="Designed to win customers" body="Clear offer, proof, and a way to contact you on every page. A website that earns its keep, not a brochure." />
            <Inclusion title="Bookings & payments" body="Need appointments, online payment, or a quote form? Built in — like the Blendz booking system." />
            <Inclusion title="Google-ready" body="SEO foundations done properly — titles, speed, structure, local keywords — so Adelaide customers can actually find you." />
            <Inclusion title="Hosting & care" body="I host it, watch it, and fix it. You run your business; the site just works." />
            <Inclusion title="You own everything" body="The site, the code, the domain, the content — yours. No lock-in, no hostage fees." />
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
              hours — free, no obligation. You&apos;ll get it by email with a fixed quote
              if you want the full build.
            </p>
            <p className="mt-6 text-[14px] text-muted">
              Prefer to talk?{' '}
              <a href="tel:+61448111840" className="text-ink font-medium hover:text-green-deep transition-colors">
                0448 111 840
              </a>{' '}
              — Will, Adelaide.
            </p>
          </div>

          <RevealOnScroll>
            <div className="bg-cream border border-line rounded-3xl p-8 md:p-10">
              <form action="https://api.web3forms.com/submit" method="POST" className="space-y-5">
                <input type="hidden" name="access_key" value="f3618e04-e007-4ee9-a80d-f96e3cc8d481" />
                <input type="hidden" name="from_name" value="Herbert AI — Web Design Adelaide" />
                <input type="hidden" name="subject" value="New mockup request — Web Design Adelaide" />
                <input type="hidden" name="redirect" value="https://herbert-aisolutions.com/start/thanks" />
                <input
                  type="hidden"
                  name="autoresponse_subject"
                  value="Got it — your free mockup is in the works"
                />
                <input
                  type="hidden"
                  name="autoresponse_message"
                  value={`Hi — Will here from Herbert AI.\n\nThanks for the details. I'm on your free homepage mockup now — you'll have it in your inbox within 48 hours, along with a fixed quote if you'd like the full site built.\n\nIf you think of anything else worth including, just reply to this email.\n\n— Will Herbert\nHerbert AI · Adelaide`}
                />
                {/* Honeypot for spam */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <Field id="name" label="Your name" type="text" placeholder="Your name" required />
                <Field id="business" label="Business name" type="text" placeholder="Your business" required />
                <Field id="email" label="Email" type="email" placeholder="you@business.com" required />
                <Field id="phone" label="Phone (optional)" type="tel" placeholder="0400 000 000" />
                <Field id="website" label="Current website (optional)" type="text" placeholder="yourbusiness.com.au — or 'none yet'" />

                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
                    What does your business do?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-cream border border-line rounded-2xl text-[15px] text-ink placeholder:text-muted focus:border-ink transition-colors"
                    placeholder="e.g. Mobile dog grooming across the eastern suburbs — want online booking and a site that doesn't look like 2012."
                  />
                </div>

                <button
                  type="submit"
                  data-magnetic
                  className="w-full inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full font-semibold text-[15px] hover:bg-ink-soft transition-colors"
                >
                  Send — get my free mockup <span aria-hidden>&rarr;</span>
                </button>
                <p className="text-[12px] text-muted text-center">
                  Free mockup, no obligation. Reply within a business day.
                </p>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow>Common questions</Eyebrow>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-[1000px]">
            <Faq
              q="How much does a website cost?"
              a="Every site is quoted on scope — a clean five-page site costs a lot less than one with bookings and payments. You'll get one fixed price with your mockup. No hourly billing, no agency retainers, no surprises."
            />
            <Faq
              q="Is the mockup really free?"
              a="Yes. You get a real homepage design for your business within 48 hours, before any money changes hands. If you don't go ahead, that's completely fine — it costs you nothing."
            />
            <Faq
              q="How long does the full build take?"
              a="Most sites go live in two to four weeks from sign-off. Bigger builds with bookings or dashboards run longer — your quote comes with a real timeline."
            />
            <Faq
              q="Who actually does the work?"
              a="Will Herbert — Adelaide-based, solo. You talk directly to the person designing and building your site. No account managers, no handoffs, no offshore team."
            />
          </div>
        </div>
      </section>

      {/* ─── Final CTA — the one green-flood moment ─── */}
      <section className="bg-green">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 text-center">
          <h2 className="font-display text-ink mx-auto max-w-[18ch]" style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}>
            Your new website, designed by Thursday.
          </h2>
          <a
            href="#mockup"
            data-magnetic
            className="mt-10 inline-flex items-center gap-2 bg-ink text-cream px-8 py-4 rounded-full font-semibold text-[16px] hover:bg-ink-soft transition-colors"
          >
            Get my free mockup <span aria-hidden>&rarr;</span>
          </a>
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

function Field({ id, label, type, placeholder, required }) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-cream border border-line rounded-2xl text-[15px] text-ink placeholder:text-muted focus:border-ink transition-colors"
      />
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
