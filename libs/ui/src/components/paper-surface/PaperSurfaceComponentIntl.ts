// #region Imports

import { Provider } from '@angular/core';
import { Subject } from 'rxjs';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';

// #endregion

/**
 * Internationalization labels for the paper surface component.
 *
 * @public
 */
export class PaperSurfaceComponentIntl {
    // #region Fields

    private readonly _changes: Subject<void>;
    private _ariaLabel: string;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link PaperSurfaceComponentIntl}` class.
     *
     * @public
     */
    public constructor() {
        this._changes = new Subject();
        this._ariaLabel = 'Document';
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
     * Accessible label for the paper surface document.
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
 * for the paper surface component.
 *
 * @param translations - Translation keys used for the paper surface labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function providePaperSurfaceComponentIntl(translations: IntlTranslationMap<PaperSurfaceComponentIntl>): Provider {
    return {
        provide: PaperSurfaceComponentIntl,
        useFactory: (): PaperSurfaceComponentIntl => translateIntl(new PaperSurfaceComponentIntl(), translations),
    };
}
