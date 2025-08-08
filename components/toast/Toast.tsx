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

  // Get icon, color, background color and border color based on type
  const getStyles = () => {
    switch(type) {
      case 'success':
        return { 
          icon: <IconCheck size={10} style={{ fontWeight: 'bold' }} />, 
          color: '#50CD89', 
          bgColor: '#E9F6EE',
          borderColor: '#BBF7D0'
        };
      case 'error':
        return { 
          icon: <IconX size={10} style={{ fontWeight: 'bold' }} />, 
          color: '#F1416C', 
          bgColor: '#FFF2F3',
          borderColor: '#FECACA'
        };
      case 'warning':
        return { 
          icon: <IconAlertCircle size={10} style={{ fontWeight: 'bold' }} />, 
          color: '#FFC700', 
          bgColor: '#FFFCEA',
          borderColor: '#FEF08A'
        };
      case 'info':
        return { 
          icon: <IconInfoCircle size={10} style={{ fontWeight: 'bold' }} />, 
          color: '#009EF7', 
          bgColor: '#F0F7FF',
          borderColor: '#BFDBFE'
        };
      default:
        return { 
          icon: <IconInfoCircle size={10} style={{ fontWeight: 'bold' }} />, 
          color: '#009EF7', 
          bgColor: '#F0F7FF',
          borderColor: '#BFDBFE'
        };
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
        transition: 'opacity 0.15s ease-in-out',
        minWidth: '350px',
        maxWidth: '500px',
        backgroundColor: getStyles().bgColor,
        borderColor: getStyles().borderColor,
        borderWidth: '2px',
        borderStyle: 'solid'
      }}
    >
      <div className="toast-header" style={{ 
        padding: '16px', 
        backgroundColor: getStyles().bgColor,
        borderBottom: 'none'
      }}>
        {/* Icon based on toast type with light background */}
        <div 
          className="me-3"
          style={{ 
            color: getStyles().color,
            backgroundColor: getStyles().bgColor,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            padding: '4px'
          }}
        >
          {getStyles().icon}
        </div>
        {/* Title with fs-4 equivalent font size */}
        <strong 
          className="me-auto" 
          style={{ 
            fontSize: '1.1rem', // fs-4 equivalent
            fontWeight: '600'
          }}
        >
          {getDefaultTitle()}
        </strong>
        {/* Timestamp with fs-6 equivalent */}
        <small 
          className="toast-time" 
          style={{ 
            fontSize: '0.875rem' // fs-6 equivalent
          }}
        >
          {getTimeText()}
        </small>
        {/* Close button with fs-5 equivalent */}
        <button 
          type="button" 
          className="btn-close" 
          onClick={handleClose} 
          aria-label="Close"
          style={{ 
            fontSize: '1rem', // fs-5 equivalent
            fontWeight: 'normal', 
            opacity: 0.5,
            marginLeft: '8px'
          }}
        >
          ×
        </button>
      </div>
      <div 
        className="toast-body" 
        style={{ 
          fontSize: '1rem', // fs-5 equivalent
          padding: '16px'
        }}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
