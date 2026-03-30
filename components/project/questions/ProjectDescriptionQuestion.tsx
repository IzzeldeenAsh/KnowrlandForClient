'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  IconCheck,
  IconFileText,
  IconPaperclip,
  IconTrash,
} from '@tabler/icons-react'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import {
  fileMetaFromFile,
  mergeProjectDescriptionFiles,
  readProjectDescriptionState,
  writeProjectDescriptionState,
} from '../projectDescriptionState'
import { getProjectApiErrorMessage } from '../projectApiError'
import { syncProjectDescription } from '../projectDescriptionSync'
import { useProjectStepErrorToast } from '../useProjectStepErrorToast'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'

const PROJECT_DESCRIPTION_ALLOWED_EXTENSIONS = [
  'pdf',
  'jpg',
  'jpeg',
  'png',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'csv',
  'txt',
  'ppt',
  'pptx',
  'odt',
] as const

const PROJECT_DESCRIPTION_FILE_ACCEPT = PROJECT_DESCRIPTION_ALLOWED_EXTENSIONS.map(
  (extension) => `.${extension}`
).join(',')

const PROJECT_DESCRIPTION_MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024
const PROJECT_DESCRIPTION_ALLOWED_EXTENSION_SET = new Set<string>(
  PROJECT_DESCRIPTION_ALLOWED_EXTENSIONS
)

function getFileExtension(name: string) {
  const parts = name.toLowerCase().split('.')
  return parts.length > 1 ? parts.at(-1) || '' : ''
}

function getProjectDescriptionFileValidationMessage(locale: WizardLocale, file: File) {
  const isRTL = locale === 'ar'
  const extension = getFileExtension(file.name)
  const allowedExtensionsLabel = PROJECT_DESCRIPTION_ALLOWED_EXTENSIONS.join(', ').toUpperCase()
  const errors: string[] = []

  if (!PROJECT_DESCRIPTION_ALLOWED_EXTENSION_SET.has(extension)) {
    errors.push(
      isRTL
        ? `الملف "${file.name}" بصيغة غير مدعومة. الصيغ المسموحة: ${allowedExtensionsLabel}.`
        : `"${file.name}" has an unsupported file type. Allowed formats: ${allowedExtensionsLabel}.`
    )
  }

  if (file.size > PROJECT_DESCRIPTION_MAX_FILE_SIZE_BYTES) {
    errors.push(
      isRTL
        ? `الملف "${file.name}" يتجاوز الحد الأقصى 2 MB.`
        : `"${file.name}" exceeds the 2 MB limit.`
    )
  }

  return errors
}

function validateProjectDescriptionFiles(locale: WizardLocale, files: File[]) {
  const validFiles: File[] = []
  const errors: string[] = []

  files.forEach((file) => {
    const fileErrors = getProjectDescriptionFileValidationMessage(locale, file)

    if (fileErrors.length > 0) {
      errors.push(...fileErrors)
      return
    }

    validFiles.push(file)
  })

  return {
    validFiles,
    errorMessage: errors.length > 0 ? errors.join('\n') : null,
  }
}

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let unitIndex = 0

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }

  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

export default function ProjectDescriptionQuestion({
  locale,
}: {
  locale: WizardLocale
}) {
  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [savedFiles, setSavedFiles] = useState<
    Array<{ name: string; size: number; type: string }>
  >([])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useProjectStepErrorToast(error, locale)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      setProjectType(
        window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
      )

      const stored = readProjectDescriptionState(locale)
      setDescription(stored.description)
      setSavedFiles(stored.files)
    } catch {
      // ignore
    }
  }, [locale])

  const title = isRTL
    ? 'هل لديك أي تفاصيل إضافية نحتاج معرفتها؟'
    : 'Anything else we should know before we shape this request?'

  const subtitle = isRTL
    ? 'أضف ملاحظاتك بحرية، وارفِق أي ملفات تساعدنا على فهم السياق بشكل أدق.'
    : 'Add any context, preferences, constraints, links, or notes, and attach supporting files if they help.'

  const totalAttachmentCount = savedFiles.length + newFiles.length
  const canContinue = !submitting

  const mergedFiles = useMemo(
    () => [...savedFiles, ...newFiles.map((file) => fileMetaFromFile(file))],
    [newFiles, savedFiles]
  )

  const onContinue = async () => {
    if (submitting) return

    const nextDescription = description.trim()
    const validation = validateProjectDescriptionFiles(locale, newFiles)

    if (validation.errorMessage) {
      setError(validation.errorMessage)
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await syncProjectDescription({
        locale,
        description: nextDescription,
        files: validation.validFiles,
      })

      const nextFiles = mergeProjectDescriptionFiles(
        savedFiles,
        validation.validFiles.map((file) => fileMetaFromFile(file))
      )

      writeProjectDescriptionState(locale, {
        description: nextDescription,
        files: nextFiles,
      })

      setSavedFiles(nextFiles)
      setNewFiles([])
      nav.goNext()
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL
            ? 'تعذر حفظ الوصف والملفات.'
            : 'Failed to save your description and attachments.'
        )
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="w-full max-w-5xl mx-auto min-h-full flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex-1 pb-32">
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
              #project-description-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}

          <h2
            id="project-description-question-title"
            className="mt-4 text-2xl sm:text-3xl font-medium  text-slate-900"
          >
            {title}
          </h2>

          <p className="mt-3 max-w-3xl text-sm sm:text-base font-semibold leading-7 text-slate-600">
            {subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-row-[1.2fr_0.8fr]">
          <div >
            <label className="block">
             
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder={
                  isRTL
                    ? 'اكتب أي تفاصيل إضافية: ما الذي يهمك؟ ما الذي يجب تجنبه؟ هل هناك أهداف أو مراجع أو مواعيد حساسة؟'
                    : 'Share any extra details: what matters most, what to avoid, important references, constraints, internal context, or timing notes.'
                }
                className="min-h-[280px] w-full rounded-[28px] border border-slate-200 bg-white/90 px-5 py-4 text-sm leading-7 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </label>
          </div>

          <div className="rounded-[32px] border border-[#e9dcc8] bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(250,244,234,0.92))] p-5 shadow-[0_30px_90px_-50px_rgba(148,92,28,0.45)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold uppercase  text-[#9a6b27]">
                  {isRTL ? 'الملفات الداعمة' : 'Supporting files'}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {isRTL
                    ? 'ارفع مستندات، صورًا، أو ملفات مرجعية تساعدنا على استيعاب الطلب.'
                    : 'Upload documents, screenshots, or reference files that clarify the request.'}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase  text-[#9a6b27]/80">
                  {isRTL
                    ? 'PDF, JPG, JPEG, PNG, DOC, DOCX, XLS, XLSX, CSV, TXT, PPT, PPTX, ODT • حتى 2 MB لكل ملف'
                    : 'PDF, JPG, JPEG, PNG, DOC, DOCX, XLS, XLSX, CSV, TXT, PPT, PPTX, ODT • up to 2 MB each'}
                </p>
              </div>

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#edd6b4] bg-white/80 text-[#9a6b27]">
                <IconPaperclip size={22} stroke={1.8} />
              </div>
            </div>

            <label className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
              <IconFileText size={18} stroke={1.8} />
              <span>{isRTL ? 'اختيار ملفات' : 'Choose files'}</span>
              <input
                type="file"
                multiple
                accept={PROJECT_DESCRIPTION_FILE_ACCEPT}
                className="hidden"
                onChange={(event) => {
                  const nextFiles = Array.from(event.target.files || [])
                  if (nextFiles.length === 0) return
                  const validation = validateProjectDescriptionFiles(locale, nextFiles)

                  if (validation.validFiles.length > 0) {
                    setNewFiles((current) => [...current, ...validation.validFiles])
                  }

                  setError(validation.errorMessage)
                  event.target.value = ''
                }}
              />
            </label>

            <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-white/65 px-4 py-3">
              <div className="text-sm font-semibold text-slate-700">
                {isRTL ? 'إجمالي الملفات' : 'Total attachments'}
              </div>
              <div className="text-lg font-black text-slate-900">
                {totalAttachmentCount}
              </div>
            </div>

            {mergedFiles.length > 0 ? (
              <div className="mt-4 grid gap-5 lg:grid-cols-3">
                {savedFiles.map((file, index) => (
                  <div
                    key={`saved-${file.name}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/40 bg-white/80 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900">
                        {file.name}
                      </div>
                      <div className="text-xs font-semibold text-slate-500">
                        {formatBytes(file.size)}
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase  text-emerald-700">
                      <IconCheck size={12} stroke={2.2} />
                      <span>{isRTL ? 'مرفق' : 'Attached'}</span>
                    </div>
                  </div>
                ))}

                {newFiles.map((file, index) => (
                  <div
                    key={`new-${file.name}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/40 bg-white/80 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900">
                        {file.name}
                      </div>
                      <div className="text-xs font-semibold text-slate-500">
                        {formatBytes(file.size)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setNewFiles((current) =>
                          current.filter((_, fileIndex) => fileIndex !== index)
                        )
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      aria-label={isRTL ? 'إزالة الملف' : 'Remove file'}
                    >
                      <IconTrash size={16} stroke={1.9} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {error ? (
          <div className="mt-4 whitespace-pre-line text-sm font-semibold text-rose-700">
            {error}
          </div>
        ) : null}
      </div>

       <div className="fixed bottom-0 left-0 right-0 sm:static border-t rounded-lg border-slate-200/70 bg-white/80 backdrop-blur-md lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
      <div className="mx-auto px-4 sm:px-0 w-full max-w-4xl pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
      <div className=" sm:mt-8 flex  items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={() => void onContinue()}
              disabled={!canContinue}
              className={`btn-sm px-6 py-2 rounded-full ${
                canContinue
                  ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                  : 'text-slate-500 bg-slate-200 cursor-not-allowed'
              }`}
            >
              {submitting
                ? isRTL
                  ? 'جاري الحفظ...'
                  : 'Saving...'
                : isRTL
                  ? 'متابعة'
                  : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
