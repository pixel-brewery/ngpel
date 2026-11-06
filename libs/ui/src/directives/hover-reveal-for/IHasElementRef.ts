// #region Imports

import type { ElementRef } from '@angular/core';

// #endregion

/**
 * Represents any object that exposes a native element reference, which lets the hover-reveal
 * directive accept Angular components that inject and expose their `ElementRef`.
 *
 * @public
 */
export interface IHasElementRef {
    /**
     * The element reference of the object.
     *
     * @public
     */
    readonly elementRef: ElementRef<HTMLElement>;
}
