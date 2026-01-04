import { MetadataRoute } from 'next';
import { getApiUrl, publicBaseUrl } from './config';

const DOMAIN = publicBaseUrl;
const LOCALES = ['en', 'ar'] as const;

// Static routes that don't require dynamic data
const STATIC_ROUTES = [
  '',
  '/about',
  '/blog',
  '/contact',
  '/insighter',
  '/customers',
  '/changelog',
  '/all-industries',
  '/knowledges',
  '/resources/faqs',
  '/resources/help-center',
  '/resources/user-guide',
  '/resources/user-guide/getting-started',
  '/legals/privacy',
  '/legals/terms',
  '/legals/cookies',
  '/legals/licensing',
] as const;

// Industry types for dynamic routes
const INDUSTRY_TYPES = ['report', 'insight', 'data', 'manual', 'course', 'statistic'] as const;

interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: {
    languages?: Record<string, string>;
  };
}

// Helper function to create URL with locale
function createUrl(locale: string, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${DOMAIN}/${locale}${cleanPath}`;
}

// Fetch dynamic routes from API
async function fetchDynamicRoutes(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];
  
  try {
    // Fetch industries menu to get all industries
    const industriesResponse = await fetch(getApiUrl('/api/platform/industries/menu'), {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (industriesResponse.ok) {
      const industriesData = await industriesResponse.json();
      
      // Process industries
      if (industriesData?.data) {
        for (const industry of industriesData.data) {
          if (industry.id && industry.slug) {
            const slug = typeof industry.slug === 'string' 
              ? industry.slug 
              : industry.name?.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '').replace(/--+/g, '-') || 'industry';
            
            for (const locale of LOCALES) {
              entries.push({
                url: createUrl(locale, `/industry/${industry.id}/${slug}`),
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
                alternates: {
                  languages: {
                    en: createUrl('en', `/industry/${industry.id}/${slug}`),
                    ar: createUrl('ar', `/industry/${industry.id}/${slug}`),
                  },
                },
              });
            }
          }
          
          // Process sub-industries
          if (industry.sub_industries) {
            for (const subIndustry of industry.sub_industries) {
              if (subIndustry.id && subIndustry.slug) {
                const slug = typeof subIndustry.slug === 'string'
                  ? subIndustry.slug
                  : subIndustry.name?.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '').replace(/--+/g, '-') || 'sub-industry';
                
                for (const locale of LOCALES) {
                  entries.push({
                    url: createUrl(locale, `/sub-industry/${subIndustry.id}/${slug}`),
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.7,
                    alternates: {
                      languages: {
                        en: createUrl('en', `/sub-industry/${subIndustry.id}/${slug}`),
                        ar: createUrl('ar', `/sub-industry/${subIndustry.id}/${slug}`),
                      },
                    },
                  });
                }
              }
              
              // Process topics
              if (subIndustry.topics) {
                for (const topic of subIndustry.topics) {
                  if (topic.id && topic.slug) {
                    const slug = typeof topic.slug === 'string'
                      ? topic.slug
                      : topic.name?.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '').replace(/--+/g, '-') || 'topic';
                    
                    for (const locale of LOCALES) {
                      entries.push({
                        url: createUrl(locale, `/topic/${topic.id}/${slug}`),
                        lastModified: new Date(),
                        changeFrequency: 'weekly',
                        priority: 0.6,
                        alternates: {
                          languages: {
                            en: createUrl('en', `/topic/${topic.id}/${slug}`),
                            ar: createUrl('ar', `/topic/${topic.id}/${slug}`),
                          },
                        },
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    
    // Fetch industries by type
    for (const type of INDUSTRY_TYPES) {
      try {
        const typeResponse = await fetch(getApiUrl(`/api/platform/industries/type/${type}`), {
          next: { revalidate: 3600 },
        });
        
        if (typeResponse.ok) {
          const typeData = await typeResponse.json();
          
          if (typeData?.data) {
            // Add the industries by type listing page
            for (const locale of LOCALES) {
              entries.push({
                url: createUrl(locale, `/industries/${type}`),
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 0.7,
                alternates: {
                  languages: {
                    en: createUrl('en', `/industries/${type}`),
                    ar: createUrl('ar', `/industries/${type}`),
                  },
                },
              });
            }
            
            // Add individual industry-by-type pages (limit to first 50 to avoid too many entries)
            const itemsToProcess = typeData.data.slice(0, 50);
            for (const item of itemsToProcess) {
              if (item.id && item.slug) {
                const slug = typeof item.slug === 'string'
                  ? item.slug
                  : item.name?.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '').replace(/--+/g, '-') || 'item';
                
                for (const locale of LOCALES) {
                  entries.push({
                    url: createUrl(locale, `/industry-by-type/${type}/${item.id}/${slug}`),
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.6,
                    alternates: {
                      languages: {
                        en: createUrl('en', `/industry-by-type/${type}/${item.id}/${slug}`),
                        ar: createUrl('ar', `/industry-by-type/${type}/${item.id}/${slug}`),
                      },
                    },
                  });
                }
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching industries for type ${type}:`, error);
      }
    }
    
    // Fetch popular knowledge items (first page only to keep sitemap manageable)
    // Note: Knowledge items are dynamic and numerous, so we'll include the listing page
    // and let search engines discover individual items through internal links
    for (const locale of LOCALES) {
      entries.push({
        url: createUrl(locale, '/knowledges'),
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
        alternates: {
          languages: {
            en: createUrl('en', '/knowledges'),
            ar: createUrl('ar', '/knowledges'),
          },
        },
      });
    }
    
  } catch (error) {
    console.error('Error fetching dynamic routes:', error);
  }
  
  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: SitemapEntry[] = [];
  const now = new Date();
  
  // Add static routes for all locales
  for (const route of STATIC_ROUTES) {
    for (const locale of LOCALES) {
      const url = createUrl(locale, route);
      
      // Determine priority and change frequency based on route
      let priority = 0.7;
      let changeFrequency: SitemapEntry['changeFrequency'] = 'weekly';
      
      if (route === '') {
        priority = 1.0;
        changeFrequency = 'daily';
      } else if (route === '/blog' || route === '/knowledges') {
        priority = 0.9;
        changeFrequency = 'daily';
      } else if (route.startsWith('/legals') || route.startsWith('/resources')) {
        priority = 0.5;
        changeFrequency = 'monthly';
      }
      
      entries.push({
        url,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: createUrl('en', route),
            ar: createUrl('ar', route),
          },
        },
      });
    }
  }
  
  // Fetch and add dynamic routes
  const dynamicRoutes = await fetchDynamicRoutes();
  entries.push(...dynamicRoutes);
  
  return entries;
}

