import React from "react";

type Props = {
  size?: number;
  className?: string;
};

export default function XSocialIcon({ size = 48, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
        fill="#040709"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.2479 14H12L20.5935 25.42L12.5497 35H16.2662L22.35 27.7544L27.7521 34.9334H35L26.1568 23.1815L26.1725 23.2018L33.7866 14.1334H30.0701L24.4157 20.8677L19.2479 14ZM16.0007 16H18.2571L30.9993 32.9333H28.7429L16.0007 16Z"
        fill="white"
      />
    </svg>
  );
}


