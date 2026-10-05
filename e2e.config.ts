import { randomUUID } from 'node:crypto';
import type { E2EConfig } from 'e2e';
import { chatgpt } from 'e2e/oauth/chatgpt';
import { web } from '@e2e-dev/web';

const app = {
  url: process.env.APP_URL || 'http://localhost:3300',
  ...(process.env.APP_URL ? {} : {
    readyUrl: 'http://localhost:3300/en/signin',
    command: {
      executable: process.execPath,
      args: ['node_modules/next/dist/bin/next', 'dev', '--turbopack', '--port', '{port}'],
      env: { NEXT_DIST_DIR: '.next-e2e', NEXT_TELEMETRY_DISABLED: '1' },
      startupTimeout: 180_000,
      log: '.e2e/logs/app.log',
    },
  }),
};

export default {
  projectId: 'knoldg-client',
  tests: 'tests/e2e/**/*.e2e.ts',
  targets: [
    { name: 'desktop', engine: web({ viewport: { width: 1440, height: 1000 } }), app },
    { name: 'mobile', engine: web({ viewport: { width: 390, height: 844 } }), app },
  ],
  workers: 1,
  assertionTimeout: 15_000,
  trace: 'retain-on-failure',
  reporters: ['list', 'junit', 'markdown'],
  agents: {
    default: {
      model: chatgpt(process.env.E2E_MODEL || 'gpt-6-luna'),
      context: 'Insighta is a bilingual English and Arabic knowledge platform. Authentication pages use Continue, Forgot password?, and Sign up.',
      system: 'Test the requested flow and verify its result. Use only the app under test and the supplied fixture account.',
      maxModelCalls: 12,
    },
  },
  credentials: {
    fixture: {
      username: 'qa@example.test',
      password: () => `Fixture-${randomUUID()}1!`,
    },
  },
} satisfies E2EConfig;
