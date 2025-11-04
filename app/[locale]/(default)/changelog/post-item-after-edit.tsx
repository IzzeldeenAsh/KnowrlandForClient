'use client';

import Image from "next/image";
import Illustration from "@/public/images/glow-top-blue.svg";
import { useTranslations } from "next-intl";

export default function PostItem() {
  const t = useTranslations();
  
  return (
    <section className="relative md:pt-52 md:pb-20">
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
      <article className="pt-12 pb-20 first-of-type:pt-0 group ">
        <div className="md:flex">
          <div className="w-20 shrink-0">
            <time className="text-sm inline-flex items-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 md:leading-8 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500 before:ring-4 before:ring-blue-500/30 mb-3"></time>
          </div>

          <div
            className="md:w-7/12 lg:w-1/2 order-1 md:order-none max-md:text-center"
            data-aos="fade-down"
          >
            <div className="grow ml-8 md:ml-0 pb-12 group-last-of-type:pb-0 ">
              <header>
                <div>
                <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">
                    {t("Features.tagline")}
                  </div>
                </div>
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3 whitespace-pre-line">
              {t("Features.title")}
                </h3>
              </header>

              <div className="prose max-w-none text-slate-400 prose-p:leading-relaxed prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-50 prose-strong:font-large">
                {t("Features.description")}
              </div>
             
            </div>
          </div>
          {/* Image */}
          <div
            className="md:w-5/12 lg:w-1/2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="relative py-24 -mt-12"></div>
          </div>
        </div>
      </article>
      <article className="pt-12 pb-20 first-of-type:pt-0 group ">
        <div className="md:flex">
          <div className="w-20 shrink-0">
            <time className="text-sm inline-flex items-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 md:leading-8 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500 before:ring-4 before:ring-blue-500/30 mb-3"></time>
          </div>

          <div
            className="md:w-7/12 lg:w-1/2 order-1 md:order-none max-md:text-center"
            data-aos="fade-down"
          >
            <div className="grow ml-8 md:ml-0 pb-12 group-last-of-type:pb-0 ">
              <header>
                <div>
                  <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">
                    Precision at its best
                  </div>
                </div>
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3 whitespace-pre-line">
                  Move Beyond Research. Make Smarter, Faster Decisions.
                </h3>
              </header>

              <div className="prose max-w-none text-slate-400 prose-p:leading-relaxed prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-50 prose-strong:font-large">
                Cut through the complexity of analysis—instantly access precise,
                diverse Insight and act with confidence.
              </div>
              <div className="mt-8 max-w-xs max-md:mx-auto space-y-2">
                <button
                  className={`flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100  border-slate-700 opacity-50`}
                >
                  {/* {tabItem.icon} */}
                  <span>Precise Results</span>
                </button>
              </div>
            </div>
          </div>
          {/* Image */}
          <div
            className="md:w-5/12 lg:w-1/2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="relative py-24 -mt-12"></div>
          </div>
        </div>
      </article>
      <article className="pt-12 pb-20 first-of-type:pt-0 group ">
        <div className="md:flex">
          <div className="w-20 shrink-0">
            <time className="text-sm inline-flex items-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 md:leading-8 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500 before:ring-4 before:ring-blue-500/30 mb-3"></time>
          </div>

          <div
            className="md:w-7/12 lg:w-1/2 order-1 md:order-none max-md:text-center"
            data-aos="fade-down"
          >
            <div className="grow ml-8 md:ml-0 pb-12 group-last-of-type:pb-0 ">
              <header>
                <div>
                  <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">
                    Precision at its best
                  </div>
                </div>
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3 whitespace-pre-line">
                  Move Beyond Research. Make Smarter, Faster Decisions.
                </h3>
              </header>

              <div className="prose max-w-none text-slate-400 prose-p:leading-relaxed prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-50 prose-strong:font-large">
                Cut through the complexity of analysis—instantly access precise,
                diverse Insight and act with confidence.
              </div>
              <div className="mt-8 max-w-xs max-md:mx-auto space-y-2">
                <button
                  className={`flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100  border-slate-700 opacity-50`}
                >
                  {/* {tabItem.icon} */}
                  <span>Precise Results</span>
                </button>
              </div>
            </div>
          </div>
          {/* Image */}
          <div
            className="md:w-5/12 lg:w-1/2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="relative py-24 -mt-12"></div>
          </div>
        </div>
      </article>
    </section>
  );
}
