'use client'

import type { FeedItemRelatedInsight } from '@/services/feed.service'
import DocumentsListCard from './DocumentsListCard'

type MatchedRelatedDocumentsCardProps = {
  locale: string
  insights?: FeedItemRelatedInsight[]
  className?: string
}

const VISIBLE_DOCUMENTS = 3

export default function MatchedRelatedDocumentsCard({
  locale,
  insights = [],
  className,
}: MatchedRelatedDocumentsCardProps) {
  const isRTL = locale === 'ar'
  const copy = isRTL
    ? {
        title: 'مستندات ذات صلة',
        empty: 'لم نجد مستندات ذات صلة بهذا المحتوى.',
        openInNewTab: 'فتح في علامة تبويب جديدة',
        viewAll: 'عرض الكل',
        viewAllDescription: 'البحث المتقدم عن المستندات',
      }
    : {
        title: 'Related documents',
        empty: 'No related documents were found for this content.',
        openInNewTab: 'Open in a new tab',
        viewAll: 'View all',
        viewAllDescription: 'Advanced documents search',
      }

  const documents = insights.slice(0, VISIBLE_DOCUMENTS).map((insight) => ({
    id: `${insight.type}-${insight.slug}`,
    href: `/${locale}/knowledge/${insight.type}/${insight.slug}`,
    type: insight.type,
    title: insight.title,
    price: insight.price,
  }))

  return (
    <DocumentsListCard
      locale={locale}
      title={copy.title}
      documents={documents}
      isLoading={false}
      emptyText={copy.empty}
      openInNewTabLabel={copy.openInNewTab}
      viewAllHref={`/${locale}/home`}
      viewAllLabel={copy.viewAll}
      viewAllDescription={copy.viewAllDescription}
      className={className}
    />
  )
}
