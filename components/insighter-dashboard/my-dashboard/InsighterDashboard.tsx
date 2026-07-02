'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import AgreementSection from './AgreementSection';
import WidgetsRow from './WidgetsRow';
import PromoCard, { PromoGrid, PromoButton } from './PromoCard';
import KnowledgeTypesStatistics from './KnowledgeTypesStatistics';
import {
  NOTIFICATION_BANNER_IMAGE,
  PUBLISH_INSIGHTS_IMAGE,
  PROJECT_SERVICE_IMAGE,
  hasNotificationNumbers,
} from './shared';

/** Insighter / company-insighter dashboard variant. */
export default function InsighterDashboard({
  showProjectServiceSetupWidget,
}: {
  showProjectServiceSetupWidget: boolean;
}) {
  const t = useTranslations('InsighterDashboard.myDashboard.promo');
  const locale = useLocale();
  const { user } = useGlobalProfile();
  const { hasRole } = useRoleCheck();

  const profile = user as (typeof user & { status?: string; sms_number?: string | null }) | null;
  const hasPendingActivationRequest =
    profile?.status === 'pending' || profile?.status === 'under_review';
  const isCompanyInsighter = hasRole('company-insighter');
  const showNotificationBanner = profile ? !hasNotificationNumbers(profile) : false;

  const base = `/${locale}/insighter-dashboard`;

  return (
    <div>
      <AgreementSection agreementType="insighter_agreement" />
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

        {!isCompanyInsighter && (
          <PromoCard
            image="/assets/media/auth/upgrade-to-corporate.png"
            imageAlt={t('upgradeTitle')}
            title={t('upgradeTitle')}
            text={hasPendingActivationRequest ? t('upgradePendingDescription') : t('upgradeDescription')}
            action={
              hasPendingActivationRequest ? (
                <PromoButton disabled>{t('upgradePending')}</PromoButton>
              ) : (
                <PromoButton href={`${base}/account-settings/company-account`}>
                  {t('upgradeNow')}
                </PromoButton>
              )
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

        <PromoCard
          image={PUBLISH_INSIGHTS_IMAGE}
          imageAlt={t('publishTitle')}
          title={t('publishTitle')}
          text={t('publishText')}
          action={<PromoButton href={`/${locale}/add-knowledge/stepper`}>{t('publishAction')}</PromoButton>}
        />
      </PromoGrid>

      <KnowledgeTypesStatistics />
    </div>
  );
}
