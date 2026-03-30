import { projectWizardStorage, type WizardLocale } from './wizardStorage'

export type ProjectDescriptionFileMeta = {
  name: string
  size: number
  type: string
}

export type ProjectDescriptionState = {
  description: string
  files: ProjectDescriptionFileMeta[]
}

function sanitizeFileMeta(input: unknown): ProjectDescriptionFileMeta[] {
  if (!Array.isArray(input)) return []

  return input
    .map((item) => {
      const raw = item as Record<string, unknown>
      const name = String(raw.name || '').trim()
      const size = Number(raw.size)
      const type = String(raw.type || '').trim()

      if (!name) return null

      return {
        name,
        size: Number.isFinite(size) && size >= 0 ? size : 0,
        type,
      }
    })
    .filter((item): item is ProjectDescriptionFileMeta => Boolean(item))
}

function sanitizeProjectDescriptionState(input: unknown): ProjectDescriptionState {
  const raw = input && typeof input === 'object' ? (input as Record<string, unknown>) : {}

  return {
    description: String(raw.description || '').trim(),
    files: sanitizeFileMeta(raw.files),
  }
}

export function fileMetaFromFile(file: File): ProjectDescriptionFileMeta {
  return {
    name: file.name,
    size: Number.isFinite(file.size) ? file.size : 0,
    type: file.type || '',
  }
}

export function mergeProjectDescriptionFiles(
  current: ProjectDescriptionFileMeta[],
  next: ProjectDescriptionFileMeta[]
): ProjectDescriptionFileMeta[] {
  const merged = [...current]

  next.forEach((file) => {
    const exists = merged.some(
      (item) =>
        item.name === file.name && item.size === file.size && item.type === file.type
    )
    if (!exists) merged.push(file)
  })

  return merged
}

export function readProjectDescriptionState(
  locale: WizardLocale
): ProjectDescriptionState {
  if (typeof window === 'undefined') {
    return { description: '', files: [] }
  }

  try {
    const description =
      window.sessionStorage.getItem(projectWizardStorage.projectDescriptionTextKey(locale)) ||
      ''

    const filesRaw = window.sessionStorage.getItem(
      projectWizardStorage.projectDescriptionFilesMetaKey(locale)
    )

    const files = filesRaw ? sanitizeFileMeta(JSON.parse(filesRaw)) : []

    return sanitizeProjectDescriptionState({
      description,
      files,
    })
  } catch {
    return { description: '', files: [] }
  }
}

export function writeProjectDescriptionState(
  locale: WizardLocale,
  state: ProjectDescriptionState
) {
  if (typeof window === 'undefined') return

  const sanitized = sanitizeProjectDescriptionState(state)

  try {
    window.sessionStorage.setItem(
      projectWizardStorage.projectDescriptionTextKey(locale),
      sanitized.description
    )
    window.sessionStorage.setItem(
      projectWizardStorage.projectDescriptionFilesMetaKey(locale),
      JSON.stringify(sanitized.files)
    )
  } catch {
    // ignore
  }
}
