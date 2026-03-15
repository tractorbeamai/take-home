# Technical Interview

**Duration:** 60 minutes
**Interviewer:** Wade Fletcher (Co-Founder)
**Scheduling:** Request availability (after take-home is reviewed)

## Interview Prep (Gem internal note)

Three parts: take-home review, live problem-solving, and a distributed systems discussion. This is a real technical evaluation with some pressure. We want to see how they think under load, not in a comfortable async setting. Bias toward candidates who reach for AI tools during live work without being prompted. If they ask whether they can use Claude Code or similar during the live portion, the answer is yes, and that's a positive signal.

## Timing Breakdown

| Time      | Section                                                                                   |
| --------- | ----------------------------------------------------------------------------------------- |
| 0-3 min   | Intro, outline the session ("three parts: walkthrough, live problem, systems discussion") |
| 3-20 min  | Take-home review                                                                          |
| 20-40 min | Live problem-solving                                                                      |
| 40-52 min | Distributed systems discussion                                                            |
| 52-57 min | Candidate questions                                                                       |
| 57-60 min | Wrap up, next steps                                                                       |

## Part 1: Take-Home Review (17 min)

Let the candidate walk through their submission, then probe.

### Suggested Questions

- "Walk me through the architecture. Why did you structure it this way?"
- "What would break first if this had 100x the traffic?"
- "What would you change if you had another day?"
- "I noticed [specific decision]. What were the alternatives you considered?"
- "How did you use AI tools during this? Walk me through a specific example where it helped, and one where you had to override or correct it."

## Part 2: Live Problem-Solving (20 min)

A focused coding problem done in a shared environment (VS Code Live Share, screen share, etc.). Apply some pressure. Time-box it clearly and let them know you'll be asking them to talk through their thinking as they go.

### Guidelines

- Pick a problem relevant to our work (data transformation, API design, React state management, etc.)
- Explicitly tell them: "Feel free to use whatever tools you'd normally use: Claude Code, docs, whatever."
- Watch for: Do they reach for AI tools? How do they prompt? Do they blindly accept output or review critically?
- Push back on their first approach at least once: "What if we needed to handle [edge case]?" or "Is there a simpler way?"

## Part 3: Distributed Systems Discussion (12 min)

Whiteboard-style conversation assessing their understanding of systems design fundamentals, the kind of material in Designing Data-Intensive Applications (DDIA). Not looking for textbook answers, but practical intuition.

### Pick 1-2 of these threads and go deep:

- **Caching:** "You're building a service that reads from a database on every request. When would you add a cache? What are the tradeoffs? What bugs does a cache introduce?" _(Looking for: cache invalidation complexity, stale reads, thundering herd, write-through vs. write-behind vs. cache-aside)_
- **Read/write amplification:** "You're designing a system that ingests a high volume of writes but needs fast reads. How do you think about the tradeoff between optimizing for writes vs. reads?" _(Looking for: LSM trees vs. B-trees intuition, denormalization, materialized views, the idea that you can trade write cost for read speed and vice versa)_
- **Replication & consistency:** "Your app has users on both coasts. You add a read replica. What problems might a user experience?" _(Looking for: replication lag, read-after-write consistency, monotonic reads, eventual consistency tradeoffs)_
- **Partitioning:** "You need to shard a database. How do you pick a partition key? What goes wrong if you pick badly?" _(Looking for: hot spots, range vs. hash partitioning, scatter-gather queries, rebalancing)_

### How to probe

- Start with the scenario, let them talk
- Push for specifics: "What would actually go wrong?" "How would you detect that?" "What's the operational cost of that choice?"
- It's fine if they don't know the formal terms; practical reasoning counts

## Scorecard: `Technical Interview`

| #   | Question                              | Description                                                    | Type                     | Required |
| --- | ------------------------------------- | -------------------------------------------------------------- | ------------------------ | -------- |
| 1   | Overall recommendation                |                                                                | _(built-in rating)_      | Yes      |
| 2   | Overall feedback                      |                                                                | _(built-in long answer)_ | Yes      |
| 3   | Take-home depth                       | Can they explain and defend their decisions?                   | Rating scale             | Yes      |
| 4   | AI tool fluency                       | Do they reach for AI tools naturally and use them effectively? | Rating scale             | Yes      |
| 5   | Live problem-solving                  | How do they perform under pressure with time constraints?      | Rating scale             | Yes      |
| 6   | Systems thinking                      | Do they reason about tradeoffs at the infrastructure level?    | Rating scale             | Yes      |
| 7   | Response to pushback                  | Do they dig in, collapse, or engage with the criticism?        | Rating scale             | Yes      |
| 8   | Gaps or concerns to flag for the team |                                                                | Short answer             | No       |
