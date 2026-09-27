'use client'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'

export default function WizardStepFrame({
  locale,
  title,
  subtitle,
  children,
  error,
  busy,
  disabled,
  onContinue,
  continueLabel,
  wide,
}: {
  locale: string
  title: string
  subtitle?: string
  children: ReactNode
  error?: string
  busy?: boolean
  disabled?: boolean
  onContinue: () => void
  continueLabel?: string
  wide?: boolean
}) {
  const nav = useProjectWizardNavigation(locale)
  const ar = locale === 'ar'
  return (
    <div
      className={`mx-auto w-full pb-28 ${wide ? 'max-w-6xl' : 'max-w-3xl'}`}
      dir={ar ? 'rtl' : 'ltr'}
    >
      {/* The global stylesheet forces the body font with !important, so the
          serif title needs an ID selector to win (same as the other steps). */}
      {!ar ? (
        <style>{`
          #wizard-step-frame-title {
            font-family: "IBM Plex Serif", serif !important;
          }
        `}</style>
      ) : null}
      <h1
        id="wizard-step-frame-title"
        className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 text-start"
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-sm text-slate-500">{subtitle}</p>
      )}
      <div className="mt-7">{children}</div>
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-rose-50 p-4 text-sm text-rose-700"
        >
          {error}
        </p>
      )}
      <div className="fixed bottom-0 inset-x-0 z-20 border-t border-slate-200/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl justify-between gap-4 px-6 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <Link
            href={nav.backHref}
            aria-disabled={busy}
            onClick={(e) => {
              if (busy) e.preventDefault()
            }}
            className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm"
          >
            {ar ? 'رجوع' : 'Back'}
          </Link>
          <button
            type="button"
            disabled={disabled || busy}
            onClick={onContinue}
            className="rounded-full bg-[#1C7CBB] px-6 py-2 text-sm text-white disabled:bg-slate-200 disabled:text-slate-500"
          >
            {busy
              ? ar
                ? 'جاري الحفظ…'
                : 'Saving…'
              : continueLabel || nav.continueLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
