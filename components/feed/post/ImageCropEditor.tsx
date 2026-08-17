'use client'

import { Modal } from '@mantine/core'
import {
  IconFlipHorizontal,
  IconFlipVertical,
  IconRotate,
  IconRotateClockwise,
  IconX,
} from '@tabler/icons-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type AspectRatio = 'original' | 'square' | '4:1' | '3:4' | '16:9'
type Point = { x: number; y: number }
type Size = { width: number; height: number }

type ImageCropEditorProps = {
  file: File | null
  locale: string
  opened: boolean
  position: number
  total: number
  onCancel: () => void
  onApply: (file: File) => void
}

const aspectRatios: Array<{ id: AspectRatio; label: string; value: number | null }> = [
  { id: 'original', label: 'Original', value: null },
  { id: 'square', label: 'Square', value: 1 },
  { id: '4:1', label: '4:1', value: 4 },
  { id: '3:4', label: '3:4', value: 3 / 4 },
  { id: '16:9', label: '16:9', value: 16 / 9 },
]

const copyByLocale = {
  en: {
    title: 'Crop image',
    close: 'Close image editor',
    crop: 'Crop',
    imageCount: (position: number, total: number) => `Image ${position} of ${total}`,
    rotateLeft: 'Rotate left',
    rotateRight: 'Rotate right',
    flipHorizontal: 'Flip horizontally',
    flipVertical: 'Flip vertically',
    aspectRatio: 'Aspect ratio',
    zoom: 'Zoom',
    straighten: 'Straighten',
    apply: 'Apply',
    applying: 'Applying…',
    dragHint: 'Drag the image to reposition it',
  },
  ar: {
    title: 'اقتصاص الصورة',
    close: 'إغلاق محرر الصورة',
    crop: 'اقتصاص',
    imageCount: (position: number, total: number) => `الصورة ${position} من ${total}`,
    rotateLeft: 'تدوير لليسار',
    rotateRight: 'تدوير لليمين',
    flipHorizontal: 'عكس أفقي',
    flipVertical: 'عكس عمودي',
    aspectRatio: 'نسبة العرض إلى الارتفاع',
    zoom: 'تكبير',
    straighten: 'استقامة',
    apply: 'تطبيق',
    applying: 'جارٍ التطبيق…',
    dragHint: 'اسحب الصورة لتغيير موضعها',
  },
} as const

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180
}

function getCoverScale(image: HTMLImageElement, crop: Size, angle: number) {
  const radians = toRadians(angle)
  const cosine = Math.abs(Math.cos(radians))
  const sine = Math.abs(Math.sin(radians))
  const projectedWidth = crop.width * cosine + crop.height * sine
  const projectedHeight = crop.width * sine + crop.height * cosine
  return Math.max(projectedWidth / image.naturalWidth, projectedHeight / image.naturalHeight)
}

function clampPan(
  pan: Point,
  image: HTMLImageElement,
  crop: Size,
  angle: number,
  zoom: number,
): Point {
  const radians = toRadians(angle)
  const cosine = Math.cos(radians)
  const sine = Math.sin(radians)
  const absCosine = Math.abs(cosine)
  const absSine = Math.abs(sine)
  const scale = getCoverScale(image, crop, angle) * zoom
  const cropWidthInImageAxes = crop.width * absCosine + crop.height * absSine
  const cropHeightInImageAxes = crop.width * absSine + crop.height * absCosine
  const maxX = Math.max(0, (image.naturalWidth * scale - cropWidthInImageAxes) / 2)
  const maxY = Math.max(0, (image.naturalHeight * scale - cropHeightInImageAxes) / 2)

  const localX = pan.x * cosine + pan.y * sine
  const localY = -pan.x * sine + pan.y * cosine
  const clampedX = Math.max(-maxX, Math.min(maxX, localX))
  const clampedY = Math.max(-maxY, Math.min(maxY, localY))

  return {
    x: clampedX * cosine - clampedY * sine,
    y: clampedX * sine + clampedY * cosine,
  }
}

function drawImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  crop: Size,
  pan: Point,
  angle: number,
  zoom: number,
  flipX: boolean,
  flipY: boolean,
  outputScale: number,
) {
  const scale = getCoverScale(image, crop, angle) * zoom * outputScale
  context.save()
  context.translate(
    crop.width * outputScale / 2 + pan.x * outputScale,
    crop.height * outputScale / 2 + pan.y * outputScale,
  )
  context.rotate(toRadians(angle))
  context.scale(flipX ? -scale : scale, flipY ? -scale : scale)
  context.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2)
  context.restore()
}

export default function ImageCropEditor({
  file,
  locale,
  opened,
  position,
  total,
  onCancel,
  onApply,
}: ImageCropEditorProps) {
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ pointerId: number; origin: Point; pan: Point } | null>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [aspect, setAspect] = useState<AspectRatio>('original')
  const [quarterTurns, setQuarterTurns] = useState(0)
  const [straighten, setStraighten] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [flipX, setFlipX] = useState(false)
  const [flipY, setFlipY] = useState(false)
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 })
  const [cropSize, setCropSize] = useState<Size>({ width: 640, height: 480 })
  const [isApplying, setIsApplying] = useState(false)

  const angle = quarterTurns * 90 + straighten
  const originalRatio = useMemo(() => {
    if (!image) return 4 / 3
    const ratio = image.naturalWidth / image.naturalHeight
    return Math.abs(quarterTurns) % 2 === 1 ? 1 / ratio : ratio
  }, [image, quarterTurns])
  const selectedRatio = aspectRatios.find((item) => item.id === aspect)?.value ?? originalRatio

  useEffect(() => {
    if (!opened || !file) return
    const objectUrl = URL.createObjectURL(file)
    const nextImage = new window.Image()
    nextImage.onload = () => setImage(nextImage)
    nextImage.src = objectUrl

    setAspect('original')
    setQuarterTurns(0)
    setStraighten(0)
    setZoom(1)
    setFlipX(false)
    setFlipY(false)
    setPan({ x: 0, y: 0 })
    setIsApplying(false)

    return () => {
      nextImage.onload = null
      URL.revokeObjectURL(objectUrl)
      setImage(null)
    }
  }, [file, opened])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !opened) return

    const updateSize = () => {
      const bounds = stage.getBoundingClientRect()
      const maxWidth = Math.max(180, bounds.width - 32)
      const maxHeight = Math.max(180, bounds.height - 32)
      if (maxWidth / maxHeight > selectedRatio) {
        setCropSize({ width: maxHeight * selectedRatio, height: maxHeight })
      } else {
        setCropSize({ width: maxWidth, height: maxWidth / selectedRatio })
      }
    }

    const observer = new ResizeObserver(updateSize)
    observer.observe(stage)
    updateSize()
    return () => observer.disconnect()
  }, [opened, selectedRatio])

  useEffect(() => {
    if (!image) return
    setPan((current) => clampPan(current, image, cropSize, angle, zoom))
  }, [angle, cropSize, image, zoom])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !image) return
    const density = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.max(1, Math.round(cropSize.width * density))
    canvas.height = Math.max(1, Math.round(cropSize.height * density))
    canvas.style.width = `${cropSize.width}px`
    canvas.style.height = `${cropSize.height}px`
    const context = canvas.getContext('2d')
    if (!context) return
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawImage(context, image, cropSize, pan, angle, zoom, flipX, flipY, density)
  }, [angle, cropSize, flipX, flipY, image, pan, zoom])

  const rotate = (direction: -1 | 1) => {
    setQuarterTurns((current) => current + direction)
    setPan({ x: 0, y: 0 })
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      pointerId: event.pointerId,
      origin: { x: event.clientX, y: event.clientY },
      pan,
    }
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId || !image) return
    const nextPan = {
      x: dragRef.current.pan.x + event.clientX - dragRef.current.origin.x,
      y: dragRef.current.pan.y + event.clientY - dragRef.current.origin.y,
    }
    setPan(clampPan(nextPan, image, cropSize, angle, zoom))
  }

  const stopDragging = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null
  }

  const applyCrop = useCallback(async () => {
    if (!file || !image || isApplying) return
    setIsApplying(true)

    try {
      const longestSourceEdge = Math.max(image.naturalWidth, image.naturalHeight)
      const longestOutputEdge = Math.min(2048, longestSourceEdge)
      const outputWidth = selectedRatio >= 1
        ? Math.max(1, Math.round(longestOutputEdge))
        : Math.max(1, Math.round(longestOutputEdge * selectedRatio))
      const outputHeight = selectedRatio >= 1
        ? Math.max(1, Math.round(longestOutputEdge / selectedRatio))
        : Math.max(1, Math.round(longestOutputEdge))
      const output = document.createElement('canvas')
      output.width = outputWidth
      output.height = outputHeight
      const context = output.getContext('2d')
      if (!context) throw new Error('Unable to prepare the cropped image')

      drawImage(
        context,
        image,
        cropSize,
        pan,
        angle,
        zoom,
        flipX,
        flipY,
        outputWidth / cropSize.width,
      )

      const mimeType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
        ? file.type
        : 'image/jpeg'
      const blob = await new Promise<Blob>((resolve, reject) => {
        output.toBlob(
          (result) => result ? resolve(result) : reject(new Error('Unable to crop the image')),
          mimeType,
          mimeType === 'image/png' ? undefined : 0.92,
        )
      })
      onApply(new File([blob], file.name, { type: mimeType, lastModified: Date.now() }))
    } finally {
      setIsApplying(false)
    }
  }, [angle, cropSize, file, flipX, flipY, image, isApplying, onApply, pan, selectedRatio, zoom])

  const toolButtonClass = 'flex h-10 w-10 items-center justify-center rounded-md border border-transparent text-[#344054] transition-colors hover:border-[#DCE4EF] hover:bg-[#F7F9FC] focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-[#8FB9EA]'

  return (
    <Modal
      opened={opened}
      onClose={onCancel}
      centered
      size="auto"
      withCloseButton={false}
      zIndex={700}
      padding={0}
      transitionProps={{ transition: 'pop', duration: 160 }}
      overlayProps={{ backgroundOpacity: 0.55, blur: 2 }}
      styles={{
        content: {
          background: '#F4F7FA',
          borderRadius: 16,
          overflow: 'hidden',
          width: 'min(1100px, 94vw)',
          maxWidth: '94vw',
        },
        body: { height: 'min(88dvh, 720px)', padding: 0, overflow: 'hidden' },
      }}
    >
      <div dir={isArabic ? 'rtl' : 'ltr'} className="flex h-full min-h-0 flex-col text-[#101828]">
        <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#DDE4EC] bg-white px-5 sm:px-8">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">{copy.title}</h2>
            {total > 1 && <p className="mt-0.5 text-xs text-[#667085]">{copy.imageCount(position, total)}</p>}
          </div>
          <button type="button" aria-label={copy.close} onClick={onCancel} className={toolButtonClass}>
            <IconX aria-hidden className="h-6 w-6" stroke={1.8} />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_390px]">
          <section ref={stageRef} className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#E9EEF4] lg:min-h-0">
            {image && (
              <div className="relative overflow-hidden rounded-sm bg-[#CBD4DF] shadow-[0_0_0_1px_rgba(16,24,40,0.08),0_16px_44px_rgba(16,24,40,0.16)]">
                <canvas
                  ref={canvasRef}
                  aria-label={copy.dragHint}
                  role="img"
                  className="block cursor-grab touch-none active:cursor-grabbing"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={stopDragging}
                  onPointerCancel={stopDragging}
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-45">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <span key={index} className="border-[0.5px] border-white/70" />
                  ))}
                </div>
              </div>
            )}
            <p className="absolute bottom-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              {copy.dragHint}
            </p>
          </section>

          <aside className="flex min-h-0 flex-col border-t border-[#DDE4EC] bg-white lg:border-s lg:border-t-0">
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 lg:py-7">
              <div className="flex items-center gap-2">
                <button type="button" aria-label={copy.rotateLeft} title={copy.rotateLeft} onClick={() => rotate(-1)} className={toolButtonClass}>
                  <IconRotate aria-hidden className="h-5 w-5" stroke={1.8} />
                </button>
                <button type="button" aria-label={copy.rotateRight} title={copy.rotateRight} onClick={() => rotate(1)} className={toolButtonClass}>
                  <IconRotateClockwise aria-hidden className="h-5 w-5" stroke={1.8} />
                </button>
                <button type="button" aria-label={copy.flipHorizontal} title={copy.flipHorizontal} onClick={() => setFlipX((current) => !current)} className={`${toolButtonClass} ${flipX ? 'border-[#9EC1EE] bg-[#EAF2FC] text-[#1D74E0]' : ''}`}>
                  <IconFlipHorizontal aria-hidden className="h-5 w-5" stroke={1.8} />
                </button>
                <button type="button" aria-label={copy.flipVertical} title={copy.flipVertical} onClick={() => setFlipY((current) => !current)} className={`${toolButtonClass} ${flipY ? 'border-[#9EC1EE] bg-[#EAF2FC] text-[#1D74E0]' : ''}`}>
                  <IconFlipVertical aria-hidden className="h-5 w-5" stroke={1.8} />
                </button>
              </div>

              <fieldset className="mt-7">
                <legend className="text-sm font-semibold text-[#475467]">{copy.aspectRatio}</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {aspectRatios.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={aspect === item.id}
                      onClick={() => { setAspect(item.id); setPan({ x: 0, y: 0 }) }}
                      className={`min-h-9 rounded-full border px-3.5 text-sm font-semibold transition-colors focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-[#8FB9EA] ${
                        aspect === item.id
                          ? 'border-[#1D74E0] bg-[#1D74E0] text-white'
                          : 'border-[#C8D0DA] bg-white text-[#344054] hover:border-[#98A2B3]'
                      }`}
                    >
                      {item.id === 'original' && isArabic ? 'الأصلية' : item.id === 'square' && isArabic ? 'مربع' : item.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="mt-8 block text-sm font-semibold text-[#475467]" htmlFor="crop-zoom">
                <span className="flex items-center justify-between"><span>{copy.zoom}</span><output>{Math.round(zoom * 100)}%</output></span>
                <input id="crop-zoom" type="range" min="1" max="3" step="0.01" value={zoom} onChange={(event) => setZoom(Number(event.currentTarget.value))} className="mt-3 w-full accent-[#1D74E0]" />
              </label>

              <label className="mt-8 block text-sm font-semibold text-[#475467]" htmlFor="crop-straighten">
                <span className="flex items-center justify-between"><span>{copy.straighten}</span><output>{straighten > 0 ? '+' : ''}{straighten}°</output></span>
                <input id="crop-straighten" type="range" min="-45" max="45" step="1" value={straighten} onChange={(event) => { setStraighten(Number(event.currentTarget.value)); setPan({ x: 0, y: 0 }) }} className="mt-3 w-full accent-[#1D74E0]" />
              </label>
            </div>

            <div className="shrink-0 border-t border-[#E3E8EF] bg-white p-4 sm:px-6">
              <button
                type="button"
                disabled={!image || isApplying}
                onClick={() => void applyCrop()}
                className="min-h-11 w-full rounded-full bg-[#1D74E0] px-5 text-[15px] font-bold text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-[#8FB9EA] disabled:cursor-wait disabled:bg-[#93B9E8]"
              >
                {isApplying ? copy.applying : copy.apply}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </Modal>
  )
}
