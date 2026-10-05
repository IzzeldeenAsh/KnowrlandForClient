This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [https://insightabusiness.com](https://insightabusiness.com) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [https://insightabusiness.com/api/hello](https://insightabusiness.com/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## End-to-end tests

The [TesterArmy e2e runner](https://tester.army/e2e) uses Node.js 22.12 or newer.
Install dependencies with `npm ci`, then run:

```bash
npm run test:e2e             # desktop and phone-sized browser checks; no model calls
npm run test:e2e:login       # sign in with a ChatGPT subscription
npm run test:e2e:ai          # AI-driven authentication and urgent-request checks on desktop
npm run test:e2e:project -- --headed  # watch project request checks on desktop and phone-sized browser
npm run test:e2e:project:ai -- --headed  # watch AI-driven urgent-request checks on desktop
npm run test:e2e:all         # browser and AI checks on both targets
npm run test:e2e:types       # check test/config types
npm run test:e2e:list        # list tests and targets without starting the app
```

These commands also work from the parent Production-KNOLDG workspace.
The runner starts Next.js on port 3300 using `.next-e2e/`, then stops it when
the run finishes. Chromium downloads on the first run. API fixtures isolate
authentication and project checks from the backend, so these tests check frontend
behavior and do not prove real backend authentication, matching, or submission works.
The project request suite covers the ad hoc wizard through submission, required
answers, industry/sub-industry selection, schedule persistence after Back and reload,
scope/subscope selection, deliverable validation and save retry, description,
kickoff meeting, review, expert selection, and submission retry. It also checks
multi-request individual/company branches and the AI-driven urgent schedule limit.
All requests use isolated fixture data; the suite does not create real projects.

Use `APP_URL=http://localhost:3000 npm run test:e2e` to test an already running
frontend instead. Filter with `npm run test:e2e -- --target mobile --tag smoke`,
or add `--headed` to watch a run. `E2E_MODEL` overrides the default ChatGPT model
`gpt-6-luna`; `npx e2e models openai` lists models available to your login.

Results are written to `.e2e/report.json`, `.e2e/summary.md`, and
`.e2e/junit.xml`. Failed runs retain traces and available screenshots in
`.e2e/artifacts/`. AI actions use the replay cache in `.e2e/cache/`; add
`--no-cache` to run them live. Outputs, caches, and the isolated Next.js build
are ignored by Git. ChatGPT login credentials stay outside this repository.

The GitHub workflow runs browser checks on pull requests and uploads reports.
AI checks run locally with your subscription; CI does not receive that login.
The project includes the e2e coding skill in `.agents/skills/e2e/` and MCP
registration in `.mcp.json`, `.cursor/mcp.json`, and `.codex/config.toml`.
The parent workspace also registers the server and links the skill. Reload
Codex to load the project MCP configuration. `npm run --silent test:e2e:mcp`
starts the server on desktop for an MCP client.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
