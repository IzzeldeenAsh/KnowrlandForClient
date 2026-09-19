'use client';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { authRequest, clearSession } from '@/lib/auth-client';
import { getSafeReturnUrl } from '@/lib/authRedirect';
import { getAuthToken } from '@/lib/authToken';
import { AuthShell } from './AuthShell';
export default function SignOut({ locale }: { locale: string }) {
  const search = useSearchParams(); const started = useRef(false);
  useEffect(() => {
    if (started.current) return; started.current = true;
    const destination = getSafeReturnUrl(search.get('returnUrl') || search.get('redirect_uri')) || `/${locale}`;
    async function logout() {
      try { if (getAuthToken()) await authRequest('account/logout', locale, {}, { signal: AbortSignal.timeout(8000) }); }
      catch { /* Match legacy logout: local signout still works while offline. */ }
      finally { clearSession(); window.location.replace(destination); }
    }
    void logout();
  }, []);
  return <AuthShell locale={locale} title={locale === 'ar' ? 'جارٍ تسجيل الخروج' : 'Signing out'}><div className="auth-status" role="status"><span className="auth-spinner"/>{locale === 'ar' ? 'يرجى الانتظار…' : 'Please wait…'}</div></AuthShell>;
}
