"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Illustration from "@/public/images/glow-top-blue.svg";

export default function InsighterFeatures() {
  const t = useTranslations("InsighterFeatures");

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
        <div className="pt-32  relative" >
          {/* Hero content */}
          <div className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
            <Image src={Illustration} className="max-w-none" width={2146} priority alt="Hero Illustration" />
          </div>
        </div>
          <div className="max-w-3xl mx-auto text-center" >
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-5 leading-[1.2]" data-aos="fade-down">{t('title')}</h2>
            <p className="text-xl text-slate-300 mb-8" data-aos="fade-down" data-aos-delay="200">
              {t('description')}
            </p>
          </div>
        </div>
        {/* First Section */}
        <div className=" pb-12 md:pt-40 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-center justify-between">
              {/* Content */}
              <div
                className="flex-1 order-1 md:order-none max-md:text-center max-w-lg"
                data-aos="fade-down"
              >
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  {t("section1.title")}
                </h3>
                <p className="text-lg text-slate-400 mb-8">
                  {t("section1.description")}
                </p>
              </div>

              {/* Image */}
              <div className="" data-aos="fade-up" data-aos-delay="100">
                <figure className="bg-gradient-to-b from-slate-300/20 to-transparent rounded-3xl p-px mb-8">
                  {/* Image placeholder */}
                </figure>
              </div>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="pt-16 pb-12 md:pt-25 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-center justify-between">
              {/* Image */}
              <div className="" data-aos="fade-up" data-aos-delay="100">
                <figure className="bg-gradient-to-b from-slate-300/20 to-transparent rounded-3xl p-px mb-8">
                  {/* Image placeholder */}
                </figure>
              </div>

              {/* Content */}
              <div
                className="flex-1 order-1 md:order-none max-md:text-center max-w-lg"
                data-aos="fade-down"
              >
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  {t("section2.title")}
                </h3>
                <p className="text-lg text-slate-400 mb-8">
                  {t("section2.description")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Third Section */}
        <div className="pt-16 pb-12 md:pt-25 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-center justify-between">
              {/* Content */}
              <div
                className="flex-1 order-1 md:order-none max-md:text-center max-w-lg"
                data-aos="fade-down"
              >
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  {t("section3.title")}
                </h3>
                <p className="text-lg text-slate-400 mb-8">
                  {t("section3.description")}
                </p>
              </div>

              {/* Image */}
              <div className="" data-aos="fade-up" data-aos-delay="100">
                <figure className="bg-gradient-to-b from-slate-300/20 to-transparent rounded-3xl p-px mb-8">
                  {/* Image placeholder */}
                </figure>
              </div>
            </div>
          </div>
        </div>

        {/* Fourth Section */}
        <div className="pt-16 pb-12 md:pt-25 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-center justify-between">
              {/* Image */}
              <div className="" data-aos="fade-up" data-aos-delay="100">
                <figure className="rounded-3xl p-px mb-8 overflow-hidden mt-10 max-w-[600px] mx-auto">
                  {/* Video placeholder */}
                </figure>
              </div>

              {/* Content */}
              <div
                className="flex-1 order-1 md:order-none max-md:text-center max-w-lg"
                data-aos="fade-down"
              >
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  {t("section4.title")}
                </h3>
                <p className="text-lg text-slate-400 mb-8">
                  {t("section4.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
