'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/i18n/routing'
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
  const router = useRouter();
  const isRtl = pathname.startsWith('/ar');
  const currentLocale = pathname.split('/')[1];

  // Always use dark style with white text (matching the updated header)
  const menuTextColorClass = 'text-slate-300 hover:text-white';
  
  // Always use dark style background (matching the updated header)
  const menuBgStyle = "border border-transparent [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box]";
  
  // Dark border color for dividers
  const borderColorClass = "border-slate-700/50";

  // Function to switch locale
  const switchLocale = (locale: string) => {
    // Set loading state before switching locale
    setIsLoading(true);
    
    // Set the language preference in a cookie - expires in 1 year
    document.cookie = `preferred_language=${locale}; max-age=${60 * 60 * 24 * 365}; path=/; Domain=.foresighta.co;`;
    
    // Get the current path without locale prefix
    const currentPath = pathname.split('/').slice(2).join('/');
    
    // Navigate to the same route with the new locale
    // If we're on the home page (or empty path), just use '/'
    const newPath = currentPath ? `/${currentPath}` : '/';
    router.push(newPath, { locale });
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
    <div className="md:hidden flex items-center ml-4">
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
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}/industries/insight`}>{t('navigation.insights')}</Link>
          </li>
          <li>
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}/industries/manual`}>{t('navigation.manuals')}</Link>
          </li>
          <li>
            <Link className={`flex font-medium text-sm ${menuTextColorClass} py-1.5`} href={`/${currentLocale}/industries/course`}>{t('navigation.courses')}</Link>
          </li>
          <li className={`border-t ${borderColorClass} mt-1.5 pt-1.5`}>
            <button 
              onClick={() => {
                switchLocale(currentLocale === 'en' ? 'ar' : 'en');
                setMobileNavOpen(false);
              }}
              className={`flex items-center font-medium text-sm ${menuTextColorClass} py-1.5 w-full text-left`}
            >
              <IconLanguage size={18} className={`${isRtl ? 'ml-2' : 'mr-2'}`} />
              <span>
                {currentLocale === 'en' ? t('language.switchToArabic') : t('language.switchToEnglish')}
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
