'use client'
import Link from "next/link";
import Logo from "../../public/images/KNOLDG-LOGO-26.png";
import Image from "next/image";
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation';

export default function Footer({ border = false }: { border?: boolean }) {
  const t = useTranslations('Footer')
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  
  return (
    <footer style={{backgroundColor:"#F9FAFB"}}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6" >
        {/* Top area: Blocks */}
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${border ? "border-t [border-image:linear-gradient(to_right,transparent,theme(colors.slate.200),transparent)1]" : ""}`}
        >
          {/* 1st block */}
          <div className="space-y-2 sm:col-span-12 lg:col-span-4">
          <Link href={`/${currentLocale}/home`}>
            <Image src={Logo} alt="Logo" width={120} height={60} priority  />
          </Link>
            <div className="text-sm text-gray-600">
              &copy; Knoldg.com - All rights reserved.
            </div>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm font-medium mb-2">{t('knowledge.title')}</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href="#0">{t('knowledge.insights')}</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href="#0">{t('knowledge.reports')}</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href="#0">{t('knowledge.data')}</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href="#0">{t('knowledge.manual')}</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href="#0">{t('knowledge.courses')}</a>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm font-medium mb-2">{t('company.title')}</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href="#0">{t('company.about')}</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href="#0">{t('company.blog')}</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href="#0">{t('company.contact')}</a>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm font-medium mb-2">{t('resources.title')}</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href="#0">{t('resources.terms')}</a>
              </li>
            </ul>
          </div>

          {/* 5th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm font-medium mb-2">{t('legals.title')}</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href="#0">{t('legals.terms')}</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href="#0">{t('legals.privacy')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

 
    </footer>
  );
}
