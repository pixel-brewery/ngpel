/**
 * Activated menu option emitted by a collection list.
 *
 * @public
 */
export interface ICollectionListMenuSelection {
    /**
     * Identifier of the owning menu.
     *
     * @public
     * @readonly
     */
    readonly menuId: string;

    /**
     * Identifier of the activated option.
     *
     * @public
     * @readonly
     */
    readonly optionId: string;
}
