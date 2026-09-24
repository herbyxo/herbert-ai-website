// Bottleneck Pilot demo content, one entry per industry. Every name here is made
// up. The workflow pattern is the automated document chase from real builds, but
// no client's branding, names or wording appears. The prospect's own business
// name is dropped in at render time from the ?for= query.
//
// Day 0 is the first day of the timeline. A client's row status comes from the
// last of its `status` events on or before the current day, and the focus
// client's `timeline` drives the event list, the email cards and the checklist.
// Plain data only (no functions): this object crosses from the server page to a
// client component. {firm} in a string is replaced with the business name.

export const INDUSTRIES = {
  accountants: {
    label: 'Accountants',
    startDate: '2026-07-01',
    hero: {
      h1: 'Tax time documents, chased without anyone chasing.',
      sub: 'Every client gets their own checklist, the reminders go out on their own, and your team only steps in once a file is complete.',
    },
    appTitle: 'Client documents',
    appPeriod: 'Tax season 2026',
    docs: ['Payslips', 'Bank interest', 'Rental property statement', 'Private health statement', 'Donation receipts'],
    clients: [
      { name: 'Sarah Chen', total: 5, status: [
        { day: 0, received: 0, label: 'Request sent', tone: 'idle' },
        { day: 2, received: 5, label: 'Ready to lodge', tone: 'done' },
      ] },
      { name: 'Tom and Priya Walsh', total: 5, focus: true, status: [
        { day: 0, received: 0, label: 'Request sent', tone: 'idle' },
        { day: 3, received: 0, label: 'Reminder sent', tone: 'wait' },
        { day: 4, received: 3, label: '2 still needed', tone: 'wait' },
        { day: 7, received: 3, label: 'Reminder sent', tone: 'wait' },
        { day: 8, received: 5, label: 'Ready to lodge', tone: 'done' },
      ] },
      { name: 'Marco Rossi', total: 4, status: [
        { day: 1, received: 0, label: 'Request sent', tone: 'idle' },
        { day: 4, received: 1, label: 'Reminder sent', tone: 'wait' },
        { day: 8, received: 1, label: 'Reminder sent', tone: 'wait' },
      ] },
      { name: 'Jess Nguyen', total: 3, status: [
        { day: 2, received: 0, label: 'Request sent', tone: 'idle' },
        { day: 6, received: 3, label: 'Ready to lodge', tone: 'done' },
      ] },
    ],
    // received: which docs (by index) are in at the time of the event
    timeline: [
      { day: 0, kind: 'sent', title: 'Document request sent', detail: 'Their own checklist of five documents and one upload link', received: [],
        email: { subject: 'Documents for your 2026 tax return', intro: 'Hi Tom and Priya, it is tax time again. Here is everything we need to get your return done. Upload them with the link below, whenever suits.' } },
      { day: 3, kind: 'sent', title: 'Reminder sent', detail: 'Nothing had come in yet', received: [],
        email: { subject: 'Reminder: documents for your 2026 return', intro: 'Hi Tom and Priya, just a reminder that we still need your documents to start your return. It only takes a few minutes with the link below.' } },
      { day: 4, kind: 'reply', title: 'Priya uploaded 3 files', detail: 'Matched to payslips, bank interest and donation receipts', received: [0, 1, 4] },
      { day: 7, kind: 'sent', title: 'Reminder for the last 2 documents', detail: 'Only asks for what is still missing', received: [0, 1, 4],
        email: { subject: '2 documents still needed for your 2026 return', intro: 'Hi Tom and Priya, thanks for sending those through. We just need two more to get started.' } },
      { day: 8, kind: 'reply', title: 'Last 2 documents arrived', detail: 'Rental statement and private health statement', received: [0, 1, 2, 3, 4] },
      { day: 8, kind: 'done', title: 'File marked ready to lodge', detail: 'Your team gets one notification, no chasing done by anyone', received: [0, 1, 2, 3, 4] },
    ],
    example: 'Say {firm} has 150 clients and half of them need two reminders. That is 150 chase emails a season that nobody writes.',
    bottleneck: 'document chasing',
  },
  'allied-health': {
    label: 'Allied health',
    startDate: '2026-08-03',
    hero: {
      h1: 'New patient paperwork, done before they walk in.',
      sub: 'Every new patient gets their own intake link, the referral gets chased from the GP, and the front desk only steps in once the file is complete.',
    },
    appTitle: 'New patients',
    appPeriod: 'This fortnight',
    docs: ['Intake form', 'Consent form', 'GP referral', 'Medicare and fund details'],
    clients: [
      { name: 'Liam Foster', total: 4, status: [
        { day: 0, received: 0, label: 'Intake link sent', tone: 'idle' },
        { day: 1, received: 4, label: 'Ready for first visit', tone: 'done' },
      ] },
      { name: 'Grace Ahmadi', total: 4, focus: true, status: [
        { day: 0, received: 0, label: 'Intake link sent', tone: 'idle' },
        { day: 2, received: 0, label: 'Reminder sent', tone: 'wait' },
        { day: 2, received: 3, label: 'Referral still needed', tone: 'wait' },
        { day: 3, received: 3, label: 'GP asked for referral', tone: 'wait' },
        { day: 4, received: 4, label: 'Ready for first visit', tone: 'done' },
      ] },
      { name: 'Noah Petrakis', total: 4, status: [
        { day: 1, received: 0, label: 'Intake link sent', tone: 'idle' },
        { day: 3, received: 2, label: 'Reminder sent', tone: 'wait' },
        { day: 4, received: 2, label: 'Reminder sent', tone: 'wait' },
      ] },
      { name: 'Ella Munro', total: 3, status: [
        { day: 2, received: 0, label: 'Intake link sent', tone: 'idle' },
        { day: 4, received: 3, label: 'Ready for first visit', tone: 'done' },
      ] },
    ],
    timeline: [
      { day: 0, kind: 'sent', title: 'Intake link sent', detail: 'Booked for Tuesday 11 August, her own checklist of four things and one link', received: [],
        email: { subject: 'Before your first appointment at {firm}', intro: 'Hi Grace, thanks for booking with us. Before Tuesday we need a few things so your first visit is all treatment and no paperwork. They take about five minutes with the link below.' } },
      { day: 2, kind: 'sent', title: 'Reminder sent', detail: 'Nothing had come in yet', received: [],
        email: { subject: 'Reminder: a few things before Tuesday', intro: 'Hi Grace, a quick reminder that we still need your intake and consent forms before your appointment on Tuesday. Five minutes with the link below.' } },
      { day: 2, kind: 'reply', title: 'Grace completed 3 of 4', detail: 'Intake, consent and Medicare details, no referral attached', received: [0, 1, 3] },
      { day: 3, kind: 'sent', title: 'Referral requested from her GP', detail: 'Sent to the practice she named on the intake form', received: [0, 1, 3],
        email: { to: 'Dr Anika Rao, Hutt Street Medical', checklist: false, subject: 'Referral request for Grace Ahmadi', intro: 'Hi Dr Rao, Grace Ahmadi has booked her first appointment with us on Tuesday 11 August and has named you as her referring GP. Could you send her referral through with the link below, or by reply to this email.', cta: 'Send referral' } },
      { day: 4, kind: 'reply', title: 'Referral arrived from Dr Rao', detail: 'Matched to the file, nobody had to ring the practice', received: [0, 1, 2, 3] },
      { day: 4, kind: 'done', title: 'File marked ready for first visit', detail: 'The front desk gets one notification, nothing chased by hand', received: [0, 1, 2, 3] },
    ],
    example: 'Say {firm} sees 30 new patients a month and the front desk chases two things for each of them. That is 60 chases a month that nobody does by hand.',
    bottleneck: 'intake and referral chasing',
  },
  trades: {
    label: 'Trades',
    startDate: '2026-08-03',
    hero: {
      h1: 'Quotes followed up, without anyone remembering to.',
      sub: 'Every quote that goes out gets followed up on a schedule, replies land with your office, and the ones that go quiet get one more nudge before they are closed.',
    },
    appTitle: 'Open quotes',
    appPeriod: 'August',
    clients: [
      { name: 'Dan Kowalski, switchboard upgrade', sub: '$3,850 quoted', status: [
        { day: 0, label: 'Quote sent', tone: 'idle' },
        { day: 2, label: 'Accepted', tone: 'done' },
      ] },
      { name: 'Mel and Josh Byrne, split system', sub: '$2,900 quoted', focus: true, status: [
        { day: 0, label: 'Quote sent', tone: 'idle' },
        { day: 3, label: 'Follow-up sent', tone: 'wait' },
        { day: 4, label: 'Asked about a second unit', tone: 'wait' },
        { day: 7, label: 'Revised quote sent', tone: 'wait', note: '$5,100 quoted' },
        { day: 9, label: 'Accepted, job booked', tone: 'done', note: '$5,100 quoted' },
      ] },
      { name: 'Priya Nair, hot water replacement', sub: '$1,650 quoted', status: [
        { day: 1, label: 'Quote sent', tone: 'idle' },
        { day: 4, label: 'Follow-up sent', tone: 'wait' },
        { day: 8, label: 'Second follow-up sent', tone: 'wait' },
      ] },
      { name: 'Oak Street Cafe, kitchen circuits', sub: '$7,200 quoted', status: [
        { day: 2, label: 'Quote sent', tone: 'idle' },
        { day: 7, label: 'Follow-up sent', tone: 'wait' },
        { day: 9, label: 'Declined', tone: 'idle' },
      ] },
    ],
    timeline: [
      { day: 0, kind: 'sent', title: 'Quote sent', detail: 'The price, what is included, and one button to accept',
        email: { to: 'Mel and Josh Byrne', subject: 'Your quote from {firm}: split system, living room', intro: 'Hi Mel and Josh, thanks for having us out on Monday. Your quote is attached: one 7kW split system supplied and installed, $2,900 including GST, valid for 30 days. Accept below and we will book you in.', cta: 'Accept quote' } },
      { day: 3, kind: 'sent', title: 'Follow-up sent', detail: 'No reply after three days, so one question rather than a nudge',
        email: { to: 'Mel and Josh Byrne', subject: 'Any questions on the quote?', intro: 'Hi Mel and Josh, just checking you got the quote for the split system. If anything on it is unclear, reply here and the office will sort it out. If you are ready, the button below books you in.', cta: 'Accept quote' } },
      { day: 4, kind: 'reply', title: 'Mel asked about a second unit', detail: 'Her reply landed with your office and the follow-ups paused' },
      { day: 7, kind: 'sent', title: 'Revised quote sent', detail: 'Your office changed the price, the system sent it and restarted the follow-ups',
        email: { to: 'Mel and Josh Byrne', subject: 'Revised quote: two split systems', intro: 'Hi Mel and Josh, here is the updated quote with a second unit for the main bedroom: two 7kW split systems supplied and installed, $5,100 including GST. Same 30 days, same button.', cta: 'Accept quote' } },
      { day: 9, kind: 'reply', title: 'Quote accepted', detail: 'Both units, install booked for Thursday 20 August' },
      { day: 9, kind: 'done', title: 'Job booked, deposit invoice sent', detail: 'Your office gets one notification, nobody chased anyone' },
    ],
    example: 'Say {firm} sends 40 quotes a month and a third of them go quiet. That is 13 jobs a month that nobody followed up.',
    bottleneck: 'quote follow-up',
  },
  'real-estate': {
    label: 'Real estate',
    startDate: '2026-08-03',
    hero: {
      h1: 'Maintenance handled, without the phone tennis.',
      sub: 'A tenant reports a problem once. The landlord approves it, the tradie gets the job, the tenant gets the time, and your property manager only steps in when someone needs a decision.',
    },
    appTitle: 'Maintenance',
    appPeriod: 'This week',
    clients: [
      { name: '12 Elm St, Norwood', sub: 'Hot water not working', status: [
        { day: 0, label: 'Plumber booked', tone: 'wait' },
        { day: 1, label: 'Done', tone: 'done' },
      ] },
      { name: '4/18 Rose Tce, Kent Town', sub: 'Leaking kitchen tap', focus: true, status: [
        { day: 0, label: 'Awaiting landlord', tone: 'wait' },
        { day: 1, label: 'Plumber has the job', tone: 'wait' },
        { day: 2, label: 'Thursday 9am', tone: 'wait' },
        { day: 4, label: 'Done, invoice filed', tone: 'done' },
      ] },
      { name: '27 Beulah Rd, Norwood', sub: 'Garage door remote', status: [
        { day: 1, label: 'Awaiting landlord', tone: 'wait' },
        { day: 3, label: 'Landlord reminded', tone: 'wait' },
      ] },
      { name: '9 Sydenham Rd, Norwood', sub: 'Smoke alarm beeping', status: [
        { day: 2, label: 'Electrician booked', tone: 'wait' },
        { day: 3, label: 'Done', tone: 'done' },
      ] },
    ],
    timeline: [
      { day: 0, kind: 'reply', title: 'Aisha reported a leaking kitchen tap', detail: 'Two photos attached, access any weekday after 8am' },
      { day: 0, kind: 'sent', title: 'Landlord asked to approve', detail: 'One email, one button, a cap on the cost',
        email: { to: 'Peter Lindqvist, landlord', subject: 'Approval needed: leaking tap at 4/18 Rose Tce', intro: 'Hi Peter, your tenant Aisha has reported a leaking kitchen tap at 4/18 Rose Terrace. Photos are attached. We recommend sending a plumber, expected cost up to $250. Approve below and we will book it in.', cta: 'Approve up to $250' } },
      { day: 1, kind: 'reply', title: 'Peter approved, up to $250', detail: 'No phone call, no chasing' },
      { day: 1, kind: 'sent', title: 'Job sent to the plumber', detail: 'The address, the fault, the photos and the access notes from the tenant',
        email: { to: 'Bay Plumbing', subject: 'Job: leaking kitchen tap, 4/18 Rose Tce Kent Town', intro: 'Hi Bay Plumbing, a job for you from {firm}. Leaking kitchen tap at 4/18 Rose Terrace, Kent Town, approved up to $250. Tenant is Aisha Rahman, access any weekday after 8am, photos attached. Pick a time below and the tenant gets told.', cta: 'Confirm a time' } },
      { day: 2, kind: 'reply', title: 'Bay Plumbing booked Thursday 9am', detail: 'Picked from the access window the tenant gave' },
      { day: 2, kind: 'sent', title: 'Tenant told the time', detail: 'Sent the moment the plumber confirmed',
        email: { to: 'Aisha Rahman, tenant', subject: 'Plumber booked for Thursday 9am', intro: 'Hi Aisha, Bay Plumbing will be at 4/18 Rose Terrace on Thursday 6 August at 9am to fix the kitchen tap. Reply here if that time no longer works and we will rebook.' } },
      { day: 4, kind: 'reply', title: 'Job done, invoice received', detail: '$185, under the approved cap' },
      { day: 4, kind: 'done', title: 'Landlord updated, invoice filed', detail: 'Your property manager gets one notification, nobody passed a message along' },
    ],
    example: 'Say {firm} manages 300 properties and gets 40 maintenance requests a month, each one five messages between tenant, landlord and tradie. That is 200 messages a month that nobody types.',
    bottleneck: 'maintenance coordination',
  },
  venues: {
    label: 'Wedding and function venues',
    startDate: '2026-10-03',
    hero: {
      h1: 'Every enquiry answered with dates and packages, in a minute.',
      sub: 'A couple asks about a date. The events coordinator checks the calendar, sends the packages that fit with prices, answers the usual questions and books the site visit, and your events team steps in for the tour.',
    },
    appTitle: 'Enquiries',
    appPeriod: 'This week',
    clients: [
      { name: 'Emma and Josh, Saturday 17 April 2027', sub: '120 guests', status: [
        { day: 0, label: 'Packages sent', tone: 'wait' },
        { day: 1, label: 'Site visit booked', tone: 'wait' },
        { day: 6, label: 'Booked, deposit paid', tone: 'done' },
      ] },
      { name: 'Priya and Sam, Saturday 6 March 2027', sub: 'About 150 guests, ceremony on site', focus: true, status: [
        { day: 0, label: 'Replied in 1 minute', tone: 'wait' },
        { day: 1, label: 'Menus answered', tone: 'wait' },
        { day: 2, label: 'Site visit Sunday 11am', tone: 'wait' },
        { day: 8, label: 'Contract sent', tone: 'wait' },
        { day: 9, label: 'Booked, deposit paid', tone: 'done' },
      ] },
      { name: 'Harbour Accounting, end of year party', sub: '80 guests, cocktail style', status: [
        { day: 1, label: 'Packages sent', tone: 'wait' },
        { day: 4, label: 'Follow-up sent', tone: 'wait' },
        { day: 5, label: 'Asked for a quote on 90', tone: 'wait' },
      ] },
      { name: 'Mia and Tom, Saturday 13 March 2027', sub: '160 guests', status: [
        { day: 2, label: 'Date taken, Friday offered', tone: 'wait' },
        { day: 3, label: 'Site visit booked', tone: 'wait' },
      ] },
    ],
    timeline: [
      { day: 0, kind: 'reply', title: 'Priya enquired at 9.12pm on Saturday', detail: 'Saturday 6 March 2027, about 150 guests, ceremony and reception' },
      { day: 0, kind: 'sent', title: 'Replied in 1 minute with the date and packages', detail: 'The date is open, the two packages that fit 150 guests with prices per head, one question',
        email: { to: 'Priya and Sam', subject: 'Saturday 6 March 2027 at {firm}', intro: 'Hi Priya and Sam, congratulations on your engagement. Saturday 6 March 2027 is available. For around 150 guests with the ceremony on site, our Garden and Grand packages fit best, and both are attached with prices per head. Would you like to come and see the space?', cta: 'Book a site visit' } },
      { day: 1, kind: 'reply', title: 'Sam asked about vegetarian and gluten free menus', detail: 'Answered from your menus in the same thread' },
      { day: 1, kind: 'sent', title: 'Menus answered, two visit times offered', detail: 'Only times your events manager has free',
        email: { to: 'Sam', subject: 're: Saturday 6 March 2027 at {firm}', intro: 'Hi Sam, both packages cater for vegetarian and gluten free guests, and the menus are attached with those dishes marked. For a site visit we have Saturday at 2pm or Sunday at 11am. Which suits you better?', cta: 'Pick a time' } },
      { day: 2, kind: 'reply', title: 'Site visit booked for Sunday 11am', detail: 'In your calendar, with a brief for your events manager' },
      { day: 8, kind: 'sent', title: 'Contract and deposit link sent after the tour', detail: 'Your events manager ran the tour and said yes to the date',
        email: { to: 'Priya and Sam', subject: 'Your date at {firm}', intro: 'Hi Priya and Sam, it was lovely to show you around on Sunday. Your date is held for seven days. The contract and deposit link are below whenever you are ready.', cta: 'Confirm the date' } },
      { day: 9, kind: 'reply', title: 'Deposit paid', detail: 'Saturday 6 March 2027 is booked' },
      { day: 9, kind: 'done', title: 'Wedding booked', detail: 'Your team did the tour, everything around it happened on its own' },
    ],
    example: 'Say {firm} gets 40 enquiries a month and most are answered the next working day. A couple who enquires on a Saturday night has often written to several venues, and the first one to send dates and prices is the first one they visit.',
    bottleneck: 'enquiry handling',
  },
  'air-conditioning': {
    label: 'Air conditioning',
    startDate: '2026-10-12',
    hero: {
      h1: 'Every quote request answered, booked and followed through.',
      sub: 'A homeowner asks for a quote at night. The sales coordinator replies in a minute, asks what your office would ask, books the measure and quote, and answers their questions about the quote until it is a yes or a no.',
    },
    appTitle: 'Quote requests',
    appPeriod: 'October',
    clients: [
      { name: 'Lena Park, ducted, four bedrooms', sub: 'Measure booked', status: [
        { day: 0, label: 'Replied in 1 minute', tone: 'wait' },
        { day: 1, label: 'Measure booked', tone: 'wait' },
        { day: 4, label: 'Quote sent', tone: 'wait' },
      ] },
      { name: 'Dave and Kerry Walsh, ducted, double storey', sub: 'Quote requested', focus: true, status: [
        { day: 0, label: 'Measure booked Thursday 4pm', tone: 'wait' },
        { day: 3, label: 'Quote sent', tone: 'wait', note: '$14,800 quoted' },
        { day: 5, label: 'Question answered', tone: 'wait', note: '$14,800 quoted' },
        { day: 6, label: 'Accepted, install booked', tone: 'done', note: '$14,800 quoted' },
      ] },
      { name: 'Tom Nguyen, two split systems', sub: '$4,200 quoted', status: [
        { day: 1, label: 'Quote sent', tone: 'wait' },
        { day: 4, label: 'Asked about finance', tone: 'wait' },
        { day: 5, label: 'Accepted', tone: 'done' },
      ] },
      { name: 'Hills Physio, office split system', sub: 'Measure booked', status: [
        { day: 2, label: 'Replied in 1 minute', tone: 'wait' },
        { day: 3, label: 'Measure booked', tone: 'wait' },
      ] },
    ],
    timeline: [
      { day: 0, kind: 'reply', title: 'Kerry asked for a ducted quote at 8.40pm', detail: 'Double storey, four bedrooms, the old system is 20 years old' },
      { day: 0, kind: 'sent', title: 'Replied in 1 minute with three questions', detail: 'The questions your office asks before a measure',
        email: { to: 'Kerry Walsh', subject: 'Your ducted air conditioning quote', intro: 'Hi Kerry, thanks for getting in touch with {firm}. Three quick questions so the quote is right: is the roof tiled or metal, is there room in the ceiling above the upstairs rooms, and are you hoping to have it in before Christmas?' } },
      { day: 0, kind: 'reply', title: 'Kerry answered all three', detail: 'Tiled roof, good ceiling space, before Christmas' },
      { day: 0, kind: 'sent', title: 'Measure and quote booked for Thursday 4pm', detail: 'Picked from your estimator’s free times',
        email: { to: 'Kerry Walsh', subject: 'Measure and quote booked: Thursday 4pm', intro: 'Hi Kerry, our estimator will be at your place on Thursday 15 October at 4pm to measure up and talk through options. It takes about 45 minutes. Reply here if that time no longer works.', cta: 'Change the time' } },
      { day: 3, kind: 'sent', title: 'Quote sent by your office', detail: 'Ducted system for both floors, old unit removed, $14,800 installed',
        email: { to: 'Dave and Kerry Walsh', subject: 'Your quote from {firm}', intro: 'Hi Dave and Kerry, thanks for having us out on Thursday. Your quote is attached: a ducted system for both floors, installed, $14,800 including GST. Accept below and we will book the install.', cta: 'Accept quote' } },
      { day: 5, kind: 'reply', title: 'Dave asked if taking out the old unit is included', detail: 'The question came in at 9pm' },
      { day: 5, kind: 'sent', title: 'Answered from the quote, and asked for a decision', detail: 'Only answers what the quote already says; anything else goes to your office',
        email: { to: 'Dave Walsh', subject: 're: Your quote from {firm}', intro: 'Hi Dave, yes, removing and disposing of the old unit is included in the $14,800. We have an install date on Monday 9 November if that suits you.', cta: 'Accept quote' } },
      { day: 6, kind: 'reply', title: 'Quote accepted', detail: 'Install booked for Monday 9 November' },
      { day: 6, kind: 'done', title: 'Job handed to your office', detail: 'Your office confirms the install, nobody chased anyone' },
    ],
    example: 'Say {firm} gets 60 quote requests a month over summer and most are answered the next morning. The homeowner who hears back within a minute is usually the one whose measure and quote gets booked first.',
    bottleneck: 'quote requests',
  },
}
