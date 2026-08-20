'use client'

import DocumentsListCard from './DocumentsListCard'
import { useFeedSearchInsights } from './FeedSearchInsightsContext'

const VISIBLE_DOCUMENTS = 3

type RelatedDocumentsCardProps = {
  locale: string
  keyword: string
  className?: string
}

export default function RelatedDocumentsCard({ locale, className }: RelatedDocumentsCardProps) {
  const isRTL = locale === 'ar'
  const { insights, isLoading } = useFeedSearchInsights()
  const copy = isRTL
    ? {
        title: 'مستندات ذات صلة',
        empty: 'لا توجد مستندات مرتبطة بهذا البحث.',
        emptySearchCta: {
          title: 'استكشف مكتبة المعرفة',
          description: 'استخدم البحث المتقدم للوصول إلى المزيد من المستندات.',
          action: 'فتح البحث المتقدم',
        },
        openInNewTab: 'فتح في علامة تبويب جديدة',
        viewAll: 'عرض الكل',
        viewAllDescription: 'البحث المتقدم عن المستندات',
      }
    : {
        title: 'Related documents',
        empty: 'No documents are related to this search.',
        emptySearchCta: {
          title: 'Explore Documents',
          description: 'Use advanced search to discover more documents.',
          action: 'Open advanced search',
        },
        openInNewTab: 'Open in a new tab',
        viewAll: 'View all',
        viewAllDescription: 'Advanced documents search',
      }

  const viewAllHref = `/${locale}/home`
  const documents = insights.slice(0, VISIBLE_DOCUMENTS).map((insight) => ({
    id: `${insight.type}-${insight.searchable_id}`,
    href: insight.url.startsWith('/') ? `/${locale}${insight.url}` : insight.url,
    type: insight.type,
    title: insight.title,
    language: insight.language,
    publisher: insight.insighter
      ? {
          name: insight.insighter.company?.legal_name || insight.insighter.company?.name || insight.insighter.name,
          avatarUrl: insight.insighter.profile_photo_url,
        }
      : null,
    price: insight.price,
    paidStatus: insight.paid ? 'paid' as const : 'free' as const,
  }))

  return (
    <DocumentsListCard
      locale={locale}
      title={copy.title}
      documents={documents}
      isLoading={isLoading}
      emptyText={copy.empty}
      openInNewTabLabel={copy.openInNewTab}
      viewAllHref={viewAllHref}
      viewAllLabel={copy.viewAll}
      viewAllDescription={copy.viewAllDescription}
      emptySearchCta={copy.emptySearchCta}
      className={className}
    />
  )
}
