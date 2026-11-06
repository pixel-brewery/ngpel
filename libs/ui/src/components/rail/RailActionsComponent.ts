// #region Imports

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimateDirective } from '@pixel-brewery/mosaik-elements-angular';

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
        <div class="flex flex-col gap-2" [mosaikAnimate]="'fadeSlideInRight'" [mosaikAnimateOptions]="{ duration: 240 }">
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
    // #endregion
    // #region Ctor
    // #endregion
    // #region Properties
    // #endregion
    // #region Methods
    // #endregion
}
