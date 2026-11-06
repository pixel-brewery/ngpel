// #region Imports

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { TicktackPanelComponent } from './TicktackPanelComponent';

// #endregion

/** Reads the inline 'template' of a component source, so a spec can assert on its markup. */
function inlineTemplateOf(fileName: string): string {
    return inlineBlockOf(fileName, 'template');
}

/** Reads the inline 'styles' of a component source, so a spec can assert on its stylesheet. */
function inlineStylesOf(fileName: string): string {
    return inlineBlockOf(fileName, 'styles');
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

    return block;
}

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    ButtonComponent: class ButtonComponent {},
    IconNameDirective: class IconNameDirective {},
}));

describe('TicktackPanelComponent', () => {
    const template = inlineTemplateOf('TicktackPanelComponent.ts');
    const styles = inlineStylesOf('TicktackPanelComponent.ts');

    it('starts on the primary surface', () => {
        // arrange
        const component = createComponent();

        // act
        const secondaryActive = component.secondaryActive();

        // assert
        expect(secondaryActive).toBe(false);
    });

    it('moves forward to the secondary surface and reports the reason', () => {
        // arrange
        const component = createComponent();
        const changed = vi.fn();
        component.panelChanged.subscribe(changed);

        // act
        component.showSecondary('forward');

        // assert
        expect(component.secondaryActive()).toBe(true);
        expect(changed).toHaveBeenCalledWith({ position: 'secondary', reason: 'forward' });
    });

    it('moves backward to the primary surface and reports the reason', () => {
        // arrange
        const component = createComponent();
        component.showSecondary();
        const changed = vi.fn();
        component.panelChanged.subscribe(changed);

        // act
        component.showPrimary('backward');

        // assert
        expect(component.secondaryActive()).toBe(false);
        expect(changed).toHaveBeenCalledWith({ position: 'primary', reason: 'backward' });
    });

    it('provides right and left navigation around the projected surfaces', () => {
        // arrange

        // act
        const secondarySlotPosition = template.indexOf('ngpTicktackPanelSecondary');

        // assert
        expect(template).toContain('[iconName]="\'chevronRight\'"');
        expect(template).toContain('[iconName]="\'chevronLeft\'"');
        expect(secondarySlotPosition).toBeGreaterThan(template.indexOf('backward-button'));
    });

    it('animates the two surfaces horizontally and respects reduced-motion preferences', () => {
        // arrange

        // act

        // assert
        expect(styles).toContain('transition: transform');
        expect(styles).toContain('transform: translateX(-100%)');
        expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    });
});

function createComponent(): TicktackPanelComponent {
    TestBed.resetTestingModule();

    return TestBed.runInInjectionContext(() => new TicktackPanelComponent());
}
