'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import Link from 'next/link'
import {
  IconArrowUp,
  IconCheck,
  IconSparklesFilled,
  IconChartBar,
  IconChartArrowsVertical,
  IconClipboardText,
  IconDeviceDesktopAnalytics,
  IconBuildingBank,
  IconTargetArrow,
  IconCoins,
  IconShieldCheck,
  IconReportAnalytics,
} from '@tabler/icons-react'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import {
  clearStoredProjectRequestUuid,
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

type TablerIcon = ComponentType<{ size?: number; stroke?: number; className?: string }>

type ServiceMeta = {
  Icon: TablerIcon
  iconClass: string
  description: { en: string; ar: string }
}

// Hardcoded presentation metadata per service slug. Icons are placeholders to be
// swapped for custom illustrations later.
const SERVICE_META: Record<string, ServiceMeta> = {
  'market-research': {
    Icon: IconChartBar,
    iconClass: 'bg-blue-50 text-blue-600',
    description: {
      en: 'Understand market size, demand, and competition.',
      ar: 'افهم حجم السوق والطلب والمنافسة.',
    },
  },
  'feasibility-study': {
    Icon: IconChartArrowsVertical,
    iconClass: 'bg-amber-50 text-amber-600',
    description: {
      en: 'Assess viability, profitability, and next steps.',
      ar: 'قيّم الجدوى والربحية والخطوات التالية.',
    },
  },
  'business-plan': {
    Icon: IconClipboardText,
    iconClass: 'bg-emerald-50 text-emerald-600',
    description: {
      en: 'Build a roadmap for strategy and operations.',
      ar: 'ابنِ خارطة طريق للاستراتيجية والعمليات.',
    },
  },
  'digital-transformation': {
    Icon: IconDeviceDesktopAnalytics,
    iconClass: 'bg-violet-50 text-violet-600',
    description: {
      en: 'Modernize processes and technology to scale.',
      ar: 'حدّث العمليات والتقنيات للتوسع.',
    },
  },
  'company-valuation': {
    Icon: IconBuildingBank,
    iconClass: 'bg-cyan-50 text-cyan-600',
    description: {
      en: "Determine your company's fair value.",
      ar: 'حدّد القيمة العادلة لشركتك.',
    },
  },
  'go-to-market-strategy': {
    Icon: IconTargetArrow,
    iconClass: 'bg-rose-50 text-rose-600',
    description: {
      en: 'Plan launch, positioning, and customer growth.',
      ar: 'خطّط للإطلاق والتموضع ونمو العملاء.',
    },
  },
  'fundraising-strategy': {
    Icon: IconCoins,
    iconClass: 'bg-teal-50 text-teal-600',
    description: {
      en: 'Prepare to raise capital and attract investors.',
      ar: 'استعد لجمع التمويل وجذب المستثمرين.',
    },
  },
  'policies-procedures-governance': {
    Icon: IconShieldCheck,
    iconClass: 'bg-indigo-50 text-indigo-600',
    description: {
      en: 'Set governance, policies, and compliance.',
      ar: 'ضع الحوكمة والسياسات والامتثال.',
    },
  },
}

const FALLBACK_SERVICE_META: ServiceMeta = {
  Icon: IconReportAnalytics,
  iconClass: 'bg-slate-100 text-slate-600',
  description: {
    en: 'Advisory tailored to your business needs.',
    ar: 'استشارة مصممة لاحتياجات عملك.',
  },
}

function getServiceMeta(service: Service): ServiceMeta {
  return SERVICE_META[(service.slug || '').trim().toLowerCase()] || FALLBACK_SERVICE_META
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
      clearStoredProposalMatchUuid(locale)
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
      const specifiedInsighterUuid = readStoredSpecifiedInsighterUuid(locale)
      const initiatePath = specifiedInsighterUuid
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
          service_prompt: prompt,
          prompt_ai: prompt,
        }),
      })

      await assertProjectApiResponse(initRes, 'Failed to create the project.')

      const initJson = (await initRes.json()) as unknown
      const projectUuid = extractProjectRequestUuid(initJson)
      if (!projectUuid) throw new Error('init_bad_response')

      writeStoredProjectRequestUuid(locale, projectUuid)
      if (specifiedInsighterUuid) {
        const proposalMatchUuid = extractProjectProposalMatchUuid(initJson)
        if (!proposalMatchUuid) throw new Error('init_bad_response')
        writeStoredProposalMatchUuid(locale, proposalMatchUuid)
      } else {
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
      nav.goNext()
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
      nav.goNext()
      return
    }

    void submitSelection({
      serviceId: service.id,
      isOtherSelected: false,
      servicePrompt: '',
      serviceLabel: service.name,
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

    const otherServiceId = otherService?.id ?? 10
    setSelectedId(otherServiceId)
    setError(null)
    resetDownstreamWizardState(true)

    await submitSelection({
      serviceId: otherServiceId,
      isOtherSelected: true,
      servicePrompt: prompt,
      serviceLabel: null,
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

            <div className="mt-6">
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
            </div>
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
