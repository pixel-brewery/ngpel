// #region Imports

import type { Provider } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import type { ICommandSource } from '../models/ICommandSource';
import type { IWithSearchCommandsOptions } from './IWithSearchCommandsOptions';
import { SEARCH_COMMAND_SOURCE_TOKEN } from './SEARCH_COMMAND_SOURCE_TOKEN';
import { SEARCH_COMMAND_TOKEN } from './SEARCH_COMMAND_TOKEN';
import type { SearchFeatureKind } from './SearchFeatureKind';
import { SearchKinds } from './SearchKinds';

// #endregion

/**
 * Declaratively contributes palette commands to `provideSearch()`. The feature is multi-capable:
 * every contributing feature composes one `withSearchCommands()` call.
 *
 * @public
 * @param options The contribution: a stable id plus static commands and/or source classes.
 * @returns The feature to pass to `provideSearch()`.
 *
 * @example
 * ```typescript
 * provideSearch({ hotkey: 'meta+k' }, withSearchCommands({ id: 'settings', sources: [SettingsCommandSource] }));
 * ```
 */
export function withSearchCommands(options: IWithSearchCommandsOptions): IFeature<SearchFeatureKind> {
    const commandProviders: ReadonlyArray<Provider> =
        options.commands === undefined ? [] : [{ provide: SEARCH_COMMAND_TOKEN, useValue: options.commands, multi: true }];

    const sourceProviders: ReadonlyArray<Provider> = (options.sources ?? []).flatMap((source): ReadonlyArray<Provider> => [
        { provide: source, useClass: source },
        {
            provide: SEARCH_COMMAND_SOURCE_TOKEN,
            useFactory: (instance: ICommandSource): ReadonlyArray<ICommandSource> => [instance],
            deps: [source],
            multi: true,
        },
    ]);

    return createFeature(options.id, SearchKinds.Commands, [...commandProviders, ...sourceProviders], { multi: true });
}
