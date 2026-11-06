/**
 * Options of the element renderer created by `createMarkedRenderer`.
 *
 * @public
 */
export interface IMarkdownRendererOptions {
    // #region Properties

    /**
     * Whether the emitted text elements wrap their content.
     */
    readonly wrapText: boolean;

    /**
     * The variant applied to links, checkboxes and listings.
     */
    readonly variant: string;

    /**
     * The appearance applied to links.
     */
    readonly appearance: string;

    // #endregion
}
