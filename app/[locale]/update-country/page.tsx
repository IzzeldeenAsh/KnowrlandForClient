'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCountries, Country } from '@/app/lib/useCountries';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';

export default function UpdateCountryPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const t = useTranslations('countryUpdate');
  const locale = params.locale as string;

  const { countries, isLoading: countriesLoading, error: countriesError } = useCountries();
  const { user, refreshProfile } = useGlobalProfile();

  // Redirect if user already has a country
  useEffect(() => {
    if (user?.country_id) {
      console.log('[UpdateCountry] User already has country, redirecting');
      handleRedirect();
    }
  }, [user]);

  // Helper function to get auth token
  const getAuthToken = (): string | null => {
    if (typeof document === 'undefined') return null;

    // First try cookie
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
        return value;
      }
    }

    // Fallback to localStorage
    return localStorage.getItem('token');
  };

  // Update user's country
  const updateCountry = async (countryId: number) => {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch('https://api.insightabusiness.com/api/account/profile/country', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': locale,
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: JSON.stringify({
        country_id: countryId.toString()
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Failed to update country: ${response.status}`);
    }

    // Handle empty response body
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCountry) {
      setError(t('countryRequired'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      console.log('[UpdateCountry] Updating country to:', selectedCountry.id);
      await updateCountry(selectedCountry.id);

      // Refresh the profile to get updated data
      await refreshProfile();

      console.log('[UpdateCountry] Country updated successfully');

      // Redirect after successful update
      handleRedirect();
    } catch (error) {
      console.error('[UpdateCountry] Error updating country:', error);
      setError(error instanceof Error ? error.message : 'Failed to update country');
      setIsSubmitting(false);
    }
  };

  // Handle redirect after country update
  const handleRedirect = () => {
    // Check for redirect URL in search params first, then localStorage, then cookies
    const redirectUrl = searchParams.get('redirect') ||
                       localStorage.getItem('countryUpdateReturnUrl') ||
                       getCookie('countryUpdateReturnUrl');

    if (redirectUrl) {
      // Clean up stored redirect URLs
      localStorage.removeItem('countryUpdateReturnUrl');
      clearCookie('countryUpdateReturnUrl');

      console.log('[UpdateCountry] Redirecting to return URL:', redirectUrl);

      // Check if it's an Angular route
      if (isAngularRoute(redirectUrl)) {
        const angularPath = redirectUrl.startsWith('/app/') ? redirectUrl : `/app${redirectUrl}`;
        window.location.href = `https://app.insightabusiness.com${angularPath}`;
      } else {
        // Handle relative URLs by ensuring they start with the locale
        let finalUrl = redirectUrl;
        if (redirectUrl.startsWith('/') && !redirectUrl.startsWith(`/${locale}`)) {
          finalUrl = `/${locale}${redirectUrl}`;
        }
        router.push(finalUrl);
      }
    } else {
      // Default redirect based on user roles
      if (user?.country_id) {
        console.log('[UpdateCountry] Redirecting to home page');
        router.push(`/${locale}/home`);
      }
    }
  };

  // Helper function to get cookie value
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;

    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  };

  // Helper function to clear cookie
  const clearCookie = (name: string) => {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isLocalhost) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    } else {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Domain=.insightabusiness.com; Secure; SameSite=None;`;
    }
  };

  // Helper function to check if route is Angular route
  const isAngularRoute = (url: string): boolean => {
    const angularRoutes = [
      '/app/',
      '/profile/',
      '/insighter-dashboard/',
      '/knowledge-detail/',
      '/my-knowledge-base/',
      '/add-knowledge/',
      '/edit-knowledge/',
      '/review-insighter-knowledge/'
    ];

    return angularRoutes.some(route => url.startsWith(route));
  };

  // Get localized country name
  const getLocalizedCountryName = (country: Country): string => {
    return country.names[locale as 'en' | 'ar'] || country.name;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            {t('title')}
          </h1>

          <p className="text-slate-400">
            {t('pleaseSelectCountry')}
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Country Selection */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                {t('country')} *
              </label>

              {countriesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                  <span className="ml-2 text-slate-400">
                    {t('loadingCountries')}
                  </span>
                </div>
              ) : countriesError ? (
                <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg">
                  <p className="text-red-400 text-sm">
                    {t('failedToLoadCountries')}
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <select
                    id="country"
                    value={selectedCountry?.id || ''}
                    onChange={(e) => {
                      const country = countries.find(c => c.id === parseInt(e.target.value));
                      setSelectedCountry(country || null);
                      setError(null);
                    }}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    style={{
                      backgroundImage: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none'
                    }}
                    required
                  >
                    <option value="">
                      {t('selectCountry')}
                    </option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {getLocalizedCountryName(country)}
                      </option>
                    ))}
                  </select>

                  <div className={`absolute inset-y-0 ${locale === 'ar' ? 'left-3' : 'right-3'} flex items-center pointer-events-none`}>
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !selectedCountry || countriesLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin mr-2"></div>
                  {t('updating')}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('updateCountry')}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Note */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            {t('thisInfoRequired')}
          </p>
        </div>
      </div>
    </div>
  );
}