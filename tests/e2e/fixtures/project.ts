import { test as base } from '@e2e-dev/web';
import type { JsonValue } from 'e2e';

export interface ProjectCall {
  path: string;
  method: string;
  body: Record<string, any>;
  raw: string;
}

export interface ProjectApi {
  calls: ProjectCall[];
  unexpected: string[];
  failComponentsOnce: boolean;
  failSubmitOnce: boolean;
}

// Stateful API fixture: real Next.js screens, isolated catalog and project data.
// No project requests leave the browser or reach a production backend.
export const test = base.extend<{ projectApi: ProjectApi }>({
  projectApi: async ({ browser, app }, use) => {
    const api: ProjectApi = {
      calls: [], unexpected: [], failComponentsOnce: false, failSubmitOnce: false,
    };
    const services = [
      { id: 1, name: 'Market research', slug: 'market-research' },
      { id: 2, name: 'Business plan', slug: 'business-plan' },
    ];
    const rows: Record<string, any>[] = [];
    let properties: Record<string, any> = {};
    let description = '';
    let kickoff = false;
    const textField = (raw: string, name: string) => {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return raw.match(new RegExp(`name="${escaped}"\\r\\n\\r\\n([^\\r]*)`))?.[1] || '';
    };
    await browser.route('**/api/**', async route => {
      const { url, method, postData, headers: requestHeaders } = route.request;
      const path = new URL(url).pathname;
      const raw = postData || '';
      const body = raw.startsWith('{') ? JSON.parse(raw) : {};
      const headers = {
        'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      };
      if (method === 'OPTIONS') {
        await route.fulfill({ status: 204, headers });
        return;
      }
      api.calls.push({ path, method, body, raw });
      let data: JsonValue = [];
      let response: JsonValue | undefined;
      let status = 200;
      const arabic = requestHeaders['accept-language'] === 'ar';

      if (path.endsWith('/account/profile')) {
        data = { id: 123, uuid: 'qa-user', name: 'QA User', first_name: 'QA', last_name: 'User', email: 'qa@example.test', roles: ['client'], verified: true };
      } else if (path.endsWith('/setting/industry/tree')) {
        data = [{ key: 7, label: arabic ? 'التكنولوجيا' : 'Technology', children: [
          { key: 8, label: arabic ? 'البرمجيات' : 'Software', children: [] },
        ] }];
      } else if (path.endsWith('/setting/service')) {
        data = services;
      } else if (path.endsWith('/setting/region/list')) {
        data = [{ id: 1, name: 'Middle East' }, { id: 2, name: 'Europe' }];
      } else if (path.endsWith('/setting/country/list')) {
        data = [{ id: 1, name: 'Jordan', names: { en: 'Jordan', ar: 'الأردن' }, status: 'active' }];
      } else if (path.endsWith('/definition/initiate')) {
        rows.push({ uuid: 'service-1', service: services.find(s => s.id === body.service_id), scopes: [], components: [], addons: [] });
        data = { uuid: 'project-1', project_services: rows };
      } else if (path.endsWith('/definition/component/project-1')) {
        data = ['target-market', 'data-sources-expected'].map(slug => ({ slug, ownership_level: 'project' }));
      } else if (path.includes('/setting/service/component/')) {
        data = [{ slug: 'deliverable-stage', ownership_level: 'project_service' }];
      } else if (path.includes('/setting/service/scope/')) {
        data = [{ id: 10, name: 'Analysis', children: [{ id: 11, name: 'Market size' }] }];
      } else if (path.includes('/definition/scope/sync/')) {
        const row = rows.find(r => path.endsWith(`/${r.uuid}`));
        if (row) row.scopes = [{ scope: textField(raw, 'scopes[0][name]'), children: [{ scope: textField(raw, 'scopes[0][subscopes][0][name]') }] }];
      } else if (path.includes('/definition/component/sync/')) {
        if (api.failComponentsOnce) {
          api.failComponentsOnce = false;
          status = 422;
          response = { message: 'Please correct deliverables.' };
        } else {
          const row = rows.find(r => path.endsWith(`/${r.uuid}`));
          if (row) row.components = Object.entries(body.components || {}).map(([key, value]) => ({ [key]: value }));
        }
      } else if (path.includes('/definition/properties/sync/')) {
        properties = body;
      } else if (path.includes('/definition/description/sync/')) {
        description = textField(raw, 'description');
      } else if (path.includes('/definition/addon/sync/')) {
        kickoff = raw.includes('addons[kickoff-meeting][date]');
      } else if (path.includes('/definition/addon/during/')) {
        data = [{ slug: 'kickoff-meeting', name: 'Kickoff meeting' }];
      } else if (path.endsWith('/project/show/project-1')) {
        data = {
          id: 1, uuid: 'project-1', title: 'QA Project', ...properties,
          description, files: [], project_services: rows,
          components: Object.entries((properties.components || {}) as Record<string, JsonValue>).map(([key, value]) => ({ [key]: value })),
          addons: kickoff ? [{ slug: 'kickoff-meeting', name: 'Kickoff meeting', value: { date: '' } }] : [],
        };
      } else if (path.endsWith('/proposal/match/list/project-1')) {
        response = { unsubmitted: [{ proposal_uuid: 'proposal-1', matches: [{
          uuid: 'match-1', insighter: { uuid: 'expert-1', name: 'QA Expert', roles: ['insighter'] },
          match_score: 0.95,
        }] }] };
      } else if (path.endsWith('/proposal/submit/proposal-1')) {
        if (api.failSubmitOnce) {
          api.failSubmitOnce = false;
          status = 503;
          response = { message: 'Submission temporarily unavailable. Please retry.' };
        }
      } else if (path.startsWith('/api/account/project/')) {
        // Fail closed: a new or misspelled project endpoint must not silently pass.
        api.unexpected.push(`${method} ${path}`);
        status = 501;
        response = { message: `Unimplemented project fixture: ${path}` };
      }
      await route.fulfill({ status, headers, json: response ?? { data } });
    });
    await browser.setCookies([{
      name: 'token',
      value: 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMjMiLCJleHAiOjQxMDI0NDQ4MDB9.fixture-signature',
      url: app.baseUrl!,
    }]);
    await use(api);
  },
});
