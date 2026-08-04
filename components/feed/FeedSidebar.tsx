'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  IconBuilding,
  IconDownload,
  IconFileDescription,
  IconLayoutDashboard,
  IconListDetails,
  IconLogout,
  IconSettings,
  IconSparkles,
  IconUserCircle,
  type Icon,
} from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'
import { apiBaseUrl, dashboardUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'

type FeedSidebarProps = {
  locale: string
}

type SidebarCopy = {
  dashboard: string
  library: string
  myFeeds: string
  draft: string
  completeNow: string
  myTeam: string
  myPage: string
  downloads: string
  profile: string
  settings: string
  signOut: string
  insighter: string
  manager: string
  client: string
  at: string
  guestTitle: string
  guestDescription: string
  createAccount: string
  logIn: string
}

type KnowledgeStatusStatistic = {
  status: string
  count: number
}

type SidebarItemProps = {
  href?: string
  icon: Icon
  label: string
  onClick?: () => void
  badge?: React.ReactNode
  active?: boolean
}

const copyByLocale: Record<'en' | 'ar', SidebarCopy> = {
  en: {
    dashboard: 'Dashboard',
    library: 'My library',
    myFeeds: 'My Posts',
    draft: 'Draft',
    completeNow: 'Complete Now!',
    myTeam: 'My Team',
    myPage: 'My Page',
    downloads: 'My Downloads',
    profile: 'Profile',
    settings: 'Settings',
    signOut: 'Sign Out',
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
    dashboard: 'لوحة المعلومات',
    library: 'مكتبتي',
    myFeeds: 'منشوراتي',
    draft: 'مسودة',
    completeNow: 'أكمل الآن!',
    myTeam: 'فريقي',
    myPage: 'صفحتي',
    downloads: 'التحميلات',
    profile: 'ملفي الشخصي',
    settings: 'الإعدادات',
    signOut: 'تسجيل الخروج',
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

function SidebarItem({ href, icon: ItemIcon, label, onClick, badge, active = false }: SidebarItemProps) {
  const content = (
    <>
      <ItemIcon aria-hidden stroke={1.75} className="h-[18px] w-[18px] shrink-0 text-[#60728F]" />
      <span className="min-w-0 flex-1">{label}</span>
      {badge}
    </>
  )

  const className = `group flex min-h-12 w-full items-center gap-3 px-[18px] text-start text-[14px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2378E8] ${
    active
      ? 'bg-[#EEF5FF] font-semibold text-[#2378E8]'
      : 'font-normal text-[#1C2433] hover:bg-[#F4F8FF]'
  }`

  if (href) {
    return (
      <Link href={href} className={className} aria-current={active ? 'page' : undefined}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  )
}

function SidebarSkeleton() {
  return (
    <div
      aria-label="Loading profile menu"
      className="overflow-hidden rounded-lg border border-[#D9E3EF] bg-white"
    >
      <div className="flex h-[216px] animate-pulse flex-col items-center bg-[#F8FAFD] px-5 pt-6">
        <div className="h-24 w-24 rounded-full bg-slate-200" />
        <div className="mt-4 h-5 w-32 rounded-full bg-slate-200" />
        <div className="mt-3 h-[23px] w-20 rounded bg-slate-200" />
      </div>
      <div className="space-y-px bg-[#E7EDF5]">
        {[72, 108, 92, 80, 102].map((width) => (
          <div key={width} className="flex h-12 items-center gap-3 bg-white px-[18px]">
            <div className="h-[18px] w-[18px] animate-pulse rounded bg-slate-100" />
            <div className="h-3 animate-pulse rounded bg-slate-100" style={{ width }} />
          </div>
        ))}
      </div>
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
    <section
      aria-labelledby="feed-auth-title"
      className="overflow-hidden rounded-lg border border-[#D7E1EC] bg-white p-5"
    >
      <div
        aria-hidden
        className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-[#EAF3FF] text-[#2378E8]"
      >
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

export default function FeedSidebar({
  locale,
  myFeedsActive = false,
}: FeedSidebarProps & { myFeedsActive?: boolean }) {
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const { user, roles, isLoading, isAuthResolved, handleSignOut } = useUserProfile()
  const [unpublishedDraftCount, setUnpublishedDraftCount] = useState(0)

  const isProvider = roles.some((role) =>
    ['insighter', 'company', 'company-insighter'].includes(role),
  )
  const isPureClient =
    roles.includes('client') &&
    !roles.some((role) => ['insighter', 'company', 'company-insighter'].includes(role))

  useEffect(() => {
    if (!isProvider) {
      setUnpublishedDraftCount(0)
      return
    }

    const token = getAuthToken()
    if (!token) return

    const controller = new AbortController()

    async function loadDraftCount() {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/insighter/library/knowledge/status/statistics`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Accept-Language': isArabic ? 'ar' : 'en',
              'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            cache: 'no-store',
            signal: controller.signal,
          },
        )

        if (!response.ok) return

        const responseBody = (await response.json()) as {
          data?: KnowledgeStatusStatistic[]
        }
        const count =
          responseBody.data?.find((statistic) => statistic.status === 'unpublished')?.count ?? 0
        setUnpublishedDraftCount(count)
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return
      }
    }

    loadDraftCount()
    return () => controller.abort()
  }, [isArabic, isProvider])

  if (!isAuthResolved || isLoading) {
    return <SidebarSkeleton />
  }

  if (!user) {
    return <GuestSidebar locale={locale} />
  }

  const initials = `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase()
  const fullName = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || user.name
  const roleLabel = roles.includes('company-insighter')
    ? `${copy.insighter} ${copy.at} ${user.company?.legal_name ?? ''}`.trim()
    : roles.includes('insighter')
      ? copy.insighter
      : roles.includes('company')
        ? `${user.company?.legal_name ?? ''} · ${copy.manager}`.replace(/^ · /, '')
        : copy.client

  const draftBadge =
    unpublishedDraftCount > 0 ? (
      <span className="shrink-0 rounded bg-[#FFF4DE] px-2 py-1 text-[11px] font-semibold leading-4 text-[#B87518]">
        {unpublishedDraftCount} {copy.draft} — {copy.completeNow}
      </span>
    ) : undefined

  return (
    <nav
      aria-label={isArabic ? 'قائمة الحساب' : 'Account menu'}
      className="overflow-hidden rounded-lg border border-[#D9E3EF] bg-white"
    >
      <div className="relative flex h-[216px] flex-col items-center overflow-hidden bg-[#F8FAFD] px-5 pb-[22px] pt-6 text-center">
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
            <Image
              src={user.profile_photo_url}
              alt={fullName}
              fill
              sizes="96px"
              quality={100}
              className="object-cover object-top"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[24px] font-extrabold text-[#2378E8]">
              {initials || 'I'}
            </div>
          )}
        </div>
        <h2 className="relative z-10 mt-4 max-w-full truncate text-[16px] font-bold text-[#101724]">
          {fullName}
        </h2>
        <span className="relative z-10 mt-3 max-w-full rounded bg-[#DFF7F6] px-3 py-[3px] text-[11px] font-semibold leading-[17px] text-[#139A91]">
          {roleLabel}
        </span>
      </div>

      <div className="border-t border-[#E5EBF3] p-[14px]">
        <Link
          href={`${dashboardUrl}/app/insighter-dashboard/my-dashboard`}
          className="flex h-[52px] items-center gap-3 rounded-md border border-[#CFE0FA] bg-[#EFF5FD] px-3 text-[14px] font-semibold text-[#2378E8] transition duration-150 hover:border-[#AFCDF7] hover:bg-[#E8F1FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white">
            <IconLayoutDashboard aria-hidden stroke={2} className="h-[18px] w-[18px]" />
          </span>
          {copy.dashboard}
        </Link>
      </div>

      {isProvider && (
        <div className="border-t border-[#E5EBF3]">
          <SidebarItem
            href={`/${locale}?view=my-feeds`}
            icon={IconListDetails}
            label={copy.myFeeds}
            active={myFeedsActive}
          />
        </div>
      )}

      {isProvider && (
        <div className="border-t border-[#E5EBF3] px-[18px] py-3">
          <Link
            href={`${dashboardUrl}/app/insighter-dashboard/my-knowledge/general`}
            className="block text-[#1C2433] transition-colors hover:text-[#2378E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8]"
          >
            <span className="flex items-center gap-2.5 text-[14px] font-normal">
              <IconFileDescription aria-hidden stroke={1.75} className="h-[18px] w-[18px] text-[#60728F]" />
              {copy.library}
            </span>
            {draftBadge && <span className="mt-2 block">{draftBadge}</span>}
          </Link>
        </div>
      )}

      {roles.includes('company') && (
        <div className="border-t border-[#E5EBF3]">
          <SidebarItem
            href={`${dashboardUrl}/app/insighter-dashboard/my-company-settings`}
            icon={IconBuilding}
            label={copy.myTeam}
          />
        </div>
      )}

      {!isPureClient && (
        <div className="border-t border-[#E5EBF3]">
          <SidebarItem
            href={`/${locale}/profile/${user.uuid}?entity=insighter`}
            icon={IconUserCircle}
            label={copy.myPage}
          />
        </div>
      )}

      <div className="border-t border-[#E5EBF3]">
        <SidebarItem
          href={`${dashboardUrl}/app/insighter-dashboard/my-downloads`}
          icon={IconDownload}
          label={copy.downloads}
        />
      </div>

      <div className="border-t border-[#E5EBF3]">
        <SidebarItem
          href={`/${locale}/profile/settings`}
          icon={IconUserCircle}
          label={copy.profile}
        />
      </div>

      <div className="border-t border-[#E5EBF3]">
        <SidebarItem
          href={`${dashboardUrl}/app/insighter-dashboard/account-settings/general-settings`}
          icon={IconSettings}
          label={copy.settings}
        />
      </div>

      <div className="border-t border-[#E5EBF3]">
        <SidebarItem icon={IconLogout} label={copy.signOut} onClick={handleSignOut} />
      </div>
    </nav>
  )
}
