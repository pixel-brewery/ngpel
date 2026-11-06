/**
 * One dynamically supplied choice of a contextual item action.
 *
 * @public
 */
export interface IViewItemActionChoice {
    readonly id: string;
    readonly label?: string;
    readonly labelKey?: string;
    readonly descriptionKey?: string;
    readonly iconName?: string;
    readonly disabled?: boolean;
    readonly dividerAfter?: boolean;
    readonly testIdSuffix?: string;
}
