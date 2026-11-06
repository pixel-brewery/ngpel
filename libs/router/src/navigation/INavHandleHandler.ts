// #region Imports

import type { IParsedHandle } from './IParsedHandle';
import type { NavHandleScheme } from './NavHandleScheme';

// #endregion

/**
 * Executes the handles of one {@link NavHandleScheme}. The dispatcher handles `route:` and `ext:`
 * itself; `cmd:` has no built-in handler because the command stack is not a dependency of this
 * package — a product binds its own handler under `NAV_HANDLE_HANDLER`. A registered handler also
 * replaces a built-in scheme, which is how a shell can intercept `route:` navigation.
 *
 * @public
 *
 * @example
 * ```typescript
 * { provide: NAV_HANDLE_HANDLER, multi: true, useFactory: () => {
 *       const commands = inject(CommandRegistry);
 *       return { scheme: 'cmd', execute: (handle) => commands.resolve(handle.path).execute() };
 *   } }
 * ```
 */
export interface INavHandleHandler {
    // #region Properties

    /**
     * The scheme this handler is responsible for.
     */
    readonly scheme: NavHandleScheme;

    // #endregion

    // #region Methods

    /**
     * Executes one parsed handle.
     *
     * @param handle The parsed handle.
     */
    execute(handle: IParsedHandle): void | Promise<void>;

    // #endregion
}
