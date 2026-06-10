import Link from 'next/link'
import RevealOnScroll from '../components/motion/RevealOnScroll'

export const metadata = {
  title: 'Contact an Adelaide Web & Automation Studio',
  description:
    'Contact Herbert AI — an Adelaide web design & automation studio. Book a free 30-minute scoping call, no pitch. Email, phone, or Calendly. Usually replies within a day.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact · Herbert AI',
    description:
      'Book a free 30-minute scoping call with an Adelaide web design & automation studio. No pitch — a fixed quote and timeline if it’s worth building.',
    url: '/contact',
  },
}

export default function Contact() {
  return (
    <>
      {/* ─── Hero — static (above the fold, must paint on first load) ─ */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32">
          <Eyebrow>Contact</Eyebrow>
          <h1
            className="font-display text-ink max-w-[16ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            Tell me what&apos;s slow, what&apos;s broken, or what doesn&apos;t exist yet.
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[58ch]">
            Herbert AI is an Adelaide web design &amp; automation studio for small business. Send a
            message or book a free 30-minute call, no pitch. If it&apos;s worth building, I&apos;ll
            come back with a fixed quote and timeline.
          </p>
        </div>
      </section>

      {/* ─── Form + info ─── */}
      <section className="bg-cream-alt">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36 grid md:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16">
          {/* Form */}
          <RevealOnScroll className="h-full">
            <div className="bg-cream border border-line rounded-3xl p-8 md:p-10 h-full">
              <h2 className="text-[24px] font-medium tracking-[-0.01em] text-ink mb-2">Send a message</h2>
              <p className="text-[14px] text-muted mb-6">Usually replies within a day.</p>

              <form action="https://api.web3forms.com/submit" method="POST" className="space-y-5">
                <input type="hidden" name="access_key" value="f3618e04-e007-4ee9-a80d-f96e3cc8d481" />
                <input type="hidden" name="from_name" value="Herbert AI — contact form" />
                <input type="hidden" name="subject" value="New message — Herbert AI site" />
                <input type="hidden" name="redirect" value="https://herbert-aisolutions.com/start/thanks" />

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
                  Send message <span aria-hidden>&rarr;</span>
                </button>
              </form>
            </div>
          </RevealOnScroll>

          {/* Info */}
          <RevealOnScroll delay={0.08} className="space-y-5">
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
                  30-min scoping call <span aria-hidden>&rarr;</span>
                </Link>
              </InfoCard>
              <InfoCard label="Based">
                <p className="text-[15px] text-ink-soft leading-[1.5]">
                  Adelaide, South Australia.<br />
                  <span className="text-muted">Working with clients Australia-wide.</span>
                </p>
              </InfoCard>
            </div>
          </RevealOnScroll>
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
    <div className="bg-cream border border-line rounded-3xl p-6 lift">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">{label}</div>
      {children}
    </div>
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
