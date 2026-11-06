// #region Imports

import { Directive, TemplateRef, inject } from '@angular/core';
import type { IWidgetGridItemTemplateContext } from './IWidgetGridItemTemplateContext';

// #endregion

/**
 * Marks the template used to render one concrete widget inside a widget grid.
 *
 * @public
 */
@Directive({
    selector: 'ng-template[ngpWidgetGridItem]',
})
export class WidgetGridItemTemplate {
    // #region Fields

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    /** Template supplied by the owning feature. */
    public readonly template: TemplateRef<IWidgetGridItemTemplateContext> = inject(TemplateRef);

    // #endregion

    // #region Methods

    // #endregion
}
