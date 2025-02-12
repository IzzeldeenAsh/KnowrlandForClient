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
              <ul className="flex grow justify-start flex-wrap items-center">
                <li>
                  <IndustriesMenu />
                </li>
                <li>
                  <Link className="font-medium text-sm text-gray-600 hover:text-gray-900 mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/industries/report">Reports</Link>
                </li>
                <li>
                  <Link className="font-medium text-sm text-gray-600 hover:text-gray-900 mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/industries/data">Data</Link>
                </li>
                <li>
                  <Link className="font-medium text-sm text-gray-600 hover:text-gray-900 mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/industries/insight">Insights</Link>
                </li>
                <li>
                  <Link className="font-medium text-sm text-gray-600 hover:text-gray-900 mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/industries/manual">Manual</Link>
                </li>
                <li>
                  <Link className="font-medium text-sm text-gray-600 hover:text-gray-900 mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/industries/course">Course</Link>
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
