/**
 * Field-level change rendered by the audit log component.
 *
 * @public
 */
export interface IAuditLogChange {
    /**
     * Changed field key.
     *
     * @public
     * @readonly
     */
    readonly field: string;

    /**
     * Value before the mutation.
     *
     * @public
     * @readonly
     */
    readonly before?: unknown;

    /**
     * Value after the mutation.
     *
     * @public
     * @readonly
     */
    readonly after?: unknown;
}

/**
 * Named set of field changes rendered as one audit comparison card.
 *
 * @public
 */
export interface IAuditLogChangeGroup {
    /**
     * Card label.
     *
     * @public
     * @readonly
     */
    readonly label: string;

    /**
     * Field changes rendered inside the card.
     *
     * @public
     * @readonly
     */
    readonly changes: ReadonlyArray<IAuditLogChange>;
}
