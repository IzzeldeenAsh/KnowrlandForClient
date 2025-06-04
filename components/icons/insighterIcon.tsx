interface InsighterIconProps {
    width?: number;
    height?: number;
    className?: string;
  }
  
  export default function InsighterIcon({ width = 38, height = 44, className }: InsighterIconProps) {
    return (
      <svg className={className} width={width} height={height} viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="14" height="13.6889" rx="6.84444" fill="url(#paint0_linear_194_71)"/>
        <foreignObject x="0.699976" y="8.52444" width="12.6" height="8.27556">
          <div style={{ backdropFilter: 'blur(0.7px)', clipPath: 'url(#bgblur_0_194_71_clip_path)', height: '100%', width: '100%' }}></div>
        </foreignObject><g filter="url(#filter0_i_194_71)" data-figma-bg-blur-radius="1.4">
        <path d="M11.9 13.2098V14.244C11.9 14.9133 11.41 15.4 10.8655 15.4H3.13442C2.53553 15.4 2.09998 14.8524 2.09998 14.244V13.2098C2.09998 11.3846 3.40664 9.92444 5.03998 9.92444H5.42109C5.91109 10.1678 6.45553 10.2895 6.99998 10.2895C7.54442 10.2895 8.08886 10.1678 8.57886 9.92444H8.95998C10.5933 9.92444 11.9 11.3846 11.9 13.2098Z" fill="#BCE4F1" fillOpacity="0.5"/>
        </g>
        <path d="M7.00005 8.89777C8.35315 8.89777 9.45005 7.82524 9.45005 6.50221C9.45005 5.17919 8.35315 4.10666 7.00005 4.10666C5.64695 4.10666 4.55005 5.17919 4.55005 6.50221C4.55005 7.82524 5.64695 8.89777 7.00005 8.89777Z" fill="white"/>
        <defs>
        <filter id="filter0_i_194_71" x="0.699976" y="8.52444" width="12.6" height="8.27556" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="0.07" dy="0.035"/>
        <feGaussianBlur stdDeviation="0.175"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_194_71"/>
        </filter>
        <clipPath id="bgblur_0_194_71_clip_path" transform="translate(-0.699976 -8.52444)"><path d="M11.9 13.2098V14.244C11.9 14.9133 11.41 15.4 10.8655 15.4H3.13442C2.53553 15.4 2.09998 14.8524 2.09998 14.244V13.2098C2.09998 11.3846 3.40664 9.92444 5.03998 9.92444H5.42109C5.91109 10.1678 6.45553 10.2895 6.99998 10.2895C7.54442 10.2895 8.08886 10.1678 8.57886 9.92444H8.95998C10.5933 9.92444 11.9 11.3846 11.9 13.2098Z"/></clipPath>
        <linearGradient id="paint0_linear_194_71" x1="0.949153" y1="4.17627" x2="13.4016" y2="2.96337" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0B5CD6"/>
        <stop offset="1" stopColor="#0085FF"/>
        </linearGradient>
        </defs>
      </svg>
    );
  }
