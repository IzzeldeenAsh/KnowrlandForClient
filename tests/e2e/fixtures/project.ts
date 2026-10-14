import { test as base } from '@e2e-dev/web';
import type { JsonValue } from 'e2e';

export interface ProjectCall {
  path: string;
  method: string;
  body: Record<string, any>;
  raw: string;
}

export interface ProjectApi {
  aiNeedsAnswers?: boolean;
  aiStatus?: 'pending' | 'ready' | 'failed';
  aiPendingChecks?: number;
  aiPendingAfterAnswers?: number;
  aiCatalogBeforeReady?: string[];
  projectServices?: Array<Record<string, any>>;
  definitionMode?: 'simple' | 'advanced';
  failInitiateOnce?: boolean;
  failProjectCatalogOnce?: boolean;
  failScopeOnce?: boolean;
  projectComponents?: Array<Record<string, any>>;
  serviceComponents?: Array<Record<string, any>>;
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
      { id: 3, name: 'Other', slug: 'other' },
    ];
    const rows: Record<string, any>[] = [];
    let properties: Record<string, any> = {};
    let description = '';
    let kickoff = false;
    let definitionMode = 'advanced';
    let lastAiStatus: string | undefined;
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
      const aiCatalog = path.includes('/service-prompt/component/') || path.endsWith('/definition/component/project-1');
      const hasOther = (api.projectServices ?? rows).some(row => row.service?.slug === 'other');
      if (aiCatalog && hasOther && (api.aiNeedsAnswers || api.aiStatus === 'pending' || api.aiStatus === 'failed' || (api.aiPendingChecks ?? 0) > 0 || (lastAiStatus && lastAiStatus !== 'ready'))) {
        (api.aiCatalogBeforeReady ??= []).push(path);
        await route.fulfill({ status: 422, headers, json: { message: 'validation.project_ai_intake_not_ready' } });
        return;
      }

      if (path.endsWith('/account/profile')) {
        data = { id: 123, uuid: 'qa-user', name: 'QA User', first_name: 'QA', last_name: 'User', email: 'qa@example.test', roles: ['client'], verified: true };
      } else if (path.endsWith('/setting/industry/tree')) {
        data = [{ key: 7, label: arabic ? 'التكنولوجيا' : 'Technology', children: [
          { key: 8, label: arabic ? 'البرمجيات' : 'Software', children: [] },
        ] }];
      } else if ((path.endsWith('/setting/service') || path.includes('/setting/service/insighter/'))) {
        data = services;
      } else if (path.endsWith('/setting/region/list')) {
        data = [{ id: 1, name: 'Middle East' }, { id: 2, name: 'Europe' }];
      } else if (path.endsWith('/setting/country/list')) {
        data = [{ id: 1, name: 'Jordan', names: { en: 'Jordan', ar: 'الأردن' }, status: 'active' }];
      } else if (path.endsWith('/definition/initiate') || path.includes('/definition/initiate-specific/')) {
        if (api.failInitiateOnce) {
          api.failInitiateOnce = false;
          await route.fulfill({ status: 422, headers, json: { message: 'Could not create the request. Please retry.' } });
          return;
        }
        definitionMode = body.definition_mode || 'simple';
        rows.push({ uuid: 'service-1', service: services.find(s => s.id === body.service_id), scopes: [], components: [], addons: [] });
        data = { uuid: 'project-1', definition_mode: definitionMode, project_services: rows, ...(path.includes('/initiate-specific/') ? { project_proposal_match_uuid: 'specific-match-1' } : {}) };
      } else if (path.endsWith('/definition/service/project-1') && method === 'POST') {
        const row = { uuid: `service-${rows.length + 1}`, position: rows.length + 1, service: services.find(service => service.id === body.service_id), scopes: [], components: [], addons: [] };
        rows.push(row);
        data = { uuid: row.uuid };
      } else if (path.endsWith('/definition/component/project-1')) {
        if (api.failProjectCatalogOnce) {
          api.failProjectCatalogOnce = false;
          await route.fulfill({ status: 503, headers, json: { message: 'Could not load project components. Please retry.' } });
          return;
        }
        data = api.projectComponents ?? ['target-market', 'data-sources-expected'].map((slug, index) => ({ id: index + 1, name: slug, slug, ownership_level: 'project', definition_mode_visibility: 'both', fillable_by_insighter: false, is_required: true }));
      } else if (path.includes('/ai-intake/check-clarification/')) {
        if ((api.aiPendingChecks ?? 0) > 0) {
          api.aiPendingChecks! -= 1;
          data = { status: 'pending' };
        } else {
          data = api.aiNeedsAnswers ? { status: 'needs_clarification', needs_clarification: true, questions: [{ key: 'market', question: 'Which market?' }] } : { status: api.aiStatus ?? 'ready', suggest_scopes: [] };
        }
        lastAiStatus = (data as { status: string }).status;
      } else if (path.includes('/ai-intake/answers/')) {
        api.aiNeedsAnswers = false;
        api.aiPendingChecks = api.aiPendingAfterAnswers;
        status = 202;
        data = { status: 'processing' };
      } else if (path.includes('/service-prompt/component/')) {
        data = api.serviceComponents ?? [];
      } else if (/\/setting\/service\/component\/[123]$/.test(path)) {
        data = api.serviceComponents ?? [{ id: 3, name: 'Deliverables', slug: 'deliverable-stage', ownership_level: 'project_service', definition_mode_visibility: 'both', fillable_by_insighter: false, is_required: true }];
      } else if (path.includes('/setting/service/scope/')) {
        data = [{ id: 10, name: 'Analysis', children: [{ id: 11, name: 'Market size' }] }];
      } else if (path.includes('/definition/scope/sync/')) {
        const row = rows.find(r => path.endsWith(`/${r.uuid}`));
        if (api.failScopeOnce) {
          api.failScopeOnce = false;
          status = 422;
          response = { message: 'Could not save the scope choice. Please retry.' };
        } else if (row) {
          row.scopes = Array.isArray(body.scopes) ? body.scopes : [{ scope: textField(raw, 'scopes[0][name]'), children: [{ scope: textField(raw, 'scopes[0][subscopes][0][name]') }] }];
        }
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
          id: 1, uuid: 'project-1', title: 'QA Project', definition_mode: api.definitionMode ?? definitionMode, ...properties,
          description, files: [], project_services: api.projectServices ?? rows,
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
