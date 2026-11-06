/**
 * A single executable action offered by the command palette. Features contribute command items
 * either statically through `withSearchCommands({ commands })` or dynamically through a command
 * source, and the surface renders them without knowing the feature that owns them.
 *
 * @public
 */
export interface ICommandItem {
    // #region Properties

    /**
     * Stable identifier of the command. Duplicates are collapsed to the first occurrence.
     */
    readonly id: string;

    /**
     * Display label. Keep it short — it is the primary line of the palette row and the strongest
     * ranking signal.
     */
    readonly label: string;

    /**
     * Optional description shown as help text and matched with a lower weight than the label.
     */
    readonly description?: string;

    /**
     * Optional icon name. The surface decides which icon set the name is resolved against.
     */
    readonly icon?: string;

    /**
     * Optional category heading used for visual grouping.
     */
    readonly group?: string;

    /**
     * Optional synonyms that make the command findable under wording it does not display.
     */
    readonly keywords?: ReadonlyArray<string>;

    /**
     * Optional keyboard shortcut hint. Purely visual — the palette does not bind it.
     */
    readonly shortcutHint?: string;

    // #endregion

    // #region Methods

    /**
     * Executes the command. The surface awaits the return value, so a promise delays the
     * selection until the action settled; any returned value is for diagnostics only.
     */
    execute(): unknown;

    // #endregion
}
