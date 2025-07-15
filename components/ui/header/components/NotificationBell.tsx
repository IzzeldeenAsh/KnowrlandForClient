'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import NotificationsInner from './NotificationsInner'
import { 
  getNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  startNotificationPolling, 
  subscribeToNotifications,
  Notification
} from '@/services/notifications.service'

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

export default function NotificationBell() {
  // Use mock data for testing or real notifications when they're available
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'
  const isRTL = locale === 'ar' || locale === 'he'
  
  // Get count of unread notifications
  const notificationCount = notifications.filter(n => !n.read_at).length
  
  useEffect(() => {
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
    
    // Start polling for notifications every 30 seconds
    const intervalId = startNotificationPolling(locale, 30000)
    
    // Clean up on component unmount
    return () => {
      unsubscribe()
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [locale])
  
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
      
      {/* Notification dropdown - higher z-index and fixed position */}
      {isOpen && (
        <div className="fixed inset-0 w-full h-full bg-transparent z-[100]" onClick={closeNotifications}>
          <div 
            className={`absolute top-16 md:top-16 ${
              isRTL ? 'left-5 md:left-20' : 'right-5 md:right-20'
            }`} 
            onClick={e => e.stopPropagation()}
          >
            <NotificationsInner 
              parent="client"
              onNotificationClick={handleNotificationClick} 
              notifications={notifications}
              onClickOutside={closeNotifications}
            />
          </div>
        </div>
      )}
    </div>
  )
} 