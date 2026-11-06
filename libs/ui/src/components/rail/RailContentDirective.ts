// #region Imports

import { computed, Directive, inject, Input, signal, type Signal, type WritableSignal } from '@angular/core';
import { RAIL_HOST } from './RailHostToken';

// #endregion

/**
 * Registers independently declared content with its nearest generic rail coordinator.
 *
 * @public
 */
@Directive({
    selector: '[ngpRailContent]',
    host: {
        '[hidden]': '!isActive()',
    },
})
export class RailContentDirective {
    // #region Fields

    private readonly _railHost = inject(RAIL_HOST);
    private readonly _contentKey: WritableSignal<string> = signal('');

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /**
     * Stable key matched by a declarative rail action.
     *
     * @public
     * @readonly
     */
    @Input({ alias: 'ngpRailContent', required: true })
    public set contentKey(value: string) {
        this._contentKey.set(value);
    }

    public get contentKey(): string {
        return this._contentKey();
    }

    /**
     * Indicates whether this content is selected by the surrounding rail.
     *
     * @protected
     * @readonly
     */
    protected readonly isActive: Signal<boolean> = computed(() => this._railHost.activeContentKey() === this._contentKey());

    // #endregion

    // #region Methods
    // #endregion
}
