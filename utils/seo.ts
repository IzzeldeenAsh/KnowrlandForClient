import { Metadata } from 'next';

export interface KnowledgeMetadata {
  id: number;
  type: string;
  title: string;
  slug: string;
  description: string;
  language: string;
  total_price: string;
  published_at: string;
  countries: Array<{
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
  review: Array<{
    id: number;
    rate: number;
    comment: string;
    user_name: string;
    created_date: string;
  }>;
  documents: Array<{
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://knoldg.com';
  const currentUrl = `${baseUrl}/${locale}/knowledge/${type}/${slug}`;
  
  // Calculate average rating
  const avgRating = knowledge.review && knowledge.review.length > 0
    ? knowledge.review.reduce((sum, review) => sum + Math.min(5, review.rate), 0) / knowledge.review.length
    : 0;

  // Determine pricing info
  const isFree = knowledge.total_price === '0' || parseFloat(String(knowledge.total_price)) === 0;
  const priceText = isFree 
    ? (isRTL ? 'مجاني' : 'Free')
    : `$${knowledge.total_price}`;

  // Generate rich title
  const typeTranslation = isRTL ? {
    'data': 'بيانات',
    'insight': 'رؤية',
    'manual': 'دليل',
    'report': 'تقرير',
    'course': 'دورة'
  }[knowledge.type] || knowledge.type : knowledge.type.charAt(0).toUpperCase() + knowledge.type.slice(1);

  const title = isRTL 
    ? `${knowledge.title} | ${typeTranslation} ${priceText} | KNOLDG`
    : `${knowledge.title} | ${typeTranslation} ${priceText} | KNOLDG`;

  // Generate rich description
  const authorName = knowledge.insighter.company?.legal_name || knowledge.insighter.name;
  const languageText = isRTL 
    ? (knowledge.language?.toLowerCase() === 'english' ? 'الإنجليزية' : 'العربية')
    : knowledge.language;
  
  const ratingText = avgRating > 0 
    ? isRTL 
      ? `تقييم ${avgRating.toFixed(1)}/5 من ${knowledge.review.length} مراجعة`
      : `${avgRating.toFixed(1)}/5 rating from ${knowledge.review.length} reviews`
    : '';

  const description = isRTL
    ? `اكتشف ${knowledge.title} - ${typeTranslation} ${priceText} من ${authorName}. باللغة ${languageText}. ${knowledge.documents.length} مستند متاح. ${ratingText}. احصل على رؤى قيمة ومعرفة متخصصة على منصة KNOLDG.`
    : `Discover ${knowledge.title} - ${typeTranslation} ${priceText} by ${authorName}. Available in ${languageText}. ${knowledge.documents.length} documents included. ${ratingText}. Get valuable insights and expert knowledge on KNOLDG platform.`;

  // Generate keywords
  const keywords = [
    knowledge.type,
    knowledge.title,
    authorName,
    knowledge.language,
    'knowledge',
    'insights',
    'expertise',
    'business intelligence',
    isFree ? 'free' : 'premium',
    ...knowledge.countries.map(country => country.name),
    ...knowledge.documents.map(doc => doc.file_extension)
  ].filter(Boolean).slice(0, 15);

  // Generate alternate languages
  const alternateLanguages: Record<string, string> = {};
  alternateLanguages[locale === 'ar' ? 'en' : 'ar'] = `${baseUrl}/${locale === 'ar' ? 'en' : 'ar'}/knowledge/${type}/${slug}`;

  const metadata: Metadata = {
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
      languages: alternateLanguages,
    },

    // Open Graph
    openGraph: {
      type: 'article',
      title,
      description,
      url: currentUrl,
      siteName: 'KNOLDG',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      
      // Article-specific tags
      publishedTime: knowledge.published_at,
      authors: [authorName],
      tags: keywords,
      
      // Images
      images: [
        {
          url: knowledge.insighter.company?.logo || knowledge.insighter.profile_photo_url || `${baseUrl}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
        {
          url: `${baseUrl}/og-square.jpg`,
          width: 400,
          height: 400,
          alt: title,
          type: 'image/jpeg',
        }
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: '@KNOLDG',
      creator: `@${authorName.replace(/\s+/g, '')}`,
      title,
      description,
      images: [knowledge.insighter.company?.logo || knowledge.insighter.profile_photo_url || `${baseUrl}/twitter-card.jpg`],
    },

    // Additional meta tags
    other: {
      'article:author': authorName,
      'article:published_time': knowledge.published_at,
      'article:tag': keywords.join(', '),
      'product:price:amount': knowledge.total_price,
      'product:price:currency': 'USD',
      'product:availability': 'in stock',
      'product:condition': 'new',
      'og:price:amount': knowledge.total_price,
      'og:price:currency': 'USD',
      'rating:average': avgRating.toString(),
      'rating:count': knowledge.review.length.toString(),
      'rating:scale': '5',
    },
  };

  return metadata;
}

export function generateStructuredData(knowledge: KnowledgeMetadata, locale: string, type: string, slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://knoldg.com';
  const currentUrl = `${baseUrl}/${locale}/knowledge/${type}/${slug}`;
  
  const avgRating = knowledge.review && knowledge.review.length > 0
    ? knowledge.review.reduce((sum, review) => sum + Math.min(5, review.rate), 0) / knowledge.review.length
    : 0;

  const authorName = knowledge.insighter.company?.legal_name || knowledge.insighter.name;
  const isFree = knowledge.total_price === '0' || parseFloat(String(knowledge.total_price)) === 0;

  // Article Schema
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
        "logo": knowledge.insighter.company.logo
      }),
      ...(knowledge.insighter.profile_photo_url && !knowledge.insighter.company && {
        "image": knowledge.insighter.profile_photo_url
      })
    },
    "publisher": {
      "@type": "Organization",
      "name": "KNOLDG",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.png`
    },
    "datePublished": knowledge.published_at,
    "dateModified": knowledge.published_at,
    "url": currentUrl,
    "image": knowledge.insighter.company?.logo || knowledge.insighter.profile_photo_url || `${baseUrl}/default-article.jpg`,
    "inLanguage": locale === 'ar' ? 'ar-SA' : 'en-US',
    "keywords": [knowledge.type, ...knowledge.countries.map(c => c.name)].join(', ')
  };

  // Product Schema (for paid content)
  const productSchema = !isFree ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": knowledge.title,
    "description": knowledge.description,
    "image": knowledge.insighter.company?.logo || knowledge.insighter.profile_photo_url,
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
      "url": currentUrl
    },
    "aggregateRating": avgRating > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": avgRating.toFixed(1),
      "reviewCount": knowledge.review.length,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "review": knowledge.review.slice(0, 5).map(review => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": Math.min(5, review.rate).toString(),
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": review.user_name
      },
      "reviewBody": review.comment,
      "datePublished": review.created_date
    })),
    "category": knowledge.type,
    "sku": knowledge.slug
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
        "name": "Knowledge",
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

  return {
    article: articleSchema,
    product: productSchema,
    organization: organizationSchema,
    breadcrumb: breadcrumbSchema
  };
}