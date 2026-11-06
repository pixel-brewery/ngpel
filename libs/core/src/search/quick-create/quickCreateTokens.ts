// #region Imports

import { InjectionToken } from '@angular/core';
import type { IQuickCreateItem } from './IQuickCreateItem';
import type { IQuickCreateItemSource } from './IQuickCreateItemSource';

// #endregion

/**
 * Multi-provider token for static quick-create items contributed by feature modules.
 *
 * @internal
 */
export const QUICK_CREATE_ITEM_TOKEN: InjectionToken<ReadonlyArray<IQuickCreateItem>> = new InjectionToken<ReadonlyArray<IQuickCreateItem>>(
    'QUICK_CREATE_ITEM_TOKEN',
);

/**
 * Multi-provider token for dynamic quick-create item sources.
 * Sources are resolved lazily to allow async translations to load.
 *
 * @internal
 */
export const QUICK_CREATE_SOURCE_TOKEN: InjectionToken<IQuickCreateItemSource> = new InjectionToken<IQuickCreateItemSource>('QUICK_CREATE_SOURCE_TOKEN');
