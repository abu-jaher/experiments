# Reading History & Personalized Recommendations Widget — A/B Test

A client-side A/B test, built and run as a CRO experiment.

## Context

Returning users on the platform frequently lost track of articles they'd previously read and struggled to rediscover relevant content.

**Hypothesis:** giving users a persistent way to revisit prior articles — and surfacing related recommendations — would increase re-engagement and downstream conversion.

## What I Built

Two variants, delivered as fully client-side experiments with no back-end changes, injected over the live site.

| Variant | Description |
| --- | --- |
| **V1** | A "Reading history" widget in the top navigation that tracks viewed articles (title, authors, publication date), persists them across sessions, and presents them in an accessible slide-in panel with a first-visit tooltip nudge. |
| **V2** | Everything in V1, plus a "Recommended for you" section built from the recommendation cards already on visited pages, deduplicated against reading history, with progressive disclosure ("View more / less"). |

## Key Functionality I Implemented

- **DOM-readiness polling** — a `requestAnimationFrame`-based `waitUntil` utility that resolves once required nodes exist, with a timeout fallback, instead of relying on brittle fixed delays on a page I didn't control.
- **Cross-navigation persistence** — a cookie layer with JSON serialization and expiry, plus a "staging" pattern that captures the current article on one page load and commits it to history on the next, so data survives full page reloads.
- **Recommendation harvesting + dedup** — V2 scrapes the page's own recommendation cards using layered fallback selectors, then deduplicates bidirectionally (case-insensitive substring matching) against both history and existing recommendations, capping each list at 10.
- **Accessibility** — full keyboard support in the modal: focus trapping, tab cycling (forward and shift-tab), Enter-key activation, and focus restoration on close.
- **Robustness & cleanliness** — a single delegated `click` listener rather than per-element handlers, an idempotency guard to prevent double-injection, `unsafeWindow` handling for sandboxed contexts, and debug logging gated behind a QA cookie so production stays silent.

## Files

| File | Purpose |
| --- | --- |
| `v1.js` / `v1.css` | Variant 1 — reading history widget |
| `v2.js` / `v2.css` | Variant 2 — reading history + recommendations |
