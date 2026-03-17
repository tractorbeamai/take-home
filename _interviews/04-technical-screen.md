# Technical Screen

**Duration:** 30 minutes
**Interviewer:** Wade Fletcher (Co-Founder)
**Format:** Remote (video call, candidate shares screen)
**Scheduling:** Request availability (after take-home is reviewed)

## Interview Prep (Gem internal note)

This is the coding gate. If they can't get the baseline rate limiter working in 5 minutes, they don't get an onsite. The take-home already tested their AI-readiness thinking; this tests whether they can code and reason under pressure.

**No AI tools for this one.** Tell the candidate up front: no Claude Code, no Copilot, no ChatGPT. Turn off autocomplete. We already evaluated their AI tool usage in the take-home. This is about whether they can reason through a problem and write code themselves.

**Think out loud:** Tell them at the start: "Think out loud. I care more about your reasoning than your output."

## Timing Breakdown

| Time      | Section                                              |
| --------- | ---------------------------------------------------- |
| 0-2 min   | Intro, tell them to use AI tools, think out loud     |
| 2-5 min   | Quick take-home check-in (1-2 questions, not a deep dive) |
| 5-25 min  | Rate limiter                                         |
| 25-30 min | Candidate questions, next steps                      |

## Take-Home Check-In (3 min)

Not a full review. Just confirm they did the work and get a quick read. Save the deep dive for the onsite.

- "In one sentence, what was the highest-impact change you made to the repo?"
- "What's one thing you'd do differently if you did it again?"

## Rate Limiter (20 min)

"Implement a rate limiter. Given a function, a max number of calls N, and a time window T, return a new function that allows at most N calls per T milliseconds." Have them code it on their screen. Think out loud.

### The baseline (5 min)

The trivial correct solution is a fixed-window counter: track the count and the window start time. If the current time is past the window, reset. If under the limit, allow. This should take a competent candidate about 5 minutes. If they struggle here, that's a strong negative signal.

```typescript
// Minimal correct version
function rateLimit(fn: Function, maxCalls: number, windowMs: number) {
  let count = 0;
  let windowStart = Date.now();

  return function (...args: any[]) {
    const now = Date.now();
    if (now - windowStart >= windowMs) {
      count = 0;
      windowStart = now;
    }
    if (count < maxCalls) {
      count++;
      return fn(...args);
    }
  };
}
```

### Push for optimizations (15 min)

Once they have a working version, push through these in order. Stop when they get stuck or time runs out. Each level reveals more about how they think:

1. **"What happens to a request that's rate-limited? Right now it just disappears."** Looking for: return a rejected promise, queue it, throw an error. What's the right API? This tests whether they think about the caller's experience.

2. **"Your window is 1 second with a limit of 10. A user sends 10 requests at 0.9s and 10 more at 1.1s. They just did 20 requests in 200ms. Is that a problem?"** This is the classic fixed-window edge case. Looking for: sliding window (track individual timestamps) or sliding window counter (weighted between current and previous window). Don't expect them to know the names, but they should see the problem and reason toward a fix.

3. **"Now this needs to work across multiple servers behind a load balancer."** Looking for: move the state to Redis or similar. `INCR` + `EXPIRE` for the simple version, sorted sets for sliding window. Tests whether they can think about distributed state. If they mention Redis, ask about race conditions between `INCR` and `EXPIRE`.

4. **"We're calling the Anthropic API. We want to saturate our rate limit, not just stay under it. How does that change the design?"** This flips the problem: now the goal is maximum throughput, not protection. Looking for: token bucket (refill at a steady rate, burst up to the limit), or a queue that drains at the rate limit. This is directly relevant to our work batching LLM calls.

### What good looks like

- **Pass:** Working fixed-window in 5 minutes, sees the edge case when prompted, reasons toward sliding window even if implementation is rough.
- **Strong pass:** Gets through distributed version, articulates the Redis race condition, or independently brings up token bucket.
- **Exceptional:** Connects the "saturate the rate limit" variant to real batching/queue patterns without prompting.

## Scorecard: `Technical Screen`

| #   | Question                              | Description                                                    | Type                     | Required |
| --- | ------------------------------------- | -------------------------------------------------------------- | ------------------------ | -------- |
| 1   | Overall recommendation                |                                                                | _(built-in rating)_      | Yes      |
| 2   | Overall feedback                      |                                                                | _(built-in long answer)_ | Yes      |
| 3   | Rate limiter                          | How far did they get? Baseline only, or into optimizations?    | Rating scale             | Yes      |
| 4   | Response to pushback                  | Do they dig in, collapse, or engage with the criticism?        | Rating scale             | Yes      |
