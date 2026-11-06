/**
 * One identity-bearing resource currently offered by an active view.
 *
 * @public
 */
export interface IViewMentionOption {
    // #region Properties

    /**
     * Application-owned resource type used to resolve a mention.
     */
    readonly resourceType: string;

    /**
     * Stable identifier of the resource within its type.
     */
    readonly resourceId: string;

    /**
     * Display label used for filtering mention suggestions.
     */
    readonly label: string;

    /**
     * Icon name chosen by the resource owner.
     */
    readonly icon: string;

    /**
     * Localization key describing the resource.
     */
    readonly descriptionKey: string;

    // #endregion
}
