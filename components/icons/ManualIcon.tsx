import React from 'react';

interface ManualIconProps {
  width?: number;
  height?: number;
}

export default function ManualIcon({ width = 50, height = 50 }: ManualIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42.7083 14.5834V31.25H13.2292C9.95832 31.25 7.29166 33.9167 7.29166 37.1875V14.5834C7.29166 6.25002 9.37499 4.16669 17.7083 4.16669H32.2917C40.625 4.16669 42.7083 6.25002 42.7083 14.5834Z"
        fill="url(#paint0_linear_125_176)"
      />
      <path
        d="M42.7083 31.25V38.5417C42.7083 42.5625 39.4375 45.8333 35.4167 45.8333H14.5833C10.5625 45.8333 7.29166 42.5625 7.29166 38.5417V37.1875C7.29166 33.9167 9.95832 31.25 13.2292 31.25H42.7083Z"
        fill="#02347E"
      />
      <path
        d="M33.3333 16.1458H16.6667C15.8125 16.1458 15.1042 15.4375 15.1042 14.5833C15.1042 13.7291 15.8125 13.0208 16.6667 13.0208H33.3333C34.1875 13.0208 34.8958 13.7291 34.8958 14.5833C34.8958 15.4375 34.1875 16.1458 33.3333 16.1458Z"
        fill="white"
      />
      <path
        d="M27.0833 23.4375H16.6667C15.8125 23.4375 15.1042 22.7292 15.1042 21.875C15.1042 21.0208 15.8125 20.3125 16.6667 20.3125H27.0833C27.9375 20.3125 28.6458 21.0208 28.6458 21.875C28.6458 22.7292 27.9375 23.4375 27.0833 23.4375Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_125_176"
          x1="25"
          y1="4.16669"
          x2="25"
          y2="37.1875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#066FE8" />
          <stop offset="1" stopColor="#027DF8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
