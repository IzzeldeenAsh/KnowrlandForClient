import FeedSidebar from '@/components/feed/FeedSidebar'
import CommunityFeedTimeline from '@/components/feed/CommunityFeedTimeline'
import FeedMobileSearch from '@/components/feed/FeedMobileSearch'
import MyFeedsTimeline from '@/components/feed/MyFeedsTimeline'
import SavedPostsTimeline from '@/components/feed/SavedPostsTimeline'
import FeedComposer from '@/components/feed/post/FeedComposer'
import RoleUpgradeCard from '@/components/feed/RoleUpgradeCard'
import RelatedDocumentsCard from '@/components/feed/RelatedDocumentsCard'
import { FeedSearchInsightsProvider } from '@/components/feed/FeedSearchInsightsContext'
import TopDocumentsCard from '@/components/feed/TopDocumentsCard'

export const metadata = {
  title: 'Feed - Insighta Business',
  description: 'Your personalized Insighta feed: knowledge, insights and updates from the experts you follow.',
}

type FeedProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{
    view?: string
    keyword?: string
    industry?: string
    content_type?: string
  }>
}

export default async function Feed({ params, searchParams }: FeedProps) {
  const { locale } = await params
  const { view, keyword: rawKeyword, industry: rawIndustry, content_type: rawContentType } = await searchParams
  const isRTL = locale === 'ar'
  const showMyFeeds = view === 'my-feeds'
  const showSavedPosts = view === 'saved-posts'
  const keyword = rawKeyword?.trim() ?? ''
  const parsedIndustry = Number(rawIndustry)
  const industry = Number.isInteger(parsedIndustry) && parsedIndustry > 0 ? parsedIndustry : null
  const contentType = rawContentType === 'post' || rawContentType === 'article'
    ? rawContentType
    : null
  const isSearching = keyword.length > 0 && !showMyFeeds && !showSavedPosts

  return (
    <FeedSearchInsightsProvider>
      <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-[#EEF2FA] text-slate-900 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)_300px]">
            {/* Left column - dashboard navigation with the feed profile card */}
            <aside className="hidden xl:block">
              <div className="no-scrollbar sticky top-[calc(var(--app-header-height,88px)+24px)] max-h-[calc(100vh-var(--app-header-height,88px)-48px)] overflow-y-auto pe-1">
                <FeedSidebar locale={locale} />
              </div>
            </aside>

            {/* Center column - composer + feed */}
            <section className="grid min-w-0 gap-4">
              <FeedMobileSearch locale={locale} />
              {!isSearching && !showSavedPosts && <FeedComposer locale={locale} />}

              {showSavedPosts ? (
                <SavedPostsTimeline locale={locale} />
              ) : showMyFeeds ? (
                <MyFeedsTimeline locale={locale} />
              ) : (
                <CommunityFeedTimeline
                  locale={locale}
                  keyword={keyword}
                  industry={industry}
                  contentType={contentType}
                />
              )}
            </section>

            {/* Right column - upgrade prompt + contextual documents */}
            <aside className="hidden xl:block">
              <div className="no-scrollbar sticky top-[calc(var(--app-header-height,88px)+24px)] max-h-[calc(100vh-var(--app-header-height,88px)-48px)] space-y-4 overflow-y-auto pe-1">
                <RoleUpgradeCard locale={locale} />
                {isSearching ? (
                  <RelatedDocumentsCard locale={locale} />
                ) : (
                  <TopDocumentsCard locale={locale} />
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </FeedSearchInsightsProvider>
  )
}
