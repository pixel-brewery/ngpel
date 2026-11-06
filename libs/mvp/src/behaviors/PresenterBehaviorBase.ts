// #region Imports

import type { ViewPresenter } from '../presenters/ViewPresenter';

// #endregion

/**
 * Constraint every presenter behavior places on the class it is applied to: an abstract constructor
 * producing a {@link ViewPresenter}.
 *
 * @remarks
 * TypeScript accepts a class expression extending a generic base only when that base is declared
 * with a single rest parameter of type `any[]` (TS2545), so the parameter list cannot be narrowed.
 * Behaviors never read these arguments; they only forward them to the base constructor.
 *
 * @public
 */
export type PresenterBehaviorBase = abstract new (...args: Array<any>) => ViewPresenter;
