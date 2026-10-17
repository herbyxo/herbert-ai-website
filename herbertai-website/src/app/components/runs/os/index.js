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
// (Will, 15 Oct 2026). `jobs` is what runs by itself, the list's second line
// (Will, 16 Oct 2026: "the industry first, with the what runs by itself
// underneath"). `short` is the line under the screen: the headline figure as
// one sentence, naming the example business it is worked for (Will, 16 Oct
// 2026: "1"). The figures are the quantify model's estimates for a stated
// reference business, not client results, so the sentence names the business
// and carries no tag or "example figures" label (Will, 17 Oct 2026); each
// screen's bar names it an example business. Nothing is a claim of what
// Herbert AI has achieved. `line` is the full sentence, kept for
// the industry pages. Slugs are the industry pages' current slugs until the
// rename lands. `system` is the title under the screen: the product name
// (Will, 16 Oct 2026: "Herbert OS ?", after "would i say, 'you now have a
// Herbert Run', doesnt really sound great"), with the industry; `desc` is the system described, for
// the industry pages. `built` is kept as data for the industry pages and not
// shown on the homepage (Will, 16 Oct 2026: "i dont think we should have the
// built thing for the industry as well, considering i havent actually built
// much, it indicates a weak position").

export const SCREENS = [
  {
    id: 'property', name: 'Property', system: 'Herbert OS for Property', desc: 'An operations hub for a property agency', jobs: 'Repairs, late rent, renewals, enquiries', slug: 'real-estate', built: 'https://dashboard.herbert-aisolutions.com',
    short: 'About 17 to 37 hours of office work a week back, for an agency of ten with 400 rentals.',
    line: 'For an agency of ten with 400 rentals, the system hands back about 17 to 37 hours of office work a week across repairs, late rent, renewals and enquiries, keeps the landlords who would otherwise drift away, and asks a person before anything with money or a notice in it goes out.',
    Visual: PropertyHub,
  },
  {
    id: 'trades', name: 'Trades', system: 'Herbert OS for Trades', desc: 'An office system for a trade business', jobs: 'Quotes, bookings, invoices, chasing', slug: 'trades',
    short: 'Every quote request answered within a minute and 35 invoices a week out the day the job is done, for a 10-person air conditioning business.',
    line: 'At a 10-person air conditioning business, the system answers 25 written quote requests a week within a minute, works 12 install quotes through to a yes or a no, drafts 35 invoices the day each job is done and chases the ones that fall overdue, and books the 17 customers due a service, with every message that names a price waiting for one tap on the owner’s phone.',
    Visual: TradesOffice,
  },
  {
    id: 'hospitality', name: 'Hospitality', system: 'Herbert OS for Hospitality', desc: 'A functions office for a venue', jobs: 'Functions, deposits, rebookings', slug: 'hospitality',
    short: 'About 11 to 15 hours a week back and roughly $43,000 to $89,000 a year of margin kept or won, for a 110-seat restaurant with a private dining room.',
    line: 'For a 110-seat restaurant with a private dining room, every function enquiry is answered with open dates and a priced package within a minute of the manager’s tap, deposits and final numbers come in on schedule, last year’s Christmas parties are offered their date in August, and the office gets back about 11 to 15 hours a week and roughly $43,000 to $89,000 a year of kept or won margin.',
    Visual: HospitalityOffice,
  },
  {
    id: 'health', name: 'Health', system: 'Herbert OS for Health', desc: 'A patient board for a clinic', jobs: 'Cancellations, referrals, recalls, letters', slug: 'allied-health',
    short: 'Three to five cancelled slots filled a week and roughly $35,000 to $80,000 a year kept or returned, for a six-practitioner clinic.',
    line: 'For a six-practitioner clinic doing about 240 appointments a week, the system fills three to five cancelled slots a week, keeps every funded referral current, brings back about one lapsed patient a week and drafts the week’s ten GP letters for signing, roughly $35,000 to $80,000 a year kept or returned.',
    Visual: HealthBoard,
  },
  {
    id: 'finance', name: 'Finance', system: 'Herbert OS for Finance', desc: 'A season board for an accounting practice', jobs: 'Client replies, requests, lodgments, debtors', slug: 'accountants',
    short: 'About 420 to 580 staff hours a year back, most of them in tax season, for a six-person practice with 600 returns.',
    line: 'For a six-person practice with 600 individual returns and 150 business clients, the season board reads every client reply against last year’s list, asks for what is short, keeps every lodgment date in view and follows up unpaid fees, returning about 420 to 580 staff hours a year, most of them in July to October.',
    Visual: FinanceBoard,
  },
]
