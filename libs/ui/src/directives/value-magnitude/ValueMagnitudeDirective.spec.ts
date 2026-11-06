// #region Imports

import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ValueMagnitudeDirective } from './ValueMagnitudeDirective';

// #endregion

@Component({
    template: '<mosaik-text [ngpValueMagnitude]="value" />',
    imports: [ValueMagnitudeDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
class TestHostComponent {
    // #region Fields

    public static valueToRender = 0;

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /**
     * Numeric value supplied to the directive under test.
     *
     * @public
     * @readonly
     */
    public readonly value = TestHostComponent.valueToRender;

    // #endregion

    // #region Methods
    // #endregion
}

describe('ValueMagnitudeDirective', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [TestHostComponent] });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('keeps zero at the readable minimum size', () => {
        // arrange

        // act
        const fontSize = renderFontSize(0);

        // assert
        expect(fontSize).toBe(0.875);
    });

    it('grows monotonically for increasing magnitudes', () => {
        // arrange
        const values = [1, 10, 100, 1000];

        // act
        const fontSizes = values.map((value) => renderFontSize(value));

        // assert
        expect(fontSizes).toEqual([...fontSizes].sort((left, right) => left - right));
        expect(new Set(fontSizes).size).toBe(fontSizes.length);
    });

    it('caps large values at the maximum size', () => {
        // arrange
        // act
        const fontSize = renderFontSize(Number.MAX_SAFE_INTEGER);

        // assert
        expect(fontSize).toBe(1.5);
    });

    it('uses absolute magnitude for negative and decimal values', () => {
        // arrange
        const negativeSize = renderFontSize(-12.5);

        // act
        const positiveSize = renderFontSize(12.5);

        // assert
        expect(positiveSize).toBe(negativeSize);
        expect(negativeSize).toBeGreaterThan(0.875);
    });

    it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])('falls back to the minimum size for a non-finite value', (value) => {
        // arrange
        // act
        const fontSize = renderFontSize(value);

        // assert
        expect(fontSize).toBe(0.875);
    });
});

function renderFontSize(value: number): number {
    TestHostComponent.valueToRender = value;
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const textElement = fixture.nativeElement.querySelector('mosaik-text') as HTMLElement;
    const fontSize = readFontSize(textElement);
    fixture.destroy();

    return fontSize;
}

function readFontSize(element: HTMLElement): number {
    return Number.parseFloat(element.style.getPropertyValue('--text-font-size'));
}
