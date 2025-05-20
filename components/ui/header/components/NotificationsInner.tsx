'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Notification } from '@/services/notifications.service'

interface NotificationsInnerProps {
  notifications: Notification[]
  parent: string
  onNotificationClick: (id: string) => void
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
      return 'general/gen048';
    case 'deactivate_company':
    case 'deactivate_company_with_delete':
    case 'deactivate_delete_company':
      return 'general/gen050';
    case 'activate_insighter':
      return 'general/gen048';
    case 'deactivate_insighter':
    case 'deactivate_insighter_with_delete':
    case 'deactivate_delete_insighter':
      return 'general/gen050';
    case 'accept_knowledge':
    case 'knowledge_accept':
      return 'general/gen048';
    case 'declined':
    case 'knowledge_declined':
      return 'general/gen050';
    case 'download':
      return 'files/fil025';
    case 'upload':
      return 'files/fil022';
    case 'comment':
      return 'communication/com003';
    case 'reply':
      return 'communication/com012';
    case 'like':
      return 'general/gen030';
    case 'save':
      return 'general/gen019';
    case 'share':
      return 'general/gen016';
    case 'view':
      return 'general/gen007';
    default:
      return 'general/gen007';
  }
}

// Helper function to determine icon based on notification sub_type
const getNotificationIcon = (subType: string): React.ReactNode => {
  // Map Angular SVG icons to our own SVG components
  // We use a simplified set - you can expand this with more icons
  const iconType = getNotificationIconName(subType);
  
  // Simple icons in SVG format based on notification type
  const icons = {
    // Success/Accept icons
    'general/gen048': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    // Danger/Decline icons
    'general/gen050': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    // Download
    'files/fil025': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    ),
    // Upload
    'files/fil022': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    ),
    // Comment
    'communication/com003': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
      </svg>
    ),
    // Reply
    'communication/com012': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ),
    // Default notification
    'general/gen007': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
      </svg>
    ),
  };

  return icons[iconType as keyof typeof icons] || icons['general/gen007'];
}

// Helper function to determine display name based on notification sub_type
const getNotificationName = (subType: string): string => {
  const nameMap: Record<string, string> = {
    'accept_knowledge': 'Knowledge Accepted',
    'declined': 'Knowledge Declined',
    'download': 'Download',
    'upload': 'Upload',
    'comment': 'Comment',
    'reply': 'Reply',
    'like': 'Like',
    'save': 'Save',
    'share': 'Share',
    'view': 'View',
    'knowledge_accept': 'Knowledge Accepted',
    'knowledge_declined': 'Knowledge Declined',
    'activate_company': 'Active Company',
  }
  return nameMap[subType] || subType
}

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

  const handleNotificationClick = (notification: Notification) => {
    // Handle knowledge accept/decline notifications
    if (notification.type === 'knowledge' && (notification.sub_type === 'accept_knowledge' || notification.sub_type === 'declined')) {
      // For company-insighter role, we would handle this differently
      // This would require checking user roles from context/state
      
      onNotificationClick(notification.id)
      return
    }
    
    // Handle knowledge notifications with category
    if (notification.type === 'knowledge' && notification.category) {
      const knowledgeUrl = `https://knoldg.com/${currentLanguage}/knowledge/${notification.category}/${notification.param || ''}?tab=ask`
      window.open(knowledgeUrl, '_blank')
    } else {
      onNotificationClick(notification.id)
    }
  }

  return (
    <div 
      ref={componentRef}
      className="w-80 sm:w-96 bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200 animate-fadeIn"
      style={{
        animation: 'fadeIn 0.2s ease-out',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="bg-gradient-to-r from-blue-600 to-blue-800 px-5 py-4 text-white"
      >
        <h3 className="font-bold text-lg">
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
              <div className="flex-shrink-0 mr-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${getTailwindColor(getNotificationBg(notification.sub_type))}-100 text-${getTailwindColor(getNotificationBg(notification.sub_type))}-600`}>
                  {getNotificationIcon(notification.sub_type)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">
                  {getNotificationName(notification.sub_type)}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {notification.read_at ? 'Read' : 'New'}
                </p>
              </div>
              
              <div className="ml-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getTailwindColor(getNotificationBg(notification.sub_type))}-100 text-${getTailwindColor(getNotificationBg(notification.sub_type))}-800`}>
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