'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { IconCheck, IconPaperclip, IconPlusFilled, IconXboxXFilled } from '@tabler/icons-react'
import ProjectSelectedTypeHeader from '@/components/project/ProjectSelectedTypeHeader'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import { readStoredProjectRequestUuid } from '@/components/project/projectRequestUuid'
import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { writeProjectScopeSnapshot } from '@/components/project/projectAddonsState'
import { expandServiceComponentSlugs } from '@/components/project/projectWizardFlow'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { useProjectWizardNavigation } from '@/components/project/useProjectWizardNavigation'
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
  isOther: boolean
  projectUuid: string
}): Promise<string[]> {
  const url =
    params.isOther && params.projectUuid
      ? getApiUrl(
          `/api/account/project/definition/service-prompt/component/${params.projectUuid}`
        )
      : getApiUrl(`/api/common/setting/service/component/${params.serviceId}`)

  const res = await fetch(
    url,
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
    .map((item) => item.slug || item.name)
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
        ; (subscope.files || []).forEach((file, k) => {
          formData.append(`scopes[${i}][subscopes][${j}][file][${k}]`, file)
        })
    })
  })

  const res = await fetch(
    getApiUrl(`/api/account/project/definition/scope/sync/${params.projectUuid}`),
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

function getFileExtension(fileName: string): string {
  return String(fileName || '').split('.').pop()?.toLowerCase() || ''
}

function getFileIconPath(file: File): string | null {
  const extension = getFileExtension(file.name)
  const mimeType = file.type.toLowerCase()

  const normalizedExtension =
    extension === 'jpeg'
      ? 'jpg'
      : extension === 'powerpoint'
        ? 'ppt'
        : extension

  const iconByExtension: Record<string, string> = {
    csv: 'csv',
    doc: 'doc',
    docx: 'docx',
    jpg: 'jpg',
    mp3: 'mp3',
    mp4: 'mp4',
    pdf: 'pdf',
    ppt: 'ppt',
    pptx: 'pptx',
    pub: 'pub',
    txt: 'txt',
    xls: 'xls',
    xlsx: 'xlsx',
    zip: 'zip',
  }

  const iconName =
    iconByExtension[normalizedExtension] ||
    (mimeType.includes('presentation') ? 'ppt' : '') ||
    (mimeType.includes('spreadsheet') || mimeType.includes('excel') ? 'xlsx' : '') ||
    (mimeType.includes('word') ? 'docx' : '') ||
    (mimeType.includes('pdf') ? 'pdf' : '') ||
    (mimeType.includes('zip') ? 'zip' : '') ||
    (mimeType.startsWith('image/') ? 'jpg' : '')

  return iconName ? `/file-icons/${iconName}.svg` : null
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
  const iconPath = getFileIconPath(file)
  const extensionLabel = getFileExtension(file.name).toUpperCase() || 'FILE'

  return (
    <div className="group relative inline-flex">
      <div className="h-6 w-5 shrink-0 overflow-hidden">
        {iconPath ? (
          <img src={iconPath} alt="" className="h-full w-full object-contain" />
        ) : (
          <div className="grid h-full w-full place-items-center rounded border border-slate-200 text-[8px] font-bold text-slate-500">
            {extensionLabel}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onRemove}
        aria-label={isRTL ? 'إزالة المرفق' : 'Remove attachment'}
        className="absolute -end-1.5 -top-1.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-slate-400 shadow ring-1 ring-slate-200 transition-colors hover:text-rose-500"
      >
        <IconXboxXFilled size={11} />
      </button>

      <div
        className={`pointer-events-none absolute bottom-full z-20 mb-1.5 hidden whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-1 text-[10px] font-semibold text-white shadow-lg group-hover:block ${isRTL ? 'end-0' : 'start-0'}`}
      >
        {file.name} · {formatBytes(file.size)}
      </div>
    </div>
  )
}

const attachmentStore = new Map<string, File[]>()

export default function ProjectSubscopesQuestion({ locale }: { locale: WizardLocale }) {
  const nav = useProjectWizardNavigation(locale)
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
  const [finalizedManualSubscopeKeys, setFinalizedManualSubscopeKeys] = useState<
    string[]
  >([])
  const [confirmedManualSubscopeKeys, setConfirmedManualSubscopeKeys] = useState<
    string[]
  >([])
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
      const storedManualSubscopes = safeParseManualSubscopesByScope(
        window.sessionStorage.getItem(
          projectWizardStorage.serviceManualSubscopesByScopeKey(locale)
        )
      )
      setManualSubscopesByScope(storedManualSubscopes)
      const storedSubscopeKeys = Object.entries(storedManualSubscopes).flatMap(
        ([scopeKey, subs]) =>
          subs
            .filter((sub) => Boolean(String(sub.name || '').trim()))
            .map((sub) => `${scopeKey}:${sub.id}`)
      )
      setFinalizedManualSubscopeKeys(storedSubscopeKeys)
      setConfirmedManualSubscopeKeys(storedSubscopeKeys)
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
            ? getApiUrl(`/api/account/project/show/${projectUuid}`)
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

  const isManualSubscopeConfirmed = (scopeKey: string, subscopeId: string) =>
    confirmedManualSubscopeKeys.includes(`${scopeKey}:${subscopeId}`)

  const isManualSubscopeFinalized = (scopeKey: string, subscopeId: string) =>
    finalizedManualSubscopeKeys.includes(`${scopeKey}:${subscopeId}`)

  const countConfirmedSubscopes = (scopeKey: string) => {
    const list = manualSubscopesByScope[scopeKey] || []
    return list.filter(
      (s) =>
        Boolean(String(s.name || '').trim()) &&
        isManualSubscopeConfirmed(scopeKey, s.id)
    ).length
  }

  const totalSelectedSubscopes = useMemo(() => {
    let total = 0
    selectedParents.forEach((p) => {
      const children = p.children || []
      const customCount = countConfirmedSubscopes(parentScopeKey(p.id))
      if (children.length === 0) {
        total += customCount > 0 ? customCount : 1
        return
      }
      const selected = childIdsByParent[String(p.id)] || []
      total += selected.length + customCount
    })
    return total
  }, [childIdsByParent, confirmedManualSubscopeKeys, manualSubscopesByScope, selectedParents])

  const manualTotalSubscopes = useMemo(() => {
    return manualScopes.reduce((total, scope) => {
      const scopeKey = manualScopeKey(scope.id)
      const confirmedCount = countConfirmedSubscopes(scopeKey)
      if (confirmedCount > 0) return total + confirmedCount
      return total + (String(scope.name || '').trim() ? 1 : 0)
    }, 0)
  }, [confirmedManualSubscopeKeys, manualScopes, manualSubscopesByScope])

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

  const areAllChildrenSelected = (
    parentId: number,
    children: Array<{ id: number; name: string }>
  ) => {
    if (children.length === 0) return false
    const list = childIdsByParent[String(parentId)] || []
    return children.every((child) => list.includes(child.id))
  }

  const toggleSelectAllChildren = (
    parentId: number,
    children: Array<{ id: number; name: string }>
  ) => {
    if (children.length === 0) return
    const allSelected = areAllChildrenSelected(parentId, children)
    const key = String(parentId)

    if (allSelected) {
      children.forEach((child) => attachmentStore.delete(`${parentId}:${child.id}`))
      setAttachmentsByKey((prev) => {
        const copy = { ...prev }
        children.forEach((child) => delete copy[`${parentId}:${child.id}`])
        return copy
      })
      setChildIdsByParent((prev) => ({ ...prev, [key]: [] }))
      return
    }

    setChildIdsByParent((prev) => ({
      ...prev,
      [key]: children.map((child) => child.id),
    }))
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

  const confirmManualSubscope = (scopeKey: string, subscopeId: string) => {
    const existing = manualSubscopesByScope[scopeKey] || []
    const target = existing.find((s) => s.id === subscopeId)
    const trimmed = String(target?.name || '').trim()
    if (!trimmed) return
    setFinalizedManualSubscopeKeys((prev) => {
      const key = `${scopeKey}:${subscopeId}`
      return prev.includes(key) ? prev : [...prev, key]
    })
    setConfirmedManualSubscopeKeys((prev) => {
      const key = `${scopeKey}:${subscopeId}`
      return prev.includes(key) ? prev : [...prev, key]
    })
    updateManualSubscopeName(scopeKey, subscopeId, trimmed)
  }

  const toggleManualSubscopeConfirmed = (scopeKey: string, subscopeId: string) => {
    const key = `${scopeKey}:${subscopeId}`
    setConfirmedManualSubscopeKeys((prev) => {
      const next = prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]

      if (prev.includes(key)) {
        attachmentStore.delete(key)
        setAttachmentsByKey((filesPrev) => {
          const copy = { ...filesPrev }
          delete copy[key]
          return copy
        })
        if (activeChildKey === key) setActiveChildKey(null)
      }

      return next
    })
  }

  const removeManualSubscope = (scopeKey: string, subscopeId: string) => {
    const existing = manualSubscopesByScope[scopeKey] || []
    const nextList = existing.filter((s) => s.id !== subscopeId)
    persistManualSubscopes({ ...manualSubscopesByScope, [scopeKey]: nextList })
    setFinalizedManualSubscopeKeys((prev) =>
      prev.filter((key) => key !== `${scopeKey}:${subscopeId}`)
    )
    setConfirmedManualSubscopeKeys((prev) =>
      prev.filter((key) => key !== `${scopeKey}:${subscopeId}`)
    )

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
        ? 'أدخل النطاقات الفرعية، وأضف مرفقات داعمة إذا كانت تساعد الإنسايتر على فهم المتطلبات بشكل أفضل.'
        : 'Enter subscopes and add supporting attachments if they help the insighter understand the requirements better.'
      : isRTL
        ? 'اختر النطاقات الفرعية المطلوبة، ويمكنك إضافة نطاقات فرعية أخرى أو مرفقات داعمة تساعد الإنسايتر على فهم المتطلبات بشكل أفضل.'
        : 'Select the required subscopes, and add other subscopes or supporting attachments that help the insighter understand the requirements better.'

  const selectedCountLabel = (count: number) =>
    isRTL ? `${count} محدد` : `${count} selected`

  const parentSelectedCount = (parent: ScopeParent, scopeKey: string) => {
    const customCount = countConfirmedSubscopes(scopeKey)
    if ((parent.children || []).length === 0) return customCount > 0 ? customCount : 1
    return (childIdsByParent[String(parent.id)] || []).length + customCount
  }

  const manualScopeSelectedCount = (scope: ManualScope, scopeKey: string) => {
    const confirmedCount = countConfirmedSubscopes(scopeKey)
    if (confirmedCount > 0) return confirmedCount
    return String(scope.name || '').trim() ? 1 : 0
  }

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
          .filter((sub) => isManualSubscopeConfirmed(scopeKey, sub.id))
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
          .filter((sub) => isManualSubscopeConfirmed(scopeKey, sub.id))
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

      const slugs = expandServiceComponentSlugs(
        await fetchServiceComponents({
          locale,
          token,
          serviceId,
          isOther: serviceId === 10 || readServiceIsOther(locale),
          projectUuid,
        })
      )
      try {
        window.sessionStorage.setItem(
          projectWizardStorage.serviceComponentSlugsKey(locale),
          JSON.stringify(slugs)
        )
      } catch {
        // ignore
      }

      nav.goNext()
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

  const renderAddSubscopeField = (scopeKey: string) => (
    <div className="flex min-h-[46px] flex-col justify-center border-b border-slate-200/80 py-2.5">
      <button
        type="button"
        onClick={() => addManualSubscope(scopeKey)}
        className={`inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-md border border-dashed border-blue-300/80 bg-transparent px-3 py-2 text-[13px] font-bold text-blue-600 transition-colors hover:border-blue-400 hover:bg-blue-50/40 ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <IconPlusFilled size={14} />
        {isRTL ? 'إضافة نطاق فرعي' : 'Add Subscope'}
      </button>
    </div>
  )

  return (
    <div className="mx-auto w-full max-w-7xl" dir={isRTL ? 'rtl' : 'ltr'}>
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
            #project-subscopes-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `}</style>
        ) : null}
        <div className={`flex flex-wrap items-center gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
          <h2
            id="project-subscopes-question-title"
            className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
          >
            {title}
          </h2>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-600">
            {selectedCountLabel(manualTotalSubscopes + totalSelectedSubscopes)}
          </span>
        </div>
        <p className="mt-1 max-w-3xl text-xs font-semibold leading-relaxed text-slate-500 sm:text-[13px]">
          {subtitle}
        </p>
      </div>

      {error ? (
        <div className="mt-4 text-sm font-semibold text-rose-700">{error}</div>
      ) : null}

      <div className="mt-4 space-y-4 pb-[130px] lg:pb-0">
        {loading ? (
          <div className="text-sm font-semibold text-slate-600">
            {isRTL ? 'جاري التحميل…' : 'Loading…'}
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
            {selectedParents.map((parent) => {
              const scopeKey = parentScopeKey(parent.id)
              const children = parent.children || []
              const customSubscopes = manualSubscopesByScope[scopeKey] || []
              const otherOpen = customSubscopes.length > 0
              const selectedCount = parentSelectedCount(parent, scopeKey)

              return (
                <div
                  key={parent.id}
                  className="h-full rounded-lg border border-slate-200/80 bg-white/45 shadow-sm backdrop-blur-md"
                >
                  <div className="flex h-full flex-col gap-2 p-4">
                    <div className={`flex flex-wrap items-start justify-between gap-2 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
                      <div className="min-w-0 text-base font-bold leading-tight text-slate-900">
                        {parent.name}
                      </div>
                      <div className={`flex shrink-0 items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {children.length > 0 ? (
                          <button
                            type="button"
                            onClick={() => toggleSelectAllChildren(parent.id, children)}
                            className="text-xs font-bold text-blue-600 transition-colors hover:text-blue-700"
                          >
                            {areAllChildrenSelected(parent.id, children)
                              ? isRTL
                                ? 'إلغاء تحديد الكل'
                                : 'Deselect all'
                              : isRTL
                                ? 'تحديد الكل'
                                : 'Select all'}
                          </button>
                        ) : null}
                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-600">
                          {selectedCountLabel(selectedCount)}
                        </span>
                      </div>
                    </div>

                    {children.length === 0 ? (
                      !otherOpen ? (
                        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                          {renderAddSubscopeField(scopeKey)}
                        </div>
                      ) : null
                    ) : (
                      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        {children.map((child) => {
                          const checked = isChildSelected(parent.id, child.id)
                          const key = `${parent.id}:${child.id}`
                          const attachments = attachmentsByKey[key] || []
                          return (
                            <div
                              key={child.id}
                              className="flex min-h-[46px] flex-col justify-center border-b border-slate-200/80 py-2.5"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => toggleChild(parent.id, child.id)}
                                  className={`flex min-w-0 flex-1 items-start gap-2.5 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'
                                    }`}
                                >
                                  <span
                                    className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${checked
                                        ? 'border-blue-500 bg-blue-500'
                                        : 'border-slate-300 bg-white/80'
                                      }`}
                                    aria-hidden="true"
                                  >
                                    {checked ? (
                                      <IconCheck size={13} stroke={3} className="text-white" />
                                    ) : null}
                                  </span>
                                  <span
                                    className={`min-w-0 text-[13px] font-semibold leading-snug text-slate-700 ${checked ? 'text-blue-900' : ''} ${isRTL ? 'text-right' : 'text-left'
                                      }`}
                                  >
                                    {child.name}
                                  </span>
                                </button>
                                {checked ? (
                                  <button
                                    type="button"
                                    onClick={() => openFilePicker(parent.id, child.id)}
                                    aria-label={isRTL ? 'إضافة مرفقات داعمة' : 'Add supporting attachments'}
                                    title={isRTL ? 'إضافة مرفقات داعمة' : 'Add supporting attachments'}
                                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white/75 text-blue-600 transition-colors hover:border-blue-300 hover:bg-blue-50"
                                  >
                                    <IconPaperclip size={14} stroke={1.8} />
                                  </button>
                                ) : null}
                              </div>

                              {checked && attachments.length > 0 ? (
                                <div className="mt-2 flex flex-wrap gap-3">
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
                        {!otherOpen ? renderAddSubscopeField(scopeKey) : null}
                      </div>
                    )}

                    {otherOpen ? (
                      <div >

                        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                          {customSubscopes.map((sub) => {
                            const key = `${scopeKey}:${sub.id}`
                            const attachments = attachmentsByKey[key] || []
                            const hasName = Boolean(String(sub.name || '').trim())
                            const isConfirmed = isManualSubscopeConfirmed(scopeKey, sub.id)
                            const isFinalized = isManualSubscopeFinalized(scopeKey, sub.id)
                            return (
                              <div
                                key={sub.id}
                                className="flex min-h-[46px] flex-col justify-center border-b border-slate-200/80 py-2.5"
                              >
                                {isFinalized ? (
                                  <div className="space-y-2">
                                    <div className="flex items-start justify-between gap-2">
                                      <button
                                        type="button"
                                        onClick={() => toggleManualSubscopeConfirmed(scopeKey, sub.id)}
                                        className={`flex min-w-0 flex-1 items-start gap-2.5 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                                      >
                                        <span
                                          className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                                            isConfirmed
                                              ? 'border-blue-500 bg-blue-500'
                                              : 'border-slate-300 bg-white/80'
                                          }`}
                                          aria-hidden="true"
                                        >
                                          {isConfirmed ? (
                                            <IconCheck size={13} stroke={3} className="text-white" />
                                          ) : null}
                                        </span>
                                        <span className={`min-w-0 text-[13px] font-semibold leading-snug text-slate-700 ${isConfirmed ? 'text-blue-900' : ''} ${isRTL ? 'text-right' : 'text-left'}`}>
                                          {sub.name}
                                        </span>
                                      </button>

                                      {isConfirmed ? (
                                        <button
                                          type="button"
                                          onClick={() => openFilePickerKey(key)}
                                          aria-label={isRTL ? 'إضافة مرفقات داعمة' : 'Add supporting attachments'}
                                          title={isRTL ? 'إضافة مرفقات داعمة' : 'Add supporting attachments'}
                                          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white/75 text-blue-600 transition-colors hover:border-blue-300 hover:bg-blue-50"
                                        >
                                          <IconPaperclip size={14} stroke={1.8} />
                                        </button>
                                      ) : null}

                                      <button
                                        type="button"
                                        onClick={() => removeManualSubscope(scopeKey, sub.id)}
                                        aria-label={isRTL ? 'إزالة النطاق الفرعي' : 'Remove subscope'}
                                        title={isRTL ? 'إزالة' : 'Remove'}
                                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-500 hover:bg-rose-100"
                                      >
                                        <IconXboxXFilled size={14} />
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-start justify-between gap-3">
                                    <input
                                      value={sub.name}
                                      onChange={(e) =>
                                        updateManualSubscopeName(scopeKey, sub.id, e.target.value)
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') confirmManualSubscope(scopeKey, sub.id)
                                        if (e.key === 'Escape') removeManualSubscope(scopeKey, sub.id)
                                      }}
                                      placeholder={isRTL ? 'اسم النطاق الفرعي…' : 'Subscope name…'}
                                      className={`w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[13px] font-semibold text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-0 ${isRTL ? 'text-right' : 'text-left'
                                        }`}
                                    />

                                    <div className="flex shrink-0 items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => confirmManualSubscope(scopeKey, sub.id)}
                                        disabled={!hasName}
                                        aria-label={isRTL ? 'تأكيد النطاق الفرعي' : 'Confirm subscope'}
                                        title={isRTL ? 'تأكيد' : 'Confirm'}
                                        className={`inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 active:bg-emerald-700 ${hasName ? '' : 'cursor-not-allowed opacity-45'}`}
                                      >
                                        <IconCheck size={14} stroke={2} />
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => removeManualSubscope(scopeKey, sub.id)}
                                        aria-label={isRTL ? 'إزالة النطاق الفرعي' : 'Remove subscope'}
                                        title={isRTL ? 'إزالة' : 'Remove'}
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-rose-50 text-rose-500 hover:bg-rose-100"
                                      >
                                        <IconXboxXFilled size={14} />
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {attachments.length > 0 ? (
                                  <div className="flex flex-wrap gap-3 pt-1">
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
                          {renderAddSubscopeField(scopeKey)}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            })}

            {manualScopes.map((scope) => {
              const scopeKey = manualScopeKey(scope.id)
              const subscopes = manualSubscopesByScope[scopeKey] || []
              const selectedCount = manualScopeSelectedCount(scope, scopeKey)
              return (
                <div
                  key={scope.id}
                  className="h-full rounded-lg border border-slate-200/80 bg-white/45 shadow-sm backdrop-blur-md"
                >
                  <div className="flex h-full flex-col gap-2 p-4">
                    <div className={`flex flex-wrap items-start justify-between gap-2 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
                      <div className="min-w-0 text-base font-bold leading-tight text-slate-900">
                        {scope.name}
                      </div>
                      <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-600">
                        {selectedCountLabel(selectedCount)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {subscopes.map((sub) => {
                          const key = `${scopeKey}:${sub.id}`
                          const attachments = attachmentsByKey[key] || []
                          const hasName = Boolean(String(sub.name || '').trim())
                          const isConfirmed = isManualSubscopeConfirmed(scopeKey, sub.id)
                          const isFinalized = isManualSubscopeFinalized(scopeKey, sub.id)
                          return (
                            <div
                              key={sub.id}
                              className="flex min-h-[46px] flex-col justify-center border-b border-slate-200/80 py-2.5"
                            >
                              {isFinalized ? (
                                <div className="space-y-2">
                                  <div className="flex items-start justify-between gap-2">
                                    <button
                                      type="button"
                                      onClick={() => toggleManualSubscopeConfirmed(scopeKey, sub.id)}
                                      className={`flex min-w-0 flex-1 items-start gap-2.5 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                                    >
                                      <span
                                        className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                                          isConfirmed
                                            ? 'border-blue-500 bg-blue-500'
                                            : 'border-slate-300 bg-white/80'
                                        }`}
                                        aria-hidden="true"
                                      >
                                        {isConfirmed ? (
                                          <IconCheck size={13} stroke={3} className="text-white" />
                                        ) : null}
                                      </span>
                                      <span className={`min-w-0 text-[13px] font-semibold leading-snug text-slate-700 ${isConfirmed ? 'text-blue-900' : ''} ${isRTL ? 'text-right' : 'text-left'}`}>
                                        {sub.name}
                                      </span>
                                    </button>

                                    {isConfirmed ? (
                                      <button
                                        type="button"
                                        onClick={() => openFilePickerKey(key)}
                                        aria-label={isRTL ? 'إضافة مرفقات داعمة' : 'Add supporting attachments'}
                                        title={isRTL ? 'إضافة مرفقات داعمة' : 'Add supporting attachments'}
                                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white/75 text-blue-600 transition-colors hover:border-blue-300 hover:bg-blue-50"
                                      >
                                        <IconPaperclip size={14} stroke={1.8} />
                                      </button>
                                    ) : null}

                                    <button
                                      type="button"
                                      onClick={() => removeManualSubscope(scopeKey, sub.id)}
                                      aria-label={isRTL ? 'إزالة النطاق الفرعي' : 'Remove subscope'}
                                      title={isRTL ? 'إزالة' : 'Remove'}
                                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-500 hover:bg-rose-100"
                                    >
                                      <IconXboxXFilled size={14} />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-start justify-between gap-3">
                                  <input
                                    value={sub.name}
                                    onChange={(e) =>
                                      updateManualSubscopeName(scopeKey, sub.id, e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') confirmManualSubscope(scopeKey, sub.id)
                                      if (e.key === 'Escape') removeManualSubscope(scopeKey, sub.id)
                                    }}
                                    placeholder={isRTL ? 'اسم النطاق الفرعي…' : 'Subscope name…'}
                                    className={`w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[13px] font-semibold text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-0 ${isRTL ? 'text-right' : 'text-left'
                                      }`}
                                  />

                                  <div className="flex shrink-0 items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => confirmManualSubscope(scopeKey, sub.id)}
                                      disabled={!hasName}
                                      aria-label={isRTL ? 'تأكيد النطاق الفرعي' : 'Confirm subscope'}
                                      title={isRTL ? 'تأكيد' : 'Confirm'}
                                      className={`inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 active:bg-emerald-700 ${hasName ? '' : 'cursor-not-allowed opacity-45'}`}
                                    >
                                      <IconCheck size={14} stroke={2} />
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => removeManualSubscope(scopeKey, sub.id)}
                                      aria-label={isRTL ? 'إزالة النطاق الفرعي' : 'Remove subscope'}
                                      title={isRTL ? 'إزالة' : 'Remove'}
                                      className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-rose-50 text-rose-500 hover:bg-rose-100"
                                    >
                                      <IconXboxXFilled size={14} />
                                    </button>
                                  </div>
                                </div>
                              )}

                              {attachments.length > 0 ? (
                                <div className="flex flex-wrap gap-3">
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
                      {renderAddSubscopeField(scopeKey)}
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

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
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
              disabled={!canContinue}
              className={`btn-sm px-6 py-2 rounded-full ${canContinue
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
