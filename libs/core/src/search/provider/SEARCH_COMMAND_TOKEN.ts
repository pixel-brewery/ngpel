// #region Imports

import { InjectionToken } from '@angular/core';
import type { ICommandItem } from '../models/ICommandItem';

// #endregion

/**
 * Multi-provider token for statically contributed command items. Every `withSearchCommands()`
 * feature contributes one batch — the commands of one feature — so the injected value is a list of
 * batches which the manager flattens.
 *
 * @public
 */
export const SEARCH_COMMAND_TOKEN = new InjectionToken<ReadonlyArray<ReadonlyArray<ICommandItem>>>('NGPEL_SEARCH_COMMANDS');
