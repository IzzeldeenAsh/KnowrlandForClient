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
        viewAll: 'عرض الكل',
        viewAllDescription: 'البحث المتقدم عن المستندات',
      }
    : {
        title: 'Top documents',
        unavailable: 'Documents are unavailable right now.',
        empty: 'No documents have been published yet.',
        openInNewTab: 'Open in a new tab',
        viewAll: 'View all',
        viewAllDescription: 'Advanced documents search',
      }

  const documents = data.slice(0, VISIBLE_DOCUMENTS).map((item) => ({
    id: `${item.type}-${item.slug}`,
    href: `/${locale}/knowledge/${item.type}/${item.slug}`,
    type: item.type,
    title: item.title,
    language: item.language,
    publisher: {
      name: item.insighter.company?.legal_name || item.insighter.name,
      avatarUrl: item.insighter.company?.logo || item.insighter.profile_photo_url,
    },
    price: item.total_price,
    paidStatus: item.paid_status,
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
      viewAllHref={`/${locale}/home`}
      viewAllLabel={copy.viewAll}
      viewAllDescription={copy.viewAllDescription}
      className={className}
    />
  )
}
