'use client'

// The web-design-adelaide enquiry form.
//
// Submits to TWO places, deliberately:
//   1. web3forms (the native form action, unchanged): the email copy, the
//      autoresponse, the thanks redirect. The path that has always worked
//      stays primary.
//   2. /api/lead (fire-and-forget on submit): the marketing engine's lead
//      intake, so an enquiry from an ad becomes a dashboard lead with
//      attribution instead of only an email. keepalive: true because the
//      web3forms POST navigates away immediately and would otherwise cancel
//      this request mid-flight.
//
// If the engine call fails, nothing changes for the visitor: the email still
// sends, the thanks page still loads. The engine copy is an addition, never a
// dependency.

// `compact` renders the same form with only the two fields a mockup actually
// cannot start without: the business and where to send it. It exists because
// the full form sat 31% down the document, below the fold, where 57% of
// viewing attention never reaches (NN/g). Both variants are ONE component
// posting to ONE endpoint, so the hidden fields, the engine notification and
// the thanks redirect cannot drift apart.
export default function MockupLeadForm({ variant = 'full', onGreen = false, source = 'Web Design Adelaide', compactField = 'business', look = 'pill' }) {
  const compact = variant === 'compact'
  // `look`: 'pill' is the organic page (cream, rounded-full, the site's green).
  // 'direct' is the paid landing pages (BUILD-PLAN G-C12 field test, Will's pick
  // A2/S3 on 2026-09-11): stacked square fields, deep green button, white text.
  // Same hidden fields, same endpoint, same redirect, so the two cannot drift.
  const direct = look === 'direct'
  // `source` names the page in the email subject so an enquiry from the
  // redesign page reads as one; `compactField` lets the compact form lead with
  // the one thing that page's mockup cannot start without (the current site,
  // for a redesign).

  function notifyEngine(e) {
    try {
      const form = e.currentTarget
      const params = new URLSearchParams(window.location.search)
      const body = JSON.stringify({
        name: form.name?.value || '',
        business: form.business?.value || '',
        email: form.email?.value || '',
        phone: form.phone?.value || '',
        current_website: form.website?.value || '',
        message: form.message?.value || '',
        gclid: params.get('gclid') || '',
        utm_campaign: params.get('utm_campaign') || '',
        page: window.location.pathname,
      })
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {})
    } catch {
      // Never block the real submit.
    }
  }

  return (
    <form action="https://api.web3forms.com/submit" method="POST"
      onSubmit={notifyEngine} className={compact ? 'space-y-3' : 'space-y-5'}>
      <input type="hidden" name="access_key" value="f3618e04-e007-4ee9-a80d-f96e3cc8d481" />
      <input type="hidden" name="from_name" value={`Herbert AI, ${source}`} />
      <input type="hidden" name="subject" value={`New mockup request, ${source}`} />
      <input type="hidden" name="redirect" value="https://herbert-aisolutions.com/start/thanks" />
      <input
        type="hidden"
        name="autoresponse_subject"
        value="Thanks, I've got your details"
      />
      <input
        type="hidden"
        name="autoresponse_message"
        value="Thanks, I've got your details and I'll be in touch with your mockup shortly - Will"
      />
      {/* Honeypot for spam */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      {compact && direct ? (
        <>
          <div className="flex flex-col gap-2.5">
            <input
              id={compactField === 'website' ? 'd-website' : 'd-business'}
              name={compactField === 'website' ? 'website' : 'business'}
              type="text" required
              autoComplete={compactField === 'website' ? 'url' : 'organization'}
              placeholder={compactField === 'website' ? 'Your current website' : 'Your business'}
              className={`w-full px-3.5 py-3 rounded-[4px] border text-[15px] focus:outline-none focus:border-[#0B7A3E] transition-colors ${
                onGreen
                  ? 'bg-[#24272C] border-[#3A3D44] text-white placeholder:text-[#8B9096]'
                  : 'bg-white border-[#C9CCC9] text-[#1F2125] placeholder:text-[#62666C]'
              }`}
            />
            <input
              id="d-email" name="email" type="email" required autoComplete="email"
              placeholder="you@business.com"
              className={`w-full px-3.5 py-3 rounded-[4px] border text-[15px] focus:outline-none focus:border-[#0B7A3E] transition-colors ${
                onGreen
                  ? 'bg-[#24272C] border-[#3A3D44] text-white placeholder:text-[#8B9096]'
                  : 'bg-white border-[#C9CCC9] text-[#1F2125] placeholder:text-[#62666C]'
              }`}
            />
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-[4px] bg-[#0B7A3E] hover:bg-[#09612F] text-white font-bold text-[16px] transition-colors"
            >
              Get my free mockup
            </button>
          </div>
          <p className={`text-[12.5px] text-center ${onGreen ? 'text-[#A9ADB3]' : 'text-[#62666C]'}`}>
            No deposit. No obligation. Reply within 48 hours.
          </p>
        </>
      ) : compact ? (
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id={compactField === 'website' ? 'c-website' : 'c-business'}
              name={compactField === 'website' ? 'website' : 'business'}
              type="text" required
              autoComplete={compactField === 'website' ? 'url' : 'organization'}
              placeholder={compactField === 'website' ? 'Your current website' : 'Your business'}
              className="flex-1 min-w-0 px-5 py-3.5 bg-cream border border-line rounded-full text-[15px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors"
            />
            <input
              id="c-email" name="email" type="email" required autoComplete="email"
              placeholder="you@business.com"
              className="flex-1 min-w-0 px-5 py-3.5 bg-cream border border-line rounded-full text-[15px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors"
            />
            <button
              type="submit" data-magnetic
              className={`shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[15px] transition-all duration-300 ${
                onGreen
                  ? 'bg-ink text-cream hover:bg-ink-soft'
                  : 'bg-green text-ink hover:shadow-[0_0_28px_var(--green-glow)] hover:-translate-y-px'
              }`}
            >
              Get my free mockup <span aria-hidden>&rarr;</span>
            </button>
          </div>
          <p className={`text-[13px] ${onGreen ? 'text-ink/70' : 'text-muted'}`}>
            48 hours, no obligation. You only pay if you say yes to the quote.
          </p>
        </>
      ) : (
      <>
      <Field id="name" label="Your name" type="text" placeholder="Your name" required />
      <Field id="business" label="Business name" type="text" placeholder="Your business" required />
      <Field id="email" label="Email" type="email" placeholder="you@business.com" required />
      <Field id="phone" label="Phone (optional)" type="tel" placeholder="0400 000 000" />
      <Field id="website" label="Current website (optional)" type="text" placeholder="yourbusiness.com.au — or 'none yet'" />

      <div>
        <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
          What does your business do? (optional)
        </label>
        {/* Not required. A required free-text box is the most expensive field
            on any form: it asks someone to compose a paragraph before we have
            earned anything, and it sat between every visitor and the offer.
            What it collects is genuinely useful for the mockup, so it stays on
            the form, but it is asked again in the follow-up email rather than
            enforced here. */}
        <textarea
          id="message"
          name="message"
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
        Send &mdash; get my free mockup <span aria-hidden>&rarr;</span>
      </button>
      <p className="text-[12px] text-muted text-center">
        Free mockup, no obligation. Reply within a business day.
      </p>
      </>
      )}
    </form>
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
