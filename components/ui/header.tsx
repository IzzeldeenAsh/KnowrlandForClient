import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import {IconChevronDown, IconLanguage } from '@tabler/icons-react'
import { HoverCard, Group, Text, Anchor, Divider, SimpleGrid, Button } from '@mantine/core'
import { UserProfile } from './header/components/UserProfile'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/i18n/routing'

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

async function getIndustries() {
  const res = await fetch("https://api.foresighta.co/api/industries/menu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": "en",
    },
    body: JSON.stringify({
      top_industry: 6,
      top_sub_industry: 2,
    }),
    cache: "force-cache",
    next: { revalidate: 3600 },
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
  const pathname = usePathname();
  const router = useRouter();

  // Function to switch locale
  const switchLocale = (locale: string) => {
    // Set the language preference in a cookie - expires in 1 year
    document.cookie = `preferred_language=${locale}; max-age=${60 * 60 * 24 * 365}; path=/;`;
    
    // Get the current path without locale prefix
    const currentPath = pathname.split('/').slice(2).join('/');
    
    // Navigate to the same route with the new locale
    // If we're on the home page (or empty path), just use '/'
    const newPath = currentPath ? `/${currentPath}` : '/';
    router.push(newPath, { locale });
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
      const token = localStorage.getItem('token');
      setIsLoading(true);
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('https://api.foresighta.co/api/account/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": "en",
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
      const data = await getIndustries();
      setIndustries(data);
    };

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
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear any auth cookies that might exist
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <header className="absolute top-0 w-full z-30">
      <div className="mx-auto px-4 sm:px-6 max-w-full overflow-hidden">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="flex-shrink-0 w-[140px]">
            <Logo />
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
                      <button className="font-medium text-sm text-slate-300 hover:text-white mx-2 lg:mx-4 transition duration-150 ease-in-out flex items-center">
                        <span className="mr-1">{t('navigation.industries')}</span>
                        <IconChevronDown size={16} />
                      </button>
                    </Link>
                  </HoverCard.Target>

                  <HoverCard.Dropdown style={{background: 'linear-gradient(to right, #0f172b, #242B6A)',borderColor: '#2F378A'}}>
                    <Group justify="space-between" px="md">
                      <Text fw={500} c={'white'}>{t('industriesDropdown.featuredTitle')}</Text>
                      <Anchor href={`/${pathname.split('/')[1]}/all-industries`} fz="xs" className="text-blue-300">
                        {t('industriesDropdown.viewAll')}
                      </Anchor>
                    </Group>

                    <Divider my="sm" />

                    <SimpleGrid cols={2} spacing={0}>
                      {industries.map((industry) => (
                        <Link 
                          key={industry.id} 
                          href={`/${pathname.split('/')[1]}/industry/${industry.id}/${industry.slug}`}
                          className="block"
                        >
                          <div className="p-3 rounded transition-colors industry-nav hover:bg-slate-800/50">
                            <Group wrap="nowrap" align="flex-start">
                              <div>
                                <Text size="sm" fw={500} c={'white'}>
                                  {industry.name}
                                </Text>
                                <Text size="xs" c="dimmed">
                                  {t('industriesDropdown.exploreText')}
                                </Text>
                              </div>
                            </Group>
                          </div>
                        </Link>
                      ))}
                    </SimpleGrid>

                    <div className="mt-4 p-4 rounded-lg" style={{backgroundColor: '#2F378A'}}>
                      <Group justify="space-between">
                        <div>
                          <Text fw={500} fz="sm" c={'white'}>
                            {t('industriesDropdown.exploreAllTitle')}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {t('industriesDropdown.exploreAllDescription')}
                          </Text>
                        </div>
                        <Button 
                          variant="light" 
                          component={Link} 
                          href={`/${pathname.split('/')[1]}/all-industries`}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          {t('industriesDropdown.browseAll')}
                        </Button>
                      </Group>
                    </div>
                  </HoverCard.Dropdown>
                </HoverCard>
              </li>
              <li>
                <Link className="font-medium text-sm text-gray-200 hover:text-gray-100 mx-2 lg:mx-4 transition duration-150 ease-in-out" href={`/${pathname.split('/')[1]}/industries/report`}>{t('navigation.reports')}</Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-gray-200 hover:text-gray-100 mx-2 lg:mx-4 transition duration-150 ease-in-out" href={`/${pathname.split('/')[1]}/industries/data`}>{t('navigation.data')}</Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-gray-200 hover:text-gray-100 mx-2 lg:mx-4 transition duration-150 ease-in-out" href={`/${pathname.split('/')[1]}/industries/insight`}>{t('navigation.insights')}</Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-gray-200 hover:text-gray-100 mx-2 lg:mx-4 transition duration-150 ease-in-out" href={`/${pathname.split('/')[1]}/industries/manual`}>{t('navigation.manuals')}</Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-gray-200 hover:text-gray-100 mx-2 lg:mx-4 transition duration-150 ease-in-out" href={`/${pathname.split('/')[1]}/industries/course`}>{t('navigation.courses')}</Link>
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
                  className="mx-2 flex items-center text-slate-300 hover:text-white transition duration-150 ease-in-out"
                >
                  <IconLanguage size={18} className="mx-1" />
                  <span className="text-sm md:text-sm font-medium whitespace-nowrap">
                    {pathname.split('/')[1] === 'en' ? t('language.switchToArabic') : t('language.switchToEnglish')}
                  </span>
                </button>
              </div>
            </li>
            
            {isLoading ? (
              <div className="w-16 h-8 bg-slate-700/30 animate-pulse rounded"></div>
            ) : user ? (
              <li>
                <UserProfile isHome={true} />
              </li>
            ) : (
              <li>
                <Link className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none" href="https://foresighta.vercel.app/auth/login">
                  <span className="relative inline-flex items-center">
                    {t('auth.login')} <span className="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </span>
                </Link>
              </li>
            )}
          </ul>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
