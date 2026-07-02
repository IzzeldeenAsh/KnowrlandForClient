export const NOTIFICATION_BANNER_IMAGE =
  'https://res.cloudinary.com/dsiku9ipv/image/upload/v1771139272/whatsappsms_l4scor.png';
export const PUBLISH_INSIGHTS_IMAGE =
  'https://res.cloudinary.com/dsiku9ipv/image/upload/v1780901537/insight_bioyfv.png';
export const PROJECT_SERVICE_IMAGE = '/assets/media/illustrations/misc/project-service.svg';

/** The notification banner shows when the user has neither WhatsApp nor SMS number. */
export function hasNotificationNumbers(profile: {
  whatsapp_number?: string | null;
  sms_number?: string | null;
}): boolean {
  const whatsapp = String(profile?.whatsapp_number ?? '').trim();
  const sms = String(profile?.sms_number ?? '').trim();
  return !!(whatsapp || sms);
}
