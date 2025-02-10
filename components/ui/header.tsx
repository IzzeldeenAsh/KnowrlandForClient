import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface User {
  name: string;
  profile_photo_url: string | null;
  first_name: string;
  last_name: string;
  email: string;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

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
      }
    };

    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchProfile();
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
          <div className="flex-1">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
            <ul className="flex grow justify-center flex-wrap items-center">
              <li>
                <Link className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/home">Home</Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/all-industries">Industries</Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/pricing">Lorem</Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/customers">Lorem</Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/changelog">Lorem</Link>
              </li>
            </ul>
          </nav>

          {/* Desktop sign in links */}
          <ul className="flex-1 flex justify-end items-center">
            {user ? (
              <li className="relative group">
                <div className="flex items-center cursor-pointer">
                  {user.profile_photo_url ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <Image
                        src={user.profile_photo_url}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                      {getInitials(user.first_name, user.last_name)}
                    </div>
                  )}
                </div>

                {/* Profile Dropdown Menu */}
                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute right-0 mt-2 w-100 bg-white rounded-lg shadow-lg py-2 z-50 transition-all duration-300 ease-in-out">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      {user.profile_photo_url ? (
                        <div className="w-10 h-10 rounded-lg overflow-hidden">
                          <Image
                            src={user.profile_photo_url}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                          {getInitials(user.first_name, user.last_name)}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.first_name} {user.last_name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    <Link
                      href="https://foresighta.vercel.app/app/profile/overview"
                      className="block px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                    {roles.includes('insighter') && (
                      <>
                        <div className="relative group/dashboard">
                          <Link href="https://foresighta.vercel.app/app/insighter-dashboard/my-dashboard">
                            <div className="block px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                              Dashboard
                              <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </Link>
                          <div className="absolute left-full top-0 ml-0.5 invisible group-hover/dashboard:visible opacity-0 group-hover/dashboard:opacity-100 transition-all duration-200 ease-in-out">
                            <div className="bg-white rounded-lg shadow-lg py-2 w-48">
                              <Link href="https://foresighta.vercel.app/app/insighter-dashboard/my-knowledge/general" className="block px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-gray-100">
                                General
                              </Link>
                              <Link href="https://foresighta.vercel.app/app/insighter-dashboard/my-knowledge/scheduled" className="block px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-gray-100">
                                Scheduled
                              </Link>
                              <Link href="https://foresighta.vercel.app/app/insighter-dashboard/my-knowledge/posted" className="block px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-gray-100">
                                Posted
                              </Link>
                              <Link href="https://foresighta.vercel.app/app/insighter-dashboard/my-knowledge/packages" className="block px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-gray-100">
                                Packages
                              </Link>
                            </div>
                          </div>
                        </div>
                        <Link
                          href="https://foresighta.vercel.app/app/add-knowledge/stepper"
                          className="block px-4 py-2 text-sm font-semibold text-sky-600 hover:bg-gray-100"
                        >
                         + Add Knowledge
                        </Link>
                      </>
                    )}
        
                    <div className="relative group/settings">
                      <div className="block px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                        Account Settings
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                      <div className="absolute left-full top-0 ml-0.5 invisible group-hover/settings:visible opacity-0 group-hover/settings:opacity-100 transition-all duration-200 ease-in-out">
                        <div className="bg-white rounded-lg shadow-lg py-2 w-48">
                          <Link href="https://foresighta.vercel.app/app/profile/settings/personal-info" className="block px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-gray-100">
                            Personal Info
                          </Link>
                          <Link href="https://foresighta.vercel.app/app/profile/settings/reset-password" className="block px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-gray-100">
                            Reset Password
                          </Link>
                           {roles.includes('insighter') && (
                            <Link href="https://foresighta.vercel.app/app/insighter-dashboard/account-settings/general-settings" className="block px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-gray-100">
                              Settings
                            </Link>
                          )}
                        </div>
                      </div>
                      
                    </div>
                    {roles.includes('client') && (
                      <Link
                        href="https://foresighta.vercel.app/app/insighter-register/vertical"
                        className="block px-4 py-2 text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 "
                      >
                        Become an Insighter
                      </Link>
                    )}
                    <div className="border-t border-slate-100">
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ) : (
              <>
                <li>
                  <Link className="font-medium text-sm text-slate-300 hover:text-white whitespace-nowrap transition duration-150 ease-in-out" href="https://foresighta.vercel.app/auth/login">Sign in</Link>
                </li>
                <li className="ml-6">
                  <Link className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none" href="https://foresighta.vercel.app/auth/sign-up">
                    <span className="relative inline-flex items-center">
                      Sign up <span className="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
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
