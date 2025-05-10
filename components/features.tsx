"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Illustration from "@/public/images/glow-top-blue.svg";
import ChangelogImg01 from "@/public/images/AI-Search.png";
import ChangelogImg02 from "@/public/images/changelog-01.png";
import ChangelogImg03 from "@/public/images/experts-meeting.png";
import ChangelogImg04 from "@/public/images/Budget.png";
import { useLocale } from "next-intl";
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/outline';

export default function Features() {
  const t = useTranslations("Features");
  const t2 = useTranslations("Features2");
  const t3 = useTranslations("Features3");
  const [tab, setTab] = useState<number>(1);
  const locale = useLocale();
  const isRTL = locale === "ar";
  
  // States to track which tab is being hovered for each section
  const [hoveredTab1, setHoveredTab1] = useState<number | null>(null);
  const [hoveredTab2, setHoveredTab2] = useState<number | null>(null);
  const [hoveredTab3, setHoveredTab3] = useState<number | null>(null);

  return (
    <section>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Illustration */}
        <div
          className="absolute inset-0 -z-10 -mx-28 rounded-t-[3rem] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10">
            <Image
              src={Illustration}
              className="max-w-none"
              width={1404}
              height={658}
              alt="Features Illustration"
            />
          </div>
        </div>
   {/* First */}
   <div className="pt-16 pb-12 sm:pt-20 md:pt-24 lg:pt-28 sm:pb-16 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col sm:flex-col md:flex-row-reverse space-y-8 space-y-reverse md:space-y-0 gap-8 items-center justify-between">
              {/* Image */}
              <div className="w-full sm:w-4/5 md:w-1/2" data-aos="fade-up" data-aos-delay="100">
                <figure className=" rounded-3xl p-px mb-8">
                  <div className="relative flex items-center justify-center" style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
                    <Image
                      className={`w-full h-full rounded-[inherit] transition-all duration-700 ease-in-out absolute ${hoveredTab1 === 1 || hoveredTab1 === null ? 'opacity-100' : 'opacity-0'}`}
                      src={'https://res.cloudinary.com/dsiku9ipv/image/upload/v1746878996/Group_13438_1_ydenox.png'}
                      width={500}
                      height={500}
                      alt="Feature 2 - Image 1"
                      style={{ objectFit: 'contain' }}
                    />
                    <Image
                      className={`w-full h-full rounded-[inherit] transition-all duration-700 ease-in-out absolute ${hoveredTab1 === 2 ? 'opacity-100' : 'opacity-0'}`}
                      src={'https://res.cloudinary.com/dsiku9ipv/image/upload/v1746879543/Group_13440_soctoz.webp'}
                      width={500}
                      height={500}
                      alt="Feature 2 - Image 2"
                      style={{ objectFit: 'contain' }}
                    />
                    <Image
                      className={`w-full h-full rounded-[inherit] transition-all duration-700 ease-in-out absolute ${hoveredTab1 === 3 ? 'opacity-100' : 'opacity-0'}`}
                      src={ChangelogImg04}
                      width={500}
                      height={500}
                      alt="Feature 2 - Image 3"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </figure>
              </div>

              {/* Content */}
              <div
                className="flex-1 order-1 max-md:text-center sm:max-w-xl md:max-w-lg"
                data-aos="fade-down"
              >
                {/* Content #1 */}
                <div>
                  <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">
                    {t2("tagline")}
                  </div>
                </div>
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  {t2("title")}
                </h3>
                <p className="text-lg text-slate-400 mb-8">
                  {t2("description")}
                </p>
                <div className="mt-8 max-w-md space-y-2">
                  <button
                    onMouseEnter={() => setHoveredTab1(1)}
                    onMouseLeave={() => setHoveredTab1(null)}
                    className={`flex items-top gap-2 ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                    <UserGroupIcon className="h-7 w-7 text-blue-300" />
                    <span>{t2("tabs.directExpertEngagement.title")}</span>
                  </button>

                  <button
                    onMouseEnter={() => setHoveredTab1(2)}
                    onMouseLeave={() => setHoveredTab1(null)}
                    className={`flex items-top gap-2 ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                    <CalendarIcon className="h-7 w-7 text-blue-300" />
                    <span>{t2("tabs.consultingSessions.title")}</span>
                  </button>

                  <button
                    onMouseEnter={() => setHoveredTab1(3)}
                    onMouseLeave={() => setHoveredTab1(null)}
                    className={`flex items-top gap-2 ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                    <StarIcon className="h-5 w-5 text-blue-300" />
                    <span>{t2("tabs.expertRatings.title")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

     

        {/* Second */}
   
        <div className="pt-16 pb-12 sm:pt-20 md:pt-28 lg:pt-32 sm:pb-16 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col sm:flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-start justify-between">
              {/* Content */}
              <div
                className="flex-1 order-1 max-md:text-center sm:max-w-xl md:max-w-lg"
                data-aos="fade-down"
              >
                {/* Content #1 */}
                <div>
                  <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">
                    {t("tagline")}
                  </div>
                </div>
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  {t("title")}
                </h3>
                <p className="text-lg text-slate-400 mb-8">
                  {t("description")}
                </p>
                <div className="mt-8 max-w-md space-y-2">
                  <button
                    className={`flex items-start ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                    onMouseEnter={() => setHoveredTab2(1)}
                    onMouseLeave={() => setHoveredTab2(null)}
                  >
               
                    <span>{t("tabs.preciseResults.title")}</span>
                  </button>
                  <button
                    className={`flex items-start ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                    onMouseEnter={() => setHoveredTab2(2)}
                    onMouseLeave={() => setHoveredTab2(null)}
                  >
                   
                    <span>{t("tabs.variableData.title")}</span>
                  </button>
                  <button
                    className={`flex items-start ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                    onMouseEnter={() => setHoveredTab2(3)}
                    onMouseLeave={() => setHoveredTab2(null)}
                  >
                    <span>{t("tabs.fasterDecisions.title")}</span>
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="w-full sm:w-4/5 md:w-1/2" data-aos="fade-up" data-aos-delay="100">
                <figure className="rounded-3xl p-px mb-8">
                <div className="relative flex items-center justify-center" style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
                    <Image
                      className={`w-full rounded-[inherit] transition-all duration-700 ease-in-out absolute inset-0 ${hoveredTab2 === 1 || hoveredTab2 === null ? 'opacity-100' : 'opacity-0'}`}
                      src={'https://res.cloudinary.com/dsiku9ipv/image/upload/v1744967310/Group_15_kqgqol.png'}
                      width={500}
                      height={500}
                      alt="Feature 1 - Image 1"
                      style={{ objectFit: 'cover' }}
                    />
                    {/* <Image
                      className={`w-full rounded-[inherit] transition-all duration-700 ease-in-out absolute inset-0 ${hoveredTab2 === 2 ? 'opacity-100' : 'opacity-0'}`}
                      src={ChangelogImg02}
                      width={500}
                      height={500}
                      alt="Feature 1 - Image 2"
                      style={{ objectFit: 'cover' }}
                    />
                    <Image
                      className={`w-full rounded-[inherit] transition-all duration-700 ease-in-out absolute inset-0 ${hoveredTab2 === 3 ? 'opacity-100' : 'opacity-0'}`}
                      src={ChangelogImg01}
                      width={500}
                      height={500}
                      alt="Feature 1 - Image 3"
                      style={{ objectFit: 'cover' }}
                    /> */}
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
        {/* Third */}
        <div className="pt-16 pb-12 sm:pt-20 md:pt-24 lg:pt-28 sm:pb-16 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col sm:flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-start justify-between">
            
                 {/* Content */}
              <div
                className="flex-1 order-1 md:order-2 max-md:text-center sm:max-w-xl md:max-w-lg"
                data-aos="fade-down"
              >
                {/* Content #1 */}
                <div>
                  <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">
                    {t3("tagline")}
                  </div>
                </div>
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  {t3("title")}
                </h3>
                <p className="text-lg text-slate-400 mb-8">
                  {t3("description")}
                </p>
                <div className="mt-8 max-w-md space-y-2">
                <button
                    className={`flex items-start ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                    onMouseEnter={() => setHoveredTab3(1)}
                    onMouseLeave={() => setHoveredTab3(null)}
                  >
               
                    <span>{t3("tabs.no-monthly-subscription.title")}</span>
                  </button>
                  <button
                    className={`flex items-start ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                    onMouseEnter={() => setHoveredTab3(2)}
                    onMouseLeave={() => setHoveredTab3(null)}
                  >
                 
                    <span>{t3("tabs.payAsYouGo.title")}</span>
                  </button>
                  <button
                    className={`flex items-start ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                    onMouseEnter={() => setHoveredTab3(3)}
                    onMouseLeave={() => setHoveredTab3(null)}
                  >
                   
                    <span>{t3("tabs.purchaseSpecific.title")}</span>
                  </button>
                </div>
              </div>
                 {/* Image */}
              <div className="w-full sm:w-4/5 md:w-1/2" data-aos="fade-up" data-aos-delay="100">
                <figure className="bg-gradient-to-b from-slate-300/20 to-transparent rounded-3xl p-px mb-8">
                <div className="relative flex items-center justify-center" style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
                    {/* <Image
                      className={`w-full rounded-[inherit] transition-all duration-700 ease-in-out absolute inset-0 ${hoveredTab3 === 1 || hoveredTab3 === null ? 'opacity-100' : 'opacity-0'}`}
                      src={ChangelogImg04}
                      width={500}
                      height={500}
                      alt="Feature 3 - Image 1"
                      style={{ objectFit: 'cover' }}
                    /> */}
                         {/* Video */}
                <figure className=" rounded-3xl p-px mb-8 overflow-hidden mt-10 max-w-[600px] mx-auto">
                  <video 
                    className={`w-full rounded-[inherit] transition-all duration-700 ease-in-out absolute inset-0 ${hoveredTab3 === 1 || hoveredTab3 === null ? 'opacity-100' : 'opacity-0'}`}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    src="/images/Pay-for-what-you-need.mp4"
                  />
                </figure>

                    {/* <Image
                      className={`w-full rounded-[inherit] transition-all duration-700 ease-in-out absolute inset-0 ${hoveredTab3 === 2 ? 'opacity-100' : 'opacity-0'}`}
                      src={ChangelogImg03}
                      width={500}
                      height={500}
                      alt="Feature 3 - Image 2"
                      style={{ objectFit: 'cover' }}
                    />
                    <Image
                      className={`w-full rounded-[inherit] transition-all duration-700 ease-in-out absolute inset-0 ${hoveredTab3 === 3 ? 'opacity-100' : 'opacity-0'}`}
                      src={ChangelogImg02}
                      width={500}
                      height={500}
                      alt="Feature 3 - Image 3"
                      style={{ objectFit: 'cover' }}
                    /> */}
                  </div>
                </figure>
              </div>
           
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
            