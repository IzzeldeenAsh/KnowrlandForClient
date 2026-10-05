import { credentials, expect } from 'e2e';
import { test } from './fixtures/auth.ts';

test('sign-in opens with accessible controls', { tags: ['smoke', 'auth'] }, async ({ app, screen, browser }) => {
  await app.open('/en/signin');
  await expect(screen.getByRole('heading', 'Welcome To Insighta')).toBeVisible();
  await expect(screen.getByLabel('Email')).toHaveAttribute('autocomplete', 'username');
  await expect(screen.getByLabel(/^Password\b/)).toBeVisible();
  await screen.getByRole('button', 'Show password').tap();
  await expect(screen.getByRole('button', 'Hide password')).toHaveAttribute('aria-pressed', 'true');
  await screen.getByRole('button', 'Hide password').tap();
  await expect(screen.getByRole('button', 'Show password')).toHaveAttribute('aria-pressed', 'false');
  expect(await browser.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('empty sign-in shows field errors without calling the API', { tags: ['auth'] }, async ({ app, screen, browser, authApi }) => {
  await app.open('/en/signin');
  await expect(screen.getByRole('heading', 'Welcome To Insighta')).toBeVisible();
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser.locator('#email-error')).toHaveText('This field is required.');
  await expect(browser.locator('#password-error')).toHaveText('This field is required.');
  expect(authApi.calls.filter(call => call.path.endsWith('/auth/login'))).toHaveLength(0);
});

test('invalid credentials and rate limiting leave sign-in retryable', { tags: ['auth'] }, async ({ app, screen, browser, authApi }) => {
  authApi.mode = 'invalid';
  const account = credentials.user('fixture');
  await app.open('/en/signin');
  await screen.getByLabel('Email').fill(account.username);
  await screen.getByLabel(/^Password\b/).fill(account.password);
  await screen.getByRole('button', 'Continue').tap();
  await expect(screen.getByRole('alert').filter({ hasText: 'The email or password is incorrect.' })).toHaveText('The email or password is incorrect.');
  await expect(screen.getByRole('button', 'Continue')).toBeEnabled();

  authApi.mode = 'limited';
  await screen.getByRole('button', 'Continue').tap();
  await expect(screen.getByRole('alert').filter({ hasText: 'Too many attempts.' })).toHaveText('Too many attempts. Please wait and try again.');
  await expect(screen.getByRole('button', 'Continue')).toBeEnabled();
  await expect(browser).toHaveURL('/en/signin');
  expect(authApi.calls.filter(call => call.path.endsWith('/auth/login') && call.method === 'POST')).toHaveLength(2);
});

test('verified sign-in follows a safe return URL and keeps the session out of local storage', { tags: ['smoke', 'auth'] }, async ({ app, screen, browser, authApi }) => {
  const account = credentials.user('fixture');
  await app.open('/en/signin?returnUrl=%2Fen%2Flegals%2Fprivacy');
  await screen.getByLabel('Email').fill(account.username);
  await screen.getByLabel(/^Password\b/).fill(account.password);
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/legals/privacy');
  await expect(screen.getByRole('heading', 'Privacy Policy – Insighta Business')).toBeVisible();
  expect(authApi.calls.filter(call => call.path.endsWith('/auth/login') && call.method === 'POST')).toEqual([
    { path: '/api/auth/login', method: 'POST', email: account.username },
  ]);
  expect((await browser.cookies()).some(cookie => cookie.name === 'token')).toBe(true);
  expect(await browser.evaluate(() => localStorage.getItem('token'))).toBeNull();
  expect(new URL(await browser.url()).searchParams.has('token')).toBe(false);
});

test('Arabic sign-in fits the viewport and preserves the return URL when switching language', { tags: ['smoke', 'auth', 'i18n'] }, async ({ app, screen, browser }) => {
  await app.open('/ar/signin?returnUrl=%2Far%2Fproject');
  await expect(screen.getByRole('heading', 'أهلاً بكم في إنسايتا')).toBeVisible();
  await expect(browser.locator('html')).toHaveAttribute('dir', 'rtl');
  expect(await browser.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await screen.getByRole('link', 'English').tap();
  await expect(screen.getByRole('heading', 'Welcome To Insighta')).toBeVisible();
  await expect(browser).toHaveURL('/en/signin?returnUrl=%2Far%2Fproject');
});
