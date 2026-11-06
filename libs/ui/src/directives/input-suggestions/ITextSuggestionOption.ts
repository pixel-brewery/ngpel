/** A selectable result supplied by an application-owned suggestion source. @public */
export interface ITextSuggestionOption {
    /** Stable, unique identifier of the result. */
    readonly id: string;

    /** Text shown as the primary option label. */
    readonly label: string;

    /** Optional context displayed below the label. */
    readonly description?: string;

    /** Optional Mosaik icon registry name. */
    readonly icon?: string;
}
