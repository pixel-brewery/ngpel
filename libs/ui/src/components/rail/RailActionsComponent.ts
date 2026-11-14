// #region Imports

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnimateDirective } from '@pixel-brewery/mosaik-elements-angular';
import { RAIL_HOST } from './RailHostToken';

// #endregion

/**
 * Groups the compact actions displayed in a rail's initial state.
 *
 * @public
 */
@Component({
    selector: 'ngp-rail-actions',
    imports: [AnimateDirective],
    template: `
        <div
            class="flex gap-2"
            [class.flex-col]="!floatingActions()"
            [class.flex-row-reverse]="floatingActions()"
            [class.items-center]="floatingActions()"
            [mosaikAnimate]="'fadeSlideInRight'"
            [mosaikAnimateOptions]="{ duration: 240 }"
        >
            <ng-content />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'block',
    },
})
export class RailActionsComponent {
    // #region Fields

    private readonly _railHost = inject(RAIL_HOST, { optional: true });
    protected readonly floatingActions = this._railHost?.usesFloatingActions ?? (() => false);

    // #endregion
    // #region Ctor
    // #endregion
    // #region Properties
    // #endregion
    // #region Methods
    // #endregion
}
