"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Illustration from "@/public/images/glow-top-blue.svg";
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

export default function InsighterFeatures() {
  const t = useTranslations("InsighterFeatures");

  return (
    <ParallaxProvider>
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
          <div className="pt-32 relative">
            {/* Hero content */}
            <div
              className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
                <Image
                  src={Illustration}
                  className="max-w-none"
                  width={2146}
                  priority
                  alt="Hero Illustration"
                />
              </div>
            </div>
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-5 leading-[1.2]"
                data-aos="fade-down"
              >
                {t("title")}
              </h2>
              <p
                className="text-xl text-slate-300 mb-8"
                data-aos="fade-down"
                data-aos-delay="200"
              >
                {t("description")}
              </p>
            </div>
          </div>
          {/* Fourth Section (Now First) */}
          <div className="pt-10 pb-10 md:pt-25 ">
            <div>
              {/* Section content */}
              <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-center justify-between">
                {/* Image with Parallax */}
                <div className="" data-aos="fade-up" data-aos-delay="100">
                  <Parallax translateY={[-20, 20]} className="overflow-hidden">
                    <figure className="rounded-3xl p-px mb-8 overflow-hidden mt-10 max-w-[600px] mx-auto cursor-pointer relative group">
                      <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-3xl"></div>
                      <div className="overflow-hidden rounded-3xl">
                        <Image
                          src="https://res.cloudinary.com/dahiaq28x/image/upload/v1745308106/A_Sustainable_Revenue_Stream_vshfwt.png"
                          alt="insighter_1.png"
                          width={500}
                          height={400}
                          className="transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                        />
                      </div>
                    </figure>
                  </Parallax>
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

          {/* First Section */}
          <div className=" pb-10  ">
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

                {/* Image with Parallax */}
                <div className="" data-aos="fade-up" data-aos-delay="100">
                  <Parallax translateY={[15, -15]} className="overflow-hidden">
                    <figure className="bg-gradient-to-b from-slate-300/20 to-transparent rounded-3xl p-px mb-8 cursor-pointer group">
                      <div className="overflow-hidden rounded-3xl relative">
                        <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                        <Image
                          src="https://res.cloudinary.com/dahiaq28x/image/upload/v1745308106/Bring_your_knowledge_to_light_by_sharing_it_on_the_platform_fjfhca.png"
                          alt="insighter_2.png"
                          width={500}
                          height={400}
                          className="transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-1 group-hover:brightness-110"
                        />
                      </div>
                    </figure>
                  </Parallax>
                </div>
              </div>
            </div>
          </div>

          {/* Second Section */}
          <div className="pt-10 pb-12 md:pt-25 ">
            <div>
              {/* Section content */}
              <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-center justify-between">
                {/* Image with Parallax */}
                <div className="" data-aos="fade-up" data-aos-delay="100">
                  <Parallax translateY={[-20, 20]} className="overflow-hidden">
                    <figure className="bg-gradient-to-b from-slate-300/20 to-transparent rounded-3xl p-px mb-8 cursor-pointer relative group">
                      <div className="overflow-hidden rounded-3xl">
                        <Image
                          src="https://res.cloudinary.com/dahiaq28x/image/upload/v1745308106/Don_t_let_your_expertise_fade_to_silence__let_it_bloom_into_sustainable_revenue_qgqpms.png"
                          alt="insighter_3.png"
                          width={500}
                          height={400}
                          className="transition-all duration-500 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(56,189,248,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                      </div>
                    </figure>
                  </Parallax>
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
        </div>
      </section>
    </ParallaxProvider>
  );
}
