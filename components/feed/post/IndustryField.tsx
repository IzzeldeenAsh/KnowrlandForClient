'use client'

import { IconChevronDown, IconHash } from '@tabler/icons-react'
import { useState } from 'react'
import IndustrySelectModal, { type IndustryOption } from './IndustrySelectModal'

const copyByLocale = {
  en: {
    label: 'Industry',
    placeholder: 'Select an industry',
  },
  ar: {
    label: 'المجال',
    placeholder: 'اختر المجال',
  },
} as const

type IndustryFieldProps = {
  locale: string
  value: IndustryOption | null
  invalid?: boolean
  errorId?: string
  buttonRef?: React.RefObject<HTMLButtonElement | null>
  onSelect: (option: IndustryOption) => void
  onBlur?: () => void
}

// Trigger for the industry picker: a normal form field button that opens the
// searchable IndustrySelectModal — no inline/nested dropdown.
export default function IndustryField({
  locale,
  value,
  invalid,
  errorId,
  buttonRef,
  onSelect,
  onBlur,
}: IndustryFieldProps) {
  const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en']
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <div className="relative">
      <label htmlFor="feed-post-industry-field" className="mb-1.5 block text-[13px] font-semibold text-[#0B1220]">
        {copy.label}
      </label>
      <button
        id="feed-post-industry-field"
        ref={buttonRef}
        type="button"
        onClick={() => setModalOpened(true)}
        onBlur={onBlur}
        aria-haspopup="dialog"
        aria-expanded={modalOpened}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        className={`flex min-h-11 w-full items-center gap-2 rounded-md border bg-white px-3 py-2 text-[14px] transition-colors focus-visible:outline-none ${
          invalid
            ? 'border-[#C23B32] bg-[#FFF8F7]'
            : 'border-[#D6E0EC] focus-visible:border-[#8FB9EA]'
        }`}
      >
        <IconHash aria-hidden className="h-4 w-4 shrink-0 text-[#1D74E0]" stroke={2} />
        <span
          className={`min-w-0 flex-1 truncate text-start ${
            value ? 'font-medium text-[#1C2433]' : 'text-[#94A3B8]'
          }`}
        >
          {value?.name ?? copy.placeholder}
        </span>
        <IconChevronDown aria-hidden className="h-4 w-4 shrink-0 text-[#5A6B84]" stroke={2} />
      </button>

      <IndustrySelectModal
        locale={locale}
        opened={modalOpened}
        selectedId={value?.id ?? null}
        onClose={() => setModalOpened(false)}
        onSelect={(option) => {
          onSelect(option)
          setModalOpened(false)
        }}
      />
    </div>
  )
}
