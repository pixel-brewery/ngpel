// #region Imports

import { ChangeDetectionStrategy, Component } from '@angular/core';

// #endregion

/**
 * Projects the content that belongs to a section without adding a layout box.
 *
 * @public
 */
@Component({
    selector: 'ngp-section-content',
    template: '<ng-content />',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'contents',
    },
})
export class SectionContentComponent {}
