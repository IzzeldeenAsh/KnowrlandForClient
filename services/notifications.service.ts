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

// Singleton pattern to prevent multiple instances
class NotificationService {
  private static instance: NotificationService;
  private listeners: ((notifications: Notification[]) => void)[] = [];
  private currentNotifications: Notification[] = [];
  private pollingInterval: NodeJS.Timeout | null = null;
  private isPolling: boolean = false;
  private lastFetchTime: number = 0;
  private readonly CACHE_DURATION = 5000; // 5 seconds cache
  private isFetching: boolean = false;
  private pendingPromise: Promise<Notification[]> | null = null;

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Fetch notifications from the API with caching and deduplication
  public async getNotifications(locale: string = 'en', forceRefresh: boolean = false): Promise<Notification[]> {
    const now = Date.now();
    
    // Return cached data if still valid and not forced refresh
    if (!forceRefresh && (now - this.lastFetchTime) < this.CACHE_DURATION) {
      return [...this.currentNotifications];
    }

    // If already fetching, return the pending promise
    if (this.isFetching && this.pendingPromise) {
      return this.pendingPromise;
    }

    // Create new fetch promise
    this.pendingPromise = this.fetchNotificationsFromAPI(locale);
    
    try {
      const notifications = await this.pendingPromise;
      return notifications;
    } finally {
      this.pendingPromise = null;
    }
  }

  private async fetchNotificationsFromAPI(locale: string): Promise<Notification[]> {
    this.isFetching = true;
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        this.currentNotifications = [];
        this.notifyListeners();
        return [];
      }
      
      const response = await fetch('https://api.insightabusiness.com/api/account/notification', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': locale,
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, clear notifications
          this.currentNotifications = [];
          this.notifyListeners();
        }
        return this.currentNotifications;
      }
      
      const data = await response.json();
      const notifications = data.data || [];
      
      // Update cache
      this.currentNotifications = notifications;
      this.lastFetchTime = Date.now();
      this.notifyListeners();
      
      return notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return this.currentNotifications; // Return cached data on error
    } finally {
      this.isFetching = false;
    }
  }

  // Mark a notification as read
  public async markNotificationAsRead(id: string, locale: string = 'en'): Promise<boolean> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return false;
      }
      
      const response = await fetch(`https://api.insightabusiness.com/api/account/notification/read/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': locale,
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
      });
      
      if (response.ok) {
        // Update local state immediately for better UX
        this.currentNotifications = this.currentNotifications.map(notification => 
          notification.id === id 
            ? { ...notification, read_at: new Date().toISOString() }
            : notification
        );
        this.notifyListeners();
        
        // Force refresh after a short delay to get server state
        setTimeout(() => {
          this.getNotifications(locale, true);
        }, 500);
      }
      
      return response.ok;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  }

  // Mark all notifications as read
  public async markAllNotificationsAsRead(locale: string = 'en'): Promise<boolean> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return false;
      }
      
      const response = await fetch('https://api.insightabusiness.com/api/account/notification/read', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': locale,
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
      });
      
      if (response.ok) {
        // Update local state immediately
        this.currentNotifications = this.currentNotifications.map(notification => ({
          ...notification,
          read_at: new Date().toISOString()
        }));
        this.notifyListeners();
        
        // Force refresh after a short delay
        setTimeout(() => {
          this.getNotifications(locale, true);
        }, 500);
      }
      
      return response.ok;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }
  }

  // Start polling for notifications (singleton pattern)
  public startNotificationPolling(locale: string = 'en', interval: number = 30000): NodeJS.Timeout | null {
    if (this.isPolling) {
      console.log('Notification polling already active');
      return this.pollingInterval;
    }
    
    this.isPolling = true;
    
    // Initial fetch
    this.getNotifications(locale);
    
    // Set up interval
    this.pollingInterval = setInterval(() => {
      this.getNotifications(locale, true); // Force refresh during polling
    }, interval);
    
    console.log('Notification polling started');
    return this.pollingInterval;
  }

  // Stop polling for notifications
  public stopNotificationPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
      this.isPolling = false;
      console.log('Notification polling stopped');
    }
  }

  // Get the current notifications without fetching
  public getCurrentNotifications(): Notification[] {
    return [...this.currentNotifications];
  }

  // Subscribe to notifications changes
  public subscribeToNotifications(callback: (notifications: Notification[]) => void): () => void {
    this.listeners.push(callback);
    
    // Immediately call with current notifications
    callback([...this.currentNotifications]);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners about new notifications
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      listener([...this.currentNotifications]);
    });
  }

  // Clear all data (for logout)
  public clearNotifications(): void {
    this.currentNotifications = [];
    this.lastFetchTime = 0;
    this.notifyListeners();
  }
}

// Export singleton instance and utility functions
const notificationService = NotificationService.getInstance();

export async function getNotifications(locale: string = 'en'): Promise<Notification[]> {
  return notificationService.getNotifications(locale);
}

export async function markNotificationAsRead(id: string, locale: string = 'en'): Promise<boolean> {
  return notificationService.markNotificationAsRead(id, locale);
}

export async function markAllNotificationsAsRead(locale: string = 'en'): Promise<boolean> {
  return notificationService.markAllNotificationsAsRead(locale);
}

export function startNotificationPolling(locale: string = 'en', interval: number = 30000): NodeJS.Timeout | null {
  return notificationService.startNotificationPolling(locale, interval);
}

export function stopNotificationPolling(): void {
  notificationService.stopNotificationPolling();
}

export function getCurrentNotifications(): Notification[] {
  return notificationService.getCurrentNotifications();
}

export function subscribeToNotifications(callback: (notifications: Notification[]) => void): () => void {
  return notificationService.subscribeToNotifications(callback);
}

export function clearNotifications(): void {
  notificationService.clearNotifications();
} 