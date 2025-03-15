import Link from "next/link";
import Image from "next/image";
import { useUserProfile } from "../hooks/useUserProfile";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
};

interface MenuPosition {
  top: number;
  left: number | null;
  right: number | null;
}

export function UserProfile({ isHome }: { isHome: boolean }) {
  const { user, roles, isLoading, handleSignOut } = useUserProfile();
  const pathname = usePathname();
  const isRtl = pathname.startsWith("/ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    top: 0,
    left: null,
    right: null,
  });

  // Calculate and update menu position whenever it opens
  useEffect(() => {
    if (menuOpen && profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // For smaller screens, center the menu
      if (viewportWidth < 640) {
        setMenuPosition({
          top: rect.bottom + window.scrollY,
          left: Math.max(10, viewportWidth / 2 - 150),
          right: null,
        });
      } else {
        // For larger screens, align with profile button
        if (isRtl) {
          setMenuPosition({
            top: rect.bottom + window.scrollY,
            left: Math.max(10, rect.left),
            right: null,
          });
        } else {
          setMenuPosition({
            top: rect.bottom + window.scrollY,
            left: null,
            right: Math.max(10, viewportWidth - rect.right),
          });
        }
      }
    }
  }, [menuOpen, isRtl]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
        setDashboardOpen(false);
        setSettingsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle escape key to close menu
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [menuOpen]);

  if (isLoading) {
    return <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>;
  }

  if (!user) {
    return (
      <>
        <Link
          href="https://app.knoldg.com/auth/login"
          className="btn-sm bg-gray-800 text-gray-200 shadow hover:bg-gray-900"
        >
          Login
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="relative" ref={profileRef}>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {user.profile_photo_url ? (
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden">
              <Image
                src={user.profile_photo_url}
                alt={user.name}
                width={100}
                height={100}
                quality={100}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              {getInitials(user.first_name, user.last_name)}
            </div>
          )}
        </div>
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed bg-white rounded-lg shadow-xl py-3 z-[9999] w-[300px] max-h-[80vh] overflow-y-auto"
          style={{
            top: `${menuPosition.top}px`,
            left:
              menuPosition.left !== null ? `${menuPosition.left}px` : "auto",
            right:
              menuPosition.right !== null ? `${menuPosition.right}px` : "auto",
          }}
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {user.profile_photo_url ? (
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={user.profile_photo_url}
                    alt={user.name}
                    width={100}
                    height={100}
                    quality={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                  {getInitials(user.first_name, user.last_name)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-1 items-center">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {user.first_name} {user.last_name}
                  </p>
                  {roles.includes("insighter") && (
                    <span className="bg-[#F0F8FF] text-[#0978B9] text-xs font-bold px-1.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 whitespace-nowrap">
                      Insighter
                    </span>
                  )}
                  {(roles.includes("company") ||
                    roles.includes("company-insighter")) && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-1.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300 whitespace-nowrap">
                      {roles.includes("company-insighter")
                        ? "Company-Insighter"
                        : "Company"}
                    </span>
                  )}
                  {roles.includes("client") &&
                    !roles.some((role) =>
                      ["insighter", "company", "company-insighter"].includes(
                        role
                      )
                    ) && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-1.5 rounded-sm dark:bg-green-900 dark:text-green-300 whitespace-nowrap">
                        Client
                      </span>
                    )}
                </div>
                <p className="text-xs font-semibold text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="py-2 px-3">
            {(roles.includes("insighter") ||
              roles.includes("company") ||
              roles.includes("company-insighter")) && (
              <Link
                href="https://app.knoldg.com/app/add-knowledge/stepper"
                className="block px-4 py-2.5 text-sm font-medium text-sky-600 hover:bg-indigo-50 hover:text-sky-700"
                onClick={() => setMenuOpen(false)}
                style={{fontSize: '13px'}}
              >
                Add Knowledge +
              </Link>
            )}
            <Link
              href="https://app.knoldg.com/app/profile/overview"
              className="block px-4 py-3  font-medium text-slate-900 hover:bg-indigo-50 hover:text-sky-700"
              style={{fontSize: '13px'}}
              onClick={() => setMenuOpen(false)}
            >
              My Profile
            </Link>
            {(roles.includes("insighter") ||
              roles.includes("company") ||
              roles.includes("company-insighter")) && (
              <>
                <Link
                  href="https://app.knoldg.com/app/insighter-dashboard/my-dashboard"
                  className="block px-4 py-2.5  font-medium text-slate-900 hover:bg-indigo-50 hover:text-sky-700"
                  onClick={() => setMenuOpen(false)}
                  style={{fontSize: '13px'}}
                >
                  Overview
                </Link>
                <Link
                  href="https://app.knoldg.com/app/insighter-dashboard/my-requests"
                  className="block px-4 py-2.5  font-medium text-slate-900 hover:bg-indigo-50 hover:text-sky-700"
                  onClick={() => setMenuOpen(false)}
                  style={{fontSize: '13px'}}
                >
                  My Requests
                </Link>
                <Link
                  href="https://app.knoldg.com/app/insighter-dashboard/my-knowledge/general"
                  className="block px-4 py-2.5  font-medium text-slate-900 hover:bg-indigo-50 hover:text-sky-700"
                  onClick={() => setMenuOpen(false)}
                  style={{fontSize: '13px'}}
                >
                  Knowledge Base
                </Link>
                <Link
                  href="https://app.knoldg.com/app/insighter-dashboard/account-settings/general-settings"
                  className="block px-4 py-2.5  font-medium text-slate-900 hover:bg-indigo-50 hover:text-sky-700"
                  onClick={() => setMenuOpen(false)}
                  style={{fontSize: '13px'}}
                >
                  Account Settings
                </Link>
              </>
            )}

            {roles.includes("client") &&
              !roles.includes("insighter") &&
              !roles.includes("company") && (
                <Link
                  href="https://app.knoldg.com/app/insighter-register/vertical"
                  className="block px-4 py-2.5  font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
                  onClick={() => setMenuOpen(false)}
                  style={{fontSize: '13px'}}
                >
                  Become an Insighter
                </Link>
              )}
              {roles.includes('company') && 
                <Link
                  href="https://app.knoldg.com/app/insighter-dashboard/my-company-settings"
                  className="block px-4 py-2.5  font-medium text-slate-900 hover:bg-indigo-50 hover:text-sky-700"
                  onClick={() => setMenuOpen(false)}
                  style={{fontSize: '13px'}}
                >
                  My Company
                </Link>
              }

            <div className="border-t border-slate-100">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleSignOut();
                }}
                className="block w-full text-left px-4 py-2.5  font-semibold text-slate-900 hover:bg-indigo-50 hover:text-sky-700"
                style={{fontSize: '13px'}}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
