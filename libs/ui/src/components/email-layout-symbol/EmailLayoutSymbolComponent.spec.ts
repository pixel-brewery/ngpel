// #region Imports

import { TestBed } from '@angular/core/testing';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EmailLayoutSymbolComponent } from './EmailLayoutSymbolComponent';

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

describe('email layout symbol', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('exposes only presentation inputs with an accessible default label', () => {
        // arrange
        TestBed.configureTestingModule({});

        // act
        const component = TestBed.runInInjectionContext(() => new EmailLayoutSymbolComponent());

        // assert
        expect(component.ariaLabel()).toBe('Email layout');
        expect(typeof component.appearance).toBe('function');
        expect(() => component.appearance()).toThrow();
    });

    describe('edge cases', () => {
        it('keeps domain types out while representing every externally configurable layout axis', () => {
            // arrange

            // act
            const source = sourceOf('EmailLayoutSymbolComponent.ts');
            const template = inlineTemplateOf('EmailLayoutSymbolComponent.ts');

            // assert
            expect(source).not.toContain('IEmailDesignSource');
            expect(template).toContain("appearance().accentPosition === 'START'");
            expect(template).toContain("appearance().logoAlignment === 'CENTER'");
            expect(template).toContain("appearance().contentAlignment === 'END'");
            expect(template).toContain("appearance().actionAlignment === 'STRETCH'");
            expect(template).toContain("appearance().footerTone === 'PRIMARY'");
            expect(template).toContain('appearance().compact');
            expect(template).toContain('appearance().framed');
        });
    });
});
