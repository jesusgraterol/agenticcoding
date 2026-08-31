---
title: Publish an authorized change
description: Commit and push accepted work only after the developer grants explicit publication authority.
slug: publish-an-authorized-change
order: 13
category: execution
publishedAt: 2026-08-30
updatedAt: 2026-08-30
featured: false
draft: false
relatedSlugs:
  - execute-one-milestone
  - review-a-change
prompt: |
  Publish the complete accepted repository change by committing and pushing it to [destination branch on destination remote]. This instruction grants publication authority only for that exact destination and state.

  Before changing Git state, resolve the active branch, its exact push remote, and its destination branch without assuming a default. Inspect the complete uncommitted state and every unpublished commit that would enter the destination. Review unpublished history commit by commit so content introduced and later removed is still checked. Stop if the repository is detached, conflicted, in the middle of another Git operation, contains sensitive data, has unresolved review findings or required verification failures, cannot form a cohesive new commit, or has an ambiguous destination.

  When uncommitted work exists, stage the complete accepted worktree according to the repository workflow and verify that the staged tree exactly matches the inspected state. Create one cohesive commit using the repository's message, sign-off, cryptographic-signature, and hook requirements. Do not weaken or bypass repository policy if signing or hooks fail.

  Push only the active branch's current HEAD to the resolved destination with an explicit one-branch refspec. Do not publish tags or additional refs. Do not force, bypass hooks, amend, stash, reset, rebase, switch branches, or rewrite history. If the push is rejected, preserve the local commit and report the exact retry state instead of changing history.

  Report whether publication used a commit-and-push or push-only path, the created commit hash and subject when applicable, the pushed HEAD hash, active branch, remote destination, and exact push result.
---

## Situation

The implementation has been reviewed and accepted, and the developer now wants that exact state committed and pushed to a known destination.

Publication is a separate authority boundary. A completed milestone, green test suite, ready review verdict, or developer acceptance does not independently permit an agent to create commits, push branches, publish tags, deploy software, or send external messages.

## Common mistake

Treating “ready” as “publish now” collapses engineering judgment and external action into one decision. The agent may push to an assumed remote, include unrelated work, publish uninspected commits, or expose a secret that was introduced and removed within local history.

Another mistake is reducing publication to a literal `git push`. Safe publication must establish what will be committed, which unpublished history will move, where it will go, and which repository policies govern the operation.

## Agentic approach

Authorize one explicit publication outcome. The agent then carries the operational burden while preserving clear stopping conditions:

1. Resolve the active branch and one exact remote destination.
2. Inspect the complete worktree and unpublished history for scope, cohesion, and sensitive data.
3. Reuse current readiness evidence only when it matches the exact state being published.
4. Stage and commit the complete accepted state under repository policy when needed.
5. Verify the created commit before any network action.
6. Push one branch with one explicit refspec and report the result.

This workflow does not authorize deployment, release creation, tag publication, package publication, or another external action.

## Before you send the prompt

Provide:

- the intended remote and destination branch
- the accepted task, plan, milestone, or review evidence
- any known unpublished commits that belong in the push
- any required repository-specific commit or signing policy
- confirmation that deployment and other external actions remain out of scope unless separately authorized

Do not issue this prompt while the repository is still under review or while findings remain unresolved.

## Worked example

Suppose a reviewed documentation change is accepted on branch `clarify_workflow` and should enter `origin/main`. The worktree also contains an unrelated local draft, and the branch contains one earlier unpublished fix.

A safe publication workflow does not select only the documentation file or silently include the draft. It inspects the complete worktree, determines whether one cohesive new commit is possible, inspects the earlier unpublished fix as its own commit, and stops if the draft prevents the complete worktree from forming one honest commit. If the state is cohesive and clean, it creates the required signed commit, verifies its tree and parent, and pushes only `clarify_workflow` to the explicitly resolved destination.

## What a good result contains

- one unambiguous active branch, remote, and destination branch
- complete inspection of uncommitted changes and unpublished commit history
- explicit sensitive-data and unresolved-finding checks
- exact repository commit, sign-off, signature, and hook policy compliance
- a staged tree that matches the accepted state
- a verified commit parent, tree, message, and changed path set
- one explicit branch refspec with no tag or multi-ref publication
- preserved local state and an exact retry point when the push fails
- a report of the commit-and-push or push-only path and its result

## Useful follow-ups

When the destination is ambiguous:

> Show the branch, upstream, push configuration, remotes, and candidate destinations. Do not stage, commit, or push until I identify one exact destination.

When the worktree is not cohesive:

> Identify the unrelated change groups and explain why they cannot form one honest commit. Preserve every file and stop before staging.

When a push is rejected:

> Preserve the local commit. Report its hash, the destination, and the rejection without merging, rebasing, resetting, amending, or forcing.

## Warning signs

- the destination is inferred from a default branch name
- only the latest cumulative diff is inspected while earlier unpublished commit content is ignored
- untracked, deleted, renamed, or submodule changes are omitted
- a secret scan ignores content introduced and removed within unpublished history
- signing, sign-off, hooks, or verification are bypassed after failure
- an implicit push publishes tags or multiple refs
- a rejected push triggers force, rebase, amend, reset, or branch switching
- deployment or another external action is bundled into publication without authority

## Developer review responsibility

Confirm that the destination and published commit range match the accepted change. Treat any retry after local state, remote state, or destination changes as a new publication decision. Keep deployment, release, package publication, and external communication under their own explicit authority boundaries.
