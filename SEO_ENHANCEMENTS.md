# SEO Enhancements for Insighta Business

This document outlines the SEO improvements implemented for the Insighta Business website.

## Files Created/Modified

### 1. Sitemap (`app/sitemap.ts`)
- **Purpose**: Automatically generates a sitemap.xml file for search engines
- **Features**:
  - Includes all static routes for both English and Arabic locales
  - Dynamically fetches and includes industry, sub-industry, and topic pages
  - Includes industry-by-type pages
  - Supports hreflang tags for multilingual content
  - Sets appropriate priorities and change frequencies
  - Accessible at: `http://foresighta.co/sitemap.xml`

### 2. Robots.txt (`app/robots.ts`)
- **Purpose**: Controls search engine crawler access
- **Features**:
  - Allows all public pages
  - Blocks private/user-specific routes (API, checkout, payment, profile, etc.)
  - References the sitemap location
  - Accessible at: `http://foresighta.co/robots.txt`

### 3. Web App Manifest (`app/manifest.ts`)
- **Purpose**: Provides metadata for PWA support and better mobile experience
- **Features**:
  - Defines app name, description, and icons
  - Sets theme colors and display mode
  - Accessible at: `http://foresighta.co/manifest.json`

### 4. Enhanced Metadata (`app/[locale]/layout.tsx`)
- **Purpose**: Improves SEO with comprehensive metadata
- **Features**:
  - Dynamic metadata based on locale (English/Arabic)
  - Open Graph tags for social media sharing
  - Twitter Card support
  - Canonical URLs
  - Language alternates (hreflang)
  - Structured keywords
  - Robot directives

## Routes Included in Sitemap

### Static Routes
- Home page (`/`)
- About (`/about`)
- Blog (`/blog`)
- Contact (`/contact`)
- Pricing (`/pricing`)
- Insighter (`/insighter`)
- Integrations (`/integrations`)
- Customers (`/customers`)
- Changelog (`/changelog`)
- All Industries (`/all-industries`)
- Knowledges (`/knowledges`)
- Resources (FAQs, Help Center, User Guide)
- Legal pages (Privacy, Terms, Cookies, Licensing)

### Dynamic Routes (Fetched from API)
- Industry pages (`/industry/[id]/[slug]`)
- Sub-industry pages (`/sub-industry/[id]/[slug]`)
- Topic pages (`/topic/[id]/[slug]`)
- Industries by type (`/industries/[type]`)
- Industry by type pages (`/industry-by-type/[type]/[id]/[slug]`)

## SEO Best Practices Implemented

1. **Multilingual Support**: All routes are included for both English and Arabic locales
2. **Hreflang Tags**: Proper language alternates for international SEO
3. **Priority Setting**: Important pages (home, blog) have higher priority
4. **Change Frequency**: Pages are marked with appropriate update frequencies
5. **Last Modified Dates**: Dynamic content includes last modified timestamps
6. **Structured Metadata**: Open Graph and Twitter Cards for social sharing
7. **Canonical URLs**: Prevents duplicate content issues
8. **Robot Directives**: Proper crawling instructions

## Next Steps (Optional Enhancements)

1. **Add Verification Codes**: Update `app/[locale]/layout.tsx` with Google Search Console, Yandex, and Yahoo verification codes
2. **Create OG Image**: Add an Open Graph image at `/public/images/og-image.jpg` (recommended size: 1200x630px)
3. **Add Icons**: Create PWA icons at:
   - `/public/images/icon-192.png` (192x192px)
   - `/public/images/icon-512.png` (512x512px)
4. **Knowledge Items**: Consider adding popular knowledge items to the sitemap if needed (currently excluded to keep sitemap manageable)
5. **Blog Posts**: If blog posts are dynamic, consider adding them to the sitemap
6. **Structured Data**: Consider adding JSON-LD structured data for rich snippets

## Testing

To verify the sitemap is working:
1. Build the project: `npm run build`
2. Start the server: `npm run start`
3. Visit: `https://foresighta.co/sitemap.xml`
4. Check robots.txt: `https://foresighta.co/robots.txt`
5. Check manifest: `https://foresighta.co/manifest.json`

## Search Engine Submission

After deployment, submit your sitemap to:
- **Google Search Console**: https://search.google.com/search-console
- **Bing Webmaster Tools**: https://www.bing.com/webmasters
- **Yandex Webmaster**: https://webmaster.yandex.com

Submit the sitemap URL: `http://foresighta.co/sitemap.xml`

## Notes

- The sitemap dynamically fetches data from the API, so it may take a few seconds to generate on first request
- Dynamic routes are cached for 1 hour (`revalidate: 3600`) to improve performance
- The sitemap is limited to the first 50 items per industry type to keep it manageable
- Individual knowledge items are not included in the sitemap but can be discovered through internal links









