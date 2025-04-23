'use client'

import Link from 'next/link'
import Image from 'next/image'
import HomeLogoImgEn from '@/public/images/Business-white.png'
import HomeLogoImgAr from '@/public/images/KNOLDG- LOGO-29-29.png'
import InnerLogoImgEn from '@/public/images/Business-colored.png'
import InnerLogoImgAr from '@/public/images/KNOLDG-LOGO-12.png'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface LogoProps {
  isHomePage?: boolean;
}

export default function Logo({ isHomePage = true }: LogoProps) {
  const [logoImg, setLogoImg] = useState(HomeLogoImgAr) // Default to Arabic home logo
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

  return (
    <Link className="inline-flex" href={`/${locale}`} aria-label="Knoldg">
      <Image className="max-w-none" src={logoImg} width={120} height={60} priority alt="Knoldg" />
    </Link>
  )
}