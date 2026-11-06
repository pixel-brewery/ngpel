// #region Imports

import { Provider } from '@angular/core';
import { Subject } from 'rxjs';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';

// #endregion

/**
 * Internationalization labels for the rail component.
 *
 * @public
 */
export class RailComponentIntl {
    // #region Fields

    private readonly _changes: Subject<void>;
    private _backLabel: string;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link RailComponentIntl}` class.
     *
     * @public
     */
    public constructor() {
        this._changes = new Subject();
        this._backLabel = 'Back';
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
     * Label for the back navigation button.
     *
     * @public
     */
    public get backLabel(): string {
        return this._backLabel;
    }

    // #endregion
}

/**
 * Provides application-specific internationalization labels
 * for the rail component.
 *
 * @param translations - Translation keys used for the rail labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideRailComponentIntl(translations: IntlTranslationMap<RailComponentIntl>): Provider {
    return {
        provide: RailComponentIntl,
        useFactory: (): RailComponentIntl => translateIntl(new RailComponentIntl(), translations),
    };
}
