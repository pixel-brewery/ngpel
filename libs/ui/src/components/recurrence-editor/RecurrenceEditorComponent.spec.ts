// #region Imports

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// #endregion

/** Reads the inline `template` of a component source, so a spec can assert on its markup. */
function inlineTemplateOf(fileName: string): string {
    return inlineBlockOf(fileName, 'template');
}

/** Reads a sibling source file verbatim. */
function sourceOf(fileName: string): string {
    return readFileSync(join(import.meta.dirname, fileName), 'utf8');
}

/** Extracts one backtick-delimited decorator block, resolving the escapes a template literal needs. */
function inlineBlockOf(fileName: string, key: 'styles' | 'template'): string {
    const source = readFileSync(join(import.meta.dirname, fileName), 'utf8');
    const start = source.indexOf(`${key}: \``);

    if (start === -1) {
        throw new Error(`${fileName} has no inline ${key}.`);
    }

    let index = start + key.length + 3;
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

describe('RecurrenceEditorComponent tour accessor contract', () => {
    it('exposes every recurrence control without embedding tour directives', () => {
        // arrange
        const template = inlineTemplateOf('RecurrenceEditorComponent.ts');
        const component = sourceOf('RecurrenceEditorComponent.ts');
        const expectedAnchors = [
            'frequency',
            'summary',
            'interval',
            'weekdays',
            'monthlyMode',
            'monthDay',
            'ordinal',
            'monthlyWeekday',
            'endMode',
            'endAt',
            'count',
        ];

        // assert
        for (const anchor of expectedAnchors) {
            expect(template).toContain(`#${anchor}Target`);
        }
        expect(template).not.toContain('mosaikTourAnchor');
        expect(template).not.toContain('mosaikTourId');
        expect(component).toContain('implements ITourAccessor');
        expect(component).toContain('computed(() => this.frequencyField()().value)');
        expect(component).toContain('computed(() => this.endModeField()().value)');
        expect(component).not.toContain('ControlValueAccessor');
        expect(component).not.toContain('registerOnChange');
        expect(component).not.toContain('registerOnTouched');
    });
});
