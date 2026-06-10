import Link from 'next/link'

export const metadata = {
  title: 'Start a project',
  description:
    'Tell Will about your business and what you want built. Free 30-minute scoping reply within a business day — fixed quote, real timeline, or a clear no.',
  alternates: { canonical: '/start' },
  openGraph: {
    title: 'Start a project · Herbert AI',
    description: 'Tell me about your business. Free scoping reply within a business day.',
    url: '/start',
  },
}

const SITE_ORIGIN = 'https://herbert-aisolutions.com'

export default function Start() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="w-8 h-px bg-ink" />
            <span>Start a project</span>
          </div>

          <h1
            className="font-display text-ink"
            style={{
              fontSize: 'var(--text-display-lg)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              fontWeight: 800,
            }}
          >
            Tell me about
            <br />
            your business.
          </h1>

          <p className="mt-9 md:mt-12 max-w-[60ch] text-[17px] md:text-[19px] text-muted leading-[1.55]">
            Fill this in, hit send. I&rsquo;ll come back within a business day with a fixed
            quote and timeline — or a clear no if it&rsquo;s not worth building. No pitch
            deck, no agency sales call, no obligation.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-cream-alt">
        <div className="max-w-[820px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="space-y-12"
          >
            <input type="hidden" name="access_key" value="f3618e04-e007-4ee9-a80d-f96e3cc8d481" />
            <input type="hidden" name="from_name" value="Herbert AI — new project intake" />
            <input type="hidden" name="subject" value="New project intake — Herbert AI" />
            <input type="hidden" name="redirect" value={`${SITE_ORIGIN}/start/thanks`} />
            {/* Web3Forms built-in auto-response to the sender */}
            <input
              type="hidden"
              name="autoresponse_subject"
              value="Thanks — Herbert AI got your project brief"
            />
            <input
              type="hidden"
              name="autoresponse_message"
              value={`Hi — Will here from Herbert AI.\n\nThanks for getting in touch. I've got your brief in front of me and I'll come back within a business day with one of three things: a fixed quote and timeline, a clarifying question or two, or a clear no.\n\nIn the meantime, if you remember anything you forgot to include, just reply to this email.\n\n— Will Herbert\nHerbert AI · Adelaide`}
            />
            {/* Honeypot for spam */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            {/* ─── Section 01: About you ─── */}
            <Fieldset n="01" label="About you">
              <Field id="name" label="Name" type="text" placeholder="Your full name" required />
              <Field id="email" label="Email" type="email" placeholder="you@business.com" required />
              <Field id="phone" label="Phone (optional)" type="tel" placeholder="0400 000 000" />
              <Field id="business_name" label="Business name" type="text" placeholder="What it's called" required />
              <Field id="website" label="Website (if any)" type="url" placeholder="https://" />
              <Field
                id="business_what"
                label="What does the business actually do?"
                type="textarea"
                rows={3}
                placeholder="One or two sentences — what you sell, who buys it."
                required
              />
              <RadioGroup
                name="business_size"
                label="How big is the team?"
                options={['Solo', '2–5', '6–20', '20+']}
              />
            </Fieldset>

            {/* ─── Section 02: What's broken now ─── */}
            <Fieldset n="02" label="Where you are now">
              <Field
                id="friction"
                label="What's slow, broken, or missing today?"
                type="textarea"
                rows={5}
                placeholder="Missed calls, manual bookings, two tools that don't talk to each other, no real website, ads that aren't converting…"
                required
              />
              <Field
                id="tried"
                label="What have you tried so far? (optional)"
                type="textarea"
                rows={3}
                placeholder="Tools you've used, agencies you've worked with, things you've built yourself."
              />
            </Fieldset>

            {/* ─── Section 03: What you want ─── */}
            <Fieldset n="03" label="What you want">
              <Field
                id="outcome"
                label="What outcome are you after?"
                type="textarea"
                rows={3}
                placeholder="More leads. Fewer missed calls. Less time on admin. A booking system that actually works. Whatever the real goal is."
                required
              />
              <Field
                id="scope"
                label="What would you want built — features, scope, anything?"
                type="textarea"
                rows={4}
                placeholder="A custom website with online bookings. A voice agent on the office line. A dashboard for your team. Specific features. Don't worry about getting it right — rough is fine."
              />
              <RadioGroup
                name="budget"
                label="Rough budget"
                options={['Under $3k', '$3k – $10k', '$10k – $25k', '$25k+', 'Not sure yet']}
              />
              <RadioGroup
                name="timeline"
                label="Timeline"
                options={['ASAP', 'Next month', 'Next quarter', 'No rush — exploring']}
              />
            </Fieldset>

            {/* Submit */}
            <div className="pt-4 flex flex-col gap-4">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-4 rounded-full font-semibold text-[16px] hover:bg-ink-soft transition-colors"
              >
                Send the brief <span aria-hidden>→</span>
              </button>
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Reply within a business day &middot; No spam, no list, ever
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Alt path */}
      <section className="bg-cream">
        <div className="max-w-[820px] mx-auto px-6 lg:px-12 py-14 md:py-20 text-center">
          <p className="text-[15px] md:text-[16px] text-muted leading-[1.65]">
            Prefer a call?{' '}
            <Link href="/contact" data-magnetic className="text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-ink transition">
              Email or grab a 30-minute slot directly
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}

/* ─── Form bits ─────────────────────────────────────────────────── */

function Fieldset({ n, label, children }) {
  return (
    <fieldset className="space-y-5">
      <legend className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        <span>{n}</span>
        <span className="w-1 h-1 rounded-full bg-green-deep" />
        <span>{label}</span>
      </legend>
      {children}
    </fieldset>
  )
}

function Field({ id, label, type, placeholder, required, rows }) {
  const isTextarea = type === 'textarea'
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] text-ink font-medium mb-2">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          required={required}
          rows={rows || 4}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-cream border border-line rounded-2xl text-[15px] text-ink placeholder:text-muted focus:border-ink transition-colors resize-y"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-cream border border-line rounded-2xl text-[15px] text-ink placeholder:text-muted focus:border-ink transition-colors"
        />
      )}
    </div>
  )
}

function RadioGroup({ name, label, options }) {
  return (
    <div>
      <span className="block text-[14px] text-ink font-medium mb-3">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="cursor-pointer relative inline-flex items-center px-4 py-2.5 rounded-full border border-line bg-cream text-[14px] text-ink-soft hover:border-ink/40 has-[:checked]:bg-ink has-[:checked]:text-cream has-[:checked]:border-ink transition-colors"
          >
            <input
              type="radio"
              name={name}
              value={opt}
              className="sr-only"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  )
}
