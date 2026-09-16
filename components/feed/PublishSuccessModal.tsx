'use client'

import { Modal } from '@mantine/core'
import { IconCheck, IconShare3 } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import FeedShare from './FeedShare'

export type PublishedPostSummary = {
  uuid: string
  title: string
  authorName: string
  authorPhotoUrl?: string | null
  kind?: 'post' | 'white-paper'
}

type PublishSuccessModalProps = {
  locale: string
  publication: PublishedPostSummary | null
  onClose: () => void
}

function playPublishChime() {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  try {
    const AudioContextClass = window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return

    const context = new AudioContextClass()
    const master = context.createGain()
    master.gain.setValueAtTime(0.0001, context.currentTime)
    master.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.018)
    master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.72)
    master.connect(context.destination)

    ;[
      { frequency: 523.25, delay: 0 },
      { frequency: 659.25, delay: 0.1 },
      { frequency: 783.99, delay: 0.2 },
    ].forEach(({ frequency, delay }) => {
      const oscillator = context.createOscillator()
      const noteGain = context.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.value = frequency
      noteGain.gain.setValueAtTime(0.0001, context.currentTime + delay)
      noteGain.gain.exponentialRampToValueAtTime(0.75, context.currentTime + delay + 0.012)
      noteGain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + delay + 0.34)
      oscillator.connect(noteGain)
      noteGain.connect(master)
      oscillator.start(context.currentTime + delay)
      oscillator.stop(context.currentTime + delay + 0.38)
    })

    window.setTimeout(() => void context.close(), 1100)
  } catch {
    // Sound is an enhancement; publishing success must never depend on it.
  }
}

export default function PublishSuccessModal({
  locale,
  publication,
  onClose,
}: PublishSuccessModalProps) {
  const isRTL = locale === 'ar'
  const isWhitePaper = publication?.kind === 'white-paper'
  const [shareOpened, setShareOpened] = useState(false)

  useEffect(() => {
    if (publication) {
      setShareOpened(false)
      playPublishChime()
    }
  }, [publication])

  if (!publication) return null

  const path = isWhitePaper
    ? `/${locale}/article/${publication.uuid}`
    : `/${locale}/post/${publication.uuid}`
  const shareUrl = typeof window === 'undefined' ? path : `${window.location.origin}${path}`
  const copy = isRTL
    ? {
        eyebrow: 'تم النشر',
        title: isWhitePaper ? 'تم نشر ورقتك البيضاء بنجاح!' : 'تم نشر منشورك بنجاح!',
        body: 'أصبحت مشاركتك متاحة الآن. شاركها مع شبكتك لتصل إلى الأشخاص المناسبين.',
        share: isWhitePaper ? 'مشاركة الورقة البيضاء' : 'مشاركة المنشور',
        close: 'إغلاق رسالة نجاح النشر',
      }
    : {
        eyebrow: 'Published',
        title: isWhitePaper ? 'Your White Paper is live!' : 'Your post is live!',
        body: 'Your insight is now available. Share it with your network to help it reach the right people.',
        share: isWhitePaper ? 'Share White Paper' : 'Share your post',
        close: 'Close publishing success message',
      }

  return (
    <>
      <Modal
        opened={!shareOpened}
        onClose={onClose}
        centered
        size={460}
        radius={18}
        padding={0}
        title={null}
        aria-label={copy.close}
        overlayProps={{ backgroundOpacity: 0.58, blur: 4 }}
        classNames={{
          content: 'overflow-visible bg-transparent shadow-none',
          body: 'p-0',
          close: 'right-4 top-4 z-10 rounded-full bg-white/80 text-[#60708A] hover:bg-white',
        }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="relative overflow-hidden rounded-[18px] border border-white/80 bg-white px-6 pb-6 pt-8 text-center shadow-[0_24px_80px_rgba(22,46,82,0.24)] sm:px-8">
          <div className="relative mx-auto mb-5 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#EAF4FF] ring-8 ring-[#F5F9FF]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2378E8] text-white motion-safe:animate-[publish-success-pop_.45s_cubic-bezier(.2,.9,.3,1.2)]">
              <IconCheck aria-hidden className="h-8 w-8" stroke={2.4} />
            </div>
          </div>

          <p className="relative mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2378E8]">{copy.eyebrow}</p>
          <h2 className="relative text-[24px] font-bold leading-tight text-[#101724]">{copy.title}</h2>
          <p className="relative mx-auto mt-3 max-w-[350px] text-[14px] leading-6 text-[#66758D]">{copy.body}</p>

          <div className="relative mt-7">
            <button
              type="button"
              onClick={() => setShareOpened(true)}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2378E8] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1768CE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2"
            >
              <IconShare3 aria-hidden className="h-[18px] w-[18px]" stroke={1.8} />
              {copy.share}
            </button>
          </div>
        </div>

        <style jsx global>{`
          @keyframes publish-success-pop {
            0% { opacity: 0; transform: scale(.55) rotate(-10deg); }
            100% { opacity: 1; transform: scale(1) rotate(0); }
          }
        `}</style>
      </Modal>

      <FeedShare
        shareUrl={shareUrl}
        shareTitle={publication.title}
        authorName={publication.authorName}
        authorPhotoUrl={publication.authorPhotoUrl}
        locale={locale}
        shareKind={publication.kind}
        hideTrigger
        modalOpened={shareOpened}
        onModalOpenedChange={(opened) => {
          setShareOpened(opened)
          if (!opened) onClose()
        }}
      />
    </>
  )
}
