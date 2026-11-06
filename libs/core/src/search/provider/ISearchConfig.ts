/**
 * Behavioural options of the search engine, published through `SEARCH_CONFIG`.
 *
 * @public
 */
export interface ISearchConfig {
    // #region Properties

    /**
     * Keyboard gesture that opens the search surface, written as `'<modifier>+...+<key>'` — for
     * example `'meta+k'`, `'ctrl+k'` or `'/'`. Case-insensitive. When omitted, no global key
     * listener is installed at all.
     */
    readonly hotkey?: string;

    /**
     * Debounce delay in milliseconds a surface should apply to its input before querying.
     *
     * @defaultValue `150`
     */
    readonly delay?: number;

    /**
     * Maximum number of command suggestions shown before the semantic results.
     *
     * @defaultValue `6`
     */
    readonly maxCommandSuggestions?: number;

    /**
     * Maximum number of results requested from each active provider.
     *
     * @defaultValue `20`
     */
    readonly resultTake?: number;

    /**
     * Orders result sections by the registration order of the provider that produced their first
     * result. The default follows the order in which groups first appear among ranked results.
     */
    readonly resultGroupOrder?: 'ranked' | 'provider';

    /**
     * Whether the session emits the command section. When `false`, commands are suppressed even
     * though command features are registered.
     *
     * @defaultValue `true`
     */
    readonly showCommands?: boolean;

    /**
     * Translation key emitted as `ISearchSection.labelKey` for the command section. Left empty the
     * section carries no label and the surface supplies its own wording; the package deliberately
     * ships no translation keys of its own.
     */
    readonly commandSectionLabelKey?: string;

    // #endregion
}
