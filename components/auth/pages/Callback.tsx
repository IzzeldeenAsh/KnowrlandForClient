'use client';
import { clearPendingVerification } from '@/lib/pending-verification';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getAuthToken, getTokenFromCookie } from '@/lib/authToken';
import { authRequest, clearSession, AuthError, AuthUser, takeLoginUser, storeSession, seedProfile, writeAuthCookie, authErrorMessage } from '@/lib/auth-client';
import { authPageUrl, getSafeReturnUrl, getAngularAppOrigin } from '@/lib/authRedirect';
import { fetchOnboardingPromptStatuses, fetchInsighterPromptStatuses, getVisibleSupportedPrompts, getVisibleInsighterPrompts, hasInsighterPromptRole, withInsighterSetupMarker } from '@/services/onboarding.service';
import { AuthShell, AuthNotice } from './AuthShell';
const Agreement = dynamic(() => import('./Agreement'), { ssr: false });
export default function Callback({ locale }: { locale: string }) {
  const router = useRouter(); const search = useSearchParams(); const ar = locale === 'ar'; const started = useRef(false);
  const [error, setError] = useState(''); const [attempt, setAttempt] = useState(0);
  const [agreement, setAgreement] = useState<string | null>(null); const destination = useRef(`/${locale}`);
  const rawReturn = search.get('returnUrl') || getTokenFromCookie('auth_return_url') || getTokenFromCookie('signUpReturnUrl');
  function navigate() {
    writeAuthCookie('auth_return_url', '', 0); writeAuthCookie('signUpReturnUrl', '', 0);
    const safe = getSafeReturnUrl(destination.current) || `/${locale}`;
    if (safe.startsWith('http')) window.location.replace(safe); else router.replace(safe);
  }
  useEffect(() => {
    if (started.current) return; started.current = true;
    async function complete() {
      try {
        // Compatibility with old links only: remove credentials before any API request.
        const incoming = new URL(window.location.href).searchParams.get('token');
        if (incoming) {
          const clean = new URL(window.location.href); clean.searchParams.delete('token'); clean.searchParams.delete('roles');
          window.history.replaceState(null, '', clean.pathname + clean.search);
          storeSession(incoming);
        }
        const token = getAuthToken();
        if (!token) { router.replace(authPageUrl('signin', locale, rawReturn)); return; }
        let user: AuthUser = takeLoginUser() || (await authRequest('account/profile', locale)).data;
        if (user.verified === false) { router.replace(authPageUrl('verify-email', locale, rawReturn)); return; }
        clearPendingVerification();
        seedProfile(user);
        writeAuthCookie('preferred_language', locale, 365 * 86400);
        // Best effort, off the navigation critical path.
        void authRequest('account/timezone/set', locale, { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }).catch(() => {});
        const roles = Array.isArray(user.roles) ? user.roles : [];
        if (roles.includes('admin') || roles.includes('staff')) { destination.current = `/${locale}/dashboard/users/clients`; navigate(); return; }
        const professional = hasInsighterPromptRole(roles);
        destination.current = getSafeReturnUrl(rawReturn) || (professional ? `${getAngularAppOrigin()}/app/insighter-dashboard/my-dashboard` : `/${locale}`);
        const [prompts, insighter, accepted] = await Promise.allSettled([
          fetchOnboardingPromptStatuses({ token, locale }),
          professional ? fetchInsighterPromptStatuses({ token, locale }) : Promise.resolve([]),
          professional ? authRequest('account/agreement/check', locale) : Promise.resolve({ data: { accept: true } }),
        ]);
        if (insighter.status === 'fulfilled' && getVisibleInsighterPrompts(insighter.value).length) destination.current = withInsighterSetupMarker(destination.current);
        if (prompts.status === 'fulfilled' && getVisibleSupportedPrompts(prompts.value).length) destination.current = `/${locale}/onboarding?redirect=${encodeURIComponent(destination.current)}`;
        // Preserve the existing agreement failure/skip behavior.
        if (accepted.status === 'fulfilled' && accepted.value?.data?.accept === false) {
          setAgreement(roles.includes('company') ? 'company_agreement' : 'insighter_agreement'); return;
        }
        navigate();
      } catch (e) {
        if (e instanceof AuthError && e.status === 401) { clearSession(); router.replace(authPageUrl('signin', locale, rawReturn)); return; }
        if (e instanceof AuthError && e.status === 403 && /verif/i.test(e.message)) { router.replace(authPageUrl('verify-email', locale, rawReturn)); return; }
        // A temporary network failure must not erase a valid shared session.
        setError(authErrorMessage(e, locale));
      }
    }
    void complete();
  }, [attempt]);
  return <AuthShell locale={locale} title={ar ? 'جارٍ تسجيل الدخول' : 'Signing you in'}>
    <AuthNotice error={error}/>{error ? <button className="auth-primary" onClick={() => { setError(''); started.current = false; setAttempt(x => x + 1); }}>{ar ? 'إعادة المحاولة' : 'Try again'}</button> : <div className="auth-status" role="status"><span className="auth-spinner"/>{ar ? 'نجهّز حسابك…' : 'Getting your account ready…'}</div>}
    {agreement && <Agreement locale={locale} type={agreement} professional onAccept={navigate} onCancel={navigate}/>}
  </AuthShell>;
}
