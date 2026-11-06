// #region Imports

import { Provider } from '@angular/core';
import { Subject } from 'rxjs';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';

// #endregion

/**
 * Internationalization labels for the content table of contents component.
 *
 * @public
 */
export class ContentTableOfContentsComponentIntl {
    // #region Fields

    private readonly _changes: Subject<void>;
    private _label: string;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link ContentTableOfContentsComponentIntl}` class.
     *
     * @public
     */
    public constructor() {
        this._changes = new Subject();
        this._label = 'Contents';
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
     * Accessible label and visible heading for the navigation.
     *
     * @public
     */
    public get label(): string {
        return this._label;
    }

    // #endregion
}

/**
 * Provides application-specific internationalization labels
 * for the content table of contents component.
 *
 * @param translations - Translation keys used for the content table of contents labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideContentTableOfContentsComponentIntl(translations: IntlTranslationMap<ContentTableOfContentsComponentIntl>): Provider {
    return {
        provide: ContentTableOfContentsComponentIntl,
        useFactory: (): ContentTableOfContentsComponentIntl => translateIntl(new ContentTableOfContentsComponentIntl(), translations),
    };
}
