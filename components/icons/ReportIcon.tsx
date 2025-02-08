import React from 'react';

interface ReportIconProps {
  width?: number;
  height?: number;
}

export default function ReportIcon({ width = 48, height = 46 }: ReportIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.7901 15.1742L34.2751 22.4307C37.2942 28.6903 36.5872 32.7746 31.6783 36.0059C30.9011 36.5356 30.0067 37.0392 28.9951 37.5169L26.0714 38.9087C18.8177 42.3673 14.5111 40.8763 11.0262 33.6197L7.52939 26.3486C6.82177 24.8721 6.30193 23.5092 6.02259 22.2656C4.88498 17.3557 7.02648 14.0661 12.8329 11.2916L15.7303 9.897C23.0014 6.40024 27.3051 7.91762 30.7901 15.1742Z"
        fill="url(#paint0_linear_119_64)"
      />
      <g filter="url(#filter0_bi_119_64)">
        <path
          d="M43.1839 19.575L41.3464 27.4125C39.7714 34.1813 36.6589 36.9188 30.8089 36.3563C29.8714 36.2813 28.8589 36.1125 27.7714 35.85L24.6214 35.1C16.8027 33.2438 14.3839 29.3813 16.2214 21.5438L18.0589 13.6875C18.4339 12.0938 18.8839 10.7063 19.4464 9.56252C21.6402 5.02501 25.3714 3.80627 31.6339 5.28752L34.7652 6.01877C42.6214 7.85627 45.0214 11.7375 43.1839 19.575Z"
          fill="#BCE4F1"
          fillOpacity="0.5"
        />
      </g>
      <path
        d="M35.3652 19.7063C35.2527 19.7063 35.1402 19.6875 35.0089 19.6688L25.9152 17.3625C25.1652 17.175 24.7152 16.4063 24.9027 15.6563C25.0902 14.9063 25.8589 14.4563 26.6089 14.6438L35.7027 16.95C36.4527 17.1375 36.9027 17.9063 36.7152 18.6563C36.5652 19.275 35.9839 19.7063 35.3652 19.7063Z"
        fill="white"
      />
      <path
        d="M29.8714 26.0437C29.7589 26.0437 29.6464 26.025 29.5152 26.0062L24.0589 24.6187C23.3089 24.4312 22.8589 23.6625 23.0464 22.9125C23.2339 22.1625 24.0027 21.7125 24.7527 21.9L30.2089 23.2875C30.9589 23.475 31.4089 24.2437 31.2214 24.9937C31.0714 25.6312 30.5089 26.0437 29.8714 26.0437Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_bi_119_64"
          x="11.6375"
          y="0.690247"
          width="36.1321"
          height="39.7375"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_119_64" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_119_64" result="shape" />
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
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_119_64" />
        </filter>
        <linearGradient
          id="paint0_linear_119_64"
          x1="7.55884"
          y1="27.2048"
          x2="25.7644"
          y2="9.82365"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B5CD6" />
          <stop offset="1" stopColor="#0085FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
