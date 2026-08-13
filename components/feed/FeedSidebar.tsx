'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  IconBell,
  IconBook,
  IconBookmark,
  IconBriefcase,
  IconCalendar,
  IconCalendarCog,
  IconChartLine,
  IconChevronDown,
  IconCreditCard,
  IconDownload,
  IconFolders,
  IconLayoutDashboard,
  IconMessage2,
  IconSettings2,
  IconShoppingBag,
  IconSparkles,
  IconUserEdit,
  IconUsers,
  IconWallet,
  type Icon,
} from '@tabler/icons-react'
import { useEffect, useState, type ReactNode } from 'react'
import { dashboardUrl } from '@/app/config'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'

type FeedSidebarProps = {
  locale: string
  /** Hide the avatar/name profile card (e.g. in the mobile header menu). */
  hideProfileCard?: boolean
}

type SidebarCopy = {
  menu: string
  overview: string
  myPosts: string
  myCompany: string
  insights: string
  myKnowledge: string
  myDownloads: string
  readLater: string
  meetings: string
  mySchedule: string
  projects: string
  clientProjects: string
  myProjects: string
  projectSettings: string
  marketplace: string
  myPurchases: string
  sales: string
  wallet: string
  settings: string
  accountSettings: string
  notificationSettings: string
  paymentSettings: string
  insighter: string
  manager: string
  client: string
  at: string
  guestTitle: string
  guestDescription: string
  createAccount: string
  logIn: string
}

type SidebarItemProps = {
  href: string
  icon: Icon
  label: string
  isActive?: boolean
  compact?: boolean
}

type DashboardSectionProps = {
  title: string
  icon: Icon
  children: ReactNode
  compact?: boolean
}

const copyByLocale: Record<'en' | 'ar', SidebarCopy> = {
  en: {
    menu: 'Menu',
    overview: 'Dashboard',
    myPosts: 'My Posts',
    myCompany: 'My Company',
    insights: 'Insights',
    myKnowledge: 'My Library',
    myDownloads: 'My Downloads',
    readLater: 'Read Later',
    meetings: 'Sessions',
    mySchedule: 'My Schedule',
    projects: 'Projects',
    clientProjects: 'Client Projects',
    myProjects: 'My Projects',
    projectSettings: 'Project Settings',
    marketplace: 'Marketplace',
    myPurchases: 'My Purchases',
    sales: 'Sales',
    wallet: 'Wallet',
    settings: 'Settings',
    accountSettings: 'Account Settings',
    notificationSettings: 'Notification Settings',
    paymentSettings: 'Payment Settings',
    insighter: 'Insighter',
    manager: 'Manager',
    client: 'Client',
    at: 'at',
    guestTitle: 'New to Insighta?',
    guestDescription: 'Join to build your own personalized business feed.',
    createAccount: 'Create account',
    logIn: 'Log in',
  },
  ar: {
    menu: 'القائمة',
    overview: 'لوحة التحكم',
    myPosts: 'منشوراتي',
    myCompany: 'شركتي',
    insights: 'الرؤى',
    myKnowledge: 'مكتبتي',
    myDownloads: 'تحميلاتي',
    readLater: 'اقرأ لاحقاً',
    meetings: 'الجلسات الاستشارية',
    mySchedule: 'جدولي الاستشاري',
    projects: 'المشاريع',
    clientProjects: 'مشاريع العملاء',
    myProjects: 'مشاريعي',
    projectSettings: 'إعدادات المشروع',
    marketplace: 'السوق',
    myPurchases: 'طلباتي',
    sales: 'المبيعات',
    wallet: 'المحفظة',
    settings: 'الإعدادات',
    accountSettings: 'إعدادات الحساب',
    notificationSettings: 'إعدادات الإشعارات',
    paymentSettings: 'إعدادات الدفع',
    insighter: 'إنسايتر',
    manager: 'مدير',
    client: 'عميل',
    at: 'في',
    guestTitle: 'جديد على إنسايتا؟',
    guestDescription: 'انضم إلينا لتحصل على موجز أعمال مصمم حسب اهتماماتك.',
    createAccount: 'إنشاء حساب',
    logIn: 'تسجيل الدخول',
  },
}

function SidebarItem({ href, icon: ItemIcon, label, isActive = false, compact = false }: SidebarItemProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`group flex items-center gap-3 text-start text-[14px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8] ${
        compact
          ? `min-h-10 border-b border-[#E2E8F0] px-2 py-2 last:border-b-0 ${
              isActive
                ? 'rounded-md bg-[#EDF4FD] font-semibold text-[#2378E8]'
                : 'font-normal text-[#495057] hover:bg-[#F8F9FA] hover:text-[#2378E8]'
            }`
          : `min-h-11 border-b border-s-2 border-b-[#F1F1F1] px-4 py-3 ${
        isActive
          ? 'border-s-[#2378E8] bg-[#EDF4FD] font-semibold text-[#2378E8]'
          : 'border-s-transparent font-normal text-[#495057] hover:bg-[#F8F9FA] hover:text-[#2378E8]'
          }`
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center transition-colors ${
          isActive ? 'text-[#2378E8]' : 'text-[#60728F] group-hover:text-[#2378E8]'
        }`}
      >
        <ItemIcon aria-hidden stroke={1.75} className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0 flex-1">{label}</span>
    </Link>
  )
}

function DashboardSection({ title, icon: SectionIcon, children, compact = false }: DashboardSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="border-b border-[#E2E8F0] last:border-b-0">
      <button
        type="button"
        onClick={() => setIsExpanded((expanded) => !expanded)}
        aria-expanded={isExpanded}
        className={`flex w-full items-center gap-3 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8] ${
          compact
            ? 'min-h-10 px-2 py-2'
            : 'min-h-[54px] px-4 py-3'
          } ${isExpanded ? 'bg-[#F8FAFC]' : 'bg-white hover:bg-[#F8FAFC]'}`}
      >
        <span className={`flex shrink-0 items-center justify-center text-[#2378E8] ${compact ? 'h-5 w-5' : 'h-6 w-6'}`}>
          <SectionIcon aria-hidden stroke={1.8} className={compact ? 'h-4 w-4' : 'h-5 w-5'} />
        </span>
        <h2 className={`m-0 min-w-0 flex-1 font-semibold leading-6 text-[#364152] ${compact ? 'text-[12px]' : 'text-[16px]'}`}>
          {title}
        </h2>
        <IconChevronDown
          aria-hidden
          className={`shrink-0 text-[#718096] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          size={compact ? 16 : 18}
          stroke={2}
        />
      </button>
      {isExpanded && <div>{children}</div>}
    </section>
  )
}

function SidebarLegalFooter({ locale }: { locale: string }) {
  const t = useTranslations('Footer')
  const isArabic = locale === 'ar'
  const legalLinks = [
    { href: `/${locale}/legals/privacy`, label: t('legals.privacy') },
    { href: `/${locale}/legals/terms`, label: t('legals.terms') },
    { href: `/${locale}/legals/cookies`, label: t('legals.cookies') },
    { href: `/${locale}/legals/licensing`, label: t('legals.dataLicensing') },
  ]

  return (
    <footer className="px-2 py-1 text-[11px] leading-5 text-[#718096]" dir={isArabic ? 'rtl' : 'ltr'}>
      <p className="m-0 whitespace-nowrap">{isArabic ? '© 2026 إنسايتا بيزنس' : '© 2026 Insighta Business'}</p>
      <ul className="mt-3 space-y-1.5">
        {legalLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[#5D7089] transition-colors hover:text-[#2378E8] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}

function SidebarSkeleton() {
  return (
    <div aria-label="Loading profile menu" className="space-y-6">
      <div className="flex h-[216px] animate-pulse flex-col items-center rounded-lg border border-[#D9E3EF] bg-[#F8FAFD] px-5 pt-6">
        <div className="h-24 w-24 rounded-full bg-slate-200" />
        <div className="mt-4 h-5 w-32 rounded-full bg-slate-200" />
        <div className="mt-3 h-[23px] w-20 rounded bg-slate-200" />
      </div>
      {[2, 3, 2].map((rows, sectionIndex) => (
        <div key={sectionIndex} className="overflow-hidden rounded-lg border border-[#E7E7E7] bg-white">
          <div className="h-[54px] animate-pulse border-b border-[#E9ECEF] bg-[#F8F9FA] px-4 py-4">
            <div className="h-4 w-20 rounded bg-slate-200" />
          </div>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex h-11 items-center gap-3 border-b border-[#F1F1F1] px-4 last:border-b-0">
              <div className="h-[18px] w-[18px] animate-pulse rounded bg-slate-100" />
              <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function GuestSidebar({ locale }: FeedSidebarProps) {
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const [returnUrl, setReturnUrl] = useState('')

  useEffect(() => {
    setReturnUrl(window.location.href)
  }, [])

  const encodedReturnUrl = encodeURIComponent(returnUrl)
  const loginUrl = `${dashboardUrl}/auth/login?returnUrl=${encodedReturnUrl}`
  const signupUrl = `${dashboardUrl}/auth/sign-up?returnUrl=${encodedReturnUrl}`

  return (
    <section aria-labelledby="feed-auth-title" className="overflow-hidden rounded-lg border border-[#D7E1EC] bg-white p-5">
      <div aria-hidden className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-[#EAF3FF] text-[#2378E8]">
        <IconSparkles stroke={1.8} className="h-5 w-5" />
      </div>
      <h2 id="feed-auth-title" className="text-[20px] font-extrabold leading-tight tracking-[-0.02em] text-[#101724]">
        {copy.guestTitle}
      </h2>
      <p className="mt-2 text-[14px] leading-6 text-[#5E6C7D]">{copy.guestDescription}</p>
      <div className="mt-5 space-y-2.5">
        <Link
          href={signupUrl}
          className="flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-[#2475E8] to-[#2BC0D5] px-4 text-[13px] font-semibold text-white transition duration-150 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2 active:scale-[0.99]"
        >
          {copy.createAccount}
        </Link>
        <Link
          href={loginUrl}
          className="flex h-10 items-center justify-center rounded-md border border-[#2378E8] px-4 text-[13px] font-semibold text-[#2378E8] transition duration-150 hover:bg-[#F3F8FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2 active:scale-[0.99]"
        >
          {copy.logIn}
        </Link>
      </div>
    </section>
  )
}

export default function FeedSidebar({ locale, hideProfileCard = false }: FeedSidebarProps) {
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const { user, roles, isLoading, isAuthResolved } = useUserProfile()
  const searchParams = useSearchParams()
  const isMyPostsActive = searchParams.get('view') === 'my-feeds'

  const isInsighter = roles.includes('insighter')
  const isCompany = roles.includes('company')
  const isCompanyInsighter = roles.includes('company-insighter')
  const isPureClient =
    roles.includes('client') &&
    !roles.some((role) => ['insighter', 'company', 'company-insighter'].includes(role))
  const isProvider = isInsighter || isCompany || isCompanyInsighter
  const hasProjectAccess = isProvider || isPureClient

  if (!isAuthResolved || isLoading) {
    return <SidebarSkeleton />
  }

  if (!user) {
    return <GuestSidebar locale={locale} />
  }

  const initials = `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase()
  const fullName = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || user.name
  const roleLabel = isCompanyInsighter
    ? `${copy.insighter} ${copy.at} ${user.company?.legal_name ?? ''}`.trim()
    : isInsighter
      ? copy.insighter
      : isCompany
        ? `${user.company?.legal_name ?? ''} · ${copy.manager}`.replace(/^ · /, '')
        : copy.client
  const dashboardBase = `${dashboardUrl}/app/insighter-dashboard`

  return (
    <nav aria-label={isArabic ? 'قائمة الحساب' : 'Account menu'} className={hideProfileCard ? 'space-y-0' : 'space-y-6'}>
      {!hideProfileCard && (
      <section className="relative flex h-[216px] flex-col items-center overflow-hidden rounded-lg border border-[#D9E3EF] bg-[#F8FAFD] px-5 pb-[22px] pt-6 text-center">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-7 h-20 w-full text-[#BFD7FF]"
          viewBox="0 0 420 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <path d="M-15 89C46 25 107 30 170 65" stroke="currentColor" strokeWidth="1.35" />
          <path d="M-13 99C49 35 110 39 171 73" stroke="currentColor" strokeWidth="1.35" />
          <path d="M-10 109C51 46 111 48 172 81" stroke="currentColor" strokeWidth="1.35" />
          <path d="M-5 118C54 57 113 57 174 89" stroke="currentColor" strokeWidth="1.35" />
          <path d="M248 76C308 27 371 25 435 54" stroke="currentColor" strokeWidth="1.35" />
          <path d="M254 84C313 37 375 35 438 63" stroke="currentColor" strokeWidth="1.35" />
          <path d="M261 92C319 47 380 45 441 72" stroke="currentColor" strokeWidth="1.35" />
          <path d="M268 100C325 57 384 55 444 81" stroke="currentColor" strokeWidth="1.35" />
        </svg>

        <div className="relative z-10 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-[#E7F0FE]">
          {user.profile_photo_url ? (
            <Image src={user.profile_photo_url} alt={fullName} fill sizes="96px" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[24px] font-extrabold text-[#2378E8]">
              {initials || 'I'}
            </div>
          )}
        </div>
        <h2 className="relative z-10 mt-4 max-w-full truncate text-[16px] font-bold text-[#101724]">{fullName}</h2>
        <span className="relative z-10 mt-3 max-w-full rounded bg-[#DFF7F6] px-3 py-[3px] text-[11px] font-semibold leading-[17px] text-[#139A91]">
          {roleLabel}
        </span>
      </section>
      )}

      <div className="overflow-hidden rounded-lg border border-[#D7E1EC] bg-white shadow-[0_2px_8px_rgba(27,56,93,0.04)]">
      <DashboardSection title={copy.menu} icon={IconLayoutDashboard} compact={hideProfileCard}>
        <SidebarItem href={`${dashboardBase}/my-dashboard`} icon={IconLayoutDashboard} label={copy.overview} compact={hideProfileCard} />
        {!isPureClient && (
          <SidebarItem
            href={`/${locale}?view=my-feeds`}
            icon={IconMessage2}
            label={copy.myPosts}
            isActive={isMyPostsActive}
            compact={hideProfileCard}
          />
        )}
        {isCompany && (
          <SidebarItem href={`${dashboardBase}/my-company-settings`} icon={IconUsers} label={copy.myCompany} compact={hideProfileCard} />
        )}
      </DashboardSection>

      <DashboardSection title={copy.marketplace} icon={IconShoppingBag} compact={hideProfileCard}>
        <SidebarItem href={`${dashboardBase}/my-orders`} icon={IconShoppingBag} label={copy.myPurchases} compact={hideProfileCard} />
        {isProvider && <SidebarItem href={`${dashboardBase}/sales`} icon={IconChartLine} label={copy.sales} compact={hideProfileCard} />}
        {(isInsighter || isCompany) && (
          <SidebarItem href={`${dashboardBase}/wallet`} icon={IconWallet} label={copy.wallet} compact={hideProfileCard} />
        )}
      </DashboardSection>

      <DashboardSection title={copy.insights} icon={IconBook} compact={hideProfileCard}>
        {!isPureClient && (
          <SidebarItem href={`${dashboardBase}/my-knowledge`} icon={IconBook} label={copy.myKnowledge} compact={hideProfileCard} />
        )}
        <SidebarItem href={`${dashboardBase}/my-downloads`} icon={IconDownload} label={copy.myDownloads} compact={hideProfileCard} />
        <SidebarItem href={`${dashboardBase}/read-later`} icon={IconBookmark} label={copy.readLater} compact={hideProfileCard} />
      </DashboardSection>

      <DashboardSection title={copy.meetings} icon={IconCalendar} compact={hideProfileCard}>
        <SidebarItem href={`${dashboardBase}/my-meetings`} icon={IconCalendar} label={copy.meetings} compact={hideProfileCard} />
        {!isPureClient && (
          <SidebarItem
            href={`${dashboardBase}/account-settings/consulting-schedule`}
            icon={IconCalendarCog}
            label={copy.mySchedule}
            compact={hideProfileCard}
          />
        )}
      </DashboardSection>

      {hasProjectAccess && (
        <DashboardSection title={copy.projects} icon={IconBriefcase} compact={hideProfileCard}>
          {!isPureClient && (
            <SidebarItem href={`${dashboardBase}/project-offers`} icon={IconBriefcase} label={copy.clientProjects} compact={hideProfileCard} />
          )}
          <SidebarItem href={`${dashboardBase}/projects-created`} icon={IconFolders} label={copy.myProjects} compact={hideProfileCard} />
          {!isPureClient && (
            <SidebarItem
              href={`${dashboardBase}/account-settings/project-settings`}
              icon={IconSettings2}
              label={copy.projectSettings}
              compact={hideProfileCard}
            />
          )}
        </DashboardSection>
      )}

      <DashboardSection title={copy.settings} icon={IconSettings2} compact={hideProfileCard}>
        <SidebarItem
          href={`${dashboardBase}/account-settings/general-settings`}
          icon={IconUserEdit}
          label={copy.accountSettings}
          compact={hideProfileCard}
        />
        <SidebarItem
          href={`${dashboardBase}/account-settings/notification-settings`}
          icon={IconBell}
          label={copy.notificationSettings}
          compact={hideProfileCard}
        />
        {(isInsighter || isCompany) && (
          <SidebarItem
            href={`${dashboardBase}/account-settings/payment-settings`}
            icon={IconCreditCard}
            label={copy.paymentSettings}
            compact={hideProfileCard}
          />
        )}
      </DashboardSection>
      </div>
      <SidebarLegalFooter locale={locale} />
    </nav>
  )
}
