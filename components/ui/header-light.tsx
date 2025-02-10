"use client";

import Link from "next/link";
import Logo from "./logo";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Industry {
  id: number;
  name: string;
  slug: string;
  children?: Industry[];
}

interface User {
  name: string;
  profile_photo_url: string | null;
  first_name: string;
  last_name: string;
  email: string;
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
      top_industry: 5,
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
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchIndustries = async () => {
      const data = await getIndustries();
      setIndustries(data);
    };
    fetchIndustries();

    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          "https://api.foresighta.co/api/account/profile",
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Accept-Language": "en",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
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

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchProfile();
  }, []);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm">
          <div className="flex flex-1 items-center">
            <Logo />
            <div className="relative ml-4">
              <div className="group inline-block relative">
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  Industries
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-150"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="hidden group-hover:block absolute top-full left-0 z-[108] p-0 min-w-[800px]">
                  <div className="px-4 lg:px-0 bg-white shadow-xl ring-1 ring-black ring-opacity-5 rounded-lg">
                    <div className="py-4 lg:py-8 lg:px-7">
                      <div
                        id="industries"
                        role="tabpanel"
                        className="lg:w-[800px]"
                      >
                        <div className="flex flex-wrap -mx-4">
                          <div className="w-full lg:w-5/12 px-4">
                            <div className="mb-6 lg:mb-0">
                              <h4 className="ml-4 text-base font-bold mb-3">
                                Industries
                              </h4>
                              {industries.map((industry) => (
                                <div key={industry.id}>
                                  <Link
                                    href={`/industry/${industry.id}/${industry.slug}`}
                                    className="block border-b border-gray-200 px-4 py-2 text-sm hover:bg-blue-50 transition-colors"
                                  >
                                    <span className="text-gray-700 hover:text-gray-900">
                                      {industry.name}
                                    </span>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="w-full lg:w-7/12 px-4">
                            <div
                              className="flex flex-col justify-between items-center gap-5 pt-10 px-5 min-h-[250px] rounded shadow relative overflow-hidden"
                              style={{
                                backgroundSize: "cover",
                                backgroundPosition: "center top 1.3rem",
                                backgroundRepeat: "no-repeat",
                                backgroundImage:
                                  "url(https://res.cloudinary.com/dsiku9ipv/image/upload/v1739029302/bg-5_ldbnui.png)",
                              }}
                            >
                              <div className="text-center">
                                <h4 className="text-gray-900 font-bold mb-2">
                                  Explore All Industries
                                  <br />
                                  Discover Endless Opportunities
                                </h4>
                                <span className="block text-gray-600 text-sm mb-5">
                                  Browse through various sectors and find the
                                  perfect match for your business needs.
                                </span>
                                <Link
                                  href="/all-industries"
                                  className="inline-block bg-blue-500 text-white text-xs px-3 py-2 rounded hover:bg-blue-600"
                                >
                                  Explore Now
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User profile or sign in/up links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group">
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
                    <div className="flex items-center flex-1 gap-3">
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
                        <p className="text-sm font-bold text-gray-900">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs font-semibold text-gray-400">{user.email}</p>
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
              </div>
            ) : (
              <>
                <Link
                  href="https://foresighta.vercel.app/auth/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  href="https://foresighta.vercel.app/auth/sign-up"
                  className="btn-sm bg-gray-800 text-gray-200 shadow hover:bg-gray-900"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
