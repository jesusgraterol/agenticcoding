import type { ICookbookCategory } from '../../content/index.ts';

// cookbook groups in index order; recipe pages show the label of their category
export const COOKBOOK_TRACKS = {
  planning: {
    description: 'Map the system before deciding where a change belongs.',
    label: 'Understand the system',
  },
  execution: {
    description:
      'Keep implementation inside its scope, keep documentation current, and recover when work drifts.',
    label: 'Execute with control',
  },
  review: {
    description: 'Demand test evidence that matches the real production risks.',
    label: 'Verify and correct',
  },
  instructions: {
    description: 'Improve the durable rules that shape every future agent conversation.',
    label: 'Govern the workflow',
  },
} as const satisfies Record<ICookbookCategory, { description: string; label: string }>;
