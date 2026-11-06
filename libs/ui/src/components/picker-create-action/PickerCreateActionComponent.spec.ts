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

describe('Picker create action', () => {
    it('keeps the primary add action sticky above the scrollable picker results', () => {
        // Arrange
        const component = readFileSync(join(import.meta.dirname, 'PickerCreateActionComponent.ts'), 'utf8');

        // Act
        const template = inlineTemplateOf('PickerCreateActionComponent.ts');

        // assert
        expect(component).toContain("class: 'sticky top-0 z-10 block shrink-0'");
        expect(template).toContain('[iconName]="\'add\'"');
        expect(template).toContain('[appearance]="\'solid\'"');
        expect(template).toContain('[variant]="\'primary\'"');
        expect(template).toContain('[ngpCommand]="{ click: createCommand() }"');
    });
});
