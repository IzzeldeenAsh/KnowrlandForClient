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
export default function Features() {
  const t = useTranslations("Features");
  const t2 = useTranslations("Features2");
  const t3 = useTranslations("Features3");
  const [tab, setTab] = useState<number>(1);
  const locale = useLocale();
  const isRTL = locale === "ar";

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
                <figure className="bg-gradient-to-b from-slate-300/20 to-transparent rounded-3xl p-px mb-8">
                  <Image
                    className="w-full rounded-[inherit]"
                    src={ChangelogImg03}
                    width={500}
                    height={250}
                    alt="Feature 2"
                  />
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
                    className={`flex items-start ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
               
                    <span>{t2("tabs.directExpertEngagement.title")}</span>
                  </button>
                  <button
                    className={`flex items-start ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
            
                    <span>{t2("tabs.consultingSessions.title")}</span>
                  </button>
                  <button
                    className={`flex items-start ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
       
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
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col sm:flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-center justify-between">
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
                  >
               
                    <span>{t("tabs.preciseResults.title")}</span>
                  </button>
                  <button
                    className={`flex items-start ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                   
                    <span>{t("tabs.variableData.title")}</span>
                  </button>
                  <button
                    className={`flex items-start ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                    <span>{t("tabs.fasterDecisions.title")}</span>
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="w-full sm:w-4/5 md:w-1/2" data-aos="fade-up" data-aos-delay="100">
                <figure className="rounded-3xl p-px mb-8">
                  <Image
                    className="w-full rounded-[inherit]"
                    src={'https://res.cloudinary.com/dsiku9ipv/image/upload/v1744967310/Group_15_kqgqol.png'}
                    width={500}
                    height={250}
                    alt="Feature 1"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
        {/* Third */}
        <div className="pt-16 pb-12 sm:pt-20 md:pt-24 lg:pt-28 sm:pb-16 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col sm:flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-center justify-between">
            
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
                  >
               
                    <span>{t3("tabs.no-monthly-subscription.title")}</span>
                  </button>
                  <button
                    className={`flex items-start ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                 
                    <span>{t3("tabs.payAsYouGo.title")}</span>
                  </button>
                  <button
                    className={`flex items-start ${isRTL ? 'justify-end text-end' : 'justify-start text-start'} text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                   
                    <span>{t3("tabs.purchaseSpecific.title")}</span>
                  </button>
                </div>
              </div>
                 {/* Video */}
                 <div className="w-full sm:w-4/5 md:w-1/2 order-2" data-aos="fade-up" data-aos-delay="100">
                <figure className=" rounded-3xl p-px mb-8 overflow-hidden mt-10 max-w-[600px] mx-auto">
                  <video 
                    className="w-full rounded-[inherit]"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    src="/images/Pay-for-what-you-need.mp4"
                  />
                </figure>
              </div>
           
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
