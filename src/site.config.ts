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
    updatedAt: '2026-08-30',
    version: '3.1.0',
  },
  [RESOURCE_IDS.RefinementPrompt]: {
    fileName: 'refine.txt',
    publishedAt: '2026-08-19',
    rawPath: '/refine.txt',
    updatedAt: '2026-08-19',
    version: '1.1.0',
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
  moldeaUrl: 'https://moldea.ai/',
  name: 'Agentic Coding',
  navigation: [
    { href: '/', label: 'Agentic Coding' },
    { href: '/start/', label: 'Start' },
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
  themeColors: {
    dark: '#1e2939',
    light: '#fefdfb',
  },
  url: 'https://agenticcoding.jesusgraterol.dev',
} as const;
