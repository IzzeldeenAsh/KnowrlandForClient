'use client'

import { Modal } from '@mantine/core'
import {
  IconArrowUpRight,
  IconBriefcase,
  IconFileDescription,
  IconPencil,
  IconShare,
  IconTrendingUp,
  IconX,
} from '@tabler/icons-react'
import Link from 'next/link'

type BecomeInsighterCardProps = {
  locale: string
  opened: boolean
  onClose: () => void
}

const copyByLocale = {
  en: {
    close: 'Close Become an Insighter card',
    eyebrow: 'Turn expertise into influence',
    title: 'Become an Insighter',
    description:
      'Join the experts shaping better business decisions. Your knowledge deserves a place to travel.',
    benefitsTitle: 'As an Insighter, you can',
    benefits: [
      { icon: IconPencil, text: 'Create posts that showcase your expertise' },
      { icon: IconFileDescription, text: 'Publish insights, white papers, and original knowledge' },
      { icon: IconShare, text: 'Share your expertise with a professional community' },
      { icon: IconBriefcase, text: 'Showcase your services and connect with new clients' },
    ],
    action: 'Become an Insighter',
    note: 'Build your professional presence on Insighta',
  },
  ar: {
    close: 'إغلاق بطاقة الانضمام كخبير',
    eyebrow: 'حوّل خبرتك إلى تأثير',
    title: 'كن خبيراً',
    description: 'انضم إلى الخبراء الذين يصنعون قرارات أعمال أفضل. معرفتك تستحق أن تصل أبعد.',
    benefitsTitle: 'بصفتك خبيراً، يمكنك',
    benefits: [
      { icon: IconPencil, text: 'إنشاء منشورات تُبرز خبرتك' },
      { icon: IconFileDescription, text: 'نشر الرؤى والأوراق البيضاء والمعرفة الأصيلة' },
      { icon: IconShare, text: 'مشاركة خبرتك مع مجتمع مهني' },
      { icon: IconBriefcase, text: 'عرض خدماتك والتواصل مع عملاء جدد' },
    ],
    action: 'كن خبيراً',
    note: 'ابنِ حضورك المهني على إنسايتا',
  },
} as const

export default function BecomeInsighterCard({ locale, opened, onClose }: BecomeInsighterCardProps) {
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const upgradeUrl = `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/app/insighter-register/vertical`

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size={540}
      radius={18}
      zIndex={400}
      withCloseButton={false}
      padding={0}
      aria-labelledby="become-insighter-title"
      overlayProps={{ backgroundOpacity: 0.58, blur: 6 }}
      styles={{
        content: {
          overflow: 'hidden',
          border: '1px solid rgba(170, 204, 240, 0.9)',
          boxShadow: '0 30px 80px rgba(10, 42, 82, 0.28)',
        },
        body: { padding: 0 },
      }}
    >
      <article dir={isArabic ? 'rtl' : 'ltr'} className="relative isolate overflow-hidden bg-white">
        <div className="relative overflow-hidden bg-[#0D3767] px-6 pb-7 pt-6 text-white sm:px-8 sm:pb-8">
          <div
            aria-hidden
            className="absolute -end-12 -top-20 h-52 w-52 rounded-full bg-[#39D3C8]/25 blur-2xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -start-10 h-52 w-52 rounded-full bg-[#2E8FF0]/35 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:18px_18px]"
          />

          <button
            type="button"
            aria-label={copy.close}
            onClick={onClose}
            className="absolute end-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:rotate-6 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <IconX aria-hidden className="h-5 w-5" stroke={1.8} />
          </button>

          <div className="relative pe-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#72E5DD]/35 bg-[#42CFC5]/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9F2ED]">
              <IconTrendingUp aria-hidden className="h-3.5 w-3.5" stroke={2} />
              {copy.eyebrow}
            </span>

            <div className="mt-6">
              <h2 id="become-insighter-title" className="text-[26px] font-bold leading-tight tracking-[-0.035em] sm:text-[30px]">
                {copy.title}
              </h2>
              <p className="mt-2 max-w-md text-[13.5px] leading-6 text-[#D7E8FA] sm:text-[14px]">
                {copy.description}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 pt-5 sm:px-8 sm:pb-8">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#6A7890]">
            {copy.benefitsTitle}
          </h3>
          <ul className="mt-3 grid gap-2.5">
            {copy.benefits.map(({ icon: BenefitIcon, text }) => (
              <li
                key={text}
                className="group flex items-center gap-3 rounded-xl border border-[#E1EAF4] bg-[#F8FBFE] px-3.5 py-3 text-[13.5px] font-medium leading-5 text-[#273B57] transition-colors hover:border-[#BBD8F3] hover:bg-[#F2F8FE]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#1878D4] shadow-[0_3px_10px_rgba(25,91,160,0.10)] ring-1 ring-[#DCE9F5] transition-transform group-hover:-translate-y-0.5">
                  <BenefitIcon aria-hidden className="h-[17px] w-[17px]" stroke={1.9} />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <Link
            href={upgradeUrl}
            className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1675D1] px-5 text-[14px] font-bold text-white shadow-[0_10px_24px_rgba(22,117,209,0.24)] transition hover:-translate-y-0.5 hover:bg-[#0F65B8] hover:shadow-[0_14px_28px_rgba(22,117,209,0.30)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1675D1] focus-visible:ring-offset-2"
          >
            {copy.action}
            <IconArrowUpRight
              aria-hidden
              className={`h-[18px] w-[18px] ${isArabic ? '-scale-x-100' : ''}`}
              stroke={2}
            />
          </Link>
          <p className="mt-3 text-center text-[11.5px] font-medium text-[#8290A5]">{copy.note}</p>
        </div>
      </article>
    </Modal>
  )
}
