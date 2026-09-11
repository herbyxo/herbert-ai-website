import LandingPage from '../../components/landing/LandingPage'

export const metadata = {
  title: { absolute: 'Web Design Adelaide | Free Homepage Mockup in 48 Hours, No Deposit' },
  description: 'See your new website before you pay a cent. Free homepage mockup in 48 hours, no deposit, one fixed quote, live in weeks. Adelaide, custom built.',
  alternates: { canonical: '/lp/web-design' },
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <LandingPage
      source="Web Design Adelaide"
      eyebrow="Web design, Adelaide"
      h1="See your new website before you pay a"
      em="cent."
      sub="Tell me about your business and I will design your homepage, free, within 48 hours. No deposit, no obligation. If you like it, you get one fixed quote and the site is live in weeks."
      steps={[
        { title: 'Tell me about your business', body: 'Two fields, two minutes. What you do and where to send the design.' },
        { title: 'Your homepage mockup in 48 hours', body: 'A real design with your name, your services and your branding. No payment, no obligation.' },
        { title: 'Like it? Fixed quote, live in weeks', body: 'One fixed price and a real timeline. If not, it cost you nothing.' },
      ]}
      points={[
        { title: 'One fixed price, agreed before we start', body: 'No hourly billing, no agency retainers, no surprises. The quote comes with the mockup.' },
        { title: 'One person, start to finish', body: 'You deal directly with the person designing and building your site. Nothing lost in handoffs.' },
        { title: 'You own everything', body: 'The site, the code, the domain, the content. No lock-in, no hostage fees.' },
      ]}
      faqs={[
        { q: 'How much does a website cost?', a: 'Every site is quoted on scope. A clean five-page site costs a lot less than one with bookings and payments. You get one fixed price with your mockup.' },
        { q: 'Is the mockup really free?', a: 'Yes. A real homepage design for your business within 48 hours, before any money changes hands. If you do not go ahead, it costs you nothing.' },
        { q: 'How long does the build take?', a: 'Most sites go live in two to four weeks from sign-off. Bigger builds take longer, and the quote says so.' },
      ]}
      flood="Your homepage, designed in 48 hours."
    />
  )
}
