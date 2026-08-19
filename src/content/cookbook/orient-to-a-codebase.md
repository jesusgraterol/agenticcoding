---
title: Orient to a codebase
description: Build a verified working map of an unfamiliar repository before asking the agent to change it.
slug: orient-to-a-codebase
order: 1
category: planning
updatedAt: 2026-08-19
featured: true
draft: false
relatedSlugs:
  - plan-a-feature
  - control-scope
  - refine-coding-instructions
prompt: |
  Help me build a working map of this repository without modifying files, installing dependencies, generating artifacts, or changing Git state.

  Start with the root README and applicable coding instructions. Inspect only the smallest representative set of files needed to establish the project's purpose, runtime and package boundaries, public entry points, core data and request flows, module ownership, configuration, tests, build and deployment path, and state-bearing documentation.

  Verify important claims against package files, configuration, imports, scripts, and representative implementation. Distinguish facts, inferences, and unresolved questions. Do not inventory every directory or summarize files one by one.

  Produce a concise working map: how the system starts, where behavior enters, which modules own the main responsibilities, how data and side effects move, where contracts and validation live, how to run focused and complete checks, which files are generated or protected, and where changes are high risk. Include a task-oriented reading path for [describe the area or change I expect to work on].
---

## Situation

You are entering an unfamiliar repository or returning after enough time that your mental model is unreliable. Before planning a change, you need to know where behavior enters, who owns it, how it is verified, and which boundaries should not be crossed casually.

## Common mistake

“Explain this repository” often produces a directory inventory. The agent reads many files, repeats their names, and still cannot answer how a request reaches persistence or which module owns an error contract.

Unbounded exploration also consumes context with generated output, dependencies, fixtures, and irrelevant modules. The result looks comprehensive but makes later decisions worse.

## Agentic approach

Orient around flows and decisions, not folders. Start with the repository's own map, then verify representative paths.

A useful working map answers:

- What is this system for, and what are its deployable or publishable units?
- How does each unit start and receive work?
- Which modules own domain behavior, integration boundaries, and shared contracts?
- Where do validation, authorization, persistence, side effects, and error translation happen?
- How are focused tests and complete verification run?
- Which files are generated, protected, externally managed, or dangerous to modify?
- What should be inspected first for the task you expect to perform?

## Before you send the prompt

Name the part of the product or upcoming task that matters. “I expect to work on team invitations” gives the orientation a useful center of gravity.

Mention hard context exclusions, sensitive areas, unavailable services, and whether the current worktree contains changes. If the repository is a monorepo, identify the likely application or package without assuming it is the only affected boundary.

## Worked example

Suppose you are about to add an expiration policy to team invitations in a large monorepo.

A weak orientation lists `apps/web`, `apps/api`, and `packages/shared`.

A useful map traces one invitation:

1. The web form validates a local input shape and sends a command through the generated API client.
2. The API controller validates the transport contract and delegates to the team-invitation service.
3. The service verifies inviter membership, creates a token through the identity module, and persists the invitation through the team-invitation model.
4. A worker sends the email after a committed event.
5. Acceptance resolves the token, checks current invitation state, and performs membership creation inside a transaction.
6. Unit tests cover state decisions; integration tests exercise persistence and duplicate acceptance; browser tests cover the form and expired-link experience.

The map should cite the representative files and symbols that establish this flow. It should also flag that expiration affects creation, acceptance, cleanup, email copy, database indexes, and public error documentation. That turns the next planning conversation into targeted investigation instead of rediscovery.

## What a good result contains

- a concise system map grounded in repository evidence
- runtime, package, and deployment boundaries
- representative end-to-end flows rather than a file inventory
- explicit module ownership and public import boundaries
- configuration, test, build, and documentation entry points
- generated, protected, sensitive, or high-risk areas
- facts separated from inference and unresolved questions
- a short task-specific reading path

## Useful follow-ups

To deepen one flow:

> Trace [operation] from its public entry point to its final side effects. Include validation, authorization, persistence, events, errors, and the tests that exercise real integration.

To verify ownership:

> For each responsibility in the proposed working map, cite the public export, caller, or documentation that establishes its owner. Flag duplicate or ambiguous ownership.

To control context:

> Identify which inspected files contributed no decision-relevant evidence. Exclude similar areas from the next pass and focus on the task-oriented reading path.

## Warning signs

- a directory tree presented as architecture
- every package described with equal depth regardless of the task
- important claims unsupported by imports, configuration, callers, or tests
- generated output or dependencies treated as project source
- no distinction between public boundaries and internal implementation
- facts and guesses blended together
- orientation silently turns into implementation

## Developer review responsibility

Correct the map where product intent or operational history is not represented in code. Decide which unresolved areas deserve deeper inspection before planning. A working map should be accurate enough to guide the next decision, not exhaustive enough to replace the repository.
