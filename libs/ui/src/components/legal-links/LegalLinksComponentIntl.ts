// #region Imports

import { Provider } from '@angular/core';
import { Subject } from 'rxjs';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';

// #endregion

/**
 * Internationalization labels for the legal links component.
 *
 * @public
 */
export class LegalLinksComponentIntl {
    // #region Fields

    private readonly _changes: Subject<void>;
    private _ariaLabel: string;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link LegalLinksComponentIntl}` class.
     *
     * @public
     */
    public constructor() {
        this._changes = new Subject();
        this._ariaLabel = 'Legal and company information links';
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
     * Accessible label for the legal links navigation.
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
 * for the legal links component.
 *
 * @param translations - Translation keys used for the legal links labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideLegalLinksComponentIntl(translations: IntlTranslationMap<LegalLinksComponentIntl>): Provider {
    return {
        provide: LegalLinksComponentIntl,
        useFactory: (): LegalLinksComponentIntl => translateIntl(new LegalLinksComponentIntl(), translations),
    };
}
