// #region Imports

import { Provider } from '@angular/core';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';
import { Subject } from 'rxjs';

// #endregion

/**
 * Internationalization labels for the email layout symbol component.
 *
 * @public
 */
export class EmailLayoutSymbolComponentIntl {
    // #region Fields

    private readonly _changes: Subject<void>;
    private _ariaLabel: string;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link EmailLayoutSymbolComponentIntl}` class.
     *
     * @public
     */
    public constructor() {
        this._changes = new Subject();
        this._ariaLabel = 'Email layout';
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
     * Accessible label for the email layout symbol.
     *
     * @public
     */
    public get ariaLabel(): string {
        return this._ariaLabel;
    }

    // #endregion
}

/**
 * Provides application-specific internationalization labels
 * for the email layout symbol component.
 *
 * @param translations - Translation keys used for the email layout symbol labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideEmailLayoutSymbolComponentIntl(translations: IntlTranslationMap<EmailLayoutSymbolComponentIntl>): Provider {
    return {
        provide: EmailLayoutSymbolComponentIntl,
        useFactory: (): EmailLayoutSymbolComponentIntl => translateIntl(new EmailLayoutSymbolComponentIntl(), translations),
    };
}
