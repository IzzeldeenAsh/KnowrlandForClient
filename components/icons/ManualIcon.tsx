import React from 'react';

interface ManualIconProps {
  width?: number;
  height?: number;
}

export default function ManualIcon({ width = 43, height = 43 }: ManualIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.5 9L36.7292 33.1458C36.7292 36.6037 33.9162 39.4167 30.4583 39.4167H12.5417C9.08375 39.4167 6.27083 36.6037 6.27083 33.1458V31.9813C6.27083 29.1683 5.68708 7 8.5 7L36.5 9Z"
        fill="url(#paint0_linear_120_127)"
      />
      <g filter="url(#filter0_bi_120_127)">
        <path
          d="M36.7291 12.5417C36.7291 20.4578 30.3119 26.875 22.3958 26.875H11.3771C8.56415 26.875 6.27081 29.1684 6.27081 31.9813V12.5417C6.27081 5.37504 8.06248 3.58337 15.2291 3.58337H27.7708C34.9375 3.58337 36.7291 5.37504 36.7291 12.5417Z"
          fill="#BCE4F1"
          fillOpacity="0.5"
        />
      </g>
      <path
        d="M28.6667 13.8854H14.3334C13.5988 13.8854 12.9896 13.2762 12.9896 12.5416C12.9896 11.807 13.5988 11.1979 14.3334 11.1979H28.6667C29.4013 11.1979 30.0105 11.807 30.0105 12.5416C30.0105 13.2762 29.4013 13.8854 28.6667 13.8854Z"
        fill="#F3F9FE"
      />
      <path
        d="M23.2917 20.1562H14.3334C13.5988 20.1562 12.9896 19.547 12.9896 18.8124C12.9896 18.0779 13.5988 17.4687 14.3334 17.4687H23.2917C24.0263 17.4687 24.6355 18.0779 24.6355 18.8124C24.6355 19.547 24.0263 20.1562 23.2917 20.1562Z"
        fill="#F3F9FE"
      />
      <defs>
        <filter
          id="filter0_bi_120_127"
          x="2.27081"
          y="-0.416626"
          width="38.4583"
          height="36.3979"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_120_127" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_120_127" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="0.2" dy="0.1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
          />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_120_127" />
        </filter>
        <linearGradient
          id="paint0_linear_120_127"
          x1="8.28899"
          y1="16.8898"
          x2="35.4643"
          y2="14.454"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B5CD6" />
          <stop offset="1" stopColor="#0085FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
