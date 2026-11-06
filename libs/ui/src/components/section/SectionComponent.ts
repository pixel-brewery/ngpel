// #region Imports

import { ChangeDetectionStrategy, Component } from '@angular/core';

// #endregion

/**
 * Groups a section header and its projected content while consumers configure the host as the section boundary.
 *
 * @public
 */
@Component({
    selector: 'ngp-section',
    template: '<ng-content />',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'contents',
    },
})
export class SectionComponent {}
