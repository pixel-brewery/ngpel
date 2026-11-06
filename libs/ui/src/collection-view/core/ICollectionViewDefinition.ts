/**
 * Describes a view option that can be activated for a collection surface.
 *
 * @public
 */
export interface ICollectionViewDefinition<TView extends string> {
    /**
     * Stable view type key.
     */
    readonly type: TView;

    /**
     * Optional display label used by feature-specific toggles.
     */
    readonly label?: string;

    /**
     * Optional icon name used by feature-specific toggles.
     */
    readonly iconName?: string;
}
