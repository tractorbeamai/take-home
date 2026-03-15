# Take-Home Exercise

**Duration:** 2-5 hours (5-day deadline)
**Reviewer:** Wade Fletcher (Co-Founder)
**Delivery:** Email with instructions + zipped repo when candidate enters the Technical stage

## Interview Prep (Gem internal note)

The candidate receives a working TanStack Start + Drizzle + shadcn/ui app. We tell them about three specific issues Claude Code tends to reproduce, then ask them to turn the repo into a software factory: a codebase where engineers using AI tools ship correct features faster. The three issues are starting points, not the whole exercise.

The goal is to see whether they can make an environment where AI tools produce high-quality output by default. Not AI slop maxxing. Not refactoring. Not adding features. We want the kind of thinking that shows up in Factory.ai's agent readiness framework and OpenAI's Harness engineering post: agent configuration, feedback loops, automated checks, progressive disclosure of context, and workflow improvements that help humans review AI-generated work quickly.

Strong submissions will go well beyond the three planted issues. Things we'd be impressed by: automated screenshot generation for PR review, simplified dev environment setup for agents, test coverage that agents can run to verify their own changes, CI checks that catch AI-specific failure modes, PR templates, architecture docs that give agents a map instead of a wall of text.

Send the exercise promptly when the candidate reaches this stage. Review the submission before scheduling the technical interview so Wade can reference specifics.

## Exercise Repo

The exercise repo lives in `hiring/take-home/` and is zipped before sending to candidates. It contains:

- A working TanStack Start app with Drizzle ORM and shadcn/ui components
- A simple AI chat feature using Amazon Bedrock (we provide a per-candidate API key)
- Three specific planted issues (documented in the candidate instructions)
- No CLAUDE.md or AI-readiness configuration

See `take-home/README.md` for the full candidate-facing instructions.

## Planted Issues

These are real problems we've encountered with Claude Code on our own codebase. They're starting points to get the candidate moving in the right direction:

1. **Fake UUIDs.** Static UUIDs in seed data and tests use placeholder patterns like `00000000-0000-0000-0000-000000000001` instead of realistic v4 UUIDs. Claude tends to reproduce this pattern when generating new data.

2. **Link/Button nesting.** shadcn `<Button>` components wrapped in TanStack Router `<Link>` components (or vice versa) produce invalid HTML with nested clickable elements. Screen readers and accessibility tools flag these. Claude consistently gets the nesting wrong.

3. **Manual Drizzle migrations.** Migration files were hand-written instead of generated via `drizzle-kit generate`. The journal and snapshots are out of sync. Claude tends to create migration files directly instead of using the generate command.

## What We're Evaluating

The three planted issues are table stakes. We're evaluating the holistic attempt to make the repo a better environment for AI-assisted development:

- Do they address the three planted issues with systemic fixes (not just patches)?
- Do they go beyond the three issues to improve overall repo readiness?
- Do they add tooling, workflows, or checks that help agents verify their own work and help humans review AI output?
- Is their CLAUDE.md/agent config specific, actionable, and well-structured, or is it generic filler?
- Can they write a clear analysis that explains their thinking in their own voice?
- Do they stay focused on shipping velocity and quality, or do they drift into unnecessary refactoring?

## Candidate Instructions (summary)

Full instructions are in `take-home/README.md`. The key points:

- We tell them the three specific issues as starting points
- Their job: turn the repo into a software factory for AI-assisted development
- Do not add new features or refactor for its own sake
- Deliverables: a working configuration and a written analysis (1-2 pages)
- AI tools are encouraged for the work itself
- The written analysis should avoid AI-writing tells
- Three questions to answer in the writeup:
  1. What issues did you find beyond the three we flagged?
  2. What did you configure and why?
  3. What would you do next with more time?

## Per-Candidate Setup

1. Create an IAM user in the `sandbox` account: `./take-home/scripts/candidate-setup.sh <candidate-name>`
2. Zip the `take-home/` directory (exclude `scripts/`)
3. Email the candidate: zip, AWS credentials from step 1, and a 5-day deadline
4. Candidate emails back a zip of their version
5. After review, delete the IAM user: `./take-home/scripts/candidate-teardown.sh <candidate-name>`

## Scorecard: `Take-Home Exercise`

| #   | Question                                                | Description                                                                              | Type                     | Required |
| --- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------ | -------- |
| 1   | Overall recommendation                                  |                                                                                          | _(built-in rating)_      | Yes      |
| 2   | Overall feedback                                        |                                                                                          | _(built-in long answer)_ | Yes      |
| 3   | Planted issues                                          | Did they address the three starting-point issues with systemic fixes?                    | Rating scale             | Yes      |
| 4   | Holistic readiness                                      | Did they go beyond the three issues to improve the overall development environment?       | Rating scale             | Yes      |
| 5   | Configuration quality                                   | Is the agent config specific and actionable, or generic filler?                          | Rating scale             | Yes      |
| 6   | Tooling and workflow                                    | Did they add checks, feedback loops, or workflows that help agents and reviewers?         | Rating scale             | Yes      |
| 7   | Written analysis                                        | Is it clear, specific, and in their own voice?                                           | Rating scale             | Yes      |
| 8   | Anything to dig into during the technical conversation? |                                                                                          | Long answer              | No       |
