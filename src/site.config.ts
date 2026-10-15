// public resource identifiers supported by the static content layer.
export const RESOURCE_IDS = {
  AgentsFoundation: 'agents-foundation',
  RefinementPrompt: 'refinement-prompt',
} as const;

export type IResourceId = (typeof RESOURCE_IDS)[keyof typeof RESOURCE_IDS];

// resource metadata is centralized so rendered and raw surfaces share one version contract.
export const RESOURCE_CONFIG = {
  [RESOURCE_IDS.AgentsFoundation]: {
    fileName: 'AGENTS.md',
    publishedAt: '2026-08-19',
    rawPath: '/AGENTS.md',
    updatedAt: '2026-10-15',
    version: '4.0.0',
  },
  [RESOURCE_IDS.RefinementPrompt]: {
    fileName: 'refine.txt',
    publishedAt: '2026-08-19',
    rawPath: '/refine.txt',
    updatedAt: '2026-10-15',
    version: '2.0.0',
  },
} as const satisfies Record<
  IResourceId,
  {
    fileName: string;
    publishedAt: string;
    rawPath: string;
    updatedAt: string;
    version: string;
  }
>;

// canonical metadata and public navigation for every generated page.
export const SITE_CONFIG = {
  author: {
    name: 'Jesus Graterol',
    url: 'https://jesusgraterol.dev/',
  },
  defaultDescription:
    'Plan, challenge, build, and review production software with coding agents while developers retain acceptance and publication authority.',
  language: 'en',
  license: 'MIT',
  // the live moldea destination; moldea.ai itself is under construction
  moldeaUrl: 'https://skill.moldea.ai/',
  name: 'Agentic Coding',
  navigation: [
    { href: '/', label: 'Agentic Coding' },
    { href: '/start/', label: 'Start' },
    { href: '/workflow/', label: 'Workflow' },
    { href: '/refine/', label: 'Refine' },
    { href: '/cookbook/', label: 'Cookbook' },
  ],
  openGraph: {
    height: 630,
    image: '/og/agentic-coding.png',
    imageAlt: 'Agentic Coding: engineering with coding agents',
    imageType: 'image/png',
    locale: 'en_US',
    width: 1200,
  },
  repositoryUrl: 'https://github.com/jesusgraterol/agenticcoding',
  // companion skill collection that runs the workflow; its site owns the full skill instructions
  skills: {
    installCommand: 'npx skills add jesusgraterol/jg-skills --skill "*" -y',
    name: 'jg-skills',
    url: 'https://jg-skills.jesusgraterol.dev/',
    verificationNote: 'Explicit-only invocation is verified with Claude Code and Codex.',
  },
  themeColors: {
    dark: '#1e2939',
    light: '#fefdfb',
  },
  url: 'https://agenticcoding.jesusgraterol.dev',
} as const;

// workflow stages in display order, with the summary shown beside each stage
export const WORKFLOW_STAGES = {
  plan: { label: 'Plan', summary: 'Agree on what to build before any code changes.' },
  build: { label: 'Build', summary: 'Turn the approved plan into verified code.' },
  ship: { label: 'Ship', summary: 'Check the finished change, then publish it.' },
} as const;

export type IWorkflowStage = keyof typeof WORKFLOW_STAGES;

// when a workflow step is not part of every change
export type IWorkflowStepMarker = 'optional' | 'when-needed';

// visible labels for steps that are not part of every change
export const WORKFLOW_STEP_MARKER_LABELS = {
  optional: 'Optional',
  'when-needed': 'When needed',
} as const satisfies Record<IWorkflowStepMarker, string>;

// one jg skill as presented by this site; jg-skills owns its full instructions
export interface ISkillSummary {
  mayChange: string;
  purpose: string;
  skill: string;
}

// one step of the workflow walkthrough
export interface IWorkflowStep extends ISkillSummary {
  marker: IWorkflowStepMarker | undefined;
  stage: IWorkflowStage;
}

/*
 * The nine workflow steps in order. Purposes and "may change" summaries follow the jg-skills
 * README; update them whenever jg-skills adds, removes, or renames a skill or changes what one
 * may change.
 */
export const WORKFLOW_STEPS = [
  {
    marker: 'optional',
    mayChange: 'Nothing.',
    purpose: 'Thinks an idea through with you and recommends a direction before planning.',
    skill: 'jg-brainstorm',
    stage: 'plan',
  },
  {
    marker: undefined,
    mayChange: 'Writes plan.md under coding-agent-planning/ and removes a stale milestones.md.',
    purpose: 'Creates or revises an implementation-ready plan for the change under discussion.',
    skill: 'jg-plan',
    stage: 'plan',
  },
  {
    marker: 'optional',
    mayChange: 'Nothing.',
    purpose: 'Challenges a plan before approval and surfaces material risks, gaps, and decisions.',
    skill: 'jg-challenge-plan',
    stage: 'plan',
  },
  {
    marker: 'optional',
    mayChange: 'Writes or removes milestones.md next to the plan.',
    purpose:
      'Splits a plan into ordered, reviewable milestones when it has real implementation boundaries.',
    skill: 'jg-breakdown',
    stage: 'plan',
  },
  {
    marker: undefined,
    mayChange:
      "Code and milestone status lines. In autonomous mode it also commits and pushes each milestone's files.",
    purpose:
      'Builds an agreed task, a plan, or its milestones; supervised by default, or autonomous.',
    skill: 'jg-execute',
    stage: 'build',
  },
  {
    marker: 'when-needed',
    mayChange: 'Code, a regression test, and temporary logging it removes. Never commits.',
    purpose:
      'Reproduces a bug, finds its cause, and fixes it with a regression test that fails first.',
    skill: 'jg-debug',
    stage: 'build',
  },
  {
    marker: 'when-needed',
    mayChange: 'Nothing.',
    purpose:
      'Stops at the nearest safe point, reports where things stand, and waits until you continue.',
    skill: 'jg-pause',
    stage: 'build',
  },
  {
    marker: undefined,
    mayChange: "No files. With a target branch, it may refresh that branch's remote-tracking ref.",
    purpose: "Reviews the current task's uncommitted changes, or the branch against a target.",
    skill: 'jg-review',
    stage: 'ship',
  },
  {
    marker: undefined,
    mayChange:
      "Stages and commits the task's files, or every change when there is no task, and pushes the current branch.",
    purpose:
      "Commits the current task's files with a signed-off, signed commit and pushes the branch.",
    skill: 'jg-push',
    stage: 'ship',
  },
] as const satisfies readonly IWorkflowStep[];

export type IWorkflowSkill = (typeof WORKFLOW_STEPS)[number]['skill'];

// skills that support the workflow without being one of its steps
export const SUPPORTING_SKILLS = [
  {
    mayChange: 'Nothing.',
    purpose: 'Assesses feedback independently and recommends what to adopt, reject, or adjust.',
    skill: 'jg-feedback',
  },
  {
    mayChange: 'Nothing.',
    purpose: 'Finds a named Codex or Claude Code session and answers questions about it.',
    skill: 'jg-session',
  },
] as const satisfies readonly ISkillSummary[];

// the outcomes a developer chooses after reviewing the evidence
export const REVIEW_OUTCOMES = [
  { label: 'Correct', text: 'Fix the defect or weak proof, then review the new state.' },
  { label: 'Continue', text: 'Authorize the next milestone.' },
  { label: 'Complete', text: 'Accept the change; nothing is left to build.' },
] as const;

// publication dates of the workflow page
export const WORKFLOW_PAGE_DATES = {
  publishedAt: '2026-10-15',
  updatedAt: '2026-10-15',
} as const;

// former cookbook recipes and the workflow step that replaced each one
export const MOVED_COOKBOOK_RECIPES = {
  'plan-a-feature': 'jg-plan',
  'challenge-a-plan': 'jg-challenge-plan',
  'break-down-a-plan': 'jg-breakdown',
  'execute-one-milestone': 'jg-execute',
  'investigate-a-failing-test': 'jg-debug',
  'review-a-change': 'jg-review',
  'publish-an-authorized-change': 'jg-push',
} as const satisfies Record<string, IWorkflowSkill>;
