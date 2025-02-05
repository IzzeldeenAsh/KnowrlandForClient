interface IndustryIconProps {
  width?: number;
  height?: number;
}

export default function IndustryIcon({ width = 22, height = 22 }: IndustryIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10.0571" cy="11.9428" r="10.0571" fill="url(#paint0_linear_103_2)"/>
      <g filter="url(#filter0_bi_103_2)">
        <path d="M21.1382 12.5714H12.0572C10.9526 12.5714 10.0572 11.676 10.0572 10.5714V0.907217C10.0572 0.388807 10.4266 0 10.919 0C16.8289 0.388807 21.6307 5.4433 22 11.6642C22 12.1826 21.6307 12.5714 21.1382 12.5714Z" fill="#BCE4F1" fillOpacity="0.5"/>
      </g>
      <defs>
        <filter id="filter0_bi_103_2" x="6.05719" y="-4" width="19.9429" height="20.5714" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_103_2"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_103_2" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="0.2" dy="0.1"/>
          <feGaussianBlur stdDeviation="0.5"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"/>
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_103_2"/>
        </filter>
        <linearGradient id="paint0_linear_103_2" x1="1.36368" y1="8.02218" x2="19.262" y2="6.31758" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B5CD6"/>
          <stop offset="1" stopColor="#0085FF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
