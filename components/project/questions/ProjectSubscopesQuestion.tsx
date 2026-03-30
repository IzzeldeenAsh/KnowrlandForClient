'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconCheck, IconPaperclip, IconPlus, IconX } from '@tabler/icons-react'
import ProjectSelectedTypeHeader from '@/components/project/ProjectSelectedTypeHeader'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import { readStoredProjectRequestUuid } from '@/components/project/projectRequestUuid'
import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { writeProjectScopeSnapshot } from '@/components/project/projectAddonsState'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { projectWizardStorage, type WizardLocale } from '@/components/project/wizardStorage'

type ScopeChild = { id: number; name: string }
type ScopeParent = { id: number; name: string; children: ScopeChild[] }

type ChildSelectionMap = Record<string, number[]>
type ManualScope = { id: string; name: string }
type ManualSubscope = { id: string; name: string }
type ManualSubscopesByScope = Record<string, ManualSubscope[]>

function createClientId(prefix: string) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}${crypto.randomUUID()}`
  }
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`
}

function manualScopeKey(scopeId: string) {
  return `m:${scopeId}`
}

function parentScopeKey(parentId: number) {
  return `p:${parentId}`
}

function normalizeScopeKey(scopeKey: string): string {
  if (!scopeKey) return ''
  if (scopeKey.startsWith('m:') || scopeKey.startsWith('p:')) return scopeKey
  return manualScopeKey(scopeKey)
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

function safeParseManualSubscopesByScope(value: string | null): ManualSubscopesByScope {
  if (!value) return {}
  try {
    const parsed = JSON.parse(value) as unknown
    if (!parsed || typeof parsed !== 'object') return {}
    const obj = parsed as Record<string, unknown>
    const out: ManualSubscopesByScope = {}
    Object.entries(obj).forEach(([rawScopeKey, subs]) => {
      if (!Array.isArray(subs)) return
      const scopeKey = normalizeScopeKey(rawScopeKey)
      if (!scopeKey) return
      const list = subs
        .map((s) => ({
          id: typeof (s as any)?.id === 'string' ? String((s as any).id) : '',
          name: typeof (s as any)?.name === 'string' ? String((s as any).name) : '',
        }))
        .filter((x) => Boolean(x.id))
      if (list.length > 0) out[scopeKey] = list
    })
    return out
  } catch {
    return {}
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

function safeParseObject(value: string | null): ChildSelectionMap {
  if (!value) return {}
  try {
    const parsed = JSON.parse(value) as unknown
    if (!parsed || typeof parsed !== 'object') return {}
    return parsed as ChildSelectionMap
  } catch {
    return {}
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

async function fetchServiceComponents(params: {
  locale: WizardLocale
  token: string
  serviceId: number
}): Promise<string[]> {
  const res = await fetch(
    getApiUrl(`/api/common/setting/service/component/${params.serviceId}`),
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${params.token}`,
        Accept: 'application/json',
        'Accept-Language': params.locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      cache: 'no-store',
    }
  )
  await assertProjectApiResponse(res, 'Failed to load service components.')
  const json = (await res.json()) as {
    data?: Array<{ id?: number; name?: string; slug?: string }>
  }
  return (json.data || [])
    .map((item) => item.slug)
    .filter((slug): slug is string => Boolean(slug && slug.trim()))
}

async function syncScopes(params: {
  locale: WizardLocale
  token: string
  projectUuid: string
  scopes: Array<{ name: string; subscopes: Array<{ name: string; files?: File[] }> }>
}) {
  const formData = new FormData()

  params.scopes.forEach((scope, i) => {
    formData.append(`scopes[${i}][name]`, scope.name)
    scope.subscopes.forEach((subscope, j) => {
      formData.append(`scopes[${i}][subscopes][${j}][name]`, subscope.name)
      ;(subscope.files || []).forEach((file, k) => {
        formData.append(`scopes[${i}][subscopes][${j}][file][${k}]`, file)
      })
    })
  })

  const res = await fetch(
    getApiUrl(`/api/account/project/request/scope/sync/${params.projectUuid}`),
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${params.token}`,
        Accept: 'application/json',
        'Accept-Language': params.locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: formData,
    }
  )

  await assertProjectApiResponse(res, 'Failed to save project scope.')
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let idx = 0
  while (value >= 1024 && idx < units.length - 1) {
    value /= 1024
    idx += 1
  }
  return `${value.toFixed(value >= 10 || idx === 0 ? 0 : 1)} ${units[idx]}`
}

function AttachmentTile({
  file,
  onRemove,
  isRTL,
}: {
  file: File
  onRemove: () => void
  isRTL: boolean
}) {
  const isImage = file.type.startsWith('image/')
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!isImage) return
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file, isImage])

  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/40 bg-white/55 px-1 p-1 shadow-sm">
      <div className="h-5 w-5 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white/70">
        {isImage && url ? (
          <img src={url} alt={file.name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full grid place-items-center text-[10px] font-bold text-slate-500">
            {file.name.split('.').pop()?.toUpperCase() || 'FILE'}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div title={file.name} className="truncate text-[11px] font-semibold text-slate-900">
          {file.name}
        </div>
        <div className="text-[10px] font-semibold text-slate-600">
          {formatBytes(file.size)}
        </div>
      </div>

      <button
        type="button"
        onClick={onRemove}
        aria-label={isRTL ? 'إزالة المرفق' : 'Remove attachment'}
        title={isRTL ? 'إزالة المرفق' : 'Remove attachment'}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
      >
        <IconX size={16} stroke={1.8} />
      </button>
    </div>
  )
}

const attachmentStore = new Map<string, File[]>()

export default function ProjectSubscopesQuestion({ locale }: { locale: WizardLocale }) {
  const router = useRouter()
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)

  const [scopes, setScopes] = useState<ScopeParent[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useProjectStepErrorToast(error, locale)

  const [selectedParentIds, setSelectedParentIds] = useState<number[]>([])
  const [childIdsByParent, setChildIdsByParent] = useState<ChildSelectionMap>({})
  const [manualSubscopesByScope, setManualSubscopesByScope] =
    useState<ManualSubscopesByScope>({})
  const [attachmentsByKey, setAttachmentsByKey] = useState<Record<string, File[]>>(
    {}
  )

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [activeChildKey, setActiveChildKey] = useState<string | null>(null)
  const [inputNonce, setInputNonce] = useState(0)

  const serviceId = useMemo(() => {
    if (typeof window === 'undefined') return null
    return safeParseSelectedServiceId(
      window.sessionStorage.getItem(projectWizardStorage.serviceIdsKey(locale))
    )
  }, [locale])

  const projectUuid = useMemo(() => readStoredProjectRequestUuid(locale), [locale])

  const manualScopes = useMemo(() => {
    if (typeof window === 'undefined') return []
    return safeParseManualScopes(
      window.sessionStorage.getItem(projectWizardStorage.serviceManualScopesKey(locale))
    )
  }, [locale])

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      setProjectType(
        window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
      )
      setSelectedParentIds(
        safeParseNumberArray(
          window.sessionStorage.getItem(
            projectWizardStorage.serviceScopeParentIdsKey(locale)
          )
        )
      )
      setChildIdsByParent(
        safeParseObject(
          window.sessionStorage.getItem(
            projectWizardStorage.serviceScopeChildIdsByParentKey(locale)
          )
        )
      )
      setManualSubscopesByScope(
        safeParseManualSubscopesByScope(
          window.sessionStorage.getItem(
            projectWizardStorage.serviceManualSubscopesByScopeKey(locale)
          )
        )
      )
      try {
        // persist normalized keys (backwards compatibility for older stored data)
        window.sessionStorage.setItem(
          projectWizardStorage.serviceManualSubscopesByScopeKey(locale),
          JSON.stringify(
            safeParseManualSubscopesByScope(
              window.sessionStorage.getItem(
                projectWizardStorage.serviceManualSubscopesByScopeKey(locale)
              )
            )
          )
        )
      } catch {
        // ignore
      }
    } catch {
      // ignore
    }
  }, [locale])

  useEffect(() => {
    if (manualScopes.length === 0) return

    setManualSubscopesByScope((prev) => {
      const allowedManualKeys = new Set(manualScopes.map((s) => manualScopeKey(s.id)))
      const manualScopeNameByKey = new Map(
        manualScopes.map((s) => [manualScopeKey(s.id), String(s.name || '').trim()])
      )
      const next: ManualSubscopesByScope = {}

      Object.entries(prev).forEach(([scopeKey, subs]) => {
        if (scopeKey.startsWith('p:')) {
          next[scopeKey] = subs
          return
        }
        if (scopeKey.startsWith('m:') && allowedManualKeys.has(scopeKey)) {
          const expectedName = manualScopeNameByKey.get(scopeKey) || ''
          const placeholderOnly =
            subs.length === 1 &&
            String(subs[0]?.name || '').trim() === expectedName &&
            (attachmentStore.get(`${scopeKey}:${subs[0]?.id}`) || []).length === 0

          if (!placeholderOnly) {
            next[scopeKey] = subs
          }
        }
      })

      try {
        window.sessionStorage.setItem(
          projectWizardStorage.serviceManualSubscopesByScopeKey(locale),
          JSON.stringify(next)
        )
      } catch {
        // ignore
      }

      return next
    })
  }, [locale, manualScopes])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setError(null)
      if (!serviceId) {
        setScopes([])
        return
      }

      const token = getAuthToken()
      if (!token) {
        setError(isRTL ? 'يرجى تسجيل الدخول للمتابعة.' : 'Please sign in to continue.')
        setScopes([])
        return
      }

      setLoading(true)
      try {
        const isOther = serviceId === 10 || readServiceIsOther(locale)

        const url = isOther
          ? projectUuid
            ? getApiUrl(`/api/account/project/request/${projectUuid}`)
            : null
          : getApiUrl(`/api/common/setting/service/scope/${serviceId}`)

        if (!url) throw new Error('missing_project_uuid')

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
        const list = isOther
          ? extractSuggestedScopesFromProjectRequest(json)
          : coerceScopeParents((json as any)?.data)

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
    }
  }, [isRTL, locale, projectUuid, serviceId])

  useEffect(() => {
    const obj: Record<string, File[]> = {}
    Array.from(attachmentStore.entries()).forEach(([key, files]) => {
      obj[key] = files
    })
    setAttachmentsByKey(obj)
  }, [])

  const selectedParents = useMemo(() => {
    if (!scopes) return []
    const set = new Set(selectedParentIds)
    return scopes.filter((s) => set.has(s.id))
  }, [scopes, selectedParentIds])

  const countNamedSubscopes = (scopeKey: string) => {
    const list = manualSubscopesByScope[scopeKey] || []
    return list.filter((s) => Boolean(String(s.name || '').trim())).length
  }

  const totalSelectedSubscopes = useMemo(() => {
    let total = 0
    selectedParents.forEach((p) => {
      const children = p.children || []
      const customCount = countNamedSubscopes(parentScopeKey(p.id))
      if (children.length === 0) {
        total += customCount > 0 ? customCount : 1
        return
      }
      const selected = childIdsByParent[String(p.id)] || []
      total += selected.length + customCount
    })
    return total
  }, [childIdsByParent, manualSubscopesByScope, selectedParents])

  const manualTotalSubscopes = useMemo(() => {
    return manualScopes.reduce((total, scope) => {
      const list = manualSubscopesByScope[manualScopeKey(scope.id)] || []
      const namedCount = list.filter((s) => Boolean(s.name?.trim())).length
      if (namedCount > 0) return total + namedCount
      return total + (String(scope.name || '').trim() ? 1 : 0)
    }, 0)
  }, [manualScopes, manualSubscopesByScope])

  const canContinue =
    manualTotalSubscopes + totalSelectedSubscopes > 0 &&
    !loading &&
    !submitting &&
    !(selectedParentIds.length > 0 && scopes === null)

  const isChildSelected = (parentId: number, childId: number) => {
    const list = childIdsByParent[String(parentId)] || []
    return list.includes(childId)
  }

  const toggleChild = (parentId: number, childId: number) => {
    setChildIdsByParent((prev) => {
      const key = String(parentId)
      const existing = prev[key] || []
      const next = existing.includes(childId)
        ? existing.filter((x) => x !== childId)
        : [...existing, childId]

      const updated: ChildSelectionMap = { ...prev, [key]: next }

      if (!next.includes(childId)) {
        const fileKey = `${parentId}:${childId}`
        attachmentStore.delete(fileKey)
        setAttachmentsByKey((filesPrev) => {
          const copy = { ...filesPrev }
          delete copy[fileKey]
          return copy
        })
      }

      return updated
    })
  }

  const openFilePickerKey = (key: string) => {
    setActiveChildKey(key)
    setInputNonce((n) => n + 1)
    setTimeout(() => fileInputRef.current?.click(), 0)
  }

  const openFilePicker = (parentId: number, childId: number) => {
    openFilePickerKey(`${parentId}:${childId}`)
  }

  const onFilesPicked = (files: FileList | null) => {
    if (!activeChildKey || !files || files.length === 0) return
    const incoming = Array.from(files)

    const current = attachmentStore.get(activeChildKey) || []
    const next = [...current, ...incoming]
    attachmentStore.set(activeChildKey, next)

    setAttachmentsByKey((prev) => ({ ...prev, [activeChildKey]: next }))
    setActiveChildKey(null)
  }

  const removeFile = (key: string, index: number) => {
    const current = attachmentStore.get(key) || []
    const next = current.filter((_, i) => i !== index)
    if (next.length === 0) attachmentStore.delete(key)
    else attachmentStore.set(key, next)

    setAttachmentsByKey((prev) => {
      const copy = { ...prev }
      if (next.length === 0) delete copy[key]
      else copy[key] = next
      return copy
    })
  }

  const persistManualSubscopes = (next: ManualSubscopesByScope) => {
    setManualSubscopesByScope(next)
    try {
      window.sessionStorage.setItem(
        projectWizardStorage.serviceManualSubscopesByScopeKey(locale),
        JSON.stringify(next)
      )
    } catch {
      // ignore
    }
  }

  const addManualSubscope = (scopeKey: string, initialName = '') => {
    const existing = manualSubscopesByScope[scopeKey] || []
    const next: ManualSubscopesByScope = {
      ...manualSubscopesByScope,
      [scopeKey]: [
        ...existing,
        { id: createClientId('subscope:'), name: String(initialName || '') },
      ],
    }
    persistManualSubscopes(next)
  }

  const updateManualSubscopeName = (
    scopeKey: string,
    subscopeId: string,
    name: string
  ) => {
    const existing = manualSubscopesByScope[scopeKey] || []
    const nextList = existing.map((s) => (s.id === subscopeId ? { ...s, name } : s))
    persistManualSubscopes({ ...manualSubscopesByScope, [scopeKey]: nextList })
  }

  const removeManualSubscope = (scopeKey: string, subscopeId: string) => {
    const existing = manualSubscopesByScope[scopeKey] || []
    const nextList = existing.filter((s) => s.id !== subscopeId)
    persistManualSubscopes({ ...manualSubscopesByScope, [scopeKey]: nextList })

    const fileKey = `${scopeKey}:${subscopeId}`
    attachmentStore.delete(fileKey)
    setAttachmentsByKey((filesPrev) => {
      const copy = { ...filesPrev }
      delete copy[fileKey]
      return copy
    })
    if (activeChildKey === fileKey) setActiveChildKey(null)
  }

  const uiMode: 'select' | 'manual' | 'combined' =
    selectedParents.length > 0 && manualScopes.length > 0
      ? 'combined'
      : manualScopes.length > 0
        ? 'manual'
        : 'select'

  const title =
    uiMode === 'manual'
      ? isRTL
        ? 'أضف النطاقات الفرعية'
        : 'Add subscopes'
      : uiMode === 'combined'
        ? isRTL
          ? 'اختر النطاقات الفرعية وأضف أخرى'
          : 'Select and add subscopes'
        : isRTL
          ? 'اختر النطاقات الفرعية'
          : 'Select subscopes'

  const subtitle =
    uiMode === 'manual'
      ? isRTL
        ? 'أدخل النطاقات الفرعية ويمكنك إضافة مرفقات عند الحاجة.'
        : 'Enter subscopes and add attachments if needed.'
      : isRTL
        ? 'اختر النطاقات الفرعية المطلوبة، ويمكنك إضافة نطاقات فرعية أخرى ومرفقات لكل نطاق.'
        : 'Select the required subscopes, and you can add other subscopes and attachments per subscope.'

  const onContinue = async () => {
    if (!canContinue || !serviceId || !projectUuid) return
    setError(null)

    if (selectedParentIds.length > 0 && !scopes) return
    try {
      window.sessionStorage.setItem(
        projectWizardStorage.serviceScopeChildIdsByParentKey(locale),
        JSON.stringify(childIdsByParent)
      )
    } catch {
      // ignore
    }

    const token = getAuthToken()
    if (!token) {
      setError(isRTL ? 'يرجى تسجيل الدخول للمتابعة.' : 'Please sign in to continue.')
      return
    }

    const manualPayload = manualScopes
      .map((scope) => {
        const scopeKey = manualScopeKey(scope.id)
        const rawSubscopes = manualSubscopesByScope[scopeKey] || []
        const subscopes = rawSubscopes
          .map((sub) => ({
            name: String(sub.name || '').trim(),
            files: attachmentStore.get(`${scopeKey}:${sub.id}`) || [],
          }))
          .filter((s) => Boolean(s.name))

        if (subscopes.length === 0) {
          return { name: scope.name, subscopes: [{ name: scope.name }] }
        }

        return { name: scope.name, subscopes }
      })
      .filter((x) => x.subscopes.length > 0)

    const selectedParentsPayload = selectedParents
      .map((parent) => {
        const scopeKey = parentScopeKey(parent.id)
        const customRaw = manualSubscopesByScope[scopeKey] || []
        const customSubscopes = customRaw
          .map((sub) => ({
            name: String(sub.name || '').trim(),
            files: attachmentStore.get(`${scopeKey}:${sub.id}`) || [],
          }))
          .filter((s) => Boolean(s.name))

        const children = parent.children || []
        if (children.length === 0) {
          return {
            name: parent.name,
            subscopes: customSubscopes.length > 0 ? customSubscopes : [{ name: parent.name }],
          }
        }

        const selectedChildIds = childIdsByParent[String(parent.id)] || []
        const selectedChildren = children
          .filter((c) => selectedChildIds.includes(c.id))
          .map((c) => ({
            name: c.name,
            files: attachmentStore.get(`${parent.id}:${c.id}`) || [],
          }))

        return {
          name: parent.name,
          subscopes: [...selectedChildren, ...customSubscopes],
        }
      })
      .filter((x) => x.subscopes.length > 0)

    const scopePayload = [...selectedParentsPayload, ...manualPayload]

    setSubmitting(true)
    try {
      await syncScopes({ locale, token, projectUuid, scopes: scopePayload })

      writeProjectScopeSnapshot(
        locale,
        scopePayload.map((scope) => ({
          name: scope.name,
          subscopes: scope.subscopes.map((subscope) => subscope.name),
        }))
      )

      const slugs = await fetchServiceComponents({ locale, token, serviceId })
      try {
        window.sessionStorage.setItem(
          projectWizardStorage.serviceComponentSlugsKey(locale),
          JSON.stringify(slugs)
        )
      } catch {
        // ignore
      }

      router.push(`/${locale}/project/wizard/${slugs[0] || 'project-status'}`)
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر حفظ نطاق المشروع.' : 'Failed to save project scope.'
        )
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <ProjectSelectedTypeHeader
        locale={locale}
        entered={entered}
        projectTypeId={projectType}
      />

      <div
        className={`mt-2 text-start transition-all duration-700 ${
          entered
            ? 'opacity-100 translate-x-0'
            : isRTL
              ? 'opacity-0 translate-x-4'
              : 'opacity-0 -translate-x-4'
        }`}
      >
        {isEnglish ? (
          <style>{`
            #project-subscopes-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `}</style>
        ) : null}
        <h2
          id="project-subscopes-question-title"
          className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
        >
          {title}
        </h2>
        <p className="mt-2 text-sm sm:text-base font-semibold text-slate-600">
          {subtitle}
        </p>
      </div>

      {error ? (
        <div className="mt-4 text-sm font-semibold text-rose-700">{error}</div>
      ) : null}

      <div className="mt-6 space-y-8 pb-[150px] sm:pb-0">
        {loading ? (
          <div className="text-sm font-semibold text-slate-600">
            {isRTL ? 'جاري التحميل…' : 'Loading…'}
          </div>
	        ) : (
	          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
	            {selectedParents.map((parent) => {
	              const scopeKey = parentScopeKey(parent.id)
	              const children = parent.children || []
	              const customSubscopes = manualSubscopesByScope[scopeKey] || []
	              const totalSubscopesCount = children.length + customSubscopes.length
	              const otherOpen = customSubscopes.length > 0

	              return (
	                <div
	                  key={parent.id}
	                  className="h-full rounded-2xl border border-white/30 bg-white/40 backdrop-blur-md shadow-sm"
	                >
	                  <div className="flex h-full flex-col gap-4 p-5 sm:p-6">
                    <div
                      className={`bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}
                    >
                      {parent.name}
                    </div>

	                    {children.length === 0 ? (
	                      <div
                          className={`text-sm font-medium text-slate-500 ${
                            isRTL ? 'text-right' : 'text-left'
                          }`}
                        >
	                        {isRTL
	                          ? ' لا توجد نطاقات فرعية مقترحة. يمكنك إضافة نطاقات فرعية أخرى أو تركها فارغة.'
	                          : 'No suggested subscopes. You can add other subscopes or leave it empty.'}
	                      </div>
	                    ) : (
	                      <div className="space-y-2">
	                        {children.map((child, childIndex) => {
	                          const checked = isChildSelected(parent.id, child.id)
	                          const key = `${parent.id}:${child.id}`
	                          const attachments = attachmentsByKey[key] || []
	                          const isLastOverall =
	                            childIndex === children.length - 1 && customSubscopes.length === 0
	                          const showDivider = totalSubscopesCount > 1 && !isLastOverall
	                          return (
	                            <div
	                              key={child.id}
	                              className={`space-y-2 ${showDivider ? 'border-b border-gray-300 pb-5' : ''}`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <button
                                  type="button"
                                  onClick={() => toggleChild(parent.id, child.id)}
                                  className={`flex flex-1 items-center gap-3 py-1.5 ${
                                    isRTL ? 'text-right' : 'text-left'
                                  }`}
                                >
                                  <span
                                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border ${
                                      checked
                                        ? 'border-blue-600 bg-blue-600'
                                        : 'border-slate-300 bg-white'
                                    }`}
                                    aria-hidden="true"
                                  >
                                    {checked ? (
                                      <IconCheck size={18} stroke={3} className="text-white" />
                                    ) : null}
                                  </span>
                                  <span
                                    className={`text-sm sm:text-base font-medium text-slate-800 ${
                                      isRTL ? 'text-right' : 'text-left'
                                    }`}
                                  >
                                    {child.name}
                                  </span>
                                </button>

                                {checked ? (
                                  <button
                                    type="button"
                                    onClick={() => openFilePicker(parent.id, child.id)}
                                    className={`btn-sm text-xs px-4 py-2 rounded-full text-muted border border-[#dfdfdf] bg-[#ffffff] hover:bg-opacity-90 inline-flex items-center gap-2 ${
                                      isRTL ? 'flex-row-reverse' : ''
                                    }`}
                                  >
                                    <IconPaperclip size={18} stroke={1.8} />
                                    {isRTL ? 'إضافة مرفق' : 'Add attachment'}
                                  </button>
                                ) : null}
                              </div>

                              {checked && attachments.length > 0 ? (
                                <div
                                  className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 ${
                                    isRTL ? 'pr-10' : 'pl-10'
                                  }`}
                                >
                                  {attachments.map((file, idx) => (
                                    <AttachmentTile
                                      key={`${file.name}-${file.size}-${idx}`}
                                      file={file}
                                      onRemove={() => removeFile(key, idx)}
                                      isRTL={isRTL}
                                    />
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          )
                        })}
                      </div>
                    )}

	                    {otherOpen ? (
	                      <div >
	                      
	                        <div className="space-y-2">
	                          {customSubscopes.map((sub, subIndex) => {
	                            const key = `${scopeKey}:${sub.id}`
	                            const attachments = attachmentsByKey[key] || []
	                            const hasName = Boolean(String(sub.name || '').trim())
	                            const isLastOverall = subIndex === customSubscopes.length - 1
	                            const showDivider = totalSubscopesCount > 1 && !isLastOverall
	                            return (
	                              <div
	                                key={sub.id}
	                                className={`space-y-2 ${showDivider ? 'border-b border-gray-300 pb-5' : ''}`}
	                              >
	                                <div className="flex items-start justify-between gap-3">
                                  <input
                                    value={sub.name}
                                    onChange={(e) =>
                                      updateManualSubscopeName(scopeKey, sub.id, e.target.value)
                                    }
                                    placeholder={isRTL ? 'اسم النطاق الفرعي…' : 'Subscope name…'}
                                    className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                                      isRTL ? 'text-right' : 'text-left'
                                    }`}
                                  />

                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => openFilePickerKey(key)}
                                      disabled={!hasName}
                                      className={`btn-sm text-xs px-4 py-2 rounded-full text-muted border border-[#dfdfdf] bg-[#ffffff] hover:bg-opacity-90 inline-flex items-center gap-2 ${
                                        isRTL ? 'flex-row-reverse' : ''
                                      } ${hasName ? '' : 'opacity-50 cursor-not-allowed'}`}
                                    >
                                      <IconPaperclip size={18} stroke={1.8} />
                                      {isRTL ? 'إضافة مرفق' : 'Add attachment'}
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => removeManualSubscope(scopeKey, sub.id)}
                                      aria-label={isRTL ? 'إزالة النطاق الفرعي' : 'Remove subscope'}
                                      title={isRTL ? 'إزالة' : 'Remove'}
                                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 bg-white hover:bg-slate-50 border border-slate-200"
                                    >
                                      <IconX size={16} stroke={1.8} />
                                    </button>
                                  </div>
                                </div>

                                {attachments.length > 0 ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 pt-1">
                                    {attachments.map((file, idx) => (
                                      <AttachmentTile
                                        key={`${file.name}-${file.size}-${idx}`}
                                        file={file}
                                        onRemove={() => removeFile(key, idx)}
                                        isRTL={isRTL}
                                      />
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ) : null}

	                    <div
                        className={`${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'} mt-auto`}
                      >
	                      <button
	                        type="button"
                        onClick={() => {
                          addManualSubscope(
                            scopeKey,
                            (parent.children || []).length === 0 ? parent.name : ''
                          )
                        }}
                        className={`inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 ${
                          isRTL ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <IconPlus size={18} stroke={2.2} />
                        {isRTL ? 'إضافة نطاق فرعي' : 'Add subscope'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}

	            {manualScopes.map((scope) => {
	              const scopeKey = manualScopeKey(scope.id)
	              const subscopes = manualSubscopesByScope[scopeKey] || []
	              return (
                <div
                  key={scope.id}
                  className="h-full rounded-2xl border border-white/30 bg-white/40 backdrop-blur-md shadow-sm"
                >
                  <div className="flex h-full flex-col gap-4 p-5 sm:p-6">
                    <div
                      className={`bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}
                    >
                      {scope.name}
                    </div>

	                    {subscopes.length > 0 ? (
	                      <div className="space-y-2">
	                        {subscopes.map((sub, subIndex) => {
	                          const key = `${scopeKey}:${sub.id}`
	                          const attachments = attachmentsByKey[key] || []
	                          const hasName = Boolean(String(sub.name || '').trim())
	                          const showDivider =
	                            subscopes.length > 1 && subIndex !== subscopes.length - 1
	                          return (
	                            <div
	                              key={sub.id}
	                              className={`space-y-2 ${showDivider ? 'border-b border-gray-300 pb-5' : ''}`}
	                            >
	                              <div className="flex items-start justify-between gap-3">
                                <input
                                  value={sub.name}
                                  onChange={(e) =>
                                    updateManualSubscopeName(scopeKey, sub.id, e.target.value)
                                  }
                                  placeholder={isRTL ? 'اسم النطاق الفرعي…' : 'Subscope name…'}
                                  className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                                    isRTL ? 'text-right' : 'text-left'
                                  }`}
                                />

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => openFilePickerKey(key)}
                                    disabled={!hasName}
                                    className={`btn-sm text-xs px-4 py-2 rounded-full text-muted border border-[#dfdfdf] bg-[#ffffff] hover:bg-opacity-90 inline-flex items-center gap-2 ${
                                      isRTL ? 'flex-row-reverse' : ''
                                    } ${hasName ? '' : 'opacity-50 cursor-not-allowed'}`}
                                  >
                                    <IconPaperclip size={18} stroke={1.8} />
                                    {isRTL ? 'إضافة مرفق' : 'Add attachment'}
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => removeManualSubscope(scopeKey, sub.id)}
                                    aria-label={isRTL ? 'إزالة النطاق الفرعي' : 'Remove subscope'}
                                    title={isRTL ? 'إزالة' : 'Remove'}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 bg-white hover:bg-slate-50 border border-slate-200"
                                  >
                                    <IconX size={16} stroke={1.8} />
                                  </button>
                                </div>
                              </div>

                              {attachments.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                                  {attachments.map((file, idx) => (
                                    <AttachmentTile
                                      key={`${file.name}-${file.size}-${idx}`}
                                      file={file}
                                      onRemove={() => removeFile(key, idx)}
                                      isRTL={isRTL}
                                    />
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          )
                        })}
                      </div>
                    ) : null}

                    <div
                      className={`${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'} mt-auto`}
                    >
                      <button
                        type="button"
                        onClick={() => addManualSubscope(scopeKey)}
                        className={`inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 ${
                          isRTL ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <IconPlus size={18} stroke={2.2} />
                        {isRTL ? 'إضافة نطاق فرعي' : 'Add subscope'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <input
        key={inputNonce}
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => onFilesPicked(e.target.files)}
      />

      <div className="fixed bottom-0 left-0 right-0 sm:static border-t border-slate-200/70 bg-white/80 backdrop-blur-md lg:bottom-10 lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
        <div className="mx-auto w-full  px-4 sm:px-0 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="mt-2 sm:mt-8 flex items-center justify-between gap-3">
            <Link
              href={`/${locale}/project/wizard/project-scope`}
              className="btn-sm text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={onContinue}
              disabled={!canContinue}
              className={`btn-sm px-6 py-2 rounded-full ${
                canContinue
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
