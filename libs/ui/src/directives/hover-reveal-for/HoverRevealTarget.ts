// #region Imports

import type { ElementRef } from '@angular/core';
import type { IHasElementRef } from './IHasElementRef';

// #endregion

/**
 * Union of every value the hover-reveal directive can observe: an Angular `ElementRef`, a raw
 * `HTMLElement`, a component exposing an `elementRef`, or `null` to detach.
 *
 * @public
 */
export type HoverRevealTarget = ElementRef<HTMLElement> | HTMLElement | IHasElementRef | null;
