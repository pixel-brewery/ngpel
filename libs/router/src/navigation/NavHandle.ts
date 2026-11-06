/**
 * A navigation handle: what activating a navigation item does, encoded as `<scheme>:<value>`.
 * Keeping the action in a string instead of a callback is what lets navigation items be plain,
 * serializable data that any host can render.
 *
 * @public
 *
 * @example
 * ```typescript
 * const handles: ReadonlyArray<NavHandle> = [
 *     'route:/main/users?page=2',
 *     'cmd:dialog.open.settings',
 *     'ext:https://example.test/docs'
 * ];
 * ```
 */
export type NavHandle = `route:${string}` | `cmd:${string}` | `ext:${string}`;
