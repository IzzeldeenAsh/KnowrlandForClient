"use client";

import Link from "next/link";
import Logo from "./logo";
import { IndustriesMenu } from "./header/components/IndustriesMenu";
import { UserProfile } from "./header/components/UserProfile";

export default function Header() {
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm">
        <div className="flex flex-1 items-center">
            <Logo />
            <nav className="hidden md:flex md:grow">
              <ul className="flex grow justify-center flex-wrap items-center ">
                <li>
                  <IndustriesMenu />
                </li>
                <li className="mx-4 lg:mx-5 relative group  separator">    
                  <Link className="font-medium text-sm text-gray-600 hover:text-blue-500 transition duration-150 ease-in-out" href="/en/industries/report">Reports</Link>
               
                </li>
                <li className="mx-4 lg:mx-5 relative group separator">
                  <Link className="font-medium text-sm text-gray-600 hover:text-blue-500 transition duration-150 ease-in-out" href="/en/industries/data">Data</Link>
               
                </li>
                <li className="mx-4 lg:mx-5 relative group separator">
                  <Link className="font-medium text-sm text-gray-600 hover:text-blue-500 transition duration-150 ease-in-out" href="/en/industries/insight">Insights</Link>
               
                </li>
                <li className="mx-4 lg:mx-5 relative group separator">
                  <Link className="font-medium text-sm text-gray-600 hover:text-blue-500 transition duration-150 ease-in-out" href="/en/industries/manual">Manual</Link>
               
                </li>

              </ul>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
}
