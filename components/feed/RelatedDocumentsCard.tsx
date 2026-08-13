'use client'

import DocumentsListCard from './DocumentsListCard'
import { useFeedSearchInsights } from './FeedSearchInsightsContext'

export default function RelatedDocumentsCard({ locale, className }: { locale: string; className?: string }) {
  const isRTL = locale === 'ar'
  const { insights, isLoading } = useFeedSearchInsights()
  const copy = isRTL
    ? {
        title: 'مستندات ذات صلة',
        empty: 'لا توجد مستندات مرتبطة بهذا البحث.',
        openInNewTab: 'فتح في علامة تبويب جديدة',
      }
    : {
        title: 'Related documents',
        empty: 'No documents are related to this search.',
        openInNewTab: 'Open in a new tab',
      }

  const documents = insights.slice(0, 5).map((insight) => ({
    id: `${insight.type}-${insight.searchable_id}`,
    href: insight.url.startsWith('/') ? `/${locale}${insight.url}` : insight.url,
    type: insight.type,
    title: insight.title,
    language: insight.language,
  }))

  return (
    <DocumentsListCard
      locale={locale}
      title={copy.title}
      documents={documents}
      isLoading={isLoading}
      emptyText={copy.empty}
      openInNewTabLabel={copy.openInNewTab}
      className={className}
    />
  )
}
