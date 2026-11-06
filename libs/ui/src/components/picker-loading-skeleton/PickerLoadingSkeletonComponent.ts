// #region Imports

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonComponent } from '@pixel-brewery/mosaik-elements-angular';

// #endregion

/**
 * Shared layout-preserving loading state for picker result lists.
 *
 * @public
 */
@Component({
    selector: 'ngp-picker-loading-skeleton',
    template: `
        <div class="flex flex-col gap-3 p-4" aria-busy="true" data-picker-loading-skeleton>
            <mosaik-skeleton [height]="'72px'" [width]="'100%'" [shimmer]="true" />
            <mosaik-skeleton [height]="'72px'" [width]="'100%'" [shimmer]="true" />
            <mosaik-skeleton [height]="'72px'" [width]="'100%'" [shimmer]="true" />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'block',
    },
    imports: [SkeletonComponent],
})
export class PickerLoadingSkeletonComponent {
    // #region Fields
    // #endregion
    // #region Ctor
    // #endregion
    // #region Properties
    // #endregion
    // #region Methods
    // #endregion
}
