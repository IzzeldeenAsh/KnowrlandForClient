'use client'

import Link from 'next/link'
import Image from 'next/image'
import LogoImgEn from '@/public/images/KNOLDG- LOGO-28.png'
import LogoImgAr from '@/public/images/KNOLDG- LOGO-29-29.png'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Logo() {
  const [logoImg, setLogoImg] = useState(LogoImgAr) // Default to Arabic
  const pathname = usePathname()

  useEffect(() => {
    // Detect locale from pathname
    const locale = pathname.split('/')[1] === 'en' ? 'en' : 'ar'
    setLogoImg(locale === 'en' ? LogoImgEn : LogoImgAr)
  }, [pathname])

  return (
    <Link className="inline-flex" href="/" aria-label="Knoldg">
      <Image className="max-w-none" src={logoImg} width={120} height={60} priority alt="Knoldg" />
    </Link>
  )
}