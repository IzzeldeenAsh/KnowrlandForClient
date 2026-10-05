import { test as base } from '@e2e-dev/web';

type LoginMode = 'success' | 'invalid' | 'limited';
interface AuthApi {
  mode: LoginMode;
  calls: { path: string; method: string; email?: string }[];
}

const user = {
  id: 123, uuid: 'test-user', email: 'qa@example.test', name: 'QA User',
  first_name: 'QA', last_name: 'User', roles: ['client'], verified: true,
  country_id: 1, profile_photo_url: null,
};
// Synthetic session accepted only by the intercepted API in this test context.
const token = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMjMiLCJleHAiOjQxMDI0NDQ4MDB9.fixture-signature';

export const test = base.extend<{ authApi: AuthApi }>({
  authApi: async ({ browser }, use) => {
    const api: AuthApi = { mode: 'success', calls: [] };
    await browser.route('**/api/**', async route => {
      const { url, method, postData } = route.request;
      const path = new URL(url).pathname;
      const body = postData ? JSON.parse(postData) : {};
      api.calls.push({ path, method, ...(typeof body.email === 'string' ? { email: body.email } : {}) });
      const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': '*' };

      if (method === 'OPTIONS') {
        await route.fulfill({ status: 204, headers });
      } else if (path.endsWith('/auth/login')) {
        if (api.mode === 'invalid') {
          await route.fulfill({ status: 422, headers, json: { message: 'User does not exist', errors: { email: ['User does not exist'] } } });
        } else if (api.mode === 'limited') {
          await route.fulfill({ status: 429, headers, json: { message: 'Too many requests' } });
        } else {
          await route.fulfill({ headers, json: { data: { ...user, token } } });
        }
      } else if (path.endsWith('/account/profile')) {
        await route.fulfill({ headers, json: { data: user } });
      } else {
        await route.fulfill({ headers, json: { data: [] } });
      }
    });
    await use(api);
  },
});
