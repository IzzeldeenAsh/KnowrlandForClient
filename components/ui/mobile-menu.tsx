'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconLanguage } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useLoading } from '@/components/context/LoadingContext'

interface MobileMenuProps {
  isHomePage?: boolean;
}

export default function MobileMenu({ isHomePage = true }: MobileMenuProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)
  const { setIsLoading } = useLoading();
  const t = useTranslations('Header');
  const pathname = usePathname();
  const isRtl = pathname.startsWith('/ar');
  const currentLocale = pathname.split('/')[1];

  // Always use dark style with white text (matching the updated header)
  const menuTextColorClass = 'text-slate-300 hover:text-white';
  
  // Always use dark style background (matching the updated header)
  const menuBgStyle = "border border-transparent [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box]";
  
  // Dark border color for dividers
  const borderColorClass = "border-slate-700/50";

  // Helper function to get the base domain for cookies
  const getCookieDomain = (): string | null => {
    if (typeof window === 'undefined') return null;
    const hostname = window.location.hostname;
    if (hostname.includes('insightabusiness.com') || hostname.includes('foresighta.co')) {
      return '.insightabusiness.com';
    }
    return null; // localhost
  };

  const isProduction = (): boolean => {
    if (typeof window === 'undefined') return false;
    const hostname = window.location.hostname;
    return hostname.includes('insightabusiness.com') || hostname.includes('foresighta.co');
  };

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

  return (
    <div className="lg:hidden flex items-center ml-4">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`group inline-flex w-8 h-8 ${menuTextColorClass} text-center items-center justify-center transition`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg className="w-4 h-4 fill-current pointer-events-none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <rect 
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] -translate-y-[5px] group-[[aria-expanded=true]]:rotate-[315deg] group-[[aria-expanded=true]]:translate-y-0"
            y="7" 
            width="16" 
            height="2" 
            rx="1"
          />
          <rect 
            className="origin-center group-[[aria-expanded=true]]:rotate-45 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]"
            y="7" 
            width="16" 
            height="2" 
            rx="1"
          />
          <rect 
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] translate-y-[5px] group-[[aria-expanded=true]]:rotate-[135deg] group-[[aria-expanded=true]]:translate-y-0"
            y="7" 
            width="16" 
            height="2" 
            rx="1"
          />
        </svg>
      </button>

      {/*Mobile navigation */}
      <nav
        id="mobile-nav"
        ref={mobileNav}
        className={`fixed top-16 z-50 ${isRtl ? 'right-0' : 'left-0'} w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out`}
        style={mobileNavOpen ? { maxHeight: mobileNav.current?.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: 0.8 }}
      >
        <ul className={`rounded-lg px-4 py-1.5 max-w-full ${menuBgStyle} bg-opacity-95 backdrop-blur-sm`}>
          <li>
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}/all-industries`}>{t('navigation.industries')}</Link>
          </li>
          <li>
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}/industries/report`}>{t('navigation.reports')}</Link>
          </li>
          <li>
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}/industries/data`}>{t('navigation.data')}</Link>
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
      </nav>
    </div>
  )
}
