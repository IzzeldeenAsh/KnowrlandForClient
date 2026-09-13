"use client";

import Link from "next/link";
import { IconBriefcase, IconCalendarTime } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { specifiedInsighterQueryParam } from "@/components/project/specifiedInsighterProject";

type CompanyInsighter = {
  uuid?: string;
  owner?: boolean;
};

type ServiceTarget = {
  specifiedInsighterUuid: string;
  receiveProjectServicesActive: boolean;
};

type KnowledgeAuthorActionsProps = {
  locale: string;
  isOwner?: boolean;
  insighter: {
    uuid: string;
    name: string;
    roles?: string[];
    company?: {
      uuid?: string;
      legal_name?: string;
    };
  };
  className?: string;
};

export default function KnowledgeAuthorActions({
  locale,
  isOwner,
  insighter,
  className = "",
}: KnowledgeAuthorActionsProps) {
  const isRTL = locale === "ar";
  const [serviceTarget, setServiceTarget] = useState<ServiceTarget | null>(null);

  const roles = insighter.roles ?? [];
  const isCompanyMemberInsight =
    (roles.includes("company") || roles.includes("company-insighter")) &&
    Boolean(insighter.company?.uuid);
  const isIndividualInsighterInsight =
    roles.includes("insighter") && !insighter.company?.uuid;
  useEffect(() => {
    const companyUuid = insighter.company?.uuid;
    const insighterUuid = insighter.uuid;

    if (!companyUuid && (!isIndividualInsighterInsight || !insighterUuid)) {
      setServiceTarget(null);
      return;
    }

    let cancelled = false;

    const fetchServiceTarget = async () => {
      try {
        if (!companyUuid) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/platform/insighter/profile/${insighterUuid}`,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accept-Language": locale,
              },
              cache: "no-store",
            }
          );

          if (!response.ok) {
            if (!cancelled) setServiceTarget(null);
            return;
          }

          const payload = (await response.json()) as {
            data?: {
              uuid?: string;
              name?: string;
              receive_project_services_active?: boolean;
            };
          };
          const targetUuid = payload.data?.uuid || insighterUuid || "";

          if (!cancelled) {
            setServiceTarget({
              specifiedInsighterUuid: targetUuid,
              receiveProjectServicesActive:
                payload.data?.receive_project_services_active === true,
            });
          }
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/platform/company/profile/${companyUuid}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Accept-Language": locale,
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          if (!cancelled) setServiceTarget(null);
          return;
        }

        const payload = (await response.json()) as {
          data?: {
            receive_project_services_active?: boolean;
            insighter_company?: CompanyInsighter[];
          };
        };
        const ownerUuid =
          payload.data?.insighter_company?.find((companyInsighter) => companyInsighter.owner)
            ?.uuid || "";

        if (!cancelled) {
          setServiceTarget({
            specifiedInsighterUuid: ownerUuid,
            receiveProjectServicesActive:
              payload.data?.receive_project_services_active === true,
          });
        }
      } catch {
        if (!cancelled) setServiceTarget(null);
      }
    };

    fetchServiceTarget();

    return () => {
      cancelled = true;
    };
  }, [
    insighter.company?.uuid,
    insighter.uuid,
    isIndividualInsighterInsight,
    locale,
  ]);

  if (isOwner) return null;

  const canRequestService =
    (isCompanyMemberInsight || isIndividualInsighterInsight) &&
    serviceTarget?.receiveProjectServicesActive === true &&
    Boolean(serviceTarget.specifiedInsighterUuid);
  const serviceInsighterUuid = serviceTarget?.specifiedInsighterUuid || "";
  const serviceHref = canRequestService
    ? `/${locale}/project/wizard/project-type?fresh=1&${specifiedInsighterQueryParam}=${encodeURIComponent(serviceInsighterUuid)}`
    : "";
  const meetHref = `/${locale}/profile/${insighter.uuid}?entity=insighter&tab=meet`;
  const meetLabel = locale === "en" ? "Meet" : "لقاء";
  const requestServiceLabel = isRTL ? "طلب خدمة" : "Request Service";
  const buttonClass =
    "group relative isolate inline-flex max-h-[34px] items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 px-3.5 py-1.5 text-center text-sm font-semibold text-sky-600 shadow-sm transition-all duration-200 before:pointer-events-none before:absolute before:inset-px before:z-0 before:rounded-full before:bg-white before:content-[''] hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 dark:text-sky-300 dark:before:bg-slate-900";
  const buttonTextClass =
    "relative z-10 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text font-semibold text-transparent";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <Link href={meetHref} className={buttonClass}>
        <IconCalendarTime size={16} stroke={2} className="relative z-10 transition-colors group-hover:text-cyan-500" />
        <span className={`${buttonTextClass} capitalize`}>{meetLabel}</span>
      </Link>
      {canRequestService && (
        <Link href={serviceHref} className={buttonClass}>
          <IconBriefcase size={16} stroke={2} className="relative z-10 transition-colors group-hover:text-teal-500" />
          <span className={buttonTextClass}>{requestServiceLabel}</span>
        </Link>
      )}
    </div>
  );
}
