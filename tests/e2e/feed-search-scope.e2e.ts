import { credentials, expect } from 'e2e';
import { test } from './fixtures/auth.ts';

// All API calls use the isolated auth fixture; no real account is used.
for (const locale of ['en', 'ar'] as const) {
  const searchLabel = locale === 'ar' ? 'البحث في الموجز أو المستندات' : 'Search in Feed or Insights';
  const badgeLabel = locale === 'ar' ? 'حسب المستندات' : 'By Insights';
  const query = locale === 'ar' ? 'تحليل السوق' : 'market research';

  test(`Insights badge can return a typed query to Feed (${locale})`, { tags: ['feed', 'search'] }, async ({ app, screen, browser, authApi }) => {
    const account = credentials.user('fixture');
    await app.open(`/en/signin?returnUrl=%2F${locale}`);
    await screen.getByLabel('Email').fill(account.username);
    await screen.getByLabel(/^Password\b/).fill(account.password);
    await screen.getByRole('button', 'Continue').tap();
    await expect(browser).toHaveURL(`/${locale}`);
    await expect.poll(() => authApi.calls.filter(call => call.path.endsWith('/community/feed')).length).toBeGreaterThan(0);

    const input = screen.getByLabel(searchLabel, { exact: true, visible: true });
    const badge = screen.getByRole('button', badgeLabel, { exact: true, visible: true });
    await expect(badge).toHaveAttribute('aria-pressed', 'false');
    await badge.tap();
    await expect(badge).toHaveAttribute('aria-pressed', 'true');
    await input.fill(query);

    // Turning the selected badge off must not navigate to Insights.
    await badge.tap();
    await expect(badge).toHaveAttribute('aria-pressed', 'false');
    await input.press('Enter');
    await expect.poll(async () => new URL(await browser.url()).pathname).toBe(`/${locale}`);
    await expect.poll(async () => new URL(await browser.url()).searchParams.get('keyword')).toBe(query);
    await expect.poll(() => authApi.calls.filter(call => call.path.endsWith('/community/feed/search')).length).toBeGreaterThan(0);

    // With a query already present, enabling the badge opens that Insights search.
    await badge.tap();
    await expect.poll(async () => new URL(await browser.url()).pathname).toBe(`/${locale}/home`);
    await expect.poll(async () => new URL(await browser.url()).searchParams.get('keyword')).toBe(query);
    await expect.poll(async () => new URL(await browser.url()).searchParams.get('search_type')).toBe('knowledge');
  });

  test(`Insights badge routes the next Enter to Insights (${locale})`, { tags: ['feed', 'search'] }, async ({ app, screen, browser, authApi }) => {
    const account = credentials.user('fixture');
    await app.open(`/en/signin?returnUrl=%2F${locale}`);
    await screen.getByLabel('Email').fill(account.username);
    await screen.getByLabel(/^Password\b/).fill(account.password);
    await screen.getByRole('button', 'Continue').tap();
    await expect(browser).toHaveURL(`/${locale}`);
    await expect.poll(() => authApi.calls.filter(call => call.path.endsWith('/community/feed')).length).toBeGreaterThan(0);
    const badge = screen.getByRole('button', badgeLabel, { exact: true, visible: true });
    await badge.tap();
    await expect(badge).toHaveAttribute('aria-pressed', 'true');
    const input = screen.getByLabel(searchLabel, { exact: true, visible: true });
    await input.fill(`  ${query}  `);
    await input.press('Enter');
    await expect.poll(async () => new URL(await browser.url()).pathname).toBe(`/${locale}/home`);
    await expect.poll(async () => new URL(await browser.url()).searchParams.get('keyword')).toBe(query);
    await expect.poll(async () => new URL(await browser.url()).searchParams.get('search_type')).toBe('knowledge');
    expect(authApi.calls.filter(call => call.path.endsWith('/community/feed/search'))).toHaveLength(0);
  });
}
