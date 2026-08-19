---
title: Deepen a test strategy
description: Design tests around realistic defects and integration boundaries instead of chasing test count or coverage.
slug: deepen-a-test-strategy
order: 10
category: review
updatedAt: 2026-08-19
featured: true
draft: false
relatedSlugs:
  - challenge-a-plan
  - investigate-a-failing-test
  - review-a-change
prompt: |
  Review the test strategy for this behavior without modifying files:

  [Describe the behavior, affected path, and current or proposed tests.]

  Establish the important correctness properties from the task contract, implementation path, public contracts, failure cost, and repository testing conventions. Build a risk matrix that maps each material defect to the test level and boundary most likely to detect it.

  Decide whether unit tests, integration tests, end-to-end tests, or a combination provides the strongest practical evidence. Keep application-owned collaborators real when their interaction defines correctness. Mock only external boundaries that are impractical to exercise, and explain what confidence is lost.

  Cover applicable success, boundary, malformed input, permissions, ownership, duplicate and replay, retry, idempotency, partial failure, concurrency, numeric, compatibility, accessibility, responsive, theme, and pathological-input risks. Do not add cases mechanically or test framework guarantees.

  Identify defects that could survive the current tests, redundant coverage, brittle implementation-detail assertions, and the smallest high-value test set. End with exact proposed test files, scenarios, fixtures, boundaries, and verification commands. Do not implement the tests yet.
---

## Situation

A plan or implementation says “add tests,” but that phrase does not establish what could break, which boundary should be exercised, or whether passing tests provide meaningful confidence.

Use this recipe before implementing a risky behavior, after a regression escapes, or during review when the suite is green but feels unconvincing.

## Common mistake

Test strategies often mirror functions instead of risks. Every helper gets a unit test while the transaction, authorization boundary, queue handoff, or UI state that defines correctness remains mocked.

Coverage percentage can make this worse. A line executes, but the assertion never proves the invariant that matters.

## Agentic approach

Start with plausible defects and work backward to evidence.

For each correctness property, ask:

1. What realistic defect would violate it?
2. At which boundary does that defect become observable?
3. What is the narrowest test that still keeps the important application path real?
4. Which external boundary must be stubbed, and what uncertainty remains?
5. Could the defect still survive if the proposed assertion passes?

This produces fewer, stronger tests than copying the implementation structure.

## Before you send the prompt

Provide the behavior, task contract, current test files, failure history, and relevant infrastructure constraints. State whether real databases, filesystems, queues, browsers, or provider sandboxes are available in the established test environment.

Do not request every imaginable edge case. Ask the agent to prioritize by failure impact and likelihood.

## Worked example

Suppose a worker applies account credits from a provider webhook. The handler validates a signature, creates a credit transaction, increments the balance, and acknowledges the event.

A unit-only strategy might mock signature verification, transaction persistence, and balance mutation, then assert that three methods were called. It can pass while duplicate delivery credits the account twice.

A risk-based strategy would include:

- **Unit:** payload validation and deterministic extraction of the provider event id.
- **Integration:** real handler, validation, persistence, unique constraint, and balance mutation against a disposable database; only the provider signature primitive is stubbed if a valid request cannot be produced locally.
- **Duplicate delivery:** submit the same event twice and prove one durable transaction and one balance effect.
- **Concurrent delivery:** race two copies of the same event and prove the database invariant holds.
- **Partial failure:** fail after transaction creation but before acknowledgement, retry, and prove the final state remains exactly once.
- **Authorization and authenticity:** reject an invalid signature and stale timestamp before any side effect.

The key assertion is not that `creditBalance` was called. It is that the persisted balance and transaction ledger remain correct under replay and failure.

## What a good result contains

- correctness properties derived from the real contract
- a risk matrix connecting defects to test boundaries
- a deliberate unit, integration, and end-to-end split
- minimal external mocking with important application collaboration kept real
- adversarial cases prioritized by impact
- explicit assessment of defects that could survive
- removal or avoidance of redundant and brittle tests
- exact test ownership, fixtures, setup, and verification commands

## Useful follow-ups

To challenge mocks:

> List every mocked collaborator and the defect it prevents this test from detecting. Recommend the smallest integration boundary that restores meaningful evidence.

To prioritize cases:

> Rank proposed tests by the production failure they detect. Remove cases that only repeat library guarantees or cannot catch a distinct application defect.

To probe complexity:

> Evaluate time and space behavior for realistic and pathological input sizes. Recommend representative tests without brittle wall-clock assertions.

## Warning signs

- test count or coverage is the primary objective
- tests mirror methods rather than user-visible or persisted outcomes
- internal collaborators are mocked at the boundary where correctness lives
- only happy paths and ordinary validation cases exist
- authorization, duplicate delivery, retry, partial failure, or concurrency are ignored where relevant
- snapshots replace precise assertions
- proposed tests depend on private implementation details
- performance claims rely on arbitrary timing thresholds

## Developer review responsibility

Decide which failures justify integration cost and which external systems can participate reliably. Confirm that the final strategy would catch the defects you care about, not merely produce a reassuring report.
