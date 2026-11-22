import { OG_IMAGE } from '@/app/components/site/og'
import { JsonLd, breadcrumbs } from '@/app/components/site/schema'
import { Label, H1, Section, TextLink } from '../components/site/kit'
import Questions from '../components/site/pilot-questions'
import AuditClose from '../components/site/audit-close'

export const metadata = {
  title: 'FAQ | pricing, timelines & process',
  description:
    'Common questions about Herbert AI, custom software and AI for small businesses in Adelaide: what gets built, the free audit, your first AI employee, timelines, pricing, lock-in, ownership, and getting started.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | Custom software and AI for small business · Herbert AI',
    description:
      'Common questions about the free AI audit, your first AI employee, pricing, ownership, and how working with Herbert AI in Adelaide goes.',
    url: '/faq',
    images: [OG_IMAGE],
  },
}

// /faq on the charter (hands-off pass, 22 Nov 2026). The thirteen general
// questions, folded the way /pilot's are, so questions look and work one way
// across the site and a reader scans thirteen lines for theirs. The answers are
// plain facts (CHARTER.md, "The wording"): the business in the third person,
// coined terms said plainly the first time, the data, code and hosting lines as
// the services agreement has them (22 Nov 2026), and the software line as
// /pilot's ("works with", checked in the audit, never "any software"). The same
// list feeds the FAQPage data.
const faqs = [
  ['What does Herbert AI do?', 'Herbert AI builds custom software and AI for small businesses, from Adelaide. Most work starts as an AI employee, software that does one office job every day, like chasing documents, answering enquiries or confirming bookings, with someone on your team okaying every message before it is sent. Bigger builds put the whole office on one system, with the AI employees working inside it. Will Herbert builds all of it.'],
  ['Who is it for?', 'Owner-run businesses with roughly 3 to 20 staff. Health clinics, property managers, trades with an office, venues, and accountants and bookkeepers come first, but the audit works for any office with admin that repeats every week.'],
  ['How do I get started?', 'With the free AI audit: 45 minutes on how your business runs, then a written report within two business days that puts a yearly cost on the three jobs taking the most hours and says which one to hand over first. Book it on the How it works page.'],
  ['What does it cost?', 'The audit is free. Your first AI employee, built for one job, is $3,500 fixed and working in 14 days or it is free. An AI operating system, the one system a whole office works out of, starts from $25,000 and is priced after the audit. Retainers start from $1,000 a month. If the audit shows the saving would not comfortably cover the price, you are told that instead.'],
  ['How long does it take?', 'Your first AI employee is working 14 days after the kickoff call, or you do not pay. An AI operating system gets one fixed price and a delivery date in writing, agreed after the audit.'],
  ['What is an AI employee?', 'Software with one job in your business, chasing documents or answering the front desk for example. It works on your actual clients every day and takes over the repetitive part of a job, not the person doing it. Anything it sends to a customer is approved by someone on your team first.'],
  ['Will it talk to my customers on its own?', 'Only as far as you decide. By default anything going out to a customer is approved by a person first. Where it does answer directly, an AI receptionist taking calls after hours for example, it takes a message or passes the call to you when it cannot help, and you set what it is allowed to handle.'],
  ['Do I have to change my software?', 'No. It works with the software you already use, and the audit checks each system before anything is promised. Your calendar, inbox, job system and invoicing stay where they are.'],
  ['Is there any lock-in?', 'No. Your first AI employee includes its first 30 days of hosting and support, then you choose $200 a month support, a move onto your own accounts, or an AI operating system. Retainers are month to month, and when one ends the system is moved onto accounts in your name with a written guide.'],
  ['Who owns the code and data?', 'Your data is yours: every record the system reads or stores belongs to you. Herbert AI keeps ownership of the code, and once a build is paid for you get a licence to use, copy and change it that never ends. While Herbert AI looks after the system it runs on Herbert AI’s accounts, hosted in Australia. When that ends it is moved onto accounts in your name with a written guide, and nothing is held back.'],
  ['Do I need any technical knowledge?', 'None. Will handles the build, the hosting and the AI setup, and walks your team through it when it goes live. You explain how the business runs and what is slowing it down.'],
  ['What if what I need is not on the site?', 'Bring it to the audit. Most of the work is specific to one business: a custom intake form, an internal admin tool, or two systems that do not talk to each other. If it is worth building it gets a price, and if it is not you are told so.'],
  ['Where is Herbert AI based?', 'Adelaide, South Australia, working with businesses across Australia. You deal with Will directly from the audit to the day it goes live, with no account manager in between.'],
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function FAQ() {
  return (
    <>
      <JsonLd data={breadcrumbs([['FAQ', '/faq']])} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <Section first>
        <Label>FAQ</Label>
        <H1>What owners ask.</H1>
        <Questions items={faqs} />
        <p className="mt-8">
          <TextLink href="mailto:hello@herbert-aisolutions.com">Email a question</TextLink>
        </p>
      </Section>

      <AuditClose source="/faq (end)" />
    </>
  )
}
