'use client'

import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'
import KnowledgeTypeIcon from '@/components/icons/KnowledgeTypeIcon'

export type DocumentsListItem = {
  id: string
  href: string
  type: string
  title: string
  language?: 'arabic' | 'english'
  publisher?: {
    name: string
    avatarUrl?: string | null
  } | null
  price?: number | string | null
  paidStatus?: 'free' | 'partial_paid' | 'paid'
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
  viewAllHref: string
  viewAllLabel: string
  viewAllDescription: string
  emptySearchCta?: {
    title: string
    description: string
    action: string
  }
  className?: string
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
    <ul className="mt-2 space-y-1.5" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index} className="overflow-hidden rounded-[4px] border border-slate-200 bg-white">
          <span className="block h-[84px] animate-pulse bg-slate-900/95 p-3.5">
            <span className="block h-4 w-16 rounded-full bg-white/10" />
            <span className="mt-3 block h-3 w-4/5 rounded bg-white/10" />
            <span className="mt-2 block h-3 w-3/5 rounded bg-white/10" />
          </span>
          <span className="flex h-9 items-center gap-2 px-3">
            <span className="h-5 w-5 rounded-full bg-slate-100" />
            <span className="h-2.5 w-24 rounded bg-slate-100" />
          </span>
        </li>
      ))}
    </ul>
  )
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function getPriceLabel(
  item: DocumentsListItem,
  isRTL: boolean,
): { label: string; isFree: boolean } | null {
  const normalizedPrice = String(item.price ?? '').trim()
  const numericPrice = normalizedPrice === '' ? null : Number(normalizedPrice)
  const isNumericPrice = numericPrice !== null && !Number.isNaN(numericPrice)
  const isFree = item.paidStatus === 'free' || (!item.paidStatus && isNumericPrice && numericPrice === 0)

  if (isFree) return { label: isRTL ? 'مجاني' : 'Free', isFree: true }
  if (!normalizedPrice && item.paidStatus !== 'partial_paid') return null

  const label = isNumericPrice
    ? `$${numericPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
    : normalizedPrice

  return {
    label: item.paidStatus === 'partial_paid' ? `${label || (isRTL ? 'جزئي' : 'Partial')} +` : label,
    isFree: false,
  }
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
  viewAllHref,
  viewAllLabel,
  viewAllDescription,
  emptySearchCta,
  className,
}: DocumentsListCardProps) {
  const isRTL = locale === 'ar'
  const showEmptySearchCta = !isLoading && !hasError && documents.length === 0 && Boolean(emptySearchCta)

  return (
    <section className={className} dir={isRTL ? 'rtl' : 'ltr'}>
      <h3 className="px-0.5 text-sm font-bold text-slate-900">{title}</h3>

      {isLoading ? (
        <LoadingList />
      ) : hasError ? (
        <p className="mt-3 rounded-[4px] border border-slate-200 bg-white px-4 py-5 text-xs leading-5 text-slate-500" role="status">
          {unavailableText}
        </p>
      ) : documents.length === 0 ? (
        emptySearchCta ? (
          <Link
            href={viewAllHref}
            aria-label={emptySearchCta.action}
            className="group relative mt-3 block overflow-hidden rounded-md border border-[#C7DCFA] bg-[radial-gradient(circle_at_88%_12%,rgba(120,202,255,0.32),transparent_30%),radial-gradient(circle_at_8%_100%,rgba(113,160,255,0.2),transparent_33%),linear-gradient(135deg,#F9FCFF,#EAF3FF)] px-5 py-4 transition-colors duration-200 hover:border-[#91BCF4] hover:bg-[#E7F2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2"
          >
            <span aria-hidden className="absolute -end-5 -top-6 h-24 w-24 rounded-full border border-white/70 bg-white/35" />
            <span aria-hidden className="absolute -bottom-9 -start-7 h-20 w-20 rounded-full border border-[#A9CCFA]/45" />
            <span className="relative block">
              <span className="block text-[19px] font-semibold leading-6 tracking-[-0.02em] text-[#101724]">{emptySearchCta.title}</span>
              <span className="mt-1 block text-[13px] font-medium leading-5 text-[#527197]">{emptySearchCta.description}</span>
            </span>
            <span className="relative mt-4 block text-[12px] font-bold text-[#2378E8]">{emptySearchCta.action}</span>
          </Link>
        ) : (
          <p className="mt-3 rounded-[4px] border border-slate-200 bg-white px-4 py-5 text-xs leading-5 text-slate-500" role="status">
            {emptyText}
          </p>
        )
      ) : (
        <ul className="mt-2 space-y-1.5">
          {documents.map((item) => {
            const typeLabel = getTypeLabel(item.type, isRTL)
            const isTitleRTL = item.language === 'arabic' || (!item.language && /[\u0600-\u06FF]/.test(item.title))
            const price = getPriceLabel(item, isRTL)

            return (
              <li key={item.id} className="min-w-0">
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.title} — ${openInNewTabLabel}`}
                  className="group block min-w-0 overflow-hidden rounded-[4px] border border-slate-200 bg-white transition-colors duration-200 hover:border-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <span className="relative block min-h-[84px] overflow-hidden bg-[#071426] bg-[url('/images/test2.png')] bg-[length:120%_auto] bg-[85%_100%] px-3.5 py-3 text-white">
                    <span className="relative flex items-center gap-1.5">
                      <KnowledgeTypeIcon type={item.type} size={16} />
                      <span className="rounded-full bg-blue-300/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-blue-100/75 ring-1 ring-inset ring-blue-200/15">
                        {typeLabel}
                      </span>
                    </span>
                    <span
                      className={`relative mt-2 line-clamp-2 block overflow-hidden break-words text-[13px] font-bold leading-[1.45] text-white transition-colors group-hover:text-blue-200 ${isTitleRTL ? 'text-right' : 'text-left'}`}
                      dir={isTitleRTL ? 'rtl' : 'ltr'}
                    >
                      {item.title}
                    </span>
                  </span>

                  <span className="flex min-h-9 items-center justify-between gap-2 border-t border-slate-100 px-3 py-1.5">
                    <span className="flex min-w-0 items-center gap-2">
                      {item.publisher ? (
                        <>
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full border border-blue-300 bg-blue-50 text-[7px] font-bold text-blue-700">
                            {item.publisher.avatarUrl ? (
                              <img src={item.publisher.avatarUrl} alt="" className="h-full w-full object-cover object-top" />
                            ) : (
                              getInitials(item.publisher.name)
                            )}
                          </span>
                          <span className="truncate text-[10px] font-semibold text-slate-700">
                            {item.publisher.name}
                          </span>
                        </>
                      ) : null}
                    </span>

                    {price && (
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${price.isFree ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}
                        dir="ltr"
                      >
                        {price.label}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}

      {!showEmptySearchCta && <div className="mt-3">
        <Link
          href={viewAllHref}
          aria-label={`${viewAllLabel} — ${viewAllDescription}`}
          className="group flex min-h-[52px] w-full items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-start shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-all duration-200 hover:-translate-y-px hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-[0_4px_12px_rgba(35,120,232,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2"
        >
          <span className="min-w-0">
            <span className="block text-[11px] font-bold leading-4 text-slate-800">
              {viewAllLabel}
            </span>
            <span className="block truncate text-[10px] font-medium leading-4 text-slate-500">{viewAllDescription}</span>
          </span>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2378E8] transition-colors duration-200 group-hover:bg-[#2378E8] group-hover:text-white">
            <IconArrowRight
              aria-hidden
              className={`h-3.5 w-3.5 ${isRTL ? 'rotate-180' : ''}`}
              stroke={2.1}
            />
          </span>
        </Link>
      </div>}
    </section>
  )
}
