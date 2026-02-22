import { Metadata } from 'next';
import { publicBaseUrl } from '@/app/config';

export interface KnowledgeMetadata {
  id?: number;
  type: string;
  title: string;
  slug: string;
  description: string;
  language: string;
  total_price: string;
  published_at: string;
  countries?: Array<{
    id: number;
    name: string;
    flag: string;
  }>;
  insighter: {
    name: string;
    profile_photo_url: string;
    uuid: string;
    roles: string[];
    company?: {
      legal_name: string;
      logo: string;
      uuid: string;
    };
  };
  review?: Array<{
    id: number;
    rate: number;
    comment: string;
    user_name: string;
    created_date: string;
  }>;
  documents?: Array<{
    id: number;
    file_name: string;
    file_size: number;
    file_extension: string;
    price: string;
  }>;
}

export function generateKnowledgeMetadata(
  knowledge: KnowledgeMetadata,
  locale: string,
  type: string,
  slug: string
): Metadata {
  const isRTL = locale === 'ar';
  const baseUrl = 'https://insightabusiness.com';
  const defaultSocialImage = 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1761651021/drilldown_l7cdf2.jpg';
  let metadataBase: URL | undefined;

  try {
    metadataBase = new URL(baseUrl);
  } catch (error) {
    console.error('Invalid base URL provided, falling back to default.', error);
    metadataBase = new URL('https://insightabusiness.com');
  }

  const currentUrl = `${baseUrl}/${locale}/knowledge/${type}/${slug}`;
  
  // Calculate average rating
  const avgRating = knowledge.review && knowledge.review.length > 0
    ? knowledge.review.reduce((sum, review) => sum + Math.min(5, review.rate), 0) / knowledge.review.length
    : 0;

  // Determine if content is free (needed for structured data)
  const isFree = knowledge.total_price === '0' || parseFloat(String(knowledge.total_price)) === 0;

  // Generate rich title
  const typeTranslation = isRTL ? {
    'data': 'بيانات',
    'insight': 'رؤية',
    'manual': 'دليل',
    'report': 'تقرير',
    'course': 'دورة'
  }[knowledge.type] || knowledge.type : knowledge.type.charAt(0).toUpperCase() + knowledge.type.slice(1);

  const title = isRTL
    ? `${knowledge.title} | ${typeTranslation} | Insighta`
    : `${knowledge.title} | ${typeTranslation} | Insighta`;

  // Generate rich description
  const authorName = knowledge.insighter.company?.legal_name || knowledge.insighter.name;
  const languageText = isRTL 
    ? (knowledge.language?.toLowerCase() === 'english' ? 'الإنجليزية' : 'العربية')
    : knowledge.language;
  
  const ratingText = avgRating > 0 && knowledge.review && knowledge.review.length > 0
    ? isRTL 
      ? `تقييم ${avgRating.toFixed(1)}/5 من ${knowledge.review.length} مراجعة`
      : `${avgRating.toFixed(1)}/5 rating from ${knowledge.review.length} reviews`
    : '';

  // Enhanced description with more context
  const countryList = knowledge.countries && knowledge.countries.length > 0 
    ? knowledge.countries.slice(0, 3).map(c => c.name).join(', ')
    : '';
  const countryText = countryList 
    ? (isRTL ? `للدول: ${countryList}` : `for ${countryList}`)
    : '';
  
  const priceText = isFree 
    ? (isRTL ? 'مجاني بالكامل' : 'Available for free')
    : (isRTL ? `بسعر ${knowledge.total_price} دولار` : `Price: $${knowledge.total_price}`);
  
  const documentsText = knowledge.documents && knowledge.documents.length > 0
    ? (isRTL 
        ? `${knowledge.documents.length} ${knowledge.documents.length === 1 ? 'مستند' : 'مستندات'}`
        : `${knowledge.documents.length} ${knowledge.documents.length === 1 ? 'document' : 'documents'}`)
    : '';

  const description = isRTL
    ? `اكتشف ${knowledge.title} - ${typeTranslation} ${countryText ? countryText + ' ' : ''}من ${authorName}. ${documentsText ? documentsText + ' ' : ''}${ratingText ? ratingText + '. ' : ''}${priceText}. ${knowledge.description.substring(0, 100)}... احصل على رؤى قيمة ومعرفة متخصصة على منصة Insighta.`
    : `Discover ${knowledge.title} - ${typeTranslation}${countryText ? ' ' + countryText : ''} by ${authorName}. ${documentsText ? documentsText + ' ' : ''}${ratingText ? ratingText + '. ' : ''}${priceText}. ${knowledge.description.substring(0, 120)}... Get valuable insights and expert knowledge on Insighta platform.`;

  // Generate comprehensive keywords
  const typeKeywords = {
    'data': ['data analysis', 'business data', 'market data', 'statistical data'],
    'insight': ['business insights', 'industry insights', 'market insights', 'strategic insights'],
    'manual': ['business manual', 'how-to guide', 'instruction manual', 'best practices'],
    'report': ['business report', 'industry report', 'market report', 'research report'],
    'course': ['online course', 'business course', 'training course', 'educational course'],
    'statistic': ['statistics', 'market statistics', 'industry statistics', 'data statistics']
  };

  const keywords = [
    knowledge.type,
    knowledge.title,
    authorName,
    knowledge.language,
    'knowledge',
    'insights',
    'expertise',
    'business intelligence',
    'insighta',
    'business platform',
    ...(typeKeywords[knowledge.type as keyof typeof typeKeywords] || []),
    ...(knowledge.countries && knowledge.countries.length > 0 ? knowledge.countries.map(country => `${country.name} market`) : []),
    ...(knowledge.countries && knowledge.countries.length > 0 ? knowledge.countries.map(country => `${country.name} business`) : []),
    ...(knowledge.documents && knowledge.documents.length > 0 ? knowledge.documents.map(doc => `${doc.file_extension} file`) : []),
    ...(knowledge.review && knowledge.review.length > 0 ? ['reviewed', 'rated', 'verified'] : []),
    ...(isFree ? ['free', 'no cost'] : ['premium', 'paid'])
  ].filter(Boolean).slice(0, 20);

  // Generate alternate languages (both locales + x-default)
  const languageAlternates: Record<string, string> = {
    en: `${baseUrl}/en/knowledge/${type}/${slug}`,
    ar: `${baseUrl}/ar/knowledge/${type}/${slug}`,
    'x-default': `${baseUrl}/en/knowledge/${type}/${slug}`,
  };

  const openGraphImages = [
    {
      url: defaultSocialImage,
      width: 1200,
      height: 630,
      alt: `${knowledge.title} | Insighta`,
      type: 'image/jpeg',
    },
    ...[
      knowledge.insighter.company?.logo || knowledge.insighter.profile_photo_url,
    ]
      .filter(Boolean)
      .map((imageUrl) => ({
        url: imageUrl as string,
        width: 600,
        height: 600,
        alt: authorName,
      })),
  ];

  const twitterImages = [
    defaultSocialImage,
  ];

  const metadata: Metadata = {
    metadataBase,
    title,
    description: description.length > 160 ? description.substring(0, 157) + '...' : description,
    keywords: keywords.join(', '),
    
    // Basic SEO
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    
    // Canonical URL
    alternates: {
      canonical: currentUrl,
      languages: languageAlternates,
    },

    // Open Graph
    openGraph: {
      type: 'article',
      title,
      description,
      url: currentUrl,
      siteName: 'Insighta',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      
      // Article-specific tags
      publishedTime: knowledge.published_at,
      authors: [authorName],
      tags: keywords,
      
      // Images
      images: openGraphImages,
    },

    // Twitter Card
    twitter: {
      card: 'summary',
      site: '@INSIGHTA',
      creator: `@${authorName.replace(/\s+/g, '')}`,
      title,
      description,
      images: twitterImages,
    },

    // Additional meta tags
    other: {
      'article:author': authorName,
      'article:published_time': knowledge.published_at,
      'article:modified_time': knowledge.published_at,
      'article:tag': keywords.join(', '),
      'article:section': knowledge.type,
      'product:price:amount': knowledge.total_price,
      'product:price:currency': 'USD',
      'product:availability': 'in stock',
      'product:condition': 'new',
      'og:price:amount': knowledge.total_price,
      'og:price:currency': 'USD',
      'og:image': defaultSocialImage,
      'og:image:secure_url': defaultSocialImage,
      'rating:average': avgRating > 0 ? avgRating.toFixed(1) : '',
      'rating:count': knowledge.review && knowledge.review.length > 0 ? knowledge.review.length.toString() : '0',
      'rating:scale': '5',
      'content-language': locale === 'ar' ? 'ar-SA' : 'en-US',
      'geo.region': knowledge.countries && knowledge.countries.length > 0 ? knowledge.countries.map(c => c.name).join(', ') : '',
      'author': authorName,
      'content-type': knowledge.type,
      'dc.title': knowledge.title,
      'dc.creator': authorName,
      'dc.subject': keywords.slice(0, 5).join(', '),
    },
  };

  return metadata;
}

export function generateStructuredData(knowledge: KnowledgeMetadata, locale: string, type: string, slug: string) {
  const baseUrl = 'https://insightabusiness.com';
  const currentUrl = `${baseUrl}/${locale}/knowledge/${type}/${slug}`;
  
  const avgRating = knowledge.review && knowledge.review.length > 0
    ? knowledge.review.reduce((sum, review) => sum + Math.min(5, review.rate), 0) / knowledge.review.length
    : 0;

  const authorName = knowledge.insighter.company?.legal_name || knowledge.insighter.name;
  const isFree = knowledge.total_price === '0' || parseFloat(String(knowledge.total_price)) === 0;
  const defaultSocialImage = 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1761651021/drilldown_l7cdf2.jpg';

  // Article Schema - Enhanced with more fields
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": knowledge.title,
    "description": knowledge.description,
    "author": {
      "@type": knowledge.insighter.company ? "Organization" : "Person",
      "name": authorName,
      "url": `${baseUrl}/${locale}/profile/${knowledge.insighter.company?.uuid || knowledge.insighter.uuid}`,
      ...(knowledge.insighter.company?.logo && {
        "logo": {
          "@type": "ImageObject",
          "url": knowledge.insighter.company.logo
        }
      }),
      ...(knowledge.insighter.profile_photo_url && !knowledge.insighter.company && {
        "image": {
          "@type": "ImageObject",
          "url": knowledge.insighter.profile_photo_url
        }
      })
    },
    "publisher": {
      "@type": "Organization",
      "name": "Insighta",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "datePublished": knowledge.published_at,
    "dateModified": knowledge.published_at,
    "url": currentUrl,
    "image": {
      "@type": "ImageObject",
      "url": defaultSocialImage,
      "width": 1200,
      "height": 630,
      "caption": knowledge.title
    },
    "inLanguage": locale === 'ar' ? 'ar-SA' : 'en-US',
    "keywords": [knowledge.type, ...(knowledge.countries && knowledge.countries.length > 0 ? knowledge.countries.map(c => c.name) : [])].join(', '),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    ...(knowledge.countries && knowledge.countries.length > 0 && {
      "spatialCoverage": knowledge.countries.map(c => ({
        "@type": "Place",
        "name": c.name
      }))
    })
  };

  // Course Schema (for course type)
  const courseSchema = type === 'course' ? {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": knowledge.title,
    "description": knowledge.description,
    "provider": {
      "@type": knowledge.insighter.company ? "Organization" : "EducationalOrganization",
      "name": authorName,
      "url": `${baseUrl}/${locale}/profile/${knowledge.insighter.company?.uuid || knowledge.insighter.uuid}`,
      ...(knowledge.insighter.company?.logo && {
        "logo": {
          "@type": "ImageObject",
          "url": knowledge.insighter.company.logo
        }
      })
    },
    "inLanguage": knowledge.language?.toLowerCase() === 'arabic' ? 'ar-SA' : 'en-US',
    "url": currentUrl,
    "image": {
      "@type": "ImageObject",
      "url": defaultSocialImage,
      "caption": knowledge.title
    },
    "courseCode": knowledge.slug,
    "educationalCredentialAwarded": knowledge.type,
    ...(avgRating > 0 && knowledge.review && knowledge.review.length > 0 && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": avgRating.toFixed(1),
        "reviewCount": knowledge.review.length,
        "bestRating": "5",
        "worstRating": "1"
      }
    }),
    ...(knowledge.documents && knowledge.documents.length > 0 && {
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "numberOfCredits": knowledge.documents.length.toString()
      }
    })
  } : null;

  // LearningResource Schema (for educational content)
  const learningResourceSchema = ['course', 'manual', 'report'].includes(type) ? {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": knowledge.title,
    "description": knowledge.description,
    "educationalUse": type,
    "learningResourceType": type,
    "teaches": knowledge.description.substring(0, 200),
    "inLanguage": knowledge.language?.toLowerCase() === 'arabic' ? 'ar-SA' : 'en-US',
    "url": currentUrl,
    "author": {
      "@type": knowledge.insighter.company ? "Organization" : "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Insighta"
    },
    ...(avgRating > 0 && knowledge.review && knowledge.review.length > 0 && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": avgRating.toFixed(1),
        "reviewCount": knowledge.review.length
      }
    })
  } : null;

  // Product Schema (for paid content) - Enhanced
  const productSchema = !isFree ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": knowledge.title,
    "description": knowledge.description,
    "image": {
      "@type": "ImageObject",
      "url": knowledge.insighter.company?.logo || knowledge.insighter.profile_photo_url || defaultSocialImage,
      "caption": knowledge.title
    },
    "brand": {
      "@type": knowledge.insighter.company ? "Organization" : "Person",
      "name": authorName
    },
    "offers": {
      "@type": "Offer",
      "price": knowledge.total_price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      "url": currentUrl,
      "seller": {
        "@type": knowledge.insighter.company ? "Organization" : "Person",
        "name": authorName
      }
    },
    "aggregateRating": avgRating > 0 && knowledge.review && knowledge.review.length > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": avgRating.toFixed(1),
      "reviewCount": knowledge.review.length,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "review": knowledge.review && knowledge.review.length > 0 ? knowledge.review.slice(0, 10).map(review => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": Math.min(5, review.rate || 0).toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Person",
        "name": review.user_name || "Anonymous"
      },
      "reviewBody": review.comment || "",
      "datePublished": review.created_date || new Date().toISOString()
    })) : [],
    "category": knowledge.type,
    "sku": knowledge.slug,
    ...(knowledge.id && { "mpn": knowledge.id.toString() }),
    ...(knowledge.countries && knowledge.countries.length > 0 && {
      "audience": {
        "@type": "Audience",
        "geographicArea": {
          "@type": "Place",
          "name": knowledge.countries.map(c => c.name).join(", ")
        }
      }
    })
  } : null;

  // Organization Schema (for company insighters)
  const organizationSchema = knowledge.insighter.company ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": knowledge.insighter.company.legal_name,
    "url": `${baseUrl}/${locale}/profile/${knowledge.insighter.company.uuid}`,
    "logo": knowledge.insighter.company.logo,
    "sameAs": []
  } : null;

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Insights",
        "item": `${baseUrl}/${locale}/knowledges`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": knowledge.type.charAt(0).toUpperCase() + knowledge.type.slice(1),
        "item": `${baseUrl}/${locale}/knowledges?type=${knowledge.type}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": knowledge.title,
        "item": currentUrl
      }
    ]
  };

  // Service Schema (for insight/data services)
  const serviceSchema = ['insight', 'data', 'statistic'].includes(type) ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": knowledge.title,
    "description": knowledge.description,
    "provider": {
      "@type": knowledge.insighter.company ? "Organization" : "Person",
      "name": authorName,
      "url": `${baseUrl}/${locale}/profile/${knowledge.insighter.company?.uuid || knowledge.insighter.uuid}`
    },
    "serviceType": knowledge.type,
    "areaServed": knowledge.countries && knowledge.countries.length > 0 ? knowledge.countries.map(c => ({
      "@type": "Country",
      "name": c.name
    })) : [],
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": currentUrl
    },
    ...(avgRating > 0 && knowledge.review && knowledge.review.length > 0 && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": avgRating.toFixed(1),
        "reviewCount": knowledge.review.length
      }
    })
  } : null;

  // HowTo Schema (for manual type)
  const howToSchema = type === 'manual' && knowledge.documents && knowledge.documents.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": knowledge.title,
    "description": knowledge.description,
    "image": {
      "@type": "ImageObject",
      "url": defaultSocialImage
    },
    "totalTime": "PT1H",
    "step": knowledge.documents.map((doc, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": doc.file_name,
      "text": (doc as any).description || `Step ${index + 1}: ${doc.file_name}`,
      "url": currentUrl
    })),
    "tool": knowledge.documents.map(doc => ({
      "@type": "HowToTool",
      "name": doc.file_extension.toUpperCase()
    }))
  } : null;

  // CreativeWork Schema (general schema for all knowledge types)
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": knowledge.title,
    "description": knowledge.description,
    "author": {
      "@type": knowledge.insighter.company ? "Organization" : "Person",
      "name": authorName
    },
    "datePublished": knowledge.published_at,
    "inLanguage": knowledge.language?.toLowerCase() === 'arabic' ? 'ar-SA' : 'en-US',
    "url": currentUrl,
    "genre": knowledge.type,
    ...(knowledge.countries && knowledge.countries.length > 0 && {
      "spatialCoverage": knowledge.countries.map(c => ({
        "@type": "Place",
        "name": c.name
      }))
    })
  };

  return {
    article: articleSchema,
    product: productSchema,
    organization: organizationSchema,
    breadcrumb: breadcrumbSchema,
    course: courseSchema,
    learningResource: learningResourceSchema,
    service: serviceSchema,
    creativeWork: creativeWorkSchema,
    howTo: howToSchema
  };
}

// Organization and WebSite Schema for Home Page
export function generateOrganizationSchema(locale: string) {
  const baseUrl = 'https://insightabusiness.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Insighta",
    "alternateName": "إنسايتا",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": locale === 'ar' 
      ? "منصة لشراء وبيع موارد الرؤى والرؤى والخبرة"
      : "Platform for buying and selling insight resources, insights and expertise",
    "sameAs": [
      // Add social media links when available
      // "https://www.facebook.com/insightabusiness",
      // "https://twitter.com/insightabusiness",
      // "https://www.linkedin.com/company/insightabusiness"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["English", "Arabic"]
    }
  };
}

// WebSite Schema with SearchAction
export function generateWebSiteSchema(locale: string) {
  const baseUrl = 'https://insightabusiness.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Insighta",
    "alternateName": "إنسايتا",
    "url": baseUrl,
    "description": locale === 'ar'
      ? "منصة لشراء وبيع موارد الرؤى والرؤى والخبرة"
      : "Platform for buying and selling insight resources, insights and expertise",
    "inLanguage": [locale === 'ar' ? 'ar-SA' : 'en-US', locale === 'ar' ? 'en-US' : 'ar-SA'],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/${locale}/home?keyword={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Insighta",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    }
  };
}

// Industry Page Schema
export interface IndustryData {
  id: number;
  name: string;
  slug: string;
  children?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

export function generateIndustryStructuredData(
  industry: IndustryData,
  breadcrumbItems: Array<{ label: string; url: string }>,
  locale: string
) {
  const baseUrl = 'https://insightabusiness.com';
  const currentUrl = `${baseUrl}/${locale}/industry/${industry.id}/${industry.slug}`;
  
  // ItemList Schema for sub-industries
  const itemListSchema = industry.children && industry.children.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${industry.name} - Sub Industries`,
    "description": `List of sub-industries under ${industry.name}`,
    "itemListElement": industry.children.map((child, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": child.name,
      "url": `${baseUrl}/${locale}/sub-industry/${child.id}/${child.slug}`
    }))
  } : null;
  
  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.url
    }))
  };
  
  // CollectionPage Schema
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${industry.name} Industry`,
    "description": `Industry analysis and insights for ${industry.name}`,
    "url": currentUrl,
    "mainEntity": {
      "@type": "ItemList",
      "name": `${industry.name} Sub-Industries`,
      "numberOfItems": industry.children?.length || 0
    }
  };
  
  return {
    itemList: itemListSchema,
    breadcrumb: breadcrumbSchema,
    collectionPage: collectionPageSchema
  };
}

// Profile Page Schema (Person or Organization)
export interface ProfileData {
  uuid: string;
  name: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  profile_photo_url?: string | null;
  bio?: string | null;
  company?: {
    legal_name: string;
    website?: string;
    logo?: string;
    address?: string;
    verified?: boolean;
  };
  roles?: string[];
  industries?: Array<{
    id: number;
    name: string;
  }>;
  social?: Array<{
    type: string;
    link: string;
  }>;
}

export function generateProfileStructuredData(
  profile: ProfileData,
  locale: string
) {
  const baseUrl = 'https://insightabusiness.com';
  const profileUrl = `${baseUrl}/${locale}/profile/${profile.uuid}`;
  
  // If it's a company profile
  if (profile.company) {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": profile.company.legal_name,
      "url": profileUrl,
      "description": profile.bio || `Professional profile of ${profile.company.legal_name}`,
      ...(profile.company.logo && {
        "logo": {
          "@type": "ImageObject",
          "url": profile.company.logo
        }
      }),
      ...(profile.company.website && {
        "sameAs": [profile.company.website]
      }),
      ...(profile.social && profile.social.length > 0 && {
        "sameAs": profile.social.map(s => s.link)
      }),
      ...(profile.industries && profile.industries.length > 0 && {
        "knowsAbout": profile.industries.map(ind => ind.name)
      })
    };
    
    return {
      organization: organizationSchema
    };
  }
  
  // If it's a person profile
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile.name,
    "givenName": profile.first_name,
    "familyName": profile.last_name,
    "url": profileUrl,
    "description": profile.bio || `Professional profile of ${profile.name}`,
    ...(profile.profile_photo_url && {
      "image": {
        "@type": "ImageObject",
        "url": profile.profile_photo_url
      }
    }),
    ...(profile.email && {
      "email": profile.email
    }),
    ...(profile.social && profile.social.length > 0 && {
      "sameAs": profile.social.map(s => s.link)
    }),
    ...(profile.industries && profile.industries.length > 0 && {
      "knowsAbout": profile.industries.map(ind => ind.name)
    }),
    "jobTitle": profile.roles?.join(', ') || "Expert"
  };
  
  return {
    person: personSchema
  };
}

// Topic/Sub-Industry Page Schema
export interface TopicData {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export function generateTopicStructuredData(
  topic: TopicData,
  breadcrumbItems: Array<{ label: string; url: string }>,
  locale: string,
  type: 'topic' | 'sub-industry'
) {
  const baseUrl = 'https://insightabusiness.com';
  const currentUrl = `${baseUrl}/${locale}/${type === 'topic' ? 'topic' : 'sub-industry'}/${topic.id}/${topic.slug}`;
  
  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.url
    }))
  };
  
  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": topic.name,
    "description": topic.description || `${type === 'topic' ? 'Topic' : 'Sub-Industry'}: ${topic.name}`,
    "url": currentUrl,
    "inLanguage": locale === 'ar' ? 'ar-SA' : 'en-US'
  };
  
  return {
    breadcrumb: breadcrumbSchema,
    webPage: webPageSchema
  };
}
