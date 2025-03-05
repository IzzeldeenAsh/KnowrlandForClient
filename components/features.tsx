"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Illustration from "@/public/images/glow-top.svg";
import ChangelogImg01 from "@/public/images/changelog-02.png";
export default function Features() {
  const t = useTranslations("Features");
  const t2 = useTranslations("Features2");
  const t3 = useTranslations("Features3");
  const [tab, setTab] = useState<number>(1);

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
        <div className="pt-16 pb-12 md:pt-40 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-center justify-center">
              {/* Content */}
              <div
                className="flex-1 order-1 md:order-none max-md:text-center"
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
                    className={`flex items-start justify-start rtl:text-start ltr:text-end text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                    <svg
                      className="shrink-0 fill-slate-300 mx-3 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm0 14V2H2v12h12Zm-3-7H5a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span>{t("tabs.preciseResults.title")}</span>
                  </button>
                  <button
                    className={`flex items-start justify-start rtl:text-start ltr:text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                    <svg
                      className="shrink-0 fill-slate-300 mx-3 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M2 6H0V2a2 2 0 0 1 2-2h4v2H2v4ZM16 6h-2V2h-4V0h4a2 2 0 0 1 2 2v4ZM14 16h-4v-2h4v-4h2v4a2 2 0 0 1-2 2ZM6 16H2a2 2 0 0 1-2-2v-4h2v4h4v2Z" />
                    </svg>
                    <span>{t("tabs.variableData.title")}</span>
                  </button>
                  <button
                    className={`flex items-start justify-start rtl:text-start ltr:text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                    <svg
                      className="shrink-0 fill-slate-300 mx-3 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8ZM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1Z" />
                    </svg>
                    <span>{t("tabs.fasterDecisions.title")}</span>
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="" data-aos="fade-up" data-aos-delay="100">
                <figure className="bg-gradient-to-b from-slate-300/20 to-transparent rounded-3xl p-px mb-8">
                  <Image
                    className="w-full rounded-[inherit]"
                    src={ChangelogImg01}
                    width={574}
                    height={326}
                    alt="Feature 1"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>

        {/* Second */}
        <div className="pt-16 pb-12 md:pt-25 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-center justify-between">
              {/* Image */}
              <div className="" data-aos="fade-up" data-aos-delay="100">
                <figure className="bg-gradient-to-b from-slate-300/20 to-transparent rounded-3xl p-px mb-8">
                  <Image
                    className="w-full rounded-[inherit]"
                    src={ChangelogImg01}
                    width={574}
                    height={326}
                    alt="Feature 2"
                  />
                </figure>
              </div>

              {/* Content */}
              <div
                className="flex-1 order-1 md:order-none max-md:text-center"
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
                    className={`flex items-start justify-start text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                    <svg
                      className="shrink-0 fill-slate-300 mx-3 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm0 14V2H2v12h12Zm-3-7H5a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span>{t2("tabs.directExpertEngagement.title")}</span>
                  </button>
                  <button
                    className={`flex items-start justify-start rtl:text-start ltr:text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                    <svg
                      className="shrink-0 fill-slate-300 mx-3 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M2 6H0V2a2 2 0 0 1 2-2h4v2H2v4ZM16 6h-2V2h-4V0h4a2 2 0 0 1 2 2v4ZM14 16h-4v-2h4v-4h2v4a2 2 0 0 1-2 2ZM6 16H2a2 2 0 0 1-2-2v-4h2v4h4v2Z" />
                    </svg>
                    <span>{t2("tabs.consultingSessions.title")}</span>
                  </button>
                  <button
                    className={`flex items-start justify-start text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                    <svg
                      className="shrink-0 fill-slate-300 mx-3 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8ZM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1Z" />
                    </svg>
                    <span>{t2("tabs.expertRatings.title")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third */}
        <div className="pt-16 pb-12 md:pt-25 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-center justify-center">
              {/* Content */}
              <div
                className="flex-1 order-1 md:order-none max-md:text-center"
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
                    className={`flex items-start justify-start rtl:text-start ltr:text-end text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                    <svg
                      className="shrink-0 fill-slate-300 mx-3 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm0 14V2H2v12h12Zm-3-7H5a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span>{t3("tabs.no-monthly-subscription.title")}</span>
                  </button>
                  <button
                    className={`flex items-start justify-start rtl:text-start ltr:text-end text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                    <svg
                      className="shrink-0 fill-slate-300 mx-3 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm0 14V2H2v12h12Zm-3-7H5a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span>{t3("tabs.payAsYouGo.title")}</span>
                  </button>
                  <button
                    className={`flex items-start justify-start rtl:text-start ltr:text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 opacity-70`}
                  >
                    <svg
                      className="shrink-0 fill-slate-300 mx-3 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M2 6H0V2a2 2 0 0 1 2-2h4v2H2v4ZM16 6h-2V2h-4V0h4a2 2 0 0 1 2 2v4ZM14 16h-4v-2h4v-4h2v4a2 2 0 0 1-2 2ZM6 16H2a2 2 0 0 1-2-2v-4h2v4h4v2Z" />
                    </svg>
                    <span>{t3("tabs.purchaseSpecific.title")}</span>
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="" data-aos="fade-up" data-aos-delay="100">
                <figure className="bg-gradient-to-b from-slate-300/20 to-transparent rounded-3xl p-px mb-8">
                  <Image
                    className="w-full rounded-[inherit]"
                    src={ChangelogImg01}
                    width={574}
                    height={326}
                    alt="Feature 3"
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
