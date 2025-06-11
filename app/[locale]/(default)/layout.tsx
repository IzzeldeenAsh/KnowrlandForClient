'use client'

import Footer from '@/components/ui/footer'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  

  return (
    <>
      <main className="grow">
        <div className="bg-slate-900 text-slate-100 relative z-0">
          {children}
        </div>
      </main>

      <Footer />
    </>
  )
}
