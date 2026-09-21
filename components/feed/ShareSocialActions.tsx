'use client'

import { useEffect, useRef, useState } from 'react'

type ShareSocialActionsProps = {
  /** Absolute URL of the content being shared. */
  shareUrl: string
  /** Title used for the social share text. */
  shareTitle: string
  /** Name of the post author, used as a fallback when the post has no title. */
  authorName: string
  locale: string
  /** Keeps post sharing as the default while allowing White Paper-specific copy. */
  shareKind?: 'post' | 'white-paper'
  /** Flips to true when the surrounding surface opens, so the message resets. */
  active: boolean
  /** Focus the message field once the surrounding surface opens. */
  autoFocus?: boolean
}

/**
 * The personal message field plus the social share buttons, shared by the
 * feed share modal and the publish success modal so both keep the same
 * platform workarounds.
 */
const ShareSocialActions = ({
  shareUrl,
  shareTitle,
  authorName,
  locale,
  shareKind = 'post',
  active,
  autoFocus = false,
}: ShareSocialActionsProps) => {
  const isRTL = locale === 'ar'
  const isWhitePaper = shareKind === 'white-paper'

  const [customShareMessage, setCustomShareMessage] = useState('')
  const [facebookNotice, setFacebookNotice] = useState<'copied' | 'manual' | null>(null)
  const shareTextareaRef = useRef<HTMLTextAreaElement | null>(null)

  const t = {
    customShareMessage: isRTL ? 'أضف رسالة شخصية' : 'Add a Personal Message',
    shareMessageHint: isRTL
      ? 'أضف ملاحظة أو رسالة لتخصيص المشاركة...'
      : 'Add a note or message to personalize your share...',
    characterCount: isRTL ? 'عدد الأحرف' : 'Character Count',
    checkOutPost: isWhitePaper
      ? (isRTL ? 'اطّلع على هذه الورقة البيضاء على انسايتا: ' : 'Check out this white paper on Insighta: ')
      : (isRTL ? 'اطّلع على هذا المنشور على انسايتا: ' : 'Check out this post on Insighta: '),
    facebookTextCopied: isRTL
      ? 'لا يسمح فيسبوك بتعبئة النص مسبقًا. نسخنا رسالتك — الصقها في مربع النشر على فيسبوك.'
      : 'Facebook does not allow pre-filled text. We copied your message — paste it into the Facebook composer.',
    facebookTextManual: isRTL
      ? 'لا يسمح فيسبوك بتعبئة النص مسبقًا. انسخ رسالتك من الأعلى والصقها في مربع النشر على فيسبوك.'
      : 'Facebook does not allow pre-filled text. Copy your message above and paste it into the Facebook composer.',
  }

  useEffect(() => {
    if (!active) return
    setCustomShareMessage(`${t.checkOutPost}${shareTitle || authorName}`)
    setFacebookNotice(null)
    if (autoFocus) shareTextareaRef.current?.focus()
  // The localized default is intentionally set only when the surface opens.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const isMobileDevice = () => {
    if (typeof navigator === 'undefined') return false
    // iPadOS reports a desktop UA, so fall back to the touch-point hint.
    return (
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    )
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }

  const openShareWindow = (url: string) => {
    // Always a new tab: passing no window features keeps the browser's default
    // tab behaviour, and the current page must stay put so the share surface
    // survives.
    const opened = window.open(url, '_blank', 'noopener,noreferrer')
    if (opened) return

    // On mobile a synthetic <a> click is what iOS/Android treat as a user tap on
    // a universal/app link, which hands facebook.com URLs to the Facebook app —
    // and the app has no handler for sharer.php, so it lands on its home screen
    // and drops the share. A scripted navigation stays in the browser, where the
    // mobile web composer works.
    if (isMobileDevice()) {
      window.location.assign(url)
      return
    }

    const link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const shareToSocial = async (platform: string) => {
    const url = encodeURIComponent(shareUrl)
    const message = encodeURIComponent(customShareMessage)

    let socialUrl = ''

    switch (platform) {
      case 'facebook':
        socialUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`
        break
      case 'twitter':
        socialUrl = `https://twitter.com/intent/tweet?text=${message}&url=${url}`
        break
      case 'linkedin':
        // LinkedIn's share-offsite endpoint ignores `title` and `summary`, so
        // the message entered in our modal never reaches its composer. The
        // feed composer accepts the post text and shared URL explicitly.
        socialUrl = `https://www.linkedin.com/feed/?shareActive=true&shareUrl=${url}&text=${message}`
        break
      case 'whatsapp':
        socialUrl = `https://api.whatsapp.com/send?text=${message}%20${url}`
        break
    }

    if (!socialUrl) return

    if (platform === 'facebook') {
      // The Facebook button goes to Facebook on every platform. It used to hand
      // mobile off to `navigator.share`, which showed the OS share sheet
      // (AirDrop, Messages, Mail…) on top of our own share modal instead of the
      // Facebook composer the button promises.
      //
      // Facebook removed pre-filled share text (the `quote` parameter) back in
      // 2017, so the personal message is copied to the clipboard for pasting.
      const copied = await copyToClipboard(customShareMessage)
      setFacebookNotice(copied ? 'copied' : 'manual')
      openShareWindow(socialUrl)
      return
    }

    // The share surface stays open on purpose: the share happens in a new tab,
    // so this one keeps the message for another platform.
    openShareWindow(socialUrl)
  }

  return (
    <>
      {/* Custom message */}
      <div className="mb-4 text-start">
        <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
          {t.customShareMessage}
        </label>
        <textarea
          ref={shareTextareaRef}
          className="w-full resize-none rounded-lg border border-gray-300 p-3 text-start focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          rows={3}
          value={customShareMessage}
          onChange={(event) => setCustomShareMessage(event.target.value)}
          placeholder={t.shareMessageHint}
        />
      </div>

      <div className="mb-6 text-start">
        <small className="text-gray-500 dark:text-gray-400">
          {t.characterCount}: {customShareMessage.length}
        </small>
      </div>

      {/* Social buttons */}
      <div className="mb-6 flex justify-center gap-3">
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2196F3] text-white transition-colors hover:bg-blue-700"
          onClick={() => { void shareToSocial('facebook') }}
          title="Share on Facebook"
        >
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9.5576C19 4.27831 14.7476 0 9.5 0C4.25244 0 0 4.27712 0 9.5576C0 14.3275 3.47344 18.2816 8.01562 18.9988V12.3195H5.60263V9.5564H8.01562V7.45109C8.01562 5.05605 9.4335 3.73328 11.6042 3.73328C12.6433 3.73328 13.7311 3.91968 13.7311 3.91968V6.2708H12.5329C11.3525 6.2708 10.9844 7.00818 10.9844 7.76338V9.5576H13.6194L13.1979 12.3207H10.9844V19C15.5266 18.2816 19 14.3275 19 9.5576Z" fill="white" />
          </svg>
        </button>

        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-gray-800"
          onClick={() => { void shareToSocial('twitter') }}
          title="Share on X"
        >
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.0248 3.65625H16.1725L11.4815 9.03014L17 16.3438H12.6801L9.29422 11.9092L5.4246 16.3438H3.27379L8.29031 10.5947L3 3.65625H7.42938L10.4867 7.70954L14.0248 3.65625ZM13.2703 15.0567H14.4598L6.7814 4.8762H5.50369L13.2703 15.0567Z" fill="white" />
          </svg>
        </button>

        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0077b5] text-white transition-colors hover:bg-blue-800"
          onClick={() => { void shareToSocial('linkedin') }}
          title="Share on LinkedIn"
        >
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#sharesocial_clip)">
              <path d="M17.48 0H1.6233C0.756425 0 0 0.62344 0 1.47963V17.3719C0 18.2329 0.756425 19 1.6233 19H17.4752C18.3469 19 19 18.2281 19 17.3719V1.47963C19.0036 0.62344 18.3457 0 17.48 0ZM5.88881 15.8377H3.16705V7.37436H5.88881V15.8377ZM4.62175 6.08829H4.60274C3.73112 6.08829 3.16705 5.43994 3.16705 4.62769C3.16705 3.80119 3.74656 3.16825 4.63719 3.16825C5.52781 3.16825 6.07286 3.79644 6.09186 4.62769C6.09186 5.43994 5.52781 6.08829 4.62175 6.08829ZM15.8365 15.8377H13.1147V11.21C13.1147 10.1009 12.7181 9.34442 11.7337 9.34442C10.9808 9.34442 10.5355 9.85387 10.3384 10.3491C10.2647 10.5272 10.2446 10.7694 10.2446 11.0176V15.8377H7.5228V7.37436H10.2446V8.55237C10.6412 7.98831 11.2599 7.17606 12.6991 7.17606C14.4863 7.17606 15.8377 8.35407 15.8377 10.8929L15.8365 15.8377Z" fill="white" />
            </g>
            <defs>
              <clipPath id="sharesocial_clip">
                <rect width="19" height="19" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>

        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white transition-colors hover:bg-green-600"
          onClick={() => { void shareToSocial('whatsapp') }}
          title="Share on WhatsApp"
        >
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.1537 2.76093C14.3773 0.979684 12.0108 0 9.49584 0C4.3056 0 0.0807459 4.22394 0.0807459 9.41569C0.0807459 11.0734 0.512968 12.6944 1.33585 14.1229L0 19L4.99193 17.689C6.36578 18.4395 7.91419 18.8338 9.49109 18.8338H9.49584C14.6825 18.8338 19 14.6098 19 9.41806C18.9988 6.90412 17.9301 4.54218 16.1537 2.76093ZM9.49584 17.2484C8.08755 17.2484 6.71014 16.8708 5.50966 16.1583L5.22586 15.9885L2.26561 16.7651L3.05406 13.8771L2.86763 13.5803C2.08275 12.3334 1.67189 10.8953 1.67189 9.41569C1.67189 5.10269 5.18311 1.59125 9.50059 1.59125C11.5917 1.59125 13.5545 2.40588 15.0304 3.8855C16.5064 5.36513 17.4136 7.32925 17.41 9.42044C17.4088 13.737 13.8086 17.2484 9.49584 17.2484ZM13.7872 11.3869C13.5545 11.2682 12.3967 10.6994 12.1794 10.6234C11.9633 10.5426 11.8066 10.5046 11.6498 10.7421C11.4931 10.9796 11.0431 11.5057 10.9029 11.6672C10.7676 11.8239 10.6275 11.8453 10.3935 11.7266C9.01137 11.0354 8.10299 10.4928 7.19224 8.92763C6.95 8.51201 7.43447 8.54169 7.88332 7.64276C7.95932 7.48601 7.92131 7.35062 7.86194 7.23187C7.80257 7.11312 7.33235 5.95532 7.13642 5.48507C6.94525 5.02669 6.75051 5.09081 6.60683 5.0825C6.47147 5.07419 6.31473 5.07418 6.1568 5.07418C5.99887 5.07418 5.74595 5.13356 5.52865 5.36631C5.31254 5.60381 4.70577 6.17263 4.70577 7.33044C4.70577 8.48825 5.55002 9.60807 5.66402 9.76482C5.78276 9.92157 7.32167 12.2966 9.68464 13.319C11.1772 13.9638 11.7626 14.0184 12.5095 13.908C12.9631 13.8403 13.9 13.3392 14.0959 12.7882C14.2907 12.2372 14.2907 11.7658 14.2313 11.6684C14.1779 11.5603 14.0199 11.5009 13.7872 11.3869Z" fill="white" />
          </svg>
        </button>
      </div>

      {facebookNotice && (
        <p className="-mt-3 mb-4 rounded-lg bg-blue-50 px-3 py-2 text-start text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
          {facebookNotice === 'copied' ? t.facebookTextCopied : t.facebookTextManual}
        </p>
      )}
    </>
  )
}

export default ShareSocialActions
