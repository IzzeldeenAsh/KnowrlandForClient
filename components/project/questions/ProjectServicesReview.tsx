'use client'
import { deliveryMethodOptions, type Deliverable } from '../deliverables'
import { getReportTypeOptions } from './service-components/deliverableReportTypes'

export type ReviewProjectService = {
  uuid: string
  title?: string
  service?: { name: string }
  prompt_ai?: string
  scopes?: Array<{ scope: string; children?: Array<{ scope: string }> }>
  components?: Array<Record<string, unknown>>
  addons?: Array<Record<string, unknown>>
}

// Read-only version of the deliverables table from the service deliverables step.
export function DeliverablesReviewTable({
  locale,
  deliverables,
}: {
  locale: string
  deliverables: Deliverable[]
}) {
  const ar = locale === 'ar'
  const formats = getReportTypeOptions(ar ? 'ar' : 'en')
  const methods = deliveryMethodOptions(ar)
  const methodFor = (item: Deliverable) =>
    methods.find((m) => m.value === item.way?.selected) || methods[0]
  const formatDate = (value: string) =>
    value
      ? new Date(`${value}T00:00:00`).toLocaleDateString(
          ar ? 'ar-u-nu-latn' : 'en-GB',
          { day: 'numeric', month: 'short', year: 'numeric' },
        )
      : '—'
  const hasWorkshop = deliverables.some(
    (item) => item.way?.selected === 'physical_workshop',
  )

  const cell = 'border-b border-e border-[#D0D4E4]'
  const th = `${cell} h-10 px-3 text-center text-[13px] font-medium text-[#676879]`

  const formatIcons = (item: Deliverable) => (
    <div className="flex flex-wrap justify-center gap-1.5">
      {formats
        .filter((format) => item.report_type?.includes(format.value))
        .map((format) => (
          <span
            key={format.value}
            title={format.label}
            className="flex h-7 items-center gap-1.5 rounded-md border border-[#C3C6D4] bg-white px-2 text-[12px] font-medium text-[#323338]"
          >
            <img src={format.iconSrc} alt="" className="h-4 w-4 object-contain" />
            {format.value.toUpperCase()}
          </span>
        ))}
    </div>
  )
  const methodPill = (item: Deliverable) => {
    const method = methodFor(item)
    return (
      <span
        style={{ backgroundColor: method.bg, color: method.fg }}
        className="inline-flex rounded-full px-3 py-1 text-[13px] font-medium"
      >
        {method.label}
      </span>
    )
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-lg border border-[#D0D4E4] bg-white lg:block">
        <table className="w-full table-fixed border-separate border-spacing-0">
          <colgroup>
            <col />
            <col className="w-[130px]" />
            <col className="w-[230px]" />
            <col className="w-[170px]" />
            {hasWorkshop ? <col className="w-[180px]" /> : null}
          </colgroup>
          <thead>
            <tr>
              <th className={`${th} ps-5 text-start`}>{ar ? 'المخرج' : 'Deliverable'}</th>
              <th className={th}>{ar ? 'موعد التسليم' : 'Due date'}</th>
              <th className={th}>{ar ? 'صيغ الملفات' : 'File formats'}</th>
              <th className={`${th} ${hasWorkshop ? '' : 'border-e-0'}`}>
                {ar ? 'طريقة التسليم' : 'Delivery method'}
              </th>
              {hasWorkshop ? (
                <th className={`${th} border-e-0`}>{ar ? 'عنوان الورشة' : 'Workshop address'}</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {deliverables.map((item, index) => {
              const last = index === deliverables.length - 1 ? 'border-b-0' : ''
              return (
                <tr key={index}>
                  <td className={`${cell} ${last} border-s-[6px] border-s-[#1C7CBB] px-4 py-2.5 text-sm font-medium text-[#323338]`}>
                    {item.title}
                  </td>
                  <td className={`${cell} ${last} px-3 text-center text-sm text-[#323338]`}>
                    {formatDate(item.date)}
                  </td>
                  <td className={`${cell} ${last} px-2 py-2`}>{formatIcons(item)}</td>
                  <td className={`${cell} ${last} ${hasWorkshop ? '' : 'border-e-0'} px-2 text-center`}>
                    {methodPill(item)}
                  </td>
                  {hasWorkshop ? (
                    <td className={`${cell} ${last} border-e-0 px-3 text-sm text-[#323338]`}>
                      {item.way?.selected === 'physical_workshop' ? (
                        item.way.address
                      ) : (
                        <span className="block text-center text-[#C3C6D4]">—</span>
                      )}
                    </td>
                  ) : null}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:hidden">
        {deliverables.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-[#D0D4E4] border-s-[6px] border-s-[#1C7CBB] bg-white"
          >
            <div className="border-b border-[#D0D4E4] bg-[#FAFAFB] px-3.5 py-2.5 text-sm font-semibold text-[#323338]">
              {item.title}
            </div>
            <dl className="space-y-2.5 px-3.5 py-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-xs font-semibold text-slate-500">{ar ? 'موعد التسليم' : 'Due date'}</dt>
                <dd className="text-[#323338]">{formatDate(item.date)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-xs font-semibold text-slate-500">{ar ? 'طريقة التسليم' : 'Delivery method'}</dt>
                <dd>{methodPill(item)}</dd>
              </div>
              {item.way?.selected === 'physical_workshop' && item.way.address ? (
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-xs font-semibold text-slate-500">{ar ? 'عنوان الورشة' : 'Workshop address'}</dt>
                  <dd className="text-end text-[#323338]">{item.way.address}</dd>
                </div>
              ) : null}
              <div>
                <dt className="mb-1.5 text-xs font-semibold text-slate-500">{ar ? 'صيغ الملفات' : 'File formats'}</dt>
                <dd className="[&>div]:justify-start">{formatIcons(item)}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </>
  )
}
