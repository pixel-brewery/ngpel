import { InjectionToken } from '@angular/core';
import type { IViewItemAction } from './IViewItemAction';

/**
 * Multi-provider token for independent, feature-owned contextual item actions.
 *
 * @public
 */
export const VIEW_ITEM_ACTIONS = new InjectionToken<ReadonlyArray<IViewItemAction>>('VIEW_ITEM_ACTIONS');
