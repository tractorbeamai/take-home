# Onsite Interview

**Duration:** 60 minutes
**Interviewer:** Wade Fletcher (Co-Founder)
**Format:** In-person (or remote if necessary)
**Scheduling:** Same day as team lunch

## Interview Prep (Gem internal note)

The candidate has already passed the coding gate (technical screen). This is a "should we hire this person" conversation, not a "can this person code" question. Two parts: a deep dive into their take-home submission and a systems design discussion.

## Timing Breakdown

| Time      | Section                  |
| --------- | ------------------------ |
| 0-3 min   | Intro, outline the hour  |
| 3-28 min  | Take-home deep dive      |
| 28-53 min | Systems design           |
| 53-58 min | Candidate questions      |
| 58-60 min | Wrap up, next steps      |

## Part 1: Take-Home Deep Dive (25 min)

The take-home is an AI-readiness exercise. The questions here are about their approach to configuring tooling, not about writing code. Let them walk through their submission, then probe.

### Suggested Questions

- "Walk me through your CLAUDE.md. How did you decide what to include?"
- "Show me how your configuration prevents the UUID issue specifically. What happens if Claude tries to generate a placeholder UUID now?"
- "You mentioned [specific tool/hook/rule] in your writeup. What alternatives did you consider?"
- "What did you find beyond the three issues we flagged? How did you discover those?"
- "If a new engineer joined the team tomorrow and started using Claude Code, what would they get wrong that your configuration doesn't cover yet?"
- "How did you use AI tools while doing this exercise? Where did you override what they suggested?"

### Pressure points

- "Your CLAUDE.md says [rule]. What if Claude ignores it?" Push for enforcement mechanisms, not just documentation.
- "This linting rule catches the symptom. What about the underlying pattern?" See if they think in classes of errors vs. individual fixes.

## Part 2: Systems Design (25 min)

Pick one scenario and go deep. These are concrete design problems, not abstract concept checks. Not looking for textbook answers. We want to see whether they can reason through tradeoffs on a real system, the kind of thinking that shows up in Designing Data-Intensive Applications (DDIA).

### Pick one:

**URL shortener.** "Design a URL shortener. You need to generate short codes, store the mappings, and redirect users. Walk me through it." Start simple, then push:
- "How do you generate the short codes? What happens if two requests get the same one?"
- "You're getting 10,000 writes/sec. Where's the bottleneck?"
- "A client wants analytics on click counts. How do you add that without slowing down redirects?" _(Surfaces: write amplification, read/write tradeoffs, caching, hot keys. If they suggest caching click counts, ask about consistency. If they suggest a counter table, ask about write contention.)_

**Survey scoring system.** "A consulting firm ran an AI readiness survey across 200 portfolio companies. The responses are freeform text, inconsistent in length and detail. You need to turn them into numerical scores across dimensions (e.g., 'Data Infrastructure,' 'Talent') and subdimensions (e.g., 'Data Pipelines,' 'ML Hiring'). The scores need to be fair and consistent across companies. How do you design this?" Let them think, then push:
- "Company A wrote three paragraphs about their data stack. Company B wrote 'we use Snowflake.' How do you score them comparably?"
- "The client changes the subdimension definitions after you've already scored 150 companies. How much do you have to redo?"
- "How do you validate that the scores are actually consistent and not just confidently wrong?"

_(The right answer decomposes each subdimension into small, factual questions: categorical or yes/no. "Do they have a centralized data warehouse?" "Do they have dedicated ML engineers?" Then you make many small LLM calls to extract those facts from the freetext, and map/reduce the categorical answers into subdimension and dimension scores. This is better than asking an LLM to "rate this response 1-5" because small factual extractions are more reliable and auditable than holistic judgments. The decomposition also means changing a subdimension definition only requires re-scoring the affected factual questions, not re-inferring everything from scratch. Surfaces: map/reduce thinking, LLM reliability vs. task granularity tradeoffs, caching intermediate results, reprocessing costs, and how to structure AI systems for consistency at scale. This is close to real Tractorbeam work.)_

### How to probe

- Start with the scenario, let them talk, let them drive the architecture
- Push for specifics: "What actually goes wrong if that fails?" "How would you detect that in production?" "What's the operational cost of that choice?"
- It's fine if they don't know the formal terms; practical reasoning counts

## Scorecard: `Onsite Interview`

| #   | Question                              | Description                                                   | Type                     | Required |
| --- | ------------------------------------- | ------------------------------------------------------------- | ------------------------ | -------- |
| 1   | Overall recommendation                |                                                               | _(built-in rating)_      | Yes      |
| 2   | Overall feedback                      |                                                               | _(built-in long answer)_ | Yes      |
| 3   | Take-home depth                       | Can they explain and defend their configuration decisions?    | Rating scale             | Yes      |
| 4   | Systems design                        | Do they reason about tradeoffs on a real system?              | Rating scale             | Yes      |
| 5   | Response to pushback                  | Do they dig in, collapse, or engage with the criticism?       | Rating scale             | Yes      |
| 6   | Gaps or concerns to flag for the team |                                                               | Short answer             | No       |
