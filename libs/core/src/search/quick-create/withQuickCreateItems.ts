// #region Imports

import { createFeature, IFeature } from '@pixel-brewery/ngpel-core';
import { quickCreateKind, type QuickCreateFeatureKind } from './quickCreateKind';
import { QUICK_CREATE_ITEM_TOKEN, QUICK_CREATE_SOURCE_TOKEN } from './quickCreateTokens';
import type { IWithQuickCreateItemsOptions } from './IWithQuickCreateItemsOptions';
import type { IQuickCreateItemSource } from './IQuickCreateItemSource';

// #endregion

/**
 * Declaratively contributes quick-create items and/or dynamic sources.
 *
 * @public
 */
export function withQuickCreateItems(options: IWithQuickCreateItemsOptions): IFeature<QuickCreateFeatureKind> {
    const sourceProviders = (options.sources ?? []).flatMap((cls) => [
        {
            provide: cls,
            useClass: cls,
        },
        {
            provide: QUICK_CREATE_SOURCE_TOKEN,
            deps: [cls],
            useFactory: (instance: IQuickCreateItemSource): IQuickCreateItemSource => instance,
            multi: true,
        },
    ]);

    const itemProviders = options.items
        ? [
              {
                  provide: QUICK_CREATE_ITEM_TOKEN,
                  useValue: options.items,
                  multi: true,
              },
          ]
        : [];

    return createFeature(options.id, quickCreateKind, [...itemProviders, ...sourceProviders], { multi: true });
}
