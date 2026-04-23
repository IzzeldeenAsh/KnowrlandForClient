'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ChoiceCard from './ChoiceCard'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import {
  clearStoredProjectRequestUuid,
  extractProjectRequestUuid,
  writeStoredProjectRequestUuid,
} from '../projectRequestUuid'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'

type Service = {
  id: number
  name: string
  slug: string
}

function isOtherService(service: Service | null): boolean {
  if (!service) return false
  if (service.id === 10) return true

  const slug = (service.slug || '').trim().toLowerCase()
  const name = (service.name || '').trim().toLowerCase()

  const otherWord = /\bothers?\b/i

  if (slug === 'other' || slug === 'others') return true
  if (otherWord.test(slug)) return true

  if (name === 'other' || name === 'others') return true
  if (otherWord.test(name)) return true

  // Arabic fallback (in case slug isn't stable)
  if (service.name?.includes('أخرى') || service.name?.includes('اخرى')) return true

  return false
}

function safeParseSelectedServiceId(value: string | null): number | null {
  if (!value) return null

  const coerceFiniteNumber = (input: unknown): number | null => {
    const n = typeof input === 'string' ? Number(input) : (input as number)
    return Number.isFinite(n) ? n : null
  }

  try {
    const parsed = JSON.parse(value) as unknown
    if (Array.isArray(parsed)) return coerceFiniteNumber(parsed[0])
    return coerceFiniteNumber(parsed)
  } catch {
    return coerceFiniteNumber(value)
  }
}

export default function ServiceQuestion({ locale }: { locale: WizardLocale }) {
  const router = useRouter()
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [deliverablesLanguage, setDeliverablesLanguage] = useState<string | null>(
    null
  )

  const [services, setServices] = useState<Service[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useProjectStepErrorToast(error, locale)

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [servicePrompt, setServicePrompt] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      setProjectType(
        window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
      )
      setDeliverablesLanguage(
        window.sessionStorage.getItem(
          projectWizardStorage.deliverablesLanguageKey(locale)
        )
      )
      setSelectedId(
        safeParseSelectedServiceId(
          window.sessionStorage.getItem(projectWizardStorage.serviceIdsKey(locale))
        )
      )
      setServicePrompt(
        window.sessionStorage.getItem(projectWizardStorage.servicePromptKey(locale)) ||
        ''
      )
    } catch {
      // ignore
    }
  }, [locale])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setError(null)
      setLoading(true)
      try {
        const res = await fetch(
          getApiUrl('/api/common/setting/service'),
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            },
            cache: 'no-store',
          }
        )
        await assertProjectApiResponse(res)
        const json = (await res.json()) as { data?: Service[] }
        if (!cancelled) setServices(json.data || [])
      } catch (err) {
        if (!cancelled) {
          setError(
            getProjectApiErrorMessage(
              err,
              isRTL ? 'تعذر تحميل الخدمات.' : 'Failed to load services.'
            )
          )
          setServices([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [isRTL, locale])

  const title = isRTL
    ? 'ما نوع الخدمات  <br> التي تبحث عنها؟'
    : 'What type of services <br> are you looking for?'

  const selectedService = useMemo(
    () => (services || []).find((service) => service.id === selectedId) || null,
    [services, selectedId]
  )

  const isOtherSelected = isOtherService(selectedService)

  const canContinue = selectedId != null && services != null

  const toApiLanguage = (value: string | null) => {
    const v = (value || '').toLowerCase()
    if (v.includes('arab')) return 'arabic'
    if (v.includes('english')) return 'english'
    return locale === 'ar' ? 'arabic' : 'english'
  }

  const toApiProjectType = (value: string | null) => {
    if (value === 'ad_hoc') return 'ad_hoc'
    if (value === 'frame_work_agreement' || value === 'framework')
      return 'frame_work_agreement'
    if (value === 'urgent_request' || value === 'urgent') return 'urgent_request'
    return 'ad_hoc'
  }

  const persistSelection = (
    nextSelectedId: number,
    nextIsOtherSelected: boolean,
    nextPrompt: string,
    nextServiceLabel: string | null
  ) => {
    try {
      window.sessionStorage.setItem(
        projectWizardStorage.serviceIdsKey(locale),
        JSON.stringify(nextSelectedId)
      )
      window.sessionStorage.setItem(
        projectWizardStorage.servicePromptKey(locale),
        nextPrompt
      )
      if (nextIsOtherSelected || !nextServiceLabel?.trim()) {
        window.sessionStorage.removeItem(projectWizardStorage.serviceLabelKey(locale))
      } else {
        window.sessionStorage.setItem(
          projectWizardStorage.serviceLabelKey(locale),
          nextServiceLabel.trim()
        )
      }
      window.sessionStorage.setItem(
        projectWizardStorage.serviceIsOtherKey(locale),
        nextIsOtherSelected ? '1' : '0'
      )
    } catch {
      // ignore
    }
  }

  const resetDownstreamWizardState = (preservePrompt: boolean) => {
    try {
      clearStoredProjectRequestUuid(locale)
      window.sessionStorage.removeItem(projectWizardStorage.projectScopeSnapshotKey(locale))

      if (!preservePrompt) {
        window.sessionStorage.removeItem(projectWizardStorage.servicePromptKey(locale))
      }

      window.sessionStorage.setItem(
        projectWizardStorage.serviceComponentsPayloadKey(locale),
        JSON.stringify({ components: {} })
      )
      window.sessionStorage.setItem(
        projectWizardStorage.serviceComponentSlugsKey(locale),
        JSON.stringify([])
      )
      window.sessionStorage.setItem(
        projectWizardStorage.serviceScopeHasChildrenKey(locale),
        '0'
      )
      window.sessionStorage.setItem(
        projectWizardStorage.serviceScopeParentIdsKey(locale),
        JSON.stringify([])
      )
      window.sessionStorage.setItem(
        projectWizardStorage.serviceScopeChildIdsByParentKey(locale),
        JSON.stringify({})
      )
      window.sessionStorage.removeItem(projectWizardStorage.serviceManualScopesKey(locale))
      window.sessionStorage.removeItem(
        projectWizardStorage.serviceManualSubscopesByScopeKey(locale)
      )
    } catch {
      // ignore
    }
  }

  const submitSelection = async (payload: {
    serviceId: number
    isOtherSelected: boolean
    servicePrompt: string
    serviceLabel: string | null
  }) => {
    setError(null)

    persistSelection(
      payload.serviceId,
      payload.isOtherSelected,
      payload.servicePrompt,
      payload.serviceLabel
    )

    const token = getAuthToken()
    if (!token) {
      setError(isRTL ? 'يرجى تسجيل الدخول للمتابعة.' : 'Please sign in to continue.')
      return
    }

    setSubmitting(true)
    try {
      const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      }

      const prompt = payload.isOtherSelected ? payload.servicePrompt.trim() : ''
      const apiServiceId = payload.serviceId

      const initRes = await fetch(getApiUrl('/api/account/project/definition/initiate'), {
        method: 'POST',
        headers,
        body: JSON.stringify({
          language: toApiLanguage(deliverablesLanguage),
          type: toApiProjectType(projectType),
          service_id: apiServiceId,
          service_prompt: prompt,
        }),
      })

      await assertProjectApiResponse(initRes, 'Failed to create the project.')

      const initJson = (await initRes.json()) as unknown
      const projectUuid = extractProjectRequestUuid(initJson)
      if (!projectUuid) throw new Error('init_bad_response')

      writeStoredProjectRequestUuid(locale, projectUuid)
      try {
        window.sessionStorage.setItem(
          projectWizardStorage.serviceComponentsPayloadKey(locale),
          JSON.stringify({ components: {} })
        )
      } catch {
        // ignore
      }

      try {
        window.sessionStorage.setItem(
          projectWizardStorage.serviceComponentSlugsKey(locale),
          JSON.stringify([])
        )
        window.sessionStorage.setItem(
          projectWizardStorage.serviceScopeHasChildrenKey(locale),
          '0'
        )
        window.sessionStorage.setItem(
          projectWizardStorage.serviceScopeParentIdsKey(locale),
          JSON.stringify([])
        )
        window.sessionStorage.setItem(
          projectWizardStorage.serviceScopeChildIdsByParentKey(locale),
          JSON.stringify({})
        )
        window.sessionStorage.removeItem(projectWizardStorage.serviceManualScopesKey(locale))
        window.sessionStorage.removeItem(
          projectWizardStorage.serviceManualSubscopesByScopeKey(locale)
        )
      } catch {
        // ignore
      }

      router.push(`/${locale}/project/wizard/project-scope`)
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر إنشاء المشروع.' : 'Failed to create the project.'
        )
      )
    } finally {
      setSubmitting(false)
    }
  }

  const onContinue = async () => {
    if (!canContinue || selectedId == null || submitting) return

    if (isOtherSelected) {
      router.push(`/${locale}/project/wizard/project-scope`)
      return
    }

    await submitSelection({
      serviceId: selectedId,
      isOtherSelected,
      servicePrompt,
      serviceLabel: selectedService?.name || null,
    })
  }

  const onSelect = (service: Service) => {
    if (submitting) return
    if (service.id === selectedId) return

    setError(null)
    setSelectedId(service.id)

    const nextIsOtherSelected = isOtherService(service)
    const nextPrompt = nextIsOtherSelected ? servicePrompt : ''
    if (!nextIsOtherSelected) setServicePrompt('')
    persistSelection(
      service.id,
      nextIsOtherSelected,
      nextPrompt,
      nextIsOtherSelected ? null : service.name
    )

    if (nextIsOtherSelected) {
      resetDownstreamWizardState(true)
      router.push(`/${locale}/project/wizard/project-scope`)
      return
    }

    void submitSelection({
      serviceId: service.id,
      isOtherSelected: false,
      servicePrompt: '',
      serviceLabel: service.name,
    })
  }

  const cards = useMemo(() => services || [], [services])

  return (
    <div className="w-full max-w-5xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <ProjectSelectedTypeHeader
        locale={locale}
        entered={entered}
        projectTypeId={projectType}
      />

      <div
        className={`mt-2 text-start transition-all duration-700 ${entered
          ? 'opacity-100 translate-x-0'
          : isRTL
            ? 'opacity-0 translate-x-4'
            : 'opacity-0 -translate-x-4'
          }`}
      >
        {isEnglish ? (
          <style>{`
            #service-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `}</style>
        ) : null}
        <h2
          id="service-question-title"
          className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
          dangerouslySetInnerHTML={{ __html: title }} />
      </div>

      {error ? (
        <div className="mt-4 text-sm font-semibold text-rose-700">{error}</div>
      ) : null}

      <div className="mt-6 sm:mt-10 pb-[100px] lg:pb-0" role="radiogroup" aria-label={title}>
        {loading ? (
          <div className="text-sm font-semibold text-slate-600">
            {isRTL ? 'جاري التحميل…' : 'Loading…'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {cards.map((service, index) => {
              const checked = selectedId === service.id
              return (
                <ChoiceCard
                  key={service.id}
                  role="radio"
                  checked={checked}
                  title={service.name}
                  align="start"
                  size="sm"
                  isRTL={isRTL}
                  entered={entered}
                  delayMs={110 + index * 50}
                  onSelect={() => onSelect(service)}
                  className="min-h-[110px]"
                />
              )
            })}
          </div>
        )}
      </div>

      <div className=" fixed bottom-0 left-0 right-0 lg:static 
       border-t border-slate-200/70 bg-white/80 backdrop-blur-md lg:bottom-10 lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-0 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="lg:mt-8 flex items-center justify-between gap-3">
            <Link
              href={`/${locale}/project/wizard/deliverables-language`}
              className="btn-sm text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={onContinue}
              disabled={!canContinue || submitting}
              className={`btn-sm px-6 py-2 rounded-full ${canContinue && !submitting
                ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                : 'text-slate-500 bg-slate-200 cursor-not-allowed'
                }`}
            >
              {submitting ? (isRTL ? 'جاري المتابعة…' : 'Continuing…') : isRTL ? 'متابعة' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
