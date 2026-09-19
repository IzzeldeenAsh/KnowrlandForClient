// Keep an email-link code in this tab only while the user signs in, never in a return URL.
const key = 'pending-email-verification';
export function savePendingVerification(code: string): void {
  if (!/^\d{6}$/.test(code)) return;
  try { sessionStorage.setItem(key, JSON.stringify({ code, expires: Date.now() + 3600000 })); } catch {}
}
export function readPendingVerification(): string {
  try {
    const value = JSON.parse(sessionStorage.getItem(key) || 'null');
    if (value && /^\d{6}$/.test(value.code) && value.expires > Date.now()) return value.code;
    sessionStorage.removeItem(key);
  } catch {}
  return '';
}
export function clearPendingVerification(): void {
  try { sessionStorage.removeItem(key); } catch {}
}
