'use client'

export interface Notification {
  id: string
  message: string
  type: string
  notifiable_group_id: string
  notifiable_id: number
  request_id: number
  param: any
  sub_type: string
  redirect_page: boolean
  read_at?: string
  sub_page?: string
  tap?: string
  category?: string
}

// Use a simple event-based system
const listeners: ((notifications: Notification[]) => void)[] = [];
let currentNotifications: Notification[] = [];

// Fetch notifications from the API
export async function getNotifications(locale: string = 'en'): Promise<Notification[]> {
  try {
    const token = localStorage.getItem('token')
    
    if (!token) {
      return []
    }
    
    const response = await fetch('https://api.knoldg.com/api/account/notification', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': locale
      }
    })
    
    if (!response.ok) {
      return []
    }
    
    const data = await response.json()
    const notifications = data.data || []
    
    // Update current notifications and notify listeners
    currentNotifications = notifications;
    notifyListeners();
    
    return notifications
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return []
  }
}

// Mark a notification as read
export async function markNotificationAsRead(id: string, locale: string = 'en'): Promise<boolean> {
  try {
    const token = localStorage.getItem('token')
    
    if (!token) {
      return false
    }
    
    const response = await fetch(`https://api.knoldg.com/api/account/notification/read/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': locale
      }
    })
    
    if (response.ok) {
      // Refresh notifications after marking as read
      await getNotifications(locale)
    }
    
    return response.ok
  } catch (error) {
    console.error('Error marking notification as read:', error)
    return false
  }
}

// Mark all notifications as read
export async function markAllNotificationsAsRead(locale: string = 'en'): Promise<boolean> {
  try {
    const token = localStorage.getItem('token')
    
    if (!token) {
      return false
    }
    
    const response = await fetch('https://api.knoldg.com/api/account/notification/read', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': locale
      }
    })
    
    if (response.ok) {
      // Refresh notifications after marking all as read
      await getNotifications(locale)
    }
    
    return response.ok
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
    return false
  }
}

// Start polling for notifications
export function startNotificationPolling(locale: string = 'en', interval: number = 30000) {
  // Initial fetch
  getNotifications(locale)
  
  // Set up interval (30000 ms = 30 seconds)
  const pollingInterval = setInterval(() => {
    getNotifications(locale)
  }, interval)
  
  // Return the interval ID so it can be cleared later
  return pollingInterval
}

// Get the current notifications without fetching
export function getCurrentNotifications(): Notification[] {
  return [...currentNotifications]
}

// Subscribe to notifications changes
export function subscribeToNotifications(callback: (notifications: Notification[]) => void) {
  listeners.push(callback);
  
  // Return unsubscribe function
  return () => {
    const index = listeners.indexOf(callback);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }
}

// Notify all listeners about new notifications
function notifyListeners() {
  listeners.forEach(listener => {
    listener([...currentNotifications]);
  });
} 