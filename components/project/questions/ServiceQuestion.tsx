'use client'
import { activeProjectServiceUuid, beginProjectService, forgetProjectService, readProjectServices, registerProjectService, selectProjectService } from '../projectServicesState'
import { clearStoredProjectRequestUuid, readStoredProjectRequestUuid } from '../projectRequestUuid'
import { definitionRequest } from '../projectDefinitionApi'


import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { serviceMetaForSlug, type ServiceMeta } from '../serviceMeta'
import {
  IconArrowUp,
  IconCheck,
  IconSparklesFilled,
} from '@tabler/icons-react'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import {
  extractProjectRequestUuid,
  writeStoredProjectRequestUuid,
} from '../projectRequestUuid'
import {
  clearStoredProposalMatchUuid,
  extractProjectProposalMatchUuid,
  writeStoredProposalMatchUuid,
} from '../projectProposalMatchUuid'
import { readStoredSpecifiedInsighterUuid } from '../specifiedInsighterProject'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { useProjectWizardNavigation } from '@/components/project/useProjectWizardNavigation'

type Service = {
  id: number
  name: string
  slug: string
}

function getServiceMeta(service: Service): ServiceMeta {
  return serviceMetaForSlug(service.slug)
}

function isOtherService(service: Service | null): boolean {
  if (!service) return false

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

function AiScopePromptComposer({
  isRTL,
  value,
  loading,
  onChange,
  onSend,
}: {
  isRTL: boolean
  value: string
  loading: boolean
  onChange: (next: string) => void
  onSend: () => void
}) {
  const canSend = value.trim().length > 0 && !loading

  return (
    <div>
      <style>{`
        .ai-service-input {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .ai-service-input::-webkit-scrollbar {
          display: none;
        }
        .ai-service-input:focus {
          outline: none !important;
          box-shadow: none !important;
          border-color: transparent !important;
        }
      `}</style>
      <div className="flex items-center gap-2.5 text-start">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sky-200/80 bg-gradient-to-br from-sky-50 to-cyan-100/80 text-sky-600 shadow-sm">
          <IconSparklesFilled size={18} className="animate-pulse" />
        </span>
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {isRTL ? 'أو صف خدمتك للذكاء الاصطناعي لنقترح عليك نطاقًا مناسبًا' : 'Or describe your service to our AI so we can suggest a related scope for you'}
          </h3>
        </div>
      </div>

      <div
        className={`mt-3 flex items-end gap-2 rounded-xl border border-slate-200/80 bg-white/85 px-3 py-3 shadow-sm ${isRTL ? 'flex-row-reverse' : ''
          }`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              if (canSend) onSend()
            }
          }}
          rows={2}
          dir={isRTL ? 'rtl' : 'ltr'}
          className={`ai-service-input min-h-[60px] w-full resize-none border-0 bg-transparent px-1 py-1 text-sm font-medium text-slate-900 outline-none focus:ring-0 placeholder:text-xs placeholder:text-slate-400 ${isRTL ? 'text-right' : 'text-left'}`}
          placeholder={isRTL ? 'صف خدمتك...' : 'Describe your service...'}
        />

        <button
          type="button"
          onClick={onSend}
          disabled={!canSend}
          aria-label={isRTL ? 'توليد النطاقات' : 'Generate scopes'}
          title={isRTL ? 'توليد النطاقات' : 'Generate scopes'}
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${canSend
              ? 'bg-[#1C7CBB] text-white shadow-md shadow-sky-500/20 hover:bg-[#176799]'
              : 'bg-slate-200 text-slate-500'
            }`}
        >
          <IconArrowUp size={18} stroke={2.2} />
        </button>
      </div>
    </div>
  )
}

export default function ServiceQuestion({ locale }: { locale: WizardLocale }) {
  const nav = useProjectWizardNavigation(locale)
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
      setServices(null)
      try {
        const specifiedInsighterUuid = readStoredSpecifiedInsighterUuid(locale)
        const servicePath = specifiedInsighterUuid
          ? `/api/common/setting/service/insighter/${encodeURIComponent(specifiedInsighterUuid)}`
          : '/api/common/setting/service'
        const fetchServiceList = async (path: string): Promise<Service[]> => {
          const res = await fetch(getApiUrl(path), {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            },
            cache: 'no-store',
          })
          await assertProjectApiResponse(res)
          const json = (await res.json()) as { data?: Service[] }
          if (!Array.isArray(json.data)) throw new Error('Invalid service list response.')
          return json.data
        }

        const availableServices = await fetchServiceList(servicePath)
        // The API permits "Other" even when it is not assigned to the Insighter.
        if (specifiedInsighterUuid && !availableServices.some(isOtherService)) {
          try {
            const catalog = await fetchServiceList('/api/common/setting/service')
            const other = catalog.find(isOtherService)
            if (other) availableServices.push(other)
          } catch {
            // The Insighter's eligible services remain usable without the optional "Other" choice.
          }
        }
        if (!cancelled) {
          const active = activeProjectServiceUuid(locale)
          const selected = readProjectServices(locale)
          // DEBUG: temporarily keep "Other" selectable even if already used, so the
          // backend's unique(project_id, service_id) rejection surfaces in the UI.
          setServices(availableServices.filter(service => isOtherService(service) || !selected.some(s => s.serviceId === service.id && s.uuid !== active)))
        }
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
    ? 'ما نوع الخدمات التي تبحث عنها؟'
    : 'What type of services are you looking for?'

  const selectedService = useMemo(
    () => (services || []).find((service) => service.id === selectedId) || null,
    [services, selectedId]
  )

  const otherService = useMemo(
    () => (services || []).find((service) => isOtherService(service)) || null,
    [services]
  )

  const predefinedServices = useMemo(
    () => (services || []).filter((service) => !isOtherService(service)),
    [services]
  )

  const isOtherSelected = isOtherService(selectedService)

  const canContinue = selectedService != null

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
      // Service selection must not discard the existing project.
      window.sessionStorage.removeItem(projectWizardStorage.projectScopeSnapshotKey(locale))
      window.sessionStorage.removeItem(projectWizardStorage.selectedMatchIdsKey(locale))

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
      window.sessionStorage.removeItem(projectWizardStorage.serviceAiSuggestedScopesKey(locale))
      window.sessionStorage.removeItem(
        projectWizardStorage.serviceManualSubscopesByScopeKey(locale)
      )
    } catch {
      // ignore
    }
  }

  const activeService = () =>
    readProjectServices(locale).find((s) => s.uuid === activeProjectServiceUuid(locale))

  const readActivePrompt = () => {
    try {
      return (window.sessionStorage.getItem(projectWizardStorage.servicePromptKey(locale)) || '').trim()
    } catch {
      return ''
    }
  }

  const submitSelection = async (payload: {
    serviceId: number
    isOtherSelected: boolean
    servicePrompt: string
    serviceLabel: string | null
    serviceSlug?: string
  }) => {
    setError(null)
    const existing = activeService()
    // Service being swapped out on the server once its replacement exists (specified projects only).
    let replacedServiceUuid = ''
    if (existing) {
      const unchanged =
        existing.serviceId === payload.serviceId &&
        (!payload.isOtherSelected || readActivePrompt() === payload.servicePrompt.trim())
      if (unchanged) {
        nav.goNext()
        return
      }

      if (readStoredSpecifiedInsighterUuid(locale)) {
        // The backend rejects a second copy of the same service, so an "Other" prompt cannot be swapped in place.
        if (existing.serviceId === payload.serviceId) {
          setError(
            isRTL
              ? 'لا يمكن تعديل وصف الخدمة المخصصة بعد إنشائها. تابع بها أو اختر خدمة أخرى.'
              : "A custom service's description can't be changed once it's created. Continue with it or pick a different service."
          )
          return
        }
        replacedServiceUuid = existing.uuid
      } else {
        // A general project holds one service and the backend cannot swap it,
        // so changing the service starts a fresh draft project.
        forgetProjectService(locale, existing.uuid)
        clearStoredProjectRequestUuid(locale)
        clearStoredProposalMatchUuid(locale)
      }
      beginProjectService(locale)
    }

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
      const insighterIndustryId = safeParseSelectedServiceId(
        window.sessionStorage.getItem(
          projectWizardStorage.insighterIndustryIdKey(locale)
        )
      )
      const specifiedInsighterUuid = readStoredSpecifiedInsighterUuid(locale)
      const existingProjectUuid = readStoredProjectRequestUuid(locale)
      const initiatePath = existingProjectUuid
        ? `/api/account/project/definition/service/${existingProjectUuid}`
        : specifiedInsighterUuid
        ? `/api/account/project/definition/initiate-specific/${encodeURIComponent(
            specifiedInsighterUuid
          )}`
        : '/api/account/project/definition/initiate'

      const initRes = await fetch(getApiUrl(initiatePath), {
        method: 'POST',
        headers,
        body: JSON.stringify({
          language: toApiLanguage(deliverablesLanguage),
          type: toApiProjectType(projectType),
          service_id: apiServiceId,
          ...(insighterIndustryId != null
            ? { insighter_industry_id: insighterIndustryId }
            : {}),
          service_prompt: prompt,
          prompt_ai: prompt,
        }),
      })

      await assertProjectApiResponse(initRes, 'Failed to create the project.')

      const initJson = (await initRes.json()) as unknown
      const projectUuid = existingProjectUuid || extractProjectRequestUuid(initJson)
      if (!projectUuid) throw new Error('init_bad_response')

      writeStoredProjectRequestUuid(locale, projectUuid)
      const data = (initJson as {data: {uuid?: string; project_services?: Array<{uuid: string; service: {id: number}}>}}).data
      const serviceUuid = existingProjectUuid ? data.uuid : data.project_services?.find(s => s.service.id === payload.serviceId)?.uuid
      if (!serviceUuid) throw new Error('The server did not return a project service identifier.')
      registerProjectService(locale, { uuid: serviceUuid, serviceId: payload.serviceId, label: payload.serviceLabel || (isRTL ? 'خدمة مخصصة' : 'Custom service'), slug: payload.serviceSlug, isOther: payload.isOtherSelected, complete: false })
      if (replacedServiceUuid) {
        await definitionRequest(locale, `service/${projectUuid}/${replacedServiceUuid}`, 'DELETE')
        forgetProjectService(locale, replacedServiceUuid)
        replacedServiceUuid = ''
      }
      if (specifiedInsighterUuid && !existingProjectUuid) {
        const proposalMatchUuid = extractProjectProposalMatchUuid(initJson)
        if (!proposalMatchUuid) throw new Error('init_bad_response')
        writeStoredProposalMatchUuid(locale, proposalMatchUuid)
      } else if (!specifiedInsighterUuid) {
        clearStoredProposalMatchUuid(locale)
      }
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
          projectWizardStorage.serviceAiSuggestedScopesKey(locale)
        )
        window.sessionStorage.removeItem(
          projectWizardStorage.serviceManualSubscopesByScopeKey(locale)
        )
      } catch {
        // ignore
      }

      nav.goNext()
    } catch (err) {
      // The replacement was never created, so the previous service stays active.
      if (replacedServiceUuid && !activeProjectServiceUuid(locale))
        selectProjectService(locale, replacedServiceUuid)
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
      await onSendAiPrompt()
      return
    }

    await submitSelection({
      serviceId: selectedId,
      isOtherSelected,
      servicePrompt,
      serviceLabel: selectedService?.name || null,
      serviceSlug: selectedService?.slug,
    })
  }

  const onSelect = (service: Service) => {
    if (submitting) return
    const existing = activeService()
    if (existing && service.id === existing.serviceId && !existing.isOther) {
      nav.goNext()
      return
    }
    if (service.id === selectedId && !existing) return

    setError(null)
    setSelectedId(service.id)

    const nextIsOtherSelected = isOtherService(service)
    const nextPrompt = nextIsOtherSelected ? servicePrompt : ''
    if (!nextIsOtherSelected) setServicePrompt('')
    // Keep an existing service's stored answers intact until the replacement is saved.
    if (!existing)
      persistSelection(
        service.id,
        nextIsOtherSelected,
        nextPrompt,
        nextIsOtherSelected ? null : service.name
      )

    if (nextIsOtherSelected) return

    void submitSelection({
      serviceId: service.id,
      isOtherSelected: false,
      servicePrompt: '',
      serviceLabel: service.name,
      serviceSlug: service.slug,
    })
  }

  const onSendAiPrompt = async () => {
    if (submitting) return

    const prompt = servicePrompt.trim()
    if (!prompt) {
      setError(
        isRTL
          ? 'اكتب وصفًا للخدمة أولًا لتوليد النطاقات.'
          : 'Write a service description first to generate scopes.'
      )
      return
    }

    if (!otherService) {
      setError(
        isRTL
          ? 'تعذر العثور على خدمة «أخرى».'
          : 'The Other service is currently unavailable.'
      )
      return
    }

    const otherServiceId = otherService.id
    setSelectedId(otherServiceId)
    setError(null)
    const existing = activeService()
    if (existing?.isOther && readActivePrompt() === prompt) {
      nav.goNext()
      return
    }
    if (!existing) resetDownstreamWizardState(true)

    await submitSelection({
      serviceId: otherServiceId,
      isOtherSelected: true,
      servicePrompt: prompt,
      serviceLabel: null,
      serviceSlug: otherService.slug,
    })
  }

  return (
    <div className="w-full max-w-6xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
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

      <div className="mt-6 sm:mt-8 pb-[100px] lg:pb-0">
        {loading ? (
          <div className="text-sm font-semibold text-slate-600">
            {isRTL ? 'جاري التحميل…' : 'Loading…'}
          </div>
        ) : (
          <>
            {!error && services?.length === 0 ? (
              <div className="text-sm font-semibold text-slate-600">
                {readStoredSpecifiedInsighterUuid(locale)
                  ? isRTL
                    ? 'لا توجد خدمات متاحة من هذا الخبير حاليًا.'
                    : 'This Insighter has no available services right now.'
                  : isRTL
                    ? 'لا توجد خدمات متاحة حاليًا.'
                    : 'No services are available right now.'}
              </div>
            ) : null}
            {predefinedServices.length > 0 ? (
              <div>
                <div
                  className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
                  role="radiogroup"
                  aria-label={
                    isRTL ? 'الخدمات المعرّفة مسبقًا' : 'Predefined services'
                  }
                >
                  {predefinedServices.map((service, index) => {
                    const checked = selectedId === service.id
                    const meta = getServiceMeta(service)
                    const ServiceIcon = meta.Icon
                    return (
                      <button
                        key={service.id}
                        type="button"
                        role="radio"
                        aria-checked={checked}
                        disabled={submitting}
                        onClick={() => onSelect(service)}
                        style={{ transitionDelay: `${110 + index * 35}ms` }}
                        className={`group relative flex min-h-[116px] items-start gap-3 rounded-2xl border p-3.5 text-start transition-all duration-300 disabled:cursor-not-allowed ${checked
                            ? 'border-[#1C7CBB] bg-white shadow-sm ring-1 ring-[#1C7CBB]'
                            : 'border-transparent bg-slate-100/80 hover:bg-slate-100'
                          } ${entered
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-2 opacity-0'
                          }`}
                      >
                        <span
                          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${meta.iconClass}`}
                        >
                          <ServiceIcon size={26} stroke={1.7} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold leading-snug text-slate-900">
                            {service.name}
                          </span>
                          <span className="mt-0.5 block text-xs font-medium leading-relaxed text-slate-500">
                            {isRTL ? meta.description.ar : meta.description.en}
                          </span>
                        </span>
                        {checked ? (
                          <span
                            className={`absolute top-2.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1C7CBB] text-white ${isRTL ? 'left-2.5' : 'right-2.5'}`}
                          >
                            <IconCheck size={12} stroke={3} />
                          </span>
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}

            {otherService && !activeProjectServiceUuid(locale) && <div className="mt-6">
              <AiScopePromptComposer
                isRTL={isRTL}
                value={servicePrompt}
                loading={submitting}
                onChange={(next) => {
                  if (error) setError(null)
                  setServicePrompt(next)
                }}
                onSend={onSendAiPrompt}
              />
            </div>}
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-0 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
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
              {submitting ? (isRTL ? 'جاري المتابعة…' : 'Continuing…') : nav.continueLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
