'use client'
import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import { useEffect, useState } from 'react'
import {IconChevronDown, IconLanguage } from '@tabler/icons-react'
import { HoverCard, Group, Text, Anchor, Divider, SimpleGrid, Button } from '@mantine/core'
import { UserProfile } from './header/components/UserProfile'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/i18n/routing'
import AppLoader from './AppLoader'
import { useLoading } from '@/components/context/LoadingContext'
import Particles from '@/components/particles'
import Image from 'next/image'
import Illustration from '@/public/images/glow-bottom-blue.svg'

// Add CSS for text glow effect
import './text-glow.css'

interface User {
  name: string;
  profile_photo_url: string | null;
  first_name: string;
  last_name: string;
  email: string;
}

interface Industry {
  id: number;
  name: string;
  slug: string;
  children?: Industry[];
}

async function getIndustries(locale: string = 'en') {
  const res = await fetch("https://api.knoldg.com/api/industries/menu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": locale,
    },
    body: JSON.stringify({
      top_industry: 6,
      top_sub_industry: 6,
    }),
  });

  if (!res.ok) {
    return [];
  }

  const json = await res.json();
  return json.data as Industry[];
}

export default function Header() {
  const t = useTranslations('Header');
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoading: isAppLoading, setIsLoading: setAppLoading } = useLoading();
  const pathname = usePathname();
  const router = useRouter();
  
  // Always use dark style with white text, as requested
  const textColorClass = 'text-slate-300 hover:text-white transition-all duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-slate-700/50';
  const menuTextColorClass = 'text-gray-200 hover:text-gray-100 transition-all duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-[#3B8AEF]/20';

  // Add active link styling function
  const isActiveLink = (path: string): string => {
    // Split the pathname into segments
    const pathSegments = pathname.split('/');
    // Get the last segment or check against specific routes
    const currentPath = pathSegments[pathSegments.length - 1] || pathSegments[pathSegments.length - 2];
    
    // Check for exact match in segment or specific path cases
    if (currentPath === path || 
        (path === 'insight' && currentPath === 'insight') || 
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
    // Get preferred language from cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    // Check if user has a preferred language cookie that's different from current
    const preferredLanguage = getCookie('preferred_language');
    const currentLanguage = pathname.split('/')[1];
    
    if (preferredLanguage && preferredLanguage !== currentLanguage) {
      // Automatically switch to preferred language
      switchLocale(preferredLanguage);
    }

    const fetchProfile = async () => {
      // Try to get token from localStorage
      const token = localStorage.getItem('token');
      
      setIsLoading(true);
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('https://api.knoldg.com/api/account/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": pathname.split('/')[1] || 'en',
          }
        });

        if (response.status === 401) {
          // Handle unauthorized - token expired or invalid
          console.log('Session expired or unauthorized access');
          handleSignOut();
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setRoles(data.data.roles);
        const userData = {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          profile_photo_url: data.data.profile_photo_url,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchIndustries = async () => {
      const data = await getIndustries(pathname.split('/')[1] || 'en');
      setIndustries(data);
    };

    // Try to get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    fetchProfile();
    fetchIndustries();
  }, [pathname, router]);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const handleSignOut = () => {
    // Clear localStorage in current app
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Get the current locale for the redirect
    const locale = pathname.split('/')[1] || 'en';
    
    // Create a logout timestamp to prevent caching issues
    const timestamp = new Date().getTime();
    
    // Perform a coordinated logout by redirecting to the Angular app's logout endpoint
    window.location.href = `https://app.knoldg.com/auth/logout?redirect_uri=${encodeURIComponent(`https://knoldg.com/${locale}?t=${timestamp}`)}`;    
  };

  // Function to switch locale
  const switchLocale = (locale: string) => {
    // Set loading state before switching locale
    setAppLoading(true);
    
    // Store current locale in localStorage before switching
    localStorage.setItem('preferred_language', locale);
    
    // Set the language preference in a cookie - expires in 1 year
    document.cookie = `preferred_language=${locale}; max-age=${60 * 60 * 24 * 365}; path=/;`;
    
    // Get the current path without locale prefix
    const currentPath = pathname.split('/').slice(2).join('/');
    
    // Navigate to the same route with the new locale
    // If we're on the home page (or empty path), just use '/'
    const newPath = currentPath ? `/${currentPath}` : '/';
    
    // Force a complete page reload to prevent client-side errors
    // This ensures all components are properly re-rendered with the new locale
    window.location.href = `/${locale}${newPath}`;
  };

  return (
    <header className="relative w-full z-30 bg-[#0F1629]">
      {/* Particles animation - reduced effects */}
      <div style={{opacity: 0.2}}>
      <Particles 
        className="absolute inset-0 -z-1" 
      
      />
      </div>
     

      {/* Illustration */}
   
      
      <div className="mx-auto px-4 sm:px-6 max-w-full overflow-hidden relative z-30">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="flex-shrink-0 w-[140px]">
            <Logo isHomePage={true} />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex flex-1 overflow-hidden">
            <ul className="flex justify-center items-center w-full">
              <li>
                <HoverCard  
                  position='bottom'
                  radius="sm" shadow="md" withinPortal>
                  <HoverCard.Target>
                    <Link href={`/${pathname.split('/')[1]}/all-industries`}>
                      <button className={`font-medium text-sm ${textColorClass} mx-1 lg:mx-2 flex items-center group ${isActiveLink('all-industries')}`}>
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
                <Link className={`font-medium text-sm ${menuTextColorClass} mx-1 lg:mx-2 ${isActiveLink('report')}`} href={`/${pathname.split('/')[1]}/industries/report`}>{t('navigation.reports')}</Link>
              </li>
              <li>
                <Link className={`font-medium text-sm ${menuTextColorClass} mx-1 lg:mx-2 ${isActiveLink('data')}`} href={`/${pathname.split('/')[1]}/industries/data`}>{t('navigation.data')}</Link>
              </li>
              <li>
                <Link className={`font-medium text-sm ${menuTextColorClass} mx-1 lg:mx-2 ${isActiveLink('insight')}`} href={`/${pathname.split('/')[1]}/industries/insight`}>{t('navigation.insights')}</Link>
              </li>
              <li className='lg:block hidden'>
                <Link className={`font-medium text-sm ${menuTextColorClass} mx-1 lg:mx-2 ${isActiveLink('manual')}`} href={`/${pathname.split('/')[1]}/industries/manual`}>{t('navigation.manuals')}</Link>
              </li>
              <li className='lg:block hidden'>
                <Link className={`font-medium text-sm ${menuTextColorClass} mx-1 lg:mx-2 ${isActiveLink('course')}`} href={`/${pathname.split('/')[1]}/industries/course`}>{t('navigation.courses')}</Link>
              </li>
            </ul>
          </nav>

          {/* Desktop sign in links */}
          <ul className="flex justify-end items-center flex-shrink-0">
            {/* Language Switch Button */}
            <li className="mr-2 md:mr-4">
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
            
            {isLoading ? (
              <div className="w-10 h-10 bg-white animate-pulse rounded-full overflow-hidden border border-gray-200"></div>
            ) : user ? (
              <li>
                <UserProfile isHome={true} />
              </li>
            ) : (
              <li>
                <Link className="btn-sm text-slate-300 hover:text-white [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] before:bg-slate-800/30 hover:scale-105 active:scale-95 transition-all duration-150 ease-in-out group relative before:absolute before:inset-0 before:rounded-full before:pointer-events-none" href="https://app.knoldg.com/auth/login">
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
  )
}
