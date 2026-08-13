'use client'

import Footer from '@/components/ui/footer'
import { usePathname } from 'next/navigation'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  const pathname = usePathname()
  const isFeedPage = pathname.split('/').filter(Boolean).length === 1

  return (
    <>
      <main className="grow">
        <div className="bg-slate-900 text-slate-100 relative z-0">
          {children}
        </div>
      </main>

      {!isFeedPage && <Footer />}
    </>
  )
}
