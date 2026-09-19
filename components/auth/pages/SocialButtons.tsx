'use client';
import { useState } from 'react';
import { authRequest, authErrorMessage, writeAuthCookie } from '@/lib/auth-client';
import { getSafeReturnUrl } from '@/lib/authRedirect';
import { AuthNotice } from './AuthShell';

export default function SocialButtons({ locale, returnUrl, beforeStart }: { locale: string; returnUrl?: string | null; beforeStart?: () => Promise<boolean> }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function signIn(provider: 'google' | 'linkedin-openid') {
    if (busy) return;
    setBusy(true); setError('');
    try {
      if (beforeStart && !await beforeStart()) return;
      const target = getSafeReturnUrl(returnUrl);
      writeAuthCookie('auth_return_url', target || '', target ? 3600 : 0);
      writeAuthCookie('preferred_language', locale, 365 * 86400);
      const response = await authRequest(`auth/provider/${provider}`, locale, undefined, { authenticated: false });
      const url = new URL(typeof response === 'string' ? response : response?.url || response?.data);
      const hosts = provider === 'google' ? ['accounts.google.com'] : ['www.linkedin.com', 'linkedin.com'];
      if (url.protocol !== 'https:' || !hosts.includes(url.hostname)) throw new Error('Invalid provider URL');
      window.location.assign(url.href);
    } catch (e) { setError(authErrorMessage(e, locale)); }
    finally { setBusy(false); }
  }
  return <><AuthNotice error={error}/><div className="auth-social">
    <button type="button" disabled={busy} onClick={() => void signIn('google')}><img src="/images/auth/google.svg" alt="" width="16" height="16"/>{locale === 'ar' ? 'الدخول عبر Google' : 'Use Google'}</button>
    <button type="button" disabled={busy} onClick={() => void signIn('linkedin-openid')}><img src="/images/auth/linkedin.svg" alt="" width="16" height="16"/>{locale === 'ar' ? 'الدخول عبر LinkedIn' : 'Use LinkedIn'}</button>
  </div><div className="auth-divider">{locale === 'ar' ? 'أو بالبريد الإلكتروني' : 'Or with email'}</div></>;
}
