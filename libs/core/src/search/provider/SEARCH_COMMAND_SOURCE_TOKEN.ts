// #region Imports

import { InjectionToken } from '@angular/core';
import type { ICommandSource } from '../models/ICommandSource';

// #endregion

/**
 * Multi-provider token for dynamic command sources. Every registered source class contributes one
 * batch, so the injected value is a list of batches which the manager flattens.
 *
 * @public
 */
export const SEARCH_COMMAND_SOURCE_TOKEN = new InjectionToken<ReadonlyArray<ReadonlyArray<ICommandSource>>>('NGPEL_SEARCH_COMMAND_SOURCES');
