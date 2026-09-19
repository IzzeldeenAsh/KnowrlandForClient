import test from 'node:test';
import assert from 'node:assert/strict';
import { safeReturnUrl, verificationUrl } from '../lib/auth-policy.ts';
const site = 'https://insightabusiness.com';
const angular = 'https://app.insightabusiness.com';
test('preserves internal destinations, locale, query and hash', () => {
  assert.equal(safeReturnUrl('/ar/knowledge/report/test?booking=1#details', site, angular), '/ar/knowledge/report/test?booking=1#details');
  assert.equal(safeReturnUrl(site + '/en/project?step=2', site, angular), '/en/project?step=2');
});
test('routes only known Angular paths to the configured exact origin', () => {
  assert.equal(safeReturnUrl('/ar/app/insighter-dashboard/my-dashboard?x=1', site, angular), angular + '/app/insighter-dashboard/my-dashboard?x=1');
  assert.equal(safeReturnUrl('https://app.evil.example/app/dashboard', site, angular), null);
  assert.equal(safeReturnUrl(angular + '/unrecognized', site, angular), null);
});
test('rejects external origins, credentials, unexpected schemes and auth loops', () => {
  for (const value of ['https://insightabusiness.com.evil.example/en', 'https://evil.example/?insightabusiness.com', '//evil.example', 'javascript:alert(1)', 'https://insightabusiness.com@evil.example', 'https://user:pass@insightabusiness.com/en', 'https://insightabusiness.com:444/en', '/\\evil.example', '/en/signin', '/ar/callback?returnUrl=/en', '/auth/login', ' /en', '/en\n']) assert.equal(safeReturnUrl(value, site, angular), null, value);
});
test('allows configured localhost ports only and strips tokens', () => {
  assert.equal(safeReturnUrl('http://localhost:4200/app/dashboard', 'http://localhost:3000', 'http://localhost:4200'), 'http://localhost:4200/app/dashboard');
  assert.equal(safeReturnUrl('http://localhost:5000/app/dashboard', 'http://localhost:3000', 'http://localhost:4200'), null);
  assert.equal(safeReturnUrl('/en/project?token=secret&access_token=secret&x=1', site, angular), '/en/project?x=1');
});
test('email verification only calls the configured API verification endpoint', () => {
  const api = 'https://api.insightabusiness.com';
  assert.equal(verificationUrl('/api/email/verify/42/hash?expires=123&signature=test', api), api + '/api/email/verify/42/hash?expires=123&signature=test');
  assert.equal(verificationUrl('42/hash?signature=test', api), api + '/api/email/verify/42/hash?signature=test');
  for (const value of ['https://api.insightabusiness.com.evil.example/api/email/verify/x', '//evil.example/api/email/verify/x', api+'/api/account/profile', api+'/api/email/verify/../../account/profile']) assert.equal(verificationUrl(value, api), null);
});
