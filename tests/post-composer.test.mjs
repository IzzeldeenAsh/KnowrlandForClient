import assert from 'node:assert/strict'
import test from 'node:test'
import { contentFingerprint, richTextToPlainText } from '../components/feed/post/postContent.ts'
import { encodeCroppedImage, MAX_IMAGE_BYTES } from '../components/feed/post/imageExport.ts'

const empty = { body: '', industryId: null, tagIds: [], insightIds: [], imageKeys: [], videoFileName: '' }

test('empty editor markup, whitespace and zero-width characters are not unsaved content', () => {
  for (const body of ['', '<p></p>', '<p><br></p>', '<p> &nbsp; </p>', '<p>\u200B</p>']) {
    assert.equal(richTextToPlainText(body), '')
    assert.equal(contentFingerprint({ ...empty, body }), contentFingerprint(empty))
  }
})

test('text, formatting changes, attachments and image order are still tracked', () => {
  assert.notEqual(contentFingerprint({ ...empty, body: '<p>Hello</p>' }), contentFingerprint(empty))
  assert.notEqual(contentFingerprint({ ...empty, body: '<p>Hello</p>' }), contentFingerprint({ ...empty, body: '<p><strong>Hello</strong></p>' }))
  assert.notEqual(contentFingerprint({ ...empty, imageKeys: ['a', 'b'] }), contentFingerprint({ ...empty, imageKeys: ['b', 'a'] }))
  assert.notEqual(contentFingerprint({ ...empty, insightIds: [1] }), contentFingerprint(empty))
})

test('cropped JPEG is compressed when re-encoding increases its size', async () => {
  const qualities = []
  const canvas = { toBlob(callback, type, quality) {
    qualities.push(quality)
    callback(new Blob([new Uint8Array(quality > 0.85 ? MAX_IMAGE_BYTES + 1 : 2048)], { type }))
  } }
  const result = await encodeCroppedImage(canvas, new File(['original'], 'photo.jpg', { type: 'image/jpeg' }))
  assert.ok(result.size <= MAX_IMAGE_BYTES)
  assert.equal(result.type, 'image/jpeg')
  assert.deepEqual(qualities, [0.92, 0.85])
})

test('oversized PNG is resized without converting transparency to JPEG', async () => {
  const calls = []
  const canvas = { width: 2048, height: 2048, toBlob(callback, type) {
    callback(new Blob([new Uint8Array(MAX_IMAGE_BYTES + 1)], { type }))
  } }
  const oldDocument = globalThis.document
  globalThis.document = { createElement() { return {
    width: 0, height: 0,
    getContext() { return { drawImage(source, x, y, width, height) { calls.push([width, height]) } } },
    toBlob(callback, type) { callback(new Blob(['resized'], { type })) },
  } } }
  try {
    const result = await encodeCroppedImage(canvas, new File(['original'], 'transparent.png', { type: 'image/png' }))
    assert.equal(result.type, 'image/png')
    assert.equal(result.name, 'transparent.png')
    assert.ok(result.size <= MAX_IMAGE_BYTES)
    assert.deepEqual(calls, [[1638, 1638]])
  } finally { globalThis.document = oldDocument }
})

test('failed canvas export rejects instead of silently accepting or losing the crop', async () => {
  const canvas = { toBlob(callback) { callback(null) } }
  await assert.rejects(encodeCroppedImage(canvas, new File(['x'], 'broken.jpg', { type: 'image/jpeg' })), /encoding failed/)
})

test('converted GIF gets the correct JPEG filename and MIME type', async () => {
  const canvas = { toBlob(callback, type) { callback(new Blob(['encoded'], { type })) } }
  const result = await encodeCroppedImage(canvas, new File(['gif'], 'animation.gif', { type: 'image/gif' }))
  assert.equal(result.type, 'image/jpeg')
  assert.equal(result.name, 'animation.jpg')
})
