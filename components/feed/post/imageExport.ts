export const MAX_IMAGE_BYTES = 5 * 1024 * 1024
export const MAX_VIDEO_BYTES = 5 * 1024 * 1024 * 1024

function toBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Image encoding failed')), type, quality)
  })
}

// Keep PNG transparency. Lower JPEG/WebP quality before reducing dimensions.
export async function encodeCroppedImage(canvas: HTMLCanvasElement, file: File): Promise<File> {
  const type = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type) ? file.type : 'image/jpeg'
  const qualities = type === 'image/png' ? [undefined] : [0.92, 0.85, 0.75]
  let output = canvas

  for (let attempt = 0; attempt < 8; attempt += 1) {
    for (const quality of qualities) {
      const blob = await toBlob(output, type, quality)
      if (blob.size <= MAX_IMAGE_BYTES) {
        const extension = type === 'image/png' ? 'png' : type === 'image/webp' ? 'webp' : 'jpg'
        const name = `${file.name.replace(/\.[^.]+$/, '')}.${extension}`
        return new File([blob], name, { type: blob.type, lastModified: Date.now() })
      }
    }

    const smaller = document.createElement('canvas')
    smaller.width = Math.max(1, Math.floor(output.width * 0.8))
    smaller.height = Math.max(1, Math.floor(output.height * 0.8))
    const context = smaller.getContext('2d')
    if (!context) throw new Error('Image resizing failed')
    context.drawImage(canvas, 0, 0, smaller.width, smaller.height)
    output = smaller
  }

  throw new Error('Unable to fit the cropped image within 5 MB')
}
