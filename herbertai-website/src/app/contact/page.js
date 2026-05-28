import Link from 'next/link'

export const metadata = {
  title: 'Contact',
  description:
    'Get in touch with Will at Herbert AI. 30-minute scoping call, no pitch. Email, phone, or book a Calendly call — usually replies within a day.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact · Herbert AI',
    description: '30-minute scoping call, no pitch. Get in touch with Will directly.',
    url: '/contact',
  },
}

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-semibold tracking-[-0.03em] leading-[1] mb-7 max-w-[18ch] text-ink">
            Tell me <span className="serif-em text-green-deep">what&apos;s slow,</span> what&apos;s broken, or what doesn&apos;t exist yet.
          </h1>
          <p className="text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[58ch]">
            30-minute scoping call, no pitch. If it&apos;s worth building, I&apos;ll come back with a fixed quote and timeline.
          </p>
        </div>
      </section>

      {/* Form + info */}
      <section className="bg-cream-alt border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28 grid md:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16">
          {/* Form */}
          <div className="bg-cream border border-line rounded-3xl p-8 md:p-10">
            <h2 className="text-[24px] font-medium tracking-[-0.01em] text-ink mb-2">Send a message</h2>
            <p className="text-[14px] text-muted mb-6">Usually replies within a day.</p>

            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-5">
              <input type="hidden" name="access_key" value="f3618e04-e007-4ee9-a80d-f96e3cc8d481" />

              <Field id="name" label="Name" type="text" placeholder="Your name" required />
              <Field id="email" label="Email" type="email" placeholder="you@business.com" required />
              <Field id="phone" label="Phone (optional)" type="tel" placeholder="0400 000 000" />

              <div>
                <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
                  What are you trying to fix?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-cream border border-line rounded-2xl text-[15px] text-ink placeholder:text-muted focus:border-ink transition-colors"
                  placeholder="Missed calls, manual bookings, two tools that don't talk, no website at all..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full font-semibold text-[15px] hover:bg-ink-soft transition-colors"
              >
                Send message <span aria-hidden>→</span>
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-5">
            <InfoCard label="Email">
              <a href="mailto:hello@herbert-aisolutions.com" className="text-[16px] text-ink font-medium hover:text-green-deep transition-colors break-words">
                hello@herbert-aisolutions.com
              </a>
            </InfoCard>
            <InfoCard label="Phone">
              <a href="tel:+61448111840" className="text-[16px] text-ink font-medium hover:text-green-deep transition-colors">
                0448 111 840
              </a>
            </InfoCard>
            <InfoCard label="Book a call">
              <Link href="https://calendly.com/herbert_aisolutions/30min" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-green text-ink px-5 py-2.5 rounded-full text-[14px] font-semibold hover:shadow-[0_0_28px_var(--green-glow)] hover:-translate-y-px transition-all duration-300">
                30-min scoping call <span aria-hidden>→</span>
              </Link>
            </InfoCard>
            <InfoCard label="Based">
              <p className="text-[15px] text-ink-soft leading-[1.5]">
                Adelaide, South Australia.<br />
                <span className="text-muted">Working with clients Australia-wide.</span>
              </p>
            </InfoCard>
          </div>
        </div>
      </section>
    </>
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

function InfoCard({ label, children }) {
  return (
    <div className="bg-cream border border-line rounded-3xl p-6">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">{label}</div>
      {children}
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
