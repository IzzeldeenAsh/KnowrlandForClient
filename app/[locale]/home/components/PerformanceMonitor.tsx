'use client'

import { useEffect, useRef, memo } from 'react';

interface PerformanceMonitorProps {
  componentName: string;
  enabled?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  componentName, 
  enabled = process.env.NODE_ENV === 'development' 
}) => {
  const renderTimeRef = useRef<number>(Date.now());
  const renderCountRef = useRef<number>(0);
  
  useEffect(() => {
    if (!enabled) return;
    
    renderCountRef.current += 1;
    const renderTime = Date.now() - renderTimeRef.current;
    
    // Only log if render takes longer than 16ms (60fps threshold)
    if (renderTime > 16) {
      console.warn(`[Performance] ${componentName} took ${renderTime}ms to render (render #${renderCountRef.current})`);
    }
    
    // Reset timer for next render
    renderTimeRef.current = Date.now();
  });
  
  useEffect(() => {
    if (!enabled) return;
    
    // Log component mount
    
    return () => {
      // Log component unmount
    };
  }, [componentName, enabled]);
  
  return null;
};

export default memo(PerformanceMonitor);

// Hook for measuring expensive operations
export function usePerformanceMeasure(operationName: string, enabled = process.env.NODE_ENV === 'development') {
  const startTime = useRef<number>(0);
  
  const start = () => {
    if (enabled) {
      startTime.current = Date.now();
    }
  };
  
  const end = () => {
    if (enabled && startTime.current > 0) {
      const duration = Date.now() - startTime.current;
      if (duration > 10) { // Only log operations longer than 10ms
        console.warn(`[Performance] ${operationName} took ${duration}ms`);
      }
      startTime.current = 0;
    }
  };
  
  return { start, end };
}