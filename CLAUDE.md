# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start Development Server:**
```bash
npm run dev
# Uses Next.js with Turbopack for faster development
```

**Build & Deploy:**
```bash
npm run build        # Production build
npm run start        # Development start
npm run start:prod   # Production start
```

**Code Quality:**
```bash
npm run lint         # Run Next.js ESLint
```

## Architecture Overview

### Tech Stack
- **Framework:** Next.js 15 with App Router and TypeScript
- **Styling:** Tailwind CSS + Mantine UI components
- **Internationalization:** next-intl (Arabic/English, RTL/LTR support)
- **HTTP Client:** Axios for API calls
- **Icons:** Heroicons + Tabler Icons + custom SVG components
- **Animations:** AOS (Animate On Scroll)

### Core Architecture Patterns

**1. Internationalized Routing:**
- URL structure: `/{locale}/...` where locale is 'ar' or 'en'
- Default locale: Arabic ('ar')
- Middleware handles locale detection and routing
- All components must support RTL/LTR layout switching

**2. API Integration:**
- Base API URL: `https://api.foresighta.co`
- Uses Axios with interceptors for token management
- Authentication via localStorage token + cookie fallback
- Standard headers include locale, timezone, and bearer token

**3. Component Structure:**
```
app/[locale]/                    # Internationalized routes
├── (auth)/                      # Auth group with shared layout
├── (default)/                   # Main site group  
├── home/                        # Search & knowledge discovery
├── knowledge/[type]/[slug]/     # Knowledge detail pages
├── industry/[id]/[slug]/        # Industry pages
└── components/                  # Shared components
```

**4. State Management Patterns:**
- Custom hooks for data fetching (see `hooks/` directory)
- Local state with useState for UI interactions
- API state management through custom hooks with loading/error states

### Key Business Logic

**Knowledge System:**
- Multiple content types: reports, manuals, insights, data, courses
- Purchase states: non-purchased, purchased, partial-purchased
- Read Later functionality using bookmark API endpoints
- Rating system with reviews
- Document attachments with file type indicators

**Authentication Flow:**
- Token-based auth stored in localStorage + httpOnly cookies
- Global auth handler for automatic login/logout
- Insighter vs Company user roles with different UI treatments

**Search & Discovery:**
- Global search supporting knowledge items and topics
- Advanced filtering by industry, type, language, price
- Grid/List view modes with responsive layouts
- Pagination with URL state management

### Design System Guidelines

**Colors:**
- Insighter badges: `bg-[#DFFEE9] text-[#1BC653]`
- Company badges: `bg-[#EFF8FF] text-[#299AF8]` 
- Primary buttons: `bg-blue-500`
- Special gradient buttons: `bg-gradient-to-r from-blue-500 to-teal-400`

**Error Handling:**
- All errors displayed via toast notifications
- Import: `import { useToast } from '@/components/toast/ToastContext'`
- API errors follow format: `{message: string, errors: {field: string[]}}`

**Component Conventions:**
- Use Mantine UI components as base
- Tailwind for custom styling and spacing
- CSS Modules for component-specific styles (`.module.css`)
- Dynamic imports for heavy components to optimize bundle

### File Organization

**Routing:**
- `app/[locale]/` - Main internationalized routes
- Dynamic segments: `[id]`, `[slug]`, `[type]` for parameterized routes  
- Route groups: `(auth)`, `(default)` for shared layouts

**Reusable Logic:**
- `hooks/` - Custom data fetching hooks organized by domain
- `components/` - Shared UI components
- `utils/` - Utility functions and helpers
- `services/` - API service modules

**Styling:**
- `app/css/` - Global styles and utilities
- Component-level `.module.css` files for scoped styles
- Tailwind config supports RTL with `dir` attribute switching

### API Patterns

**Standard Request Headers:**
```javascript
{
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': 'application/json', 
  'Accept': 'application/json',
  'Accept-Language': locale,
  'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
}
```

**Cookie Management:**
- Development: SameSite=Lax for localhost
- Production: SameSite=None, Secure, Domain=.foresighta.co

**Common API Endpoints:**
- Knowledge operations: `/api/platform/knowledge/*`
- Favorites: `/api/account/favorite/knowledge/{slug}` (POST/DELETE)
- Industries: `/api/platform/industries/*`
- Search: `/api/platform/search/*`

### Development Notes

**Locale Handling:**
- Components receive locale via props or useParams()
- Always check `isRTL = locale === 'ar'` for conditional styling
- Text direction: use `dir={isRTL ? 'rtl' : 'ltr'}` on containers

**Performance:**
- Use `dynamic()` imports for code splitting heavy components
- Implement proper loading states for async operations
- Use `React.useMemo()` for expensive computations

**Token Management:**
- Always check for token before API calls
- Implement loading states during auth operations  
- Handle 401 responses with logout/redirect logic