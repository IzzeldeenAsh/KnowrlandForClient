import { credentials, expect } from 'e2e';
import { test } from './fixtures/auth.ts';

// The auth fixture intercepts every API request: these tests use the real UI
// without signing into a real account or sending searches to the backend.
for (const locale of ['en', 'ar'] as const) {
  test(`Enter submits, repeats, and clears a feed search (${locale})`, { tags: ['feed', 'search'] }, async ({ app, screen, browser, authApi }) => {
    const account = credentials.user('fixture');
    await app.open(`/en/signin?returnUrl=%2F${locale}`);
    await screen.getByLabel('Email').fill(account.username);
    await screen.getByLabel(/^Password\b/).fill(account.password);
    await screen.getByRole('button', 'Continue').tap();
    await expect(browser).toHaveURL(`/${locale}`);

    const input = screen.getByLabel(
      locale === 'ar' ? 'البحث في الموجز أو المستندات' : 'Search in Feed or Insights',
      { exact: true, visible: true },
    );
    const searchCalls = () => authApi.calls.filter(call => call.method === 'GET' && call.path.endsWith('/community/feed/search')).length;
    const feedCalls = () => authApi.calls.filter(call => call.method === 'GET' && call.path.endsWith('/community/feed')).length;
    await expect(input).toBeVisible();
    await expect.poll(feedCalls).toBeGreaterThan(0);

    // Prevent the live-search debounce from being mistaken for an Enter submit.
    await browser.evaluate(() => {
      document.addEventListener('submit', () => {
        document.documentElement.dataset.feedSearchSubmits = String(
          Number(document.documentElement.dataset.feedSearchSubmits || 0) + 1,
        );
      }, true);
      return true;
    });
    const query = locale === 'ar' ? 'تحليل السوق' : 'market research';
    await input.fill(`  ${query}  `);
    await input.press('Enter');
    await expect(browser.locator('html')).toHaveAttribute('data-feed-search-submits', '1');
    await expect.poll(async () => new URL(await browser.url()).searchParams.get('keyword')).toBe(query);
    await expect.poll(searchCalls).toBeGreaterThan(0);

    const previousSearchCalls = searchCalls();
    await input.press('Enter');
    await expect(browser.locator('html')).toHaveAttribute('data-feed-search-submits', '2');
    await expect.poll(searchCalls).toBeGreaterThan(previousSearchCalls);
    await expect.poll(async () => new URL(await browser.url()).searchParams.get('keyword')).toBe(query);

    const previousFeedCalls = feedCalls();
    await input.fill('');
    await input.press('Enter');
    await expect(browser.locator('html')).toHaveAttribute('data-feed-search-submits', '3');
    await expect(browser).toHaveURL(`/${locale}`);
    await expect.poll(feedCalls).toBeGreaterThan(previousFeedCalls);
  });
}
