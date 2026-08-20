'use client'

import { IconArrowRight, IconGift } from '@tabler/icons-react'
import { dashboardUrl } from '@/app/config'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'

type RoleUpgradeCardProps = {
  locale: string
  className?: string
}

type RoleUpgradeCopy = {
  eyebrow: string
  title: string
  benefits?: readonly string[]
  action: string
}

const copyByLocale: Record<'en' | 'ar', Record<'insighter' | 'client', RoleUpgradeCopy>> = {
  en: {
    insighter: {
      eyebrow: 'Upgrade for free',
      title: 'Grow as a company',
      benefits: [
        'Create a trusted company profile',
        'Add and manage your team with centralized publishing control',
        'Strengthen your digital presence and promote your services',
      ],
      action: 'Upgrade to Company',
    },
    client: {
      eyebrow: 'Share your expertise',
      title: 'Become an Insighter',
      benefits: [
        'Create posts that showcase your expertise',
        'Publish insights and original knowledge',
        'Share your expertise and promote your services',
      ],
      action: 'Become an Insighter',
    },
  },
  ar: {
    insighter: {
      eyebrow: 'الترقية مجانًا',
      title: 'نمِّ حضورك كشركة',
      benefits: [
        'أنشئ ملفًا موثوقًا لشركتك',
        'أضف فريقك وأدره مع التحكم المركزي بالنشر',
        'عزّز حضورك الرقمي وروّج لخدماتك',
      ],
      action: 'الترقية إلى شركة',
    },
    client: {
      eyebrow: 'شارك خبرتك',
      title: 'كن خبيراً',
      benefits: [
        'إنشاء منشورات تُبرز خبرتك',
        'نشر الرؤى والمعرفة الأصيلة',
        'مشاركة خبرتك والترويج لخدماتك',
      ],
      action: 'كن خبيراً',
    },
  },
} as const

export default function RoleUpgradeCard({ locale, className }: RoleUpgradeCardProps) {
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
  const insighterRegistrationUrl = `${dashboardUrl}/app/insighter-register/vertical`
  const actionClassName = 'mt-5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-[#176FD1] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#105EBA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176FD1] focus-visible:ring-offset-2'

  return (
    <section
      aria-labelledby={`role-upgrade-${variant}-title`}
      className={`relative isolate overflow-hidden rounded-lg border p-5 ${
        isInsighterOnly
          ? 'border-[#B8DBE4] bg-[#E9F8F3] bg-cover bg-center'
          : 'border-[#BFD8F7] bg-gradient-to-br from-[#EAF3FF] via-white to-[#E7FAF8]'
      }${className ? ` ${className}` : ''}`}
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
            <IconGift aria-hidden className="h-3.5 w-3.5" stroke={1.9} />
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
      <ul
        className={`mt-3 list-disc space-y-1.5 ps-4 text-[13px] leading-5 ${
          isInsighterOnly ? 'text-[#47677D]' : 'text-[#566A86]'
        }`}
      >
        {copy.benefits?.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>

      {isClientOnly ? (
        <a href={insighterRegistrationUrl} className={actionClassName}>
          {copy.action}
          <IconArrowRight
            aria-hidden
            className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`}
            stroke={1.9}
          />
        </a>
      ) : (
        <button type="button" className={actionClassName}>
          {copy.action}
          <IconArrowRight
            aria-hidden
            className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`}
            stroke={1.9}
          />
        </button>
      )}
    </section>
  )
}
