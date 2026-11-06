// #region Imports

import type { NavHandle } from './NavHandle';

// #endregion

/**
 * One entry of the application navigation, contributed as plain data so any host — a sidebar, a
 * command palette, a mobile dock — can render the same registry. An item carries what to show
 * (`label`, `icon`, `badge`, `variant`), where it belongs (`region`, `parent`, `children`,
 * `order`), who may see it (`capabilities`) and what activating it does ({@link NavHandle}).
 *
 * @public
 */
export interface INavItem {
    // #region Properties

    /**
     * The unique key of the item. Two contributions sharing a key are merged into one item, which
     * is how several feature libraries fill one shared group.
     */
    readonly key: string;

    /**
     * The label of the item; a plain text or a translation key the host resolves.
     */
    readonly label: string;

    /**
     * The icon of the item, named in the host's icon vocabulary.
     */
    readonly icon?: string;

    /**
     * What activating the item does. An item without a handle is a pure group.
     */
    readonly handle?: NavHandle;

    /**
     * The capabilities that make the item visible. An absent or empty list means unrestricted;
     * a non-empty list is OR-linked — one held capability is enough. Enforcement is a product
     * policy and belongs in an `INavigationGuard`.
     */
    readonly capabilities?: ReadonlyArray<string>;

    /**
     * The parent of the item, as a key or as the item itself.
     */
    readonly parent?: INavItem | string;

    /**
     * The children of the item, declared inline.
     */
    readonly children?: ReadonlyArray<Omit<INavItem, 'parent'>>;

    /**
     * Free-form data for the host, for example a tooltip or an analytics id.
     */
    readonly data?: Readonly<Record<string, unknown>>;

    /**
     * The sort order within its region or parent; ascending, defaults to `0`.
     */
    readonly order?: number;

    /**
     * The area of the shell the item belongs to, for example `'main'` or `'profile'`.
     */
    readonly region?: string;

    /**
     * A badge rendered next to the label, for example an unread count.
     */
    readonly badge?: string | number;

    /**
     * A visual variant named in the host's design vocabulary, for example `'accent'`.
     */
    readonly variant?: string;

    // #endregion
}
