# Tractorbeam Take-Home Exercise

## Overview

This is a small TanStack Start application with Drizzle ORM, shadcn/ui, and a simple AI chat feature powered by Amazon Bedrock. The app works. Your job is to **turn this repo into a software factory**: a codebase where engineers using AI coding tools (Claude Code, Cursor, etc.) ship high-quality features faster, not more AI slop.

We're not asking you to add new features, refactor the app, or do a code review. We're asking you to make the *environment* better so that the next 100 features an engineer builds with AI assistance come out right.

## Starting Points

This repo has four specific issues that Claude Code tends to introduce or reproduce on our real codebase. We're telling you what they are upfront so you can get moving:

### 1. Fake UUIDs

Seed data and test fixtures use placeholder UUIDs like `00000000-0000-0000-0000-000000000001`. These aren't valid v4 UUIDs. When Claude generates new seed data, test fixtures, or references to existing records, it copies this pattern. The result is IDs that look structured/sequential instead of random, which can mask bugs related to ID handling and makes test data unrealistic.

### 2. Link/Button nesting

Several components wrap shadcn `<Button>` inside TanStack Router `<Link>`, or the reverse. This produces nested `<a>` and `<button>` elements in the DOM, which is invalid HTML. Screen readers announce these incorrectly, and click handlers can fire twice or not at all depending on the browser. Claude consistently gets this nesting wrong when generating navigation components.

### 3. Inconsistent className handling

The codebase has a `cn()` utility (built on `clsx` + `tailwind-merge`) that all shadcn components use for className composition. But route-level code ignores it and uses raw template literal concatenation instead (`` className={`foo ${bar}`} ``). Claude tends to copy whatever pattern it sees nearby, so this inconsistency spreads: components that happen to be near shadcn code get `cn()`, everything else gets string interpolation. The result is that `tailwind-merge` conflict resolution only works in some places.

### 4. Manual Drizzle migrations

Some migration files in `drizzle/` were written by hand instead of generated via `drizzle-kit generate`. The migration journal and snapshots are now out of sync with the actual migration files. When Claude needs to create a schema change, it tends to write migration SQL directly instead of modifying the schema and running the generate command. This causes further drift.

## Your Task

These four issues are starting points, not the whole exercise. We want to see a holistic attempt to make this repo ready for AI-assisted development. Think about what it takes to ship more correct features faster with AI tools, and what guardrails prevent those tools from degrading the codebase over time.

Don't add new features to the app. Don't refactor code for its own sake. Focus on the environment, tooling, and configuration that makes AI-assisted development produce better results.

## Deliverables

1. **A working configuration.** Whatever you've changed in the repo. It should work: if we point Claude Code at your version of the repo and ask it to build a feature, your changes should make the output measurably better.

2. **An analysis of your approach.** A static document — PDF, markdown, slides, whatever you work best in. Address these questions:
   - What issues did you find beyond the four we flagged?
   - What did you configure and why? Walk us through your decisions.
   - What would you do next with more time?

   We're evaluating how you communicate technical decisions and justify their value. At Tractorbeam, engineers explain their work to clients who are technical but not living in the codebase — so the ability to make a clear, grounded case for *why* a change matters is as important as the change itself.

   Using AI to help write this is fine — we use AI for everything. But the document should actually accomplish its goal: a reader who wasn't in your head should come away understanding what you did, why it matters, and what you'd do next. Generic summaries that could describe any project don't do that.

## Setup

### Prerequisites

- Node.js 20+
- A package manager of your choice (pnpm, npm, yarn, bun)

### Install and run

```bash
pnpm install
pnpm db:push    # set up local SQLite database
pnpm db:seed    # seed with sample data
pnpm dev        # start the dev server
```

### AI chat feature

The app includes a simple chat interface powered by Amazon Bedrock. We've provided AWS credentials for you:

```
AWS_ACCESS_KEY_ID=<provided in email>
AWS_SECRET_ACCESS_KEY=<provided in email>
AWS_REGION=us-east-1
```

Add these to a `.env` file in the project root. The chat feature uses Claude 3.5 Sonnet via Bedrock.

## Submission

Zip your version of the repo (including your written analysis) and email it back to us within 5 days.

## Time Expectation

This is designed to take 2-5 hours. If you're spending significantly more time, you're probably over-engineering it. We'd rather see a focused, well-reasoned approach to the highest-impact changes than an exhaustive audit.
