interface KnowledgeIconProps {
    width?: number;
    height?: number;
    className?: string;
  }
  
  export default function KnowledgeIcon({ width = 38, height = 44, className }: KnowledgeIconProps) {
    return (
      <svg className={className} width={width} height={height} viewBox="0 0 38 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="38" y="3.9111" width="40.0889" height="38" rx="5" transform="rotate(90 38 3.9111)" fill="url(#paint0_linear_28_51)"/>
        <rect x="5.95911" y="28" width="16.8841" height="3" rx="1.5" fill="white"/>
        <rect x="5.95911" y="34" width="8.93864" height="3" rx="1.5" fill="white"/>
        <g filter="url(#filter0_bi_28_51)">
          <path d="M16.5641 2C16.5641 0.895431 17.4596 0 18.5641 0H30.1539C31.2585 0 32.1539 0.895431 32.1539 2V18.323C32.1539 20.0009 30.2124 20.933 28.9032 19.8837L25.6098 17.2443C24.8788 16.6585 23.8392 16.6585 23.1083 17.2443L19.8149 19.8837C18.5056 20.933 16.5641 20.0009 16.5641 18.323V2Z" fill="#BCE4F1" fillOpacity="0.5"/>
        </g>
        <defs>
          <filter id="filter0_bi_28_51" x="12.5641" y="-4" width="23.5897" height="28.3268" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_28_51"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_28_51" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dx="0.2" dy="0.1"/>
            <feGaussianBlur stdDeviation="0.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"/>
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_28_51"/>
          </filter>
          <linearGradient id="paint0_linear_28_51" x1="40.7179" y1="15.5043" x2="76.354" y2="11.9238" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0B5CD6"/>
            <stop offset="1" stopColor="#0085FF"/>
          </linearGradient>
        </defs>
      </svg>
    );
  }
