'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';
import { isClientOnly } from '@/components/insighter-dashboard/nav-config';
import { getProjectAccountCheck } from '@/services/insighter-dashboard.api';
import ClientDashboard from './ClientDashboard';
import InsighterDashboard from './InsighterDashboard';
import CompanyDashboard from './CompanyDashboard';

/**
 * Role switch for /insighter-dashboard/my-dashboard.
 * Mirrors Angular MyDashboardComponent:
 *  - client-only -> client dashboard
 *  - insighter / company-insighter -> insighter dashboard
 *  - company -> company dashboard
 * Also checks whether the project service setup prompt should show.
 */
export default function MyDashboardClient() {
  const { roles } = useGlobalProfile();
  const locale = useLocale();
  const [showProjectSetup, setShowProjectSetup] = useState(false);

  const canShowProjectPrompt = roles.some((r) =>
    ['company', 'insighter', 'company-insighter'].includes(r)
  );

  useEffect(() => {
    if (!canShowProjectPrompt) {
      setShowProjectSetup(false);
      return;
    }
    getProjectAccountCheck(locale)
      .then((results) => setShowProjectSetup(results?.pass === false))
      .catch(() => setShowProjectSetup(false));
  }, [canShowProjectPrompt, locale]);

  if (roles.length === 0) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  if (isClientOnly(roles)) return <ClientDashboard />;
  if (roles.includes('insighter') || roles.includes('company-insighter')) {
    return <InsighterDashboard showProjectServiceSetupWidget={showProjectSetup} />;
  }
  if (roles.includes('company')) {
    return <CompanyDashboard showProjectServiceSetupWidget={showProjectSetup} />;
  }
  return <ClientDashboard />;
}
