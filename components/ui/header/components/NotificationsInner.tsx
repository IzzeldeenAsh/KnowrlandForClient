'use client'
import { useEffect, useRef, useCallback } from 'react'
import type React from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { SvgIcon } from '../../SvgIcon'
import { Notification } from '@/services/notifications.service'

interface NotificationsInnerProps {
  notifications: Notification[]
  parent: string
  onNotificationClick: (id: string) => Promise<void>
  onClickOutside: () => void
}

// ---- Message rendering helpers ----
// Backend sometimes sends HTML in `notification.message` (e.g. <strong>, <a>, inline styles).
// Rendering raw HTML can override parent font styles, making read/unread weights unreliable.
// We convert to plain text so the parent `font-*` class always applies consistently.
const htmlToText = (html: string): string => {
  if (!html) return ''

  // Fast path: no tags
  if (!/[<>]/.test(html)) return html

  // If somehow executed outside the browser, fall back to best-effort stripping.
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return html.replace(/<[^>]*>/g, '').trim()
  }

  try {
    // Replace <br> with newlines before parsing so we preserve basic formatting.
    const normalized = html.replace(/<br\s*\/?>/gi, '\n')
    const doc = new DOMParser().parseFromString(normalized, 'text/html')
    return (doc.body?.textContent ?? '').trim()
  } catch {
    // Fallback: strip tags (best-effort)
    return html.replace(/<[^>]*>/g, '').trim()
  }
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const escapeAttribute = (value: string): string => escapeHtml(value)

// For **unread** notifications we still want emphasis (<b>/<strong>) and links,
// but we must strip ALL attributes/styles to prevent overriding font weights.
// This sanitizer produces safe, minimal HTML for rendering via dangerouslySetInnerHTML.
const sanitizeNotificationHtml = (html: string): string => {
  if (!html) return ''

  // If not in browser, don’t attempt to sanitize HTML tags; render plain text.
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return escapeHtml(htmlToText(html))
  }

  try {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    const allowedTags = new Set(['B', 'STRONG', 'I', 'EM', 'BR', 'A', 'SPAN'])

    const sanitizeNode = (node: Node): string => {
      if (node.nodeType === Node.TEXT_NODE) return escapeHtml(node.textContent ?? '')
      if (node.nodeType !== Node.ELEMENT_NODE) return ''

      const el = node as HTMLElement
      const tag = el.tagName.toUpperCase()

      // Drop disallowed tags but keep their text/children.
      if (!allowedTags.has(tag)) {
        return Array.from(el.childNodes).map(sanitizeNode).join('')
      }

      if (tag === 'BR') return '<br />'

      if (tag === 'A') {
        const rawHref = (el.getAttribute('href') ?? '').trim()
        const href =
          rawHref.startsWith('http://') ||
          rawHref.startsWith('https://') ||
          rawHref.startsWith('/') ||
          rawHref.startsWith('#')
            ? rawHref
            : '#'

        const inner = Array.from(el.childNodes).map(sanitizeNode).join('')
        return `<a href="${escapeAttribute(href)}" target="_blank" rel="noopener noreferrer" class="underline">${inner}</a>`
      }

      // Allowed inline tags with NO attributes
      const lower = tag.toLowerCase()
      const inner = Array.from(el.childNodes).map(sanitizeNode).join('')
      return `<${lower}>${inner}</${lower}>`
    }

    return Array.from(doc.body.childNodes).map(sanitizeNode).join('')
  } catch {
    // Fallback: render as escaped plain text (safe)
    return escapeHtml(htmlToText(html))
  }
}

// ---- Color helpers (stable Tailwind class mapping) ----
type Variant = 'success' | 'danger' | 'info' | 'warning' | 'primary'
type TailwindColor = 'green' | 'red' | 'blue' | 'yellow' | 'purple'

const VARIANT_TO_TW_COLOR: Record<Variant, TailwindColor> = {
  success: 'green',
  danger: 'red',
  info: 'blue',
  warning: 'yellow',
  primary: 'purple'
}

const COLOR_CLASSES_BY_TW: Record<TailwindColor, { bg: string; text: string; icon: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-500' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', icon: 'text-yellow-500' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'text-purple-500' },
  red: { bg: 'bg-red-50', text: 'text-red-600', icon: 'text-red-500' },
  green: { bg: 'bg-green-50', text: 'text-green-600', icon: 'text-green-500' }
}

const getVariantForSubType = (subType: string): Variant => {
  switch (subType) {
    case 'order':
    case 'knowledge':
    case 'activate_company':
    case 'save':
      return 'success'
    case 'deactivate_company':
    case 'deactivate_company_with_delete':
    case 'deactivate_delete_company':
    case 'declined':
    case 'knowledge_declined':
    case 'deactivate_insighter':
    case 'deactivate_insighter_with_delete':
    case 'deactivate_delete_insighter':
      return 'danger'
    case 'activate_insighter':
    case 'accept_knowledge':
    case 'knowledge_accept':
    case 'approved':
    case 'download':
    case 'view':
    case 'like':
      return 'info'
    case 'upload':
    case 'share':
      return 'warning'
    case 'comment':
    case 'reply':
      return 'primary'
    default:
      return 'info'
  }
}

const getColorClassesForSubType = (subType: string) => {
  const variant = getVariantForSubType(subType)
  const color = VARIANT_TO_TW_COLOR[variant] ?? 'blue'
  return COLOR_CLASSES_BY_TW[color]
}

// Helper function to determine background color based on notification sub_type
// This matches the Angular notificationsBg pipe
const getNotificationBg = (subType: string): string => {
  switch (subType) {
    case 'order':
    case 'knowledge': // used as sub_type for order notifications
      return 'green';
    case 'activate_company':
      return 'green';
    case 'deactivate_company':
    case 'deactivate_company_with_delete':
    case 'deactivate_delete_company':
    case 'declined':
    case 'knowledge_declined':
    case 'deactivate_insighter':
    case 'deactivate_insighter_with_delete':
    case 'deactivate_delete_insighter':
      return 'red';
    case 'activate_insighter':
    case 'accept_knowledge':
    case 'knowledge_accept':
    case 'approved':
    case 'download':
    case 'view':
      return 'green';
    case 'upload':
      return 'yellow';
    case 'comment':
    case 'reply':
      return 'blue';
    case 'like':
      return 'blue';
    case 'save':
      return 'green';
    case 'share':
      return 'yellow';
    default:
      return 'blue';
  }
}

// Map Angular's color system to Tailwind CSS colors
const colorMap: Record<string, string> = {
  'success': 'green',
  'danger': 'red',
  'info': 'blue',
  'warning': 'yellow',
  'primary': 'purple'
}

// Helper function to get Tailwind color from Bootstrap/Angular color
const getTailwindColor = (color: string): string => {
  // Allow passing already-normalized Tailwind colors (e.g. "red") directly.
  if (color in COLOR_CLASSES_BY_TW) return color
  return colorMap[color] || 'blue';
}

// Helper function to get icon name based on notification sub_type (like the Angular notificationsIcons pipe)
const getNotificationIconName = (subType: string): string => {
  switch (subType) {
    case 'order':
    case 'sale': // used as sub_type for order notifications
    return 'duotune/finance/Knlg010.svg';
    case 'activate_company':
      return 'duotune/arrows/arr086.svg';
    case 'deactivate_company':
    case 'deactivate_company_with_delete':
    case 'deactivate_delete_company':
      return 'duotune/general/gen047.svg';
    case 'activate_insighter':
      return 'duotune/arrows/arr086.svg';
    case 'deactivate_insighter':
    case 'deactivate_insighter_with_delete':
    case 'deactivate_delete_insighter':
      return 'duotune/general/gen047.svg';
    case 'accept_knowledge':
    case 'knowledge_accept':
    case 'approved':
      return 'duotune/files/fil025.svg';
    case 'declined':
    case 'knowledge_declined':
      return 'duotune/general/gen050.svg';
    case 'download':
      return 'duotune/files/fil025.svg';
    case 'upload':
      return 'duotune/files/fil022.svg';
    case 'comment':
      return 'duotune/communication/com003.svg';
    case 'reply':
      return 'duotune/communication/com012.svg';
    case 'like':
      return 'duotune/general/gen030.svg';
    case 'save':
      return 'duotune/general/gen019.svg';
    case 'share':
      return 'duotune/general/gen016.svg';
    case 'view':
      return 'duotune/general/gen007.svg';
    case 'Question':
      return 'duotune/communication/com007.svg';
    case 'Answer Question':
      return 'duotune/communication/com007.svg';
    case 'client_meeting_insighter_approved':
      return 'duotune/general/gen014.svg';
    case 'client_meeting_new':
      return 'duotune/general/gen014.svg';
    case 'insighter_meeting_client_new':
      return 'duotune/general/gen014.svg';
    case 'insighter_meeting_approved':
      return 'duotune/general/gen014.svg';
      case "client_meeting_insighter_postponed":
        return 'duotune/general/gen014.svg';
    case 'insighter_meeting_client_reschedule':
      return 'duotune/general/gen014.svg';
      case "insighter_meeting_reminder":
        return 'duotune/general/gen014.svg';
    case 'client_meeting_reschedule':
      return 'duotune/general/gen014.svg';
    case 'client_meeting_reminder':
      return 'duotune/general/gen014.svg';
      case 'ask_question':
        return 'duotune/communication/com007.svg';
        case 'stripe':
          return 'duotune/general/Capa_1.svg';
      case 'answer_question':
        return 'duotune/communication/com007.svg';
    default:
      return 'duotune/general/gen007.svg';
  }
}




// Helper function to determine icon based on notification sub_type
const getNotificationIcon = (subType: string, color?: string): React.ReactNode => {
  // Get the SVG icon path from the duotune directory
  const iconPath = getNotificationIconName(subType);
  
  // Get the Tailwind color from the notification color (if provided)
  const tailwindColor = color ? getTailwindColor(color) : 'blue';
  
  // Create color-specific classes based on Tailwind colors
  const colorClasses = {
    'blue': 'text-blue-500',
    'yellow': 'text-yellow-500',
    'purple': 'text-purple-500',
    'red': 'text-red-500',
    'green': 'text-green-500'
  };
  
  // Return a properly styled SVG Icon that can be colored like in Angular
  return (
    <SvgIcon
      src={`/${iconPath}`}
      className={`h-6 w-6 ${colorClasses[tailwindColor as keyof typeof colorClasses]}`}
    />
  );
}



// *** CHANGE 1: UPDATED BILINGUAL FUNCTION ***
// Helper function to determine display name based on notification sub_type and language
const getNotificationName = (subType: string, language: string): string => {
  const nameMap: Record<string, { en: string; ar: string }> = {
    'accept_knowledge': { en: 'Insights Accepted', ar: 'قبول المستندات' },
    'declined': { en: 'Insights Declined', ar: 'رفض المستندات' },
    'approved': { en: 'Insights Approved', ar: 'تمت الموافقة على المستندات' },
    'activate_insighter': { en: 'Insighter Activated', ar: 'تفعيل حساب الانسايتر' },
    'deactivate_insighter': { en: 'Insighter Deactivated', ar: 'إلغاء تفعيل حساب الانسايتر' },
    'deactivate_insighter_with_delete': { en: 'Insighter Deactivated', ar: 'إلغاء تفعيل حساب الانسايتر' },
    'deactivate_delete_insighter': { en: 'Insighter Deactivated', ar: 'إلغاء تفعيل حساب الانسايتر' },
    'download': { en: 'Download', ar: 'تنزيل' },
    'upload': { en: 'Upload', ar: 'رفع' },
    'comment': { en: 'Comment', ar: 'تعليق' },
    'sale': { en: 'Sales Order', ar: 'طلب شراء' },
    'reply': { en: 'Reply', ar: 'رد' },
    'like': { en: 'Like', ar: 'إعجاب' },
    'save': { en: 'Save', ar: 'حفظ' },
    'share': { en: 'Share', ar: 'مشاركة' },
    'view': { en: 'View', ar: 'عرض' },
    'knowledge_accept': { en: 'Insights Accepted', ar: 'قبول المستندات' },
    'knowledge_declined': { en: 'Insights Declined', ar: 'رفض المستندات' },
    'activate_company': { en: 'Active Company', ar: 'تفعيل الشركة' },
    'client_meeting_new': { en: 'New Session Request', ar: 'طلب جلسة استشارية جديدة' },
    'insighter_meeting_client_new': { en: 'New Session Request', ar: 'طلب جلسة استشارية جديدة' },
    'insighter_meeting_approved': { en: 'Session Approved', ar: 'تمت الموافقة على الجلسة الاستشارية' },
    'client_meeting_insighter_approved': { en: 'Session Approved', ar: 'تمت الموافقة على الجلسة الاستشارية' },
    'client_meeting_insighter_postponed': { en: 'Session Postponed', ar: 'تم تأجيل الجلسة الاستشارية' },
    'client_meeting_reschedule': { en: 'Session Rescheduled', ar: 'تمت إعادة جدولة الجلسة الاستشارية' },
    'insighter_meeting_client_reschedule': { en: 'Session Rescheduled', ar: 'تمت إعادة جدولة الجلسة الاستشارية' },
    'client_meeting_reminder': { en: 'Session Reminder', ar: 'تذكير بالجلسة الاستشارية' },
    'insighter_meeting_reminder': { en: 'Session Reminder', ar: 'تذكير بالجلسة الاستشارية' },
    'deactivate_delete_company': { en: 'Company Deactivation', ar: 'إلغاء تفعيل الشركة' },
    'deactivate_company': { en: 'Company Deactivation', ar: 'إلغاء تفعيل الشركة' },
  };

  const names = nameMap[subType];
  if (!names) {
    return subType; // Fallback to the subtype key if no translation exists
  }

  return language === 'ar' ? names.ar : names.en; // Return Arabic if lang is 'ar', otherwise default to English
};

// We intentionally avoid using i18n keys for sub-type titles to prevent
// MISSING_MESSAGE errors; the bilingual map above is authoritative.

// Helper function to determine links based on notification type
const getNotificationLink = (type: string, parent: string): string => {
  const linkMap: Record<string, Record<string, string>> = {
    'client': {
      'knowledge': '/knowledge',
      'industry': '/industry',
      'comment': '/comments',
      'user': '/profile',
      'notification': '/notifications',
      'default': '/'
    },
    'app': {
      'knowledge': '/app/my-knowledge-base',
      'industry': '/app/industry',
      'comment': '/app/comments',
      'user': '/app/profile',
      'notification': '/app/notifications',
      'default': '/app'
    }
  }
  
  const parentLinks = linkMap[parent] || linkMap['client']
  return parentLinks[type] || parentLinks['default']
}

export default function NotificationsInner({
  notifications,
  parent,
  onNotificationClick,
  onClickOutside
}: NotificationsInnerProps) {
  const t = useTranslations('Notifications')
  const pathname = usePathname()
  const currentLanguage = pathname.split('/')[1] || 'en'
  const isRTL = currentLanguage === 'ar' || currentLanguage === 'he'
  const componentRef = useRef<HTMLDivElement>(null)
  
  // ---- Subcomponents ----
  const NotificationsHeader = ({
    onClose
  }: {
    onClose: () => void
  }) => (
    <div
      className="sticky top-0 z-10 bg-cover bg-center"
      style={{
        // Use gradient to avoid external image blocked by CSP (img-src disallows http:)
        backgroundImage: 'linear-gradient(135deg,rgb(81, 175, 246) 0%, #01B5D5 100%)'
      }}
    >
      <div className="bg-black/30">
        <div className="px-5 py-4 flex items-center justify-between">
          <h3 className="font-bold text-lg text-white">
            {t('TITLE')}
          </h3>
          <button
            type="button"
            aria-label="Close notifications"
            onClick={onClose}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )

  const NotificationItem = ({
    notification
  }: {
    notification: Notification
  }) => {
    const variant = getVariantForSubType(notification.sub_type)
    const color = VARIANT_TO_TW_COLOR[variant] ?? 'blue'
    const colorClasses = COLOR_CLASSES_BY_TW[color]
    const title = getNotificationName(notification.sub_type, currentLanguage)
    const iconPath = getNotificationIconName(notification.sub_type)
    const bg = getNotificationBg(notification.sub_type)
    const messageText = htmlToText(notification.message)
    const unreadMessageHtml = sanitizeNotificationHtml(notification.message)

 
    
    return (
      <div
        onClick={() => handleNotificationClick(notification)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleNotificationClick(notification)
          }
        }}
        className="px-5 py-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors duration-200 outline-none focus:ring-2 focus:ring-blue-200"
      >
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-4'}`}>
          <div className={` h-12 w-12 rounded-md flex items-center justify-center `}>
                {getNotificationIcon(notification.sub_type, getNotificationBg(notification.sub_type))}
                </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className={`text-xs text-blue-600 ${!notification.read_at ? 'font-bold' : 'font-light'}`} style={{wordBreak: 'break-word'}}>
              {notification.sub_type_value ? notification.sub_type_value : title}
            </p>
            <p
              className={`mt-0.5 ${!notification.read_at ? 'text-gray-900 font-medium' : 'text-gray-700 font-light'} text-sm whitespace-pre-line`}
              style={{ wordBreak: 'break-word' }}
            >
              {!notification.read_at ? (
                <span
                  // Safe minimal HTML (only emphasis/links), used ONLY for unread messages.
                  dangerouslySetInnerHTML={{ __html: unreadMessageHtml }}
                />
              ) : (
                messageText
              )}
            </p>
          </div>
          
          <div className={`${isRTL ? 'mr-3' : 'ml-3'} mt-4`}>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-[#EEF6FF] text-[#299AF8]">
              {t('VIEW')}
            </span>
          </div>
        </div>
      </div>
    )
  }
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        onClickOutside()
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClickOutside])

  const handleNotificationClick = useCallback(
    async (notification: Notification) => {
      // Compute destination
      // Case 1: Knowledge page opens in new tab (must be synchronous to keep user gesture)
      if (notification.type === 'knowledge' && notification.category) {
        const knowledgeUrl = `https://foresighta.co/${currentLanguage}/knowledge/${notification.category}/${notification.param || ''}?tab=ask`
        const win = window.open(knowledgeUrl, '_blank', 'noopener,noreferrer')
        if (win) win.opener = null
        // Fire-and-forget mark-as-read
        void onNotificationClick(notification.id).catch(() => {})
        return
      }

      // Case 2: Compute single-page redirects
      let url: string | null = null
      if (notification.type === 'order') {
        url = 'https://app.foresighta.co/app/insighter-dashboard/sales?tab=2'
      } else if (notification.sub_type.startsWith('client_meeting_reminder')) {
        url = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings?tab=client'
      } else if (notification.sub_type === 'accept_knowledge') {
        url = 'https://app.foresighta.co/app/insighter-dashboard/my-requests'
      } else if (notification.sub_type === 'client_meeting_new') {
        url = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings?tab=client'
      } else if (notification.sub_type === 'declined' && notification.type === 'knowledge') {
        url = `https://app.foresighta.co/app/my-knowledge-base/view-my-knowledge/${notification.param}/details`
      } else if (notification.sub_type.startsWith('client_')) {
        url = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings?tab=client'
      } else if (notification.sub_type.startsWith('insighter_')) {
        url = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings?tab=client'
      } else if (notification.type === 'knowledge' && notification.sub_type === 'approved') {
        url = `https://app.foresighta.co/app/my-knowledge-base/view-my-knowledge/${notification.param}/details`
      } else if (notification.sub_type.startsWith('client_meeting_insighter_postponed')) {
        url = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings/sent'
      } else if (notification.sub_type.startsWith('client_meeting_reschedule')) {
        url = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings/sent'
      } else if (notification.sub_type.startsWith('insighter_meeting_client_reschedule')) {
        url = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings?tab=client'
      } else if (notification.sub_type.startsWith('insighter_meeting_reminder')) {
        url = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings?tab=client'
      }else if (notification.sub_type ==='activate_insighter') {
        url = 'https://app.foresighta.co/app/profile/overview'
      }else if (notification.sub_type ==='deactivate_insighter') {
        url = 'https://app.foresighta.co/app/profile/overview'
      }

      // Mark-as-read BEFORE redirect to avoid request being cancelled by navigation
      try {
        await onNotificationClick(notification.id)
      } catch {
        // ignore errors and still navigate
      }
      if (url) {
        window.location.href = url
      }
    },
    [onNotificationClick, currentLanguage]
  )

  return (
    <div
      ref={componentRef}
      className="w-full h-full bg-white shadow-xl overflow-hidden flex flex-col animate-fadeIn"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <NotificationsHeader onClose={onClickOutside} />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Show message when no notifications are available */}
        {notifications.length === 0 && (
          <div className="text-center py-10 px-6">
            <div className="text-gray-500 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span>{t('NO_NEW')}</span>
            </div>
          </div>
        )}

        {/* All Notifications */}
        {notifications.length > 0 && notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  )
}