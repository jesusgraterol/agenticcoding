// @vitest-environment node
import { describe, expect, test } from 'vitest';

import { buildLlmsText } from './llms-text.ts';

describe('buildLlmsText', () => {
  test('builds the required llms.txt structure with ordered public resources', () => {
    const text = buildLlmsText([
      {
        description: 'Map the editable boundary.\nKeep authority narrow.',
        slug: 'control-scope',
        title: 'Control [scope]',
      },
      {
        description: 'Build a working map first.',
        slug: 'orient-to-a-codebase',
        title: 'Orient to a codebase',
      },
    ]);

    expect(text).toMatch(/^# Agentic Coding\n\n> .+\n/u);
    expect(text).toContain('## Core resources');
    expect(text).toContain(
      '- [AGENTS.md foundation](https://agenticcoding.jesusgraterol.dev/AGENTS.md)',
    );
    expect(text).toContain('- [Workflow](https://agenticcoding.jesusgraterol.dev/workflow/)');
    expect(text).toContain('- [jg-skills index](https://jg-skills.jesusgraterol.dev/llms.txt)');
    expect(text).toContain(
      '- [Control \\[scope\\]](https://agenticcoding.jesusgraterol.dev/cookbook/control-scope/): Map the editable boundary. Keep authority narrow.',
    );
    expect(text.indexOf('control-scope')).toBeLessThan(text.indexOf('orient-to-a-codebase'));
    expect(text).toMatch(/\n## Optional\n/u);
    expect(text.endsWith('\n')).toBe(true);
  });
});
