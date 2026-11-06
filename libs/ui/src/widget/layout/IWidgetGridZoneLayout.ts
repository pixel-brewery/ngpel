/**
 * The persisted ordering of one widget-grid zone.
 *
 * @public
 */
export interface IWidgetGridZoneLayout {
    // #region Properties

    /**
     * The id of the zone this entry orders.
     */
    readonly zoneId: string;

    /**
     * The zero-based position of the zone. Reconciliation normalizes it, so the positions of the
     * known zones are always a gap-free sequence.
     */
    readonly order: number;

    // #endregion
}
