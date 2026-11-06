/** Localized labels used by a whole-field suggestion list. @public */
export interface ITextSuggestionMessages {
    /** Accessible name of the listbox. */
    readonly label: string;

    /** Status shown during debounce and source lookup. */
    readonly loading: string;

    /** Status shown when the source returns no results. */
    readonly empty: string;

    /** Status shown when the source fails. */
    readonly error: string;
}
