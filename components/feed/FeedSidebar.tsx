'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  IconBell,
  IconBook,
  IconBookmark,
  IconBriefcase,
  IconCalendar,
  IconCalendarCog,
  IconChartLine,
  IconCreditCard,
  IconDownload,
  IconFileText,
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
}

type SidebarCopy = {
  menu: string
  overview: string
  myPosts: string
  myRequests: string
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
}

type DashboardSectionProps = {
  title: string
  children: ReactNode
}

const copyByLocale: Record<'en' | 'ar', SidebarCopy> = {
  en: {
    menu: 'Menu',
    overview: 'Overview',
    myPosts: 'My Posts',
    myRequests: 'My Requests',
    myCompany: 'My Company',
    insights: 'Insights',
    myKnowledge: 'My Insight',
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
    overview: 'نظرة عامة',
    myPosts: 'منشوراتي',
    myRequests: 'طلباتي',
    myCompany: 'شركتي',
    insights: 'الرؤى',
    myKnowledge: 'معرفتي',
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

function SidebarItem({ href, icon: ItemIcon, label }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-11 items-center gap-3 border-b border-[#F1F1F1] px-4 py-3 text-start text-[14px] font-normal text-[#495057] transition-colors duration-150 last:border-b-0 hover:bg-[#F8F9FA] hover:text-[#2378E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8]"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[#60728F] transition-colors group-hover:text-[#2378E8]">
        <ItemIcon aria-hidden stroke={1.75} className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0 flex-1">{label}</span>
    </Link>
  )
}

function DashboardSection({ title, children }: DashboardSectionProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-[#E7E7E7] bg-white transition-shadow duration-200 hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]">
      <header className="flex min-h-[54px] items-center border-b border-[#E9ECEF] bg-[#F8F9FA] px-4 py-3">
        <h2 className="m-0 text-[16px] font-semibold leading-6 text-[#495057]">{title}</h2>
      </header>
      <div>{children}</div>
    </section>
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
      {[3, 3, 2].map((rows, sectionIndex) => (
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

export default function FeedSidebar({ locale }: FeedSidebarProps) {
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const { user, roles, isLoading, isAuthResolved } = useUserProfile()

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
    <nav aria-label={isArabic ? 'قائمة الحساب' : 'Account menu'} className="space-y-6">
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

      <DashboardSection title={copy.menu}>
        <SidebarItem href={`${dashboardBase}/my-dashboard`} icon={IconLayoutDashboard} label={copy.overview} />
        <SidebarItem href={`/${locale}?view=my-feeds`} icon={IconMessage2} label={copy.myPosts} />
        {!isPureClient && (
          <SidebarItem href={`${dashboardBase}/my-requests`} icon={IconFileText} label={copy.myRequests} />
        )}
        {isCompany && (
          <SidebarItem href={`${dashboardBase}/my-company-settings`} icon={IconUsers} label={copy.myCompany} />
        )}
      </DashboardSection>

      <DashboardSection title={copy.insights}>
        {!isPureClient && (
          <SidebarItem href={`${dashboardBase}/my-knowledge`} icon={IconBook} label={copy.myKnowledge} />
        )}
        <SidebarItem href={`${dashboardBase}/my-downloads`} icon={IconDownload} label={copy.myDownloads} />
        <SidebarItem href={`${dashboardBase}/read-later`} icon={IconBookmark} label={copy.readLater} />
      </DashboardSection>

      <DashboardSection title={copy.meetings}>
        <SidebarItem href={`${dashboardBase}/my-meetings`} icon={IconCalendar} label={copy.meetings} />
        {!isPureClient && (
          <SidebarItem
            href={`${dashboardBase}/account-settings/consulting-schedule`}
            icon={IconCalendarCog}
            label={copy.mySchedule}
          />
        )}
      </DashboardSection>

      {hasProjectAccess && (
        <DashboardSection title={copy.projects}>
          {!isPureClient && (
            <SidebarItem href={`${dashboardBase}/project-offers`} icon={IconBriefcase} label={copy.clientProjects} />
          )}
          <SidebarItem href={`${dashboardBase}/projects-created`} icon={IconFolders} label={copy.myProjects} />
          {!isPureClient && (
            <SidebarItem
              href={`${dashboardBase}/account-settings/project-settings`}
              icon={IconSettings2}
              label={copy.projectSettings}
            />
          )}
        </DashboardSection>
      )}

      <DashboardSection title={copy.marketplace}>
        <SidebarItem href={`${dashboardBase}/my-orders`} icon={IconShoppingBag} label={copy.myPurchases} />
        {isProvider && <SidebarItem href={`${dashboardBase}/sales`} icon={IconChartLine} label={copy.sales} />}
        {(isInsighter || isCompany) && (
          <SidebarItem href={`${dashboardBase}/wallet`} icon={IconWallet} label={copy.wallet} />
        )}
      </DashboardSection>

      <DashboardSection title={copy.settings}>
        <SidebarItem
          href={`${dashboardBase}/account-settings/general-settings`}
          icon={IconUserEdit}
          label={copy.accountSettings}
        />
        <SidebarItem
          href={`${dashboardBase}/account-settings/notification-settings`}
          icon={IconBell}
          label={copy.notificationSettings}
        />
        {(isInsighter || isCompany) && (
          <SidebarItem
            href={`${dashboardBase}/account-settings/payment-settings`}
            icon={IconCreditCard}
            label={copy.paymentSettings}
          />
        )}
      </DashboardSection>
    </nav>
  )
}
