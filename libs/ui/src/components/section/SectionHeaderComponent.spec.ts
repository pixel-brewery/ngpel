// #region Imports

import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { SectionHeaderComponent } from './SectionHeaderComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    TextComponent: class TextComponent {},
    TypographyDirective: class TypographyDirective {},
}));

describe('SectionHeaderComponent', () => {
    it('requires a header and description while remaining enabled by default', () => {
        // arrange
        TestBed.configureTestingModule({});

        // act
        const component = TestBed.runInInjectionContext(() => new SectionHeaderComponent());

        // assert
        expect(() => component.header()).toThrow();
        expect(() => component.description()).toThrow();
        expect(component.disabled()).toBe(false);
    });
});
