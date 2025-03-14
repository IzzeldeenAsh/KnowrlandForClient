'use client'

import PostItem from "@/app/[locale]/(default)/changelog/post-item"
import { useParams } from 'next/navigation'

export default function TimeLineFeatures() {
  const params = useParams()
  const isRTL = params.locale === 'ar' // adjust based on your RTL locales

  return (
    <section>
      {/* Content */}
      <div className="max-w-6xl mx-auto">
              <div className="relative">
                <div className={`absolute h-full top-4 ${isRTL ? 'right-[2px]' : 'left-[2px]'} w-0.5 bg-slate-800 [mask-image:_linear_gradient(0deg,transparent,theme(colors.white)_150px,theme(colors.white))] -z-10 overflow-hidden after:absolute after:h-4 after:top-0 after:-translate-y-full after:left-0 after:w-0.5 after:bg-[linear-gradient(180deg,_transparent,_theme(colors.blue.500/.65)_25%,_theme(colors.blue.200)_50%,_theme(colors.blue.500/.65)_75%,_transparent)] after:animate-shine`} aria-hidden="true"></div>
                  <PostItem  />
              </div>
            </div>
    </section>
  )
}
