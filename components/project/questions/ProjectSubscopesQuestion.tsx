'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
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
import {
  fetchProjectLevelComponentSlugs,
  fetchProjectServiceComponentSlugs,
  storeComponentSlugs,
} from '@/components/project/projectComponentsCatalog'
import {
  ensureProjectServiceUuid,
  pickProjectServiceFromProject,
} from '@/components/project/projectServiceUuid'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { useProjectWizardNavigation } from '@/components/project/useProjectWizardNavigation'
import { BACKEND_STRING_MAX } from '@/components/project/backendLimits'
import { projectWizardStorage, type WizardLocale } from '@/components/project/wizardStorage'
import SubscopeAttachmentModal, {
  FileIcon,
  formatBytes,
  type SubscopeAttachmentGroup,
} from '@/components/project/questions/SubscopeAttachmentModal'

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
          : String(raw?.name ?? raw?.title ?? raw?.label ?? raw?.scope ?? '').trim()
      const id = coerceNumericIdOrHash(raw?.id, name || String(parentIndex))
      const childrenRaw =
        raw?.children ??
        raw?.subscopes ??
        raw?.sub_scopes ??
        raw?.suggest_sub_scopes ??
        raw?.suggested_sub_scopes
      const children: ScopeChild[] = Array.isArray(childrenRaw)
        ? childrenRaw
          .map((c: any, childIndex: number) => {
            const childName =
              typeof c === 'string' || typeof c === 'number'
                ? String(c).trim()
                : String(
                    c?.name ?? c?.title ?? c?.label ?? c?.scope ?? c?.sub_scope ?? ''
                  ).trim()
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

function safeParseStoredSuggestedScopes(value: string | null): ScopeParent[] {
  if (!value) return []
  try {
    return coerceScopeParents(JSON.parse(value) as unknown)
  } catch {
    return []
  }
}

function persistAiSuggestedScopes(locale: WizardLocale, scopes: ScopeParent[]) {
  try {
    if (scopes.length > 0) {
      window.sessionStorage.setItem(
        projectWizardStorage.serviceAiSuggestedScopesKey(locale),
        JSON.stringify(scopes)
      )
    }
  } catch {
    // ignore
  }
}

async function syncScopes(params: {
  locale: WizardLocale
  token: string
  projectUuid: string
  projectServiceUuid: string
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
    getApiUrl(
      `/api/account/project/definition/scope/sync/${params.projectUuid}/${params.projectServiceUuid}`
    ),
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
  const [skipping, setSkipping] = useState(false)
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

  const [attachModalOpen, setAttachModalOpen] = useState(false)
  const [addingScopeKey, setAddingScopeKey] = useState<string | null>(null)
  const [draftSubscopeName, setDraftSubscopeName] = useState('')

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
        const isOther = readServiceIsOther(locale)

        if (isOther) {
          const stored = safeParseStoredSuggestedScopes(
            window.sessionStorage.getItem(
              projectWizardStorage.serviceAiSuggestedScopesKey(locale)
            )
          )
          if (stored.length > 0) {
            if (!cancelled) setScopes(stored)
            return
          }
        }

        const projectServiceUuid =
          isOther && projectUuid ? await ensureProjectServiceUuid(locale) : ''
        const url = isOther
          ? projectUuid
            ? getApiUrl(
                `/api/account/project/definition/ai-intake/check-clarification/${projectUuid}/${projectServiceUuid}`
              )
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
        let list = isOther
          ? extractSuggestedScopesFromProjectRequest(json)
          : coerceScopeParents((json as any)?.data)

        if (isOther && list.length === 0 && projectUuid) {
          const showRes = await fetch(getApiUrl(`/api/account/project/show/${projectUuid}`), {
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
            showRes,
            isRTL ? 'تعذر تحميل نطاقات الخدمة.' : 'Failed to load service scopes.'
          )

          const showJson = (await showRes.json()) as unknown
          list = extractSuggestedScopesFromProjectRequest(
            pickProjectServiceFromProject(showJson, projectServiceUuid) ?? {}
          )
        }

        if (!cancelled) {
          setScopes(list || [])
          if (isOther) persistAiSuggestedScopes(locale, list || [])
        }
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

  const canSkip = !loading && !submitting && !(selectedParentIds.length > 0 && scopes === null)
  const canContinue = manualTotalSubscopes + totalSelectedSubscopes > 0 && canSkip

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

  const attachFiles = (key: string, incoming: File[]) => {
    if (incoming.length === 0) return
    const next = [...(attachmentStore.get(key) || []), ...incoming]
    attachmentStore.set(key, next)
    setAttachmentsByKey((prev) => ({ ...prev, [key]: next }))
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

  const addCustomSubscope = (scopeKey: string, rawName: string, parent?: ScopeParent) => {
    const name = rawName.trim().slice(0, BACKEND_STRING_MAX)
    if (!name) return
    const lower = name.toLowerCase()

    const matchingChild = parent?.children.find((c) => c.name.trim().toLowerCase() === lower)
    if (parent && matchingChild) {
      if (!isChildSelected(parent.id, matchingChild.id)) toggleChild(parent.id, matchingChild.id)
      return
    }

    const existing = manualSubscopesByScope[scopeKey] || []
    const duplicate = existing.find(
      (s) =>
        String(s.name || '').trim().toLowerCase() === lower &&
        isManualSubscopeFinalized(scopeKey, s.id)
    )
    const id = duplicate?.id ?? createClientId('subscope:')
    const key = `${scopeKey}:${id}`

    if (!duplicate) {
      persistManualSubscopes({ ...manualSubscopesByScope, [scopeKey]: [...existing, { id, name }] })
      setFinalizedManualSubscopeKeys((prev) => (prev.includes(key) ? prev : [...prev, key]))
    }
    setConfirmedManualSubscopeKeys((prev) => (prev.includes(key) ? prev : [...prev, key]))
  }

  const startAddingSubscope = (scopeKey: string) => {
    setDraftSubscopeName('')
    setAddingScopeKey(scopeKey)
  }

  const finishAddingSubscope = (scopeKey: string, parent?: ScopeParent) => {
    addCustomSubscope(scopeKey, draftSubscopeName, parent)
    setDraftSubscopeName('')
    setAddingScopeKey(null)
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

  const submitScopes = async (skip: boolean) => {
    if (!serviceId || !projectUuid) return
    if (skip ? !canSkip : !canContinue) return
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

    // Subscopes are optional: skipping still saves the scopes picked in the previous step.
    const scopePayload = skip
      ? [...selectedParents, ...manualScopes].map((scope) => ({
          name: scope.name,
          subscopes: [] as Array<{ name: string; files?: File[] }>,
        }))
      : [...selectedParentsPayload, ...manualPayload]

    setSkipping(skip)
    setSubmitting(true)
    try {
      const projectServiceUuid = await ensureProjectServiceUuid(locale)
      await syncScopes({ locale, token, projectUuid, projectServiceUuid, scopes: scopePayload })

      writeProjectScopeSnapshot(
        locale,
        scopePayload.map((scope) => ({
          name: scope.name,
          subscopes: scope.subscopes.map((subscope) => subscope.name),
        }))
      )

      const [projectServiceSlugs, projectSlugs] = await Promise.all([
        fetchProjectServiceComponentSlugs({
          locale,
          token,
          serviceId,
          isOther: readServiceIsOther(locale),
          projectUuid,
          projectServiceUuid,
        }),
        fetchProjectLevelComponentSlugs({ locale, token, projectUuid }),
      ])
      storeComponentSlugs(locale, { projectServiceSlugs, projectSlugs })

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
      setSkipping(false)
    }
  }

  const finalizedManualSubscopes = (scopeKey: string) =>
    (manualSubscopesByScope[scopeKey] || []).filter(
      (sub) =>
        Boolean(String(sub.name || '').trim()) && isManualSubscopeFinalized(scopeKey, sub.id)
    )

  const attachmentGroups: SubscopeAttachmentGroup[] = [
    ...selectedParents.map((parent) => {
      const scopeKey = parentScopeKey(parent.id)
      const selectedChildIds = childIdsByParent[String(parent.id)] || []
      return {
        label: parent.name,
        options: [
          ...(parent.children || [])
            .filter((c) => selectedChildIds.includes(c.id))
            .map((c) => ({ key: `${parent.id}:${c.id}`, name: c.name })),
          ...finalizedManualSubscopes(scopeKey)
            .filter((sub) => isManualSubscopeConfirmed(scopeKey, sub.id))
            .map((sub) => ({ key: `${scopeKey}:${sub.id}`, name: sub.name })),
        ],
      }
    }),
    ...manualScopes.map((scope) => {
      const scopeKey = manualScopeKey(scope.id)
      return {
        label: scope.name,
        options: finalizedManualSubscopes(scopeKey)
          .filter((sub) => isManualSubscopeConfirmed(scopeKey, sub.id))
          .map((sub) => ({ key: `${scopeKey}:${sub.id}`, name: sub.name })),
      }
    }),
  ].filter((group) => group.options.length > 0)

  const subscopeNameByKey = new Map(
    attachmentGroups.flatMap((group) => group.options.map((o) => [o.key, o.name] as const))
  )

  const attachedFiles = Object.entries(attachmentsByKey).flatMap(([key, files]) =>
    subscopeNameByKey.has(key)
      ? files.map((file, index) => ({
          key,
          index,
          file,
          subscopeName: subscopeNameByKey.get(key) as string,
        }))
      : []
  )

  const renderChip = ({
    key,
    label,
    selected,
    fileCount,
    onToggle,
    onRemove,
  }: {
    key: string
    label: string
    selected: boolean
    fileCount: number
    onToggle: () => void
    onRemove?: () => void
  }) => (
    <span
      key={key}
      className={`inline-flex items-center rounded-full border text-[12.5px] font-medium transition-colors ${
        selected
          ? 'border-[#1C7CBB] bg-[#1C7CBB] text-white'
          : 'border-slate-200 bg-white text-slate-700 hover:border-[#1C7CBB]/50'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={selected}
        className={`inline-flex items-center gap-1.5 py-1.5 ${onRemove ? 'ps-3.5 pe-1.5' : 'px-3.5'}`}
      >
        {selected ? <IconCheck size={14} stroke={2.5} /> : null}
        {label}
        {fileCount > 0 ? (
          <span className="inline-flex items-center gap-0.5 text-xs font-medium opacity-80">
            <IconPaperclip size={12} stroke={2} />
            {fileCount}
          </span>
        ) : null}
      </button>
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={isRTL ? 'إزالة النطاق الفرعي' : 'Remove subscope'}
          className={`me-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full ${
            selected ? 'hover:bg-white/20' : 'text-slate-400 hover:bg-rose-50 hover:text-rose-500'
          }`}
        >
          <IconX size={12} stroke={2.5} />
        </button>
      ) : null}
    </span>
  )

  const renderCustomChips = (scopeKey: string) =>
    finalizedManualSubscopes(scopeKey).map((sub) =>
      renderChip({
        key: sub.id,
        label: sub.name,
        selected: isManualSubscopeConfirmed(scopeKey, sub.id),
        fileCount: (attachmentsByKey[`${scopeKey}:${sub.id}`] || []).length,
        onToggle: () => toggleManualSubscopeConfirmed(scopeKey, sub.id),
        onRemove: () => removeManualSubscope(scopeKey, sub.id),
      })
    )

  const renderAddChip = (scopeKey: string, parent?: ScopeParent) =>
    addingScopeKey === scopeKey ? (
      <input
        autoFocus
        value={draftSubscopeName}
        maxLength={BACKEND_STRING_MAX}
        onChange={(e) => setDraftSubscopeName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            finishAddingSubscope(scopeKey, parent)
          }
          if (e.key === 'Escape') setAddingScopeKey(null)
        }}
        onBlur={() => finishAddingSubscope(scopeKey, parent)}
        placeholder={isRTL ? 'اكتب الاسم ثم اضغط Enter' : 'Type a name, then press Enter'}
        className="min-w-[220px] rounded-full border border-[#1C7CBB] bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none"
      />
    ) : (
      <button
        type="button"
        onClick={() => startAddingSubscope(scopeKey)}
        className="inline-flex items-center gap-1 rounded-full border border-dashed border-slate-300 px-3.5 py-1.5 text-[12.5px] font-medium text-slate-500 transition-colors hover:border-[#1C7CBB] hover:text-[#1C7CBB]"
      >
        <IconPlus size={14} stroke={2.2} />
        {isRTL ? 'أضف نطاقًا خاصًا' : 'Add your own'}
      </button>
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
        <div className="flex flex-wrap items-center justify-start gap-3">
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

      <div className="mt-6 space-y-4 pb-[130px] lg:pb-24">
        {loading ? (
          <div className="text-sm font-semibold text-slate-600">
            {isRTL ? 'جاري التحميل…' : 'Loading…'}
          </div>
        ) : (
          <>
            {selectedParents.map((parent) => {
              const scopeKey = parentScopeKey(parent.id)
              const children = parent.children || []
              const allSelected = areAllChildrenSelected(parent.id, children)
              return (
                <section key={parent.id} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                    <h3 className="text-[15px] font-bold text-slate-900">{parent.name}</h3>
                    {children.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => toggleSelectAllChildren(parent.id, children)}
                        className="text-[13px] font-semibold text-[#1C7CBB] hover:underline"
                      >
                        {allSelected
                          ? isRTL
                            ? 'إلغاء تحديد الكل'
                            : 'Clear'
                          : isRTL
                            ? 'تحديد الكل'
                            : 'Select all'}
                      </button>
                    ) : null}
                  </div>
                  {children.length === 0 && finalizedManualSubscopes(scopeKey).length === 0 ? (
                    <p className="text-[13px] font-medium text-slate-500">
                      {isRTL
                        ? 'سيتم تضمين هذا النطاق بالكامل. أضف نطاقات فرعية إذا أردت تفاصيل أكثر.'
                        : 'This whole scope will be included. Add subscopes if you want to be more specific.'}
                    </p>
                  ) : null}
                  <div className="flex flex-wrap gap-2">
                    {children.map((child) =>
                      renderChip({
                        label: child.name,
                        selected: isChildSelected(parent.id, child.id),
                        fileCount: (attachmentsByKey[`${parent.id}:${child.id}`] || []).length,
                        onToggle: () => toggleChild(parent.id, child.id),
                        key: String(child.id),
                      })
                    )}
                    {renderCustomChips(scopeKey)}
                    {renderAddChip(scopeKey, parent)}
                  </div>
                </section>
              )
            })}

            {manualScopes.map((scope) => {
              const scopeKey = manualScopeKey(scope.id)
              return (
                <section key={scope.id} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                  <h3 className="text-[15px] font-bold text-slate-900">{scope.name}</h3>
                  {finalizedManualSubscopes(scopeKey).length === 0 ? (
                    <p className="text-[13px] font-medium text-slate-500">
                      {isRTL
                        ? 'سيتم تضمين هذا النطاق بالكامل. أضف نطاقات فرعية إذا أردت تفاصيل أكثر.'
                        : 'This whole scope will be included. Add subscopes if you want to be more specific.'}
                    </p>
                  ) : null}
                  <div className="flex flex-wrap gap-2">
                    {renderCustomChips(scopeKey)}
                    {renderAddChip(scopeKey)}
                  </div>
                </section>
              )
            })}

            <section className="rounded-xl border border-dashed border-slate-300 bg-white p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <IconPaperclip size={18} stroke={1.8} className="shrink-0 text-slate-400" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-slate-900">
                    {isRTL ? 'ملفات داعمة' : 'Supporting files'}{' '}
                    <span className="font-medium text-slate-400">
                      {isRTL ? '(اختياري)' : '(optional)'}
                    </span>
                  </div>
                  <p className="text-[13px] font-medium text-slate-500">
                    {attachmentGroups.length === 0
                      ? isRTL
                        ? 'اختر نطاقًا فرعيًا أولًا، ثم أرفق الملفات المتعلقة به.'
                        : 'Select a subscope first, then attach files related to it.'
                      : isRTL
                        ? 'ملخصات أو تقارير سابقة أو بيانات تساعد الإنسايتر.'
                        : 'Briefs, past reports or data that help the insighter.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAttachModalOpen(true)}
                  disabled={attachmentGroups.length === 0}
                  className="btn-sm rounded-full border border-slate-200 bg-white px-4 py-1.5 font-semibold text-[#1C7CBB] hover:border-[#1C7CBB] disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:border-slate-200"
                >
                  {isRTL ? 'إرفاق ملفات' : 'Attach files'}
                </button>
              </div>

              {attachedFiles.length > 0 ? (
                <ul className="mt-4 divide-y divide-slate-100 border-t border-slate-100">
                  {attachedFiles.map(({ key, index, file, subscopeName }) => (
                    <li key={`${key}-${index}`} className="flex items-center gap-3 py-2">
                      <FileIcon file={file} />
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-800">
                        {file.name}
                        <span className="ms-2 text-xs tabular-nums text-slate-400">
                          {formatBytes(file.size)}
                        </span>
                      </span>
                      <span className="max-w-[45%] shrink-0 truncate rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-[#1C7CBB]">
                        {subscopeName}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(key, index)}
                        aria-label={isRTL ? 'إزالة المرفق' : 'Remove attachment'}
                        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                      >
                        <IconX size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          </>
        )}
      </div>

      {attachModalOpen ? (
        <SubscopeAttachmentModal
          isRTL={isRTL}
          groups={attachmentGroups}
          onClose={() => setAttachModalOpen(false)}
          onAttach={attachFiles}
        />
      ) : null}

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => void submitScopes(true)}
                disabled={!canSkip}
                className="btn-sm px-5 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRTL ? 'تخطي' : 'Skip'}
              </button>
              <button
                type="button"
                onClick={() => void submitScopes(false)}
                disabled={!canContinue}
                className={`btn-sm px-6 py-2 rounded-full ${canContinue
                    ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                    : 'text-slate-500 bg-slate-200 cursor-not-allowed'
                  }`}
              >
                {submitting && !skipping
                  ? isRTL
                    ? 'جاري المتابعة…'
                    : 'Continuing…'
                  : nav.continueLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
