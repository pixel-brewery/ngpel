// #region Imports

import { Provider } from '@angular/core';
import { Subject } from 'rxjs';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';

// #endregion

/**
 * Internationalization labels for the captcha component.
 *
 * @public
 */
export class CaptchaComponentIntl {
    // #region Fields

    private readonly _changes: Subject<void>;
    private _label: string;
    private _questionAdd: string;
    private _questionSubtract: string;
    private _questionMultiply: string;
    private _verifiedMessage: string;
    private _invalidMessage: string;
    private _retryLabel: string;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link CaptchaComponentIntl}` class.
     *
     * @public
     */
    public constructor() {
        this._changes = new Subject();
        this._label = '';
        this._questionAdd = 'What is {0} + {1}?';
        this._questionSubtract = 'What is {0} - {1}?';
        this._questionMultiply = 'What is {0} × {1}?';
        this._verifiedMessage = 'Verification successful';
        this._invalidMessage = 'The answer is not correct';
        this._retryLabel = 'Try again';
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
     * Optional label text displayed above the captcha.
     *
     * @public
     */
    public get label(): string {
        return this._label;
    }

    /**
     * Question template text for addition.
     *
     * @public
     */
    public get questionAdd(): string {
        return this._questionAdd;
    }

    /**
     * Question template text for subtraction.
     *
     * @public
     */
    public get questionSubtract(): string {
        return this._questionSubtract;
    }

    /**
     * Question template text for multiplication.
     *
     * @public
     */
    public get questionMultiply(): string {
        return this._questionMultiply;
    }

    /**
     * Message displayed when verification succeeds.
     *
     * @public
     */
    public get verifiedMessage(): string {
        return this._verifiedMessage;
    }

    /**
     * Message displayed when verification fails.
     *
     * @public
     */
    public get invalidMessage(): string {
        return this._invalidMessage;
    }

    /**
     * Label for the retry action button.
     *
     * @public
     */
    public get retryLabel(): string {
        return this._retryLabel;
    }

    // #endregion
}

/**
 * Provides application-specific internationalization labels
 * for the captcha component.
 *
 * @param translations - Translation keys used for the captcha labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideCaptchaComponentIntl(translations: IntlTranslationMap<CaptchaComponentIntl>): Provider {
    return {
        provide: CaptchaComponentIntl,
        useFactory: (): CaptchaComponentIntl => translateIntl(new CaptchaComponentIntl(), translations),
    };
}
