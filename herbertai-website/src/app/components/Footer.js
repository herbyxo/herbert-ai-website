'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const managerUrl = process.env.NEXT_PUBLIC_MANAGER_DASHBOARD_URL
const ownerUrl = process.env.NEXT_PUBLIC_OWNER_CONSOLE_URL

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/preview')) return null

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 text-center px-4">
      <p className="text-gray-600">© {new Date().getFullYear()} Herbert AI. All rights reserved.</p>
      {(managerUrl || ownerUrl) && (
        <p className="text-sm text-gray-500 mt-3">
          {managerUrl && (
            <Link href={managerUrl} className="hover:text-gray-800 underline-offset-2 hover:underline">
              Manager portal
            </Link>
          )}
          {managerUrl && ownerUrl && <span className="text-gray-400"> · </span>}
          {ownerUrl && (
            <Link href={ownerUrl} className="hover:text-gray-800 underline-offset-2 hover:underline">
              Owner console
            </Link>
          )}
        </p>
      )}
    </footer>
  )
}