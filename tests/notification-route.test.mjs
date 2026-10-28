import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source = fs.readFileSync(new URL('../utils/notificationRoute.ts', import.meta.url), 'utf8')
  .replace("import { dashboardUrl } from '@/app/config'", "const dashboardUrl = 'https://dashboard.test'");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { routeForNotification } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const notification = { event_name: 'project.discussion.message', param: 'project-one', notifiable_group_id: 'project-one', url: 'https://old-host.test/app/insighter-dashboard/project-offers/details/123?tab=discussion&offer=offer-one' };

test('private offer notification preserves the offer drawer and uses the current environment', () => {
  assert.equal(routeForNotification(notification, ['insighter']), 'https://dashboard.test/app/insighter-dashboard/project-offers/details/project-one?tab=offer&offer=offer-one');
});
test('explicit offer identifier opens private messages even without a backend URL', () => {
  assert.equal(routeForNotification({ ...notification, url: undefined, project_proposal_offer_uuid: 'offer-two', visibility: 'private_offer' }, ['insighter']), 'https://dashboard.test/app/insighter-dashboard/project-offers/details/project-one?tab=offer&offer=offer-two');
});
test('public messages do not inherit a stale private offer query', () => {
  assert.equal(routeForNotification({ ...notification, visibility: 'public' }, ['insighter']), 'https://dashboard.test/app/insighter-dashboard/project-offers/details/project-one?tab=discussion');
});
test('client messages use the client offer drawer', () => {
  assert.equal(routeForNotification({ ...notification, url: 'https://old-host.test/app/insighter-dashboard/projects-created/123', project_proposal_offer_uuid: 'offer-one' }, ['client']), 'https://dashboard.test/app/insighter-dashboard/projects-created/project-one?offer=offer-one');
});
