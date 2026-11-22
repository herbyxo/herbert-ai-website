import AuditForm from './AuditForm'

// /pilot section 7, the close (Will, 22 Nov 2026: "do B, the form again"): the
// form again at the end, in the home page's dark close band, so a reader at the
// bottom books without going back up. The same form as the first section's,
// with its ids prefixed so the two copies do not clash; its subject line says
// it came from the end of the page.
//
// The props exist so the design lab can draw this section's details from the
// same code; the page uses the defaults. ground: 'dark' (the home page's band),
// 'paper' (the page's own ground), 'hero' (paper, laid out like /pilot's first
// section with its three terms). label: null for none.

const HERO_TERMS = [
  ['Free', 'No obligation'],
  ['45 min', 'One call on how your business runs'],
  ['2 days', 'Your written report'],
]

export default function PilotClose({ heading = 'Ready?', label = 'Book the Audit', message = false, ground = 'dark' }) {
  const dark = ground === 'dark'
  return (
    <section className={dark ? 'bg-[#111] text-white border-t border-white/10' : 'bg-[#FAFAF8] text-[#111] border-t border-[#111]/10'}>
      <div className={`max-w-[1280px] mx-auto px-6 lg:px-12 pt-24 pb-28 grid lg:grid-cols-2 gap-x-16 gap-y-12 ${ground === 'hero' ? 'items-start' : 'items-end'}`}>
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
            <AuditForm source="/pilot (end)" message={message} idPrefix="end-" />
          </div>
        </div>
      </div>
    </section>
  )
}
