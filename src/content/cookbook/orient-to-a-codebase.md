---
title: Orient to a codebase
description: Build a verified working map of an unfamiliar repository before asking the agent to change it.
slug: orient-to-a-codebase
order: 1
category: planning
publishedAt: 2026-08-19
updatedAt: 2026-10-15
featured: true
draft: false
relatedSlugs:
  - control-scope
  - refine-coding-instructions
situation: The repository is new to you, or you have been away long enough that your mental model is unreliable. Before planning a change, you need to know where behavior enters, who owns it, and how it is verified. A tour of the folders will not tell you.
example:
  - speaker: developer
    text: Map this repository before I add expiration to team invitations. Change nothing.
  - speaker: agent
    text: One invitation traced end to end, with the files that prove each step.
    artifact:
      title: 'Working map: team invitations'
      lines:
        - kind: heading
          text: Flow
        - kind: text
          text: 1. Web form -> generated API client
        - kind: text
          text: 2. invitations.controller.ts validates, calls InvitationService
        - kind: text
          text: 3. The service checks membership, issues a token, saves the invite
        - kind: text
          text: 4. invite-email.worker.ts sends the email after commit
        - kind: text
          text: 5. Acceptance resolves the token inside a transaction
        - kind: heading
          text: Expiration will touch
        - kind: text
          text: creation, acceptance, the cleanup job, email copy, error docs
        - kind: muted
          text: 'Open question: expiration will need an index on expires_at'
prompt: |
  Help me build a working map of this repository without modifying files, installing dependencies, generating artifacts, or changing Git state.

  Start with the root README and applicable coding instructions. Inspect only the smallest representative set of files needed to establish the project's purpose, runtime and package boundaries, public entry points, core data and request flows, module ownership, configuration, tests, build and deployment path, and state-bearing documentation.

  Verify important claims against package files, configuration, imports, scripts, and representative implementation. Distinguish facts, inferences, and unresolved questions. Do not inventory every directory or summarize files one by one.

  Produce a concise working map: how the system starts, where behavior enters, which modules own the main responsibilities, how data and side effects move, where contracts and validation live, how to run focused and complete checks, which files are generated or protected, and where changes are high risk. Include a task-oriented reading path for [describe the area or change I expect to work on].
---

## What good looks like

- flows traced through representative files, not a directory inventory
- runtime, package, and deployment boundaries
- module ownership backed by an import, caller, or document, not a guess
- how to run focused and complete checks
- generated, protected, sensitive, and high-risk areas
- facts kept apart from inferences and open questions
- a short reading path for the change you named

Correct the map where product intent or operational history is not visible in the code. Then decide which open questions deserve a closer look before you plan.

## If the result drifts

To deepen one flow:

> Trace [operation] from its public entry point to its final side effects. Include validation, authorization, persistence, events, errors, and the tests that exercise real integration.

To verify ownership:

> For each responsibility in the map, cite the public export, caller, or documentation that establishes its owner. Flag duplicate or ambiguous ownership.

To control context:

> List the inspected files that contributed no decision-relevant evidence. Skip similar areas in the next pass and follow the task-oriented reading path.

## Warning signs

- a directory tree presented as architecture
- every package described in equal depth, whatever the task
- claims with no import, configuration, caller, or test behind them
- generated output or dependencies treated as project source
- facts and guesses blended together
- orientation quietly turning into edits
