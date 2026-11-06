// #region Imports

import { Provider } from '@angular/core';
import { Subject } from 'rxjs';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';

// #endregion

/**
 * Internationalization labels for the dynamic form component.
 *
 * @public
 */
export class DynamicFormComponentIntl {
    // #region Fields

    private readonly _changes: Subject<void>;
    private _openLinkLabel: string;
    private _copyLinkLabel: string;
    private _linkUnavailableLabel: string;
    private _linkCopiedLabel: string;
    private _linkCopyErrorLabel: string;
    private _integerErrorLabel: string;
    private _integerRangeErrorLabel: string;
    private _clearAnswerLabel: string;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link DynamicFormComponentIntl}` class.
     *
     * @public
     */
    public constructor() {
        this._changes = new Subject();
        this._openLinkLabel = 'Open link';
        this._copyLinkLabel = 'Copy link';
        this._linkUnavailableLabel = 'Link unavailable';
        this._linkCopiedLabel = 'Link copied';
        this._linkCopyErrorLabel = 'Could not copy link';
        this._integerErrorLabel = 'Enter a whole number';
        this._integerRangeErrorLabel = 'Enter a whole number within the allowed range';
        this._clearAnswerLabel = 'Clear answer';
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
     * Default label for opening a link.
     *
     * @public
     */
    public get openLinkLabel(): string {
        return this._openLinkLabel;
    }

    /**
     * Label for copying a link.
     *
     * @public
     */
    public get copyLinkLabel(): string {
        return this._copyLinkLabel;
    }

    /**
     * Text shown for an unavailable link.
     *
     * @public
     */
    public get linkUnavailableLabel(): string {
        return this._linkUnavailableLabel;
    }

    /**
     * Status text after a successful copy.
     *
     * @public
     */
    public get linkCopiedLabel(): string {
        return this._linkCopiedLabel;
    }

    /**
     * Status text after a failed copy.
     *
     * @public
     */
    public get linkCopyErrorLabel(): string {
        return this._linkCopyErrorLabel;
    }

    /** Validation message for a number that is not a whole number. */
    public get integerErrorLabel(): string {
        return this._integerErrorLabel;
    }

    /** Validation message for a whole number outside the field's bounds. */
    public get integerRangeErrorLabel(): string {
        return this._integerRangeErrorLabel;
    }

    /** Accessible label for clearing an optional choice. */
    public get clearAnswerLabel(): string {
        return this._clearAnswerLabel;
    }

    // #endregion
}

/**
 * Provides application-specific internationalization labels
 * for the dynamic form component.
 *
 * @param translations - Translation keys used for the dynamic form labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideDynamicFormComponentIntl(translations: IntlTranslationMap<DynamicFormComponentIntl>): Provider {
    return {
        provide: DynamicFormComponentIntl,
        useFactory: (): DynamicFormComponentIntl => translateIntl(new DynamicFormComponentIntl(), translations),
    };
}
