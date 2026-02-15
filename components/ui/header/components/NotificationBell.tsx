'use client'
import { useEffect, useState, type ReactNode } from 'react'
import type React from 'react'
import { createPortal } from 'react-dom'
import { useParams, usePathname } from 'next/navigation'
import NotificationsInner from './NotificationsInner'
import { getAuthToken } from '@/lib/authToken'
import { 
  getNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  startNotificationPolling, 
  subscribeToNotifications,
  Notification
} from '@/services/notifications.service'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'
import {usePusherNotificaitons} from '@/hooks/usePusherNotifications';
import { subscribePrivateUser, unsubscribePrivateUser, bindGlobal, unbindGlobal } from '@/lib/pusher-client';

// Notification bell icon as SVG
const NotificationIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="w-5 h-5"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
)

type NotificationBellProps = {
  parent?: 'client' | 'app';
};

export default function NotificationBell({ parent = 'client' }: NotificationBellProps) {
  const { user } = useUserProfile()
  const token = getAuthToken()
 const params = useParams();
    const currentLocale = params.locale as string;
    
  // Map realtime event payloads to our Notification shape
  const mapEventToNotification = (data: any): Notification => {
    return {
      id: data?.id ?? `evt-${Date.now()}`,
      message: data?.message ?? '',
      type: data?.type ?? 'notification',
      notifiable_group_id: data?.notifiable_group_id ?? '',
      notifiable_id: data?.notifiable_id ?? 0,
      request_id: data?.request_id ?? 0,
      param: data?.param ?? null,
      sub_type: data?.sub_type ?? 'info',
      redirect_page: !!data?.redirect_page,
      read_at: undefined,
      sub_page: data?.sub_page,
      tap: data?.tap,
      category: data?.category,
    }
  }

  usePusherNotificaitons({
    userId: user?.id,
    token: token || undefined,
    currentLocale: currentLocale,
    eventNames: [
      'account.activated',
      'account.deactivated',
      'knowledge.accepted',
      'knowledge.declined',
      'order.insight',
      'knowledge.answer_question',
      'knowledge.ask_question',
      'meeting.client_meeting_insighter_approved',
      'meeting.client_meeting_insighter_postponed',
      'meeting.client_meeting_reminder',
      'meeting.client_meeting_new',
      'meeting.client_meeting_reschedule',
      'meeting.insighter_meeting_approved',
      'meeting.insighter_meeting_reminder',
      'meeting.insighter_meeting_client_new',
      'requests.action',
      'requests'
    ]
  })
  // Bind handlers that push new events to the top of the list
  useEffect(() => {
    if (!user?.id || !token || !currentLocale) return
    const channel = subscribePrivateUser(user.id, token, currentLocale)
    const events = [
      'account.activated',
      'account.deactivated',
      'knowledge.accepted',
      'knowledge.declined',
      'order.insight',
      'knowledge.answer_question',
      'knowledge.ask_question',
      'meeting.client_meeting_insighter_approved',
      'meeting.client_meeting_insighter_postponed',
      'meeting.client_meeting_reminder',
      'meeting.client_meeting_new',
      'meeting.client_meeting_reschedule',
      'meeting.insighter_meeting_approved',
      'meeting.insighter_meeting_reminder',
      'meeting.insighter_meeting_client_new',
      'requests.action',
      'requests'
    ]
    const handler = (data: any) => {
      const next = mapEventToNotification(data)
      // Insert at top; keep unread (read_at undefined) so badge increases
      setNotifications(prev => [next, ...prev])
    }
    events.forEach(evt => channel.bind(evt, handler))
    // Fallback: also listen globally to catch any server-side event names
    const globalHandler = (eventName: string, data: any) => {
      if (eventName.startsWith('pusher:') || eventName.startsWith('pusher_internal:')) return
      const next = mapEventToNotification(data)
      setNotifications(prev => (prev.some(n => n.id === next.id) ? prev : [next, ...prev]))
    }
    bindGlobal(globalHandler)
    return () => {
      try {
        events.forEach(evt => channel.unbind(evt, handler))
        unbindGlobal(globalHandler)
        unsubscribePrivateUser(user.id)
      } catch {}
    }
  }, [user?.id, token, currentLocale])
  // Use mock data for testing or real notifications when they're available
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'
  const isRTL = locale === 'ar' || locale === 'he'
  
  // Get count of unread notifications
  const notificationCount = notifications.filter(n => !n.read_at).length
  
  useEffect(() => {
    setMounted(true)
    // Initialize notifications
    getNotifications(locale).then(apiNotifications => {
      // Always use API notifications, even if empty
      if (apiNotifications) {
        setNotifications(apiNotifications);
      }
    });
    
    // Subscribe to notifications
    const unsubscribe = subscribeToNotifications((apiNotifications) => {
      // Always update with latest notifications
      if (apiNotifications) {
        setNotifications(apiNotifications);
      }
    });
    
    
    return () => {
      unsubscribe()
    }
  }, [locale])
  
  // Close drawer with Escape
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])
  
  const toggleNotifications = (event: React.MouseEvent) => {
    event.stopPropagation()
    
    // Toggle notifications panel immediately
    setIsOpen(prev => !prev)
  }
  
  const closeNotifications = () => {
    setIsOpen(false)
  }
  
  const handleNotificationClick = async (id: string) => {
    // Mark notification as read in our local state for mocks
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? {...notification, read_at: new Date().toISOString()} 
          : notification
      )
    );
    
    // Also try to mark as read on the server if it's a real notification
    await markNotificationAsRead(id, locale)
    
    // Close the dropdown
    setIsOpen(false)
  }

  const drawerPortal: ReactNode = mounted
    ? (createPortal(
        <div
          className={`fixed inset-0 z-[1000] ${isOpen ? '' : 'pointer-events-none'}`}
          aria-hidden={!isOpen}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={closeNotifications}
          />
          {/* Drawer panel */}
          <div
            role="dialog"
            aria-modal="true"
            className={`absolute top-0 bottom-0 ${isRTL ? 'left-0' : 'right-0'} w-full max-w-md sm:max-w-lg bg-white shadow-xl transition-transform duration-300 ease-out transform ${isOpen ? 'translate-x-0' : (isRTL ? '-translate-x-full' : 'translate-x-full')}`}
            onClick={e => e.stopPropagation()}
          >
            <NotificationsInner 
              parent={parent}
              onNotificationClick={handleNotificationClick} 
              notifications={notifications}
              onClickOutside={closeNotifications}
            />
          </div>
        </div>,
        document.body
      ) as unknown as ReactNode)
    : null
  
  return (
    <div className="relative notification-item">
      <button
        className="flex items-center text-gray-400 justify-center w-8 h-8 rounded-full hover:bg-gray-100 focus:outline-none transition-all duration-200 notification-toggle hover:shadow "
        onClick={toggleNotifications}
        aria-label="Notifications"
      >
        <NotificationIcon />
        <span
          className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full shadow-sm ${notificationCount > 0 ? 'bg-red-600' : 'bg-transparent'}`}
        >
          {notificationCount > 0 ? notificationCount : ''}
        </span>
      </button>
      
      {/* Notification Drawer via Portal to avoid parent stacking contexts */}
      {drawerPortal}
    </div>
  )
} 
