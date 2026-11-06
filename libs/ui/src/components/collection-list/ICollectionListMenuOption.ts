/**
 * Selectable option shown in a collection-list menu.
 *
 * @public
 */
export interface ICollectionListMenuOption {
    /**
     * Stable option identifier.
     *
     * @public
     * @readonly
     */
    readonly id: string;

    /**
     * Visible option label.
     *
     * @public
     * @readonly
     */
    readonly label: string;

    /**
     * Indicates whether the option is selected.
     *
     * @public
     * @readonly
     */
    readonly checked: boolean;

    /**
     * Optional stable test identifier.
     *
     * @public
     * @readonly
     */
    readonly testId?: string;
}
