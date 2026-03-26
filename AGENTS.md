## Constraints
- Do not install new libraries or frameworks. Use only what is in `package.json`.
- Do not run `eslint`, `prettier`, or any formatter or linter.
- Do not restructure or rename directories unless explicitly instructed.
- Do not introduce new architecture patterns. Match what already exists.
- Modify existing files rather than creating new ones.
- Only touch files relevant to the task. No incidental changes.
- Database access must only use Drizzle ORM. No raw SQL clients, no other ORMs.
- Services must not contain UI code.
- UI components must not contain business logic. Extract to `src/services/` for shared logic and `src/features/<feature>/services/` for feature logic.
- Feature logic must not go in `src/components/` or `src/lib/`.
- use arrow functions
- use named exports

## Where Code Goes

|Code type|Location|
|---|---|
|Pages and routes|`src/app/`|
|Shared UI|`src/components/`|
|Feature UI|`src/features/<feature>/components/`|
|Shared Business logic|`src/services/`|
|Feature Business logic|`src/features/<feature>/services/`|
|Database schema|`src/db/`|
|Auth config|`src/lib/auth/`|

## Domain Knowledge
**Jobs**
- Status lifecycle: `Scheduled` → `In Progress` → `Completed`
- Primary UI: `src/features/jobs/components/job-card.tsx`
- State: `JobsProvider` in `src/context/jobs-context.tsx`

**Invoicing**
- Invoices are generated from completed jobs
- State also lives in `src/context/jobs-context.tsx`

**Auth**
- Handled by `better-auth`. Supports email/password and GitHub OAuth.
- Schema: `src/db/schema/auth-schema.ts`
- Config: `src/lib/auth/auth.ts`

## Dev Commands

```bash
pnpm dev             # start dev server
pnpm drizzle:push    # push schema to database
```

Requires `.env.local` — see `.env.example` for required variables.

## Project
jobflow is a full-stack Next.js app for service businesses to manage job workflows and invoicing.

Stack: Next.js, TypeScript, Drizzle ORM, PostgreSQL, better-auth, Tailwind CSS, shadcn/ui

This file is the canonical source for all agents. Tool-specific files (e.g. `CLAUDE.md`) reference this and add nothing.