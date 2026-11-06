// #region Imports

import { Provider } from '@angular/core';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';
import { Subject } from 'rxjs';

// #endregion

/**
 * Internationalization labels for the color selector component.
 *
 * @public
 */
export class ColorSelectorComponentIntl {
    // #region Fields

    private readonly _changes: Subject<void>;
    private _colorAriaLabel: string;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link ColorSelectorComponentIntl}` class.
     *
     * @public
     */
    public constructor() {
        this._changes = new Subject();
        this._colorAriaLabel = 'Select color {0}';
    }

    // #endregion

    // #region Properties

    /**
     * Emits when any label changes.
     *
     * @public
     * @readonly
     */
    public get changes(): Subject<void> {
        return this._changes;
    }

    /**
     * Aria label template for color swatch buttons. Use `{0}` as placeholder for the color value.
     *
     * @public
     */
    public get colorAriaLabel(): string {
        return this._colorAriaLabel;
    }

    // #endregion
}

/**
 * Provides application-specific internationalization labels
 * for the color selector component.
 *
 * @param translations - Translation keys used for the color selector labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideColorSelectorComponentIntl(translations: IntlTranslationMap<ColorSelectorComponentIntl>): Provider {
    return {
        provide: ColorSelectorComponentIntl,
        useFactory: (): ColorSelectorComponentIntl => translateIntl(new ColorSelectorComponentIntl(), translations),
    };
}
