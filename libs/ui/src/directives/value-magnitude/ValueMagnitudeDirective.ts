// #region Imports

import { Directive, Input } from '@angular/core';

// #endregion

/**
 * Scales a Mosaik text element by the magnitude of a numeric value.
 *
 * @public
 */
@Directive({
    selector: 'mosaik-text[ngpValueMagnitude]',
    host: {
        '[style.--text-font-size]': 'fontSize',
    },
})
export class ValueMagnitudeDirective {
    // #region Fields

    private static readonly _minimumFontSize = 0.875;
    private static readonly _maximumFontSize = 1.5;
    private static readonly _maximumLogarithmicMagnitude = 3;

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /**
     * Numeric value whose absolute magnitude determines the text size.
     *
     * @public
     */
    @Input()
    public ngpValueMagnitude = 0;

    /**
     * Bounded font size applied through the Mosaik text custom property.
     *
     * @protected
     * @readonly
     */
    protected get fontSize(): string {
        return ValueMagnitudeDirective.calculateFontSize(this.ngpValueMagnitude);
    }

    // #endregion

    // #region Methods

    private static calculateFontSize(value: number): string {
        const magnitude = Number.isFinite(value) ? Math.abs(value) : 0;
        const normalizedMagnitude = Math.min(1, Math.log10(magnitude + 1) / ValueMagnitudeDirective._maximumLogarithmicMagnitude);
        const fontSize =
            ValueMagnitudeDirective._minimumFontSize +
            normalizedMagnitude * (ValueMagnitudeDirective._maximumFontSize - ValueMagnitudeDirective._minimumFontSize);

        return `${Number(fontSize.toFixed(3))}rem`;
    }

    // #endregion
}
