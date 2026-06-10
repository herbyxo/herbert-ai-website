export const metadata = {
  title: 'Privacy',
  description:
    'How Herbert AI handles your information — what the forms collect, how analytics work, and how advertising cookies are used. Plain English, no legalese.',
  alternates: { canonical: '/privacy' },
}

const sections = [
  {
    h: 'Who we are',
    body: [
      'Herbert AI is an Adelaide-based web design & automation studio run by Will Herbert. This page explains what information the site collects and what happens to it. Questions about any of it: hello@herbert-aisolutions.com.',
    ],
  },
  {
    h: 'What we collect, and why',
    body: [
      'Forms. If you send a message or a project brief, you give us your name, contact details, and whatever you write about your business. Submissions are processed by Web3Forms (a form-delivery service) and arrive as email. That information is used to reply to you and scope your project — nothing else. No marketing list, no newsletter, no reselling.',
      'Email. Mail to hello@herbert-aisolutions.com is forwarded to a private inbox. Correspondence is kept like normal business email.',
      'Analytics. The site uses Vercel Web Analytics and Speed Insights to count visits, pages, and load performance, and keeps its own first-party count of page views (page path, referring site, and device type — nothing identifying). All of it is anonymised and cookieless — none of it identifies you or follows you to other sites.',
      'Advertising. When we run Google Ads campaigns, Google’s conversion-tracking cookie may be set so we can tell whether an ad click led to an enquiry, and Google may use it to show our ads to past visitors (remarketing). You can opt out of personalised ads at adssettings.google.com.',
    ],
  },
  {
    h: 'What we don’t do',
    body: [
      'We don’t sell or share your information with anyone beyond the services named above. We don’t run third-party trackers beyond Google’s advertising tag. We don’t add you to mailing lists.',
    ],
  },
  {
    h: 'Your rights',
    body: [
      'Want to know what we hold about you, have it corrected, or have it deleted? Email hello@herbert-aisolutions.com and it’ll be handled within a few business days. We operate under the Australian Privacy Act 1988.',
    ],
  },
]

export default function Privacy() {
  return (
    <>
      {/* ─── Hero — static ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-20 md:pt-40 md:pb-24">
          <div className="flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="w-8 h-px bg-ink" />
            <span>Privacy</span>
          </div>
          <h1
            className="font-display text-ink max-w-[14ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            Your data, plainly.
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[56ch]">
            No legalese. This is everything the site collects, why, and what you can do about it.
          </p>
        </div>
      </section>

      {/* ─── Policy ─── */}
      <section className="bg-cream">
        <div className="max-w-[820px] mx-auto px-6 lg:px-12 pb-24 md:pb-32 space-y-14">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-[22px] md:text-[24px] font-medium tracking-[-0.01em] text-ink mb-4">{s.h}</h2>
              <div className="space-y-4">
                {s.body.map((p, i) => (
                  <p key={i} className="text-[15px] md:text-[16px] text-muted leading-[1.7]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted pt-4 border-t border-line">
            Last updated June 2026
          </p>
        </div>
      </section>
    </>
  )
}
