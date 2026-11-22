import { OG_IMAGE } from '@/app/components/site/og'
import { JsonLd, breadcrumbs, IDS, SITE_URL } from '@/app/components/site/schema'
import { Label, H1, H2, Section, TextLink } from '../components/site/kit'
import AuditClose from '../components/site/audit-close'

export const metadata = {
  title: 'About | Will Herbert, custom software and AI for small business',
  description:
    'Will Herbert builds custom software and AI systems for small businesses in Adelaide. No account managers. Every engagement starts with a free AI audit.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Will Herbert · Herbert AI',
    description: 'Custom software and AI for small businesses, built in Adelaide by one person you deal with directly.',
    url: '/about',
    images: [OG_IMAGE],
  },
}

// /about on the charter (hands-off pass, 22 Nov 2026). The reader arrives from
// an email, a LinkedIn message or a referral to check the person is real, so
// the page is who builds it, why it is one person, and what he has built, then
// the audit. The steps and prices are left to the home page, /pilot and
// /pricing, which already carry them.
//
// Founder photo: the charter allows one, here only. Drop the file at
// public/will.jpg and set this to '/will.jpg'. Until then nothing stands in for
// it (the "W" tile went: a letter in a box is not a photo).
const FOUNDER_PHOTO = null

// The class of work, never a client's name (CHARTER.md, "Nothing is claimed").
const work = [
  {
    tag: 'Finance',
    name: 'An operations hub for a finance brokerage',
    body: 'Every client file on one board, documents chased automatically, every email drafted for a person to approve. The system a whole office works out of.',
  },
  {
    tag: 'Hospitality',
    name: 'A booking platform for a barbershop',
    body: 'Custom site, online bookings with deposits and tipping, an owner dashboard, SMS reminders and automated review collection. Built and run live for months by one person.',
  },
]

const BODY = 'text-[17px] leading-[1.6] text-[#555] text-pretty'

export default function About() {
  return (
    <>
      <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'ProfilePage', url: `${SITE_URL}/about`, mainEntity: { '@id': IDS.will } }, breadcrumbs([['About', '/about']])]} />

      <Section first>
        <div className={FOUNDER_PHOTO ? 'grid lg:grid-cols-[1fr_auto] gap-x-16 gap-y-10 items-start' : ''}>
          <div className="min-w-0">
            <Label>About</Label>
            <H1 wide>Will Herbert builds the software small businesses run on.</H1>
            <div className="mt-8 max-w-[60ch] space-y-5">
              <p className={BODY}>
                Herbert AI is custom software and AI for small businesses, built in Adelaide by Will Herbert. He builds
                the systems an office runs on: the AI employee that chases documents or follows up quotes, and the one
                system a whole team works out of once a few of those are running. You deal with him from the first
                audit to the day it goes live.
              </p>
              <p className={BODY}>
                It started with AI receptionists for tradies. The same patterns turned out to fit a barbershop, a
                finance brokerage and anywhere else a repetitive job is eating someone&rsquo;s week, so that is what he
                builds now.
              </p>
            </div>
            <p className="mt-8">
              <TextLink href="mailto:hello@herbert-aisolutions.com" arrow={null}>hello@herbert-aisolutions.com</TextLink>
            </p>
          </div>
          {FOUNDER_PHOTO && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={FOUNDER_PHOTO} alt="Will Herbert" className="w-44 h-44 md:w-64 md:h-64 rounded-2xl object-cover border border-[#111]/10" />
          )}
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-x-14 gap-y-10 items-start">
          <div className="min-w-0">
            <Label>Why One Builder</Label>
            <H2>You deal with the person building it.</H2>
          </div>
          <div className="min-w-0 max-w-[60ch] space-y-5">
            <p className={BODY}>
              There is no sales rep, no account manager and no junior who escalates to a senior. Will runs the audit,
              does the build and gives the walkthrough with your team.
            </p>
            <p className={BODY}>
              Nothing is built from a template. Each system works with the software you already use and takes over the
              part that was being done by hand.
            </p>
            <p className={BODY}>
              There is no lock-in. Your data is yours, and you get a licence to the code that never ends. Every build
              comes with a written guide another developer could run it from. Retainers are month to month, and
              nothing switches off without being handed over to you first.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <Label>Recent Work</Label>
        <H2>The kind of thing that gets built.</H2>
        <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-8">
          {work.map((w) => (
            <div key={w.name} className="min-w-0 border-t border-[#111]/15 pt-4">
              <p className="text-[14px] text-[#777]">{w.tag}</p>
              <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.015em] text-balance">{w.name}</h3>
              <p className="mt-1.5 text-[16px] leading-[1.5] text-[#555] text-pretty">{w.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <AuditClose source="/about (end)" />
    </>
  )
}
