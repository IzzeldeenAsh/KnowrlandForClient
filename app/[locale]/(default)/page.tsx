import FeedSidebar from '@/components/feed/FeedSidebar'
import FeedEmptyState from '@/components/feed/FeedEmptyState'
import MyFeedsTimeline from '@/components/feed/MyFeedsTimeline'
import FeedComposer from '@/components/feed/post/FeedComposer'
import RoleUpgradeCard from '@/components/feed/RoleUpgradeCard'

export const metadata = {
  title: 'Feed - Insighta Business',
  description: 'Your personalized Insighta feed: knowledge, insights and updates from the experts you follow.',
}

type FeedProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ view?: string }>
}

export default async function Feed({ params, searchParams }: FeedProps) {
  const { locale } = await params
  const { view } = await searchParams
  const isRTL = locale === 'ar'
  const showMyFeeds = view === 'my-feeds'

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-[#EEF2FA] text-slate-900 min-h-screen">
      <div className="mx-auto max-w-7xl px-0 py-6 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)_280px] xl:grid-cols-[280px_minmax(0,1fr)_300px]">
          {/* Left column - dashboard navigation with the feed profile card */}
          <aside className="hidden lg:block">
            <div className="no-scrollbar sticky top-[calc(var(--app-header-height,88px)+24px)] max-h-[calc(100vh-var(--app-header-height,88px)-48px)] overflow-y-auto pe-1">
              <FeedSidebar locale={locale} />
            </div>
          </aside>

          {/* Center column - composer + feed */}
          <section className="space-y-4">
            <FeedComposer locale={locale} />

            {showMyFeeds ? <MyFeedsTimeline locale={locale} /> : <FeedEmptyState locale={locale} />}
          </section>

          {/* Right column - suggestions */}
          <aside className="hidden lg:block">
            <div className="space-y-4">
              <RoleUpgradeCard locale={locale} />

              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-bold text-slate-900">Suggested for you</h3>
                <ul className="mt-4 space-y-4">
                  {['Dummy Insighter One', 'Dummy Insighter Two', 'Dummy Company'].map((name) => (
                    <li key={name} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                        {name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-slate-900">{name}</div>
                        <div className="truncate text-xs text-slate-500">Placeholder</div>
                      </div>
                      <button className="rounded-full border border-blue-500 px-3 py-1 text-xs font-medium text-blue-600">
                        Follow
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
