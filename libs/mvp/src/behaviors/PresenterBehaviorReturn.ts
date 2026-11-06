/**
 * Result of applying a presenter behavior: the base class constructor intersected with the
 * behavior's own contract, so composed presenters keep every member of every applied behavior.
 *
 * @remarks
 * The rest parameter must stay `any[]` for the same reason as in {@link PresenterBehaviorBase}:
 * TypeScript only accepts a mixin constructor declared that way.
 *
 * @typeParam TBase The constructor type the behavior was applied to.
 * @typeParam TBehavior The contract the behavior adds.
 * @public
 */
export type PresenterBehaviorReturn<TBase, TBehavior = object> = (abstract new (...args: Array<any>) => TBehavior) & TBase;
