// #region Imports

import { Directive, inject, TemplateRef } from '@angular/core';
import type { GoogleMap } from '@angular/google-maps';

// #endregion

/**
 * Defers Angular map overlays until the SDK and their owning GoogleMap exist.
 *
 * @public
 */
@Directive({ selector: 'ng-template[ngpMapContent]' })
export class MapContentDirective {
    // #region Fields

    /**
     * Overlay template with the Angular GoogleMap as its implicit context.
     *
     * @public
     * @readonly
     */
    public readonly template = inject<TemplateRef<{ $implicit: GoogleMap }>>(TemplateRef);

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties
    // #endregion

    // #region Methods

    /**
     * Supplies the typed map context to consuming Angular templates.
     *
     * @param directive - Content declaration.
     * @param context - Context checked by Angular's template compiler.
     * @returns Whether the context is the map-content contract.
     * @public
     */
    public static ngTemplateContextGuard(directive: MapContentDirective, context: unknown): context is { $implicit: GoogleMap } {
        return true;
    }

    // #endregion
}
