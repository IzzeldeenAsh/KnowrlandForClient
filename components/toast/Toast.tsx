'use client';

import React, { useState, useEffect, useRef } from 'react';
import { IconCheck, IconX, IconInfoCircle, IconAlertCircle } from '@tabler/icons-react';

interface ToastProps {
  message: string;
  title?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  delay?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  title = 'Notification', 
  type = 'info', 
  delay = 5000,
  onClose 
}) => {
  const [show, setShow] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // Show the toast
    setShow(true);
    
    // Auto-hide after delay
    timeoutRef.current = setTimeout(() => {
      setShow(false);
      if (onClose) {
        setTimeout(() => onClose(), 150); // Call onClose after fade out
      }
    }, delay);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay, onClose]);

  // Get icon, color, and background color based on type
  const getIconStyles = () => {
    switch(type) {
      case 'success':
        return { icon: <IconCheck size={10} style={{ fontWeight: 'bold' }} />, color: '#50CD89', bgColor: '#E8FFF3', };
      case 'error':
        return { icon: <IconX size={10} style={{ fontWeight: 'bold' }} />, color: '#F1416C', bgColor: '#FFF5F8', };
      case 'warning':
        return { icon: <IconAlertCircle size={10} style={{ fontWeight: 'bold' }} />, color: '#FFC700', bgColor: '#FFF8DD', };
      case 'info':
        return { icon: <IconInfoCircle size={10} style={{ fontWeight: 'bold' }} />, color: '#009EF7', bgColor: '#F1FAFF', };
      default:
        return { icon: <IconInfoCircle size={10} style={{ fontWeight: 'bold' }} />, color: '#009EF7', bgColor: '#F1FAFF', };
    }
  };

  // Get title based on type if not provided
  const getDefaultTitle = () => {
    if (title && title !== '') return title;
    
    switch(type) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Information';
      default:
        return 'Notification';
    }
  };

  const handleClose = () => {
    setShow(false);
    if (onClose) {
      setTimeout(() => onClose(), 150); // Call onClose after fade out
    }
  };

  // Get timestamp text for the toast notification
  const getTimeText = () => {
    return 'Just now'; // In a real implementation, you'd calculate this
  };

  return (
    <div 
      className={`toast fade ${show ? 'show' : ''}`} 
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
      style={{
        opacity: show ? 1 : 0,
        transition: 'opacity 0.15s ease-in-out'
      }}
    >
      <div className="toast-header">
        {/* Icon based on toast type with light background */}
        <div 
          className="me-2 rounded-full p-1"
          style={{ 
            color: getIconStyles().color,
            backgroundColor: getIconStyles().bgColor,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '22px',
            height: '22px'
          }}
        >
          {getIconStyles().icon}
        </div>
        {/* Title with smaller font size */}
        <strong className="me-auto text-xs">{getDefaultTitle()}</strong>
        {/* Timestamp */}
        <small className="toast-time">{getTimeText()}</small>
        {/* Close button with X character */}
        <button 
          type="button" 
          className="btn-close" 
          onClick={handleClose} 
          aria-label="Close"
          style={{ fontSize: '0.8rem', fontWeight: 'normal', opacity: 0.5 }}
        >
          ×
        </button>
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default Toast;
