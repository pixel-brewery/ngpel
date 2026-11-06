/**
 * Represents a single contextual create action registered by a feature module.
 *
 * @public
 */
export interface IQuickCreateItem {
    /**
     * Stable unique identifier supplied by the contributing feature.
     */
    readonly id: string;

    /**
     * Optional feature-owned navigation item key that exposes this action.
     */
    readonly navigationItemKey?: string;

    /**
     * Display label supplied by the contributing feature.
     */
    readonly label: string;

    /**
     * Optional description used to explain the create action.
     */
    readonly description?: string;

    /**
     * Returns whether the current user is allowed to execute this action.
     * Items where `canExecute()` returns `false` are not exposed in the navigation.
     */
    canExecute(): boolean;

    /**
     * Executes the create action.
     */
    execute(): void | Promise<void>;
}
