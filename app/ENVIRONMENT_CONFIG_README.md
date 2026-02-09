# Environment Configuration for Insighta Client

This document explains how to use the new environment configuration to handle different URLs for development and production environments.

## Configuration Overview

The configuration is centralized in `/app/config.ts` and provides:

- `apiBaseUrl`: In development, uses `https://api.insightabusiness.com`; in production, uses `https://api.insightabusiness.com`
- `appBaseUrl`: In development, uses `https://app.insightabusiness.com`; in production, uses `https://app.insightabusiness.com`

## Helper Functions

The configuration file provides two helper functions:

1. `getApiUrl(path)`: Builds a complete API URL by appending the given path to the appropriate base URL
2. `getAppUrl(path)`: Builds a complete App URL by appending the given path to the appropriate base URL

## How to Update Files

### For API URLs

Replace hardcoded API URLs like:
```typescript
const response = await fetch('https://api.insightabusiness.com/api/platform/industries', {...});
```

With:
```typescript
import { getApiUrl } from '@/app/config';

const response = await fetch(getApiUrl('/api/platform/industries'), {...});
```

### For App URLs

Replace hardcoded app URLs like:
```typescript
window.location.href = 'https://app.insightabusiness.com/auth/login';
```

With:
```typescript
import { getAppUrl } from '@/app/config';

window.location.href = getAppUrl('/auth/login');
```

## Important Notes

1. When using the helper functions, remove the base URL and start the path with a slash:
   - ❌ `getApiUrl('https://api.insightabusiness.com/api/platform/industries')` 
   - ✅ `getApiUrl('/api/platform/industries')`

2. The environment is automatically detected based on Node.js' `process.env.NODE_ENV`.

3. When running in development, APIs will use `https://api.insightabusiness.com` and app redirects will use `https://app.insightabusiness.com`.

## Files That Need to Be Updated

Based on a search of the codebase, you will need to update API URLs in these files (not an exhaustive list):

- `hooks/industries/*.ts`
- `hooks/knowledgs/*.ts`
- `components/ui/header.tsx`
- `components/ui/header/hooks/useUserProfile.ts`
- `utils/breadcrumb.ts`
- Various pages under `app/[locale]/`

And app URLs in these files:

- `components/cta-02.tsx`
- `components/ui/header.tsx`
- `components/ui/header/hooks/useUserProfile.ts`
- `components/ui/header/components/UserProfile.tsx`
- `app/[locale]/callback/page.tsx`
- `app/[locale]/callback/[token]/page.tsx`

## Environment Configuration File

The environment configuration file is located in `/app/config.ts`. It uses Node.js' built-in `process.env.NODE_ENV` to determine if the code is running in development mode.

### Determine if the code is running in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

### API and App URLs based on environment
export const apiBaseUrl = isDevelopment 
  ? 'https://api.insightabusiness.com' 
  : 'https://api.insightabusiness.com';

export const appBaseUrl = isDevelopment 
  ? 'https://app.insightabusiness.com' 
  : 'https://app.insightabusiness.com'; 