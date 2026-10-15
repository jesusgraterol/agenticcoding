---
title: Deepen a test strategy
description: Design tests around realistic defects and integration boundaries instead of chasing test count or coverage.
slug: deepen-a-test-strategy
order: 5
category: review
publishedAt: 2026-08-19
updatedAt: 2026-10-15
featured: true
draft: false
relatedSlugs:
  - control-scope
  - recover-from-agent-drift
situation: A plan says "add tests", or a suite is green but unconvincing. You need to know which defects matter, where each one becomes observable, and whether a passing test would actually catch it.
example:
  - speaker: developer
    text: Review the test strategy for the webhook that applies account credits. Do not write tests yet.
  - speaker: agent
    text: The current tests mock the ledger, so a duplicate delivery could credit an account twice and every test would still pass.
    artifact:
      title: Risk matrix
      lines:
        - kind: heading
          text: Defect -> where it becomes observable
        - kind: text
          text: duplicate delivery credits twice -> integration, real database
        - kind: text
          text: two copies race -> integration, unique constraint
        - kind: text
          text: crash after insert, before ack -> integration, retried event
        - kind: text
          text: forged or stale signature -> rejected before any side effect
        - kind: heading
          text: Survives the current tests
        - kind: text
          text: 'every assertion checks a mock call, never the persisted balance'
prompt: |
  Review the test strategy for this behavior without modifying files:

  [Describe the behavior, affected path, and current or proposed tests.]

  Establish the important correctness properties from the task contract, implementation path, public contracts, failure cost, and repository testing conventions. Build a risk matrix that maps each material defect to the test level and boundary most likely to detect it.

  Decide whether unit tests, integration tests, end-to-end tests, or a combination provides the strongest practical evidence. Keep application-owned collaborators real when their interaction defines correctness. Mock only external boundaries that are impractical to exercise, and explain what confidence is lost.

  Cover applicable success, boundary, malformed input, permissions, ownership, duplicate and replay, retry, idempotency, partial failure, concurrency, numeric, compatibility, accessibility, responsive, theme, and pathological-input risks. Do not add cases mechanically or test framework guarantees.

  Identify defects that could survive the current tests, including failures hidden because the implementation and tests share the same assumption. Recommend independent oracles where material risk justifies them, such as property-based or fuzz tests, mutation testing, contract or differential checks, realistic integration and end-to-end paths, durable invariants, or operational feedback. For each technique, name the defect it can detect and its practical cost.

  End with exact proposed test files, scenarios, fixtures, boundaries, independent oracles, and verification commands. Do not implement the tests yet.
---

## What good looks like

- correctness properties taken from the real contract
- a risk matrix that maps each defect to the boundary where it becomes observable
- application collaborators kept real wherever their interaction defines correctness
- only impractical external boundaries mocked, with the lost confidence named
- cases ranked by production impact, not added mechanically
- every place where implementation and tests share the same assumption called out
- independent oracles chosen for the defect each can falsify: property-based or fuzz tests, mutation testing, contract or differential tests, durable invariants, or realistic integration and end-to-end paths
- exact test files, fixtures, and verification commands

Invest in the verification system the agent will operate. Decide which failures justify integration cost and which assumptions need an independent oracle.

## If the result drifts

To challenge mocks:

> List every mocked collaborator and the defect it prevents this test from detecting. Recommend the smallest integration boundary that restores meaningful evidence.

To prioritize cases:

> Rank the proposed tests by the production failure each one detects. Remove cases that only repeat library guarantees or cannot catch a distinct application defect.

To challenge correlated evidence:

> Identify every expected result derived from the implementation or its fixtures. Replace each material circular oracle with an invariant, independent reference, mutation, differential result, or real system outcome.

## Warning signs

- test count or coverage as the goal
- tests that mirror methods instead of persisted or user-visible outcomes
- collaborators mocked at the boundary where correctness lives
- only happy paths and ordinary validation
- duplicate delivery, retry, partial failure, or concurrency ignored where they apply
- snapshots replacing precise assertions
- performance claims based on arbitrary timing thresholds
