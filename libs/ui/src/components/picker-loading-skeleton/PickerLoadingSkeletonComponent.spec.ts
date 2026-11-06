// #region Imports

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// #endregion

/** Reads the inline `template` of a component source, so a spec can assert on its markup. */
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

    // The block was indented when it moved into the decorator; assertions quote the original markup.
    const lines = block.split('\n');
    const indent = Math.min(...lines.filter((line) => line.trim() !== '').map((line) => line.length - line.trimStart().length));

    return lines
        .map((line) => line.slice(indent))
        .join('\n')
        .trim();
}

describe('PickerLoadingSkeletonComponent', () => {
    it('preserves three result rows', () => {
        // Arrange
        const template = inlineTemplateOf('PickerLoadingSkeletonComponent.ts');

        // Act
        const rows = template.match(/<mosaik-skeleton/gu);

        // Assert
        expect(rows).toHaveLength(3);
    });

    it('marks the skeleton as busy for assistive technology', () => {
        // Arrange
        const template = inlineTemplateOf('PickerLoadingSkeletonComponent.ts');

        // Act
        const isBusy = template.includes('aria-busy="true"');

        // Assert
        expect(isBusy).toBe(true);
    });

    it('renders no textual or indeterminate loading state next to the rows', () => {
        // Arrange
        const template = inlineTemplateOf('PickerLoadingSkeletonComponent.ts');

        // Act
        const competingStates = ['mosaik-empty-state', 'mosaik-busy-state', 'mosaik-progress'].filter((state) => template.includes(state));

        // Assert
        expect(competingStates).toEqual([]);
    });
});
