import React from 'react';

interface InsightIconProps {
  width?: number;
  height?: number;
}

export default function InsightIcon({ width = 50, height = 50 }: InsightIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.7292 4.16669H16.2708C8.68749 4.16669 4.16666 8.68752 4.16666 16.2709V33.7084C4.16666 41.3125 8.68749 45.8334 16.2708 45.8334H33.7083C41.2917 45.8334 45.8125 41.3125 45.8125 33.7292V16.2709C45.8333 8.68752 41.3125 4.16669 33.7292 4.16669Z"
        fill="url(#paint0_linear_125_119)"
      />
      <path
        d="M26.2283 18.4529V33.6341C26.2283 34.7935 25.2862 35.7355 24.1268 35.7355C22.9493 35.7355 22.0073 34.7935 22.0073 33.6341V18.4529C22.0073 17.2935 22.9493 16.3514 24.1268 16.3514C25.2862 16.3514 26.2283 17.2935 26.2283 18.4529Z"
        fill="white"
      />
      <path
        d="M34 15.451V33.1577C34 34.51 33.0297 35.6087 31.8354 35.6087C30.6225 35.6087 29.6522 34.51 29.6522 33.1577V15.451C29.6522 14.0987 30.6225 13 31.8354 13C33.0297 13 34 14.0987 34 15.451Z"
        fill="white"
      />
      <path
        d="M18.221 27.7283V33.6341C18.221 34.7935 17.279 35.7355 16.1014 35.7355C14.942 35.7355 14 34.7935 14 33.6341V27.7283C14 26.5689 14.942 25.6268 16.1014 25.6268C17.279 25.6268 18.221 26.5689 18.221 27.7283Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_125_119"
          x1="24.9896"
          y1="4.16669"
          x2="24.9896"
          y2="45.8334"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#066FE8" />
          <stop offset="1" stopColor="#027DF8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
