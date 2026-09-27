'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { Popover } from '@mantine/core'
import { IconAlertCircle, IconCalendar, IconPlus, IconX } from '@tabler/icons-react'
import { markServiceComplete } from '../../projectServicesState'
import {
  DELIVERABLE_ADDRESS_MAX,
  DELIVERABLE_TITLE_MAX,
  deliverableIssues,
  deliveryMethodOptions,
  emptyDeliverable,
  type Deliverable,
  type DeliverableIssue,
} from '../../deliverables'
import {
  readServiceComponentPayloadValue,
  updateServiceComponentPayload,
} from '../../serviceComponentsPayload'
import { syncServiceComponents } from '../../serviceComponentsSync'
import { projectWizardStorage } from '../../wizardStorage'
import { useProjectWizardNavigation } from '../../useProjectWizardNavigation'
import WizardStepFrame from '../WizardStepFrame'
import InlineDateCalendar from '../InlineDateCalendar'
import { getReportTypeOptions } from './deliverableReportTypes'

function formatDateLabel(value: string, ar: boolean): string {
  if (!value) return ''
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return value
  try {
    return new Intl.DateTimeFormat(ar ? 'ar' : 'en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(year, month - 1, day))
  } catch {
    return value
  }
}

// A one-row textarea that grows with its content, so long titles wrap instead of scrolling out of view.
function GrowingTextarea({ value, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [value])
  return <textarea ref={ref} rows={1} value={value} {...props} />
}

// The title wraps inside its cell; the row grows with it.
function DeliverableTitleCell({
  value,
  onChange,
  ar,
  placeholder,
  label,
  invalid,
}: {
  value: string
  onChange: (value: string) => void
  ar: boolean
  placeholder: string
  label: string
  invalid: boolean
}) {
  const remaining = DELIVERABLE_TITLE_MAX - value.length
  return (
    <div>
      <GrowingTextarea
        value={value}
        // Line breaks are dropped: the title wraps on its own.
        onChange={(e) => onChange(e.target.value.replace(/\s*\n+\s*/g, ' '))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault()
        }}
        maxLength={DELIVERABLE_TITLE_MAX}
        placeholder={placeholder}
        aria-label={label}
        aria-invalid={invalid}
        required
        className="block min-h-9 w-full resize-none overflow-hidden border-0 bg-transparent px-2 py-[7px] text-sm leading-5 text-[#323338] outline-none placeholder:text-[#9699A6] focus:ring-0"
      />
      {remaining <= 30 && (
        <p className={`px-2 pt-0.5 text-end text-[11px] ${remaining <= 0 ? 'text-[#D83A52]' : 'text-[#9699A6]'}`}>
          {ar
            ? `${remaining} حرفًا متبقيًا`
            : `${remaining} ${remaining === 1 ? 'character' : 'characters'} left`}
        </p>
      )}
    </div>
  )
}

export default function DeliverablesQuestion({ locale }: { locale: string }) {
  const ar = locale === 'ar'
  const nav = useProjectWizardNavigation(locale)
  const { isReviewEditMode } = nav
  useEffect(() => {
    if (isReviewEditMode) return
    try {
      markServiceComplete(locale, false)
    } catch {}
  }, [locale, isReviewEditMode])
  const [items, setItems] = useState<Deliverable[]>(
    () =>
      readServiceComponentPayloadValue<{ deliverables: Deliverable[] }>(
        locale,
        'deliverable-stage',
      )?.deliverables || [emptyDeliverable()],
  )
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  // Keyed by layout variant + row, since the desktop table and mobile cards
  // for the same row both exist in the DOM at once (CSS toggles visibility).
  const [openDate, setOpenDate] = useState<string | null>(null)
  // Rows that existed at the last failed Continue. Only these are flagged, so
  // a row added afterwards is not shown as an error before it is filled in.
  const [checked, setChecked] = useState(0)
  const stored = (key: string) =>
    typeof window === 'undefined' ? '' : sessionStorage.getItem(key) || ''
  const start =
    stored(projectWizardStorage.plannedStartDateKey(locale)) ||
    new Date().toLocaleDateString('en-CA')
  const deadline = stored(projectWizardStorage.deadlineKey(locale))
  const issues = items.map((item) => deliverableIssues(item, start, deadline))
  const flagged = (index: number, field: string) =>
    index < checked &&
    issues[index].some((k) => k === field || k.startsWith(`${field}_`))
  function commit(next: Deliverable[]) {
    setItems(next)
    updateServiceComponentPayload(locale, 'deliverable-stage', {
      deliverables: next,
    })
  }
  function update(index: number, value: Partial<Deliverable>) {
    commit(items.map((item, i) => (i === index ? { ...item, ...value } : item)))
  }
  async function save() {
    setError('')
    if (!items.length || issues.some((list) => list.length)) {
      setChecked(items.length)
      // Bring the first flagged field into view (the one in the visible layout).
      requestAnimationFrame(() => {
        const first = Array.from(
          document.querySelectorAll<HTMLElement>(
            '#deliverables-table [aria-invalid="true"]',
          ),
        ).find((el) => el.offsetParent !== null)
        first?.scrollIntoView({ block: 'center', behavior: 'smooth' })
        if (first instanceof HTMLInputElement || first instanceof HTMLTextAreaElement || first instanceof HTMLButtonElement)
          first.focus({ preventScroll: true })
      })
      return
    }
    setChecked(0)
    setBusy(true)
    try {
      updateServiceComponentPayload(locale, 'deliverable-stage', {
        deliverables: items.map((item) => ({
          ...item,
          title: item.title.trim(),
          way: {
            ...item.way,
            address:
              item.way.selected === 'physical_workshop'
                ? item.way.address.trim()
                : '',
          },
        })),
      })
      await syncServiceComponents(locale)
      nav.goNext()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to save deliverables')
    } finally {
      setBusy(false)
    }
  }
  const formats = getReportTypeOptions(ar ? 'ar' : 'en')
  const methods = deliveryMethodOptions(ar)
  const cell = 'border-b border-e border-[#D0D4E4]'
  const th = `${cell} h-10 px-3 text-center text-[13px] font-medium text-[#676879]`
  // Text cells have no field border of their own; the whole cell shows focus instead.
  const cellText =
    'block h-9 w-full border-0 bg-transparent px-2 text-sm text-[#323338] outline-none placeholder:text-[#9699A6] focus:ring-0'
  const focusCell =
    'focus-within:!bg-white focus-within:shadow-[inset_0_0_0_2px_#1C7CBB]'
  const cellButton =
    'flex h-9 w-full items-center gap-1.5 rounded border border-transparent bg-transparent px-2 text-sm text-[#323338] outline-none transition hover:border-[#C3C6D4] focus-visible:border-[#1C7CBB] focus-visible:bg-white'
  const addLabel = ar ? 'إضافة مخرج' : 'Add deliverable'
  const add = () => commit([...items, emptyDeliverable()])

  // Each field is rendered by both the desktop table and the mobile cards.
  const titleField = (item: Deliverable, n: number, index: number) => (
    <DeliverableTitleCell
      value={item.title}
      onChange={(title) => update(index, { title })}
      ar={ar}
      placeholder={ar ? 'مثال: تقرير تحليل السوق' : 'e.g. Market analysis report'}
      label={ar ? `اسم المخرج ${n}` : `Deliverable ${n} title`}
      invalid={flagged(index, 'title')}
    />
  )
  const dateField = (
    item: Deliverable,
    n: number,
    index: number,
    compact = false,
  ) => {
    const key = `${compact ? 'm' : 'd'}-${index}`
    return (
    <Popover
      opened={openDate === key}
      onChange={(opened) => setOpenDate(opened ? key : null)}
      position="bottom-start"
      shadow="md"
      withinPortal
      classNames={{ dropdown: 'border-0 bg-transparent p-0 shadow-none' }}
    >
      <Popover.Target>
        <button
          type="button"
          onClick={() => setOpenDate(openDate === key ? null : key)}
          className={`${cellButton} ${compact ? '' : 'justify-center'} ${item.date ? '' : 'text-[#9699A6]'}`}
          aria-haspopup="dialog"
          aria-expanded={openDate === key}
          aria-label={ar ? `موعد تسليم المخرج ${n}` : `Deliverable ${n} due date`}
          aria-invalid={flagged(index, 'date')}
        >
          <IconCalendar size={15} stroke={1.75} className="shrink-0" />
          <span className="truncate">
            {item.date
              ? formatDateLabel(item.date, ar)
              : ar
                ? 'موعد التسليم'
                : 'Due date'}
          </span>
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <InlineDateCalendar
          value={item.date}
          min={start}
          max={deadline || undefined}
          onChange={(date) => {
            update(index, { date })
            setOpenDate(null)
          }}
          locale={ar ? 'ar' : 'en'}
          label={ar ? `موعد تسليم المخرج ${n}` : `Deliverable ${n} due date`}
        />
      </Popover.Dropdown>
    </Popover>
    )
  }
  const formatsField = (
    item: Deliverable,
    n: number,
    index: number,
    compact = false,
  ) => (
    <div
      role="group"
      aria-label={ar ? `صيغ ملفات المخرج ${n}` : `Deliverable ${n} file formats`}
      aria-invalid={flagged(index, 'formats')}
      className={compact ? 'grid grid-cols-4 gap-1' : 'grid grid-cols-2 gap-1'}
    >
      {formats.map((format) => {
        const on = item.report_type.includes(format.value)
        return (
          <button
            key={format.value}
            type="button"
            aria-pressed={on}
            aria-label={format.label}
            title={format.label}
            onClick={() =>
              update(index, {
                report_type: on
                  ? item.report_type.filter((t) => t !== format.value)
                  : [...item.report_type, format.value],
              })
            }
            className={`flex items-center rounded-md border font-medium transition ${
              compact
                ? 'h-14 flex-col justify-center gap-1 text-[11px]'
                : 'h-8 gap-1.5 px-2.5 text-[13px]'
            } ${
              on
                ? 'border-[#C3C6D4] bg-white text-[#323338] shadow-sm'
                : 'border-transparent text-[#9699A6] hover:bg-white hover:text-[#676879]'
            }`}
          >
            <img
              src={format.iconSrc}
              alt=""
              className={`h-[18px] w-[18px] object-contain transition ${
                on ? '' : 'opacity-35 grayscale'
              }`}
            />
            {format.value.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
  const methodField = (item: Deliverable, n: number, index: number) => {
    const method =
      methods.find((m) => m.value === item.way.selected) || methods[0]
    return (
      <select
        value={item.way.selected}
        onChange={(e) =>
          update(index, {
            way: {
              ...item.way,
              selected: e.target.value as Deliverable['way']['selected'],
            },
          })
        }
        style={{ backgroundColor: method.bg, color: method.fg }}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none border-0 bg-none px-3 text-center text-sm font-medium outline-none transition hover:brightness-[0.97] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-current [&>option]:bg-white [&>option]:text-[#323338]"
        aria-label={
          ar ? `طريقة تسليم المخرج ${n}` : `Deliverable ${n} delivery method`
        }
      >
        {methods.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>
    )
  }
  const addressField = (item: Deliverable, n: number, index: number) => (
    <input
      value={item.way.address || ''}
      onChange={(e) =>
        update(index, { way: { ...item.way, address: e.target.value } })
      }
      maxLength={DELIVERABLE_ADDRESS_MAX}
      className={cellText}
      placeholder={ar ? 'المدينة، الشارع، المبنى' : 'City, street, building'}
      aria-label={
        ar ? `عنوان ورشة المخرج ${n}` : `Deliverable ${n} workshop address`
      }
      aria-invalid={flagged(index, 'address')}
      required
    />
  )
  const removeButton = (n: number, index: number) =>
    items.length > 1 ? (
      <button
        type="button"
        onClick={() => {
          commit(items.filter((_, i) => i !== index))
          if (index < checked) setChecked(checked - 1)
        }}
        aria-label={ar ? `حذف المخرج ${n}` : `Remove deliverable ${n}`}
        className="inline-flex rounded p-1.5 text-[#9699A6] transition hover:bg-rose-50 hover:text-rose-600"
      >
        <IconX size={16} stroke={2} />
      </button>
    ) : null

  const cardRow = 'border-b border-[#D0D4E4] px-1.5 py-1'
  const invalidCell = 'bg-[#FFF5F6] shadow-[inset_0_0_0_1.5px_#E2445C]'
  const hoverCell = (bad: boolean) =>
    bad ? invalidCell : 'transition-colors group-hover:bg-[#F5F6F8]'

  const formatDate = (value: string) =>
    new Date(`${value}T00:00:00`).toLocaleDateString(
      ar ? 'ar-u-nu-latn' : 'en-GB',
      { day: 'numeric', month: 'short', year: 'numeric' },
    )
  const issueText: Record<DeliverableIssue, string> = ar
    ? {
        title: 'أضف اسم المخرج',
        title_too_long: `اختصر الاسم إلى ${DELIVERABLE_TITLE_MAX} حرفًا أو أقل`,
        address_too_long: `اختصر العنوان إلى ${DELIVERABLE_ADDRESS_MAX} حرفًا أو أقل`,
        date_missing: 'اختر موعد التسليم',
        date_before_start: `اختر تاريخًا في ${formatDate(start)} أو بعده`,
        date_after_deadline: deadline
          ? `اختر تاريخًا في ${formatDate(deadline)} أو قبله`
          : '',
        formats: 'اختر صيغة ملف واحدة على الأقل',
        method: 'اختر طريقة التسليم',
        address: 'أضف عنوان الورشة',
      }
    : {
        title: 'add a title',
        title_too_long: `shorten the title to ${DELIVERABLE_TITLE_MAX} characters or fewer`,
        address_too_long: `shorten the address to ${DELIVERABLE_ADDRESS_MAX} characters or fewer`,
        date_missing: 'pick a due date',
        date_before_start: `pick a date on or after ${formatDate(start)}`,
        date_after_deadline: deadline
          ? `pick a date on or before ${formatDate(deadline)} (project deadline)`
          : '',
        formats: 'choose at least one file format',
        method: 'choose a delivery method',
        address: 'add the workshop address',
      }
  const messages = items.flatMap((_, index) => {
    if (index >= checked || !issues[index].length) return []
    const parts = issues[index].map((k) => issueText[k])
    const text = parts.join(ar ? '، ' : ', ')
    return [
      ar
        ? `المخرج ${index + 1}: ${text}.`
        : `Deliverable ${index + 1}: ${text[0].toUpperCase()}${text.slice(1)}.`,
    ]
  })
  if (checked && !items.length)
    messages.push(ar ? 'أضف مخرجًا واحدًا على الأقل.' : 'Add at least one deliverable.')
  if (error) messages.push(error)

  return (
    <WizardStepFrame
      locale={locale}
      title={ar ? 'مخرجات الخدمة' : 'Service deliverables'}
      subtitle={
        ar
          ? 'أضف المخرجات المطلوبة لهذه الخدمة وحدد موعد وطريقة تسليم كل منها.'
          : 'Add the outputs you need from this service, with a due date and delivery method for each.'
      }
      busy={busy}
      onContinue={save}
      wide
    >
      {/* The global stylesheet forces Almarai on every element with
          !important; an ID selector is the only way to outrank it. */}
      {!ar ? (
        <style>{`
          #deliverables-table, #deliverables-table *,
          #deliverables-errors, #deliverables-errors * {
            font-family: "Figtree", sans-serif !important;
          }
        `}</style>
      ) : null}
      <fieldset id="deliverables-table" disabled={busy} className="min-w-0">
        {/* Desktop: one row per deliverable */}
        <div className="hidden overflow-hidden rounded-lg border border-[#D0D4E4] bg-white shadow-[0_4px_16px_-8px_rgba(15,23,42,0.12)] xl:block">
          <table className="w-full table-fixed border-separate border-spacing-0">
            <colgroup>
              <col />
              <col className="w-[170px]" />
              <col className="w-[200px]" />
              <col className="w-[180px]" />
              <col className="w-[210px]" />
              <col className="w-11" />
            </colgroup>
            <thead>
              <tr>
                <th className={`${th} ps-5 text-start`}>
                  {ar ? 'المخرج' : 'Deliverable'}
                </th>
                <th className={th}>{ar ? 'موعد التسليم' : 'Due date'}</th>
                <th className={th}>{ar ? 'صيغ الملفات' : 'File formats'}</th>
                <th className={th}>{ar ? 'طريقة التسليم' : 'Delivery method'}</th>
                <th className={th}>{ar ? 'عنوان الورشة' : 'Workshop address'}</th>
                <th className={`${th} border-e-0`}>
                  <span className="sr-only">{ar ? 'إجراءات' : 'Actions'}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const n = index + 1
                const workshop = item.way.selected === 'physical_workshop'
                return (
                  <tr key={index} className="group">
                    <td
                      className={`${cell} border-s-[6px] border-s-[#1C7CBB] px-2 py-1.5 ${hoverCell(flagged(index, 'title'))} ${focusCell}`}
                    >
                      {titleField(item, n, index)}
                    </td>
                    <td
                      className={`${cell} px-2 ${hoverCell(flagged(index, 'date'))}`}
                    >
                      {dateField(item, n, index)}
                    </td>
                    <td
                      className={`${cell} px-2 py-1.5 ${hoverCell(flagged(index, 'formats'))}`}
                    >
                      {formatsField(item, n, index)}
                    </td>
                    <td className={`${cell} relative p-0`}>
                      {methodField(item, n, index)}
                    </td>
                    <td
                      className={`${cell} px-2 ${workshop ? `${hoverCell(flagged(index, 'address'))} ${focusCell}` : 'bg-[#FAFAFB]'}`}
                    >
                      {workshop ? (
                        addressField(item, n, index)
                      ) : (
                        <span
                          className="block text-center text-sm text-[#C3C6D4]"
                          title={
                            ar
                              ? 'مطلوب للورش الحضورية فقط'
                              : 'Only needed for in-person workshops'
                          }
                        >
                          —
                        </span>
                      )}
                    </td>
                    <td
                      className={`${cell} border-e-0 text-center transition-colors group-hover:bg-[#F5F6F8]`}
                    >
                      {removeButton(n, index)}
                    </td>
                  </tr>
                )
              })}
              <tr>
                <td
                  colSpan={6}
                  className="border-s-[6px] border-s-[#1C7CBB] p-0"
                >
                  <button
                    type="button"
                    onClick={add}
                    className="group/add flex h-12 w-full items-center gap-2.5 bg-[#F0F7FC] px-4 text-sm font-semibold text-[#1C7CBB] transition hover:bg-[#E1EFF9]"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1C7CBB] text-white transition group-hover/add:scale-110">
                      <IconPlus size={14} stroke={2.5} />
                    </span>
                    {addLabel}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile and tablet: one card per deliverable */}
        <div className="grid gap-4 md:grid-cols-2 xl:hidden">
          {items.map((item, index) => {
            const n = index + 1
            return (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-[#D0D4E4] bg-white shadow-[0_4px_16px_-8px_rgba(15,23,42,0.12)]"
              >
                <div className="flex h-10 items-center justify-between border-b border-[#D0D4E4] bg-[#FAFAFB] ps-3.5 pe-1.5">
                  <span className="text-[13px] font-semibold text-[#323338]">
                    {ar ? `المخرج ${n}` : `Deliverable ${n}`}
                  </span>
                  {removeButton(n, index)}
                </div>
                <div
                  className={`${cardRow} ${flagged(index, 'title') ? invalidCell : ''} ${focusCell}`}
                >
                  {titleField(item, n, index)}
                </div>
                <div
                  className={`${cardRow} ${flagged(index, 'date') ? invalidCell : ''}`}
                >
                  {dateField(item, n, index, true)}
                </div>
                <div
                  className={`${cardRow} p-1.5 ${flagged(index, 'formats') ? invalidCell : ''}`}
                >
                  {formatsField(item, n, index, true)}
                </div>
                <div
                  className={`relative h-11 ${item.way.selected === 'physical_workshop' ? 'border-b border-[#D0D4E4]' : ''}`}
                >
                  {methodField(item, n, index)}
                </div>
                {item.way.selected === 'physical_workshop' && (
                  <div
                    className={`px-1.5 py-1 ${flagged(index, 'address') ? invalidCell : ''} ${focusCell}`}
                  >
                    {addressField(item, n, index)}
                  </div>
                )}
              </div>
            )
          })}
          <button
            type="button"
            onClick={add}
            className="group/add flex h-12 items-center justify-center gap-2.5 rounded-lg border-2 border-dashed border-[#1C7CBB]/50 bg-[#F0F7FC] text-sm font-semibold text-[#1C7CBB] transition hover:border-[#1C7CBB] hover:bg-[#E1EFF9] md:col-span-2"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1C7CBB] text-white transition group-hover/add:scale-110">
              <IconPlus size={14} stroke={2.5} />
            </span>
            {addLabel}
          </button>
        </div>
      </fieldset>
      {messages.length > 0 && (
        <ul id="deliverables-errors" role="alert" className="mt-3 space-y-1.5">
          {messages.map((message) => (
            <li
              key={message}
              className="flex items-start gap-1.5 text-sm text-[#D83A52]"
            >
              <IconAlertCircle
                size={16}
                stroke={2}
                className="mt-0.5 shrink-0"
              />
              {message}
            </li>
          ))}
        </ul>
      )}
    </WizardStepFrame>
  )
}
