import FeedSidebar from '@/components/feed/FeedSidebar'
import CommunityFeedTimeline from '@/components/feed/CommunityFeedTimeline'
import MyFeedsTimeline from '@/components/feed/MyFeedsTimeline'
import FeedComposer from '@/components/feed/post/FeedComposer'
import RoleUpgradeCard from '@/components/feed/RoleUpgradeCard'
import TopDocumentsCard from '@/components/feed/TopDocumentsCard'

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
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)_300px]">
          {/* Left column - dashboard navigation with the feed profile card */}
          <aside className="hidden xl:block">
            <div className="no-scrollbar sticky top-[calc(var(--app-header-height,88px)+24px)] max-h-[calc(100vh-var(--app-header-height,88px)-48px)] overflow-y-auto pe-1">
              <FeedSidebar locale={locale} />
            </div>
          </aside>

          {/* Center column - composer + feed */}
          <section className="space-y-4">
            <FeedComposer locale={locale} />

            {showMyFeeds ? <MyFeedsTimeline locale={locale} /> : <CommunityFeedTimeline locale={locale} />}
          </section>

          {/* Right column - upgrade prompt + top documents */}
          <aside className="hidden xl:block">
            <div className="no-scrollbar sticky top-[calc(var(--app-header-height,88px)+24px)] max-h-[calc(100vh-var(--app-header-height,88px)-48px)] space-y-4 overflow-y-auto pe-1">
              <RoleUpgradeCard locale={locale} />
              <TopDocumentsCard locale={locale} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
