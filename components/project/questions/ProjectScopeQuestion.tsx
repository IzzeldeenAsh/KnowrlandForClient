'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconArrowUp, IconSparkles, IconX } from '@tabler/icons-react'
import ProjectSelectedTypeHeader from '@/components/project/ProjectSelectedTypeHeader'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import {
  extractProjectRequestUuid,
  readStoredProjectRequestUuid,
  writeStoredProjectRequestUuid,
} from '@/components/project/projectRequestUuid'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { projectWizardStorage, type WizardLocale } from '@/components/project/wizardStorage'

type ScopeChild = { id: number; name: string }
type ScopeParent = { id: number; name: string; children: ScopeChild[] }
type ManualScope = { id: string; name: string }

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
  attempt,
  maxAttempts,
}: {
  isRTL: boolean
  attempt: number
  maxAttempts: number
}) {
  const title = isRTL ? 'الذكاء الاصطناعي يولد نطاقات المشروع...' : 'Generating AI scopes...'
  const subtitle = isRTL
    ? `جاري التحقق من الاقتراحات… (${attempt}/${maxAttempts})`
    : `Checking for suggestions… (${attempt}/${maxAttempts})`

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

      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
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
        </div>
      </div>
    </div>
  )
}

function AiScopePromptComposer({
  isRTL,
  value,
  loading,
  hasGenerated,
  onChange,
  onSend,
}: {
  isRTL: boolean
  value: string
  loading: boolean
  hasGenerated: boolean
  onChange: (next: string) => void
  onSend: () => void
}) {
  const canSend = value.trim().length > 0 && !loading

  return (
    <div >
      <div
        className={`flex items-center gap-2 text-[11px] font-bold uppercase  text-sky-700 ${isRTL ? 'flex-row-reverse' : ''
          }`}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-sky-200/80 bg-white/80 text-sky-700 shadow-sm">
          <IconSparkles size={16} stroke={1.9} />
        </span>
        <span>{isRTL ? 'مولد نطاقات الذكاء الاصطناعي' : 'AI Scope Generator'}</span>
      </div>

      <div className="mt-4 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/85 shadow-sm">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              if (canSend) onSend()
            }
          }}
          rows={4}
          dir="auto"
          className="min-h-[148px] w-full resize-none border-0 bg-transparent px-5 py-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
          placeholder={
            isRTL
              ? 'صف خدمتك بالطريقة التي تكتب بها للذكاء الاصطناعي. مثال: أحتاج إلى خدمة تساعدني على تقييم سوق جديد وتحديد الفرص والمنافسين...'
              : 'Describe your service like you would ask AI. Example: I need help evaluating a new market, identifying opportunities, competitors, and the right research outputs...'
          }
        />

        <div
          className={`flex items-center justify-between gap-3 border-t border-slate-200/70 px-4 py-3 ${isRTL ? 'flex-row-reverse' : ''
            }`}
        >
          <div className="text-xs font-semibold text-slate-500">
            {isRTL
              ? 'حرّر الوصف ثم أعد التوليد في أي وقت. Shift + Enter لسطر جديد.'
              : 'Edit the prompt and regenerate anytime. Shift + Enter for a new line.'}
          </div>

          <button
            type="button"
            onClick={onSend}
            disabled={!canSend}
            aria-label={
              hasGenerated
                ? isRTL
                  ? 'إعادة توليد النطاقات'
                  : 'Regenerate scopes'
                : isRTL
                  ? 'توليد النطاقات'
                  : 'Generate scopes'
            }
            title={
              hasGenerated
                ? isRTL
                  ? 'إعادة توليد النطاقات'
                  : 'Regenerate scopes'
                : isRTL
                  ? 'توليد النطاقات'
                  : 'Generate scopes'
            }
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition ${canSend
                ? 'bg-[#1C7CBB] text-white shadow-lg shadow-sky-500/20 hover:bg-[#176799]'
                : 'bg-slate-200 text-slate-500'
              }`}
          >
            <IconArrowUp size={20} stroke={2.2} />
          </button>
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

function toApiLanguage(value: string | null, locale: WizardLocale) {
  const v = (value || '').toLowerCase()
  if (v.includes('arab')) return 'arabic'
  if (v.includes('english')) return 'english'
  return locale === 'ar' ? 'arabic' : 'english'
}

function toApiProjectType(value: string | null) {
  if (value === 'ad_hoc') return 'ad_hoc'
  if (value === 'frame_work_agreement' || value === 'framework') {
    return 'frame_work_agreement'
  }
  if (value === 'urgent_request' || value === 'urgent') return 'urgent_request'
  return 'ad_hoc'
}

// components are fetched after scope sync (next step)

export default function ProjectScopeQuestion({ locale }: { locale: WizardLocale }) {
  const router = useRouter()
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [deliverablesLanguage, setDeliverablesLanguage] = useState<string | null>(null)
  const [serviceId, setServiceId] = useState<number | null>(null)
  const [projectUuid, setProjectUuid] = useState('')
  const [servicePrompt, setServicePrompt] = useState('')

  const [scopes, setScopes] = useState<ScopeParent[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [aiAttempt, setAiAttempt] = useState(0)
  const [aiMode, setAiMode] = useState<'idle' | 'polling' | 'timeout'>('idle')

  useProjectStepErrorToast(error, locale)

  const [selectedParentIds, setSelectedParentIds] = useState<number[]>([])
  const [manualScopes, setManualScopes] = useState<ManualScope[]>([])
  const [otherOpen, setOtherOpen] = useState(false)

  const skipNextOtherRestoreRef = useRef(false)

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
      setServiceId(
        safeParseSelectedServiceId(
          window.sessionStorage.getItem(projectWizardStorage.serviceIdsKey(locale))
        )
      )
      setProjectUuid(readStoredProjectRequestUuid(locale))
      setServicePrompt(
        window.sessionStorage.getItem(projectWizardStorage.servicePromptKey(locale)) || ''
      )
      setSelectedParentIds(
        safeParseNumberArray(
          window.sessionStorage.getItem(
            projectWizardStorage.serviceScopeParentIdsKey(locale)
          )
        )
      )
      setManualScopes(
        safeParseManualScopes(
          window.sessionStorage.getItem(projectWizardStorage.serviceManualScopesKey(locale))
        )
      )
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

      if (isOther && skipNextOtherRestoreRef.current) {
        skipNextOtherRestoreRef.current = false
        return
      }

      setError(null)

      if (isOther) {
        setAiAttempt(0)

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
          for (let attempt = 1; attempt <= AI_POLL_ATTEMPTS; attempt += 1) {
            if (cancelled) return
            setAiAttempt(attempt)

            activeController?.abort()
            activeController = new AbortController()

            try {
              const url = getApiUrl(`/api/account/project/request/${projectUuid}`)
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

              if (res.ok) {
                const json = (await res.json()) as unknown
                const list = extractSuggestedScopesFromProjectRequest(json)
                if (list.length > 0) {
                  if (!cancelled) {
                    setScopes(list)
                    setAiMode('idle')
                  }
                  return
                }
              }
            } catch {
              // ignore, retry
            }

            if (attempt < AI_POLL_ATTEMPTS) await sleep(AI_POLL_INTERVAL_MS)
          }

          if (!cancelled) {
            setScopes([])
            setAiMode('timeout')
          }
        } catch {
          if (!cancelled) {
            setError(
              isRTL
                ? 'تعذر تحميل النطاقات المقترحة.'
                : 'Failed to load suggested scopes.'
            )
            setScopes([])
            setAiMode('idle')
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
      setAiAttempt(0)

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
  }, [isRTL, locale, projectUuid, serviceId])

  const isOtherFlow = useMemo(
    () => Boolean(serviceId) && (serviceId === 10 || readServiceIsOther(locale)),
    [locale, serviceId]
  )

  const namedManualScopes = useMemo(
    () => manualScopes.filter((s) => Boolean(String(s.name || '').trim())),
    [manualScopes]
  )

  const hasServiceSelection = serviceId != null
  const availableScopes = scopes || []
  const scopesReady = scopes !== null && !loading
  const noScopesAvailable = scopesReady && availableScopes.length === 0
  const hasAiRequest = isOtherFlow && Boolean(projectUuid)
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
        : 'Select AI-generated project scopes'
      : noScopesAvailable
        ? isRTL
          ? 'حسّن الوصف أو أضف نطاقاتك'
          : 'Refine your prompt or add your own scopes'
        : isRTL
          ? 'صف خدمتك لتوليد نطاقات المشروع'
          : 'Describe your service to generate AI scopes'
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
        ? 'يمكنك تعديل الوصف وإعادة التوليد في أي وقت، ثم اختيار أكثر من نطاق.'
        : 'Edit the prompt and regenerate anytime, then select one or more scopes.'
      : noScopesAvailable
        ? isRTL
          ? 'لم تظهر نطاقات بعد. عدّل الوصف أو أضف النطاقات يدويًا.'
          : 'No scopes appeared yet. Refine the prompt or add scopes manually.'
        : isRTL
          ? 'اكتب طلبك بالطريقة التي تستخدمها مع الذكاء الاصطناعي، ثم اضغط إرسال.'
          : 'Write your request the way you would ask AI, then press send.'
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

  const canContinue =
    (selectedParents.length > 0 || namedManualScopes.length > 0) && !loading

  const persistPrompt = (nextPrompt: string) => {
    setServicePrompt(nextPrompt)
    try {
      window.sessionStorage.setItem(projectWizardStorage.servicePromptKey(locale), nextPrompt)
    } catch {
      // ignore
    }
  }

  const clearGeneratedScopeSelections = () => {
    setSelectedParentIds([])

    try {
      window.sessionStorage.removeItem(projectWizardStorage.projectScopeSnapshotKey(locale))
      window.sessionStorage.setItem(
        projectWizardStorage.serviceScopeParentIdsKey(locale),
        JSON.stringify([])
      )
      window.sessionStorage.setItem(
        projectWizardStorage.serviceScopeChildIdsByParentKey(locale),
        JSON.stringify({})
      )
      window.sessionStorage.setItem(
        projectWizardStorage.serviceScopeHasChildrenKey(locale),
        '0'
      )
      window.sessionStorage.setItem(
        projectWizardStorage.serviceComponentSlugsKey(locale),
        JSON.stringify([])
      )
      window.sessionStorage.setItem(
        projectWizardStorage.serviceComponentsPayloadKey(locale),
        JSON.stringify({ components: {} })
      )
      window.sessionStorage.removeItem(
        projectWizardStorage.serviceManualSubscopesByScopeKey(locale)
      )
    } catch {
      // ignore
    }
  }

  const toggleParent = (id: number) => {
    setSelectedParentIds((prev) =>
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

  const addManualScope = () => {
    const next = [...manualScopes, { id: createClientId('scope:'), name: '' }]
    setManualScopes(next)
    setOtherOpen(true)
  }

  const updateManualScopeName = (id: string, name: string) => {
    setManualScopes((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, name } : s))
      persistManualScopes(next)
      return next
    })
  }

  const removeManualScope = (id: string) => {
    setManualScopes((prev) => {
      const next = prev.filter((s) => s.id !== id)
      persistManualScopes(next)
      return next
    })
  }

  const generateAiScopes = async () => {
    if (!isOtherFlow || !serviceId || loading) return

    const prompt = servicePrompt.trim()
    if (!prompt) {
      setError(
        isRTL
          ? 'اكتب وصفًا للخدمة أولًا لتوليد النطاقات.'
          : 'Write a service description first to generate scopes.'
      )
      return
    }

    const token = getAuthToken()
    if (!token) {
      setError(isRTL ? 'يرجى تسجيل الدخول للمتابعة.' : 'Please sign in to continue.')
      return
    }

    setError(null)
    clearGeneratedScopeSelections()
    setScopes(null)
    setLoading(true)
    setAiMode('polling')
    setAiAttempt(0)

    try {
      const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      }

      const initRes = await fetch(getApiUrl('/api/account/project/definition/initiate'), {
        method: 'POST',
        headers,
        body: JSON.stringify({
          language: toApiLanguage(deliverablesLanguage, locale),
          type: toApiProjectType(projectType),
          service_id: serviceId,
          service_prompt: prompt,
        }),
      })

      await assertProjectApiResponse(
        initRes,
        isRTL ? 'تعذر توليد نطاقات المشروع.' : 'Failed to generate project scopes.'
      )

      const initJson = (await initRes.json()) as unknown
      const nextProjectUuid = extractProjectRequestUuid(initJson)
      if (!nextProjectUuid) throw new Error('init_bad_response')

      skipNextOtherRestoreRef.current = true
      setProjectUuid(nextProjectUuid)

      writeStoredProjectRequestUuid(locale, nextProjectUuid)
      try {
        window.sessionStorage.setItem(projectWizardStorage.servicePromptKey(locale), prompt)
      } catch {
        // ignore
      }

      for (let attempt = 1; attempt <= AI_POLL_ATTEMPTS; attempt += 1) {
        setAiAttempt(attempt)

        try {
          const url = getApiUrl(`/api/account/project/request/${nextProjectUuid}`)
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

          if (res.ok) {
            const json = (await res.json()) as unknown
            const list = extractSuggestedScopesFromProjectRequest(json)
            if (list.length > 0) {
              setScopes(list)
              setAiMode('idle')
              return
            }
          }
        } catch {
          // ignore, retry
        }

        if (attempt < AI_POLL_ATTEMPTS) await sleep(AI_POLL_INTERVAL_MS)
      }

      setScopes([])
      setAiMode('timeout')
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر توليد نطاقات المشروع.' : 'Failed to generate project scopes.'
        )
      )
      setScopes([])
      setAiMode('idle')
    } finally {
      setLoading(false)
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

      persistManualScopes(manualScopes)

      window.sessionStorage.setItem(
        projectWizardStorage.serviceScopeHasChildrenKey(locale),
        hasAnyChildren || namedManualScopes.length > 0 ? '1' : '0'
      )
    } catch {
      // ignore
    }

    router.push(`/${locale}/project/wizard/project-subscopes`)
  }

  return (
    <div className="mx-auto w-full max-w-5xl" dir={isRTL ? 'rtl' : 'ltr'}>
      <ProjectSelectedTypeHeader
        locale={locale}
        entered={entered}
        projectTypeId={projectType}
        status={
          isOtherFlow && aiMode === 'polling' ? (
            <span className={`inline-flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-40 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              <span className="animate-pulse">
                {isRTL ? 'يولّد الذكاء الاصطناعي النطاقات…' : 'AI generating scopes…'}
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
          className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="mt-2 text-sm font-semibold text-slate-600 sm:text-base">{subtitle}</p>
      </div>

      {error ? <div className="mt-4 text-sm font-semibold text-rose-700">{error}</div> : null}



      <div className="mt-6 sm:mt-10 pb-[100px] pg:pb-0">
        {loading ? (
          isOtherFlow && aiMode === 'polling' ? (
            <AiGeneratingScopesLoader
              isRTL={isRTL}
              attempt={Math.max(1, aiAttempt)}
              maxAttempts={AI_POLL_ATTEMPTS}
            />
          ) : (
            <div className="text-sm font-semibold text-slate-600">
              {isRTL ? 'جاري التحميل…' : 'Loading…'}
            </div>
          )
        ) : showScopePicker ? (
          <div className="space-y-4">
            <div
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              role="group"
              aria-label={title}
            >
              {availableScopes.map((scope, index) => {
                const checked = selectedParentIds.includes(scope.id)
                return (
                  <label
                    key={scope.id}
                    className={`flex min-h-[72px] cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 text-start shadow-sm backdrop-blur-md transition-all duration-300 ${checked
                        ? 'border-blue-300 bg-white/70'
                        : 'border-white/30 bg-white/40 hover:bg-white/55'
                      } ${entered
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
                      className="h-5 w-5 shrink-0 rounded border-slate-300 text-[#1C7CBB] focus:ring-2 focus:ring-blue-200"
                    />
                    <span className="text-sm font-semibold text-slate-900 sm:text-base">
                      {scope.name}
                    </span>
                  </label>
                )
              })}

              <label
                className={`flex min-h-[72px] cursor-pointer items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-start shadow-sm backdrop-blur-md transition-all duration-300 ${showOtherEditor
                    ? 'border-blue-300 bg-white/70'
                    : 'border-white/30 bg-white/40 hover:bg-white/55'
                  } ${entered
                    ? 'translate-x-0 opacity-100'
                    : isRTL
                      ? 'translate-x-4 opacity-0'
                      : '-translate-x-4 opacity-0'
                  }`}
                style={{ transitionDelay: `${110 + availableScopes.length * 45}ms` }}
              >
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <input
                    type="checkbox"
                    checked={showOtherEditor}
                    onChange={() => setOtherOpen((prev) => !prev)}
                    className="h-5 w-5 shrink-0 rounded border-slate-300 text-[#1C7CBB] focus:ring-2 focus:ring-blue-200"
                  />
                  <span className="text-sm font-semibold text-slate-900 sm:text-base">
                    {isRTL ? 'أخرى' : 'Other'}
                  </span>
                </div>

                <span className="text-xs font-semibold text-slate-500">
                  {namedManualScopes.length > 0
                    ? isRTL
                      ? `تمت إضافة: ${namedManualScopes.length}`
                      : `Added: ${namedManualScopes.length}`
                    : isRTL
                      ? 'أضف نطاقاتك الخاصة'
                      : 'Add your own scopes'}
                </span>
              </label>
            </div>

            {showOtherEditor ? (
              <div className="space-y-3 rounded-3xl border border-white/30 bg-white/40 p-5 shadow-sm backdrop-blur-md sm:p-6">
                <div className="text-sm font-semibold text-slate-900">
                  {isRTL ? 'نطاقات أخرى' : 'Other scopes'}
                </div>

                <div className="space-y-2">
                  {manualScopes.map((scope) => (
                    <div key={scope.id}>
                      <div
                        className={`flex items-center justify-between gap-3 ${isRTL ? 'flex-row-reverse' : ''
                          }`}
                      >
                        <div className="flex-1">
                          <input
                            value={scope.name}
                            onChange={(e) => updateManualScopeName(scope.id, e.target.value)}
                            placeholder={isRTL ? 'اسم النطاق…' : 'Scope name…'}
                            className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removeManualScope(scope.id)}
                          aria-label={isRTL ? 'إزالة النطاق' : 'Remove scope'}
                          title={isRTL ? 'إزالة' : 'Remove'}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 hover:bg-white"
                        >
                          <IconX size={16} stroke={1.8} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addManualScope}
                    className="btn-sm border border-slate-200 bg-white/80 text-slate-700 hover:bg-white"
                  >
                    {manualScopes.length > 0
                      ? isRTL
                        ? 'إضافة نطاق آخر'
                        : 'Add another scope'
                      : isRTL
                        ? 'إضافة نطاق'
                        : 'Add scope'}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : isOtherFlow ? (
          <div></div>
        ) : null}
      </div>
      {isOtherFlow ? (
        <div className="mt-6 sm:mt-10 pb-[100px] sm:pb-0">
          <AiScopePromptComposer
            isRTL={isRTL}
            value={servicePrompt}
            loading={loading}
            hasGenerated={hasAiRequest || availableScopes.length > 0 || aiMode === 'timeout'}
            onChange={(next) => {
              if (error) setError(null)
              persistPrompt(next)
            }}
            onSend={generateAiScopes}
          />
        </div>
      ) : null}
      <div className="fixed bottom-0 left-0 right-0 lg:static border-t border-slate-200/70 bg-white/80 backdrop-blur-md lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
        <div className="mx-auto w-full max-w-6xl px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] lg:px-0">
          <div className="mt-4 lg:mt-8 flex items-center justify-between gap-3">
            <Link
              href={`/${locale}/project/wizard/service`}
              className="btn-sm border border-slate-200 bg-white/80 text-slate-700 hover:bg-white"
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
              {isRTL ? 'متابعة' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
