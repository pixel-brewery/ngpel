/**
 * A page-neutral suggestion for a widget's initial semantic zone. Widgets contribute these
 * descriptors dynamically, so a new contribution can introduce a zone without a central zone
 * inventory. The consuming page owns the localized labels and decides whether or how to render a
 * zone heading.
 *
 * @public
 */
export interface IWidgetZone {
    // #region Properties

    /**
     * The stable free-form identifier used for reconciliation and persistence.
     */
    readonly id: string;

    /**
     * The suggested icon, named in the host's icon vocabulary.
     */
    readonly iconName: string;

    /**
     * The suggested order before the user customizes the layout.
     */
    readonly order: number;

    // #endregion
}
