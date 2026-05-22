'use client'

import { useEffect, useMemo, useState } from 'react'
import { Calendar } from '@mantine/dates'
import type { WizardLocale } from '@/components/project/wizardStorage'

type InlineDateCalendarProps = {
  value: string
  min?: string
  max?: string
  onChange: (value: string) => void
  locale: WizardLocale
  label: string
  className?: string
}

function parseIsoDate(value?: string): Date | null {
  if (!value) return null

  const [year, month, day] = value.split('-').map((part) => Number(part))
  if (!year || !month || !day) return null

  const date = new Date(year, month - 1, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }

  return date
}

function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function sameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

function sameDate(a: Date | null, b: Date): boolean {
  return Boolean(
    a &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
  )
}

function getInitialMonth(value: string, min?: string): Date {
  return startOfMonth(parseIsoDate(value) || parseIsoDate(min) || new Date())
}

export default function InlineDateCalendar({
  value,
  min,
  max,
  onChange,
  locale,
  label,
  className = '',
}: InlineDateCalendarProps) {
  const isRTL = locale === 'ar'
  const selectedDate = useMemo(() => parseIsoDate(value), [value])
  const minDate = useMemo(() => parseIsoDate(min) || undefined, [min])
  const maxDate = useMemo(() => parseIsoDate(max) || undefined, [max])
  const [visibleMonth, setVisibleMonth] = useState(() => getInitialMonth(value, min))

  useEffect(() => {
    if (selectedDate) {
      const nextMonth = startOfMonth(selectedDate)
      setVisibleMonth((currentMonth) =>
        sameMonth(currentMonth, nextMonth) ? currentMonth : nextMonth
      )
      return
    }

    if (minDate) {
      const nextMonth = startOfMonth(minDate)
      setVisibleMonth((currentMonth) =>
        currentMonth < nextMonth ? nextMonth : currentMonth
      )
    }
  }, [minDate, selectedDate])

  return (
    <div
      aria-label={label}
      className={`w-fit rounded-[10px] bg-white/95 p-3 shadow-sm ${className}`}
    >
      <Calendar
        date={visibleMonth}
        onDateChange={(date) => setVisibleMonth(startOfMonth(date))}
        minDate={minDate}
        maxDate={maxDate}
        locale={isRTL ? 'ar' : 'en'}
        firstDayOfWeek={1}
        weekendDays={[0, 6]}
        monthLabelFormat="MMMM YYYY"
        maxLevel="month"
        size="sm"
        withCellSpacing={false}
        highlightToday={false}
        getDayProps={(date) => ({
          selected: sameDate(selectedDate, date),
          onClick: () => onChange(toLocalIsoDate(date)),
        })}
        ariaLabels={{
          nextMonth: isRTL ? 'الشهر التالي' : 'Next month',
          previousMonth: isRTL ? 'الشهر السابق' : 'Previous month',
          monthLevelControl: label,
        }}
        styles={{
          calendarHeader: {
            marginBottom: 14,
            padding: 0,
          },
          calendarHeaderControl: {
            width: 30,
            height: 30,
            color: '#020617',
            borderRadius: 6,
          },
          calendarHeaderLevel: {
            color: '#020617',
            fontSize: 18,
            fontWeight: 700,
            lineHeight: '30px',
            pointerEvents: 'none',
          },
          weekday: {
            color: '#8b949e',
            fontSize: 14,
            fontWeight: 400,
            paddingBottom: 8,
            textTransform: 'none',
          },
          day: {
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 400,
          },
          monthCell: {
            padding: 1,
          },
        }}
      />

    </div>
  )
}
