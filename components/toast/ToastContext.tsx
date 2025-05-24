'use client';

import React, { createContext, useState, useContext, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  title?: string;
  delay?: number;
}

interface ToastContextType {
  success: (message: string, title?: string, delay?: number) => void;
  error: (message: string, title?: string, delay?: number) => void;
  warning: (message: string, title?: string, delay?: number) => void;
  info: (message: string, title?: string, delay?: number) => void;
  handleServerErrors: (error: any) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

interface ToastItem {
  id: string;
  message: string;
  title?: string;
  type: ToastType;
  delay?: number;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  React.useEffect(() => {
    // Create toast container if it doesn't exist
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'position-fixed top-0 end-0 p-3 z-index-1000 toast-container';
      document.body.appendChild(container);
    }
    
    setPortalContainer(container as HTMLElement);

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType, title?: string, delay: number = 5000) => {
    const id = Date.now().toString();
    
    title = title || {
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Information'
    }[type];
    
    // If title is empty, set a default based on type
    if (title === '') {
      title = {
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Information'
      }[type];
    }
    
    setToasts((prevToasts) => [...prevToasts, { id, message, type, title, delay }]);
  }, []);
  
  const success = useCallback((message: string = 'Success', title: string = 'Success', delay?: number) => {
    showToast(message, 'success', title, delay);
  }, [showToast]);
  
  const error = useCallback((message: string = 'Error', title: string = 'Error', delay?: number) => {
    showToast(message, 'error', title, delay);
  }, [showToast]);
  
  const warning = useCallback((message: string = 'Warning', title: string = 'Warning', delay?: number) => {
    showToast(message, 'warning', title, delay);
  }, [showToast]);
  
  const info = useCallback((message: string = 'Information', title: string = 'Information', delay?: number) => {
    showToast(message, 'info', title, delay);
  }, [showToast]);

  // Function to handle server errors similar to Angular service
  const handleServerErrors = useCallback((err: any) => {
    if (err.error && err.error.errors) {
      const serverErrors = err.error.errors;
      for (const key in serverErrors) {
        if (serverErrors.hasOwnProperty(key)) {
          const messages = serverErrors[key];
          error(messages.join(', '), '', 10000);
        }
      }
    } else if (err.response && err.response.data && err.response.data.errors) {
      // Handle axios/fetch style error responses
      const serverErrors = err.response.data.errors;
      for (const key in serverErrors) {
        if (serverErrors.hasOwnProperty(key)) {
          const messages = serverErrors[key];
          error(Array.isArray(messages) ? messages.join(', ') : messages, '', 10000);
        }
      }
    } else if (err.response && err.response.data && err.response.data.message) {
      // Handle single error message
      error(err.response.data.message, '', 10000);
    } else if (err.message) {
      // Handle simple error object with message
      error(err.message, '', 10000);
    } else {
      // Default error message
      error('An unexpected error occurred.', '', 10000);
    }
  }, [error]);

  const contextValue = {
    success,
    error,
    warning,
    info,
    handleServerErrors
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {portalContainer &&
        createPortal(
          <>
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                message={toast.message}
                title={toast.title}
                type={toast.type}
                delay={toast.delay}
                onClose={() => removeToast(toast.id)}
              />
            ))}
          </>,
          portalContainer
        )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
