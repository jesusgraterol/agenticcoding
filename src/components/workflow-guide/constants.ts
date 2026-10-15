import type { ITranscriptMessage } from '../../content/index.ts';
import type { IWorkflowSkill, IWorkflowStepMarker } from '../../site.config.ts';

// visible labels for steps that are not part of every change
export const STEP_MARKER_LABELS = {
  optional: 'Optional',
  'when-needed': 'When needed',
} as const satisfies Record<IWorkflowStepMarker, string>;

/*
 * Example transcripts for every step except jg-execute, whose two modes are defined below. They
 * follow one fictional feature, organization API keys, from the first idea to a pushed commit.
 */
export const STEP_EXAMPLES: Record<Exclude<IWorkflowSkill, 'jg-execute'>, ITranscriptMessage[]> = {
  'jg-brainstorm': [
    {
      invocation: 'jg-brainstorm',
      speaker: 'developer',
      text: 'Organization API keys: a new keys table with its own CRUD endpoints?',
    },
    {
      artifact: {
        lines: [
          { kind: 'heading', text: 'Recommended direction' },
          { kind: 'text', text: '- Give personal tokens an organization owner' },
          { kind: 'text', text: '- Reuse their hashing, scopes, and revocation' },
          { kind: 'heading', text: 'Still open' },
          { kind: 'text', text: '- Do keys outlive the admin who created them?' },
        ],
        title: 'Summary to plan from',
      },
      speaker: 'agent',
      text: 'src/tokens/ already owns hashing, scopes, and revocation. A second table would duplicate all three.',
    },
  ],
  'jg-plan': [
    { invocation: 'jg-plan', speaker: 'developer' },
    {
      artifact: {
        lines: [
          { kind: 'heading', text: '# Plan: Organization API keys' },
          { kind: 'muted', text: '## Desired final behavior' },
          { kind: 'text', text: 'Organization admins create, scope, rotate, and revoke keys.' },
          { kind: 'muted', text: '## Files to change' },
          { kind: 'text', text: 'src/tokens/token.model.ts, token.service.ts, routes.ts' },
          { kind: 'heading', text: '## Approval required' },
        ],
        title: 'coding-agent-planning/1792040000_org-api-keys/plan.md',
      },
      speaker: 'agent',
      text: 'Plan saved. Approve it to start.',
    },
  ],
  'jg-challenge-plan': [
    { invocation: 'jg-challenge-plan', speaker: 'developer' },
    {
      artifact: {
        lines: [
          { kind: 'heading', text: '## Challenges' },
          { kind: 'text', text: '1. Revoking an admin leaves the keys they created active.' },
          { kind: 'heading', text: '## Developer decisions required' },
          { kind: 'text', text: '1. Keep keys when their creator leaves? Recommended: yes.' },
          { kind: 'heading', text: '## Recommendation' },
          { kind: 'text', text: 'Plan revision required before proceeding' },
        ],
        status: { label: 'Revision required', tone: 'warning' },
        title: 'Challenge',
      },
      speaker: 'agent',
    },
    {
      invocation: 'jg-plan',
      speaker: 'developer',
      text: 'Keep the keys and give the organization ownership.',
    },
  ],
  'jg-breakdown': [
    { invocation: 'jg-breakdown', speaker: 'developer' },
    {
      artifact: {
        lines: [
          { kind: 'heading', text: '## Milestone 1: Organization-owned tokens' },
          { kind: 'muted', text: '**Status:** done' },
          { kind: 'heading', text: '## Milestone 2: Admin endpoints and scopes' },
          { kind: 'heading', text: '## Milestone 3: Rotation and audit events' },
          { kind: 'heading', text: '## Approval required' },
        ],
        title: 'milestones.md',
      },
      speaker: 'agent',
      text: 'Three milestones, each with its own checks and review checkpoint.',
    },
  ],
  'jg-debug': [
    {
      invocation: 'jg-debug',
      speaker: 'developer',
      text: 'A rotated key still authenticates for a few minutes.',
    },
    {
      artifact: {
        lines: [
          { kind: 'heading', text: 'Reproduce' },
          { kind: 'text', text: 'FAIL  rejects the previous key after rotation' },
          { kind: 'heading', text: 'Fix: src/tokens/token-cache.ts' },
          { kind: 'removed', text: 'const cacheKey = `token:${ownerId}`;' },
          { kind: 'added', text: 'const cacheKey = `token:${tokenHash}`;' },
          { kind: 'heading', text: 'Verify' },
          { kind: 'text', text: 'PASS  rejects the previous key after rotation' },
        ],
        status: { label: 'Fixed', tone: 'success' },
        title: 'Cause, fix, and regression test',
      },
      speaker: 'agent',
      text: 'The auth cache was keyed by owner, so the old key stayed cached. session-cache.ts has the same pattern; reported, not changed.',
    },
  ],
  'jg-pause': [
    { invocation: 'jg-pause', speaker: 'developer' },
    {
      artifact: {
        lines: [
          { kind: 'heading', text: 'Done' },
          { kind: 'text', text: 'Rotation endpoint and its integration tests' },
          { kind: 'heading', text: 'Half-finished' },
          { kind: 'text', text: 'Audit event schema: drafted, not wired in' },
          { kind: 'heading', text: 'To resume' },
          { kind: 'text', text: 'Say continue' },
        ],
        status: { label: 'Paused', tone: 'neutral' },
        title: 'Where things stand',
      },
      speaker: 'agent',
      text: 'Stopped at a safe point.',
    },
  ],
  'jg-review': [
    { invocation: 'jg-review', speaker: 'developer' },
    {
      artifact: {
        lines: [
          { kind: 'heading', text: 'Findings' },
          {
            kind: 'text',
            text: '1. High: the revoke route skips the organization admin check (routes.ts:88)',
          },
          { kind: 'heading', text: 'Checks run' },
          { kind: 'text', text: 'unit, integration, typecheck: passed' },
          { kind: 'heading', text: 'Verdict' },
          { kind: 'text', text: 'Not ready' },
        ],
        status: { label: 'Not ready', tone: 'error' },
        title: 'Review of 6 task files',
      },
      speaker: 'agent',
    },
    {
      speaker: 'developer',
      text: 'Fix the finding and review again.',
    },
    {
      speaker: 'agent',
      text: 'Fixed with a regression test. Second review: Ready to commit.',
    },
  ],
  'jg-push': [
    { invocation: 'jg-push', speaker: 'developer' },
    {
      artifact: {
        lines: [
          {
            kind: 'muted',
            text: '$ git commit -s -S -m "feat(tokens): add organization API keys" -- <6 task files>',
          },
          {
            kind: 'text',
            text: '[feature/org-api-keys 7d03b18] feat(tokens): add organization API keys',
          },
          { kind: 'muted', text: '$ git push origin HEAD:refs/heads/feature/org-api-keys' },
          { kind: 'text', text: '7d03b18 pushed to origin/feature/org-api-keys' },
        ],
        status: { label: 'Pushed', tone: 'success' },
        title: 'Commit and push',
      },
      speaker: 'agent',
      text: "Committed only this task's files, signed off and signed.",
    },
  ],
};

// jg-execute builds one milestone and stops, so the developer reviews and publishes it
export const SUPERVISED_EXECUTE_EXAMPLE: ITranscriptMessage[] = [
  { invocation: 'jg-execute', speaker: 'developer' },
  {
    artifact: {
      lines: [
        { kind: 'text', text: 'Milestone 2: Admin endpoints and scopes' },
        { kind: 'text', text: 'Files: 6 changed' },
        { kind: 'text', text: 'Checks: unit, integration, typecheck passed' },
        { kind: 'text', text: 'Status line written to milestones.md' },
        { kind: 'heading', text: 'Next' },
        { kind: 'text', text: 'jg-review, then jg-push, then jg-execute for milestone 3' },
      ],
      status: { label: 'Checks passed', tone: 'success' },
      title: 'Milestone report',
    },
    speaker: 'agent',
  },
];

// jg-execute autonomous reviews and publishes every remaining milestone in order
export const AUTONOMOUS_EXECUTE_EXAMPLE: ITranscriptMessage[] = [
  { invocation: 'jg-execute autonomous', speaker: 'developer' },
  {
    artifact: {
      lines: [
        { kind: 'heading', text: 'Milestone 2' },
        {
          kind: 'text',
          text: 'checks passed, review found 1 blocking issue, fixed, pushed a41c9e2',
        },
        { kind: 'heading', text: 'Milestone 3' },
        { kind: 'text', text: 'checks passed, review clean, pushed 7d03b18' },
        { kind: 'heading', text: 'Stopped' },
        { kind: 'text', text: 'All milestones done. Nothing left uncommitted.' },
      ],
      status: { label: '2 milestones pushed', tone: 'success' },
      title: 'Run report',
    },
    speaker: 'agent',
    text: 'The run pushes to feature/org-api-keys, so no default-branch confirmation was needed.',
  },
];

// what an autonomous run repeats for every milestone
export const AUTONOMOUS_CYCLE = ['Implement', 'Checks', 'Review', 'Fix', 'Push'] as const;

// when an autonomous run stops and hands control back to the developer
export const AUTONOMOUS_STOP_CONDITIONS = [
  'a decision or review finding it should not settle alone',
  'a change to the agreed scope, or a destructive action the plan does not call for',
  'a check that cannot run',
  'the same failure or blocking finding after three fix attempts',
  'a review that ends in Review incomplete, or three rounds that still block',
  'a merge conflict, or a rejected or failed push',
  'changes in scope that nobody can account for',
] as const;

// the outcomes a developer chooses after reviewing the evidence
export const REVIEW_OUTCOMES = [
  { label: 'Correct', text: 'Fix the defect or weak proof, then review the new state.' },
  { label: 'Continue', text: 'Authorize the next milestone.' },
  { label: 'Complete', text: 'Accept the change; nothing is left to build.' },
] as const;
