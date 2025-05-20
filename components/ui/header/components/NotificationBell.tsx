'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import NotificationsInner from './NotificationsInner'
import { 
  getNotifications, 
  markNotificationAsRead, 
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
    className="w-6 h-6"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
)

// Mock notifications for testing
const mockNotifications: Notification[] = [
  {
    id: '1',
    message: 'Your knowledge submission has been approved',
    type: 'knowledge',
    sub_type: 'accept_knowledge',
    notifiable_group_id: '1',
    notifiable_id: 1,
    request_id: 1,
    param: '123',
    redirect_page: false,
    read_at: undefined
  },
  {
    id: '2',
    message: 'New comment on your knowledge item',
    type: 'comment',
    sub_type: 'comment',
    notifiable_group_id: '2',
    notifiable_id: 2,
    request_id: 2,
    param: '456',
    redirect_page: true,
    read_at: undefined
  },
  {
    id: '3',
    message: 'Your company account has been activated',
    type: 'company',
    sub_type: 'activate_company',
    notifiable_group_id: '3',
    notifiable_id: 3,
    request_id: 3,
    param: '789',
    redirect_page: false,
    read_at: undefined
  },
  {
    id: '4',
    message: 'Your knowledge submission was declined',
    type: 'knowledge',
    sub_type: 'declined',
    notifiable_group_id: '4',
    notifiable_id: 4,
    request_id: 4,
    param: '101',
    redirect_page: true,
    read_at: undefined
  }
];

export default function NotificationBell() {
  // Use mock data for testing or real notifications when they're available
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'
  
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
      clearInterval(intervalId)
    }
  }, [locale])
  
  const toggleNotifications = (event: React.MouseEvent) => {
    event.stopPropagation()
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
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-gray-100 focus:outline-none transition-all duration-200 notification-toggle shadow-sm hover:shadow border border-gray-200"
        onClick={toggleNotifications}
        aria-label="Notifications"
      >
        <NotificationIcon />
        {notificationCount > 0 && (
          <span
            className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full shadow-sm"
          >
            {notificationCount}
          </span>
        )}
      </button>
      
      {/* Notification dropdown - higher z-index and fixed position */}
      {isOpen && (
        <div className="fixed inset-0 w-full h-full bg-transparent z-[100]" onClick={closeNotifications}>
          <div className="absolute right-5 top-16 md:right-20 md:top-16" onClick={e => e.stopPropagation()}>
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