/**
 * Address of one contextual overlay. Omitting the identifier selects the target's create mode.
 *
 * @public
 */
export interface IContextOverlayState {
    /** Registered target key. */
    readonly key: string;
    /** Identifier of an existing resource. */
    readonly id?: string;
    /** Optional addressable context interpreted by the target. */
    readonly context?: string;
}
