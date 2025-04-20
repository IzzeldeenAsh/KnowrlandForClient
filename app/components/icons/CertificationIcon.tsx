import React from 'react';

interface CertificationIconProps {
  width?: number;
  height?: number;
}

const CertificationIcon: React.FC<CertificationIconProps> = ({ width = 24, height = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mx-auto text-gray-500"
    >
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
      <path d="M8.5 10.5 5 14" />
      <path d="M15.5 10.5 19 14" />
      <path d="M12 12v9" />
      <path d="M12 3v4" />
    </svg>
  );
};

export default CertificationIcon; 