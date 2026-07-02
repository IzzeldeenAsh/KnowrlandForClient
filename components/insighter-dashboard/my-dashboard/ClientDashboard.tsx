'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { IconCalendarCheck, IconDatabase, IconChartBar, IconReport, IconBook2, IconSchool } from '@tabler/icons-react';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';
import PromoCard, { PromoButton } from './PromoCard';
import { NOTIFICATION_BANNER_IMAGE, hasNotificationNumbers } from './shared';
import { getSentMeetings } from '@/services/insighter-dashboard.api';

const KNOWLEDGE_LINKS = [
  { type: 'data', labelKey: 'dataLabel', descriptionKey: 'dataDescription', icon: IconDatabase, color: '#111827' },
  { type: 'report', labelKey: 'reportLabel', descriptionKey: 'reportDescription', icon: IconReport, color: '#3699FF' },
  { type: 'statistic', labelKey: 'statisticLabel', descriptionKey: 'statisticDescription', icon: IconChartBar, color: '#891638' },
  { type: 'manual', labelKey: 'manualLabel', descriptionKey: 'manualDescription', icon: IconBook2, color: '#FF9F43' },
  { type: 'course', labelKey: 'courseLabel', descriptionKey: 'courseDescription', icon: IconSchool, color: '#0ABB87' },
] as const;

/** Client-only dashboard variant. */
export default function ClientDashboard() {
  const t = useTranslations('InsighterDashboard.myDashboard.client');
  const tw = useTranslations('InsighterDashboard.myDashboard.widgets');
  const tp = useTranslations('InsighterDashboard.myDashboard.promo');
  const locale = useLocale();
  const { user } = useGlobalProfile();
  const [todayMeetingsCount, setTodayMeetingsCount] = useState(0);

  const profile = user as (typeof user & { sms_number?: string | null }) | null;
  const showNotificationBanner = profile ? !hasNotificationNumbers(profile) : false;
  const base = `/${locale}/insighter-dashboard`;

  useEffect(() => {
    getSentMeetings(locale, 1, 30)
      .then((res) => {
        const today = new Date().toISOString().split('T')[0];
        setTodayMeetingsCount((res.data ?? []).filter((m) => m.date === today).length);
      })
      .catch(() => setTodayMeetingsCount(0));
  }, [locale]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Today's sessions */}
        <Link
          href={`${base}/my-meetings?tab=sent`}
          className="flex min-h-[190px] flex-col justify-between rounded-xl border border-gray-100 p-6 transition-transform hover:-translate-y-0.5"
          style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #e8f2fd 100%)' }}
        >
          <IconCalendarCheck size={36} stroke={1.5} className="text-gray-700" />
          <div>
            <span className="text-4xl font-semibold leading-none text-gray-900">
              {todayMeetingsCount}
            </span>
            <div className="mt-2 text-sm font-semibold text-gray-500">{tw('todaySessions')}</div>
          </div>
        </Link>

        {showNotificationBanner && (
          <PromoCard
            image={NOTIFICATION_BANNER_IMAGE}
            imageAlt={tp('notifTitle')}
            title={tp('notifTitle')}
            text={tp('notifText')}
            action={
              <PromoButton href={`${base}/account-settings/notification-settings`}>
                {tp('notifAction')}
              </PromoButton>
            }
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Latest insights links */}
        <div
          className="rounded-xl border border-gray-200 p-6"
          style={{ backgroundImage: 'linear-gradient(to bottom right, #ffffff, #ecfdfa)' }}
        >
          <h3 className="mb-4 text-lg font-bold text-gray-900">{t('latestInsights')}</h3>
          <div className="flex flex-col gap-2">
            {KNOWLEDGE_LINKS.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.type}
                  href={`/${locale}/home?search_type=knowledge&type=${link.type}`}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white/70 px-4 py-3 transition-colors hover:border-sky-400"
                >
                  <LinkIcon size={26} stroke={1.5} style={{ color: link.color }} className="shrink-0" />
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">{t(link.labelKey)}</span>
                    <span className="text-xs text-gray-500">{t(link.descriptionKey)}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Become an insighter */}
        <div
          className="flex flex-col items-center justify-center gap-6 rounded-xl bg-cover bg-center p-8 text-center"
          style={{ backgroundImage: "url('/assets/media/auth/bg-dark-line-blue.jpg')" }}
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-100">{t('becomeInsighterTitle')}</h2>
            <p className="mt-2 text-base font-semibold text-gray-300">
              {t('becomeInsighterDescription')}
            </p>
          </div>
          <PromoButton href={`/${locale}/insighter-register/vertical`}>{t('startNow')}</PromoButton>
        </div>
      </div>
    </div>
  );
}
