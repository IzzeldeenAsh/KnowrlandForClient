'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';
import AgreementSection from './AgreementSection';
import WidgetsRow from './WidgetsRow';
import PromoCard, { PromoGrid, PromoButton } from './PromoCard';
import DonutChart, { DonutLegend, type DonutSlice } from './DonutChart';
import {
  NOTIFICATION_BANNER_IMAGE,
  PUBLISH_INSIGHTS_IMAGE,
  PROJECT_SERVICE_IMAGE,
  hasNotificationNumbers,
} from './shared';
import {
  getCompanyDashboardStatistics,
  type CompanyDashboardStatistics,
} from '@/services/insighter-dashboard.api';

const KNOWLEDGE_TYPE_COLORS: Record<string, string> = {
  statistic: '#0a7abf',
  report: '#3b9ae1',
  manual: '#6bb6ff',
  data: '#1e88e5',
  course: '#42a5f5',
};

/** Company dashboard variant. */
export default function CompanyDashboard({
  showProjectServiceSetupWidget,
}: {
  showProjectServiceSetupWidget: boolean;
}) {
  const t = useTranslations('InsighterDashboard.myDashboard.promo');
  const tc = useTranslations('InsighterDashboard.myDashboard.company');
  const tk = useTranslations('InsighterDashboard.myDashboard.knowledgeTypes');
  const locale = useLocale();
  const { user } = useGlobalProfile();
  const [stats, setStats] = useState<CompanyDashboardStatistics | null>(null);

  const profile = user as (typeof user & { sms_number?: string | null }) | null;
  const showNotificationBanner = profile ? !hasNotificationNumbers(profile) : false;
  const base = `/${locale}/insighter-dashboard`;

  useEffect(() => {
    getCompanyDashboardStatistics(locale).then(setStats).catch(() => setStats(null));
  }, [locale]);

  const published = stats?.knowledge_published_statistics;
  const slices: DonutSlice[] = Object.entries(published?.type ?? {})
    .filter(([, count]) => Number(count) > 0)
    .map(([type, count]) => ({
      label: tk.has(type) ? tk(type) : type,
      value: Number(count),
      color: KNOWLEDGE_TYPE_COLORS[type] ?? '#999999',
    }));

  return (
    <div>
      <AgreementSection agreementType="company_agreement" />
      <WidgetsRow />

      <PromoGrid>
        {showProjectServiceSetupWidget && (
          <PromoCard
            image={PROJECT_SERVICE_IMAGE}
            imageAlt={t('projectTitle')}
            title={t('projectTitle')}
            text={t('projectText')}
            action={
              <PromoButton href={`${base}/account-settings/project-settings`}>
                {t('projectAction')}
              </PromoButton>
            }
          />
        )}
        {showNotificationBanner && (
          <PromoCard
            image={NOTIFICATION_BANNER_IMAGE}
            imageAlt={t('notifTitle')}
            title={t('notifTitle')}
            text={t('notifText')}
            action={
              <PromoButton href={`${base}/account-settings/notification-settings`}>
                {t('notifAction')}
              </PromoButton>
            }
          />
        )}
      </PromoGrid>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Published knowledge donut */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
          <h3 className="mb-4 text-base font-bold text-gray-800">{tc('publishedKnowledge')}</h3>
          {slices.length > 0 ? (
            <div className="flex flex-col items-center gap-4">
              <DonutChart
                slices={slices}
                size={180}
                thickness={28}
                centerValue={published?.total ?? 0}
                centerLabel={tc('total')}
              />
              <DonutLegend slices={slices} />
            </div>
          ) : (
            <div className="flex min-h-[180px] items-center justify-center text-sm text-gray-400">
              {tc('noData')}
            </div>
          )}
        </div>

        {/* Start publishing */}
        <div
          className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white bg-cover p-8"
          style={{
            backgroundImage: "url('/assets/media/illustrations/misc/bg-publish.png')",
            backgroundPosition: '100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">{tc('startUploading')}</h2>
            <p className="mt-2 max-w-[220px] text-sm font-semibold text-gray-700">
              {tc('startUploadingDescription')}
            </p>
          </div>
          <div className="mt-6">
            <PromoButton href={`${base}/my-knowledge/general`}>{tc('myLibrary')}</PromoButton>
          </div>
        </div>

        {/* Build your team */}
        <div
          className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white bg-cover p-8"
          style={{
            backgroundImage: "url('/assets/media/illustrations/misc/build-team.png')",
            backgroundPosition: '100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">{tc('buildTeam')}</h2>
            <p className="mt-2 max-w-[220px] text-sm font-semibold text-gray-700">
              {tc('buildTeamDescription')}
            </p>
          </div>
          <div className="mt-6">
            <PromoButton href={`${base}/my-company-settings?addEmployee=true`}>
              {tc('addEmployee')}
            </PromoButton>
          </div>
        </div>
      </div>

      <PromoGrid>
        <PromoCard
          image={PUBLISH_INSIGHTS_IMAGE}
          imageAlt={t('publishTitle')}
          title={t('publishTitle')}
          text={t('publishText')}
          action={<PromoButton href={`/${locale}/add-knowledge/stepper`}>{t('publishAction')}</PromoButton>}
        />
      </PromoGrid>
    </div>
  );
}
