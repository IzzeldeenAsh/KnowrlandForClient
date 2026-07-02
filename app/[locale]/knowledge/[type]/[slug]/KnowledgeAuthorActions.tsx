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
  labelName: string;
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
  const companyLegalName = insighter.company?.legal_name?.trim() || "";
  const requestServiceLabelName =
    serviceTarget?.labelName || companyLegalName || insighter.name || "";

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
            `https://api.insightabusiness.com/api/platform/insighter/profile/${insighterUuid}`,
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
              labelName: payload.data?.name?.trim() || insighter.name?.trim() || "",
            });
          }
          return;
        }

        const response = await fetch(
          `https://api.insightabusiness.com/api/platform/company/profile/${companyUuid}`,
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
            labelName: companyLegalName,
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
    companyLegalName,
    insighter.company?.uuid,
    insighter.name,
    insighter.uuid,
    isIndividualInsighterInsight,
    locale,
  ]);

  if (isOwner) return null;

  const canRequestService =
    (isCompanyMemberInsight || isIndividualInsighterInsight) &&
    Boolean(requestServiceLabelName) &&
    serviceTarget?.receiveProjectServicesActive === true &&
    Boolean(serviceTarget.specifiedInsighterUuid);
  const serviceInsighterUuid = serviceTarget?.specifiedInsighterUuid || "";
  const serviceHref = canRequestService
    ? `/${locale}/project/wizard/project-type?fresh=1&${specifiedInsighterQueryParam}=${encodeURIComponent(serviceInsighterUuid)}`
    : "";
  const meetHref = `/${locale}/profile/${insighter.uuid}?entity=insighter&tab=meet`;
  const meetLabel =
    locale === "en"
      ? `Meet ${insighter.name.toLowerCase()}`
      : `قابل الخبير ${insighter.name.toLowerCase()}`;
  const requestServiceLabel =
    isCompanyMemberInsight && requestServiceLabelName
      ? isRTL
        ? `طلب خدمة من ${requestServiceLabelName}`
        : `Request Service from ${requestServiceLabelName}`
      : isRTL
        ? "طلب خدمة"
        : "Request Service";
  const buttonClass =
    "inline-flex max-h-[34px] items-center justify-center gap-2 rounded-md bg-[rgb(56_159_227)] px-3 py-1.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[rgb(42_139_203)] focus:outline-none focus:ring-2 focus:ring-blue-200";

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <Link href={meetHref} className={buttonClass}>
        <IconCalendarTime size={16} stroke={2} />
        <span className="capitalize">{meetLabel}</span>
      </Link>
      {canRequestService && (
        <Link href={serviceHref} className={buttonClass}>
          <IconBriefcase size={16} stroke={2} />
          <span className="relative font-semibold">{requestServiceLabel}</span>
        </Link>
      )}
    </div>
  );
}
