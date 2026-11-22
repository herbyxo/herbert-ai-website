// The page parts every page in the "Runs itself" register is built from (22 Nov
// 2026, hands-off pass): the same label, heading scale and section rhythm /pilot
// settled section by section with Will, so /faq, /pricing, /about and the small
// pages match it without each redrawing them. Paper ground #FAFAF8, ink #111,
// Geist; labels in title case, headings as sentences (docs/design/CHARTER.md).

export function Label({ children }) {
  return <p className="text-[16px] font-medium mb-4 text-[#555]">{children}</p>
}

// A page's first heading.
export function H1({ children, wide = false }) {
  return (
    <h1 className={`font-bold tracking-[-0.045em] leading-[0.95] text-balance ${wide ? 'max-w-[18ch]' : 'max-w-[14ch]'}`} style={{ fontSize: 'clamp(44px, 4.4vw, 64px)' }}>
      {children}
    </h1>
  )
}

export function H2({ children }) {
  return (
    <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch] text-balance" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
      {children}
    </h2>
  )
}

// first: the page's opening section, with no rule above it and less room at the
// top, since the header sits directly over it.
export function Section({ children, first = false }) {
  return (
    <section className={`bg-[#FAFAF8] text-[#111] ${first ? '' : 'border-t border-[#111]/10'}`}>
      <div className={`max-w-[1280px] mx-auto px-6 lg:px-12 ${first ? 'pt-14 md:pt-20 pb-20 md:pb-24' : 'py-24'}`}>{children}</div>
    </section>
  )
}

// Body copy under a heading: one measure, one size.
export function Lead({ children }) {
  return <p className="mt-7 max-w-[60ch] text-[18px] leading-[1.55] text-[#555] text-pretty">{children}</p>
}

const LINK = 'font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]'

export function TextLink({ href, children, arrow = '→' }) {
  return (
    <a href={href} className={`text-[16px] ${LINK}`}>
      {children}{arrow && <> <span aria-hidden>{arrow}</span></>}
    </a>
  )
}

export const linkClass = LINK
