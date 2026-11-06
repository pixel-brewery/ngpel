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
