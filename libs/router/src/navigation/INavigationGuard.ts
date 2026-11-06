// #region Imports

import type { Observable } from 'rxjs';
import type { INavItem } from './INavItem';

// #endregion

/**
 * Decides which navigation items a user may see. Returning the item — possibly a modified copy,
 * for example with filtered children — allows it; returning `null` removes it entirely. Guards run
 * in registration order and each guard receives the previous guard's result, so they compose.
 *
 * @public
 *
 * @example
 * ```typescript
 * @Injectable()
 * export class CapabilityNavigationGuard implements INavigationGuard {
 *     private readonly _permissions = inject(PermissionFacade);
 *
 *     public get stateChanges(): Observable<unknown> {
 *         return this._permissions.changed;
 *     }
 *
 *     public canRegister(nav: INavItem): INavItem | null {
 *         return this._permissions.hasAny(nav.capabilities) ? nav : null;
 *     }
 * }
 * ```
 */
export interface INavigationGuard {
    // #region Properties

    /**
     * Emits whenever the state this guard decides on changes — a sign-in, a sign-out, a permission
     * refresh — so the whole navigation is evaluated again. Guards without user-dependent state
     * omit it.
     */
    readonly stateChanges?: Observable<unknown>;

    // #endregion

    // #region Methods

    /**
     * Decides about one item.
     *
     * @param nav The item as the previous guard left it.
     * @returns The item to register, or `null` to remove it.
     */
    canRegister(nav: INavItem): INavItem | null | Promise<INavItem | null>;

    // #endregion
}
