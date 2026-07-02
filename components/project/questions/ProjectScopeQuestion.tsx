'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { IconArrowUp, IconCheck, IconPlusFilled, IconSparklesFilled, IconXboxXFilled } from '@tabler/icons-react'
import ProjectSelectedTypeHeader from '@/components/project/ProjectSelectedTypeHeader'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import {
  clearStoredProjectRequestUuid,
  readStoredProjectRequestUuid,
} from '@/components/project/projectRequestUuid'
import { clearStoredProposalMatchUuid } from '@/components/project/projectProposalMatchUuid'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { useProjectWizardNavigation } from '@/components/project/useProjectWizardNavigation'
import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { projectWizardStorage, type WizardLocale } from '@/components/project/wizardStorage'

type ScopeChild = { id: number; name: string }
type ScopeParent = { id: number; name: string; children: ScopeChild[] }
type ManualScope = { id: string; name: string }
type AiIntakeQuestion = { key: string; question: string }
type AiIntakeStatus = 'idle' | 'polling' | 'clarification' | 'failed' | 'timeout'

const AI_POLL_ATTEMPTS = 6
const AI_POLL_INTERVAL_MS = 5000

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms))
}

function createClientId(prefix: string) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}${crypto.randomUUID()}`
  }
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`
}

function safeParseManualScopes(value: string | null): ManualScope[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((item) => ({
        id: typeof (item as any)?.id === 'string' ? String((item as any).id) : '',
        name:
          typeof (item as any)?.name === 'string' ? String((item as any).name) : '',
      }))
      .filter((x) => Boolean(x.id) && Boolean(x.name?.trim()))
  } catch {
    return []
  }
}

function stableHash(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return hash
}

function coerceNumericIdOrHash(rawId: unknown, name: string): number {
  const n = typeof rawId === 'string' ? Number(rawId) : Number(rawId as number)
  if (Number.isFinite(n)) return n
  const h = stableHash(name || '')
  if (h === 0) return -1
  return h < 0 ? h : -h
}

function AiGeneratingScopesLoader({
  isRTL,
  requestUnderstood,
}: {
  isRTL: boolean
  requestUnderstood: boolean
}) {
  const title = requestUnderstood
    ? isRTL
      ? 'تم فهم طلبك'
      : 'Request understood'
    : isRTL
      ? 'جار البحث...'
      : 'Thinking...'
  const subtitle = requestUnderstood
    ? isRTL
      ? 'جاري تحديد النطاقات المناسبة لطلبك.'
      : 'Preparing the right scopes for your request.'
    : ''

  return (
    <div >
      <style>{`
        @keyframes ai-scope-shimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>

      <div className="flex items-center gap-3 text-start">
        <div className="min-w-0">
          <div
            className="text-xl font-semibold tracking-[0.02em] sm:text-2xl"
            style={{
              color: 'rgba(15, 23, 42, 0.18)',
              backgroundImage:
                'linear-gradient(90deg, rgba(30,64,175,0.55) 0%, rgba(30,64,175,0.55) 35%, rgba(37,99,235,1) 50%, rgba(30,64,175,0.55) 65%, rgba(30,64,175,0.55) 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'ai-scope-shimmer 2s linear infinite',
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div className="mt-1 text-sm font-semibold text-slate-500">
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function safeParseNumberArray(value: string | null): number[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.map((n) => Number(n)).filter((n) => Number.isFinite(n))
  } catch {
    return []
  }
}

function normalizeAiIntakeQuestions(input: unknown): AiIntakeQuestion[] {
  if (!Array.isArray(input)) return []

  return input
    .map((item) => {
      const raw = item as any
      const key = String(raw?.key ?? raw?.id ?? '').trim()
      const question = String(raw?.question ?? raw?.text ?? raw?.label ?? '').trim()

      return { key, question }
    })
    .filter((item) => Boolean(item.key) && Boolean(item.question))
}

function extractAiIntakeStatus(payload: unknown): {
  status: string
  needsClarification: boolean
  questions: AiIntakeQuestion[]
} {
  const data = (payload as any)?.data ?? payload
  const status = String((data as any)?.status ?? '').trim().toLowerCase()
  const questions = normalizeAiIntakeQuestions((data as any)?.questions)

  return {
    status,
    needsClarification:
      Boolean((data as any)?.needs_clarification) ||
      status === 'needs_clarification',
    questions,
  }
}

function AiClarificationQuestions({
  isRTL,
  questions,
  answers,
  submitting,
  onAnswer,
  onSubmit,
}: {
  isRTL: boolean
  questions: AiIntakeQuestion[]
  answers: Record<string, string>
  submitting: boolean
  onAnswer: (key: string, value: string) => void
  onSubmit: () => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentQuestion = questions[currentIndex] || null
  const currentAnswer = currentQuestion
    ? String(answers[currentQuestion.key] || '').trim()
    : ''
  const isFirstQuestion = currentIndex === 0
  const isLastQuestion = currentIndex >= questions.length - 1
  const allAnswered =
    questions.length > 0 &&
    questions.every((question) => String(answers[question.key] || '').trim())

  useEffect(() => {
    setCurrentIndex(0)
  }, [questions])

  const goPrevious = () => {
    setCurrentIndex((index) => Math.max(0, index - 1))
  }

  const goNext = () => {
    if (!currentAnswer) return
    setCurrentIndex((index) => Math.min(questions.length - 1, index + 1))
  }

  if (!currentQuestion) return null

  return (
    <div className="max-w-3xl rounded-2xl border border-sky-100 bg-white/80 p-4 shadow-sm">
      <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sky-200/80 bg-sky-50 text-sky-600">
          <IconSparklesFilled size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-slate-900">
            {isRTL ? 'نحتاج بعض التفاصيل قبل المتابعة' : 'A few details are needed before continuing'}
          </div>
          <div className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">
            {isRTL
              ? 'أجب على الأسئلة القصيرة وسنراجع الطلب مرة أخرى.'
              : 'Answer the short questions and we will review the request again.'}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className={`mb-3 flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {questions.map((question, index) => (
            <span
              key={question.key}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-[#1C7CBB]'
                  : answers[question.key]?.trim()
                    ? 'w-3 bg-sky-300'
                    : 'w-3 bg-slate-200'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        <label className="block">
          <span className="block rounded-2xl rounded-bl-md bg-slate-100 px-3 py-2 text-sm font-semibold leading-relaxed text-slate-800">
            {currentQuestion.question}
          </span>
          <textarea
            value={answers[currentQuestion.key] || ''}
            onChange={(event) => onAnswer(currentQuestion.key, event.target.value)}
            rows={2}
            dir="auto"
            placeholder={isRTL ? 'اكتب إجابتك...' : 'Type your answer...'}
            className="mt-2 min-h-[54px] w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
          />
        </label>
      </div>

      <div className={`mt-4 flex items-center justify-between gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <button
          type="button"
          onClick={goPrevious}
          disabled={isFirstQuestion || submitting}
          className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition ${
            !isFirstQuestion && !submitting
              ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              : 'cursor-not-allowed border border-slate-100 bg-slate-100 text-slate-400'
          }`}
        >
          {isRTL ? 'السابق' : 'Back'}
        </button>

        <button
          type="button"
          onClick={isLastQuestion ? onSubmit : goNext}
          disabled={submitting || !currentAnswer || (isLastQuestion && !allAnswered)}
          className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition ${
            !submitting && currentAnswer && (!isLastQuestion || allAnswered)
              ? 'bg-[#1C7CBB] text-white hover:bg-[#176799]'
              : 'cursor-not-allowed bg-slate-200 text-slate-500'
          }`}
        >
          <span>
            {submitting
              ? isRTL
                ? 'جاري الإرسال...'
                : 'Sending...'
              : isLastQuestion
                ? isRTL
                  ? 'إرسال الإجابات'
                  : 'Send answers'
                : isRTL
                  ? 'التالي'
                  : 'Next'}
          </span>
          <IconArrowUp size={16} stroke={2.2} />
        </button>
      </div>
    </div>
  )
}

function AiIntakeFallback({
  isRTL,
  mode,
  onBackToServices,
}: {
  isRTL: boolean
  mode: 'failed' | 'timeout'
  onBackToServices: () => void
}) {
  const title =
    mode === 'timeout'
      ? isRTL
        ? 'استغرق تحليل الطلب وقتًا أطول من المتوقع'
        : 'The prompt analysis took longer than expected'
      : isRTL
        ? 'تعذر تحليل الطلب'
        : 'The prompt could not be analyzed'

  const message = isRTL
    ? 'يرجى الرجوع واختيار خدمة من الخدمات المعرّفة مسبقًا للمتابعة.'
    : 'Please go back and choose one of the predefined services to continue.'

  return (
    <div className="max-w-2xl rounded-2xl border border-rose-100 bg-white/85 p-4 shadow-sm">
      <div className="text-base font-semibold text-slate-900">{title}</div>
      <p className="mt-1.5 text-sm font-semibold leading-relaxed text-slate-600">
        {message}
      </p>
      <button
        type="button"
        onClick={onBackToServices}
        className="mt-4 rounded-full bg-[#1C7CBB] px-5 py-2 text-sm font-semibold text-white hover:bg-[#176799]"
      >
        {isRTL ? 'اختيار خدمة معرّفة مسبقًا' : 'Choose a predefined service'}
      </button>
    </div>
  )
}

function safeParseSelectedServiceId(value: string | null): number | null {
  if (!value) return null
  try {
    const parsed = JSON.parse(value) as unknown
    const n = Array.isArray(parsed) ? Number(parsed[0]) : Number(parsed)
    return Number.isFinite(n) ? n : null
  } catch {
    const n = Number(value)
    return Number.isFinite(n) ? n : null
  }
}

function readServiceIsOther(locale: WizardLocale): boolean {
  if (typeof window === 'undefined') return false
  try {
    const raw = window.sessionStorage.getItem(projectWizardStorage.serviceIsOtherKey(locale))
    return raw === '1' || raw === 'true'
  } catch {
    return false
  }
}

function coerceScopeParents(input: unknown): ScopeParent[] {
  if (!Array.isArray(input)) return []

  return input
    .map((item, parentIndex) => {
      const raw = item as any
      const name =
        typeof raw === 'string' || typeof raw === 'number'
          ? String(raw).trim()
          : String(raw?.name ?? raw?.title ?? raw?.label ?? '').trim()
      const id = coerceNumericIdOrHash(raw?.id, name || String(parentIndex))
      const childrenRaw = raw?.children
      const children: ScopeChild[] = Array.isArray(childrenRaw)
        ? childrenRaw
          .map((c: any, childIndex: number) => {
            const childName =
              typeof c === 'string' || typeof c === 'number'
                ? String(c).trim()
                : String(c?.name ?? c?.title ?? c?.label ?? '').trim()
            return {
              id: coerceNumericIdOrHash(
                c?.id,
                `${name}:${childName || String(childIndex)}`
              ),
              name: childName,
            }
          })
          .filter((c: ScopeChild) => Number.isFinite(c.id) && Boolean(c.name?.trim()))
        : []

      if (!Number.isFinite(id) || !name) return null
      return { id, name, children }
    })
    .filter((x): x is ScopeParent => Boolean(x))
}

function extractSuggestedScopesFromProjectRequest(json: unknown): ScopeParent[] {
  const root = (json as any)?.data ?? json

  const candidates: unknown[] = [
    (root as any)?.suggest_scopes,
    (root as any)?.suggested_scopes,
    (root as any)?.suggest_scope,
    (root as any)?.suggest_scopes_expected,
    (root as any)?.suggest_scopes_with_children,
    (root as any)?.scopes,
  ]

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return coerceScopeParents(candidate)
    if (candidate && typeof candidate === 'object' && Array.isArray((candidate as any).data)) {
      return coerceScopeParents((candidate as any).data)
    }
  }

  if (root && typeof root === 'object') {
    const values = Object.values(root as Record<string, unknown>)
    for (const value of values) {
      if (Array.isArray(value)) {
        const coerced = coerceScopeParents(value)
        if (coerced.length > 0) return coerced
      }
      if (value && typeof value === 'object' && Array.isArray((value as any).data)) {
        const coerced = coerceScopeParents((value as any).data)
        if (coerced.length > 0) return coerced
      }
    }
  }

  return []
}

// components are fetched after scope sync (next step)

export default function ProjectScopeQuestion({ locale }: { locale: WizardLocale }) {
  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [serviceId, setServiceId] = useState<number | null>(null)
  const [projectUuid, setProjectUuid] = useState('')

  const [scopes, setScopes] = useState<ScopeParent[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [aiMode, setAiMode] = useState<AiIntakeStatus>('idle')
  const [aiQuestions, setAiQuestions] = useState<AiIntakeQuestion[]>([])
  const [aiAnswers, setAiAnswers] = useState<Record<string, string>>({})
  const [submittingClarification, setSubmittingClarification] = useState(false)
  const [aiPollVersion, setAiPollVersion] = useState(0)
  const [aiRequestUnderstood, setAiRequestUnderstood] = useState(false)
  const delayNextAiClarificationCheckRef = useRef(false)

  useProjectStepErrorToast(error, locale)

  const [selectedParentIds, setSelectedParentIds] = useState<number[]>([])
  const [manualScopes, setManualScopes] = useState<ManualScope[]>([])
  const [selectedManualScopeIds, setSelectedManualScopeIds] = useState<string[]>([])
  const [otherOpen, setOtherOpen] = useState(false)
  const [pendingScopeName, setPendingScopeName] = useState<string | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      setProjectType(
        window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
      )
      setServiceId(
        safeParseSelectedServiceId(
          window.sessionStorage.getItem(projectWizardStorage.serviceIdsKey(locale))
        )
      )
      setProjectUuid(readStoredProjectRequestUuid(locale))
      setSelectedParentIds(
        safeParseNumberArray(
          window.sessionStorage.getItem(
            projectWizardStorage.serviceScopeParentIdsKey(locale)
          )
        )
      )
      const storedManualScopes = safeParseManualScopes(
        window.sessionStorage.getItem(projectWizardStorage.serviceManualScopesKey(locale))
      )
      setManualScopes(storedManualScopes)
      setSelectedManualScopeIds(storedManualScopes.map((scope) => scope.id))
    } catch {
      // ignore
    }
  }, [locale])

  useEffect(() => {
    let cancelled = false
    let activeController: AbortController | null = null

    const load = async () => {
      if (!serviceId) {
        setScopes([])
        return
      }

      const isOther = serviceId === 10 || readServiceIsOther(locale)

      setError(null)

      if (isOther) {
        setAiQuestions([])
        setAiAnswers({})

        if (!projectUuid) {
          setAiMode('idle')
          setLoading(false)
          setScopes(null)
          return
        }

        const token = getAuthToken()
        if (!token) {
          setError(isRTL ? 'يرجى تسجيل الدخول للمتابعة.' : 'Please sign in to continue.')
          setAiMode('idle')
          setScopes(null)
          return
        }

        setLoading(true)
        setAiMode('polling')

        try {
          if (delayNextAiClarificationCheckRef.current) {
            delayNextAiClarificationCheckRef.current = false
            await sleep(AI_POLL_INTERVAL_MS)
            if (cancelled) return
          }

          for (let attempt = 1; attempt <= AI_POLL_ATTEMPTS; attempt += 1) {
            if (cancelled) return
            activeController?.abort()
            activeController = new AbortController()

            try {
              const url = getApiUrl(
                `/api/account/project/definition/ai-intake/check-clarification/${projectUuid}`
              )
              const res = await fetch(url, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: 'application/json',
                  'Accept-Language': locale === 'ar' ? 'ar' : 'en',
                  'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
                },
                cache: 'no-store',
                signal: activeController.signal,
              })

              await assertProjectApiResponse(
                res,
                isRTL
                  ? 'تعذر التحقق من حالة الطلب.'
                  : 'Failed to check the prompt status.'
              )

              const json = (await res.json()) as unknown
              const intake = extractAiIntakeStatus(json)

              if (intake.needsClarification) {
                if (!cancelled) {
                  setAiQuestions(intake.questions)
                  setAiAnswers({})
                  setScopes(null)
                  setAiMode('clarification')
                }
                return
              }

              if (intake.status === 'ready') {
                activeController?.abort()
                activeController = new AbortController()

                const showRes = await fetch(
                  getApiUrl(`/api/account/project/show/${projectUuid}`),
                  {
                    method: 'GET',
                    headers: {
                      Authorization: `Bearer ${token}`,
                      Accept: 'application/json',
                      'Accept-Language': locale === 'ar' ? 'ar' : 'en',
                      'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
                    },
                    cache: 'no-store',
                    signal: activeController.signal,
                  }
                )

                await assertProjectApiResponse(
                  showRes,
                  isRTL
                    ? 'تعذر تحميل النطاقات المقترحة.'
                    : 'Failed to load suggested scopes.'
                )

                const showJson = (await showRes.json()) as unknown
                const showList = extractSuggestedScopesFromProjectRequest(showJson)

                if (!cancelled) {
                  setScopes(showList)
                  setAiMode('idle')
                }
                return
              }

              if (intake.status === 'failed') {
                if (!cancelled) {
                  setScopes(null)
                  setAiMode('failed')
                }
                return
              }
            } catch (err) {
              if (cancelled) return
              if (attempt >= AI_POLL_ATTEMPTS) {
                setError(
                  getProjectApiErrorMessage(
                    err,
                    isRTL
                      ? 'تعذر التحقق من حالة الطلب.'
                      : 'Failed to check the prompt status.'
                  )
                )
                setScopes(null)
                setAiMode('failed')
                return
              }
            }

            if (attempt < AI_POLL_ATTEMPTS) await sleep(AI_POLL_INTERVAL_MS)
          }

          if (!cancelled) {
            setScopes(null)
            setAiMode('timeout')
            setAiRequestUnderstood(false)
          }
        } catch {
          if (!cancelled) {
            setError(
              isRTL
                ? 'تعذر تحميل النطاقات المقترحة.'
                : 'Failed to load suggested scopes.'
            )
            setScopes(null)
            setAiMode('idle')
            setAiRequestUnderstood(false)
          }
        } finally {
          if (!cancelled) setLoading(false)
        }

        return
      }

      const token = getAuthToken()
      if (!token) {
        setError(isRTL ? 'يرجى تسجيل الدخول للمتابعة.' : 'Please sign in to continue.')
        setScopes([])
        return
      }

      setLoading(true)
      setAiMode('idle')

      try {
        const url = getApiUrl(`/api/common/setting/service/scope/${serviceId}`)

        const res = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          cache: 'no-store',
        })

        await assertProjectApiResponse(
          res,
          isRTL ? 'تعذر تحميل نطاقات الخدمة.' : 'Failed to load service scopes.'
        )

        const json = (await res.json()) as unknown
        const list = coerceScopeParents((json as any)?.data)

        if (!cancelled) setScopes(list || [])
      } catch (err) {
        if (!cancelled) {
          setError(
            getProjectApiErrorMessage(
              err,
              isRTL ? 'تعذر تحميل نطاقات الخدمة.' : 'Failed to load service scopes.'
            )
          )
          setScopes([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
      activeController?.abort()
    }
  }, [aiPollVersion, isRTL, locale, projectUuid, serviceId])

  const isOtherFlow = useMemo(
    () => Boolean(serviceId) && (serviceId === 10 || readServiceIsOther(locale)),
    [locale, serviceId]
  )

  const namedManualScopes = useMemo(
    () => manualScopes.filter((s) => Boolean(String(s.name || '').trim())),
    [manualScopes]
  )

  const selectedManualScopes = useMemo(() => {
    const selected = new Set(selectedManualScopeIds)
    return namedManualScopes.filter((scope) => selected.has(scope.id))
  }, [namedManualScopes, selectedManualScopeIds])

  const hasServiceSelection = serviceId != null
  const availableScopes = scopes || []
  const scopesReady = scopes !== null && !loading
  const noScopesAvailable = scopesReady && availableScopes.length === 0
  const showScopePicker =
    hasServiceSelection &&
    (!isOtherFlow || scopesReady || namedManualScopes.length > 0 || otherOpen)

  const showOtherEditor =
    showScopePicker && (noScopesAvailable || otherOpen || namedManualScopes.length > 0)

  useEffect(() => {
    if (!showOtherEditor) return
    if (!otherOpen && !noScopesAvailable) return
    setManualScopes((prev) =>
      prev.length > 0 ? prev : [{ id: createClientId('scope:'), name: '' }]
    )
  }, [showOtherEditor, otherOpen, noScopesAvailable])

  const title = isOtherFlow
    ? availableScopes.length > 0
      ? isRTL
        ? 'اختر نطاقات المشروع التي أنشأها الذكاء الاصطناعي'
        : 'Select AI-suggested project scopes'
      : noScopesAvailable
        ? isRTL
          ? 'أضف نطاقات المشروع'
          : 'Add project scopes'
        : isRTL
          ? 'جار مراجعة طلب الخدمة'
          : 'Reviewing your service request'
    : noScopesAvailable
      ? isRTL
        ? 'أضف نطاقات المشروع'
        : 'Add project scopes'
      : isRTL
        ? 'اختر نطاق المشروع'
        : 'Select project scope'

  const subtitle = isOtherFlow
    ? availableScopes.length > 0
      ? isRTL
        ? 'اختر نطاقًا واحدًا أو أكثر للمتابعة.'
        : 'Select one or more scopes to continue.'
      : noScopesAvailable
        ? isRTL
          ? 'لم تظهر نطاقات بعد. أضف النطاقات يدويًا للمتابعة.'
          : 'No scopes appeared yet. Add scopes manually to continue.'
        : isRTL
          ? 'جار معالجة وصف الخدمة قبل عرض خيارات النطاقات.'
          : 'We are reviewing your service description before showing scope options.'
    : noScopesAvailable
      ? isRTL
        ? 'أضف نطاقات المشروع يدويًا (يمكنك إضافة أكثر من نطاق).'
        : 'Add your scopes manually (you can add multiple scopes).'
      : isRTL
        ? 'يمكنك اختيار أكثر من نطاق.'
        : 'You can select multiple scopes.'

  const selectedParents = useMemo(() => {
    if (!scopes) return []
    const set = new Set(selectedParentIds)
    return scopes.filter((s) => set.has(s.id))
  }, [scopes, selectedParentIds])

  const hasAnyChildren = selectedParents.some((s) => (s.children || []).length > 0)
  const aiIntakeBlocking =
    isOtherFlow &&
    (loading ||
      aiMode === 'polling' ||
      aiMode === 'clarification' ||
      aiMode === 'failed' ||
      aiMode === 'timeout' ||
      submittingClarification)

  const canContinue =
    (selectedParents.length > 0 || selectedManualScopes.length > 0) &&
    !aiIntakeBlocking

  const toggleParent = (id: number) => {
    setSelectedParentIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const selectableCount = availableScopes.length + namedManualScopes.length

  const allSelected =
    selectableCount > 0 &&
    availableScopes.every((s) => selectedParentIds.includes(s.id)) &&
    namedManualScopes.every((s) => selectedManualScopeIds.includes(s.id))

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedParentIds([])
      setSelectedManualScopeIds([])
    } else {
      setSelectedParentIds(availableScopes.map((s) => s.id))
      setSelectedManualScopeIds(namedManualScopes.map((s) => s.id))
    }
  }

  const toggleManualScope = (id: string) => {
    setSelectedManualScopeIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const persistManualScopes = (nextScopes: ManualScope[]) => {
    try {
      const cleaned = nextScopes
        .map((s) => ({ id: s.id, name: String(s.name || '').trim() }))
        .filter((s) => Boolean(s.id) && Boolean(s.name))

      if (cleaned.length > 0) {
        window.sessionStorage.setItem(
          projectWizardStorage.serviceManualScopesKey(locale),
          JSON.stringify(cleaned)
        )
      } else {
        window.sessionStorage.removeItem(projectWizardStorage.serviceManualScopesKey(locale))
      }
    } catch {
      // ignore
    }
  }

  const startAddScope = () => {
    if (pendingScopeName !== null) {
      const trimmed = pendingScopeName.trim()
      if (trimmed) {
        const id = createClientId('scope:')
        const next = [...manualScopes, { id, name: trimmed }]
        setManualScopes(next)
        setSelectedManualScopeIds((prev) => [...prev, id])
        persistManualScopes(next)
      }
    }
    setPendingScopeName('')
  }

  const commitPendingScope = () => {
    const trimmed = (pendingScopeName ?? '').trim()
    if (trimmed) {
      const id = createClientId('scope:')
      const next = [...manualScopes, { id, name: trimmed }]
      setManualScopes(next)
      setSelectedManualScopeIds((prev) => [...prev, id])
      persistManualScopes(next)
    }
    setPendingScopeName(null)
  }

  const cancelPendingScope = () => {
    setPendingScopeName(null)
  }

  const updateManualScopeName = (id: string, name: string) => {
    setManualScopes((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, name } : s))
      persistManualScopes(next)
      return next
    })
  }

  const removeManualScope = (id: string) => {
    setSelectedManualScopeIds((prev) => prev.filter((scopeId) => scopeId !== id))
    setManualScopes((prev) => {
      const next = prev.filter((s) => s.id !== id)
      persistManualScopes(next)
      return next
    })
  }

  const returnToDefinedServices = () => {
    try {
      window.sessionStorage.removeItem(projectWizardStorage.serviceIdsKey(locale))
      window.sessionStorage.removeItem(projectWizardStorage.serviceIsOtherKey(locale))
      window.sessionStorage.removeItem(projectWizardStorage.serviceLabelKey(locale))
      window.sessionStorage.removeItem(projectWizardStorage.servicePromptKey(locale))
      window.sessionStorage.removeItem(projectWizardStorage.projectScopeSnapshotKey(locale))
      window.sessionStorage.removeItem(projectWizardStorage.serviceManualScopesKey(locale))
      window.sessionStorage.removeItem(
        projectWizardStorage.serviceManualSubscopesByScopeKey(locale)
      )
      window.sessionStorage.setItem(
        projectWizardStorage.serviceScopeParentIdsKey(locale),
        JSON.stringify([])
      )
      window.sessionStorage.setItem(
        projectWizardStorage.serviceComponentSlugsKey(locale),
        JSON.stringify([])
      )
      window.sessionStorage.setItem(
        projectWizardStorage.serviceComponentsPayloadKey(locale),
        JSON.stringify({ components: {} })
      )
    } catch {
      // ignore
    }

    clearStoredProjectRequestUuid(locale)
    clearStoredProposalMatchUuid(locale)
    nav.goBack()
  }

  const submitAiClarificationAnswers = async () => {
    if (!projectUuid || aiQuestions.length === 0 || submittingClarification) return

    const payload = aiQuestions.map((question) => ({
      key: question.key,
      answer: String(aiAnswers[question.key] || '').trim(),
    }))

    if (payload.some((answer) => !answer.answer)) {
      setError(isRTL ? 'يرجى الإجابة على جميع الأسئلة.' : 'Please answer all questions.')
      return
    }

    const token = getAuthToken()
    if (!token) {
      setError(isRTL ? 'يرجى تسجيل الدخول للمتابعة.' : 'Please sign in to continue.')
      return
    }

    setSubmittingClarification(true)
    setError(null)

    try {
      const res = await fetch(
        getApiUrl(`/api/account/project/definition/ai-intake/answers/${projectUuid}`),
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          body: JSON.stringify({ answers: payload }),
        }
      )

      await assertProjectApiResponse(
        res,
        isRTL ? 'تعذر إرسال الإجابات.' : 'Failed to submit answers.'
      )

      setAiQuestions([])
      setAiAnswers({})
      setScopes(null)
      setAiRequestUnderstood(true)
      delayNextAiClarificationCheckRef.current = true
      setAiMode('polling')
      setAiPollVersion((version) => version + 1)
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر إرسال الإجابات.' : 'Failed to submit answers.'
        )
      )
    } finally {
      setSubmittingClarification(false)
    }
  }

  const onContinue = async () => {
    if (!canContinue || !serviceId || !projectUuid) return
    setError(null)

    try {
      window.sessionStorage.setItem(
        projectWizardStorage.serviceScopeParentIdsKey(locale),
        JSON.stringify(selectedParents.map((s) => s.id))
      )

      persistManualScopes(selectedManualScopes)

      window.sessionStorage.setItem(
        projectWizardStorage.serviceScopeHasChildrenKey(locale),
        hasAnyChildren || selectedManualScopes.length > 0 ? '1' : '0'
      )
    } catch {
      // ignore
    }

    nav.goNext()
  }

  return (
    <div className="mx-auto w-full max-w-5xl" dir={isRTL ? 'rtl' : 'ltr'}>
      <ProjectSelectedTypeHeader
        locale={locale}
        entered={entered}
        projectTypeId={projectType}
        status={
          isOtherFlow && aiMode === 'polling' ? (
            <span className="inline-flex items-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-40 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
            
            </span>
          ) : null
        }
      />

      <div
        className={`mt-2 text-start transition-all duration-700 ${entered
            ? 'translate-x-0 opacity-100'
            : isRTL
              ? 'translate-x-4 opacity-0'
              : '-translate-x-4 opacity-0'
          }`}
      >
        {isEnglish ? (
          <style>{`
            #project-scope-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `}</style>
        ) : null}
        <h2
          id="project-scope-question-title"
          className="text-xl font-medium tracking-tight text-slate-900 sm:text-2xl"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="mt-1.5 max-w-3xl text-sm font-semibold leading-relaxed text-slate-600">
          {subtitle}
        </p>
      </div>

      {error ? <div className="mt-4 text-sm font-semibold text-rose-700">{error}</div> : null}



      <div className="mt-5 pb-[100px] lg:pb-0 sm:mt-7">
        {loading ? (
          isOtherFlow && aiMode === 'polling' ? (
            <AiGeneratingScopesLoader
              isRTL={isRTL}
              requestUnderstood={aiRequestUnderstood}
            />
          ) : (
            <div className="text-sm font-semibold text-slate-600">
              {isRTL ? 'جاري التحميل…' : 'Loading…'}
            </div>
          )
        ) : isOtherFlow && aiMode === 'clarification' ? (
          <AiClarificationQuestions
            isRTL={isRTL}
            questions={aiQuestions}
            answers={aiAnswers}
            submitting={submittingClarification}
            onAnswer={(key, value) => {
              if (error) setError(null)
              setAiAnswers((prev) => ({ ...prev, [key]: value }))
            }}
            onSubmit={submitAiClarificationAnswers}
          />
        ) : isOtherFlow && (aiMode === 'failed' || aiMode === 'timeout') ? (
          <AiIntakeFallback
            isRTL={isRTL}
            mode={aiMode}
            onBackToServices={returnToDefinedServices}
          />
        ) : showScopePicker ? (
          <>
          {selectableCount > 0 ? (
            <div
              className={`mb-3 flex items-center ${isRTL ? 'justify-start flex-row-reverse' : 'justify-end'}`}
            >
              <button
                type="button"
                onClick={toggleSelectAll}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  allSelected
                    ? 'border-blue-300 bg-blue-50 text-[#1C7CBB]'
                    : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white'
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <span
                  className={`inline-flex h-4 w-4 items-center justify-center rounded border ${
                    allSelected
                      ? 'border-[#1C7CBB] bg-[#1C7CBB] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {allSelected ? <IconCheck size={12} stroke={3} /> : null}
                </span>
                {allSelected
                  ? isRTL
                    ? 'إلغاء تحديد الكل'
                    : 'Deselect all'
                  : isRTL
                    ? 'تحديد الكل'
                    : 'Select all'}
              </button>
            </div>
          ) : null}
          <div
            className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
            role="group"
            aria-label={title}
          >
            {availableScopes.map((scope, index) => {
              const checked = selectedParentIds.includes(scope.id)
              return (
                <label
                  key={scope.id}
                  className={`flex min-h-[56px] cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-start shadow-sm backdrop-blur-md transition-all duration-300 sm:px-4 ${
                    checked
                      ? 'border-blue-300 bg-white/70'
                      : 'border-white/30 bg-white/40 hover:bg-white/55'
                  } ${
                    entered
                      ? 'translate-x-0 opacity-100'
                      : isRTL
                        ? 'translate-x-4 opacity-0'
                        : '-translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${110 + index * 45}ms` }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleParent(scope.id)}
                    className="h-4 w-4 shrink-0 rounded border-slate-300 text-[#1C7CBB] focus:ring-2 focus:ring-blue-200"
                  />
                  <span className="text-sm font-semibold leading-snug text-slate-900">
                    {scope.name}
                  </span>
                </label>
              )
            })}

            {namedManualScopes.map((scope) => {
              const checked = selectedManualScopeIds.includes(scope.id)
              return (
              <div
                key={scope.id}
                className={`flex min-h-[56px] items-center gap-2.5 rounded-xl border px-3.5 py-3 shadow-sm backdrop-blur-md sm:px-4 ${
                  checked
                    ? 'border-blue-300 bg-white/70'
                    : 'border-white/30 bg-white/40'
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleManualScope(scope.id)}
                  className="h-4 w-4 shrink-0 rounded border-slate-300 text-[#1C7CBB] focus:ring-2 focus:ring-blue-200"
                />
                <span className={`flex-1 text-sm font-semibold leading-snug text-slate-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {scope.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeManualScope(scope.id)}
                  aria-label={isRTL ? 'إزالة النطاق' : 'Remove scope'}
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 hover:bg-white hover:text-slate-700"
                >
                  <IconXboxXFilled size={14} />
                </button>
              </div>
              )
            })}

            {pendingScopeName !== null ? (
              <div
                className={`flex min-h-[56px] items-center gap-2.5 rounded-xl border border-white/30 bg-white/55 px-3.5 py-3 shadow-sm backdrop-blur-md sm:px-4 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <span
                  className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border border-slate-300 bg-white/80"
                  aria-hidden="true"
                />
                <input
                  value={pendingScopeName}
                  onChange={(e) => setPendingScopeName(e.target.value)}
                  onBlur={commitPendingScope}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitPendingScope()
                    if (e.key === 'Escape') cancelPendingScope()
                  }}
                  placeholder={isRTL ? 'اسم النطاق…' : 'Scope name…'}
                  className={`flex-1 border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 shadow-none outline-none ring-0 placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-0 ${isRTL ? 'text-right' : 'text-left'}`}
                  autoFocus
                />
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={commitPendingScope}
                  aria-label={isRTL ? 'إضافة النطاق' : 'Add scope'}
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 active:bg-emerald-700"
                >
                  <IconCheck size={13} stroke={2.5} />
                </button>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={cancelPendingScope}
                  aria-label={isRTL ? 'إلغاء' : 'Cancel'}
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm hover:bg-rose-600 active:bg-rose-700"
                >
                  <IconXboxXFilled size={13} />
                </button>
              </div>
            ) : null}

            <button
              type="button"
              onMouseDown={(event) => {
                if (pendingScopeName !== null) event.preventDefault()
              }}
              onClick={startAddScope}
              className={`flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 bg-white/35 px-3.5 py-3 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-blue-50/30 sm:px-4 ${
                entered
                  ? 'translate-x-0 opacity-100'
                  : isRTL
                    ? 'translate-x-4 opacity-0'
                    : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: `${110 + availableScopes.length * 45}ms` }}
            >
              <IconPlusFilled size={15} className="shrink-0 text-blue-500" />
              <span className="text-sm font-semibold text-blue-500">
                {isRTL ? 'إضافة نطاق' : 'Add Scope'}
              </span>
            </button>
          </div>
          </>
        ) : isOtherFlow ? (
          <div></div>
        ) : null}
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] lg:px-0">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm rounded-full px-6 py-2 border border-slate-200 bg-white/80 text-slate-700 hover:bg-white"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={onContinue}
              disabled={!canContinue}
              className={`btn-sm rounded-full px-6 py-2 ${canContinue
                  ? 'bg-[#1C7CBB] text-white hover:bg-opacity-90'
                  : 'cursor-not-allowed bg-slate-200 text-slate-500'
                }`}
            >
              {nav.continueLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
