// #region Imports

import { Provider } from '@angular/core';
import { Subject } from 'rxjs';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';

// #endregion

/**
 * Internationalization labels for the detail panel component.
 *
 * @public
 */
export class DetailPanelComponentIntl {
    // #region Fields

    private readonly _changes: Subject<void>;
    private _panelLabel: string;
    private _openLabel: string;
    private _closeLabel: string;
    private _backdropLabel: string;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link DetailPanelComponentIntl}` class.
     *
     * @public
     */
    public constructor() {
        this._changes = new Subject();
        this._panelLabel = 'Detail panel';
        this._openLabel = 'Open detail panel';
        this._closeLabel = 'Close detail panel';
        this._backdropLabel = 'Close detail panel';
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
     * Accessible label for the detail panel section.
     *
     * @public
     */
    public get panelLabel(): string {
        return this._panelLabel;
    }

    /**
     * Tooltip and aria-label for opening the detail panel.
     *
     * @public
     */
    public get openLabel(): string {
        return this._openLabel;
    }

    /**
     * Tooltip and aria-label for closing the detail panel.
     *
     * @public
     */
    public get closeLabel(): string {
        return this._closeLabel;
    }

    /**
     * Accessible label for the backdrop overlay.
     *
     * @public
     */
    public get backdropLabel(): string {
        return this._backdropLabel;
    }

    // #endregion
}

/**
 * Provides application-specific internationalization labels
 * for the detail panel component.
 *
 * @param translations - Translation keys used for the detail panel labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideDetailPanelComponentIntl(translations: IntlTranslationMap<DetailPanelComponentIntl>): Provider {
    return {
        provide: DetailPanelComponentIntl,
        useFactory: (): DetailPanelComponentIntl => translateIntl(new DetailPanelComponentIntl(), translations),
    };
}
