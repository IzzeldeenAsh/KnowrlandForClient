export function richTextToPlainText(html: string): string {
  if (!html) return ''
  if (typeof document === 'undefined') {
    return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/[\s\u200B\uFEFF]+/g, ' ').trim()
  }

  const container = document.createElement('div')
  container.innerHTML = html
  return (container.textContent ?? '').replace(/[\s\u200B\uFEFF]+/g, ' ').trim()
}

// Fingerprint of everything the author can change, so closing the composer can
// tell "nothing typed yet" from "work that would be lost". The video phase is
// deliberately left out: it moves on its own while the provider prepares the
// upload, and that is not an edit.
export function contentFingerprint(input: {
  body: string
  industryId: number | null
  tagIds: number[]
  insightIds: number[]
  imageKeys: string[]
  videoFileName: string
}): string {
  return JSON.stringify([
    richTextToPlainText(input.body) ? input.body.trim() : '',
    input.industryId,
    [...input.tagIds].sort((a, b) => a - b),
    [...input.insightIds].sort((a, b) => a - b),
    input.imageKeys,
    input.videoFileName,
  ])
}

