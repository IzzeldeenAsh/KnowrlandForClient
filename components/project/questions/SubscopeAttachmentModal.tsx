'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { IconCloudUpload, IconX } from '@tabler/icons-react'

export type SubscopeAttachmentOption = { key: string; name: string }
export type SubscopeAttachmentGroup = { label: string; options: SubscopeAttachmentOption[] }

export function formatBytes(bytes: number): string {
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

export function getFileExtension(fileName: string): string {
  return String(fileName || '').split('.').pop()?.toLowerCase() || ''
}

export function getFileIconPath(file: File): string | null {
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

export function FileIcon({ file }: { file: File }) {
  const iconPath = getFileIconPath(file)
  return (
    <span className="h-6 w-5 shrink-0 overflow-hidden">
      {iconPath ? (
        <img src={iconPath} alt="" className="h-full w-full object-contain" />
      ) : (
        <span className="grid h-full w-full place-items-center rounded border border-slate-200 text-[8px] font-bold text-slate-500">
          {getFileExtension(file.name).toUpperCase() || 'FILE'}
        </span>
      )}
    </span>
  )
}

export default function SubscopeAttachmentModal({
  isRTL,
  groups,
  onClose,
  onAttach,
}: {
  isRTL: boolean
  groups: SubscopeAttachmentGroup[]
  onClose: () => void
  onAttach: (subscopeKey: string, files: File[]) => void
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  const allOptions = groups.flatMap((g) => g.options)
  const [subscopeKey, setSubscopeKey] = useState(
    allOptions.length === 1 ? allOptions[0].key : ''
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const addFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return
    // Copy now: the FileList is live and gets emptied when the input is reset.
    const incoming = Array.from(list)
    setFiles((prev) => [...prev, ...incoming])
  }

  const onSubmit = () => {
    if (files.length === 0 || !subscopeKey) {
      setShowErrors(true)
      return
    }
    onAttach(subscopeKey, files)
    onClose()
  }

  const filesError = showErrors && files.length === 0
  const subscopeError = showErrors && !subscopeKey

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm"
      role="presentation"
      dir={isRTL ? 'rtl' : 'ltr'}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscope-attachment-title"
        className="flex max-h-[min(640px,calc(100vh-2rem))] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 px-5 py-4 sm:px-6">
          <div className="text-start">
            <h3 id="subscope-attachment-title" className="text-lg font-bold text-slate-900">
              {isRTL ? 'إرفاق ملفات' : 'Attach files'}
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {isRTL
                ? 'أرفق مستندات تساعد الإنسايتر على فهم هذا النطاق الفرعي.'
                : 'Add documents that help the insighter understand a subscope.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isRTL ? 'إغلاق' : 'Close'}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
          >
            <IconX size={18} />
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="space-y-1.5">
            <label
              htmlFor="subscope-attachment-target"
              className="block text-sm font-semibold text-slate-800"
            >
              {isRTL ? 'مرتبطة بـ' : 'Related to'}
            </label>
            <select
              id="subscope-attachment-target"
              value={subscopeKey}
              onChange={(event) => setSubscopeKey(event.target.value)}
              className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-[#1C7CBB] focus:ring-1 focus:ring-[#1C7CBB] ${
                subscopeError ? 'border-rose-400' : 'border-slate-200'
              }`}
            >
              <option value="" disabled>
                {isRTL ? 'اختر نطاقًا فرعيًا…' : 'Choose a subscope…'}
              </option>
              {groups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {subscopeError ? (
              <p className="text-xs font-semibold text-rose-600">
                {isRTL ? 'اختر النطاق الفرعي المرتبط بهذه الملفات.' : 'Choose which subscope these files relate to.'}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(event) => {
                event.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(event) => {
                event.preventDefault()
                setDragOver(false)
                addFiles(event.dataTransfer.files)
              }}
              className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition-colors ${
                dragOver
                  ? 'border-[#1C7CBB] bg-blue-50/60'
                  : filesError
                    ? 'border-rose-400'
                    : 'border-slate-300 hover:border-[#1C7CBB] hover:bg-slate-50'
              }`}
            >
              <IconCloudUpload size={28} stroke={1.5} className="text-[#1C7CBB]" />
              <span className="text-sm font-semibold text-slate-800">
                {isRTL ? 'اسحب الملفات وأفلتها هنا' : 'Drag and drop files here'}
              </span>
              <span className="text-xs font-medium text-slate-500">
                {isRTL ? 'أو انقر للاختيار من جهازك' : 'or click to browse your device'}
              </span>
            </button>
            {filesError ? (
              <p className="text-xs font-semibold text-rose-600">
                {isRTL ? 'أضف ملفًا واحدًا على الأقل.' : 'Add at least one file.'}
              </p>
            ) : null}
            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(event) => {
                addFiles(event.target.files)
                event.target.value = ''
              }}
            />
          </div>

          {files.length > 0 ? (
            <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
              {files.map((file, idx) => (
                <li key={`${file.name}-${file.size}-${idx}`} className="flex items-center gap-3 px-3 py-2">
                  <FileIcon file={file} />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-800">
                    {file.name}
                  </span>
                  <span className="shrink-0 text-xs font-medium tabular-nums text-slate-400">
                    {formatBytes(file.size)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((_, i) => i !== idx))}
                    aria-label={isRTL ? 'إزالة' : 'Remove'}
                    className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                  >
                    <IconX size={14} />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-200/80 px-5 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="btn-sm rounded-full border border-slate-200 bg-white px-5 py-2 text-slate-700 hover:bg-slate-50"
          >
            {isRTL ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="btn-sm rounded-full bg-[#1C7CBB] px-5 py-2 text-white hover:bg-opacity-90"
          >
            {files.length > 1
              ? isRTL
                ? `إرفاق ${files.length} ملفات`
                : `Attach ${files.length} files`
              : isRTL
                ? 'إرفاق'
                : 'Attach'}
          </button>
        </div>
      </section>
    </div>,
    document.body
  )
}
