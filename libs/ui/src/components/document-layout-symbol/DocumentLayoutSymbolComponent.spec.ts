// #region Imports

import { TestBed } from '@angular/core/testing';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DocumentLayoutSymbolComponent } from './DocumentLayoutSymbolComponent';

// #endregion

/** Reads a sibling source file verbatim. */
function sourceOf(fileName: string): string {
    return readFileSync(join(import.meta.dirname, fileName), 'utf8');
}

/** Extracts the inline `template` of a component source, resolving the escapes a literal needs. */
function inlineTemplateOf(fileName: string): string {
    const source = sourceOf(fileName);
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

    return block;
}

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    TranslateService: class TranslateService {},
}));

describe('document layout symbol', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('exposes only presentation inputs with an accessible default label', () => {
        // arrange
        TestBed.configureTestingModule({});

        // act
        const component = TestBed.runInInjectionContext(() => new DocumentLayoutSymbolComponent());

        // assert
        expect(component.ariaLabel()).toBe('Document layout');
        expect(typeof component.appearance).toBe('function');
        expect(() => component.appearance()).toThrow();
    });

    describe('edge cases', () => {
        it('keeps domain types out while representing every externally configurable document axis', async () => {
            // arrange

            // act
            const source = sourceOf('DocumentLayoutSymbolComponent.ts');
            const template = inlineTemplateOf('DocumentLayoutSymbolComponent.ts');

            // assert
            expect(source).not.toContain('ICommercialDocumentLayout');
            expect(template).toContain("appearance().headerStyle === 'SIDE'");
            expect(template).toContain("appearance().logoPlacement === 'FOOTER'");
            expect(template).toContain('appearance().partyColumns === 2');
            expect(template).toContain("appearance().itemStyle === 'CARDS'");
            expect(template).toContain("appearance().totalsAlignment === 'STRETCH'");
            expect(template).toContain("appearance().footerStyle === 'COLUMNS'");
            expect(template).toContain('appearance().showAddressLine');
            expect(template).toContain('appearance().showPageNumber');
        });
    });
});
