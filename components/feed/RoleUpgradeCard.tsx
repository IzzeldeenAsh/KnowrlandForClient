'use client'

import { IconArrowRight, IconSparkles } from '@tabler/icons-react'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'

type RoleUpgradeCardProps = {
  locale: string
}

const copyByLocale = {
  en: {
    insighter: {
      eyebrow: 'For Insighters',
      title: 'Grow as a company',
      description: 'Bring your team, services, and expertise together under one trusted company profile.',
      action: 'Upgrade to Company',
    },
    client: {
      eyebrow: 'Share your expertise',
      title: 'Become an Insighter',
      description: 'Publish knowledge, offer your services, and build a professional presence on Insighta.',
      action: 'Become an Insighter',
    },
  },
  ar: {
    insighter: {
      eyebrow: 'للخبراء',
      title: 'نمِّ حضورك كشركة',
      description: 'اجمع فريقك وخدماتك وخبراتك ضمن صفحة شركة موثوقة ومتكاملة.',
      action: 'الترقية إلى شركة',
    },
    client: {
      eyebrow: 'شارك خبرتك',
      title: 'كن خبيراً',
      description: 'انشر معرفتك، وقدّم خدماتك، وابنِ حضورك المهني على إنسايتا.',
      action: 'كن خبيراً',
    },
  },
} as const

export default function RoleUpgradeCard({ locale }: RoleUpgradeCardProps) {
  const isArabic = locale === 'ar'
  const { user, roles, isAuthResolved } = useUserProfile()

  if (!isAuthResolved || !user) return null

  const hasCompanyRole = roles.some((role) => ['company', 'company-insighter'].includes(role))
  const isInsighterOnly = roles.includes('insighter') && !hasCompanyRole
  const isClientOnly =
    roles.includes('client') &&
    !roles.some((role) => ['insighter', 'company', 'company-insighter'].includes(role))

  if (!isInsighterOnly && !isClientOnly) return null

  const variant = isInsighterOnly ? 'insighter' : 'client'
  const copy = copyByLocale[isArabic ? 'ar' : 'en'][variant]

  return (
    <section
      aria-labelledby={`role-upgrade-${variant}-title`}
      className={`relative isolate overflow-hidden rounded-lg border p-5 ${
        isInsighterOnly
          ? 'border-[#B8DBE4] bg-[#E9F8F3] bg-cover bg-center'
          : 'border-[#BFD8F7] bg-gradient-to-br from-[#EAF3FF] via-white to-[#E7FAF8]'
      }`}
      style={
        isInsighterOnly
          ? {
              backgroundImage:
                "url('https://res.cloudinary.com/dsiku9ipv/image/upload/v1785500121/3440_gzhz0h.jpg')",
            }
          : undefined
      }
    >
      {!isInsighterOnly && (
        <>
          <div
            aria-hidden
            className="absolute -end-9 -top-10 -z-10 h-28 w-28 rounded-full bg-[#56D3D8]/20 blur-sm"
          />
          <div
            aria-hidden
            className="absolute -bottom-12 -start-8 -z-10 h-28 w-28 rounded-full bg-[#2378E8]/10"
          />
        </>
      )}

      <div className="flex items-center justify-between gap-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] backdrop-blur-sm ${
          isInsighterOnly
            ? 'border-white/70 bg-white/55 text-[#245578]'
            : 'border-[#BCD7F6] bg-white/75 text-[#1D67BC]'
        }`}>
          <IconSparkles aria-hidden className="h-3.5 w-3.5" stroke={1.9} />
          {copy.eyebrow}
        </span>
      </div>

      <h2
        id={`role-upgrade-${variant}-title`}
        className={`mt-5 text-[19px] font-semibold leading-6 tracking-[-0.02em] ${
          isInsighterOnly ? 'text-[#123653]' : 'text-[#10233F]'
        }`}
      >
        {copy.title}
      </h2>
      <p className={`mt-2 text-[13px] leading-5 ${
        isInsighterOnly ? 'text-[#47677D]' : 'text-[#566A86]'
      }`}>
        {copy.description}
      </p>

      <button
        type="button"
        className={`mt-5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md px-4 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          isInsighterOnly
            ? 'bg-[#176FD1] text-white hover:bg-[#105EBA] focus-visible:ring-[#176FD1]'
            : 'bg-[#176FD1] text-white hover:bg-[#105EBA] focus-visible:ring-[#176FD1]'
        }`}
      >
        {copy.action}
        <IconArrowRight
          aria-hidden
          className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`}
          stroke={1.9}
        />
      </button>
    </section>
  )
}
