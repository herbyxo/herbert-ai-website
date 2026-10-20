import { OG_IMAGE } from './og'

// Structured data (JSON-LD) for search engines and AI answer engines (AEO
// plan, docs/aeo/PLAN.md). The business, the website and Will are each defined
// once, in the root layout, with an @id; every page's own schema points at
// them by that @id instead of repeating them, so the facts about Herbert AI
// cannot drift between pages. The ladder's prices live here too, as the
// business's offer catalogue, and must match /pricing.

export const SITE_URL = 'https://herbert-aisolutions.com'

export const IDS = {
  business: `${SITE_URL}/#business`,
  website: `${SITE_URL}/#website`,
  will: `${SITE_URL}/about#will`,
}

// Profiles that are the same business or person, for entity matching (the
// name collides with other "Herbert" companies). Add each one as it exists:
// Google Business Profile, LinkedIn, Clutch and so on.
const BUSINESS_SAME_AS = ['https://www.linkedin.com/company/herbert-ai', 'https://github.com/herbyxo']
const WILL_SAME_AS = ['https://www.linkedin.com/in/will-herbert-founder', 'https://github.com/herbyxo']

const AUD = (price, extra = {}) => ({ '@type': 'PriceSpecification', priceCurrency: 'AUD', price, ...extra })

export const LADDER = [
  {
    '@type': 'Offer',
    name: 'Free AI audit',
    description:
      '45 minutes on how the business runs, then a written page within two business days: what each repetitive job costs a year, and which one to hand to an AI employee first.',
    price: 0,
    priceCurrency: 'AUD',
    url: `${SITE_URL}/pilot`,
  },
  {
    '@type': 'Offer',
    name: 'Your first AI employee',
    description:
      'One AI employee for one job, built and live in 14 days or it is free. $3,500 fixed, credited in full to a bigger build within 60 days.',
    price: 3500,
    priceCurrency: 'AUD',
    url: `${SITE_URL}/pricing`,
  },
  {
    '@type': 'Offer',
    name: 'AI operating system',
    description:
      'The full build: the AI employees and the system they run in, scoped after the audit and quoted as one fixed number.',
    priceSpecification: AUD(25000, { minPrice: 25000 }),
    url: `${SITE_URL}/pricing`,
  },
  {
    '@type': 'Offer',
    name: 'Retainer',
    description: 'Ongoing care and improvement with a monthly report, month to month.',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'AUD',
      price: 1000,
      minPrice: 1000,
      unitText: 'month',
      unitCode: 'MON',
    },
    url: `${SITE_URL}/pricing`,
  },
]

// The root graph, rendered once in the layout.
export function siteGraph(description) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': IDS.business,
        name: 'Herbert AI',
        alternateName: ['Herbert AI Adelaide', 'herbertai'],
        slogan: 'Custom software and AI for small businesses, built in Adelaide.',
        description,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        image: `${SITE_URL}${OG_IMAGE}`,
        telephone: '+61448111840',
        email: 'hello@herbert-aisolutions.com',
        founder: { '@id': IDS.will },
        // The ABN, public on ABN Lookup; Google lists taxID as a way to tell
        // one organisation from others with a similar name (Will, 20 Oct 2026).
        taxID: '83 880 085 162',
        foundingLocation: { '@type': 'Place', name: 'Adelaide, South Australia' },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Adelaide',
          addressRegion: 'SA',
          addressCountry: 'AU',
        },
        geo: { '@type': 'GeoCoordinates', latitude: -34.9285, longitude: 138.6007 },
        areaServed: [
          { '@type': 'City', name: 'Adelaide' },
          { '@type': 'AdministrativeArea', name: 'South Australia' },
          { '@type': 'Country', name: 'Australia' },
        ],
        knowsAbout: [
          'Custom software for small business',
          'AI employees',
          'AI agents for small business',
          'AI for accountants and bookkeepers',
          'AI for real estate and property management',
          'AI for allied health clinics',
          'AI for trades businesses',
          'AI for hospitality venues',
          'AI receptionist',
          'Workflow automation',
          'Business dashboards',
        ],
        priceRange: 'Free audit, then from $3,500',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'The Herbert AI ladder',
          itemListElement: LADDER,
        },
        sameAs: BUSINESS_SAME_AS,
      },
      {
        '@type': 'Person',
        '@id': IDS.will,
        name: 'Will Herbert',
        jobTitle: 'Founder',
        worksFor: { '@id': IDS.business },
        url: `${SITE_URL}/about`,
        homeLocation: { '@type': 'Place', name: 'Adelaide, South Australia' },
        knowsAbout: ['Custom software', 'AI agents', 'Workflow automation', 'Next.js', 'Small business operations'],
        sameAs: WILL_SAME_AS,
      },
      {
        '@type': 'WebSite',
        '@id': IDS.website,
        url: SITE_URL,
        name: 'Herbert AI',
        inLanguage: 'en-AU',
        publisher: { '@id': IDS.business },
      },
    ],
  }
}

// Home > ... > this page. `trail` is [[name, path], ...] after Home.
export function breadcrumbs(trail) {
  const items = [['Home', '/'], ...trail]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${SITE_URL}${path === '/' ? '' : path}`,
    })),
  }
}

// One service the business sells, provided by the business in the root graph.
export function service({ name, description, path, serviceType, audience, offers, area }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    name,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
    provider: { '@id': IDS.business },
    areaServed: area ? { '@type': 'City', name: area } : { '@type': 'Country', name: 'Australia' },
    ...(audience && { audience: { '@type': 'BusinessAudience', audienceType: audience } }),
    ...(offers && { offers }),
  }
}

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
