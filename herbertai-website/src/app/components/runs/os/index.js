import PropertyHub from './property'
import TradesOffice from './trades'
import HospitalityOffice from './hospitality'
import HealthBoard from './health'
import FinanceBoard from './finance'

// The five operating systems for the homepage section (CHARTER.md, "Settled:
// the homepage", section 4). Order and lines from the quantify model,
// product/research/markdown/operating-systems-2026-10-15.md: Property first
// (the one with a build behind it), Trades second (the strongest case on
// paper), Finance last with its line kept to hours. Every line is example
// figures for an example business, said so on the page; no software names
// (Will, 15 Oct 2026). Slugs are the industry pages' current slugs until the
// rename lands.

export const SCREENS = [
  {
    id: 'property', name: 'Property', system: 'An operations hub for a property agency', slug: 'real-estate', built: 'https://dashboard.herbert-aisolutions.com',
    line: 'For an agency of ten with 400 rentals, the system hands back about 17 to 37 hours of office work a week across repairs, late rent, renewals and enquiries, keeps the landlords who would otherwise drift away, and asks a person before anything with money or a notice in it goes out.',
    Visual: PropertyHub,
  },
  {
    id: 'trades', name: 'Trades', system: 'An office system for a trade business', slug: 'trades',
    line: 'At a 10-person air conditioning business, the system answers 25 written quote requests a week within a minute, works 12 install quotes through to a yes or a no, drafts 35 invoices the day each job is done and chases the ones that fall overdue, and books the 17 customers due a service, with every message that names a price waiting for one tap on the owner’s phone.',
    Visual: TradesOffice,
  },
  {
    id: 'hospitality', name: 'Hospitality', system: 'A functions office for a venue', slug: 'hospitality',
    line: 'For a 110-seat restaurant with a private dining room, every function enquiry is answered with open dates and a priced package within a minute of the manager’s tap, deposits and final numbers come in on schedule, last year’s Christmas parties are offered their date in August, and the office gets back about 11 to 15 hours a week and roughly $43,000 to $89,000 a year of kept or won margin.',
    Visual: HospitalityOffice,
  },
  {
    id: 'health', name: 'Health', system: 'A patient board for a clinic', slug: 'allied-health',
    line: 'For a six-practitioner clinic doing about 240 appointments a week, the system fills three to five cancelled slots a week, keeps every funded referral current, brings back about one lapsed patient a week and drafts the week’s ten GP letters for signing, roughly $35,000 to $80,000 a year kept or returned.',
    Visual: HealthBoard,
  },
  {
    id: 'finance', name: 'Finance', system: 'A season board for an accounting practice', slug: 'accountants',
    line: 'For a six-person practice with 600 individual returns and 150 business clients, the season board reads every client reply against last year’s list, asks for what is short, keeps every lodgment date in view and follows up unpaid fees, returning about 420 to 580 staff hours a year, most of them in July to October.',
    Visual: FinanceBoard,
  },
]
