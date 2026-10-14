import { expect, type TestFixtures } from 'e2e';
import type { Browser } from '@e2e-dev/web';
import { test, type ProjectApi } from './fixtures/project';

type Wizard = TestFixtures & { browser: Browser; projectApi: ProjectApi };
const dataSources = { id: 2, name: 'Expected data sources', slug: 'data-sources-expected', ownership_level: 'project', definition_mode_visibility: 'both', is_required: true };
const targetMarket = { id: 1, name: 'Target market', slug: 'target-market', ownership_level: 'project', definition_mode_visibility: 'both', is_required: true };

async function chooseService(ctx: Wizard) {
  await ctx.app.open('/en/project/wizard/project-schedule');
  await ctx.screen.getByRole('button', 'Continue').tap();
  await expect(ctx.browser).toHaveURL('/en/project/wizard/service');
  expect(ctx.projectApi.calls.filter(call => call.path.startsWith('/api/account/project/'))).toHaveLength(0);
  await ctx.screen.getByRole('radio', /^Market research/).tap();
  await expect(ctx.browser).toHaveURL('/en/project/wizard/definition-mode');
  expect(ctx.projectApi.calls.filter(call => call.path.includes('/definition/component/'))).toHaveLength(0);
}

test('empty component response skips component questions and hides stale answers from review', { tags: ['project', 'components'], timeout: 120_000 }, async ctx => {
  const { app, browser, screen, projectApi } = ctx;
  projectApi.projectComponents = [];
  projectApi.serviceComponents = [];
  await chooseService(ctx);
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/project/wizard/project-description');
  const projectCalls = projectApi.calls.filter(call => call.path.includes('/definition/'));
  expect(projectCalls.findIndex(call => call.path.endsWith('/initiate'))).toBeLessThan(projectCalls.findIndex(call => call.path.endsWith('/component/project-1')));
  await browser.evaluate(() => {
    sessionStorage.setItem('project:wizard:en:serviceComponentsPayload', JSON.stringify({ components: { 'target-market': { type: 'country', ids: [1] }, 'data-sources-expected': 'both' } }));
    return null;
  });
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/project/wizard/addons-intro');
  expect(projectApi.calls.find(call => call.path.includes('/properties/sync/'))?.body.components).toEqual({});
  await app.open('/en/project/wizard/project-review');
  await expect(screen.getByRole('button', 'Find your Experts')).toBeVisible();
  await expect(screen.getByText('Target market')).toHaveCount(0);
  await expect(screen.getByRole('link', 'Edit: Target market')).toHaveCount(0);
  await expect(screen.getByText('Expected data sources')).toHaveCount(0);
  await app.open('/en/project/wizard/target-market');
  await expect(browser).toHaveURL('/en/project/wizard/project-description');
  await expect(screen.getByRole('radio', 'Worldwide')).toHaveCount(0);
  expect(projectApi.unexpected).toEqual([]);
});

test('component questions wait for a successful API response and retry with only returned questions', { tags: ['project', 'components'], timeout: 120_000 }, async ctx => {
  const { browser, screen, projectApi } = ctx;
  projectApi.projectComponents = [dataSources];
  projectApi.serviceComponents = [];
  projectApi.failProjectCatalogOnce = true;
  await chooseService(ctx);
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/project/wizard/component-setup');
  await expect(screen.getByText('Could not load project components. Please retry.')).toBeVisible();
  await expect(screen.getByRole('radio')).toHaveCount(0);
  await screen.getByRole('button', 'Try again').tap();
  await expect(browser).toHaveURL('/en/project/wizard/data-sources-expected');
  await screen.getByRole('link', 'Back').tap();
  await expect(browser).toHaveURL('/en/project/wizard/definition-mode');
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/project/wizard/data-sources-expected');
  await screen.getByRole('radio', 'Both').tap();
  await expect(browser).toHaveURL('/en/project/wizard/project-description');
  expect(projectApi.calls.filter(call => call.path.endsWith('/definition/initiate'))).toHaveLength(1);
  expect(projectApi.unexpected).toEqual([]);
});

test('refreshed component response replaces removed questions and their catalog metadata', { tags: ['project', 'components'], timeout: 120_000 }, async ctx => {
  const { app, browser, screen, projectApi } = ctx;
  projectApi.projectComponents = [targetMarket, dataSources];
  projectApi.serviceComponents = [];
  await chooseService(ctx);
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/project/wizard/target-market');
  await screen.getByRole('radio', 'Worldwide').tap();
  await expect(browser).toHaveURL('/en/project/wizard/data-sources-expected');
  projectApi.projectComponents = [dataSources];
  await app.open('/en/project/wizard/component-setup');
  await expect(browser).toHaveURL('/en/project/wizard/data-sources-expected');
  expect(await browser.evaluate(() => JSON.parse(sessionStorage.getItem('project:wizard:en:componentCatalog') || '[]').map((item: { slug: string }) => item.slug))).toEqual(['data-sources-expected']);
  await screen.getByRole('radio', 'Primary data').tap();
  await expect(browser).toHaveURL('/en/project/wizard/project-description');
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/project/wizard/addons-intro');
  expect(projectApi.calls.find(call => call.path.includes('/properties/sync/'))?.body.components).toEqual({ 'data-sources-expected': 'primary_data' });
  expect(projectApi.unexpected).toEqual([]);
});

test('adding a service loads new project components and preserves API-owned project answers', { tags: ['project', 'components'], timeout: 120_000 }, async ({ app, browser, screen, projectApi }) => {
  const context = { id: 4, name: 'Project context', slug: 'project-context', ownership_level: 'project', definition_mode_visibility: 'both', is_required: true };
  projectApi.projectComponents = [context];
  projectApi.serviceComponents = [];
  await app.open('/en/project/wizard/service');
  await browser.evaluate(() => { sessionStorage.setItem('project:wizard:en:specifiedInsighterUuid', 'expert-1'); return null; });
  await browser.reload();
  await screen.getByRole('radio', /^Market research/).tap();
  await expect(browser).toHaveURL('/en/project/wizard/definition-mode');
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/project/wizard/services-summary');
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/project/wizard/project-context');
  await screen.getByLabel('Project context').fill('A project answer shared across services.');
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/project/wizard/project-description');
  await app.open('/en/project/wizard/services-summary');
  projectApi.projectComponents = [context, dataSources];
  await screen.getByRole('button', /^Add another service/).tap();
  await expect(browser).toHaveURL('/en/project/wizard/service');
  await screen.getByRole('radio', /^Business plan/).tap();
  await expect(browser).toHaveURL('/en/project/wizard/services-summary');
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/project/wizard/project-context');
  await expect(screen.getByLabel('Project context')).toHaveValue('A project answer shared across services.');
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/project/wizard/data-sources-expected');
  await screen.getByRole('radio', 'Both').tap();
  await expect(browser).toHaveURL('/en/project/wizard/project-description');
  const answers = await browser.evaluate(() => JSON.parse(sessionStorage.getItem('project:wizard:en:serviceComponentsPayload') || '{}').components);
  expect(answers).toEqual({ 'project-context': 'A project answer shared across services.', 'data-sources-expected': 'both' });
  expect(projectApi.calls.filter(call => call.path.endsWith('/definition/component/project-1'))).toHaveLength(2);
  expect(projectApi.unexpected).toEqual([]);
});

test('switching back to the primary service restores its API component metadata and answers', { tags: ['project', 'components'], timeout: 120_000 }, async ({ app, browser, screen, projectApi }) => {
  projectApi.projectComponents = [];
  projectApi.serviceComponents = [{ id: 5, name: 'Service details', slug: 'service-details', ownership_level: 'project_service', definition_mode_visibility: 'both', is_required: true }];
  await app.open('/en/project/wizard/service');
  await browser.evaluate(() => { sessionStorage.setItem('project:wizard:en:specifiedInsighterUuid', 'expert-1'); return null; });
  await browser.reload();
  await screen.getByRole('radio', /^Market research/).tap();
  await expect(browser).toHaveURL('/en/project/wizard/definition-mode');
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/project/wizard/service-details');
  await screen.getByLabel('Service details').fill('Primary service input.');
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/project/wizard/services-summary');
  projectApi.serviceComponents = [{ id: 6, name: 'Business details', slug: 'business-details', ownership_level: 'project_service', definition_mode_visibility: 'both', is_required: true }];
  await screen.getByRole('button', /^Add another service/).tap();
  await expect(browser).toHaveURL('/en/project/wizard/service');
  await screen.getByRole('radio', /^Business plan/).tap();
  await expect(browser).toHaveURL('/en/project/wizard/business-details');
  await screen.getByLabel('Business details').fill('Second service input.');
  await screen.getByRole('button', 'Continue').tap();
  await expect(browser).toHaveURL('/en/project/wizard/services-summary');
  expect(await browser.evaluate(() => JSON.parse(sessionStorage.getItem('project:wizard:en:componentCatalog') || '[]').map((item: { slug: string }) => item.slug))).toEqual(['service-details']);
  await app.open('/en/project/wizard/service-details');
  await expect(screen.getByLabel('Service details')).toHaveValue('Primary service input.');
  expect(projectApi.calls.filter(call => call.path.includes('/definition/component/sync/')).map(call => call.body.components)).toEqual([
    { 'service-details': 'Primary service input.' },
    { 'business-details': 'Second service input.' },
  ]);
  expect(projectApi.unexpected).toEqual([]);
});
