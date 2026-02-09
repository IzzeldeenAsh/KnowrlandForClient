# Schema.org Structured Data Implementation

This document outlines the comprehensive Schema.org (JSON-LD) structured data implementation for the Insighta Business website.

## Overview

Structured data helps search engines understand the content of your website better, enabling rich snippets in search results and improved SEO performance.

## Implementation Status

### ✅ Completed Implementations

1. **Knowledge Pages** (`app/[locale]/knowledge/[type]/[slug]/page.tsx`)
   - Article Schema
   - Product Schema (for paid content)
   - Organization Schema (for company insighters)
   - BreadcrumbList Schema
   - Review Schema (individual reviews with ratings)

2. **Home Page** (`app/[locale]/(default)/page.tsx`)
   - Organization Schema
   - WebSite Schema with SearchAction

3. **Industry Pages** (`app/[locale]/industry/[id]/[slug]/page.tsx`)
   - BreadcrumbList Schema
   - CollectionPage Schema
   - ItemList Schema (for sub-industries)

4. **Sub-Industry Pages** (`app/[locale]/sub-industry/[id]/[slug]/page.tsx`)
   - BreadcrumbList Schema
   - WebPage Schema

5. **Topic Pages** (`app/[locale]/topic/[id]/[slug]/page.tsx`)
   - BreadcrumbList Schema
   - WebPage Schema

6. **Profile Pages** (`app/[locale]/profile/[uuid]/layout.tsx`)
   - Person Schema (for individual insighters)
   - Organization Schema (for company profiles)

## Schema Types Used

### 1. Organization Schema
- **Location**: Home page, Knowledge pages (publisher), Profile pages (companies)
- **Purpose**: Identifies the business entity
- **Key Properties**:
  - name, url, logo
  - description
  - sameAs (social media links)
  - contactPoint

### 2. WebSite Schema
- **Location**: Home page
- **Purpose**: Defines the website and enables search functionality
- **Key Properties**:
  - name, url, description
  - inLanguage (multilingual support)
  - potentialAction (SearchAction for site search)
  - publisher

### 3. Article Schema
- **Location**: Knowledge pages
- **Purpose**: Describes knowledge content as articles
- **Key Properties**:
  - headline, description
  - author (Person or Organization)
  - publisher
  - datePublished, dateModified
  - image, keywords

### 4. Product Schema
- **Location**: Knowledge pages (paid content)
- **Purpose**: E-commerce markup for purchasable content
- **Key Properties**:
  - name, description, image
  - brand
  - offers (price, currency, availability)
  - aggregateRating
  - review (individual reviews)
  - category, sku

### 5. BreadcrumbList Schema
- **Location**: All hierarchical pages (Industry, Sub-Industry, Topic, Knowledge)
- **Purpose**: Shows navigation hierarchy
- **Key Properties**:
  - itemListElement (array of ListItem)
  - Each ListItem has: position, name, item (URL)

### 6. Person Schema
- **Location**: Profile pages (individual insighters)
- **Purpose**: Identifies individual experts
- **Key Properties**:
  - name, givenName, familyName
  - url, description
  - image
  - email
  - sameAs (social links)
  - knowsAbout (industries/expertise)
  - jobTitle

### 7. CollectionPage Schema
- **Location**: Industry pages
- **Purpose**: Identifies pages that list collections of items
- **Key Properties**:
  - name, description, url
  - mainEntity (ItemList)

### 8. ItemList Schema
- **Location**: Industry pages
- **Purpose**: Lists sub-industries
- **Key Properties**:
  - name, description
  - itemListElement (array of ListItem)

### 9. WebPage Schema
- **Location**: Topic and Sub-Industry pages
- **Purpose**: Describes individual web pages
- **Key Properties**:
  - name, description, url
  - inLanguage

## Utility Functions

All structured data generation is centralized in `utils/seo.ts`:

- `generateStructuredData()` - Knowledge pages
- `generateOrganizationSchema()` - Organization markup
- `generateWebSiteSchema()` - Website with search action
- `generateIndustryStructuredData()` - Industry pages
- `generateProfileStructuredData()` - Profile pages
- `generateTopicStructuredData()` - Topic/Sub-industry pages

## Implementation Details

### Base URL Configuration
All schemas use the base URL from environment variable:
```typescript
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://insightabusiness.com';
```

### Multilingual Support
All schemas support both English and Arabic locales:
- Language codes: `en-US`, `ar-SA`
- URLs include locale prefix: `/{locale}/...`

### Dynamic Data Fetching
Structured data is generated server-side using:
- API data for dynamic content
- Breadcrumb data for navigation
- Profile data for user/company information

## Testing Structured Data

### Google Rich Results Test
1. Visit: https://search.google.com/test/rich-results
2. Enter your page URL
3. Check for any errors or warnings

### Schema.org Validator
1. Visit: https://validator.schema.org/
2. Enter your page URL or paste JSON-LD code
3. Verify schema compliance

### Google Search Console
1. Monitor "Enhancements" section
2. Check for structured data errors
3. View rich result performance

## Best Practices Implemented

1. ✅ **Valid JSON-LD**: All schemas use proper JSON-LD format
2. ✅ **Required Properties**: All required properties are included
3. ✅ **Optional Properties**: Relevant optional properties added for better context
4. ✅ **No Duplicate Content**: Each page has unique structured data
5. ✅ **Proper Nesting**: Related entities properly nested (e.g., author in Article)
6. ✅ **Multilingual Support**: Proper language codes and alternate URLs
7. ✅ **Breadcrumbs**: Navigation hierarchy clearly defined
8. ✅ **Ratings & Reviews**: Product reviews with proper rating schema

## Future Enhancements

### Potential Additions

1. **FAQPage Schema**
   - For FAQ pages (`/resources/faqs`)
   - Include question/answer pairs

2. **Course Schema**
   - For course-type knowledge items
   - Include course details, duration, instructor

3. **VideoObject Schema**
   - If video content is added
   - Include video metadata

4. **Event Schema**
   - For any events or webinars
   - Include event details, dates, location

5. **SoftwareApplication Schema**
   - If platform features are highlighted
   - Include app details, ratings

6. **HowTo Schema**
   - For tutorial/guide content
   - Include step-by-step instructions

## Maintenance

### Regular Checks
- Monitor Google Search Console for structured data errors
- Test new pages with Rich Results Test
- Update schemas when content structure changes
- Keep base URLs and organization info up to date

### When to Update
- Adding new page types
- Changing content structure
- Adding new features (reviews, ratings, etc.)
- Updating organization information
- Adding social media profiles

## Files Modified

1. `utils/seo.ts` - Added new structured data functions
2. `app/[locale]/(default)/page.tsx` - Added Organization and WebSite schemas
3. `app/[locale]/industry/[id]/[slug]/page.tsx` - Added industry schemas
4. `app/[locale]/sub-industry/[id]/[slug]/page.tsx` - Added sub-industry schemas
5. `app/[locale]/topic/[id]/[slug]/page.tsx` - Added topic schemas
6. `app/[locale]/profile/[uuid]/layout.tsx` - Added profile schemas

## Notes

- All structured data is rendered server-side for better SEO
- JSON-LD format is used (preferred by Google)
- Schemas are filtered to remove null/undefined values
- Error handling prevents build failures if data is missing
- Structured data complements existing metadata tags









