import LandingPage from '../../components/landing/LandingPage'

export const metadata = {
  title: { absolute: 'Tradie Websites Adelaide | Free Mockup in 48 Hours, No Deposit' },
  description: 'A tradie website that gets you called. Your trade, your suburbs, your number on every page. Free homepage mockup in 48 hours, no deposit, live in about two weeks. Adelaide.',
  alternates: { canonical: '/lp/tradie-websites' },
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <LandingPage
      source="Tradie Websites Adelaide"
      eyebrow="Websites for tradies, Adelaide"
      h1="A tradie website that gets you called."
      sub="Your trade, your suburbs, your number on every page. I design your homepage free within 48 hours. No deposit. If you like it, one fixed price and it is live in about two weeks."
      checks={['Free mockup in 48 hours', 'No deposit. One fixed price, no retainer', 'Your number on every page, one tap']}
      steps={[
        { title: 'Tell me your trade and your area', body: 'Two fields, two minutes. What you do and where to send the design.' },
        { title: 'Your homepage mockup in 48 hours', body: 'Your trade, your suburbs, your number where people can tap it. No payment, no obligation.' },
        { title: 'Like it? Fixed price, live in about two weeks', body: 'Most tradie sites are a handful of pages. One fixed price, no retainer. If not, it cost you nothing.' },
      ]}
      faqs={[
        { q: 'How much does a tradie website cost?', a: 'One fixed price, quoted with your mockup. Most tradie sites are a handful of pages, so they cost less than you think and go live in about two weeks.' },
        { q: 'Do I have to write anything?', a: 'No. A short phone call and I write it from that. You check it before it goes live.' },
        { q: 'Will people find it on Google?', a: 'The site is set up to be found in your suburbs for your trade. Google Ads are a separate thing and not required.' },
      ]}
      flood="Your tradie site, designed in 48 hours."
    />
  )
}
