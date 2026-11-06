// #region Imports

import { CdkDrag } from '@angular/cdk/drag-drop';
import { Directive, inject } from '@angular/core';

// #endregion

/**
 * Applies the shared widget-grid drag-preview configuration to an Angular CDK drag source.
 *
 * @public
 */
@Directive({
    selector: '[ngpWidgetGridDrag]',
    host: {
        class: 'widget-grid-drag-source',
    },
})
export class WidgetGridDragDirective {
    // #region Fields

    private readonly _drag = inject(CdkDrag, { self: true });

    // #endregion

    // #region Ctor

    /** Keeps every grid ghost in the global overlay and under one stable styling hook. */
    public constructor() {
        this._drag.previewContainer = 'global';
        this._drag.previewClass = 'widget-grid-drag-preview-host';
    }

    // #endregion
}
