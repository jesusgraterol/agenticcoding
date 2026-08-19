// @vitest-environment node
import { describe, expect, test } from 'vitest';

import { buildLlmsText } from './llms-text.ts';

describe('buildLlmsText', () => {
  test('builds the required llms.txt structure with ordered public resources', () => {
    const text = buildLlmsText([
      {
        description: 'Plan a grounded implementation.\nKeep authority narrow.',
        slug: 'plan-a-feature',
        title: 'Plan a [feature]',
      },
      {
        description: 'Review the complete change.',
        slug: 'review-a-change',
        title: 'Review a change',
      },
    ]);

    expect(text).toMatch(/^# Agentic Coding\n\n> .+\n/u);
    expect(text).toContain('## Core resources');
    expect(text).toContain(
      '- [AGENTS.md foundation](https://agenticcoding.jesusgraterol.dev/AGENTS.md)',
    );
    expect(text).toContain(
      '- [Plan a \\[feature\\]](https://agenticcoding.jesusgraterol.dev/cookbook/plan-a-feature/): Plan a grounded implementation. Keep authority narrow.',
    );
    expect(text.indexOf('plan-a-feature')).toBeLessThan(text.indexOf('review-a-change'));
    expect(text).toMatch(/\n## Optional\n/u);
    expect(text.endsWith('\n')).toBe(true);
  });
});
