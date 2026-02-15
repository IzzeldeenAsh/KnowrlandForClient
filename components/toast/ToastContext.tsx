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
  handleServerSuccess: (payload: any, fallbackMessage?: string) => void;
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
      container.className = 'position-fixed top-0 end-0 p-3 z-index-20 toast-container';
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
    // Generate a unique ID based on message content and type to prevent duplicates
    const contentHash = `${type}-${message}`;
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
    
    // Check if we already have a toast with the same message and type
    setToasts((prevToasts) => {
      // If we already have this exact toast message and type, don't add a duplicate
      const duplicateToast = prevToasts.find(t => 
        t.message === message && t.type === type
      );
      
      if (duplicateToast) {
        // Just return the existing toasts without adding a duplicate
        return prevToasts;
      }
      
      // Otherwise add the new toast
      return [...prevToasts, { id, message, type, title, delay }];
    });
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

  const handleServerSuccess = useCallback(
    (payload: any, fallbackMessage: string = 'Success') => {
      const normalizedPayload = payload && typeof payload === 'object' ? payload : null;
      const type = normalizedPayload?.type === 'warning' ? 'warning' : 'success';
      const show = type === 'warning' ? warning : success;
      const messageCandidate =
        typeof normalizedPayload?.message === 'string' && normalizedPayload.message.trim()
          ? normalizedPayload.message.trim()
          : fallbackMessage;
      show(messageCandidate, '', 6000);
    },
    [success, warning]
  );

  // Function to handle server errors similar to Angular service
  const handleServerErrors = useCallback((err: any) => {
    const payload =
      err?.error && typeof err.error === 'object'
        ? err.error
        : err?.response?.data && typeof err.response.data === 'object'
          ? err.response.data
          : err && typeof err === 'object'
            ? err
            : null;

    const type = typeof payload?.type === 'string' ? payload.type : undefined;
    const show = type === 'warning' ? warning : error;

    const errorsBag = payload?.errors;
    if (errorsBag && typeof errorsBag === 'object') {
      for (const key in errorsBag as Record<string, unknown>) {
        if (!Object.prototype.hasOwnProperty.call(errorsBag, key)) continue;
        const entry = (errorsBag as Record<string, unknown>)[key];
        const messages = Array.isArray(entry) ? entry : entry ? [entry] : [];
        const normalized = messages
          .map((message) => (typeof message === 'string' ? message.trim() : ''))
          .filter(Boolean);
        if (!normalized.length) continue;
        show(normalized.join(', '), '', 10000);
      }
      return;
    }

    const messageCandidate =
      typeof payload?.message === 'string' && payload.message.trim()
        ? payload.message.trim()
        : typeof err?.message === 'string' && err.message.trim()
          ? err.message.trim()
          : '';

    if (type === 'warning') {
      show(messageCandidate || 'An unexpected warning occurred.', '', 10000);
      return;
    }

    show(messageCandidate || 'An unexpected error occurred.', '', 10000);
  }, [error, warning]);

  const contextValue = {
    success,
    error,
    warning,
    info,
    handleServerSuccess,
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
