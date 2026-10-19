import SourceFields from '../SourceFields'

// The free AI audit booking form, shared by /pilot#book and the homepage's
// Book the Audit section so the two never drift (Will, 20 Oct 2026, picked the
// form on the homepage: "3"). Same endpoint, hidden fields, auto-reply,
// attribution (SourceFields) and honeypot everywhere; `source` names the page
// in the email subject so a booking says where it came from.
//
// look="pilot" keeps /pilot exactly as it was (the May register) until that
// page has its own design pass; look="paper" is the "Runs itself" charter card
// on the homepage. `message` adds the required "job everyone hates doing" box
// (/pilot asks it; the homepage keeps to four fields).

const AUTO_REPLY = `Hi, Will here from Herbert AI.\n\nThanks for the details. I'll give you a call today to set a time for your audit. Forty five minutes, no preparation needed, and the written page follows within two business days.\n\nIf another annoying job comes to mind before then, just reply to this email.\n\nWill Herbert\nHerbert AI · Adelaide`

const LOOKS = {
  pilot: {
    form: 'space-y-5',
    grid: 'space-y-5',
    label: 'block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2',
    input: 'w-full px-4 py-3 bg-cream border border-line rounded-2xl text-[15px] text-ink placeholder:text-muted focus:border-ink transition-colors',
    button: 'w-full inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full font-semibold text-[15px] hover:bg-ink-soft transition-colors',
    note: 'text-[12px] text-muted text-center',
    cta: 'Book my free AI audit',
    small: 'No obligation. Will calls you the same day.',
  },
  paper: {
    form: '',
    grid: 'grid sm:grid-cols-2 gap-4',
    label: 'block text-[12.5px] text-[#666] mb-1.5',
    input: 'w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-[10px] text-[15px] text-[#111] placeholder:text-[#999] focus:border-[#111] focus:outline-none transition-colors',
    button: 'mt-5 inline-flex items-center gap-2 bg-[#111] text-white rounded-[10px] px-6 py-3.5 text-[16px] font-medium hover:bg-[#2a2a2a] transition-colors',
    note: 'mt-3.5 text-[13px] text-[#777]',
    cta: 'Book my free audit',
    small: 'Free. You get a call to set a time.',
  },
}

const FIELDS = [
  { id: 'name', label: 'Your name', type: 'text', placeholder: 'Your name' },
  { id: 'business', label: 'Business name', type: 'text', placeholder: 'Your business' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'you@business.com' },
  { id: 'phone', label: 'Phone', type: 'tel', placeholder: '0400 000 000' },
]

export default function AuditForm({ source = '/pilot', look = 'pilot', message = true }) {
  const L = LOOKS[look]
  return (
    <form action="https://api.web3forms.com/submit" method="POST" className={L.form}>
      <input type="hidden" name="access_key" value="f3618e04-e007-4ee9-a80d-f96e3cc8d481" />
      <input type="hidden" name="from_name" value="Herbert AI · AI audit" />
      <input type="hidden" name="subject" value={`New AI audit request · ${source}`} />
      <input type="hidden" name="redirect" value="https://herbert-aisolutions.com/pilot/thanks" />
      <input type="hidden" name="autoresponse_subject" value="Got it, let's book your AI audit" />
      <input type="hidden" name="autoresponse_message" value={AUTO_REPLY} />
      <SourceFields service="AI audit" />
      {/* Honeypot for spam */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className={L.grid}>
        {FIELDS.map((f) => (
          <div key={f.id}>
            <label htmlFor={f.id} className={L.label}>{f.label}</label>
            <input id={f.id} name={f.id} type={f.type} required placeholder={f.placeholder} className={L.input} />
          </div>
        ))}
      </div>

      {message && (
        <div>
          <label htmlFor="message" className={L.label}>
            What&apos;s the job in your office everyone hates doing?
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className={L.input}
            placeholder="e.g. Chasing clients for documents, then copying the details into our system, then emailing everyone an update."
          />
        </div>
      )}

      <button type="submit" className={L.button}>
        {L.cta} <span aria-hidden>&rarr;</span>
      </button>
      <p className={L.note}>{L.small}</p>
    </form>
  )
}
