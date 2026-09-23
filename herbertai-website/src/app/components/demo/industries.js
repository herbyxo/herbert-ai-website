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
  brokers: {
    label: 'Mortgage and finance brokers',
    startDate: '2026-08-03',
    hero: {
      h1: 'Loan documents and lender conditions, chased for you.',
      sub: 'Every client gets their own checklist for the application, the reminders go out on their own, and when the lender asks for one more thing the client is asked straight away.',
    },
    appTitle: 'Applications',
    appPeriod: 'August',
    docs: ['Last two payslips', 'Three months of bank statements', 'Photo ID', 'Contract of sale', 'Savings history'],
    clients: [
      { name: 'Ben and Sophie Carter, home loan', total: 5, status: [
        { day: 0, received: 0, label: 'Request sent', tone: 'idle' },
        { day: 2, received: 5, label: 'Ready to submit', tone: 'done' },
      ] },
      { name: 'Daniel and Mia Okafor, purchase', total: 5, focus: true, status: [
        { day: 0, received: 0, label: 'Request sent', tone: 'idle' },
        { day: 2, received: 0, label: 'Reminder sent', tone: 'wait' },
        { day: 3, received: 4, label: '1 still needed', tone: 'wait' },
        { day: 5, received: 5, label: 'With the lender', tone: 'wait' },
        { day: 8, received: 5, label: 'Lender needs a payslip', tone: 'wait' },
        { day: 9, received: 5, label: 'Condition cleared', tone: 'done' },
      ] },
      { name: 'Raj Patel, refinance', total: 4, status: [
        { day: 1, received: 0, label: 'Request sent', tone: 'idle' },
        { day: 4, received: 1, label: 'Reminder sent', tone: 'wait' },
        { day: 8, received: 1, label: 'Reminder sent', tone: 'wait' },
      ] },
      { name: 'Chloe Martin, first home', total: 5, status: [
        { day: 2, received: 0, label: 'Request sent', tone: 'idle' },
        { day: 6, received: 5, label: 'Ready to submit', tone: 'done' },
      ] },
    ],
    // received: which docs (by index) are in at the time of the event
    timeline: [
      { day: 0, kind: 'sent', title: 'Document request sent', detail: 'Their own checklist of five documents and one upload link', received: [],
        email: { subject: 'Documents for your home loan application', intro: 'Hi Daniel and Mia, thanks for asking us to arrange your home loan. Here is everything the lender will need. Upload them with the link below, whenever suits.' } },
      { day: 2, kind: 'sent', title: 'Reminder sent', detail: 'Nothing had come in yet', received: [],
        email: { subject: 'Reminder: documents for your home loan', intro: 'Hi Daniel and Mia, just a reminder that we still need your documents to put the application together. It only takes a few minutes with the link below.' } },
      { day: 3, kind: 'reply', title: 'Mia uploaded 4 files', detail: 'Matched to payslips, bank statements, ID and savings history', received: [0, 1, 2, 4] },
      { day: 4, kind: 'sent', title: 'Asked for the contract of sale', detail: 'Only asks for what is still missing', received: [0, 1, 2, 4],
        email: { subject: 'One document still needed for your home loan', intro: 'Hi Daniel and Mia, thanks for sending those through. We just need the contract of sale to finish the application.' } },
      { day: 5, kind: 'reply', title: 'Contract of sale arrived', detail: 'File complete, application sent to the lender', received: [0, 1, 2, 3, 4] },
      { day: 8, kind: 'reply', title: 'Lender asked for a newer payslip', detail: 'A condition before approval, logged against the file', received: [0, 1, 2, 3, 4] },
      { day: 8, kind: 'sent', title: 'Daniel asked for his latest payslip', detail: 'Sent the moment the condition came in', received: [0, 1, 2, 3, 4],
        email: { checklist: false, subject: 'One more thing the lender needs', intro: 'Hi Daniel, the lender has asked for your most recent payslip before they approve the loan. Upload it with the link below and we will send it straight on.', cta: 'Upload payslip' } },
      { day: 9, kind: 'reply', title: 'Payslip arrived, sent to the lender', detail: 'Condition cleared, nobody rang anyone', received: [0, 1, 2, 3, 4] },
      { day: 9, kind: 'done', title: 'File back with the lender', detail: 'Your broker gets one notification, no chasing done by anyone', received: [0, 1, 2, 3, 4] },
    ],
    example: 'Say {firm} writes 12 loans a month and each one needs two reminders and one lender condition chased. That is 36 chases a month that nobody writes.',
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
}
