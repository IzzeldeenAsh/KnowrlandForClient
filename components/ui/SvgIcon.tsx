import React, { useEffect, useState } from 'react';

interface SvgIconProps {
  src: string;
  className?: string;
  color?: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({ src, className = '', color }) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(src);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    };

    fetchSvg();
  }, [src]);

  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};
