'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconLanguage, IconMenu2, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useLoading } from '@/components/context/LoadingContext'
import { getCookieDomain as sharedGetCookieDomain, isSharedCookieHost } from '@/lib/cookieDomain'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'
import FeedSidebar from '@/components/feed/FeedSidebar'

interface MobileMenuProps {
  isHomePage?: boolean;
}

export default function MobileMenu({ isHomePage = true }: MobileMenuProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)
  const [portalReady, setPortalReady] = useState(false)
  const { setIsLoading } = useLoading();
  const t = useTranslations('Header');
  const pathname = usePathname();
  const isRtl = pathname.startsWith('/ar');
  const currentLocale = pathname.split('/')[1];

  // On the feed (main) page, logged-in users get the dashboard sidebar in the
  // mobile menu instead of the standard nav links, mirroring the desktop layout.
  const { user } = useUserProfile();
  const pathAfterLocale = pathname.split('/').filter(Boolean).slice(1).join('/');
  const isFeedPage = pathAfterLocale === '';
  const showFeedSidebar = isFeedPage && !!user;

  // Always use dark style with white text (matching the updated header)
  const menuTextColorClass = 'text-slate-300 hover:text-white';
  
  // Always use dark style background (matching the updated header)
  const menuBgStyle = "border border-transparent [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box]";
  
  // Dark border color for dividers
  const borderColorClass = "border-slate-700/50";

  // Cookie helpers shared with the auth flows (env-aware Domain attribute)
  const getCookieDomain = sharedGetCookieDomain;
  const isProduction = isSharedCookieHost;

  // Helper function to clear duplicate cookies (handles both Angular SameSite=None and Next.js SameSite=Lax)
  const clearDuplicateCookies = (cookieName: string) => {
    const cookieDomain = getCookieDomain();
    const prod = isProduction();
    const clearVariations = [
      `${cookieName}=; Path=/; Max-Age=-1`,
    ];
    if (cookieDomain) {
      clearVariations.push(
        `${cookieName}=; Domain=${cookieDomain}; Path=/; Max-Age=-1; Secure; SameSite=None`,
        `${cookieName}=; Domain=${cookieDomain}; Path=/; Max-Age=-1; Secure; SameSite=Lax`
      );
    }
    clearVariations.push(
      `${cookieName}=; Path=/; Max-Age=-1; ${prod ? 'Secure; SameSite=None' : 'SameSite=Lax'}`
    );
    clearVariations.forEach(v => { document.cookie = v; });
  };

  // Function to switch locale
  const switchLocale = (locale: string) => {
    // Set loading state before switching locale
    setIsLoading(true);

    // Clear any existing duplicate cookies first
    clearDuplicateCookies('preferred_language');
    clearDuplicateCookies('NEXT_LOCALE');

    const cookieDomain = getCookieDomain();
    const prod = isProduction();
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    // Set preferred_language cookie (shared with Angular app)
    const cookieParts = [
      `preferred_language=${locale}`,
      `Path=/`,
      `Expires=${expirationDate.toUTCString()}`,
      `Max-Age=${60 * 60 * 24 * 365}`,
      `SameSite=Lax`
    ];
    if (cookieDomain) cookieParts.push(`Domain=${cookieDomain}`);
    if (prod) cookieParts.push(`Secure`);
    document.cookie = cookieParts.join('; ');

    // Also set NEXT_LOCALE for next-intl middleware consistency
    const nextLocaleParts = [
      `NEXT_LOCALE=${locale}`,
      `Path=/`,
      `Expires=${expirationDate.toUTCString()}`,
      `Max-Age=${60 * 60 * 24 * 365}`,
      `SameSite=Lax`
    ];
    if (prod) nextLocaleParts.push(`Secure`);
    document.cookie = nextLocaleParts.join('; ');

    // Get the current path without locale prefix
    const currentPath = pathname.split('/').slice(2).join('/');
    const currentSearch = typeof window !== 'undefined' ? window.location.search : '';
    const newPath = currentPath ? `/${currentPath}` : '/';
    const fullUrl = `/${locale}${newPath}${currentSearch}`;

    // Force full page reload to ensure proper re-render with new locale
    window.location.href = fullUrl;
  };

  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setPortalReady(true)
  }, [])

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      setMobileNavOpen(false)
    };
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false)
    };
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    if (!mobileNavOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileNavOpen])

  const feedSidebarToggleClass = showFeedSidebar
    ? `fixed bottom-[calc(var(--auth-banner-offset,0px)+max(1rem,env(safe-area-inset-bottom)))] z-[1002] h-10 w-10 rounded-full border border-[#82B9FF]/55 bg-[#BFE5FF]/25 text-[#2378E8] shadow-lg shadow-blue-950/15 backdrop-blur-[1px] hover:-translate-y-0.5 hover:border-[#82B9FF]/75 hover:bg-[#BFE5FF]/35 hover:text-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67B5F6] focus-visible:ring-offset-2 xl:hidden ${
        isRtl ? 'left-4' : 'right-4'
      }`
    : 'h-8 w-8'

  const menuTrigger = (
    <button
      ref={trigger}
      type="button"
      className={`group inline-flex ${feedSidebarToggleClass} ${showFeedSidebar ? '' : menuTextColorClass} items-center justify-center text-center transition`}
      aria-label={showFeedSidebar
        ? (isRtl ? 'فتح الشريط الجانبي' : 'Open sidebar')
        : (isRtl ? 'فتح القائمة' : 'Open menu')}
      aria-controls="mobile-nav"
      aria-expanded={mobileNavOpen}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        setMobileNavOpen((isOpen) => !isOpen)
      }}
    >
      {mobileNavOpen ? (
        <IconX aria-hidden className="h-[22px] w-[22px]" stroke={2.2} />
      ) : (
        <IconMenu2 aria-hidden className="h-[22px] w-[22px]" stroke={2.2} />
      )}
    </button>
  )

  const mobileMenu = (
    <div className="xl:hidden flex items-center ml-4">
      {menuTrigger}

      {mobileNavOpen && (
        <button
          type="button"
          aria-label={isRtl ? 'إغلاق القائمة' : 'Close menu'}
          className="fixed inset-0 z-[1000] bg-slate-950/45 backdrop-blur-[1px]"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Side drawer navigation */}
      <nav
        id="mobile-nav"
        ref={mobileNav}
        aria-hidden={!mobileNavOpen}
        className={`fixed inset-y-0 z-[1001] w-[min(22rem,calc(100vw-2.5rem))] overflow-y-auto bg-[#EEF2FA] transition-transform duration-300 ease-out sm:w-[22rem] ${
          isRtl
            ? `right-0 shadow-[-12px_0_32px_rgba(15,23,42,0.2)] ${mobileNavOpen ? 'translate-x-0' : 'translate-x-full'}`
            : `left-0 shadow-[12px_0_32px_rgba(15,23,42,0.2)] ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`
        }`}
      >
        {showFeedSidebar ? (
          <div
            className="min-h-full p-4"
            dir={isRtl ? 'rtl' : 'ltr'}
            onClick={(e) => {
              // Close the menu once a navigation link is tapped.
              if ((e.target as HTMLElement).closest('a')) setMobileNavOpen(false)
            }}
          >
            <FeedSidebar locale={currentLocale} />
          </div>
        ) : (
        <ul className={`min-h-full px-5 py-6 ${menuBgStyle} bg-opacity-95`}>
          <li>
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}`}>{t('navigation.feed')}</Link>
          </li>
          <li>
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}/landing`}>{t('navigation.home')}</Link>
          </li>
          <li>
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}/home`}>{t('navigation.documents')}</Link>
          </li>
          <li>
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}/all-industries`}>{t('navigation.industries')}</Link>
          </li>
          <li className={`border-t ${borderColorClass} mt-1 pt-1`}>
            <span className="flex text-xs font-semibold uppercase tracking-wide text-slate-500 py-1.5">{t('navigation.types')}</span>
          </li>
          <li>
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}/industries/data`}>{t('navigation.data')}</Link>
          </li>
          <li>
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}/industries/report`}>{t('navigation.reports')}</Link>
          </li>
          <li>
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}/industries/statistic`}>{t('navigation.statistics')}</Link>
          </li>
          <li>
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}/industries/manual`}>{t('navigation.manuals')}</Link>
          </li>
          <li>
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}/industries/course`}>{t('navigation.courses')}</Link>
          </li>

        </ul>
        )}
      </nav>
    </div>
  )

  return showFeedSidebar && portalReady
    ? createPortal(mobileMenu, document.body)
    : mobileMenu
}
