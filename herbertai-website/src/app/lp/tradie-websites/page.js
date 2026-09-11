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
      h1="A tradie website that gets you"
      em="called."
      sub="Your trade, your suburbs, your number on every page. I design your homepage free within 48 hours. No deposit. If you like it, one fixed price and it is live in about two weeks."
      steps={[
        { title: 'Tell me your trade and your area', body: 'Two fields, two minutes. What you do and where to send the design.' },
        { title: 'Your homepage mockup in 48 hours', body: 'Your trade, your suburbs, your number where people can tap it. No payment, no obligation.' },
        { title: 'Like it? Fixed price, live in about two weeks', body: 'Most tradie sites are a handful of pages. One fixed price, no retainer. If not, it cost you nothing.' },
      ]}
      points={[
        { title: 'Built for phones first', body: 'Most people looking for a tradie are searching from one, often on site. The page loads fast and the number is one tap.' },
        { title: 'Quote requests, not clicks', body: 'A short form that asks the three things you need to quote a job, and sends it straight to your phone.' },
        { title: 'You own everything', body: 'The site, the code, the domain, the content. No lock-in, no hostage fees.' },
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
