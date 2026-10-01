'use client'

import { useEffect, type Dispatch, type SetStateAction } from 'react'
import { getFeedItem, type FeedItem, type FeedItemMedia } from '@/services/feed.service'

// The backend stores the original image immediately and generates WebP
// variants in a queued job. After the current user publishes, poll just that
// post until its images settle, and broadcast the new media so any timeline
// showing the card can swap it in place. Other cards pick variants up on
// their next normal refresh.
export const FEED_ITEM_MEDIA_UPDATED_EVENT = 'feed:item-media-updated'

export type FeedItemMediaUpdate = { uuid: string; media: FeedItemMedia[] }

const POLL_INTERVAL_MS = 3000
const POLL_TIMEOUT_MS = 30000

const activeWatchers = new Map<string, () => void>()

function hasProcessingImages(media: FeedItemMedia[]): boolean {
  return media.some(
    (item) =>
      item.media_type === 'image' &&
      (item.provider_processing_status === 'pending' ||
        item.provider_processing_status === 'processing'),
  )
}

export function watchFeedImageProcessing(uuid: string, locale: string): void {
  if (typeof window === 'undefined' || !uuid) return

  activeWatchers.get(uuid)?.()

  const deadline = Date.now() + POLL_TIMEOUT_MS
  let timer: number | undefined
  let stopped = false
  const stop = () => {
    stopped = true
    window.clearTimeout(timer)
    if (activeWatchers.get(uuid) === stop) activeWatchers.delete(uuid)
  }
  activeWatchers.set(uuid, stop)

  const poll = async () => {
    let item: FeedItem
    try {
      item = await getFeedItem(uuid, locale)
    } catch {
      // The original image is already on screen; nothing to recover.
      stop()
      return
    }
    if (stopped) return

    if (item.media.some((media) => media.media_type === 'image')) {
      window.dispatchEvent(
        new CustomEvent<FeedItemMediaUpdate>(FEED_ITEM_MEDIA_UPDATED_EVENT, {
          detail: { uuid, media: item.media },
        }),
      )
    }

    if (!hasProcessingImages(item.media) || Date.now() + POLL_INTERVAL_MS > deadline) {
      stop()
      return
    }
    timer = window.setTimeout(() => void poll(), POLL_INTERVAL_MS)
  }

  void poll()
}

// Replaces only `media` so the card keeps its position and viewer-specific
// fields (is_saved, is_tracked) from the timeline's own endpoint.
export function useFeedItemMediaUpdates(setItems: Dispatch<SetStateAction<FeedItem[]>>): void {
  useEffect(() => {
    const handleUpdate = (event: Event) => {
      const { uuid, media } = (event as CustomEvent<FeedItemMediaUpdate>).detail
      setItems((previous) =>
        previous.some((item) => item.uuid === uuid)
          ? previous.map((item) => (item.uuid === uuid ? { ...item, media } : item))
          : previous,
      )
    }

    window.addEventListener(FEED_ITEM_MEDIA_UPDATED_EVENT, handleUpdate)
    return () => window.removeEventListener(FEED_ITEM_MEDIA_UPDATED_EVENT, handleUpdate)
  }, [setItems])
}
