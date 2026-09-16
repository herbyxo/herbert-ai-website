// Shared industry and ladder content for the restructured site. One source so
// the home strip, the industries index, the industry pages and the work page
// say the same thing. Decided 16 Sep 2026, docs/restructure-2026-09/PROJECT.md.
// Every claim here is a question or a description of what gets built, never a
// claim about a specific business; savings are worked out in the audit from the
// client's own figures.

export const INDUSTRIES = [
  {
    slug: 'accountants',
    name: 'Accountants and bookkeepers',
    short: 'Accountants',
    bottleneck: 'Chasing clients for documents at tax time, then re-typing the details into the practice software.',
    ask: 'Most firms your size lose days chasing client documents at tax time. Is that you?',
    employee: 'An AI document chaser',
    employeeDoes: 'Sends each client their own checklist, reminds them about only what is still missing, matches what comes back to the file, and tells your team when a return is ready to start.',
    demo: '/demo/accountants',
    demoLive: true,
  },
  {
    slug: 'allied-health',
    name: 'Allied health',
    short: 'Allied health',
    bottleneck: 'Intake forms, referral letters, recall reminders and the follow-up after a no-show.',
    ask: 'How much of the front desk’s week goes on intake forms and chasing referrals?',
    employee: 'An AI front desk assistant',
    employeeDoes: 'Collects intake forms before the first visit, chases the referral, sends recalls when they fall due, and follows up a missed appointment the same day, with the practice manager approving anything unusual.',
    demo: '/demo/allied-health',
    demoLive: false,
  },
  {
    slug: 'trades',
    name: 'Trades with an office',
    short: 'Trades',
    bottleneck: 'Quotes that go out and never get followed up, job details handed to techs by text, invoicing after the job.',
    ask: 'How many quotes go out that nobody follows up?',
    employee: 'An AI quote follow-up',
    employeeDoes: 'Follows every quote up on a schedule, answers the common questions, flags the ones worth a call, and hands the job details to the tech and the invoice to the office once it is won.',
    demo: '/demo/trades',
    demoLive: false,
  },
  {
    slug: 'real-estate',
    name: 'Real estate and property management',
    short: 'Real estate',
    bottleneck: 'Maintenance requests passed between tenants, landlords and tradies by hand, and landlords kept updated by email.',
    ask: 'How much time goes on passing maintenance requests between tenants, landlords and tradies?',
    employee: 'An AI maintenance coordinator',
    employeeDoes: 'Logs the request from the tenant, gets the landlord’s approval, dispatches the tradie, and keeps everyone updated, with the property manager approving anything over their limit.',
    demo: '/demo/real-estate',
    demoLive: false,
    liveProof: { href: 'https://dashboard.herbert-aisolutions.com', label: 'See a property manager’s dashboard' },
  },
]

export const RUNGS = [
  {
    n: '01',
    title: 'A free AI audit',
    body: 'Forty five minutes with Will on how your business runs. Within two business days you get a written page: the three jobs eating the most hours, what each costs you a year in your own figures, and which one to hand over first. Yours to keep either way.',
    price: 'Free',
  },
  {
    n: '02',
    title: 'Your first AI employee',
    body: 'The Bottleneck Pilot builds one AI employee for that job, live on your real data in 14 days. It does one job every day, and your team approves anything that goes out.',
    price: '$3,500 fixed. Live in 14 days or it’s free.',
  },
  {
    n: '03',
    title: 'The system it runs in',
    body: 'When one job runs itself, the next ones follow. A full build puts your files, comms and follow-ups on one system your team works out of every day, and your business owns it. The pilot’s $3,500 comes off the price.',
    price: 'From $25,000, scoped after the audit.',
  },
]

export const AUDIT_HREF = '/pilot#book'

export function Eyebrow({ children, color = 'ink' }) {
  const isWhite = color === 'white'
  return (
    <div className={`flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] ${isWhite ? 'text-cream/55' : 'text-muted'}`}>
      <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />
      {children}
    </div>
  )
}

export function AuditButton({ dark = false, label = 'Book a free AI audit' }) {
  const cls = dark
    ? 'bg-green text-ink hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300'
    : 'bg-ink text-cream hover:bg-ink-soft transition-colors'
  return (
    <a href={AUDIT_HREF} className={`${cls} px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center gap-2`}>
      {label} <span aria-hidden>&rarr;</span>
    </a>
  )
}
