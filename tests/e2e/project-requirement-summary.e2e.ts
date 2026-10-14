import { expect } from 'e2e';
import { test } from './fixtures/project';

for (const locale of ['en', 'ar'] as const) {
  test(`request review shows each service requirement summary without scopes (${locale})`, { tags: ['project'], timeout: 120_000 }, async ({ app, screen, browser, projectApi }) => {
    projectApi.definitionMode = 'simple';
    const summaries = [
      'The client needs customer support automation for ecommerce FAQs covering orders, returns, and delivery status, with recommended support workflows.',
      'يحتاج العميل إلى تحليل طلبات الدعم وتحديد أسباب تأخر الردود.',
    ];
    projectApi.projectServices = summaries.map((summary, index) => ({
      id: 277 + index, uuid: `service-${index + 1}`, position: index + 1,
      title: index === 0 ? 'AI Customer Support Automation' : 'Support Analysis',
      service: { id: 12, name: 'Other', slug: 'other' },
      prompt_ai: `Original brief prompt ${index + 1}`,
      ai_intake: { status: 'ready', clarification_round: 2, requirement_summary: summary },
      scopes: [], components: [], addons: [],
    }));
    projectApi.projectServices.push({
      uuid: 'legacy', position: 3, title: 'Legacy request',
      service: { id: 1, name: 'Market research', slug: 'market-research' },
      prompt_ai: 'Existing service description', ai_intake: { requirement_summary: '  ' },
      scopes: [], components: [], addons: [],
    });
    await app.open(`/${locale}/project/wizard/service`);
    await browser.evaluate((language) => {
      sessionStorage.setItem(`project:wizard:${language}:projectUuid`, 'project-1');
      sessionStorage.setItem(`project:wizard:${language}:definitionMode`, 'simple');
      return null;
    }, locale);
    await app.open(`/${locale}/project/wizard/project-review`);
    await expect(screen.getByText(locale === 'ar' ? 'ملخص المتطلبات' : 'Requirement Summary', { exact: true })).toHaveCount(2);
    for (const summary of summaries) await expect(screen.getByText(summary, { exact: true })).toBeVisible();
    await expect(screen.getByText('Original brief prompt 1', { exact: true })).toHaveCount(0);
    await expect(screen.getByText('Original brief prompt 2', { exact: true })).toHaveCount(0);
    await expect(screen.getByText('Existing service description', { exact: true })).toBeVisible();
    await expect(screen.getByText(locale === 'ar' ? 'نطاق الخدمة' : 'Service scope', { exact: true })).toHaveCount(3);
    expect(projectApi.calls.filter(call => call.path.includes('/scope/'))).toHaveLength(0);
    expect(projectApi.unexpected).toEqual([]);
    expect(await browser.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await browser.evaluate((label) => {
      Array.from(document.querySelectorAll('article')).find(node => node.textContent?.includes(label))?.scrollIntoView({ block: 'center' });
      return null;
    }, locale === 'ar' ? 'ملخص المتطلبات' : 'Requirement Summary');
    await app.screenshot(`requirement-summary-${locale}`);
  });
}
