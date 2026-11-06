// #region Imports

import { Provider } from '@angular/core';
import { Subject } from 'rxjs';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';

// #endregion

/**
 * Internationalization labels for the ticktack panel component.
 *
 * @public
 */
export class TicktackPanelComponentIntl {
    // #region Fields

    private readonly _changes: Subject<void>;
    private _primaryPanelLabel: string;
    private _secondaryPanelLabel: string;
    private _forwardLabel: string;
    private _backwardLabel: string;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link TicktackPanelComponentIntl}` class.
     *
     * @public
     */
    public constructor() {
        this._changes = new Subject();
        this._primaryPanelLabel = 'Primary panel';
        this._secondaryPanelLabel = 'Secondary panel';
        this._forwardLabel = 'Show secondary panel';
        this._backwardLabel = 'Show primary panel';
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
     * Accessible label for the primary panel.
     *
     * @public
     */
    public get primaryPanelLabel(): string {
        return this._primaryPanelLabel;
    }

    /**
     * Accessible label for the secondary panel.
     *
     * @public
     */
    public get secondaryPanelLabel(): string {
        return this._secondaryPanelLabel;
    }

    /**
     * Accessible label for the forward navigation button.
     *
     * @public
     */
    public get forwardLabel(): string {
        return this._forwardLabel;
    }

    /**
     * Accessible label for the backward navigation button.
     *
     * @public
     */
    public get backwardLabel(): string {
        return this._backwardLabel;
    }

    // #endregion
}

/**
 * Provides application-specific internationalization labels
 * for the ticktack panel component.
 *
 * @param translations - Translation keys used for the ticktack panel labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideTicktackPanelComponentIntl(translations: IntlTranslationMap<TicktackPanelComponentIntl>): Provider {
    return {
        provide: TicktackPanelComponentIntl,
        useFactory: (): TicktackPanelComponentIntl => translateIntl(new TicktackPanelComponentIntl(), translations),
    };
}
