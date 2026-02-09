'use client';

import { useRoleCheck } from '@/hooks/useRoleCheck';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function FloatingPublishButton() {
  const { hasRole, roles, isLoading } = useRoleCheck();
  const t = useTranslations('HomePage');

  // Only show for client role (and not for insighter/company roles)
  const isClientOnly = 
    !isLoading && 
    hasRole('client') && 
    !roles.some((role) => ['insighter', 'company', 'company-insighter'].includes(role));

  if (!isClientOnly) {
    return null;
  }

  return (
    <Link
      href="https://app.foresighta.co/app/insighter-register/vertical"
      className="fixed bottom-6 left-6 z-50 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
      style={{
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
    >
      {t('publishButton')}
    </Link>
  );
}

