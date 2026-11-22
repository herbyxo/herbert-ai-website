import AuditForm from './AuditForm'

// The close every page ends on: the audit form in a dark band, so a reader at
// the bottom of any page books without going anywhere. Will picked it for the
// home page (20 Oct 2026, "3") and for /pilot (22 Nov 2026: "do B, the form
// again"), where the heading is the first section's own line, centred against
// the form ("Can we have that centered?"). The other pages took it in the
// hands-off pass of 22 Nov 2026, under the home page's line.
//
// source names the page in the email subject, so a booking says which form it
// came from. The form's ids are prefixed, since /pilot also carries the form in
// its first section.
//
// ground, label and message exist so the design lab can draw /pilot's details
// from the same code. ground: 'dark', 'paper', or 'hero' (paper, laid out like
// /pilot's first section with its three terms). label: null for none.

const HERO_TERMS = [
  ['Free', 'No obligation'],
  ['45 min', 'One call on how your business runs'],
  ['2 days', 'Your written report'],
]

export default function AuditClose({ heading = 'Got a job eating your time and money?', label = 'Book the Audit', source, message = false, ground = 'dark' }) {
  const dark = ground === 'dark'
  return (
    <section className={dark ? 'bg-[#111] text-white border-t border-white/10' : 'bg-[#FAFAF8] text-[#111] border-t border-[#111]/10'}>
      <div className={`max-w-[1280px] mx-auto px-6 lg:px-12 pt-24 pb-28 grid lg:grid-cols-2 gap-x-16 gap-y-12 ${ground === 'hero' ? 'items-start' : 'items-center'}`}>
        <div className="min-w-0">
          {label && <p className={`text-[16px] font-medium mb-4 ${dark ? 'text-white/60' : 'text-[#555]'}`}>{label}</p>}
          <h2 className="font-bold tracking-[-0.04em] leading-[0.98] max-w-[14ch] text-balance" style={{ fontSize: 'clamp(40px, 4.6vw, 68px)' }}>
            {heading}
          </h2>
          {ground === 'hero' && (
            <div className="mt-10 grid grid-cols-3 gap-5 max-w-[620px]">
              {HERO_TERMS.map(([n, l]) => (
                <div key={n} className="border-t border-[#111]/12 pt-3">
                  <div className="text-[21px] min-[360px]:text-[26px] font-semibold tracking-[-0.02em] whitespace-nowrap">{n}</div>
                  <div className="mt-1 text-[14px] leading-[1.35] text-[#777] text-balance">{l}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className={`rounded-2xl p-6 sm:p-7 ${dark ? 'bg-[#FAFAF8] text-[#111]' : 'bg-white border border-[#111]/10'}`}>
            <AuditForm source={source} message={message} idPrefix="end-" />
          </div>
        </div>
      </div>
    </section>
  )
}
