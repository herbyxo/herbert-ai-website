import { Instrument_Serif } from 'next/font/google'

// The site loads Instrument Serif in italic only (one emphasis word per page).
// The serif references in the lab use a roman cut, so the lab loads that here.
const labSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal'],
  variable: '--font-lab-serif',
  display: 'swap',
})

export default function LabLayout({ children }) {
  return <div className={labSerif.variable}>{children}</div>
}
