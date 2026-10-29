import Link from 'next/link'
import { IconArrowUpRight, IconBriefcase, IconBulb, IconChartBar, IconUsers } from '@tabler/icons-react'
import styles from './FeedRequestServiceCard.module.css'

const SPARKLES = [
  { top: '20%', left: '56%', delay: '0s' },
  { top: '74%', left: '50%', delay: '1.1s' },
  { top: '28%', left: '94%', delay: '2s' },
]

const ORBIT_CHIPS = [
  { Icon: IconBulb, position: 'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2' },
  { Icon: IconChartBar, position: 'bottom-[6%] left-[4%] -translate-x-1/2' },
  { Icon: IconUsers, position: 'bottom-[6%] right-[4%] translate-x-1/2' },
]

// Full-width "Request Service" promo above the feed on phones; tablets and up use the header button.
export default function FeedRequestServiceCard({ locale }: { locale: string }) {
  const isRTL = locale === 'ar'

  return (
    <Link
      href={`/${locale}/project/wizard/project-type?fresh=1`}
      prefetch={false}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${styles.card} ${styles.enter} md:hidden flex items-center gap-3 rounded-lg px-4 py-4 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67B5F6] focus-visible:ring-offset-2`}
    >
      <span aria-hidden className={styles.grid} />
      {SPARKLES.map((sparkle) => (
        <span
          key={`${sparkle.top}-${sparkle.left}`}
          aria-hidden
          className={styles.sparkle}
          style={{ top: sparkle.top, [isRTL ? 'right' : 'left']: sparkle.left, animationDelay: sparkle.delay }}
        />
      ))}

      <div className="relative z-[2] min-w-0 flex-1">
        <h2 className="text-[18px] font-bold leading-tight">
          {isRTL ? 'اطلب خدمة' : 'Request a Service'}
        </h2>
        <p className="mt-0.5 text-[12px] font-medium text-white/75">
          {isRTL ? 'من خبرائنا' : 'From our experts'}
        </p>
        <span className="mt-2.5 inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[12px] font-semibold text-[#2378E8]">
          {isRTL ? 'ابدأ الآن' : 'Start now'}
          <IconArrowUpRight
            aria-hidden
            size={12}
            stroke={2.4}
            className={`${styles.arrow} ${isRTL ? '-scale-x-100' : ''}`}
          />
        </span>
      </div>

      <div aria-hidden className="relative z-[2] h-[88px] w-[88px] shrink-0">
        <div className={`${styles.ring} absolute inset-0 rounded-full`} />
        <div className={`${styles.orbit} absolute inset-0`}>
          {ORBIT_CHIPS.map(({ Icon, position }) => (
            <span key={position} className={`absolute ${position}`}>
              <span className={`${styles.chip} flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white/90 text-[#1D4ED8]`}>
                <Icon size={14} stroke={2} />
              </span>
            </span>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${styles.tile} flex h-11 w-11 items-center justify-center rounded-lg border border-white/40 bg-white/20 backdrop-blur-md`}>
            <IconBriefcase size={22} stroke={1.8} />
          </span>
        </div>
      </div>
    </Link>
  )
}
