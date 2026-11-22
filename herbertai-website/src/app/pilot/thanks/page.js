import Script from 'next/script'
import { Label, H1, Section, TextLink } from '../../components/site/kit'

export const metadata = {
  title: 'Audit request received',
  description: 'Your audit request is in. A call comes the same day to set a time.',
  alternates: { canonical: '/pilot/thanks' },
  robots: { index: false, follow: true },
}

// Where every audit form lands. One load of this page is one form submit, so
// the Google Ads conversion fires here.
//
// On the charter since the hands-off pass of 22 Nov 2026, and in the Interface
// register (writing-style): the page opens on what happened, then says what the
// person does next and what they will get, with the stock phrase for the email
// ("Check your email"). It was first person ("I'll call you", "I've sent");
// site copy is the business in the third person, and steps say what happens,
// not who (CHARTER.md, rule 5).
export default function PilotThanks() {
  return (
    <Section first>
      <Script id="gtag-conversion" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('event', 'conversion', { send_to: 'AW-18228080032/RaGxCLSS6bwcEKDb6fND' });`}
      </Script>
      <div className="min-h-[52vh] flex flex-col justify-center">
        <Label>AI Audit</Label>
        <H1>Your request is in.</H1>
        <p className="mt-7 max-w-[56ch] text-[18px] leading-[1.55] text-[#555] text-pretty">
          Expect a call the same day to set a time for the audit: 45 minutes, with nothing to prepare. The written
          report follows within two business days.
        </p>
        <p className="mt-4 max-w-[56ch] text-[18px] leading-[1.55] text-[#555] text-pretty">
          Check your email for a confirmation. If another job comes to mind before the call, reply to it.
        </p>
        <p className="mt-9">
          <TextLink href="/" arrow={null}>Back to home</TextLink>
        </p>
      </div>
    </Section>
  )
}
