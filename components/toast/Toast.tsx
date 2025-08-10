'use client';

import React, { useState, useEffect, useRef } from 'react';
import { IconCheck, IconX, IconInfoCircle, IconAlertTriangle } from '@tabler/icons-react';

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

  // Get icon and colors based on type - matching PrimeNG design
  const getStyles = () => {
    switch(type) {
      case 'success':
        return { 
          icon: <IconCheck size={20} />, 
          iconColor: '#22c55e',
          borderColor: '#22c55e',
          backgroundColor: '#dcfce7',
          textColor: '#15803d'
        };
      case 'error':
        return { 
          icon: <IconX size={20} />, 
          iconColor: '#ef4444',
          borderColor: '#ef4444',
          backgroundColor: '#fee2e2',
          textColor: '#dc2626'
        };
      case 'warning':
        return { 
          icon: <IconAlertTriangle size={20} />, 
          iconColor: '#f59e0b',
          borderColor: '#f59e0b',
          backgroundColor: '#fef3c7',
          textColor: '#d97706'
        };
      case 'info':
        return { 
          icon: <IconInfoCircle size={20} />, 
          iconColor: '#3b82f6',
          borderColor: '#3b82f6',
          backgroundColor: '#dbeafe',
          textColor: '#2563eb'
        };
      default:
        return { 
          icon: <IconInfoCircle size={20} />, 
          iconColor: '#3b82f6',
          borderColor: '#3b82f6',
          backgroundColor: '#dbeafe',
          textColor: '#2563eb'
        };
    }
  };

  // Get title based on type if not provided
  const getDefaultTitle = () => {
    if (title && title !== '') return title;
    
    switch(type) {
      case 'success':
        return 'test';
      case 'error':
        return 'test';
      case 'warning':
        return 'test';
      case 'info':
        return 'test';
      default:
        return 'test';
    }
  };

  // Get message based on type
  const getTypeMessage = () => {
    switch(type) {
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return message;
    }
  };

  const handleClose = () => {
    setShow(false);
    if (onClose) {
      setTimeout(() => onClose(), 150); // Call onClose after fade out
    }
  };

  const styles = getStyles();

  return (
    <div 
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'all 0.3s ease-in-out',
        minWidth: '300px',
        maxWidth: '400px',
        backgroundColor: styles.backgroundColor,
        border: 'none',
        borderRadius: '6px',
        borderLeft: `4px solid ${styles.borderColor}`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        alignItems: 'flex-start',
        padding: '16px',
        gap: '12px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Icon */}
      <div style={{ 
        color: styles.iconColor,
        flexShrink: 0,
        marginTop: '2px'
      }}>
        {styles.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Title */}
        <div style={{ 
          fontSize: '14px',
          fontWeight: '600',
          color: styles.textColor,
          marginBottom: '4px',
          lineHeight: '1.2'
        }}>
          {getDefaultTitle()}
        </div>
        
        {/* Message */}
        <div style={{ 
          fontSize: '14px',
          color: styles.textColor,
          lineHeight: '1.3',
          opacity: 0.9
        }}>
          {message || getTypeMessage()}
        </div>
      </div>

      {/* Close button */}
      <button 
        type="button" 
        onClick={handleClose} 
        aria-label="Close"
        style={{ 
          background: 'none',
          border: 'none',
          color: styles.textColor,
          cursor: 'pointer',
          fontSize: '18px',
          lineHeight: '1',
          opacity: 0.6,
          padding: '0',
          flexShrink: 0,
          marginTop: '2px',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
