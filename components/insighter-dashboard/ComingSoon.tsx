'use client';

import { useTranslations } from 'next-intl';
import { IconTools } from '@tabler/icons-react';

/** Temporary placeholder while a feature is being migrated from the Angular app. */
export default function ComingSoon({ title }: { title?: string }) {
  const t = useTranslations('InsighterDashboard.common');
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white p-10 text-center">
      <IconTools size={40} className="text-gray-300" />
      {title && <h2 className="text-lg font-bold text-gray-700">{title}</h2>}
      <p className="text-sm text-gray-500">{t('comingSoon')}</p>
    </div>
  );
}
