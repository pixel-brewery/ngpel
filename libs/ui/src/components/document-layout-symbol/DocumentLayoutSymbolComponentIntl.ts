// #region Imports

import { Provider } from '@angular/core';
import { Subject } from 'rxjs';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';

// #endregion

/**
 * Internationalization labels for the document layout symbol component.
 *
 * @public
 */
export class DocumentLayoutSymbolComponentIntl {
    // #region Fields

    private readonly _changes: Subject<void>;
    private _ariaLabel: string;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link DocumentLayoutSymbolComponentIntl}` class.
     *
     * @public
     */
    public constructor() {
        this._changes = new Subject();
        this._ariaLabel = 'Document layout';
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
     * Accessible label for the document layout symbol.
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
 * for the document layout symbol component.
 *
 * @param translations - Translation keys used for the document layout symbol labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideDocumentLayoutSymbolComponentIntl(translations: IntlTranslationMap<DocumentLayoutSymbolComponentIntl>): Provider {
    return {
        provide: DocumentLayoutSymbolComponentIntl,
        useFactory: (): DocumentLayoutSymbolComponentIntl => translateIntl(new DocumentLayoutSymbolComponentIntl(), translations),
    };
}
