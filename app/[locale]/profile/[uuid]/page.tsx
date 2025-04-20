'use client';

import Footer from '@/components/ui/footer';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Stripes from "@/public/images/stripes-dark.svg";
import { Tabs } from '@mantine/core';
import { useParams } from 'next/navigation';
import { IconBrandFacebook, IconBrandX, IconBrandYoutube, IconBrandLinkedin, IconBrandInstagram, IconBrandFacebookFilled, IconBrandLinkedinFilled, IconBrandInstagramFilled, IconRosetteDiscountCheckFilled, IconDatabase, IconBulb, IconClearAll, IconFileReport, IconBook, IconSchool, IconFilter } from '@tabler/icons-react';
import { GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline';
import KnowledgeGrid, { KnowledgeItem } from '@/app/[locale]/topic/[id]/[slug]/KnowledgeGrid';
import NewCertificationIcon from '@/app/components/icons/NewCertificationIcon';
import FacebookIcon from '@/public/file-icons/facebook';
import YoutubeIcon from '@/public/file-icons/youtube';
import LinkedinIcon from '@/public/file-icons/linkedin';
import InstagramIcon from '@/public/file-icons/instagram';
import WhatsappIcon from '@/public/file-icons/whatsapp';
import { useTranslations } from 'next-intl';

interface SocialLink {
  id: number;
  link: string;
  type: string;
}

interface Industry {
  id: number;
  name: string;
  slug: string;
  weight: number;
}

interface ConsultingField {
  id: number;
  name: string;
  names: {
    en: string;
    ar: string;
  };
}

interface Certification {
  id: number;
  name: string;
  type: string;
  url: string;
}

interface Company {
  legal_name: string;
  website: string;
  about_us: string;
  register_document: string;
  logo: string;
  address: string;
  verified: boolean;
  social: SocialLink[];
}

interface ProfileData {
  uuid: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
  profile_photo_url: string | null;
  country_id: number | null;
  country: string | null;
  bio: string | null;
  certifications: Certification[];
  industries: Industry[];
  consulting_field: ConsultingField[];
  social: SocialLink[];
  company?: Company;
}

// Updated Knowledge interface to match API response
interface KnowledgeApiItem {
  slug: string;
  type: string;
  title: string;
  description: string;
  total_price: string;
  published_at: string;
}

interface KnowledgeResponse {
  data: KnowledgeApiItem[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [knowledgeData, setKnowledgeData] = useState<KnowledgeResponse | null>(null);
  const [knowledgePage, setKnowledgePage] = useState(1);
  const [loadingKnowledge, setLoadingKnowledge] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const params = useParams();
  const uuid = params.uuid as string;
  const locale = params.locale as string;
  const isRTL = locale === 'ar';
  const t = useTranslations('ProfilePage');
  const userProfileT = useTranslations('UserProfile');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`https://api.foresighta.co/api/platform/insighter/profile/${uuid}`, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": locale
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (uuid) {
      fetchProfileData();
    }
  }, [uuid, locale]);

  useEffect(() => {
    const fetchKnowledgeData = async () => {
      if (!uuid) return;
      
      setLoadingKnowledge(true);
      try {
        let url = `https://api.foresighta.co/api/platform/insighter/knowledge/${uuid}?page=${knowledgePage}&per_page=12`;
        
        if (selectedType) {
          url += `&type=${selectedType}`;
        }
        
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": locale
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch knowledge data');
        }
        
        const data = await response.json();
        setKnowledgeData(data);
      } catch (error) {
        console.error('Error fetching knowledge data:', error);
      } finally {
        setLoadingKnowledge(false);
      }
    };

    fetchKnowledgeData();
  }, [uuid, locale, knowledgePage, selectedType]);

  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'facebook':
        return <FacebookIcon />;
      case 'x':
      case 'twitter':
        return <IconBrandX className="text-blue-400" size={24} />;
      case 'youtube':
        return <YoutubeIcon />;
      case 'linkedin':
        return <LinkedinIcon/>;
      case 'instagram':
        return <InstagramIcon />;
      default:
        return null;
    }
  };

  const isCompany = profileData?.roles.includes('company');
  const isInsighter = profileData?.roles.includes('insighter');
  const isCompanyInsighter = profileData?.roles.includes('company-insighter');

  // Function to handle pagination
  const handlePageChange = (page: number) => {
    setKnowledgePage(page);
  };

  // Convert API knowledge items to the format expected by KnowledgeGrid
  const formatKnowledgeItems = (): KnowledgeItem[] => {
    if (!knowledgeData || !profileData) return [];
    
    return knowledgeData.data.map(item => ({
      ...item,
      insighter: {
        name: profileData.name,
        profile_photo_url: profileData.profile_photo_url,
        roles: profileData.roles
      }
    }));
  };

  // Function to format published date
  const formatPublishedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter types for knowledge
  const knowledgeTypes = [
    { id: null, label: 'All', icon: <IconClearAll size={18} stroke={2.5} />, color: 'blue' },
    { id: 'data', label: 'Data', icon: <IconDatabase size={18} stroke={2.5} />, color: 'blue' },
    { id: 'insight', label: 'Insight', icon: <IconBulb size={18} stroke={2.5} />, color: 'blue' },
    { id: 'report', label: 'Report', icon: <IconFileReport size={18} stroke={2.5} />, color: 'blue' },
    { id: 'manual', label: 'Manual', icon: <IconBook size={18} stroke={2.5} />, color: 'blue' },
    { id: 'course', label: 'Course', icon: <IconSchool size={18} stroke={2.5} />, color: 'blue' },
  ];

  const handleTypeChange = (type: string | null) => {
    setSelectedType(type);
    setKnowledgePage(1); // Reset to page 1 when changing filter
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Decorative elements */}
      <div className="relative z-0 w-full overflow-hidden">
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 transform hidden md:block"
          style={{ left: '28%', top: '5%' }}
          aria-hidden="true"
        >
          <Image
            className="max-w-none opacity-30 dark:opacity-20"
            src={Stripes}
            width={768}
            height={768}
            style={{ width: 'auto', height: 'auto' }}
            alt="Stripes"
            priority
          />
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-radial from-blue-100/40 to-transparent dark:from-blue-900/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-gradient-radial from-pink-100/30 to-transparent dark:from-pink-900/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : profileData ? (
        <div className="w-full z-10" data-aos="fade-up">
          {/* Profile Header - Card Style */}
          <div className="bg-white dark:bg-slate-800 overflow-hidden mb-4 pb-10">
            {/* Banner */}
            <div className="h-40  dark:from-blue-700 dark:to-indigo-800 relative">
              <div
                className="pointer-events-none absolute z-10 -translate-x-1/2 transform hidden md:block"
                style={{ left: '28%' }}
                aria-hidden="true"
              >
                <Image
                  className="max-w-none opacity-50"
                  src={Stripes}
                  width={768}
                  height={768}
                  style={{ width: 'auto', height: 'auto' }}
                  alt="Stripes"
                  priority
                />
              </div>
            </div>
            
            {/* Profile Container */}
            <div className="max-w-6xl z-20 mx-auto px-4 sm:px-6 relative -mt-20">
              {/* Profile Layout - Image, Info, Stats */}
              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg bg-white dark:bg-slate-700">
                    {(isCompany || isCompanyInsighter) && profileData.company?.logo ? (
                      <Image
                        src={profileData.company.logo}
                        alt={profileData.company?.legal_name || profileData.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : profileData.profile_photo_url ? (
                      <Image
                        src={profileData.profile_photo_url}
                        alt={profileData.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-400 dark:text-slate-400">
                          {profileData.first_name?.charAt(0) || ''}
                          {profileData.last_name?.charAt(0) || ''}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row h-full justify-between items-center">
                    <div>
                      {/* Name and Badges */}
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        {isCompany && (    <h1 className="text-3xl font-bold">{profileData.company?.legal_name}</h1> )}
                        {isInsighter && (    <h1 className="text-3xl font-bold">{profileData.first_name || ''} {profileData.last_name || ''}</h1> )}
                        {isCompanyInsighter && (    <h1 className="text-3xl font-bold">{profileData.first_name || ''} {profileData.last_name || ''}</h1> )}
                        
                     

                        <IconRosetteDiscountCheckFilled className="w-6 h-6 text-blue-500" />
                        {isCompany && (
                    
                          <span className="bg-amber-100 font-bold text-yellow-500 text-xs px-3 py-1 rounded-full inline-flex items-center">
                          {userProfileT('company')}
                        </span>
                        )}
                        {isInsighter && (
                          <span className="bg-blue-100 text-blue-500 font-bold uppercase text-xs px-3 py-1 rounded-full inline-flex items-center">
                            {userProfileT('insighter')}
                          </span>
                        )}
                        {isCompanyInsighter && (
                          <span className="bg-amber-100 font-bold text-yellow-500 uppercase text-xs px-3 py-1 rounded-full inline-flex items-center">
                            {userProfileT('companyInsighter')}
                          </span>
                        )}
                      </div>
                       
                      {/* Title/Role & Location */}
                      <div className="mb-4">
                        <p className="text-md font-bold text-gray-600 dark:text-gray-300">
                          {isCompany ? 
                            `${profileData.first_name || ''} ${profileData.last_name || ''}` : ''}
                        </p>
                          {/* 5-Star Rating */}
                          <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg 
                              key={star} 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-5 w-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">(4.0)</span>
                        </div>
                       
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        <button className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-sky-400 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition transform hover:translate-y-[-2px]">
                          {t('scheduleAMeeting')}
                        </button>
                        <button className="px-4 py-2 text-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-lg font-medium border border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 shadow-sm hover:shadow-md transition transform hover:translate-y-[-2px]">
                          {t('follow')}
                        </button>
                      </div>
                    </div>
                    
                    {/* Stats Section */}
                    <div className={`flex justify-center gap-6 mt-8`}>

                      <div className="text-start bg-gradient-to-br from-white to-emerald-50 dark:from-slate-700 dark:to-slate-600 p-5 rounded-xl  hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-600 group">
                        <div className="flex items-center mb-3">
                          <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mr-3 group-hover:scale-110 transition-transform">
                            <IconFileReport 
                              size={24} 
                              className="text-emerald-500 dark:text-emerald-400" 
                              stroke={2} 
                            />
                          </div>
                          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-300" dangerouslySetInnerHTML={{ __html: t('publishedKnowledge') }} />
                        </div>
                        <p className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 font-bold text-5xl">{knowledgeData?.meta.total || 0}</p>
                      
                      </div>
                      <div className="text-start bg-gradient-to-br from-white to-blue-50 dark:from-slate-700 dark:to-slate-600 p-5 rounded-xl  hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-600 group">
                        <div className="flex items-center mb-3">
                          <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3 group-hover:scale-110 transition-transform">
                            <IconSchool 
                              size={24} 
                              className="text-blue-500 dark:text-blue-400" 
                              stroke={2} 
                            />
                          </div>
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-300" dangerouslySetInnerHTML={{ __html: t('consultingSessions') }} />
                        </div>
                        <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 font-bold text-5xl">30</p>
                       
                      </div>
               
                 
                    </div>
                  </div>
                </div>
              </div>
              
         
            </div>
          </div>

          {/* Tabs with enhanced styling */}
          <div className="bg-white max-w-6xl mx-auto dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="100">
            <Tabs defaultValue="knowledge" styles={{
              tab: {
                '&[data-active]': {
                  borderColor: '#3b82f6',
                  color: '#3b82f6',
                  fontWeight: 'bold'
                },
                '&:hover': {
                  backgroundColor: '#f8fafc',
                  borderColor: '#e2e8f0'
                }
              }
            }}>
              <Tabs.List className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/80">
                <Tabs.Tab
                  value="knowledge"
                  className="text-base font-medium px-8 py-4 transition"
                >
                  {t('knowledge')}
                </Tabs.Tab>
                <Tabs.Tab
                  value="about"
                  className="text-base font-medium px-8 py-4 transition"
                >
                  {t('aboutMe')}
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="knowledge" className="py-8 px-6 md:px-10">
                {/* Knowledge Type Filters */}
                <div className="mb-10 flex items-center flex-wrap gap-2 justify-end">
                  <div className="mr-1 opacity-60 flex items-center">
                    <IconFilter size={16} className="mr-1" />
                    <span className="text-xs font-medium">Filter by:</span>
                  </div>
                  {knowledgeTypes.map((type) => {
                    // Define the color for non-selected items
                    const iconColor = (() => {
                      switch(type.color) {
                        case 'blue': return '#3b82f6';
                        case 'amber': return '#f59e0b';
                        case 'emerald': return '#10b981';
                        case 'indigo': return '#6366f1';
                        case 'purple': return '#9333ea';
                        case 'rose': return '#e11d48';
                        default: return '#3b82f6';
                      }
                    })();
                    
                    return (
                      <button
                        key={type.id || 'all'}
                        onClick={() => handleTypeChange(type.id)}
                        className={`flex text-xs items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                          selectedType === type.id 
                            ? 'bg-blue-500 text-white shadow-sm' 
                            : 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-700/80 dark:hover:bg-slate-600 dark:text-white shadow-sm'
                        }`}
                      >
                        <span className={`flex text-xs items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span>
                            {selectedType === type.id 
                              ? React.cloneElement(type.icon, { color: "white", stroke: 2.5 })
                              : React.cloneElement(type.icon, { color: iconColor, stroke: 2.5 })
                            }
                          </span>
                          <span className={`${isRTL ? 'mr-2' : 'ml-2'} font-medium text-xs`}>{type.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {loadingKnowledge ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : knowledgeData && knowledgeData.data.length > 0 ? (
                  <div>
                    <KnowledgeGrid 
                      knowledge={formatKnowledgeItems()}
                      topicName={profileData?.name || ''}
                      showHeader={false}
                      colNumbers={3}
                      locale={locale}
                      showInsighter={false}
                    />
                    
                    {/* Pagination */}
                    {knowledgeData.meta.last_page > 1 && (
                      <div className="flex justify-center mt-10">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handlePageChange(knowledgeData.meta.current_page - 1)}
                            disabled={!knowledgeData.links.prev}
                            className={`px-4 py-2 rounded-md ${!knowledgeData.links.prev ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-200`}
                          >
                            {isRTL ? t('next') : t('previous')}
                          </button>
                          
                          {knowledgeData.meta.links.filter(link => !link.label.includes('Previous') && !link.label.includes('Next')).map((link, index) => {
                            if (link.label === '...') {
                              return (
                                <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-700">
                                  ...
                                </span>
                              );
                            }
                            return (
                              <button
                                key={`page-${link.label}`}
                                onClick={() => link.url && handlePageChange(parseInt(link.label))}
                                className={`px-4 py-2 rounded-md border ${link.active ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'}`}
                              >
                                {link.label}
                              </button>
                            );
                          })}
                          
                          <button
                            onClick={() => handlePageChange(knowledgeData.meta.current_page + 1)}
                            disabled={!knowledgeData.links.next}
                            className={`px-4 py-2 rounded-md ${!knowledgeData.links.next ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-200`}
                          >
                            {isRTL ? t('previous') : t('next')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl text-center">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-full mb-4 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">{t('noKnowledgeItems')}</h3>
                    <p className="text-gray-500">{t('contentUpdateSoon')}</p>
                  </div>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="about" className="py-8 px-6 md:px-10">
                <div className="prose max-w-none dark:prose-invert">
                   
                    {/* Company Information (if applicable) with better styling */}
                    {isCompany && profileData.company && (
                    <div className="bg-gray-50 dark:bg-slate-700/30 rounded-xl p-4" data-aos="fade-up" data-aos-delay="400">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'} text-blue-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {t('companyInfo')}
                      </h3>
           
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left column (About) - Takes 2/3 of space */}
                        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm h-full">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('aboutUs')}</p>
                          <p className="whitespace-pre-line">{profileData.company.about_us}</p>
                        </div>
                        
                        {/* Right column (Details) - Takes 1/3 of space */}
                        <div className="flex flex-col gap-4">
                          {/* Website */}
                          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('websiteLabel')}</p>
                            <p className="font-medium m-0">{profileData.company.website}</p>
                          </div>
 
                           {/* Social Media */}
                           {profileData.company.social && profileData.company.social.length > 0 && (
                             <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                               <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('socialMedia')}</p>
                               <div className="flex gap-3">
                                 {profileData.company.social.map((social) => (
                                   <a
                                     key={social.id}
                                     href={social.link}
                                     target="_blank"
                                     rel="noopener noreferrer"
                                     className="text-xl hover:opacity-80 transition transform hover:scale-110"
                                   >
                                     {getSocialIcon(social.type)}
                                   </a>
                                 ))}
                               </div>
                             </div>
                           )}
                                  {/* Country */}
                        {profileData.country && (
                          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                            <div className="flex items-center">
                              <GlobeAsiaAustraliaIcon className={`w-5 h-5 text-gray-500 dark:text-gray-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{t('country')}</p>
                                <p className="font-medium">{profileData.country}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                      
                             {/* Company Address */}
                        {(isCompany && profileData.company?.address) && (
                          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-500 dark:text-gray-400 ${isRTL ? 'ml-2' : 'mr-2'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{t('location')}</p>
                                <p className="font-medium">{profileData.company?.address}</p>
                              </div>
                            </div>
                          </div>
                        )}
                          </div>
                        </div>
                    </div>
                  )}
                   {/* Industries and Consulting Fields in Two Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* Industries Section */}
                    {profileData.industries && profileData.industries.length > 0 && (
                      <div data-aos="fade-up" data-aos-delay="100">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'} text-blue-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {t('industries')}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {profileData.industries.map((industry) => (
                            <span
                              key={industry.id}
                              className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition transform hover:translate-y-[-2px] hover:shadow"
                            >
                              {industry.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Consulting Fields Section */}
                    {profileData.consulting_field && profileData.consulting_field.length > 0 && (
                      <div data-aos="fade-up" data-aos-delay="200">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'} text-purple-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {t('consultingFields')}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {profileData.consulting_field.map((field) => (
                            <span
                              key={field.id}
                              className="bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition transform hover:translate-y-[-2px] hover:shadow"
                            >
                              {locale === 'ar' && field.names?.ar ? field.names.ar : field.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Certifications Section with better cards */}
                  {profileData.certifications && profileData.certifications.length > 0 && (
                    <div className="mb-10" data-aos="fade-up" data-aos-delay="300">
                      <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'} text-green-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        {t('certifications')}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profileData.certifications.map((cert, index) => (
                          <a
                            key={cert.id}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-lg transition duration-300 transform hover:translate-y-[-4px]"
                            data-aos="fade-up"
                            data-aos-delay={100 * (index % 3 + 1)}
                          >
                            <div className="flex flex-col items-center">
                              <div>
                                <NewCertificationIcon width={64} height={64} />
                              </div>
                              <div className="text-center">
                                <p className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset capitalize">
                                  {cert.type.replace(/_/g, ' ')}
                                </p>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Bio Section with Contact Info */}
                  <div className="bg-gray-50 dark:bg-slate-700/30 p-6 rounded-xl mb-10 mt-10" data-aos="fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'} text-blue-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {t('bio')}
                        </h3>
                        {profileData.bio ? (
                          <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{profileData.bio}</p>
                        ) : (
                          <p className="text-gray-500 italic">{t('noBioAvailable')}</p>
                        )}
                      </div>
                      
                      {/* Contact Information in Small Rows */}
                      <div className="flex flex-col gap-4">
                 
                        
                        {/* Social Media */}
                        {profileData.social && profileData.social.length > 0 && (
                          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('socialMedia')}</p>
                            <div className="flex flex-wrap gap-3">
                              {profileData.social.map((social) => (
                                <a
                                  key={social.id}
                                  href={social.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xl hover:opacity-80 transition transform hover:scale-110"
                                >
                                  {getSocialIcon(social.type)}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                 
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-full mb-4 shadow-md inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300">{t('profileNotFound')}</p>
          </div>
        </div>
      )}

      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}
