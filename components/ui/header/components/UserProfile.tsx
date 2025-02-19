import Link from "next/link";
import Image from "next/image";
import { useUserProfile } from '../hooks/useUserProfile';

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
};

export function UserProfile() {
  const { user, roles, isLoading, handleSignOut } = useUserProfile();

  if (isLoading) {
    return <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>;
  }

  if (!user) {
    return (
      <>
   
        <Link
          href="https://foresighta.vercel.app/auth/login"
          className="btn-sm bg-gray-800 text-gray-200 shadow hover:bg-gray-900"
        >
       Login
        </Link>
      </>
    );
  }

  return (
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

          {roles.includes('client') && !roles.includes('insighter') && !roles.includes('company') && (
            <Link
              href="https://foresighta.vercel.app/app/insighter-register/vertical"
              className="block px-4 py-2 text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
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
  );
}
