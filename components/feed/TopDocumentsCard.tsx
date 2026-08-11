'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { IconExternalLink } from '@tabler/icons-react'
import CourseIcon from '@/components/icons/CourseIcon'
import DataIcon from '@/components/icons/DataIcon'
import InsightIcon from '@/components/icons/InsightIcon'
import ManualIcon from '@/components/icons/ManualIcon'
import ReportIcon from '@/components/icons/ReportIcon'
import { usePopularKnowledge } from '@/hooks/knowledgs/usePopularKnowledge'

type TopDocumentsCardProps = {
  locale: string
}

const VISIBLE_DOCUMENTS = 3

function getTypeIcon(type: string): ReactNode {
  const iconProps = { width: 20, height: 20 }

  switch (type.toLowerCase()) {
    case 'report':
      return <ReportIcon {...iconProps} />
    case 'manual':
      return <ManualIcon {...iconProps} />
    case 'data':
      return <DataIcon {...iconProps} />
    case 'course':
    case 'article':
      return <CourseIcon {...iconProps} />
    case 'statistic':
    case 'insight':
    default:
      return <InsightIcon {...iconProps} />
  }
}

function getTypeLabel(type: string, isRTL: boolean) {
  const labels: Record<string, { en: string; ar: string }> = {
    report: { en: 'Report', ar: 'تقرير' },
    manual: { en: 'Manual', ar: 'دليل' },
    statistic: { en: 'Statistic', ar: 'إحصائية' },
    insight: { en: 'Insight', ar: 'رؤية' },
    data: { en: 'Data', ar: 'بيانات' },
    article: { en: 'Article', ar: 'مقال' },
    course: { en: 'Course', ar: 'دورة' },
  }

  const label = labels[type.toLowerCase()]
  return label ? (isRTL ? label.ar : label.en) : type
}

function LoadingList() {
  return (
    <ul className="mt-3 space-y-1" aria-hidden="true">
      {Array.from({ length: VISIBLE_DOCUMENTS }).map((_, index) => (
        <li key={index} className="flex items-center gap-3 rounded-lg px-2 py-3">
          <span className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-slate-100" />
          <span className="min-w-0 flex-1 space-y-2">
            <span className="block h-2.5 w-16 animate-pulse rounded bg-slate-100" />
            <span className="block h-3 w-full animate-pulse rounded bg-slate-100" />
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function TopDocumentsCard({ locale }: TopDocumentsCardProps) {
  const isRTL = locale === 'ar'
  const { data, isLoading, error } = usePopularKnowledge()
  const documents = data.slice(0, VISIBLE_DOCUMENTS)
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

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5" dir={isRTL ? 'rtl' : 'ltr'}>
      <h3 className="text-sm font-bold text-slate-900">{copy.title}</h3>

      {isLoading ? (
        <LoadingList />
      ) : error ? (
        <p className="mt-4 text-xs leading-5 text-slate-500" role="status">
          {copy.unavailable}
        </p>
      ) : documents.length === 0 ? (
        <p className="mt-4 text-xs leading-5 text-slate-500" role="status">
          {copy.empty}
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-200">
          {documents.map((item) => {
            const href = `/${locale}/knowledge/${item.type}/${item.slug}`
            const typeLabel = getTypeLabel(item.type, isRTL)
            const isTitleRTL = item.language === 'arabic'

            return (
              <li key={`${item.type}-${item.slug}`}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir={isTitleRTL ? 'rtl' : 'ltr'}
                  aria-label={`${item.title} — ${copy.openInNewTab}`}
                  className="group flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-inset ring-slate-100 transition-colors group-hover:bg-white">
                    {getTypeIcon(item.type)}
                  </span>

                  <span className={`min-w-0 flex-1 ${isTitleRTL ? 'text-right' : 'text-left'}`}>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
                      {typeLabel}
                    </span>
                    <span
                      className="mt-0.5 line-clamp-2 block max-h-[2.9em] overflow-hidden break-words text-[13px] font-semibold leading-[1.45] text-slate-800 transition-colors group-hover:text-blue-600"
                      dir={isTitleRTL ? 'rtl' : 'ltr'}
                    >
                      {item.title}
                    </span>
                  </span>

                  <IconExternalLink
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-blue-500"
                    stroke={1.8}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
