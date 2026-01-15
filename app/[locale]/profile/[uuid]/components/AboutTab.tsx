"use client";

import React, { useState } from "react";
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
  country?: string;
  company?: Company;
}

interface AboutTabProps {
  locale: string;
  enterpriseType?: string | null;
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
  enterpriseType,
}: AboutTabProps) {
  const t = useTranslations("ProfilePage");
  const [copied, setCopied] = useState(false);

  const formatWebsiteUrl = (url: string) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const handleCopyWebsite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const websiteUrl = profileData.company?.website;
    if (!websiteUrl) return;

    const formattedUrl = formatWebsiteUrl(websiteUrl);
    
    try {
      await navigator.clipboard.writeText(formattedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const SOCIAL_PLATFORMS: Array<{ key: string; label: string }> = [
    { key: "facebook", label: "Facebook" },
    { key: "instagram", label: "Instagram" },
    { key: "linkedin", label: "LinkedIn" },
    { key: "youtube", label: "YouTube" },
    { key: "x", label: "X" },
    { key: "tiktok", label: "TikTok" },
  ];

  const normalizeSocialType = (type: string) =>
    (type || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "")
      .replace(/[_-]/g, "");

  const normalizePlatformKey = (type: string) => {
    const key = normalizeSocialType(type);
    if (key === "twitter") return "x";
    if (key === "fb") return "facebook";
    if (key === "yt") return "youtube";
    if (key === "insta") return "instagram";
    return key;
  };

  const buildSocialLinkMap = (socials?: Social[]) => {
    const map = new Map<string, Social>();
    for (const s of socials || []) {
      const platform = normalizePlatformKey(s.type);
      const link = (s.link || "").trim();
      if (!platform || !link) continue;
      if (!SOCIAL_PLATFORMS.some((p) => p.key === platform)) continue;
      if (!map.has(platform)) map.set(platform, s);
    }
    return map;
  };

  const getSocialButtonClasses = (type: string, enabled: boolean) => {
    const key = normalizeSocialType(type);

    // The SVGs themselves already include the colored circle background.
    // Keep the wrappers identical (size/shape/hover/focus), regardless of platform.
    const base =
      "inline-flex h-8 w-8 items-center justify-center rounded-full overflow-hidden shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900";
    const enabledStyles = "hover:scale-105";
    const disabledStyles = "opacity-35 grayscale cursor-not-allowed hover:scale-100";

    switch (key) {
      case "facebook":
      case "fb":
        return `${base} ${enabled ? enabledStyles : disabledStyles} focus-visible:ring-[#3B5998]`;
      case "x":
      case "twitter":
        return `${base} ${enabled ? enabledStyles : disabledStyles} focus-visible:ring-[#040709]`;
      case "youtube":
      case "yt":
        return `${base} ${enabled ? enabledStyles : disabledStyles} focus-visible:ring-[#FF0000]`;
      case "linkedin":
        return `${base} ${enabled ? enabledStyles : disabledStyles} focus-visible:ring-[#0077B5]`;
      case "instagram":
      case "insta":
        return `${base} ${enabled ? enabledStyles : disabledStyles} focus-visible:ring-[#E83678]`;
      case "tiktok":
        return `${base} ${enabled ? enabledStyles : disabledStyles} focus-visible:ring-[#0C0C0C]`;
      default:
        return `${base} ${enabled ? enabledStyles : disabledStyles}`;
    }
  };

  const renderSocialRow = (socials?: Social[]) => {
    const links = buildSocialLinkMap(socials);

    return (
      <div className="flex flex-wrap gap-2 not-prose">
        {SOCIAL_PLATFORMS.map((p) => {
          const s = links.get(p.key);
          const enabled = Boolean(s);
          const icon = getSocialIcon(p.key);
          if (!icon) return null;

          const commonProps = {
            className: getSocialButtonClasses(p.key, enabled),
            title: enabled ? p.label : `${p.label} (not provided)`,
            "aria-label": p.label,
          } as const;

          if (!enabled) {
            return (
              <span
                key={p.key}
                {...commonProps}
                aria-disabled="true"
              >
                {icon}
              </span>
            );
          }

          return (
            <a
              key={p.key}
              href={s!.link}
              target="_blank"
              rel="noopener noreferrer"
              {...commonProps}
            >
              {icon}
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <div className="py-8 px-6 md:px-10">
      <div className="prose max-w-none dark:prose-invert">
        {/* Bio Section - first (only shown for non-company profiles with bio) */}
        {!isCompany && profileData.bio && (
          <div
            className="bg-gray-50 dark:bg-slate-700/30 p-6 rounded-xl mb-10"
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
                {/* Location/Country */}
                {profileData.country && (
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                    <div className="flex items-start">
                      <div className="py-5">
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
                      </div>
                      <div>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("address")}
                        </p>
                        <p className="font-medium">
                          {profileData.country}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {/* Social Media */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {t("socialMedia")}
                  </p>
                  {renderSocialRow(profileData.social)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Company Information (if applicable) with better styling */}
        {isCompany && profileData.company && enterpriseType !== "insighter" && (
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
                <p
                  className={`whitespace-pre-line ${
                    typeof profileData.company.about_us === "string" &&
                    profileData.company.about_us.trim() &&
                    require('@/app/utils/textUtils').isFirstWordArabic(profileData.company.about_us)
                      ? 'text-right'
                      : 'text-left'
                  }`}
                  dir={
                    typeof profileData.company.about_us === "string" &&
                    profileData.company.about_us.trim() &&
                    require('@/app/utils/textUtils').isFirstWordArabic(profileData.company.about_us)
                      ? 'rtl'
                      : 'ltr'
                  }
                >
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
                  <div className="flex items-center gap-2">
                    <a
                      href={formatWebsiteUrl(profileData.company.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium m-0 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline flex-1 truncate"
                    >
                      {profileData.company.website}
                    </a>
                    <button
                      onClick={handleCopyWebsite}
                      className="flex-shrink-0 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                      title={copied ? (locale === "ar" ? "تم النسخ!" : "Copied!") : (locale === "ar" ? "نسخ الرابط" : "Copy link")}
                      aria-label={locale === "ar" ? "نسخ الرابط" : "Copy link"}
                    >
                      {copied ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-600 dark:text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-600 dark:text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {t("socialMedia")}
                  </p>
                  {renderSocialRow(profileData.company.social)}
                </div>

                {/* Company Address */}
                {isCompany && (profileData.company?.address || profileData.country) && (
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
                          {t("address")}
                        </p>
                        <p className="font-medium">
                          {profileData.company?.address}
                          {profileData.company?.address && profileData.country && ", "}
                          {profileData.country}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Certifications Section - second */}
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
                    className="group block p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-lg transition duration-300 transform hover:translate-y-[-4px]"
                    data-aos="fade-up"
                    data-aos-delay={100 * ((index % 3) + 1)}
                    aria-label={`${t("certifications")}: ${cert.type
                      .replace(/_/g, " ")
                      .toLowerCase()}`}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="rounded-2xl bg-gray-50 dark:bg-slate-700/40 p-4 ring-1 ring-gray-200/70 dark:ring-slate-600/50">
                        <NewCertificationIcon width={56} height={56} />
                      </div>
                      <div className="text-center">
                        <p className="m-0 inline-flex items-center rounded-full bg-gray-50 dark:bg-slate-700/40 px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 ring-1 ring-gray-200/70 dark:ring-slate-600/50 ring-inset capitalize">
                          {cert.type.replace(/_/g, " ")}
                        </p>
                        <p className="m-0 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          {t("websiteLabel")}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

        {/* Industries and Consulting Fields - last */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Industries Section */}
          {profileData.industries && profileData.industries.length > 0 && (
            <div
              className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5"
              data-aos="fade-up"
              data-aos-delay="100"
            >
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                {t("industries")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.industries.map((industry) => (
                  <span
                    key={industry.id}
                    className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm transition transform hover:translate-y-[-1px] hover:shadow"
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
              <div
                className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
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
                <div className="flex flex-wrap gap-2">
                  {profileData.consulting_field.map((field) => (
                    <span
                      key={field.id}
                      className="bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm transition transform hover:translate-y-[-1px] hover:shadow"
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
                  {renderSocialRow(profileData.social)}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}