import { expect } from 'e2e';
import { test } from './fixtures/auth.ts';

test('agent finds password recovery and returns to sign-in', { tags: ['ai', 'auth'] }, async ({ app, agent, screen, browser }) => {
  await app.open('/en/signin?returnUrl=%2Fen%2Fproject');
  await expect(screen.getByRole('heading', 'Welcome To Insighta')).toBeVisible();

  await agent.act('open the Forgot password? page');
  await expect(screen.getByRole('heading', 'Reset your password')).toBeVisible();
  await expect(browser).toHaveURL('/en/reset-password?returnUrl=%2Fen%2Fproject');
  await agent.assert('the password recovery form asks for an email address and offers to send a code');

  await agent.act('return to sign-in using Back to sign in');
  await expect(screen.getByRole('heading', 'Welcome To Insighta')).toBeVisible();
  await expect(browser).toHaveURL('/en/signin?returnUrl=%2Fen%2Fproject');
});
