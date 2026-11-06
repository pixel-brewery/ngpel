// #region Imports

import { Injectable, signal, type Signal, type WritableSignal } from '@angular/core';

// #endregion

/**
 * Coordinates the expansion of cards within one owning view.
 *
 * @public
 */
@Injectable()
export class CardAccordion {
    // #region Fields

    private readonly _isExpandable: WritableSignal<boolean> = signal(false);
    private readonly _expandedCard: WritableSignal<object | null> = signal(null);

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /**
     * Whether cards in this view can be expanded individually.
     *
     * @public
     * @readonly
     */
    public get isExpandable(): Signal<boolean> {
        return this._isExpandable.asReadonly();
    }

    /**
     * The currently expanded card, if any.
     *
     * @public
     * @readonly
     */
    public get expandedCard(): Signal<object | null> {
        return this._expandedCard.asReadonly();
    }

    // #endregion

    // #region Methods

    /**
     * Applies the owning view's responsive expansion mode.
     *
     * @param value - Whether the cards are expandable.
     * @public
     */
    public setExpandable(value: boolean): void {
        if (this._isExpandable() === value) {
            return;
        }

        this._isExpandable.set(value);
        this._expandedCard.set(null);
    }

    /**
     * Opens one card and closes the previous card, or closes the active card.
     *
     * @param card - Card whose expansion is toggled.
     * @public
     */
    public toggle(card: object): void {
        this._expandedCard.set(this._expandedCard() === card ? null : card);
    }

    /**
     * Clears an active card when it leaves the owning view.
     *
     * @param card - Card leaving the view.
     * @public
     */
    public release(card: object): void {
        if (this._expandedCard() === card) {
            this._expandedCard.set(null);
        }
    }

    // #endregion
}
