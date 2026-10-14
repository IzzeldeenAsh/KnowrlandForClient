import { expect } from 'e2e';
import type { Browser } from '@e2e-dev/web';
import { test } from './fixtures/project';

async function seedService(browser: Browser, mode: 'simple' | 'advanced' = 'simple', other = true) {
  await browser.evaluate(({ mode, other }) => {
    const values = {
      projectType: 'ad_hoc', definitionMode: mode, projectUuid: 'project-1', projectServiceUuid: 'service-1',
      serviceIds: JSON.stringify([other ? 3 : 1]), serviceIsOther: other ? '1' : '0',
      // Resumed sessions still have to check the server, even with a cached ready marker.
      aiIntakeReady: 'service-1',
    };
    Object.entries(values).forEach(([key, value]) => sessionStorage.setItem(`project:wizard:en:${key}`, value));
    return null;
  }, { mode, other });
}

test('component setup waits beyond six pending checks and loads both catalogs only when ready', { tags: ['project', 'ai-readiness'], timeout: 120_000 }, async ({ app, browser, screen, projectApi }) => {
  projectApi.aiStatus = 'pending';
  projectApi.projectServices = [{ uuid: 'service-1', service: { id: 3, slug: 'other' } }];
  await app.open('/en/project/wizard/service');
  await seedService(browser);
  await app.open('/en/project/wizard/component-setup');
  await expect(screen.getByRole('status')).toContainText('Analyzing your request');
  await expect.poll(() => projectApi.calls.filter(call => call.path.includes('/ai-intake/check-clarification/')).length, { timeout: 50_000 }).toBeGreaterThanOrEqual(7);
  expect(projectApi.calls.filter(call => call.path.includes('/service-prompt/component/') || call.path.endsWith('/definition/component/project-1'))).toHaveLength(0);
  projectApi.aiStatus = 'ready';
  await expect(browser).toHaveURL('/en/project/wizard/target-market');
  expect(projectApi.calls.filter(call => call.path.includes('/service-prompt/component/'))).toHaveLength(1);
  expect(projectApi.calls.filter(call => call.path.endsWith('/definition/component/project-1'))).toHaveLength(1);
  expect(projectApi.aiCatalogBeforeReady ?? []).toEqual([]);
  expect(projectApi.unexpected).toEqual([]);
});

test('AI intake step keeps waiting past the former timeout before proceeding to components', { tags: ['project', 'ai-readiness'], timeout: 120_000 }, async ({ app, browser, screen, projectApi }) => {
  projectApi.aiStatus = 'pending';
  projectApi.projectServices = [{ uuid: 'service-1', service: { id: 3, slug: 'other' } }];
  await app.open('/en/project/wizard/service');
  await seedService(browser);
  await browser.evaluate(() => { sessionStorage.removeItem('project:wizard:en:aiIntakeReady'); return null; });
  await app.open('/en/project/wizard/ai-intake');
  await expect.poll(() => projectApi.calls.filter(call => call.path.includes('/ai-intake/check-clarification/')).length, { timeout: 50_000 }).toBeGreaterThanOrEqual(7);
  await expect(browser).toHaveURL('/en/project/wizard/ai-intake');
  await expect(screen.getByText('Thinking...')).toBeVisible();
  expect(projectApi.calls.filter(call => call.path.includes('/service-prompt/component/') || call.path.endsWith('/definition/component/project-1'))).toHaveLength(0);
  projectApi.aiStatus = 'ready';
  await expect(browser).toHaveURL('/en/project/wizard/target-market');
  expect(projectApi.aiCatalogBeforeReady ?? []).toEqual([]);
  expect(projectApi.unexpected).toEqual([]);
});

for (const mode of ['simple', 'advanced'] as const) {
  test(`${mode} component setup asks for clarification and waits after submitting answers`, { tags: ['project', 'ai-readiness'], timeout: 90_000 }, async ({ app, browser, screen, projectApi }) => {
    projectApi.aiNeedsAnswers = true;
    projectApi.aiPendingAfterAnswers = 2;
    projectApi.projectServices = [{ uuid: 'service-1', service: { id: 3, slug: 'other' } }];
    await app.open('/en/project/wizard/service');
    await seedService(browser, mode);
    await app.open('/en/project/wizard/component-setup');
    await expect(screen.getByText('Which market?')).toBeVisible();
    expect(projectApi.calls.filter(call => call.path.includes('/service-prompt/component/') || call.path.endsWith('/definition/component/project-1'))).toHaveLength(0);
    await screen.getByRole('textbox').fill('Jordan');
    await screen.getByRole('button', 'Send answers').tap();
    await expect(browser).toHaveURL('/en/project/wizard/target-market', { timeout: 30_000 });
    expect(projectApi.calls.find(call => call.path.includes('/ai-intake/answers/'))?.body).toEqual({ answers: [{ key: 'market', answer: 'Jordan' }] });
    expect(projectApi.aiCatalogBeforeReady ?? []).toEqual([]);
    expect(projectApi.unexpected).toEqual([]);
  });
}

test('failed analysis blocks catalogs and can be retried', { tags: ['project', 'ai-readiness'], timeout: 60_000 }, async ({ app, browser, screen, projectApi }) => {
  projectApi.aiStatus = 'failed';
  await app.open('/en/project/wizard/service');
  await seedService(browser);
  await app.open('/en/project/wizard/component-setup');
  await expect(screen.getByRole('status')).toContainText('The request could not be analyzed');
  expect(projectApi.calls.filter(call => call.path.includes('/service-prompt/component/') || call.path.endsWith('/definition/component/project-1'))).toHaveLength(0);
  projectApi.aiStatus = 'ready';
  await screen.getByRole('button', 'Try again').tap();
  await expect(browser).toHaveURL('/en/project/wizard/target-market');
  expect(projectApi.unexpected).toEqual([]);
});

test('predefined services load components without waiting for AI', { tags: ['project', 'ai-readiness'], timeout: 60_000 }, async ({ app, browser, projectApi }) => {
  projectApi.aiStatus = 'pending';
  projectApi.serviceComponents = [];
  await app.open('/en/project/wizard/service');
  await seedService(browser, 'simple', false);
  await app.open('/en/project/wizard/component-setup');
  await expect(browser).toHaveURL('/en/project/wizard/target-market');
  expect(projectApi.calls.filter(call => call.path.includes('/ai-intake/'))).toHaveLength(0);
  expect(projectApi.unexpected).toEqual([]);
});
