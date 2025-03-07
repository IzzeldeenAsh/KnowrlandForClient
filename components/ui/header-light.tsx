"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../../public/images/KNOLDG-LOGO-26.png";
import { IndustriesMenu } from "./header/components/IndustriesMenu";
import { UserProfile } from "./header/components/UserProfile";
import Image from "next/image";
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const toggleButton = document.getElementById('mobile-menu-toggle');
      
      if (sidebar && 
          !sidebar.contains(event.target as Node) && 
          toggleButton && 
          !toggleButton.contains(event.target as Node) && 
          isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 z-30 w-full">
      <div className="mx-auto">
        <div className="relative flex h-14 items-center justify-between gap-3 bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm">
          <div className="flex flex-1 items-center">
          <Link href="/en/home">
            <Image src={Logo} alt="Logo" width={120} height={60} priority className="mx-5" />
          </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:grow">
              <ul className="flex grow justify-start flex-wrap items-center">
                <li>
                  <IndustriesMenu />
                </li>
                <li className="relative group">    
                  <Link className="font-medium text-xs text-gray-600 hover:text-blue-500 hover:bg-gray-100 px-3.5 py-2.5 rounded-md transition duration-150 ease-in-out" href="/en/industries/report">Reports</Link>
                </li>
                <li className="relative group">
                  <Link className="font-medium text-xs text-gray-600 hover:text-blue-500 hover:bg-gray-100 px-3.5 py-2.5 rounded-md transition duration-150 ease-in-out" href="/en/industries/data">Data</Link>
                </li>
                <li className="relative group">
                  <Link className="font-medium text-xs text-gray-600 hover:text-blue-500 hover:bg-gray-100 px-3.5 py-2.5 rounded-md transition duration-150 ease-in-out" href="/en/industries/insight">Insights</Link>
                </li>
                <li className="relative group">
                  <Link className="font-medium text-xs text-gray-600 hover:text-blue-500 hover:bg-gray-100 px-3.5 py-2.5 rounded-md transition duration-150 ease-in-out" href="/en/industries/manual">Manual</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-500 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <UserProfile isHome={false} />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div 
        id="mobile-sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
      >
        <div className="flex items-center justify-center h-14 border-b border-gray-100">
          <Image src={Logo} alt="Logo" width={100} height={50} priority />
        </div>
        <nav className="mt-5">
          <ul className="space-y-2 px-3">
            <li className="py-2">
              <div className="mb-3">
                <span className="font-medium text-sm text-gray-800 block px-3 py-2">Industries</span>
                <Link 
                  href="/en/all-industries" 
                  className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  View All Industries
                </Link>
              </div>
            </li>
            <li>
              <Link 
                href="/en/industries/report" 
                className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-500 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reports
              </Link>
            </li>
            <li>
              <Link 
                href="/en/industries/data" 
                className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-500 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Data
              </Link>
            </li>
            <li>
              <Link 
                href="/en/industries/insight" 
                className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-500 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Insights
              </Link>
            </li>
            <li>
              <Link 
                href="/en/industries/manual" 
                className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-500 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Manual
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
