'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { IconExternalLink } from '@tabler/icons-react'
import CourseIcon from '@/components/icons/CourseIcon'
import DataIcon from '@/components/icons/DataIcon'
import InsightIcon from '@/components/icons/InsightIcon'
import ManualIcon from '@/components/icons/ManualIcon'
import ReportIcon from '@/components/icons/ReportIcon'

export type DocumentsListItem = {
  id: string
  href: string
  type: string
  title: string
  language: 'arabic' | 'english'
}

type DocumentsListCardProps = {
  locale: string
  title: string
  documents: DocumentsListItem[]
  isLoading: boolean
  emptyText: string
  unavailableText?: string
  hasError?: boolean
  openInNewTabLabel: string
  className?: string
}

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

function getTypeLabel(type: string, isRTL: boolean): string {
  const labels: Record<string, { en: string; ar: string }> = {
    report: { en: 'Report', ar: 'تقرير' },
    manual: { en: 'Manual', ar: 'دليل' },
    statistic: { en: 'Statistic', ar: 'إحصائية' },
    insight: { en: 'Insight', ar: 'رؤية' },
    data: { en: 'Data', ar: 'بيانات' },
    article: { en: 'White Paper', ar: 'ورقة بيضاء' },
    course: { en: 'Course', ar: 'دورة' },
  }

  const label = labels[type.toLowerCase()]
  return label ? (isRTL ? label.ar : label.en) : type
}

function LoadingList() {
  return (
    <ul className="mt-3 space-y-1" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, index) => (
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

export default function DocumentsListCard({
  locale,
  title,
  documents,
  isLoading,
  emptyText,
  unavailableText = emptyText,
  hasError = false,
  openInNewTabLabel,
  className,
}: DocumentsListCardProps) {
  const isRTL = locale === 'ar'

  return (
    <div className={`rounded-lg border border-slate-200 bg-white p-5${className ? ` ${className}` : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>

      {isLoading ? (
        <LoadingList />
      ) : hasError ? (
        <p className="mt-4 text-xs leading-5 text-slate-500" role="status">
          {unavailableText}
        </p>
      ) : documents.length === 0 ? (
        <p className="mt-4 text-xs leading-5 text-slate-500" role="status">
          {emptyText}
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-200">
          {documents.map((item) => {
            const typeLabel = getTypeLabel(item.type, isRTL)
            const isTitleRTL = item.language === 'arabic'

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir={isTitleRTL ? 'rtl' : 'ltr'}
                  aria-label={`${item.title} — ${openInNewTabLabel}`}
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
