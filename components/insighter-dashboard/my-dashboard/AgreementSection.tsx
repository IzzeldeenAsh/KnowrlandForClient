'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { IconInfoCircle } from '@tabler/icons-react';
import AgreementModal from '@/components/agreements/AgreementModal';
import { checkLatestAgreement } from '@/services/insighter-dashboard.api';

/**
 * "You have not accepted the latest agreement" banner + review modal.
 * Mirrors the Angular agreement banner on insighter/company dashboards.
 */
export default function AgreementSection({
  agreementType,
}: {
  agreementType: 'insighter_agreement' | 'company_agreement';
}) {
  const t = useTranslations('InsighterDashboard.myDashboard.agreement');
  const locale = useLocale();
  const [needsAgreement, setNeedsAgreement] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    checkLatestAgreement(locale)
      .then((accepted) => setNeedsAgreement(!accepted))
      .catch(() => setNeedsAgreement(true));
  }, [locale]);

  if (!needsAgreement) return null;

  return (
    <>
      <div
        role="alert"
        className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4"
      >
        <div className="flex items-center gap-3">
          <IconInfoCircle size={22} className="text-amber-500" />
          <span className="text-sm font-semibold text-amber-800">{t('message')}</span>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500"
        >
          {t('review')}
        </button>
      </div>
      <AgreementModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        onAccepted={() => {
          setNeedsAgreement(false);
          setModalOpen(false);
        }}
        locale={locale}
        agreementType={agreementType}
      />
    </>
  );
}
