"use client";

import React from "react";
import { useTranslations } from "next-intl";
import NewCertificationIcon from "@/app/components/icons/NewCertificationIcon";

interface Industry {
  id: number;
  name: string;
}

interface ConsultingField {
  id: number;
  name: string;
  names?: {
    ar?: string;
  };
}

interface Certification {
  id: number;
  type: string;
  url: string;
}

interface Social {
  id: number;
  type: string;
  link: string;
}

interface Company {
  about_us: string;
  website: string;
  address?: string;
  social?: Social[];
}

interface ProfileData {
  industries?: Industry[];
  consulting_field?: ConsultingField[];
  certifications?: Certification[];
  bio?: string | null;
  social?: Social[];
  company?: Company;
}

interface AboutTabProps {
  locale: string;
  isRTL: boolean;
  profileData: ProfileData;
  isCompany: boolean;
  getSocialIcon: (type: string) => React.ReactNode;
}

export default function AboutTab({
  locale,
  isRTL,
  profileData,
  isCompany,
  getSocialIcon,
}: AboutTabProps) {
  const t = useTranslations("ProfilePage");

  return (
    <div className="py-8 px-6 md:px-10">
      <div className="prose max-w-none dark:prose-invert">
        {/* Company Information (if applicable) with better styling */}
        {isCompany && profileData.company && (
          <div
            className="bg-gray-50 dark:bg-slate-700/30 rounded-xl p-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  isRTL ? "ml-2" : "mr-2"
                } text-blue-500`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {t("companyInfo")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column (About) - Takes 2/3 of space */}
              <div className="md:col-span-2 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm h-full">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {t("aboutUs")}
                </p>
                <p className="whitespace-pre-line">
                  {profileData.company.about_us}
                </p>
              </div>

              {/* Right column (Details) - Takes 1/3 of space */}
              <div className="flex flex-col gap-4">
                {/* Website */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {t("websiteLabel")}
                  </p>
                  <p className="font-medium m-0">
                    {profileData.company.website}
                  </p>
                </div>

                {/* Social Media */}
                {profileData.company.social &&
                  profileData.company.social.length > 0 && (
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {t("socialMedia")}
                      </p>
                      <div className="flex gap-3">
                        {profileData.company.social.map((social) => (
                          <a
                            key={social.id}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl hover:opacity-80 transition transform hover:scale-110"
                          >
                            {getSocialIcon(social.type)}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Company Address */}
                {isCompany && profileData.company?.address && (
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 text-gray-500 dark:text-gray-400 ${
                          isRTL ? "ml-2" : "mr-2"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("location")}
                        </p>
                        <p className="font-medium">
                          {profileData.company?.address}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Industries and Consulting Fields in Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Industries Section */}
          {profileData.industries &&
            profileData.industries.length > 0 && (
              <div data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${
                      isRTL ? "ml-2" : "mr-2"
                    } text-blue-500`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  {t("industries")}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profileData.industries.map((industry) => (
                    <span
                      key={industry.id}
                      className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition transform hover:translate-y-[-2px] hover:shadow"
                    >
                      {industry.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Consulting Fields Section */}
          {profileData.consulting_field &&
            profileData.consulting_field.length > 0 && (
              <div data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${
                      isRTL ? "ml-2" : "mr-2"
                    } text-purple-500`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {t("consultingFields")}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profileData.consulting_field.map((field) => (
                    <span
                      key={field.id}
                      className="bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition transform hover:translate-y-[-2px] hover:shadow"
                    >
                      {locale === "ar" && field.names?.ar
                        ? field.names.ar
                        : field.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Certifications Section with better cards */}
        {profileData.certifications &&
          profileData.certifications.length > 0 && (
            <div
              className="mb-10"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    isRTL ? "ml-2" : "mr-2"
                  } text-green-500`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                {t("certifications")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profileData.certifications.map((cert, index) => (
                  <a
                    key={cert.id}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-lg transition duration-300 transform hover:translate-y-[-4px]"
                    data-aos="fade-up"
                    data-aos-delay={100 * ((index % 3) + 1)}
                  >
                    <div className="flex flex-col items-center">
                      <div>
                        <NewCertificationIcon
                          width={64}
                          height={64}
                        />
                      </div>
                      <div className="text-center">
                        <p className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset capitalize">
                          {cert.type.replace(/_/g, " ")}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        {/* Bio Section - only shown for non-company profiles with bio */}
        {!isCompany && profileData.bio && (
          <div
            className="bg-gray-50 dark:bg-slate-700/30 p-6 rounded-xl mb-10 mt-10"
            data-aos="fade-up"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${
                      isRTL ? "ml-2" : "mr-2"
                    } text-blue-500`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {t("bio")}
                </h3>
                <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                  {profileData.bio}
                </p>
              </div>

              {/* Contact Information */}
              <div className="flex flex-col gap-4">
                {/* Social Media */}
                {profileData.social &&
                  profileData.social.length > 0 && (
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {t("socialMedia")}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {profileData.social.map((social) => (
                          <a
                            key={social.id}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl hover:opacity-80 transition transform hover:scale-110"
                          >
                            {getSocialIcon(social.type)}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}

        {/* Show only Social Media when there's no bio but social media exists */}
        {!isCompany &&
          !profileData.bio &&
          profileData.social &&
          profileData.social.length > 0 && (
            <div
              className="bg-gray-50 dark:bg-slate-700/30 p-6 rounded-xl mb-10 mt-10"
              data-aos="fade-up"
            >
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">
                    {t("socialMedia")}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {profileData.social.map((social) => (
                      <a
                        key={social.id}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:opacity-80 transition transform hover:scale-110"
                      >
                        {getSocialIcon(social.type)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}