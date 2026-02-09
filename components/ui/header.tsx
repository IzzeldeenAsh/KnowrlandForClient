'use client'
import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import { useEffect, useState } from 'react'
import {IconChevronDown, IconLanguage, IconSearch } from '@tabler/icons-react'
import { HoverCard, Group, Text, Anchor, Divider, SimpleGrid, Button, TextInput } from '@mantine/core'
import { UserProfile } from './header/components/UserProfile'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useRouter as useI18nRouter } from '@/i18n/routing'
import { useLoading } from '@/components/context/LoadingContext'
import Particles from '@/components/particles'

// Add CSS for text glow effect
import './text-glow.css'
import NotificationBell from './header/components/NotificationBell'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile';
import {  stopNotificationPolling } from '@/services/notifications.service';
import { getAuthToken } from '@/lib/authToken'

interface Industry {
  id: number;
  name: string;
  slug: string;
  children?: Industry[];
}

// Global cache for industries to prevent duplicate API calls
let industriesCache: {
  data: Industry[];
  lastFetchTime: number;
  isLoading: boolean;
  pendingPromise: Promise<Industry[]> | null;
} = {
  data: [],
  lastFetchTime: 0,
  isLoading: false,
  pendingPromise: null
};

const INDUSTRIES_CACHE_DURATION = 300000; // 5 minutes cache for industries

// IMPORTANT: This must be deterministic on BOTH server + client render to avoid hydration mismatches.
// Prefer env var override; otherwise choose a build-time default.
const ANGULAR_APP_URL: string =
  process.env.NEXT_PUBLIC_ANGULAR_APP_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'https://app.foresighta.co'
    : 'https://app.foresighta.co');

async function getIndustries(locale: string = 'en', forceRefresh: boolean = false): Promise<Industry[]> {
  const now = Date.now();
  
  // Return cached data if still valid and not forced refresh
  if (!forceRefresh && industriesCache.data.length > 0 && (now - industriesCache.lastFetchTime) < INDUSTRIES_CACHE_DURATION) {
    return industriesCache.data;
  }

  // If already fetching, return the pending promise
  if (industriesCache.isLoading && industriesCache.pendingPromise) {
    return industriesCache.pendingPromise;
  }

  // Start new fetch
  industriesCache.isLoading = true;
  industriesCache.pendingPromise = fetchIndustriesFromAPI(locale);

  try {
    const industries = await industriesCache.pendingPromise;
    return industries;
  } finally {
    industriesCache.pendingPromise = null;
  }
}

async function fetchIndustriesFromAPI(locale: string): Promise<Industry[]> {
  try {
    const res = await fetch("https://api.foresighta.co/api/platform/industries/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": locale,
        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: JSON.stringify({
        top_industry: 6,
        top_sub_industry: 6,
      }),
    });

    if (!res.ok) {
      return industriesCache.data; // Return cached data on error
    }

    const json = await res.json();
    const industries = json.data as Industry[];
    
    // Update cache
    industriesCache.data = industries;
    industriesCache.lastFetchTime = Date.now();
    
    return industries;
  } catch (error) {
    console.error('Error fetching industries:', error);
    return industriesCache.data; // Return cached data on error
  } finally {
    industriesCache.isLoading = false;
  }
}

export default function Header() {
  const t = useTranslations('Header');
  const [industries, setIndustries] = useState<Industry[]>(industriesCache.data);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
const { isLoading: isAppLoading, setIsLoading: setAppLoading } = useLoading();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split('/')[1] || 'en';
  const [returnUrl, setReturnUrl] = useState<string>('');
  
  // Use the centralized user profile hook
  const { user, roles, isLoading, isAuthResolved, handleSignOut } = useUserProfile();

  // Used only to decide which skeleton shape to show while auth is resolving.
  // Must be stable for SSR + first client render to avoid hydration mismatch.
  const [hasToken, setHasToken] = useState<boolean>(false);
  const shouldShowAuthSkeleton = !isAuthResolved;
  
  // Always use dark style with white text, as requested
  const textColorClass = ' hover:text-white transition-all duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-slate-700/50';
  const menuTextColorClass =  'text-white hover:text-gray-100 transition-all duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-[#3B8AEF]/20';
  const searchInputStyles = {
    input: {
      backgroundColor: isScrolled ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.1)',
      border: isScrolled ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white',
      direction: currentLocale === 'ar' ? 'rtl' : 'ltr',
      '&::placeholder': {
        color: isScrolled ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.6)',
      },
      '&:focus': {
        borderColor: '#3B8AEF',
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.15)',
      },
      '&:hover': {
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.12)',
      },
    },
    section: {
      color: isScrolled ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.6)',
    },
  } as const;

  // Handle search submission
  const handleSearch = (query: string, searchType: 'knowledge' | 'insighter' = 'knowledge') => {
    const searchParams = new URLSearchParams();
    if (query.trim()) {
      searchParams.set('keyword', query.trim());
    }
    searchParams.set('search_type', searchType);
    
    // Navigate to the search page with parameters - router already handles locale
    router.push(`/${currentLocale}/home?${searchParams.toString()}`);
    setSearchQuery('');
  };

  useEffect(() => {
    // Client-only values (token + current full URL) must be read after mount.
    setHasToken(!!getAuthToken());
    setReturnUrl(window.location.href);
  }, [pathname]);

  // Handle search input submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  // Check if current route should hide search bar
  const shouldHideSearchBar = (): boolean => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    
    // Hide on base URL (e.g., /en, /ar)
    if (pathSegments.length === 1) {
      return true;
    }
    
    // Hide on home page (e.g., /en/home, /ar/home)
    if (pathSegments.length === 2 && pathSegments[1] === 'home') {
      return true;
    }
    
    return false;
  };

  // Add active link styling function
  const isActiveLink = (path: string): string => {
    // Split the pathname into segments
    const pathSegments = pathname.split('/');
    // Get the last segment or check against specific routes
    const currentPath = pathSegments[pathSegments.length - 1] || pathSegments[pathSegments.length - 2];
    
    // Check for exact match in segment or specific path cases
    if (currentPath === path || 
        (path === 'statistic' && currentPath === 'statistic') || 
        (path === 'data' && currentPath === 'data') ||
        (path === 'report' && currentPath === 'report') ||
        (path === 'manual' && currentPath === 'manual') ||
        (path === 'course' && currentPath === 'course') ||
        (path === 'all-industries' && pathname.includes('/all-industries'))
    ) {
      return 'bg-[#3B8AEF] text-white';
    }
    return '';
  };

  useEffect(() => {
    // Fetch industries data with caching
    const loadIndustries = async () => {
      const data = await getIndustries(currentLocale);
      setIndustries(data);
    };

    loadIndustries();
  }, [currentLocale]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  // Helper function to get the base domain for cookies
  const getCookieDomain = (): string | null => {
    if (typeof window === 'undefined') return null;
    const hostname = window.location.hostname;
    
    // Check for production domains
    if (hostname.includes('insightabusiness.com')) {
      return '.foresighta.co';
    }
    if (hostname.includes('foresighta.co')) {
      return '.foresighta.co';
    }
    
    // Local development - no domain needed
    return null;
  };

  // Helper function to check if we're in production
  const isProduction = (): boolean => {
    if (typeof window === 'undefined') return false;
    const hostname = window.location.hostname;
    return hostname.includes('insightabusiness.com') || hostname.includes('foresighta.co');
  };

  // Helper function to clear duplicate cookies
  const clearDuplicateCookies = (cookieName: string) => {
    const cookieDomain = getCookieDomain();
    const prod = isProduction();

    // Clear all possible variations of the cookie to prevent duplicates
    const clearVariations = [
      // Local variation
      `${cookieName}=; Path=/; Max-Age=-1`,
    ];

    // Add domain-specific clearing for production
    if (cookieDomain) {
      clearVariations.push(
        `${cookieName}=; Domain=${cookieDomain}; Path=/; Max-Age=-1; Secure; SameSite=None`,
        `${cookieName}=; Domain=${cookieDomain}; Path=/; Max-Age=-1; Secure; SameSite=Lax`
      );
    }

    // Fallback without domain
    clearVariations.push(
      `${cookieName}=; Path=/; Max-Age=-1; ${prod ? 'Secure; SameSite=None' : 'SameSite=Lax'}`
    );

    clearVariations.forEach(variation => {
      document.cookie = variation;
    });
  };

  // Function to switch locale
  const switchLocale = (locale: string) => {
    // Set loading state before switching locale
    setAppLoading(true);

    // Clear any existing duplicate cookies first
    clearDuplicateCookies('preferred_language');

    // Wait a moment for cookie clearing to take effect
    setTimeout(() => {
      // Enhanced cookie setting for better browser compatibility (especially Safari/Firefox)
      const cookieDomain = getCookieDomain();
      const prod = isProduction();
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1); // 1 year from now

      const cookieParts = [
        `preferred_language=${locale}`,
        `Path=/`,                       // send on all paths
        `Expires=${expirationDate.toUTCString()}`, // Use Expires for better Safari/Firefox compatibility
        `Max-Age=${60 * 60 * 24 * 365}`,// one year (keeping both for compatibility)
        `SameSite=Lax`                  // prevent CSRF, still send on top-level nav
      ];

      if (cookieDomain) {
        cookieParts.push(`Domain=${cookieDomain}`); // leading dot = include subdomains
      }
      
      if (prod) {
        cookieParts.push(`Secure`);                // HTTPS only in production
      }

      // Set single, clean cookie
      document.cookie = cookieParts.join('; ');

      // Get the current path without locale prefix
      const currentPath = pathname.split('/').slice(2).join('/');

      // Get current query parameters
      const currentSearch = typeof window !== 'undefined' ? window.location.search : '';

      // Navigate to the same route with the new locale
      // If we're on the home page (or empty path), just use '/'
      const newPath = currentPath ? `/${currentPath}` : '/';

      // Preserve query parameters when switching locale
      const fullUrl = `/${locale}${newPath}${currentSearch}`;

      // Force a complete page reload to prevent client-side errors
      // This ensures all components are properly re-rendered with the new locale
      window.location.href = fullUrl;
    }, 100); // Small delay to ensure cookie clearing
  };

  // Hide header on callback routes to avoid visual flicker/loaders during auth
  if (pathname.includes('/callback')) {
    return null;
  }

  return (
    <>
      <div className="sticky top-0 z-50">
        {/* Beta Warning Bar */}
        <div className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 text-center text-xs md:text-lg font-medium relative z-40">
          <span>{t('beta.notice')}</span>
        </div>
        
        <header
          className={[
            'relative w-full z-30 transition-all duration-300',
            isScrolled
              ? 'bg-[#0F1629]/20 backdrop-blur-sm border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.15)]'
              : 'bg-[#0F1629]'
          ].join(' ')}
        >
          {/* Particles animation - reduced effects */}
          <div style={{ opacity: 0.2 }}>
            <Particles className="absolute inset-0 -z-1" />
          </div>
     

      {/* Illustration */}
   
      
      <div className="mx-auto px-2 sm:px-4 md:px-8 lg:px-12 max-w-full relative z-100">
        <div className="flex items-center justify-between h-16 md:h-20 gap-1 md:gap-2">

          {/* Site branding */}
          <div className="flex-shrink-0 w-[40px] sm:w-[120px] md:w-[140px]">
            <Logo isHomePage={true} />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex flex-1 overflow-visible min-w-0">
            <ul className="flex justify-start items-center w-full gap-0.5 md:gap-1">
              <li>
                <HoverCard  
                  id={`industries-hovercard-${currentLocale}`}
                  position='bottom'
                  radius="sm" shadow="md" withinPortal>
                  <HoverCard.Target>
                    <Link href={`/${currentLocale}/all-industries`}>
                      <button className={` text-white ${textColorClass} font-medium text-xs md:text-sm xl:mx-1 flex items-center group ${isActiveLink('all-industries')}`}>
                        <span className="mr-1">{t('navigation.industries')}</span>
                        <IconChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform duration-200" />
                      </button>
                    </Link>
                  </HoverCard.Target>

                  <HoverCard.Dropdown 
                    style={{background: 'linear-gradient(to right, #1C2F67, #242B6A)', borderColor: '#2F378A'}}
                    className="transition-all duration-300 ease-in-out transform hover:scale-[1.01] shadow-xl"
                  >
                    <Group justify="space-between" px="md" className="transition-colors duration-200 hover:bg-slate-800/20 rounded p-2">
                      <Text fw={500} c='white' className="text-glow">{t('industriesDropdown.featuredTitle')}</Text>
                      <Anchor 
                        href={`/${currentLocale}/all-industries`} 
                        fz="xs" 
                        className="text-blue-300 hover:text-blue-200 transition-all duration-200 hover:underline hover:translate-x-0.5"
                      >
                        {t('industriesDropdown.viewAll')}
                      </Anchor>
                    </Group>

                    <Divider my="sm" color="dark.5" className="opacity-50 hover:opacity-80 transition-opacity duration-200" />

                    <SimpleGrid cols={2} spacing={0}>
                      {industries.map((industry) => (
                        <Link 
                          key={industry.id} 
                          href={`/${currentLocale}/industry/${industry.id}/${industry.slug}`}
                          className="block"
                        >
                          <div className="p-3 rounded transition-all duration-200 industry-nav  hover:shadow-inner hover:translate-y-[-2px] hover:bg-blue-400/50 group">
                            <Group wrap="nowrap" align="flex-start">
                              <div>
                                <Text size="sm" fw={500} c='white' className="group-hover:text-blue-200 transition-colors duration-200">
                                  {industry.name}
                                </Text>
                                <Text size="xs" c="dimmed" className="group-hover:text-slate-300 transition-colors duration-200">
                                  {t('industriesDropdown.exploreText')}
                                </Text>
                              </div>
                            </Group>
                          </div>
                        </Link>
                      ))}
                    </SimpleGrid>

                    <div className="mt-4 p-4 rounded-lg bg-[#010a23] hover:bg-[#0a1432] transition-colors duration-300 transform hover:scale-[1.02] hover:shadow-md">
                      <Group justify="space-between">
                        <div>
                          <Text fw={500} fz="sm" c='white' className="hover:text-blue-100 transition-colors duration-200">
                            {t('industriesDropdown.exploreAllTitle')}
                          </Text>
                          <Text size="xs" c="dimmed" className="hover:text-slate-300 transition-colors duration-200">
                            {t('industriesDropdown.exploreAllDescription')}
                          </Text>
                        </div>
                        <Button 
                          variant="light" 
                          component={Link} 
                          href={`/${currentLocale}/all-industries`}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-200 hover:text-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                          {t('industriesDropdown.browseAll')}
                        </Button>
                      </Group>
                    </div>
                  </HoverCard.Dropdown>
                </HoverCard>
              </li>
              <li>
                <Link className={`font-medium text-xs md:text-sm ${menuTextColorClass} text-white xl:mx-1 ${isActiveLink('data')}`} href={`/${currentLocale}/industries/data`}>{t('navigation.data')}</Link>
              </li>
              <li>
                <Link className={`font-medium text-xs md:text-sm ${menuTextColorClass} text-white xl:mx-1 ${isActiveLink('report')}`} href={`/${currentLocale}/industries/report`}>{t('navigation.reports')}</Link>
              </li>
              <li>
                <Link className={`font-medium text-xs md:text-sm ${menuTextColorClass} text-white xl:mx-1 ${isActiveLink('statistic')}`} href={`/${currentLocale}/industries/statistic`}>{t('navigation.statistics')}</Link>
              </li>
              <li className='md:block hidden'>
                <Link className={`font-medium text-xs md:text-sm ${menuTextColorClass} text-white xl:mx-1 ${isActiveLink('manual')}`} href={`/${currentLocale}/industries/manual`}>{t('navigation.manuals')}</Link>
              </li>
              <li className='md:block hidden'>
                <Link className={`font-medium text-xs md:text-sm ${menuTextColorClass} text-white xl:mx-1 ${isActiveLink('course')}`} href={`/${currentLocale}/industries/course`}>{t('navigation.courses')}</Link>
              </li>
            </ul>
          </nav>

          {/* Header Search Bar */}
          {!shouldHideSearchBar() && (
            <div className="hidden xl:flex items-center mx-4">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <TextInput
                  id={`header-search-${currentLocale}`}
                  placeholder={currentLocale === 'ar' ? 'البحث...' : 'Search...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setSearchQuery('');
                    }
                  }}
                  size="sm"
                  radius="md"
                  className="w-64"
                  // Position search icon based on locale - right for LTR, left for RTL
                  {...(currentLocale === 'ar' 
                    ? { 
                        leftSection: (
                          <button
                            type="submit"
                            className="p-1 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSearchSubmit(e as any);
                            }}
                          >
                            <IconSearch size={16} />
                          </button>
                        )
                      }
                    : { 
                        rightSection: (
                          <button
                            type="submit"
                            className="p-1 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSearchSubmit(e as any);
                            }}
                          >
                            <IconSearch size={16} />
                          </button>
                        )
                      }
                  )}
                  styles={{
                    ...searchInputStyles
                  }}
                />
              </form>
            </div>
          )}

          {/* Desktop sign in links */}
          <ul className="flex justify-end items-center flex-shrink-0">
            {/* Language Switch Button */}
            <li className="mx-1 md:mx-2">
              <div className="flex items-center">
                <button
                  onClick={() => switchLocale(currentLocale === 'en' ? 'ar' : 'en')}
                  className={`flex items-center px-2 md:px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-[#3B8AEF]/20 transition-all duration-300 ease-in-out group`}
                >
                  <IconLanguage size={18} className={`${isScrolled ? 'text-white' : 'text-gray-200'}`} />
                  <span className={`hidden lg:inline text-sm font-medium whitespace-nowrap ml-1 ${isScrolled ? 'text-white' : 'text-gray-200'}`}>
                    {currentLocale === 'en' ? t('language.switchToArabic') : t('language.switchToEnglish')}
                  </span>
                </button>
              </div>
            </li>
            
            {/* Become an Insighter button - only for client role */}
            {user && roles.includes('client') && !roles.includes('insighter') && !roles.includes('company') && !roles.includes('company-insighter') && (
              <li className="mx-1 md:mx-2 hidden lg:block">
                <Link 
                  href={`${ANGULAR_APP_URL}/app/insighter-register/vertical`}
                  className="font-medium text-sm text-white px-2 md:px-3 py-2 rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 ease-in-out whitespace-nowrap"
                >
                  {t('becomeInsighter')}
                </Link>
              </li>
            )}
            
            {/* Mobile search button - only show on smaller screens */}
            {!shouldHideSearchBar() && (
              <li className="xl:hidden mr-1 md:mr-2">
                <button
                  onClick={() => {
                    router.push(`/${currentLocale}/home`);
                  }}
                  className="flex items-center p-2 text-slate-300 hover:text-white hover:bg-[#3B8AEF]/20 rounded-md transition-all duration-200"
                >
                  <IconSearch size={18} />
                </button>
              </li>
            )}
            
            {/* Always reserve space for notification bell */}
            <li className="me-2 md:me-4 flex items-center relative z-20">
              {user ? <NotificationBell /> : ''}
            </li>
            
            {shouldShowAuthSkeleton ? (
              <li className="flex items-center">
                {hasToken ? (
                  <div className="w-10 h-10 bg-white/80 animate-pulse rounded-full overflow-hidden border border-white/20"></div>
                ) : (
                  <div className="h-9 w-24 bg-white/20 animate-pulse rounded-full overflow-hidden border border-white/10"></div>
                )}
              </li>
            ) : user ? (
              <li>
                <UserProfile isHome={true} />
              </li>
            ) : (
              <li>
                <Link className="btn-sm text-slate-300 hover:text-white [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] before:bg-slate-800/30 hover:scale-105 active:scale-95 transition-all duration-150 ease-in-out group relative before:absolute before:inset-0 before:rounded-full before:pointer-events-none" 
                href={`${ANGULAR_APP_URL}/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`}>
                  <span className="relative inline-flex items-center">
                    {t('auth.login')} <span className="tracking-normal text-blue-500 group-hover:translate-x-1 transition-transform duration-150 ease-in-out ml-1">&gt;</span>
                  </span>
                </Link>
              </li>
            )}
          </ul>

          <MobileMenu isHomePage={true} />

        </div>
      </div>
        </header>
      </div>
    </>
  )
}
