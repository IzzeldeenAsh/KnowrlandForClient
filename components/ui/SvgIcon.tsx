import React, { useEffect, useState } from 'react';

interface SvgIconProps {
  src: string;
  className?: string;
  color?: string;
}

const svgCache = new Map<string, string>();
const pendingFetches = new Map<string, Promise<string>>();

export const SvgIcon: React.FC<SvgIconProps> = ({ src, className = '', color }) => {
  const [svgContent, setSvgContent] = useState<string>(() => svgCache.get(src) ?? '');

  useEffect(() => {
    if (svgCache.has(src)) {
      setSvgContent(svgCache.get(src)!);
      return;
    }

    let cancelled = false;

    const fetchSvg = async () => {
      try {
        if (!pendingFetches.has(src)) {
          pendingFetches.set(src, fetch(src).then(r => r.text()));
        }
        const svgText = await pendingFetches.get(src)!;
        svgCache.set(src, svgText);
        pendingFetches.delete(src);
        if (!cancelled) setSvgContent(svgText);
      } catch (error) {
        pendingFetches.delete(src);
        console.error('Error loading SVG:', error);
      }
    };

    fetchSvg();
    return () => { cancelled = true; };
  }, [src]);

  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};
