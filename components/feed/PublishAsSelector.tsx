'use client'

import { IconBuilding, IconCheck, IconUserCircle } from '@tabler/icons-react'
import Image from 'next/image'

export type PublishAuthorType = 'company' | 'insighter'

type PublishAsSelectorProps = {
  locale: string
  companyName: string
  companyLogo?: string | null
  insighterName: string
  insighterPhoto?: string | null
  value: PublishAuthorType | null
  onChange: (value: PublishAuthorType) => void
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function Avatar({ src, name, size = 'large' }: { src?: string | null; name: string; size?: 'large' | 'small' }) {
  const sizing = size === 'large' ? 'h-16 w-16 text-[17px]' : 'h-7 w-7 text-[9px]'

  return (
    <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E7F0FD] font-bold text-[#2378E8] ${sizing}`}>
      {src ? <Image src={src} alt={name} width={64} height={64} unoptimized className="h-full w-full object-cover object-top" /> : initials(name) || 'I'}
    </span>
  )
}

export default function PublishAsSelector({
  locale,
  companyName,
  companyLogo,
  insighterName,
  insighterPhoto,
  value,
  onChange,
}: PublishAsSelectorProps) {
  const isArabic = locale === 'ar'
  const copy = isArabic
    ? {
        legend: 'اختر الهوية التي ستظهر على المنشور',
        company: 'النشر باسم الشركة',
        insighter: 'النشر باسم المستشار',
        by: 'بواسطة',
        companyHint: 'سيظهر شعار الشركة كهوية رئيسية.',
        insighterHint: 'سيظهر ملفك الشخصي كهوية رئيسية.',
      }
    : {
        legend: 'Choose the identity that will appear on this publication',
        company: 'Publish as company',
        insighter: 'Publish as Insighter',
        by: 'By',
        companyHint: 'The company logo will be the primary identity.',
        insighterHint: 'Your expert profile will be the primary identity.',
      }

  const options: Array<{ type: PublishAuthorType; label: string; hint: string }> = [
    { type: 'company', label: copy.company, hint: copy.companyHint },
    { type: 'insighter', label: copy.insighter, hint: copy.insighterHint },
  ]

  return (
    <fieldset>
      <legend className="sr-only">{copy.legend}</legend>
      <p className="text-[13px] leading-5 text-[#66758B]">{copy.legend}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label={copy.legend}>
        {options.map((option) => {
          const selected = value === option.type
          const isCompany = option.type === 'company'

          return (
            <button
              key={option.type}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.type)}
              className={`relative min-h-[210px] rounded-xl border p-5 text-start transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2 ${
                selected
                  ? 'border-[#2378E8] bg-[#F5F9FF] shadow-[0_8px_24px_rgba(35,120,232,0.12)]'
                  : 'border-[#D9E3EF] bg-white hover:-translate-y-0.5 hover:border-[#9DBFE8] hover:shadow-[0_8px_20px_rgba(29,48,75,0.08)]'
              }`}
            >
              <span className={`absolute end-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border ${selected ? 'border-[#2378E8] bg-[#2378E8] text-white' : 'border-[#C6D2E1] bg-white text-transparent'}`}>
                <IconCheck aria-hidden className="h-3.5 w-3.5" stroke={2.5} />
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDF4FD] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#2378E8]">
                {isCompany ? <IconBuilding aria-hidden className="h-3.5 w-3.5" /> : <IconUserCircle aria-hidden className="h-3.5 w-3.5" />}
                {isCompany ? (isArabic ? 'شركة' : 'Company') : (isArabic ? 'مستشار' : 'Insighter')}
              </span>

              <span className="mt-5 flex min-h-[72px] items-center gap-3">
                {isCompany ? (
                  <span className="relative h-16 w-16 shrink-0">
                    <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-[#DCE5EF] bg-white p-2 text-[#2378E8]">
                      {companyLogo ? <Image src={companyLogo} alt={companyName} width={64} height={64} unoptimized className="h-full w-full rounded-full object-cover" /> : <IconBuilding aria-hidden className="h-7 w-7" stroke={1.6} />}
                    </span>
                    <span className="absolute -bottom-2 -end-2 rounded-full bg-white p-0.5 shadow-[0_0_0_1px_#DCE5EF]">
                      <Avatar src={insighterPhoto} name={insighterName} size="small" />
                    </span>
                  </span>
                ) : (
                  <Avatar src={insighterPhoto} name={insighterName} />
                )}
                <span className="min-w-0">
                  <strong className="block line-clamp-2 text-[15px] leading-5 text-[#172236]">
                    {isCompany ? companyName : insighterName}
                  </strong>
                  {isCompany && (
                    <span className="mt-1 block min-w-0 truncate text-[11.5px] text-[#718198]">
                      <span className="truncate">{copy.by} {insighterName}</span>
                    </span>
                  )}
                </span>
              </span>

              <span className="mt-4 block text-[11.5px] leading-5 text-[#7A899D]">{option.hint}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
