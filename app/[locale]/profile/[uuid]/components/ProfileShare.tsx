'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';

interface ProfileData {
  uuid: string;
  name: string;
  first_name: string;
  last_name: string;
  profile_photo_url: string | null;
  bio: string | null;
  roles: string[];
  company?: {
    legal_name: string;
    logo: string;
    uuid?: string;
  };
}

interface ProfileShareProps {
  profileData: ProfileData;
  enterpriseType?: string | null;
  locale?: string;
}

const ProfileShare = ({ profileData, enterpriseType, locale }: ProfileShareProps) => {
  const params = useParams();
  const currentLocale = locale || params.locale as string || 'en';
  const isRTL = currentLocale === 'ar';

  // Share Modal state
  const [shareModalOpened, setShareModalOpened] = useState(false);
  const [customShareMessage, setCustomShareMessage] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const shareTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (shareModalOpened) {
      shareTextareaRef.current?.focus();
    }
  }, [shareModalOpened]);

  // Translations
  const translations = {
    share: isRTL ? 'مشاركة' : 'Share',
    shareProfile: isRTL ? 'شارك الملف الشخصي' : 'Share Profile',
    customShareMessage: isRTL ? 'أضف رسالة شخصية' : 'Add a Personal Message',
    shareMessageHint: isRTL ? 'أضف ملاحظة أو رسالة لتخصيص المشاركة...' : 'Add a note or message to personalize your share...',
    characterCount: isRTL ? 'عدد الأحرف' : 'Character Count',
    close: isRTL ? 'إغلاق' : 'Close',
    copyLink: isRTL ? 'نسخ الرابط' : 'Copy Link',
    linkCopied: isRTL ? 'تم نسخ الرابط!' : 'Link Copied!',
    checkOutProfile: isRTL ? 'تحقق من هذا الملف الشخصي: ' : 'Check out this profile: ',
    viewProfile: isRTL ? 'عرض الملف الشخصي على' : 'View profile on',
    foresighta: isRTL ? 'فورسايتا' : 'Foresighta'
  };

  // Share functionality
  const handleShare = () => {
    // Set default message based on profile type
    const userName = enterpriseType === "insighter"
      ? `${profileData.first_name} ${profileData.last_name}`.trim()
      : profileData.company?.legal_name || profileData.name;

    const defaultMessage = `${translations.checkOutProfile}${userName}`;
    setCustomShareMessage(defaultMessage);
    setShareModalOpened(true);
  };

  const shareToSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const message = encodeURIComponent(customShareMessage);
    const title = encodeURIComponent(document.title);

    let shareUrl = '';

    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${message}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${message}%20${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShareModalOpened(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <>
      {/* Share Button */}
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg hover:from-blue-600 hover:to-teal-500 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg font-medium text-sm"
        onClick={handleShare}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <span>{translations.share}</span>
        <svg
          className="w-4 h-4"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z" />
        </svg>
      </button>

      {/* Share Modal */}
      {shareModalOpened && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShareModalOpened(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{translations.shareProfile}</h2>
              <button
                onClick={() => setShareModalOpened(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Profile Preview */}
            <div className="mb-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center gap-3">
                {/* Profile Image */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-600">
                  {(enterpriseType === "insighter" ? profileData.profile_photo_url : profileData.company?.logo) ? (
                    <img
                      src={enterpriseType === "insighter" ? profileData.profile_photo_url! : profileData.company!.logo}
                      alt={enterpriseType === "insighter" ? `${profileData.first_name} ${profileData.last_name}` : profileData.company!.legal_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white font-semibold text-sm">
                      {enterpriseType === "insighter"
                        ? `${profileData.first_name?.charAt(0) || ''}${profileData.last_name?.charAt(0) || ''}`
                        : profileData.company?.legal_name?.charAt(0) || profileData.name?.charAt(0) || ''
                      }
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {enterpriseType === "insighter"
                      ? `${profileData.first_name} ${profileData.last_name}`.trim()
                      : profileData.company?.legal_name || profileData.name
                    }
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {translations.viewProfile} {translations.foresighta}
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Message Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {translations.customShareMessage}
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                value={customShareMessage}
                onChange={(e) => setCustomShareMessage(e.target.value)}
                placeholder={translations.shareMessageHint}
                ref={shareTextareaRef}
              />
            </div>

            {/* Character Count */}
            <div className="mb-6">
              <small className="text-gray-500 dark:text-gray-400">
                {translations.characterCount}: {customShareMessage.length}
              </small>
            </div>

            {/* Social Media Buttons */}
            <div className="flex justify-center gap-3 mb-6">
              {/* Facebook */}
              <button
                className="w-12 h-12 bg-[#2196F3] hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
                onClick={() => shareToSocial('facebook')}
                title="Share on Facebook"
              >
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 9.5576C19 4.27831 14.7476 0 9.5 0C4.25244 0 0 4.27712 0 9.5576C0 14.3275 3.47344 18.2816 8.01562 18.9988V12.3195H5.60263V9.5564H8.01562V7.45109C8.01562 5.05605 9.4335 3.73328 11.6042 3.73328C12.6433 3.73328 13.7311 3.91968 13.7311 3.91968V6.2708H12.5329C11.3525 6.2708 10.9844 7.00818 10.9844 7.76338V9.5576H13.6194L13.1979 12.3207H10.9844V19C15.5266 18.2816 19 14.3275 19 9.5576Z" fill="white"/>
                </svg>
              </button>

              {/* Twitter */}
              <button
                className="w-12 h-12 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors"
                onClick={() => shareToSocial('twitter')}
                title="Share on Twitter"
              >
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.0248 3.65625H16.1725L11.4815 9.03014L17 16.3438H12.6801L9.29422 11.9092L5.4246 16.3438H3.27379L8.29031 10.5947L3 3.65625H7.42938L10.4867 7.70954L14.0248 3.65625ZM13.2703 15.0567H14.4598L6.7814 4.8762H5.50369L13.2703 15.0567Z" fill="white"/>
                </svg>
              </button>

              {/* LinkedIn */}
              <button
                className="w-12 h-12 bg-[#0077b5] hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-colors"
                onClick={() => shareToSocial('linkedin')}
                title="Share on LinkedIn"
              >
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_2202_2564)">
                    <path d="M17.48 0H1.6233C0.756425 0 0 0.62344 0 1.47963V17.3719C0 18.2329 0.756425 19 1.6233 19H17.4752C18.3469 19 19 18.2281 19 17.3719V1.47963C19.0036 0.62344 18.3457 0 17.48 0ZM5.88881 15.8377H3.16705V7.37436H5.88881V15.8377ZM4.62175 6.08829H4.60274C3.73112 6.08829 3.16705 5.43994 3.16705 4.62769C3.16705 3.80119 3.74656 3.16825 4.63719 3.16825C5.52781 3.16825 6.07286 3.79644 6.09186 4.62769C6.09186 5.43994 5.52781 6.08829 4.62175 6.08829ZM15.8365 15.8377H13.1147V11.21C13.1147 10.1009 12.7181 9.34442 11.7337 9.34442C10.9808 9.34442 10.5355 9.85387 10.3384 10.3491C10.2647 10.5272 10.2446 10.7694 10.2446 11.0176V15.8377H7.5228V7.37436H10.2446V8.55237C10.6412 7.98831 11.2599 7.17606 12.6991 7.17606C14.4863 7.17606 15.8377 8.35407 15.8377 10.8929L15.8365 15.8377Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2202_2564">
                      <rect width="19" height="19" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>

              {/* WhatsApp */}
              <button
                className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors"
                onClick={() => shareToSocial('whatsapp')}
                title="Share on WhatsApp"
              >
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1537 2.76093C14.3773 0.979684 12.0108 0 9.49584 0C4.3056 0 0.0807459 4.22394 0.0807459 9.41569C0.0807459 11.0734 0.512968 12.6944 1.33585 14.1229L0 19L4.99193 17.689C6.36578 18.4395 7.91419 18.8338 9.49109 18.8338H9.49584C14.6825 18.8338 19 14.6098 19 9.41806C18.9988 6.90412 17.9301 4.54218 16.1537 2.76093ZM9.49584 17.2484C8.08755 17.2484 6.71014 16.8708 5.50966 16.1583L5.22586 15.9885L2.26561 16.7651L3.05406 13.8771L2.86763 13.5803C2.08275 12.3334 1.67189 10.8953 1.67189 9.41569C1.67189 5.10269 5.18311 1.59125 9.50059 1.59125C11.5917 1.59125 13.5545 2.40588 15.0304 3.8855C16.5064 5.36513 17.4136 7.32925 17.41 9.42044C17.4088 13.737 13.8086 17.2484 9.49584 17.2484ZM13.7872 11.3869C13.5545 11.2682 12.3967 10.6994 12.1794 10.6234C11.9633 10.5426 11.8066 10.5046 11.6498 10.7421C11.4931 10.9796 11.0431 11.5057 10.9029 11.6672C10.7676 11.8239 10.6275 11.8453 10.3935 11.7266C9.01137 11.0354 8.10299 10.4928 7.19224 8.92763C6.95 8.51201 7.43447 8.54169 7.88332 7.64276C7.95932 7.48601 7.92131 7.35062 7.86194 7.23187C7.80257 7.11312 7.33235 5.95532 7.13642 5.48507C6.94525 5.02669 6.75051 5.09081 6.60683 5.0825C6.47147 5.07419 6.31473 5.07418 6.1568 5.07418C5.99887 5.07418 5.74595 5.13356 5.52865 5.36631C5.31254 5.60381 4.70577 6.17263 4.70577 7.33044C4.70577 8.48825 5.55002 9.60807 5.66402 9.76482C5.78276 9.92157 7.32167 12.2966 9.68464 13.319C11.1772 13.9638 11.7626 14.0184 12.5095 13.908C12.9631 13.8403 13.9 13.3392 14.0959 12.7882C14.2907 12.2372 14.2907 11.7658 14.2313 11.6684C14.1779 11.5603 14.0199 11.5009 13.7872 11.3869Z" fill="white"/>
                </svg>
              </button>
            </div>

            {/* Copy Link Button */}
            <button
              className={`w-full py-2 px-4 rounded-lg transition-colors font-medium ${
                linkCopied
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-gray-300'
              }`}
              onClick={handleCopyLink}
            >
              {linkCopied ? translations.linkCopied : translations.copyLink}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileShare;