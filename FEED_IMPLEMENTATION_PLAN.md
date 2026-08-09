# Feed — Implementation & Remediation Plan

Status as of 2026-07-30. Covers the Feed page, post composer, and video pipeline.

**Legend:** 🟥 blocker · 🟧 correctness · 🟦 feature gap · ⬜ polish
**Owner:** `FE` = this repo · `BE` = backend (read-only here — needs the Laravel team) · `OPS` = deploy/config

---

## Two findings that reframe the work

Both verified against the backend source, not assumed:

**1. There is no social feed endpoint.** `GET /api/insighter/feed` is scoped to the caller:

```php
// FeedController::index — app/Http/Controllers/Api/Insighter/Feed/FeedController.php:42
$query = FeedItem::query()->where('user_insighter_id', auth()->user()?->userable_id)
```

It returns **only your own posts**. A feed of posts from people you follow does not exist. The page currently named "Feed" cannot be built from what's there — this is a backend prerequisite, not a frontend task.

**2. The whole feed API is insighter-only.** Two nested guards:

```php
// routes/api/insighter.php:38
'middleware' => ['auth:api', 'verified', 'role:insighter|company|company-insighter']
// routes/api/insighter.php:100
Route::group(['prefix' => 'feed', 'middleware' => ['role:insighter|company-insighter']], …)
```

Guests get 401, pure clients get 403 — and note the inner guard **excludes plain `company`**, which the outer one allows. The composer is currently rendered to everyone.

---

## Phase 0 — Blockers

### 🟥 P0-1 · Composer is shown to users who cannot post `FE`

`app/[locale]/(default)/page.tsx:31` renders `<FeedComposer />` unconditionally. A logged-out visitor sees "Share knowledge…", opens the modal, picks an industry, writes a post, uploads a video, hits Publish — and gets a 401. Every API call in the flow fails for them.

- Gate on `useUserProfile().roles` — render the composer only for `insighter` / `company-insighter`.
- Decide the fallback for everyone else: guests get the existing `GuestSidebar` CTA; pure clients and `company`-role users need a distinct empty/read-only state (they are authenticated but still cannot post).
- `FeedComposer` also renders `initials` as `'I'` when `user` is null — dead giveaway that it renders pre-auth.
- Gate before the modal mounts, not inside it, so `initVideoPost` can never fire unauthenticated.

**Acceptance:** logged out → no composer. Client role → no composer, explanatory state. Insighter → composer. No feed API call returns 401/403 from the page.

### 🟥 P0-2 · Mux webhook config on stage `OPS`

`provider_processing_status` only ever becomes `ready` via the webhook (`MuxWebhookService:230`). Verify on the deployed stage box:

- `MUX_WEBHOOK_SIGNING_SECRET` is set. **The repo's `.env-stage` does not have it**; the local `.env` does. Without it `MuxWebhookController::handle` returns 401 and every upload hangs in `waiting`.
- `https://api.foresighta.co/webhook/provider/mux` is registered in the Mux dashboard and returns 204 for a test event.
- Confirm which env file the deployed box actually uses.

**Note:** local development is *not* blocked by this. `NEXT_PUBLIC_API_URL=https://api.foresighta.co`, so a local frontend already talks to the public stage API and Mux can reach the webhook. Local vs stage is not the variable — webhook config is.

**Acceptance:** upload a video, see `provider_processing_status` flip to `ready` within seconds.

### 🟧 P0-3 · Hardcoded environment URL `FE`

`components/feed/post/KnowledgeLibraryDrawer.tsx:151`:

```js
backgroundImage: 'url("https://foresighta.co/images/test2.png")'
```

Directly violates `CLAUDE.md` ("Never hardcode environment URLs"). It also points at a stage host and a file named `test2.png`, which will 404 or leak stage assets in production. Replace with a local asset in `public/images/` or the knowledge item's real cover.

---

## Phase 1 — Video pipeline

### 🟧 P1-1 · No pull-based status check `BE`

`MuxService` has exactly one public method, `createDirectUpload()`. There is no way to *ask* Mux for an asset's status — the backend only learns it by being told. If a webhook is missed, dropped, or fires while the box is down, that draft is stuck forever with no recovery path.

Requested backend addition:

- `MuxService::getUploadStatus(string $providerUploadId): array` — hit Mux's Direct Uploads / Assets API.
- `GET /api/insighter/feed/post/video/status/{feed_item}` — resolve live from Mux, persist to `provider_processing_status`, return it.
- Keep the webhook as the fast path; this is the fallback.

**FE follow-up:** point the existing `Check again` button (already built) at this endpoint instead of re-polling `GET /feed/{uuid}`.

### 🟧 P1-2 · Orphaned draft feed items `BE` + `FE`

`initiateVideo` creates a `FeedItem` row with status `draft` **before** any bytes are uploaded. Close the modal, cancel mid-upload, or navigate away and that row is orphaned — plus a paid Mux upload slot. Every reopened composer that uploads a video creates another.

- `FE`: on modal close with an un-published `videoUuidRef`, call `DELETE /api/insighter/feed/{uuid}` (already exists, `FeedController::destroy`).
- `FE`: better — surface unfinished video drafts so the user can resume instead of orphaning. Pairs with P1-4.
- `BE`: scheduled cleanup of `draft` feed items with no completed media older than ~24h.

### 🟦 P1-3 · Verify the stalled-state UI end-to-end `FE`

Implemented in `PostModal.tsx` but **never seen rendering** — it needs an authenticated insighter session. Confirm:

- upload → `Upload finished — preparing your video` + hint, description editable
- webhook lands → green check, `Upload complete`, Publish succeeds
- webhook withheld 2 min → amber stalled panel, polling **stops**
- `Check again` → resumes with a fresh deadline
- Publish while processing → "still being prepared", not "Select and finish uploading a video"

### 🟦 P1-4 · Resume an in-flight video draft `FE`

If the tab closes during `processing`, the upload is fine but the draft is unreachable — there is no UI to reach it. Add a "finish your draft" entry point, reading `GET /api/insighter/feed?status=draft`.

---

## Phase 2 — The actual feed

### 🟥 P2-1 · Social feed endpoint `BE`

Prerequisite for everything below. Needs a decision on scope: following-based, industry-based, or global-recent. Must be readable by **clients and guests**, so it cannot live under the `insighter`-gated prefix — likely `GET /api/platform/feed`. Requires cursor pagination, and the `FeedItemResource` author fields (`insighter.user.profilePhoto`, roles, company logo) are already loaded by `feedItemRelations()`.

### 🟦 P2-2 · Feed listing `FE`

`FeedEmptyState` is hardcoded — the page shows "your feed is quiet" unconditionally, and `onPublished` in `FeedComposer` is a no-op with a TODO. Once P2-1 lands:

- `FeedList` with infinite scroll / cursor pagination
- `onPublished` prepends the new post (optimistic) or refetches page 1
- loading skeleton and error state — **both already designed** in `Insighta Feed.html` (screens `1d` and `1f`); reuse those specs like `FeedEmptyState` did with `1e`
- keep `FeedEmptyState` for the genuinely-empty case

### 🟦 P2-3 · Post card `FE`

`Insighta Feed.html` screen `1a` specifies six variants: short insight, insight attached, long educational, with image, shared article, document attachment. Needs image gallery, Mux playback (`media-src`/`connect-src` already allowlisted), attached-knowledge cards, and the `stats` block from `FeedItemResource`.

---

## Phase 3 — Composer completeness

### 🟦 P3-1 · Article flow `FE`
`FeedComposer` has `onClick: undefined` for Article — the button is inert. `POST /api/insighter/feed/article` exists and takes `title`, `body`, `cover_image`. Needs a title field and a rich-text body; unlike posts, `title` is required at publish (`FeedController::publish`).

### 🟦 P3-2 · Edit and delete `FE`
`PUT /feed/post/image-text/{uuid}`, `PUT /feed/article/{uuid}`, `PUT /feed/post/video/properties/{uuid}`, `DELETE /feed/{uuid}` all exist and are unused.

### ⬜ P3-3 · Drag-to-reorder images `FE`
Currently arrow buttons. LinkedIn (the stated reference) uses drag. Sort order is already sent correctly as `media[n][sort_order]`.

### 🟧 P3-4 · Library drawer can offer un-attachable knowledge `FE`
The drawer lists `?status=published`, filtering the raw column. But `related_insights` validation additionally requires `status_active = active`:

```php
Rule::exists('knowledge','id')->where('user_insighter_id',$id)
    ->where('status','published')->where('status_active','active')
```

A published-but-deactivated item appears selectable, then fails validation at publish with a confusing field error. Filter client-side on the resource's derived `status`, or ask `BE` for a `status_active` filter.

---

## Phase 4 — Conventions & polish

| | Item | File |
|---|---|---|
| 🟧 | **i18n**: feed components use local `copyByLocale` records instead of `messages/{en,ar}.json`. Diverges from the next-intl convention in `CLAUDE.md`; strings are invisible to translators. Migrate all four components. | `components/feed/**` |
| ⬜ | Guest `returnUrl` is empty until after mount — a fast click loses the return path. Same pattern as `header.tsx`, so fix both together. | `FeedSidebar.tsx:169` |
| ⬜ | `quality={100}` + `priority` on a 96px avatar — heavier than needed, no visible gain. | `FeedSidebar.tsx:325` |
| ⬜ | Drawer effect depends on the `selected` array prop; a new array identity from the parent while open would reset the pending selection and refetch page 1. Key on `opened` only, or memoize. | `KnowledgeLibraryDrawer.tsx:85` |
| ⬜ | Re-verify the 10-minute duration check now actually runs — it was silently dead under the old CSP (`media-src` blocked `blob:`) and has not been exercised since the fix. | `PostModal.tsx:130` |

---

## Suggested order

1. **P0-1** (composer gating) — user-visible breakage, frontend-only, no dependencies.
2. **P0-2 / P0-3** — config + one-line URL fix, cheap.
3. **P1-3** — verify what's already built before adding more.
4. **P2-1** — long pole, backend. Start the conversation early; Phase 2 is blocked on it.
5. **P1-1 / P1-2** — backend video hardening, parallel with P2-1.
6. **P4 i18n** — do before the string count grows.
7. Phase 2 UI once the endpoint lands, then Phase 3.

## Not covered

Analytics/`stats` write path, notifications on publish, moderation, and the `company`-role gap in the inner middleware (deliberate or oversight? — needs a product answer).
