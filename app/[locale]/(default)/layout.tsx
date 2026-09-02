'use client'

import { Suspense } from 'react'
import Footer from '@/components/ui/footer'
import { usePathname, useParams } from 'next/navigation'
import InsighterSetupCoverHost from '@/components/onboarding/InsighterSetupCoverHost'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  const pathname = usePathname()
  const params = useParams()
  const locale = typeof params?.locale === 'string' ? params.locale : 'en'
  const isFeedPage = pathname.split('/').filter(Boolean).length === 1

  return (
    <>
      <main className="grow">
        <div className="bg-slate-900 text-slate-100 relative z-0">
          {children}
        </div>
      </main>

      {!isFeedPage && <Footer />}

      {/* Post-login Insighter setup covers, when the redirect landed here. */}
      <Suspense fallback={null}>
        <InsighterSetupCoverHost locale={locale} />
      </Suspense>
    </>
  )
}
