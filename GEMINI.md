# Project: jobflow

## Overview

`jobflow` is a full-stack web application designed to help service-based businesses manage their customer workflows. It allows users to track jobs from initiation to completion and handle invoicing.

The application is built with a modern tech stack, featuring a feature-driven architecture that promotes modularity and scalability. Currently, the application's core business logic for jobs and invoices is managed on the client-side using React Context and is populated with mock data, suggesting it is either a prototype or the frontend is being developed ahead of full backend integration.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React framework)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/) for a PostgreSQL database
- **Authentication:** [`better-auth`](https://www.npmjs.com/package/better-auth) library
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components

## Project Structure

The codebase is organized into a `src` directory and follows a feature-based structure. This makes it easy to locate code related to specific domains of the application.

```
src/
├── app/         # Next.js App Router: Pages and layouts
├── components/  # Shared UI components
├── context/     # React Context providers (e.g., JobsContext)
├── db/          # Drizzle ORM setup and database schema
├── features/    # Core feature modules
│   ├── auth/
│   ├── invoice/
│   ├── jobs/
│   └── schedule/
├── lib/         # Core libraries and utilities (e.g., auth setup)
└── services/    # Business logic services
```

## Core Features

### Authentication

-   **Provider:** Authentication is handled by the `better-auth` library.
-   **Methods:** Supports both email/password and social login (GitHub).
-   **Persistence:** User and session data is stored in a PostgreSQL database, managed by Drizzle ORM. The relevant schema is defined in `src/db/schema/auth-schema.ts`.
-   **Configuration:** The central auth setup is located in `src/lib/auth/auth.ts`.

### Job Management

-   **Lifecycle:** Users can track the status of jobs as they move through a lifecycle: `Scheduled` -> `In Progress` -> `Completed`.
-   **UI:** The `JobCard` component (`src/features/jobs/components/job-card.tsx`) serves as the primary UI for representing a job.
-   **State Management:** Job data and business logic are currently handled on the client-side via `JobsProvider` in `src/context/jobs-context.tsx`.

### Invoicing

-   The application includes functionality for generating invoices based on completed jobs.
-   Like the jobs feature, invoice data is managed within the `jobs-context.tsx`.

## Getting Started

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```
2.  **Set up environment variables:**
    - Create a `.env.local` file based on `.env.example`.
    - Add your Supabase/PostgreSQL database connection string and GitHub OAuth credentials.
3.  **Run database migrations:**
    ```bash
    pnpm drizzle:push
    ```
4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
