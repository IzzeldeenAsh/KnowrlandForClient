'use client'

import Link from 'next/link'
import Image from 'next/image'
import HomeLogoImgEn from '@/public/images/Business-white.png'
import HomeLogoImgAr from '@/public/images/ANSIGHTAAr-.png'
import InnerLogoImgEn from '@/public/images/Business-colored.png'
import InnerLogoImgAr from '@/public/images/ANSIGHTAAr-05.png'
import SmallLogo from '@/public/images/smallLogo.png'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface LogoProps {
  isHomePage?: boolean;
}

export default function Logo({ isHomePage = true }: LogoProps) {
  const [logoImg, setLogoImg] = useState(HomeLogoImgAr) // Default to Arabic home logo
  const [smallLogoImg, setSmallLogoImg] = useState(SmallLogo) // Small logo for mobile
  const [locale, setLocale] = useState('ar') // Default to Arabic locale
  const pathname = usePathname()

  useEffect(() => {
    // Detect locale from pathname
    const currentLocale = pathname.split('/')[1] === 'en' ? 'en' : 'ar'
    setLocale(currentLocale)
    
    if (isHomePage) {
      // Use home page logos
      setLogoImg(currentLocale === 'en' ? HomeLogoImgEn : HomeLogoImgAr)
    } else {
      // Use inner page logos
      setLogoImg(currentLocale === 'en' ? InnerLogoImgEn : InnerLogoImgAr)
    }
  }, [pathname, isHomePage])

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Use the same navigation approach as in header.tsx for consistency
    window.location.href = `/${locale}`
  }

  return (
    <Link className="inline-flex" href={`/${locale}`} aria-label="Insighta" onClick={handleLogoClick}>
      {/* Use small logo for mobile devices, regular logo for larger screens */}
      <Image className="hidden md:block max-w-none" src={logoImg} width={120} height={60} priority alt="Insighta" style={{ height: "auto" }} />
      <Image className="block md:hidden max-w-none" src={smallLogoImg} width={40} height={40} priority alt="Insighta" style={{ height: "auto" }} />
    </Link>
  )
}