'use client'

import { usePopularKnowledge } from '@/hooks/knowledgs/usePopularKnowledge'
import DocumentsListCard from './DocumentsListCard'

type TopDocumentsCardProps = {
  locale: string
  className?: string
}

const VISIBLE_DOCUMENTS = 3

export default function TopDocumentsCard({ locale, className }: TopDocumentsCardProps) {
  const isRTL = locale === 'ar'
  const { data, isLoading, error } = usePopularKnowledge()
  const copy = isRTL
    ? {
        title: 'أفضل المستندات',
        unavailable: 'المستندات غير متاحة حالياً.',
        empty: 'لا توجد مستندات منشورة حالياً.',
        openInNewTab: 'فتح في علامة تبويب جديدة',
      }
    : {
        title: 'Top documents',
        unavailable: 'Documents are unavailable right now.',
        empty: 'No documents have been published yet.',
        openInNewTab: 'Open in a new tab',
      }

  const documents = data.slice(0, VISIBLE_DOCUMENTS).map((item) => ({
    id: `${item.type}-${item.slug}`,
    href: `/${locale}/knowledge/${item.type}/${item.slug}`,
    type: item.type,
    title: item.title,
    language: item.language,
  }))

  return (
    <DocumentsListCard
      locale={locale}
      title={copy.title}
      documents={documents}
      isLoading={isLoading}
      hasError={Boolean(error)}
      emptyText={copy.empty}
      unavailableText={copy.unavailable}
      openInNewTabLabel={copy.openInNewTab}
      className={className}
    />
  )
}
