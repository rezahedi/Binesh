# AGENTS.md

## Project Overview
- `binesh` is a Next.js App Router app for interactive learning content.
- It has 3 product surfaces:
- Public marketing/auth entry at `/`.
- Learner app at `/learn` (course browsing + progress).
- Admin app at `/dashboard` (categories/courses/lessons CRUD).
- Lessons are markdown-driven and parsed into steps/quizzes via `app/lib/quizParser.ts`.

## Architecture
- Framework: Next.js 16 + React 19 + TypeScript (strict mode).
- Auth: Stack Auth (`@stackframe/stack`) with:
- Client app in `stack/client.tsx`.
- Server app in `stack/server.tsx`.
- Auth handler route in `app/handler/[...stack]/page.tsx`.
- Access control:
- Edge proxy in `proxy.ts` protects `/learn/*` and `/dashboard/*`.
- Admin API protection uses `withAdmin` in `app/lib/auth.ts`.
- Data layer:
- PostgreSQL (Neon) via Drizzle ORM.
- Schema in `app/db/schema.ts`, relations in `app/db/relations.ts`.
- API layer:
- Route handlers in `app/api/**/route.ts`.
- `/(learningMode)/actions/*.ts` are server actions for Trophy/progress.
- UI:
- Tailwind CSS v4 + Radix/shadcn-style components in `app/components/ui`.

## Folder Responsibilities
- `app/(application)/*`: learner-facing dashboard and course navigation UI.
- `app/(learningMode)/*`: active lesson flow, step/quiz progression, Trophy/progress actions.
- `app/(admin)/*`: admin UI for managing categories/courses/lessons.
- `app/api/*`: HTTP API endpoints (public learner APIs, admin APIs, webhooks).
- `app/db/*`: DB connection, schema, relations, seed data/scripts.
- `app/components/quizzes/*`: quiz renderers and quiz-specific logic.
- `app/components/Interactive/*`: interactive component registry and blocks.
- `app/contexts/*`: client-side React context state.
- `app/lib/*`: shared runtime logic (auth helpers, markdown, parser, hooks helpers).
- `app/utils/*`: small utility helpers (`fetcher`, URL params, class merge, theme cookie).
- `drizzle/*`: generated SQL migrations + drizzle metadata (treat as migration output).
- `scripts/*`: one-off developer scripts (`verify-parser.ts`).
- `stack/*`: Stack auth app configuration.

## Dev, Build, Test
- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Production run: `npm run start`
- Lint: `npm run lint`
- Lint fix: `npm run lint:fix`
- Format check: `npm run prettier`
- Format fix: `npm run prettier:fix`
- DB migration generate: `npm run db:generate`
- DB migrate: `npm run db:migrate`
- DB seed: `npm run db:seed`
- Parser check script: `npx tsx scripts/verify-parser.ts`
- Automated tests: no formal test script currently; `cypress/` is scaffold-only.

## Required Environment
- Copy `.env.example` to `.env.local` (or equivalent) and provide:
- `DATABASE_URL`
- Stack keys (`NEXT_PUBLIC_STACK_PROJECT_ID`, `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`, `STACK_SECRET_SERVER_KEY`, `STACK_WEBHOOKS_SIGNING_SECRET`)
- Trophy keys (`TROPHY_API_KEY`, `TROPHY_BASE_URL`)
- Base route vars used by navigation (`NEXT_PUBLIC_APP_BASE`, `NEXT_PUBLIC_ADMIN_BASE`, `NEXT_PUBLIC_AUTH_HANDLER_BASE`)

## Coding Conventions (Observed)
- TypeScript strict mode is on; keep types explicit for API payloads and responses.
- Use path aliases from `tsconfig.json` (`@/*`, `@admin/*`, `@application/*`, `@db/*`, `@stack/*`).
- Formatting is enforced by ESLint + Prettier:
- Semicolons required, double quotes, trailing commas (`es5`), 80-char print width.
- Use functional React components; mark client components with `"use client"` only when required.
- Route handlers return `NextResponse`/`Response` and use Drizzle query builder (not raw SQL unless necessary).
- Query params are parsed via `getSearchParams` (`app/utils/urls.ts`) and `useRouterStuff` on client.
- Keep UI composition in route-group folders; shared primitives stay in `app/components/ui`.

## State Management
- Local UI state: `useState` / `useReducer`.
- Shared client state via React context:
- `AuthModalContext` for auth modal page switching.
- `ProgressContext` for lesson progress + Trophy-derived state.
- `QuizContext` for active quiz answer/reveal state.
- `SelectionSyncContext` for selected lesson card on course page.
- Remote state fetching/caching uses SWR:
- `useFetch` is the standard GET wrapper.
- Revalidation after mutations uses `mutate(...)` with exact API keys/patterns.

## API Communication Patterns
- Reads:
- Client components use SWR (`useFetch`) with `fetcher` from `app/utils/fetcher.ts`.
- API routes frequently join progress tables scoped to `stackServerApp.getUser()`.
- Writes:
- UI submits `fetch` POST/PATCH/DELETE with JSON body built from `FormData`.
- After successful write, trigger SWR `mutate` for affected keys.
- Auth rules:
- Learner endpoints require authenticated Stack user (`401` otherwise).
- Admin endpoints must be wrapped with `withAdmin(...)`.
- Content rules:
- Lesson CRUD recalculates derived course stats via `updateCourseStats(...)`.
- Lesson content must remain parseable by `parseLesson(...)` markdown+quiz format.

## Important Rules For Agents
- Always preserve route-group separation: learner/app/admin concerns must stay isolated.
- Any new admin API route must use `withAdmin`.
- Any new learner-protected API route must verify `stackServerApp.getUser()`.
- If lesson publish logic changes, keep `part`, `exercises`, and `estimatedDuration` derivation consistent with parser output.
- When editing schema in `app/db/schema.ts`, also create/apply matching Drizzle migrations.
- Keep SWR keys stable; changing endpoint paths or query-string behavior requires updating all hook callers.
- Maintain compatibility with existing markdown lesson format in `sample-lesson-format.md`.

## What NOT To Do
- Do not bypass auth/role checks in `proxy.ts` or `withAdmin`.
- Do not move admin CRUD into client-only checks; server-side authorization is mandatory.
- Do not break the lesson parser contract (`#` section split + `---` + ```quiz JSON``` / `<component .../>`).
- Do not expose secrets or hardcoded credentials (current guest sign-in is explicitly marked bad practice).
- Do not remove SWR cache invalidation after mutations.
- Do not treat `drizzle/` migration files as hand-authored feature code; generate them from schema changes.
- Do not introduce new generic utilities when existing helpers already cover URL params, fetching, and class merging.
