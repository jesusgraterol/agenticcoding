---
title: Review a change
description: Perform a findings-first review of correctness, regressions, scope, tests, and maintainability.
slug: review-a-change
order: 5
category: review
updatedAt: 2026-08-19
featured: true
draft: false
relatedSlugs:
  - execute-one-milestone
  - investigate-a-failing-test
prompt: |
  Review the complete current change without editing it. Establish the exact scope, inspect relevant surrounding contracts, and run applicable non-writing checks. Report findings first in severity order with concrete locations, failure scenarios, and the smallest correction. Evaluate correctness, regressions, security, scope, reuse, test depth, maintainability, and documentation. Report checks run and not run, then give a clear readiness verdict without declaring readiness while material uncertainty remains.
---

## Situation

Implementation is complete enough to inspect, but plausible output is not yet trusted.

## Common mistake

Reviewing only style or changed lines misses broken callers, stale contracts, incomplete tests, and problems created by the prospective integrated state.

## Agentic approach

Review the complete scope and surrounding behavior adversarially. Ask whether a material defect could survive every test currently passing.

## What a good result contains

- findings before summary
- exact locations and concrete risks
- task and repository contract references
- focused test-adequacy analysis
- checks run, results, and limitations
- a readiness verdict supported by evidence

## Warning signs

- summary or praise before findings
- “tests pass” used as the entire correctness argument
- no examination of permissions, errors, or failure paths
- uncertainty hidden behind a ready verdict
- implementation changes made during review

## Developer review responsibility

Validate the review’s interpretation of product intent and decide whether the evidence meets the real release or merge threshold.
