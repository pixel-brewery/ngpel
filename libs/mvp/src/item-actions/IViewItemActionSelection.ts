/**
 * Identifies the current view item and its selected contextual action.
 *
 * @public
 */
export interface IViewItemActionSelection {
    readonly resourceId: string;
    readonly actionId: string;
    readonly choiceId?: string;
}
