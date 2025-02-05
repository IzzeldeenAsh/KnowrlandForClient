import Link from "next/link";
import Logo from "./logo";

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
      "Accept": "application/json",
      "Accept-Language": "en",
    },
    body: JSON.stringify({
      top_industry: 1,
      top_sub_industry: 2,
    }),
    cache: 'force-cache',
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!res.ok) {
    return [];
  }

  const json = await res.json();
  return json.data as Industry[];
}
export default async function Header() {
  const industries = await getIndustries();

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
                  <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="hidden group-hover:block absolute left-0 mt-1 w-64 z-50">
                  <ul className="rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 py-2">
                    <li>
                      <Link
                        href="/all-industries"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        All Industries
                      </Link>
                    </li>
                    {industries.map((industry) => (
                      <li key={industry.id}>
                        <Link
                          href={`/industries/${industry.slug}`}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 flex items-center justify-between"
                        >
                          <span className="truncate">{industry.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Link
                href="/signin"
                className="btn-sm bg-white text-gray-800 shadow hover:bg-gray-50"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="btn-sm bg-gray-800 text-gray-200 shadow hover:bg-gray-900"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
