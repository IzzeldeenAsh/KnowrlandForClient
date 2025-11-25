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
import { startNotificationPolling, stopNotificationPolling } from '@/services/notifications.service';

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
const { isLoading: isAppLoading, setIsLoading: setAppLoading } = useLoading();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useTranslations('Header');
  
  // Use the centralized user profile hook
  const { user, roles, isLoading, handleSignOut } = useUserProfile();
  
  // Always use dark style with white text, as requested
  const textColorClass = 'text-slate-300 hover:text-white transition-all duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-slate-700/50';
  const menuTextColorClass = 'text-gray-200 hover:text-gray-100 transition-all duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-[#3B8AEF]/20';

  // Handle search submission
  const handleSearch = (query: string, searchType: 'knowledge' | 'insighter' = 'knowledge') => {
    const searchParams = new URLSearchParams();
    if (query.trim()) {
      searchParams.set('keyword', query.trim());
    }
    searchParams.set('search_type', searchType);
    
    // Navigate to the search page with parameters - router already handles locale
    router.push(`/${pathname.split('/')[1]}/home?${searchParams.toString()}`);
    setSearchQuery('');
  };

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
      const data = await getIndustries(pathname.split('/')[1] || 'en');
      setIndustries(data);
    };

    loadIndustries();
  }, [pathname]);

  // Start notification polling when user is logged in
  useEffect(() => {
    if (user) {
      const currentLocale = pathname.split('/')[1] || 'en';
      startNotificationPolling(currentLocale);
      
      // Cleanup on unmount or when user logs out
      return () => {
        stopNotificationPolling();
      };
    }
  }, [user, pathname]);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  // Helper function to clear duplicate cookies
  const clearDuplicateCookies = (cookieName: string) => {
    const isProduction = typeof window !== 'undefined' && window.location.hostname.includes('insightabusiness.com');

    // Clear all possible variations of the cookie to prevent duplicates
    const clearVariations = [
      // Local variation
      `${cookieName}=; Path=/; Max-Age=-1`,
      // Production domain variation
      `${cookieName}=; Domain=.insightabusiness.com; Path=/; Max-Age=-1; Secure; SameSite=None`,
      // Fallback without domain
      `${cookieName}=; Path=/; Max-Age=-1; ${isProduction ? 'Secure; SameSite=None' : 'SameSite=Lax'}`
    ];

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
      const isProduction = typeof window !== 'undefined' && window.location.hostname.includes('insightabusiness.com');
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1); // 1 year from now

      const cookieParts = [
        `preferred_language=${locale}`,
        `Path=/`,                       // send on all paths
        `Expires=${expirationDate.toUTCString()}`, // Use Expires for better Safari/Firefox compatibility
        `Max-Age=${60 * 60 * 24 * 365}`,// one year (keeping both for compatibility)
        `SameSite=Lax`                  // prevent CSRF, still send on top-level nav
      ];

      if (isProduction) {
        cookieParts.push(`Domain=.insightabusiness.com`); // leading dot = include subdomains
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
      {/* Beta Warning Bar */}
      <div className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 text-center text-xs md:text-lg font-medium relative z-40">
        <span>{t('beta.notice')}</span>
      </div>
      
      <header className="relative w-full z-30 bg-[#0F1629]">
        {/* Particles animation - reduced effects */}
        <div style={{opacity: 0.2}}>
        <Particles 
          className="absolute inset-0 -z-1" 
        
        />
        </div>
     

      {/* Illustration */}
   
      
      <div className="mx-auto px-4 sm:px-12 max-w-full relative z-10">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="flex-shrink-0 w-[40px] sm:w-[120px] md:w-[140px]">
            <Logo isHomePage={true} />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex flex-1 overflow-visible">
            <ul className="flex justify-start items-center w-full">
              <li>
                <HoverCard  
                  position='bottom'
                  radius="sm" shadow="md" withinPortal>
                  <HoverCard.Target>
                    <Link href={`/${pathname.split('/')[1]}/all-industries`}>
                      <button className={`font-medium text-sm ${textColorClass}  xl:mx-1 flex items-center group ${isActiveLink('all-industries')}`}>
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
                        href={`/${pathname.split('/')[1]}/all-industries`} 
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
                          href={`/${pathname.split('/')[1]}/industry/${industry.id}/${industry.slug}`}
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
                          href={`/${pathname.split('/')[1]}/all-industries`}
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
                <Link className={`font-medium text-sm ${menuTextColorClass}  xl:mx-1 ${isActiveLink('data')}`} href={`/${pathname.split('/')[1]}/industries/data`}>{t('navigation.data')}</Link>
              </li>
              <li>
                <Link className={`font-medium text-sm ${menuTextColorClass}  xl:mx-1 ${isActiveLink('report')}`} href={`/${pathname.split('/')[1]}/industries/report`}>{t('navigation.reports')}</Link>
              </li>
              <li>
                <Link className={`font-medium text-sm ${menuTextColorClass}  xl:mx-1 ${isActiveLink('statistic')}`} href={`/${pathname.split('/')[1]}/industries/statistic`}>{t('navigation.statistics')}</Link>
              </li>
              <li className='lg:block hidden'>
                <Link className={`font-medium text-sm ${menuTextColorClass}  xl:mx-1 ${isActiveLink('manual')}`} href={`/${pathname.split('/')[1]}/industries/manual`}>{t('navigation.manuals')}</Link>
              </li>
              <li className='lg:block hidden'>
                <Link className={`font-medium text-sm ${menuTextColorClass}  xl:mx-1 ${isActiveLink('course')}`} href={`/${pathname.split('/')[1]}/industries/course`}>{t('navigation.courses')}</Link>
              </li>
            </ul>
          </nav>

          {/* Header Search Bar */}
          {!shouldHideSearchBar() && (
            <div className="hidden xl:flex items-center mx-4">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <TextInput
                  placeholder={pathname.split('/')[1] === 'ar' ? 'البحث...' : 'Search...'}
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
                  {...(pathname.split('/')[1] === 'ar' 
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
                    input: {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      direction: pathname.split('/')[1] === 'ar' ? 'rtl' : 'ltr',
                      '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.6)',
                      },
                      '&:focus': {
                        borderColor: '#3B8AEF',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      }
                    },
                    section: {
                      color: 'rgba(255, 255, 255, 0.6)',
                    }
                  }}
                />
              </form>
            </div>
          )}

          {/* Desktop sign in links */}
          <ul className="flex justify-end items-center flex-shrink-0">
            {/* Language Switch Button */}
            <li className="mx-2 ">
              <div className="flex items-center">
                <button
                  onClick={() => switchLocale(pathname.split('/')[1] === 'en' ? 'ar' : 'en')}
                  className={`mx-2 flex items-center px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-[#3B8AEF]/20 transition-all duration-300 ease-in-out group`}
                >
                  <IconLanguage size={18} className="mx-1 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-sm md:text-sm font-medium whitespace-nowrap">
                    {pathname.split('/')[1] === 'en' ? t('language.switchToArabic') : t('language.switchToEnglish')}
                  </span>
                </button>
              </div>
            </li>
            
            {/* Mobile search button - only show on smaller screens */}
            {!shouldHideSearchBar() && (
              <li className="xl:hidden mr-2">
                <button
                  onClick={() => {
                    router.push(`/${pathname.split('/')[1]}/home`);
                  }}
                  className="flex items-center p-2 text-slate-300 hover:text-white hover:bg-[#3B8AEF]/20 rounded-md transition-all duration-200"
                >
                  <IconSearch size={18} />
                </button>
              </li>
            )}
            
            {/* Always reserve space for notification bell */}
            <li className="me-4 flex items-center relative z-20">
              {user ? <NotificationBell /> : ''}
            </li>
            
            {isLoading ? (
              <div className="w-10 h-10 bg-white animate-pulse rounded-full overflow-hidden border border-gray-200"></div>
            ) : user ? (
              <li>
                <UserProfile isHome={true} />
              </li>
            ) : (
              <li>
                <Link className="btn-sm text-slate-300 hover:text-white [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] before:bg-slate-800/30 hover:scale-105 active:scale-95 transition-all duration-150 ease-in-out group relative before:absolute before:inset-0 before:rounded-full before:pointer-events-none" 
                href={`http://localhost:4200/auth/login?returnUrl=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}>
                  <span className="relative inline-flex items-center">
                    {t('auth.login')} <span className="tracking-normal text-blue-500 group-hover:translate-x-1 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </span>
                </Link>
              </li>
            )}
          </ul>

          <MobileMenu isHomePage={true} />

        </div>
      </div>
    </header>
    </>
  )
}
