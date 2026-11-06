// #region Imports

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// #endregion

/** Extracts the inline `template` of a component source, resolving the escapes a literal needs. */
function inlineTemplateOf(fileName: string): string {
    const source = readFileSync(join(import.meta.dirname, fileName), 'utf8');
    const start = source.indexOf('template: `');

    if (start === -1) {
        throw new Error(`${fileName} has no inline template.`);
    }

    let index = start + 'template: `'.length;
    let block = '';

    while (index < source.length && source[index] !== '`') {
        if (source[index] === '\\') {
            block += source[index + 1];
            index += 2;
            continue;
        }

        block += source[index];
        index += 1;
    }

    const lines = block.split('\n');
    const indent = Math.min(...lines.filter((line) => line.trim() !== '').map((line) => line.length - line.trimStart().length));

    return lines
        .map((line) => line.slice(indent))
        .join('\n')
        .trim();
}

describe('DetailPanelComponent tour targets', () => {
    it('keeps visual targets stable while exposing open-state action targets', async () => {
        // arrange
        const template = inlineTemplateOf('DetailPanelComponent.ts');

        // act
        const handleTarget = template.match(/\[attr\.data-widget-tour-target\]="([\s\S]*?)"/gu) ?? [];

        // assert
        expect(template).toContain("opened() ? 'detailPanel detailPanelOpenState' : 'detailPanel'");
        expect(template).toContain("? 'detailAction detailCloseAction'");
        expect(template).toContain(": 'detailAction detailOpenAction'");
        expect(template).toContain('disabled() ? null');
        expect(handleTarget).toHaveLength(2);
    });
});
