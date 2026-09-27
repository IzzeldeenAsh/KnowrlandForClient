// Local preview only. All API requests use isolated fixtures; no real projects are created.
const { chromium } = require('playwright')
const assert = require('node:assert/strict')
const base = process.env.PROJECT_WIZARD_URL || 'http://localhost:3100'
const catalog = [
  { id: 1, name: 'Market research', slug: 'market-research' },
  { id: 2, name: 'Business plan', slug: 'business-plan' },
  { id: 3, name: 'Other', slug: 'other' },
]
;(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    })
    await context.addCookies([
      {
        name: 'token',
        value:
          'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMjMiLCJleHAiOjQxMDI0NDQ4MDB9.signature',
        url: base,
      },
    ])
    const calls = [],
      rows = [],
      errors = []
    let failSave = false,
      aiAnswered = false
    await context.route('**/api/**', async (route) => {
      const req = route.request(),
        path = new URL(req.url()).pathname
      let body
      try {
        body = req.postDataJSON()
      } catch {
        body = req.postData()
      }
      calls.push({ path, body, method: req.method() })
      let data = [],
        status = 200
      if (path.endsWith('/account/profile'))
        data = {
          id: 123,
          uuid: 'qa',
          email: 'qa@example.test',
          name: 'QA',
          roles: ['client'],
          verified: true,
        }
      else if (path.endsWith('/setting/service')) data = catalog
      else if (path.includes('/definition/initiate')) {
        assert.equal(rows.length, 0)
        rows.push({
          uuid: 'service-1',
          service: catalog.find((s) => s.id === body.service_id),
          scopes: [],
          components: [],
          addons: [],
        })
        data = {
          uuid: 'project-1',
          project_proposal_match_uuid: 'match-1',
          project_services: rows,
        }
      } else if (path === '/api/account/project/definition/service/project-1') {
        const row = {
          uuid: 'service-' + (rows.length + 1),
          service: catalog.find((s) => s.id === body.service_id),
          scopes: [],
          components: [],
          addons: [],
        }
        rows.push(row)
        data = row
        status = 201
      } else if (
        path.includes('/definition/service/project-1/') &&
        req.method() === 'DELETE'
      ) {
        rows.splice(
          rows.findIndex((r) => path.endsWith(r.uuid)),
          1,
        )
        status = 204
      } else if (path.endsWith('/definition/component/project-1'))
        data = [{ slug: 'data-sources-expected', ownership_level: 'project' }]
      else if (path.includes('/ai-intake/check-clarification/')) {
        assert.match(path, /project-1\/service-2$/)
        data = aiAnswered
          ? {
              status: 'ready',
              suggest_scopes: [
                {
                  id: 10,
                  name: 'Analysis',
                  children: [{ id: 11, name: 'Market size' }],
                },
              ],
            }
          : {
              status: 'needs_clarification',
              questions: [{ key: 'market', question: 'Which market?' }],
            }
      } else if (path.includes('/ai-intake/answers/')) {
        assert.match(path, /project-1\/service-2$/)
        assert.deepEqual(body.answers, [{ key: 'market', answer: 'Jordan' }])
        aiAnswered = true
        data = { status: 'processing' }
      } else if (path.includes('/service-prompt/component/')) {
        assert.match(path, /project-1\/service-2$/)
        data = [
          { slug: 'deliverable-stage', ownership_level: 'project_service' },
        ]
      } else if (path.includes('/setting/service/component/'))
        data = [
          { slug: 'deliverable-stage', ownership_level: 'project_service' },
        ]
      else if (path.includes('/setting/service/scope/'))
        data = [
          {
            id: 10,
            name: 'Analysis',
            children: [{ id: 11, name: 'Market size' }],
          },
        ]
      else if (path.includes('/definition/component/sync/')) {
        assert.match(path, /project-1\/service-\d$/)
        if (failSave) status = 422
        else
          rows.find((r) => path.endsWith(r.uuid)).components = Object.entries(
            body.components,
          ).map(([k, v]) => ({ [k]: v }))
      } else if (path.includes('/definition/scope/sync/')) {
        assert.match(path, /project-1\/service-\d$/)
        rows.find((r) => path.endsWith(r.uuid)).scopes = [
          { scope: 'Analysis', children: [{ scope: 'Market size' }] },
        ]
      } else if (path.includes('/definition/addon/during/'))
        data = path.endsWith('project-1')
          ? [{ slug: 'kickoff-meeting', name: 'Kickoff meeting' }]
          : [{ slug: 'consulting-sessions', name: 'Consulting sessions' }]
      else if (path.includes('/project/show/'))
        data = {
          id: 1,
          uuid: 'project-1',
          project_services: rows,
          components: [],
          title: 'QA Project',
        }
      await route.fulfill({
        status,
        contentType: 'application/json',
        body:
          status === 204
            ? ''
            : JSON.stringify(
                status === 422
                  ? { message: 'Please correct deliverables.' }
                  : { data },
              ),
      })
    })
    const page = await context.newPage()
    page.setDefaultTimeout(15000)
    page.setDefaultNavigationTimeout(30000)
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto(base + '/en/project/wizard/insighter-origin')
    for (const preference of ['Either', 'Individual', 'Company']) {
      await page.evaluate((value) => {
        sessionStorage.clear()
        sessionStorage.setItem('project:wizard:en:projectType', 'ad_hoc')
        sessionStorage.setItem('project:wizard:en:preferredInsighterType', value)
      }, preference)
      await page.goto(base + '/en/project/wizard/insighter-origin')
      if (preference === 'Company') {
        await page.getByRole('button', {name: 'Skip', exact: true}).click()
      } else {
        await page.getByText('Worldwide', {exact: true}).click()
      }
      if (preference !== 'Either') {
        await page.waitForURL('**/' + (preference === 'Individual' ? 'insighter-experience' : 'company-team-size'))
        await page.getByRole('button', {name: preference === 'Individual' ? 'Continue' : 'Skip', exact: true}).click()
      }
      await page.waitForURL('**/planned-start-date')
      assert.equal(await page.getByText('no_project_uuid', {exact: true}).count(), 0)
      assert.equal(await page.evaluate(() => sessionStorage.getItem('project:wizard:en:projectUuid')), null)
      assert.equal(calls.filter(c => c.path.includes('/properties/sync')).length, 0)
      assert.equal(await page.evaluate(() => sessionStorage.getItem('project:wizard:en:insighterOriginType')), '')
      if (preference === 'Individual') {
        assert.notEqual(await page.evaluate(() => sessionStorage.getItem('project:wizard:en:insighterMinYearsExperience')), null)
      }
    }
    await page.evaluate(() => sessionStorage.clear())
    await page.goto(base + '/en/project/wizard/service')
    await page.evaluate(() => {
      for (const [k, v] of Object.entries({
        projectType: 'ad_hoc',
        deliverablesLanguage: 'English',
        insighterIndustryId: '1',
        projectStatus: 'idea stage',
        whoAreYou: 'startup',
        specifiedInsighterUuid: 'expert-1',
        deadline: '2027-02-01',
        plannedStartDate: '2027-01-01',
        descriptionCompleted: '1',
      }))
        sessionStorage.setItem('project:wizard:en:' + k, v)
    })
    await page.reload()
    await page.getByText('Market research', { exact: true }).click()
    await page.getByRole('heading', { name: 'Expected data sources' }).waitFor()
    await page.getByLabel('Primary data', { exact: true }).check()
    const next = () =>
      page.getByRole('button', { name: 'Continue', exact: true }).click()
    await next()
    async function scopes() {
      await page.waitForURL('**/project-scope')
      await page.getByText('Analysis', { exact: true }).click()
      await next()
      await page.waitForURL('**/project-subscopes')
      await page.getByText('Market size', { exact: true }).click()
      await next()
      await page.waitForURL('**/deliverables')
    }
    await scopes()
    await page
      .getByLabel('Deliverable title', { exact: true })
      .fill('Market report')
    await page.getByLabel('Due date', { exact: true }).fill('2027-01-10')
    await page.getByLabel('PDF', { exact: true }).check()
    await page
      .getByRole('button', { name: '+ Add deliverable', exact: true })
      .click()
    await page
      .getByLabel('Deliverable title', { exact: true })
      .nth(1)
      .fill('Presentation')
    await page.getByLabel('Due date', { exact: true }).nth(1).fill('2027-01-20')
    await page.getByLabel('PDF', { exact: true }).nth(1).check()
    await page.reload()
    await page.waitForFunction(
      () =>
        document.querySelector(
          'input[placeholder="e.g. Market analysis report"]',
        )?.value === 'Market report',
    )
    assert.equal(
      await page
        .getByLabel('Deliverable title', { exact: true })
        .first()
        .inputValue(),
      'Market report',
    )
    failSave = true
    await next()
    await page
      .getByRole('alert')
      .filter({ hasText: 'Please correct deliverables.' })
      .waitFor()
    assert(page.url().endsWith('/deliverables'))
    failSave = false
    await next()
    await page.waitForURL('**/service-addons')
    await next()
    await page.waitForURL('**/services-summary')
    await page
      .getByRole('button', { name: '+ Add another service', exact: true })
      .click()
    await page.waitForURL('**/service')
    assert.equal(
      await page.getByText('Market research', { exact: true }).count(),
      0,
    )
    await page.getByText('Business plan', { exact: true }).click()
    await scopes()
    assert.equal(
      await page.getByLabel('Deliverable title', { exact: true }).inputValue(),
      '',
    )
    await page
      .getByLabel('Deliverable title', { exact: true })
      .fill('Business plan document')
    await page.getByLabel('Due date', { exact: true }).fill('2027-01-25')
    await page.getByLabel('PDF', { exact: true }).check()
    await next()
    await page.waitForURL('**/service-addons')
    await next()
    await page.waitForURL('**/services-summary')
    await page
      .getByRole('button', { name: 'Continue to project add-ons' })
      .click()
    await page.getByRole('button', { name: 'Review project' }).click()
    await page.waitForURL('**/project-review')
    await page.getByText('Market report', { exact: true }).waitFor()
    await page.getByText('Business plan document', { exact: true }).waitFor()
    await page.getByText('Market size', { exact: true }).first().waitFor()
    await page.screenshot({
      path: '/tmp/project-wizard-review.png',
      fullPage: true,
    })
    assert.equal(calls.filter((c) => c.path.includes('/initiate')).length, 1)
    assert.equal(
      calls.filter(
        (c) => c.path === '/api/account/project/definition/service/project-1',
      ).length,
      1,
    )
    assert.deepEqual(
      rows[0].components[0]['deliverable-stage'].deliverables.map(
        (d) => d.title,
      ),
      ['Market report', 'Presentation'],
    )
    assert.equal(
      calls.filter((c) => c.path.includes('/properties/sync')).length,
      0,
      'Matching must not start while defining services',
    )
    await next()
    await page.waitForURL('**/deadline-offer')
    const properties = calls.find((c) => c.path.includes('/properties/sync'))
    assert.equal(properties.body.planned_start_date, '2027-01-01')
    assert.deepEqual(properties.body.components, {
      'data-sources-expected': 'primary_data',
    })
    assert.equal(
      await page.evaluate(() =>
        sessionStorage.getItem('project:wizard:en:proposalMatchUuid'),
      ),
      'match-1',
    )
    await page.goto(base + '/en/project/wizard/services-summary')
    await page
      .getByRole('button', { name: 'Remove', exact: true })
      .last()
      .click()
    await page.waitForFunction(
      () =>
        !Array.from(document.querySelectorAll('button')).some(
          (b) => b.textContent === 'Remove',
        ),
    )
    assert.equal(rows.length, 1)
    await page.evaluate(() =>
      sessionStorage.removeItem('project:wizard:en:specifiedInsighterUuid'),
    )
    await page.reload()
    assert.equal(
      await page
        .getByRole('button', { name: '+ Add another service', exact: true })
        .count(),
      0,
    )
    await page.evaluate(() =>
      sessionStorage.setItem(
        'project:wizard:en:specifiedInsighterUuid',
        'expert-1',
      ),
    )
    await page.reload()
    await page
      .getByRole('button', { name: '+ Add another service', exact: true })
      .click()
    await page
      .getByPlaceholder('Describe your service...')
      .fill('Research a new market')
    await page
      .getByRole('button', { name: 'Generate scopes', exact: true })
      .click()
    await page.getByLabel('Which market?').fill('Jordan')
    await page
      .getByRole('button', { name: 'Send answers', exact: true })
      .click()
    await page.waitForURL('**/project-scope')
    await scopes()
    assert(aiAnswered)
    assert.equal(rows.length, 2)
    assert.equal(calls.filter((c) => c.path.includes('/initiate')).length, 1)
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(base + '/ar/project/wizard/deliverables')
    await page.getByRole('heading', { name: 'مخرجات الخدمة' }).waitFor()
    assert(
      await page
        .locator('html')
        .evaluate((el) => el.scrollWidth <= window.innerWidth),
    )
    await page.screenshot({
      path: '/tmp/project-wizard-ar.png',
      fullPage: true,
    })
    assert.deepEqual(errors, [])
    console.log(
      'PASS multi-service isolation, creation, refresh, failed saves, review, removal, general restrictions, Arabic mobile',
    )
    await context.close()
  } finally {
    await browser.close()
  }
})().catch((e) => {
  console.error(e)
  process.exitCode = 1
})
