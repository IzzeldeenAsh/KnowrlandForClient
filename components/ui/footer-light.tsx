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
    <footer style={{backgroundColor:"#edf6ff"}} className="mt-10">
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
              &copy; Insightabusiness.com - All rights reserved.
            </div>
            <br/>
            v1.1.1
            {/* Social links */}
            <div className="mt-4 pt-20">
              <ul className="flex space-x-4">
                {/* LinkedIn */}
                <li>
                  <a className="flex justify-center items-center text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out" href="https://www.linkedin.com/company/knoldg" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm font-medium mb-2">{t('knowledge.title')}</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href={`/${currentLocale}/industries/insight`}>{t('knowledge.insights')}</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href={`/${currentLocale}/industries/report`}>{t('knowledge.reports')}</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href={`/${currentLocale}/industries/data`}>{t('knowledge.data')}</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href={`/${currentLocale}/industries/manual`}>{t('knowledge.manual')}</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href={`/${currentLocale}/industries/course`}>{t('knowledge.courses')}</a>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm font-medium mb-2">{t('company.title')}</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href={`/${currentLocale}/about`}>{t('company.about')}</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href={`/${currentLocale}/blog`}>{t('company.blog')}</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href={`/${currentLocale}/contact`}>{t('company.contact')}</a>
              </li>
            </ul>
          </div>

      

          {/* 5th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm font-medium mb-2">{t('legals.title')}</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href={`/${currentLocale}/legals/terms`}>{t('legals.terms')}</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out" href={`/${currentLocale}/legals/privacy`}>{t('legals.privacy')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

 
    </footer>
  );
}
