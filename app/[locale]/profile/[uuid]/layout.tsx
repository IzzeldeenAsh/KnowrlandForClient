import { Metadata } from 'next'

interface ProfileLayoutProps {
  children: React.ReactNode
  params: Promise<{
    uuid: string
    locale: string
  }>
}

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

async function getProfileData(uuid: string, locale: string): Promise<ProfileData | null> {
  try {
    // Try insighter API first
    let response = await fetch(
      `https://api.insightabusiness.com/api/platform/insighter/profile/${uuid}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': locale,
        },
        cache: 'no-store', // Always fetch fresh data for metadata
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.data;
    }

    // Fall back to company API
    response = await fetch(
      `https://api.insightabusiness.com/api/platform/company/profile/${uuid}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': locale,
        },
        cache: 'no-store',
      }
    );

    if (response.ok) {
      const data = await response.json();
      // Transform company data to ProfileData format
      const companyProfileData: ProfileData = {
        uuid: data.data.uuid,
        name: data.data.legal_name,
        first_name: '',
        last_name: '',
        bio: data.data.about_us,
        profile_photo_url: data.data.logo,
        roles: ['company'],
        company: {
          legal_name: data.data.legal_name,
          logo: data.data.logo,
          uuid: data.data.uuid,
        },
      };
      return companyProfileData;
    }

    return null;
  } catch (error) {
    console.error('Error fetching profile data for metadata:', error);
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ uuid: string; locale: string }> }
): Promise<Metadata> {
  const { uuid, locale } = await params;
  const profileData = await getProfileData(uuid, locale);

  if (!profileData) {
    return {
      title: 'Profile Not Found - Insighta',
      description: 'The requested profile could not be found.',
    };
  }

  const isCompany = profileData.roles.includes('company');
  const isInsighter = profileData.roles.includes('insighter');

  // Determine the profile name and image
  const profileName = isCompany
    ? profileData.company?.legal_name || profileData.name
    : `${profileData.first_name} ${profileData.last_name}`.trim() || profileData.name;

  const profileImage = isCompany
    ? profileData.company?.logo
    : profileData.profile_photo_url;

  // Generate description
  const roleText = locale === 'ar'
    ? (isCompany ? 'شركة' : 'خبير')
    : (isCompany ? 'Company' : 'Insighter');

  const platformText = locale === 'ar' ? 'انسايتا' : 'Insighta';

  const description = profileData.bio
    ? `${profileData.bio.slice(0, 155)}...`
    : locale === 'ar'
      ? `تحقق من ملف ${profileName} الشخصي على ${platformText} - ${roleText} متخصص في تقديم المعرفة والخدمات الاستشارية`
      : `Check out ${profileName}'s profile on ${platformText} - ${roleText} specialized in providing knowledge and consulting services`;

  const title = locale === 'ar'
    ? `${profileName} - ملف شخصي | ${platformText}`
    : `${profileName} - Profile | ${platformText}`;

  // Construct the profile URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://insightabusiness.com';
  const profileUrl = `${baseUrl}/${locale}/profile/${uuid}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: profileUrl,
      siteName: platformText,
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      type: 'profile',
      images: profileImage ? [
        {
          url: profileImage,
          width: 400,
          height: 400,
          alt: `${profileName}'s profile picture`,
          type: 'image/jpeg',
        },
      ] : [
        {
          url: `${baseUrl}/api/og-image?name=${encodeURIComponent(profileName)}&type=${roleText}`,
          width: 1200,
          height: 630,
          alt: `${profileName}'s profile`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: profileImage ? [profileImage] : [`${baseUrl}/api/og-image?name=${encodeURIComponent(profileName)}&type=${roleText}`],
      creator: '@insightabusiness_com',
      site: '@insightabusiness_com',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
    alternates: {
      canonical: profileUrl,
      languages: {
        'ar-AE': `${baseUrl}/ar/profile/${uuid}`,
        'en-US': `${baseUrl}/en/profile/${uuid}`,
      },
    },
    other: {
      'profile:first_name': isInsighter ? profileData.first_name : '',
      'profile:last_name': isInsighter ? profileData.last_name : '',
      'profile:username': profileName,
      'og:image:alt': `${profileName}'s profile picture`,
    },
  };
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return <>{children}</>;
}