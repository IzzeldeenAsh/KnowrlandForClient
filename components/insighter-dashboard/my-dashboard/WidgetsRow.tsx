'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { IconCurrencyDollar, IconCalendarCheck, IconHelpCircle } from '@tabler/icons-react';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import {
  getWalletBalance,
  getInsighterMeetingStatistics,
  getPendingRequestsCount,
} from '@/services/insighter-dashboard.api';

function StatCard({
  icon,
  value,
  label,
  gradient,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  gradient: string;
}) {
  return (
    <div
      className="flex min-h-[170px] flex-1 basis-52 flex-col justify-between rounded-xl border border-gray-100 p-6"
      style={{ backgroundImage: gradient }}
    >
      <div className="text-gray-700">{icon}</div>
      <div className="flex flex-col">
        <span className="text-4xl font-semibold leading-none tracking-tight text-gray-900">
          {value}
        </span>
        <span className="mt-2 text-sm font-semibold text-gray-500">{label}</span>
      </div>
    </div>
  );
}

/**
 * Stat cards row: wallet balance, today's sessions, pending requests.
 * Mirrors Angular widgets-row.component.
 */
export default function WidgetsRow() {
  const t = useTranslations('InsighterDashboard.myDashboard.widgets');
  const locale = useLocale();
  const { roles } = useRoleCheck();

  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [todayMeetings, setTodayMeetings] = useState<number>(0);
  const [pendingRequests, setPendingRequests] = useState<number>(0);

  const isCompany = roles.includes('company');
  const rolesLoaded = roles.length > 0;

  useEffect(() => {
    getWalletBalance(locale).then(setWalletBalance).catch(() => setWalletBalance(0));
    getInsighterMeetingStatistics(locale)
      .then((stats) => setTodayMeetings(stats.today ?? 0))
      .catch(() => setTodayMeetings(0));
  }, [locale]);

  useEffect(() => {
    if (!rolesLoaded) return;
    getPendingRequestsCount(locale, isCompany)
      .then(setPendingRequests)
      .catch(() => setPendingRequests(0));
  }, [locale, isCompany, rolesLoaded]);

  const currency = new Intl.NumberFormat(locale === 'ar' ? 'ar' : 'en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <StatCard
        icon={<IconCurrencyDollar size={36} stroke={1.5} />}
        value={currency.format(walletBalance)}
        label={t('inWallet')}
        gradient="linear-gradient(135deg, #ffffff 0%, #e8f9f1 100%)"
      />
      <StatCard
        icon={<IconCalendarCheck size={36} stroke={1.5} />}
        value={todayMeetings}
        label={t('meetingsToday')}
        gradient="linear-gradient(135deg, #ffffff 0%, #e8f2fd 100%)"
      />
      <StatCard
        icon={<IconHelpCircle size={36} stroke={1.5} />}
        value={pendingRequests}
        label={t('pendingRequests')}
        gradient="linear-gradient(135deg, #ffffff 0%, #fdf3e8 100%)"
      />
    </div>
  );
}
