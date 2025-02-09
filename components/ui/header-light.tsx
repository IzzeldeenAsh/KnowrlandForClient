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
                                <div key={industry.id} >
                                  <Link
                                    href={`/industry/${industry.id}/${industry.slug}`}
                                    className="block border-b border-gray-200 px-4 py-2 text-sm hover:bg-blue-50 transition-colors"
                                  >
                                    <span className="text-gray-700 hover:text-gray-900">{industry.name}</span>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="w-full lg:w-7/12 px-4">
                          <div 
                              className="flex flex-col justify-between items-center gap-5 pt-10 px-5 min-h-[250px] rounded shadow relative overflow-hidden"
                              style={{
                                backgroundSize: 'cover',
                                backgroundPosition: 'center top 1.3rem',
                                backgroundRepeat: 'no-repeat',
                                backgroundImage: 'url(https://res.cloudinary.com/dsiku9ipv/image/upload/v1739029302/bg-5_ldbnui.png)'
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
