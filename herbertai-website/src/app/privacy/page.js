import { Label, H1, Section } from '../components/site/kit'

export const metadata = {
  title: 'Privacy',
  description:
    'What the Herbert AI website collects, who handles it, how analytics work and how advertising cookies are used.',
  alternates: { canonical: '/privacy' },
}

// The privacy policy on the charter (hands-off pass, 22 Nov 2026). It is a
// policy, so it is written in the Business document register (writing-style):
// Herbert AI in the third person, Title Case headings that name the thing,
// Purpose first and Contact last, no contractions. Two statements were brought
// up to date the same day: the site now has one form, the audit request (the
// contact and project forms went on 22 Nov), and it keeps no page-view count of
// its own (the beacon was removed on 3 Nov). Everything else says what it said.
const sections = [
  {
    h: 'Purpose',
    body: [
      'This page sets out what information the Herbert AI website collects and what happens to it. Herbert AI is an Adelaide business that builds custom software and AI for small businesses, run by Will Herbert.',
    ],
  },
  {
    h: 'Information Collected',
    body: [
      ['Forms.', 'An audit request carries a name, contact details and anything written about the business. The request is delivered as email by Web3Forms, a form-delivery service, and a copy goes into Herbert AI’s own lead records, which are stored with Supabase. An AI model from Anthropic reads the request to sort how urgent it is and what it is about, so the most pressing are answered first. A short reply is sent by email through Resend, and where a mobile number was given a text may be sent through Twilio. Anthropic, Resend and Twilio are based in the United States, so those steps happen overseas. The information is used to reply and to price the work, and for nothing else.'],
      ['Where a visitor came from.', 'A link with a campaign tag, from an ad or an email for example, leaves that tag, the landing page and the referring site in the browser’s local storage, and they are sent with any form submitted. That is how Herbert AI can tell which ads and emails lead to enquiries. Clearing this site’s data in the browser removes it.'],
      ['Email.', 'Mail to hello@herbert-aisolutions.com is forwarded to a private inbox and kept like normal business email.'],
      ['Analytics.', 'The site uses Vercel Web Analytics and Speed Insights to count visits, pages and load performance. Both are anonymised and cookieless, and neither identifies a visitor or follows them to other sites.'],
      ['Advertising.', 'When Herbert AI runs Google Ads campaigns, Google’s conversion-tracking cookie may be set, so that an ad click can be matched to an enquiry. Herbert AI does not run remarketing. Personalised ads can be switched off at adssettings.google.com.'],
    ],
  },
  {
    h: 'Sharing',
    body: [
      'Herbert AI does not sell information or share it with anyone beyond the services named above, runs no third-party trackers beyond Google’s advertising tag, and adds nobody to a mailing list.',
    ],
  },
  {
    h: 'Access and Correction',
    body: [
      'Anyone can ask what Herbert AI holds about them, and have it corrected or deleted, by emailing hello@herbert-aisolutions.com. Requests are handled within a few business days. Herbert AI operates under the Australian Privacy Act 1988.',
    ],
  },
  {
    h: 'Contact',
    body: ['Questions about this page go to hello@herbert-aisolutions.com.'],
  },
]

export default function Privacy() {
  return (
    <Section first>
      <Label>Privacy</Label>
      <H1>Privacy Policy</H1>
      <div className="mt-12 max-w-[70ch]">
        {sections.map((s) => (
          <div key={s.h} className="border-t border-[#111]/12 py-8 first:pt-6">
            <h2 className="text-[20px] font-semibold tracking-[-0.015em] mb-3">{s.h}</h2>
            <div className="space-y-4">
              {s.body.map((p) => (
                <p key={Array.isArray(p) ? p[0] : p.slice(0, 24)} className="text-[16px] leading-[1.6] text-[#555] text-pretty">
                  {Array.isArray(p) ? <><b className="text-[#111]">{p[0]}</b> {p[1]}</> : p}
                </p>
              ))}
            </div>
          </div>
        ))}
        <p className="border-t border-[#111]/12 pt-6 text-[14px] text-[#777]">Last updated 22 November 2026</p>
      </div>
    </Section>
  )
}
