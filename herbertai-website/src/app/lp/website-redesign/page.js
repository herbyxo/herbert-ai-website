import LandingPage from '../../components/landing/LandingPage'

export const metadata = {
  title: { absolute: 'Website Redesign Adelaide | Rebuilt Without Losing Your Google Ranking' },
  description: 'Rebuild an outdated website without losing your Google ranking. Free redesign mockup in 48 hours, no deposit, redirects handled, live in weeks. Adelaide.',
  alternates: { canonical: '/lp/website-redesign' },
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <LandingPage
      source="Website Redesign Adelaide"
      compactField="website"
      eyebrow="Website redesign, Adelaide"
      h1="Rebuild your website without losing your Google"
      em="ranking."
      sub="Send me your current site and I will design the new homepage, free, within 48 hours. No deposit. Redirects handled, content moved, rankings kept through the switch. Live in weeks."
      steps={[
        { title: 'Send me your current site', body: 'The link, and what is wrong with it. Slow, dated, not working on phones, whatever it is.' },
        { title: 'New homepage mockup in 48 hours', body: 'Your business, rebuilt. A real design you can compare against the old one. No payment, no obligation.' },
        { title: 'Like it? Fixed quote, and the move is handled', body: 'Every old address redirects to its new page. Content moved. Rankings kept. The old site stays up until the new one is live.' },
      ]}
      points={[
        { title: 'Rankings kept through the move', body: 'Redirects for every old page, content carried across, Search Console updated. Google follows the site to its new home.' },
        { title: 'Faster on a phone', body: 'That is where your customers are. The rebuild is measured on a phone before it goes live.' },
        { title: 'You own everything', body: 'The site, the code, the domain, the content. No lock-in, no hostage fees.' },
      ]}
      faqs={[
        { q: 'Will I lose my Google rankings?', a: 'No. Every old address redirects to its new page, the content moves with it, and Search Console is updated. This is the part most rebuilds get wrong, and it is handled for you.' },
        { q: 'Does my site go down during the rebuild?', a: 'No. The old site stays up until the new one is ready, then it switches over.' },
        { q: 'How much does a redesign cost?', a: 'Quoted on scope, one fixed price with your mockup. No hourly billing, no retainers.' },
      ]}
      flood="Your new homepage, free, in 48 hours."
    />
  )
}
