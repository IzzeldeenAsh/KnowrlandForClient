'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname, useParams } from 'next/navigation'
import { SvgIcon } from '../../SvgIcon'
import Image from 'next/image'
import { Notification } from '@/services/notifications.service'

interface NotificationsInnerProps {
  notifications: Notification[]
  parent: string
  onNotificationClick: (id: string) => Promise<void>
  onClickOutside: () => void
}

// Helper function to determine background color based on notification sub_type
// This matches the Angular notificationsBg pipe
const getNotificationBg = (subType: string): string => {
  switch (subType) {
    case 'activate_company':
      return 'success';
    case 'deactivate_company':
    case 'deactivate_company_with_delete':
    case 'deactivate_delete_company':
    case 'declined':
    case 'knowledge_declined':
      return 'danger';
    case 'activate_insighter':
    case 'accept_knowledge':
    case 'knowledge_accept':
    case 'approved':
    case 'download':
    case 'view':
      return 'info';
    case 'upload':
      return 'warning';
    case 'comment':
    case 'reply':
      return 'primary';
    case 'like':
      return 'info';
    case 'save':
      return 'success';
    case 'share':
      return 'warning';
    default:
      return 'info';
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
  return colorMap[color] || 'blue';
}

// Helper function to get icon name based on notification sub_type (like the Angular notificationsIcons pipe)
const getNotificationIconName = (subType: string): string => {
  switch (subType) {
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
    'accept_knowledge': { en: 'Knowledge Accepted', ar: 'قبول المعرفة' },
    'declined': { en: 'Knowledge Declined', ar: 'رفض المعرفة' },
    'approved': { en: 'Knowledge Approved', ar: 'تمت الموافقة على المعرفة' },
    'download': { en: 'Download', ar: 'تنزيل' },
    'upload': { en: 'Upload', ar: 'رفع' },
    'comment': { en: 'Comment', ar: 'تعليق' },
    'reply': { en: 'Reply', ar: 'رد' },
    'like': { en: 'Like', ar: 'إعجاب' },
    'save': { en: 'Save', ar: 'حفظ' },
    'share': { en: 'Share', ar: 'مشاركة' },
    'view': { en: 'View', ar: 'عرض' },
    'knowledge_accept': { en: 'Knowledge Accepted', ar: 'قبول المعرفة' },
    'knowledge_declined': { en: 'Knowledge Declined', ar: 'رفض المعرفة' },
    'activate_company': { en: 'Active Company', ar: 'تفعيل الشركة' },
    'client_meeting_new': { en: 'New Meeting Request', ar: 'طلب اجتماع جديد' },
    'insighter_meeting_client_new': { en: 'New Meeting Request', ar: 'طلب اجتماع جديد' },
    'insighter_meeting_approved': { en: 'Meeting Approved', ar: 'تمت الموافقة على الاجتماع' },
    'client_meeting_insighter_approved': { en: 'Meeting Approved', ar: 'تمت الموافقة على الاجتماع' },
    'client_meeting_insighter_postponed': { en: 'Meeting Postponed', ar: 'تم تأجيل الاجتماع' },
    'client_meeting_reschedule': { en: 'Meeting Rescheduled', ar: 'تمت إعادة جدولة الاجتماع' },
    'insighter_meeting_client_reschedule': { en: 'Meeting Rescheduled', ar: 'تمت إعادة جدولة الاجتماع' },
    'client_meeting_reminder': { en: 'Meeting Reminder', ar: 'تذكير بالاجتماع' },
    'insighter_meeting_reminder': { en: 'Meeting Reminder', ar: 'تذكير بالاجتماع' },
    'deactivate_delete_company': { en: 'Company Deactivation', ar: 'إلغاء تفعيل الشركة' },
  };

  const names = nameMap[subType];
  if (!names) {
    return subType; // Fallback to the subtype key if no translation exists
  }

  return language === 'ar' ? names.ar : names.en; // Return Arabic if lang is 'ar', otherwise default to English
};

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
  const params = useParams()
  const currentLanguage = pathname.split('/')[1] || 'en'
  const isRTL = currentLanguage === 'ar' || currentLanguage === 'he'
  const componentRef = useRef<HTMLDivElement>(null)
  
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

  const handleNotificationClick = async (notification: Notification) => {
    // Always mark the notification as read first and wait for it to complete
    await onNotificationClick(notification.id)
    
    // Handle accept_knowledge notifications - redirect to insighter dashboard
    if (notification.sub_type === 'accept_knowledge') {
      window.location.href = 'https://app.foresighta.co/app/insighter-dashboard/my-requests'
      return
    }
    if (notification.sub_type === 'declined' && notification.type === 'knowledge') {
      window.location.href = `https://app.foresighta.co/app/my-knowledge-base/view-my-knowledge/${notification.param}/details`
      return
    }
    if(notification.sub_type.startsWith('client_')) {
      window.location.href = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings/sent'
      return
    }
    if(notification.sub_type.startsWith('insighter_')) {
      window.location.href = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings/received'
      return
    }
    // Handle knowledge approved notifications - redirect to knowledge details page
    if (notification.type === 'knowledge' && notification.sub_type === 'approved') {
      window.location.href = `https://app.foresighta.co/app/my-knowledge-base/view-my-knowledge/${notification.param}/details`
      return
    }
    if(notification.sub_type.startsWith('client_meeting_insighter_postponed')){
      window.location.href = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings/sent'
      return
    }
    if(notification.sub_type.startsWith('client_meeting_reschedule')){
      window.location.href = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings/sent'
      return
    }
    if(notification.sub_type.startsWith('insighter_meeting_client_reschedule')){
      window.location.href = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings/received'
      return
    }
    if(notification.sub_type.startsWith('insighter_meeting_reminder')){
      window.location.href = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings/received'
      return
    }
    if(notification.sub_type.startsWith('client_meeting_reminder')){
      window.location.href = 'https://app.foresighta.co/app/insighter-dashboard/my-meetings/sent'
      return
    }
    // Handle knowledge accept/decline notifications
    if (notification.type === 'knowledge' && (notification.sub_type === 'accept_knowledge' || notification.sub_type === 'declined')) {
      // For company-insighter role, we would handle this differently
      // This would require checking user roles from context/state
      return
    }
    
    // Handle knowledge notifications with category
    if (notification.type === 'knowledge' && notification.category) {
      const knowledgeUrl = `https://foresighta.co/${currentLanguage}/knowledge/${notification.category}/${notification.param || ''}?tab=ask`
      window.open(knowledgeUrl, '_blank')
    }
  }

  return (
    <div
      ref={componentRef}
      className="w-80 sm:w-96 bg-white rounded-lg shadow-2xl overflow-hidden animate-fadeIn"
      style={{
        animation: 'fadeIn 0.2s ease-out',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        direction: isRTL ? 'rtl' : 'ltr',
        right: isRTL ? '0' : 'auto',
        left: isRTL ? 'auto' : '0'
      }}
    >
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="px-5 py-4 text-white"
        style={{ backgroundImage: 'url(https://app.foresighta.co/assets/media/misc/menu-header-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <h3 className="font-bold text-lg mt-4 mb-2">
          {t('TITLE')}
        </h3>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {/* Show message when no notifications are available */}
        {notifications.length === 0 && (
          <div className="text-center py-10 px-4">
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
          <div
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            className="p-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-start">
              <div className={`flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`}>
                <div className={` h-12 w-12 rounded-md flex items-center justify-center bg-${getTailwindColor(getNotificationBg(notification.sub_type))}-50 text-${getTailwindColor(getNotificationBg(notification.sub_type))}-600`}>
                {getNotificationIcon(notification.sub_type, getNotificationBg(notification.sub_type))}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm text-gray-900 ${!notification.read_at ? 'font-bold' : 'font-light'}`}>
                  {/* *** CHANGE 2: UPDATED FUNCTION CALL *** */}
                  {getNotificationName(notification.sub_type, currentLanguage)}
                </p>
                <p className={`text-xs text-gray-400 ${!notification.read_at ? 'font-semibold' : 'font-normal'}`}>
                  {notification.message}
                </p>
              </div>
              
              <div className={`${isRTL ? 'mr-3' : 'ml-3'} mt-4`}>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-[#EEF6FF] text-[#0978B9]`}>
                  {t('VIEW')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}