/**
 * Identifies a marked element in a focus target host.
 *
 * @public
 */
export interface IFocusTargetMarker {
    /** Attribute whose value identifies the target. */
    readonly attribute: string;
    /** Value the attribute must match. */
    readonly key: string;
}
