import { expect, type TestFixtures } from 'e2e';
import type { Browser } from '@e2e-dev/web';
import { test, type ProjectApi } from './fixtures/project.ts';

type Wizard = TestFixtures & { browser: Browser; projectApi: ProjectApi };
const path = (step: string) => `/en/project/wizard/${step}`;

async function step(ctx: Wizard, name: string) {
  await expect(ctx.browser).toHaveURL(path(name));
}

async function preferences(ctx: Wizard, type = /^Ad hoc/, chooseType?: () => Promise<unknown>) {
  const { app, screen } = ctx;
  await app.open(`${path('project-type')}?fresh=1`);
  await expect(screen.getByRole('button', 'Continue')).toBeDisabled();
  if (chooseType) await chooseType();
  else await screen.getByRole('radio', type).tap();
  await step(ctx, 'deliverables-language');
  await screen.getByRole('radio', 'English').tap();
  await step(ctx, 'insighter-industry');
  await screen.getByRole('radio', 'Technology').tap();
  await step(ctx, 'insighter-sub-industry');
  await screen.getByRole('radio', 'Software').tap();
  await step(ctx, 'project-status');
  await screen.getByRole('radio', /^Idea stage/).tap();
  await step(ctx, 'who-are-you');
  await screen.getByRole('radio', /^Startup/).tap();
  await step(ctx, 'preferred-insighter-type');
}

test('project request completes every step and retries failed saves without losing answers', {
  tags: ['project', 'smoke'], timeout: 240_000,
}, async ctx => {
  const { screen, browser, projectApi } = ctx;
  await preferences(ctx);
  await screen.getByRole('radio', /^Any/).tap();
  await step(ctx, 'project-schedule');
  await screen.getByRole('textbox', /^Duration in days\b/).fill('45');
  await screen.getByRole('textbox', /^Duration in days\b/).press('Enter');
  await screen.getByRole('button', 'Continue').tap();
  await step(ctx, 'target-market');
  await screen.getByRole('link', 'Back').tap();
  await step(ctx, 'project-schedule');
  await browser.reload();
  await expect(screen.getByRole('textbox', /^Duration in days\b/)).toHaveValue('45');
  await screen.getByRole('button', 'Continue').tap();
  await step(ctx, 'target-market');
  await screen.getByRole('radio', 'Worldwide').tap();
  await step(ctx, 'data-sources-expected');
  await screen.getByRole('radio', 'Both').tap();
  await step(ctx, 'service');
  expect(projectApi.calls.filter(c => c.path.includes('/definition/initiate'))).toHaveLength(0);
  await expect(screen.getByRole('button', 'Continue')).toBeDisabled();
  await screen.getByRole('radio', /^Market research/).tap();
  await step(ctx, 'project-scope');
  expect(projectApi.calls.filter(c => c.path.endsWith('/definition/initiate'))).toHaveLength(1);
  expect(projectApi.calls.find(c => c.path.endsWith('/definition/initiate'))?.body).toMatchObject({
    service_id: 1, insighter_industry_id: 8, language: 'english', type: 'ad_hoc',
  });
  await expect(screen.getByRole('button', 'Continue')).toBeDisabled();
  await screen.getByRole('checkbox', 'Analysis').check();
  await screen.getByRole('button', 'Continue').tap();
  await step(ctx, 'project-subscopes');
  await expect(screen.getByRole('button', 'Continue')).toBeDisabled();
  await screen.getByRole('button', 'Market size').tap();
  await screen.getByRole('button', 'Continue').tap();
  await step(ctx, 'deliverables-plan');
  await screen.getByRole('button', 'Continue').tap();
  await expect(screen.getByText('Enter a name for this deliverable.')).toBeVisible();
  expect(projectApi.calls.filter(c => c.path.includes('/definition/component/sync/'))).toHaveLength(0);
  await screen.getByLabel('Deliverable name').fill('Market opportunity report');
  projectApi.failComponentsOnce = true;
  await screen.getByRole('button', 'Continue').tap();
  await expect(screen.getByText('Please correct deliverables.').first()).toBeVisible();
  await step(ctx, 'deliverables-plan');
  await expect(screen.getByLabel('Deliverable name')).toHaveValue('Market opportunity report');
  await screen.getByRole('button', 'Continue').tap();
  await step(ctx, 'project-description');
  await screen.getByRole('textbox').fill('Assess the Jordanian software market and identify customer segments.');
  await screen.getByRole('button', 'Continue').tap();
  await step(ctx, 'addons-intro');
  await screen.getByRole('button', 'Show the add-on').tap();
  await step(ctx, 'kickoff-meeting');
  await screen.getByRole('radio', /^Yes/).tap();
  await step(ctx, 'project-review');
  await expect(screen.getByText(/^Market opportunity report — 30 Days/).first()).toBeVisible();
  await expect(screen.getByText('Primary and secondary data')).toBeVisible();
  await screen.getByRole('link', 'Edit: Selection').tap();
  await expect(browser).toHaveURL(`${path('data-sources-expected')}?returnTo=project-review`);
  await expect(screen.getByRole('radio', 'Both')).toBeChecked();
  await screen.getByRole('radio', 'Primary data').tap();
  await step(ctx, 'project-review');
  await expect(screen.getByText('Primary data')).toBeVisible();
  expect(projectApi.calls.filter(c => c.path.includes('/proposal/match/'))).toHaveLength(0);
  await screen.getByRole('button', 'Find your Experts').tap();
  await step(ctx, 'project-matches');
  await expect(screen.getByRole('checkbox', 'Select QA Expert')).toBeVisible({ timeout: 25_000 });
  await expect(screen.getByRole('button', 'Continue')).toBeDisabled();
  await screen.getByRole('checkbox', 'Select QA Expert').check();
  await screen.getByRole('button', 'Continue').tap();
  await step(ctx, 'deadline-offer');
  projectApi.failSubmitOnce = true;
  await screen.getByRole('button', 'Submit proposal').tap();
  await expect(screen.getByText('Submission temporarily unavailable. Please retry.').first()).toBeVisible();
  await step(ctx, 'deadline-offer');
  await expect(screen.getByRole('button', 'Submit proposal')).toBeEnabled();
  await screen.getByRole('button', 'Submit proposal').tap();
  await step(ctx, 'submission-success');
  await expect(screen.getByRole('heading', 'Congratulations, your proposal is submitted')).toBeVisible();

  const properties = projectApi.calls.filter(c => c.path.includes('/properties/sync/')).at(-1)?.body;
  expect(properties).toMatchObject({ phase: 'idea stage', business_type: 'startup', duration_days: 45,
    insighter_preferred_type: 'either', components: {
      'data-sources-expected': 'primary_data', 'target-market': { type: 'region', ids: [1, 2] },
    } });
  const initialProperties = projectApi.calls.find(c => c.path.includes('/properties/sync/'))?.body;
  expect(initialProperties?.components['data-sources-expected']).toBe('both');
  expect(projectApi.calls.find(c => c.path.includes('/description/sync/'))?.raw).toContain('Assess the Jordanian software market');
  expect(projectApi.calls.find(c => c.path.includes('/addon/sync/'))?.raw).toContain('addons[kickoff-meeting][date]');
  const scopes = projectApi.calls.find(c => c.path.includes('/scope/sync/'))?.raw;
  expect(scopes).toContain('Analysis');
  expect(scopes).toContain('Market size');
  const componentCalls = projectApi.calls.filter(c => c.path.includes('/definition/component/sync/'));
  expect(componentCalls).toHaveLength(2);
  expect(componentCalls[1].body.components).toEqual({ 'deliverable-stage': { deliverables: [{
    title: 'Market opportunity report', period_days: 30, report_type: ['pdf'],
    way: { selected: 'on_platform', address: null },
  }] } });
  const submissions = projectApi.calls.filter(c => c.path.includes('/proposal/submit/'));
  expect(submissions).toHaveLength(2);
  expect(submissions[0].body).toEqual(submissions[1].body);
  expect(submissions[1].body.matches).toEqual(['match-1']);
  const [year, month, day] = String(properties?.planned_start_date).split('-');
  expect(submissions[1].body.deadline_offer).toBe(`${day}-${month}-${year} 23:59:59`);
  expect(await browser.evaluate(() => Object.keys(sessionStorage).filter(key => key.startsWith('project:wizard:en:')))).toEqual([]);
  expect(projectApi.unexpected).toEqual([]);
  expect(await browser.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

for (const preference of ['Individual', 'Company'] as const) {
  test(`multi-request routes ${preference.toLowerCase()} experts to the correct optional range`, {
    tags: ['project'], timeout: 120_000,
  }, async ctx => {
    const { screen, browser, projectApi } = ctx;
    await preferences(ctx, /^Multi-request/);
    await screen.getByRole('radio', preference).tap();
    await step(ctx, 'insighter-origin');
    await screen.getByRole('radio', 'Worldwide').tap();
    const rangeStep = preference === 'Individual' ? 'insighter-experience' : 'company-team-size';
    await step(ctx, rangeStep);
    await expect(screen.getByRole('slider')).toHaveCount(2);
    await screen.getByRole('slider').first().press('ArrowRight');
    await screen.getByRole('button', 'Continue').tap();
    await step(ctx, 'project-schedule');
    await screen.getByRole('link', 'Back').tap();
    await step(ctx, rangeStep);
    await browser.reload();
    await expect(screen.getByRole('slider').first()).toHaveAttribute('aria-valuenow', preference === 'Individual' ? '1' : '2');
    await screen.getByRole('button', 'Skip').tap();
    await step(ctx, 'project-schedule');
    const range = await browser.evaluate((kind) => {
      const prefix = 'project:wizard:en:';
      const minKey = kind === 'Individual' ? 'insighterMinYearsExperience' : 'companyMinTeamSize';
      const maxKey = kind === 'Individual' ? 'insighterMaxYearsExperience' : 'companyMaxTeamSize';
      return [sessionStorage.getItem(prefix + minKey), sessionStorage.getItem(prefix + maxKey)];
    }, preference);
    expect(range).toEqual(['', '']);
    expect(projectApi.calls.filter(c => c.path.startsWith('/api/account/project/'))).toHaveLength(0);
    expect(projectApi.unexpected).toEqual([]);
  });
}

test('agent starts an urgent request and the schedule stays within 24 hours', {
  tags: ['project', 'ai'], timeout: 180_000,
}, async ctx => {
  const { agent, screen, browser, projectApi } = ctx;
  await preferences(ctx, /^Within 24 hours/, () => agent.act('choose the Within 24 hours project type'));
  await agent.act('select Any as the preferred expert type');
  await step(ctx, 'project-schedule');
  await expect(screen.getByRole('textbox', /^Duration in days\b/)).toHaveValue('1');
  await screen.getByRole('textbox', /^Duration in days\b/).fill('90');
  await screen.getByRole('textbox', /^Duration in days\b/).press('Enter');
  await expect(screen.getByRole('textbox', /^Duration in days\b/)).toHaveValue('1');
  await agent.assert('the schedule shows a one-day duration and explains that only this date is available for urgent 24-hour requests');
  await screen.getByRole('button', 'Continue').tap();
  await step(ctx, 'target-market');
  const schedule = await browser.evaluate(() => {
    const today = new Date();
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return {
      today: iso, start: sessionStorage.getItem('project:wizard:en:plannedStartDate'),
      duration: sessionStorage.getItem('project:wizard:en:durationDays'),
    };
  });
  expect(schedule.start).toBe(schedule.today);
  expect(schedule.duration).toBe('1');
  expect(projectApi.unexpected).toEqual([]);
});
