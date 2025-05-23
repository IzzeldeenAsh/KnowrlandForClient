interface FolderIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function FolderIcon({ width = 46, height = 34, className = '' }: FolderIconProps) {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 9.21687V27.6506C40 29.9036 38.2524 31.5422 36.3107 31.5422H3.68932C0 31.5422 0 32.5407 0 27.6506V3.89157C0 1.84337 1.5534 0 3.68932 0H16.1165L21.165 5.3253H36.1165C38.2524 5.3253 40 6.96386 40 9.21687Z" fill="url(#paint0_linear_28_4)"/>
      <g filter="url(#filter0_bi_28_4)">
        <path d="M39.6185 31.1325C38.8545 32.7711 36.7533 34 35.0341 34H1.98807C0.459934 34 -0.495154 32.1566 0.268916 30.7229L6.19046 19.6626C7.14555 18.2289 9.24674 16.7952 10.9659 16.7952H44.0119C45.5401 16.7952 46.4952 18.6385 45.7311 20.0723L39.6185 31.1325Z" fill="#BCE4F1" fillOpacity="0.5"/>
      </g>
      <defs>
        <filter id="filter0_bi_28_4" x="-4" y="12.7952" width="54" height="25.2048" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_28_4"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_28_4" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="0.2" dy="0.1"/>
          <feGaussianBlur stdDeviation="0.5"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"/>
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_28_4"/>
        </filter>
        <linearGradient id="paint0_linear_28_4" x1="2.71186" y1="9.64865" x2="38.1143" y2="5.38425" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B5CD6"/>
          <stop offset="1" stopColor="#0085FF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
