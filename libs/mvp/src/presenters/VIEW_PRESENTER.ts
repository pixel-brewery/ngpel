// #region Imports

import { InjectionToken } from '@angular/core';
import type { IViewPresenter } from './IViewPresenter';

// #endregion

/**
 * Token a {@link View} resolves its presenter through. Views provide the concrete presenter in
 * component-level DI, typically via {@link provideViewPresenter}.
 *
 * @remarks
 * The token is compared by identity, so an application must resolve every provider site against
 * this single token; two copies of the package would produce two incompatible tokens.
 *
 * @public
 */
export const VIEW_PRESENTER = new InjectionToken<IViewPresenter>('NGPEL_VIEW_PRESENTER');
