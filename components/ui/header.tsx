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
    router.push('/', { locale });
  };

  useEffect(() => {
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
  }, []);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <header className="absolute top-0 w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="w-[200px]">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex flex-1">
            <ul className="flex justify-center items-center w-full">
              <li className=''>
                <HoverCard  
                  position='bottom'
                  radius="sm" shadow="md" withinPortal>
                  <HoverCard.Target>
                    <Link href={'/en/all-industries'}>
                      <button className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out flex items-center">
                        <span className="mr-1">{t('navigation.industries')}</span>
                        <IconChevronDown size={16} />
                      </button>
                    </Link>
                  </HoverCard.Target>

                  <HoverCard.Dropdown style={{background: 'linear-gradient(to right, #0f172b, #242B6A)',borderColor: '#2F378A'}}>
                    <Group justify="space-between" px="md">
                      <Text fw={500} c={'white'}>{t('industriesDropdown.featuredTitle')}</Text>
                      <Anchor href="/en/all-industries" fz="xs" className="text-blue-300">
                        {t('industriesDropdown.viewAll')}
                      </Anchor>
                    </Group>

                    <Divider my="sm" />

                    <SimpleGrid cols={2} spacing={0}>
                      {industries.map((industry) => (
                        <Link 
                          key={industry.id} 
                          href={`/en/industry/${industry.id}/${industry.slug}`}
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
                          href="/en/all-industries"
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          {t('industriesDropdown.browseAll')}
                        </Button>
                      </Group>
                    </div>
                  </HoverCard.Dropdown>
                </HoverCard>
              </li>
              <li className=''>
                <Link className="font-medium text-sm text-gray-200 hover:text-gray-100 mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/en/industries/report">{t('navigation.reports')}</Link>
              </li>
              <li className=''>
                <Link className="font-medium text-sm text-gray-200 hover:text-gray-100 mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/en/industries/data">{t('navigation.data')}</Link>
              </li>
              <li className=''>
                <Link className="font-medium text-sm text-gray-200 hover:text-gray-100 mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/en/industries/insight">{t('navigation.insights')}</Link>
              </li>
              <li className=''>
                <Link className="font-medium text-sm text-gray-200 hover:text-gray-100 mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/en/industries/manual">{t('navigation.manuals')}</Link>
              </li>
              <li className=''>
                <Link className="font-medium text-sm text-gray-200 hover:text-gray-100 mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/en/industries/course">{t('navigation.courses')}</Link>
              </li>
            </ul>
          </nav>

          {/* Desktop sign in links */}
          <ul className="w-[200px] flex justify-end items-center">
            {/* Language Switch Button */}
            <li className="mx-4">
              <div className="flex items-center">
                <button
                  onClick={() => switchLocale(pathname.split('/')[1] === 'en' ? 'ar' : 'en')}
                  className="flex items-center text-slate-300 hover:text-white transition duration-150 ease-in-out"
                >
                  <IconLanguage size={20} className="mx-1" />
                  <span className="text-sm font-medium">
                    {pathname.split('/')[1] === 'en' ? t('language.switchToArabic') : t('language.switchToEnglish')}
                  </span>
                </button>
              </div>
            </li>
            
            {isLoading ? (
              <div className="w-16 h-8 bg-slate-700/30 animate-pulse rounded"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <UserProfile />
              </div>
            ) : (
              <>
                <li className="ml-6">
                  <Link className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none" href="https://foresighta.vercel.app/auth/login">
                    <span className="relative inline-flex items-center">
                      {t('auth.login')} <span className="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out mx-1">-&gt;</span>
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
