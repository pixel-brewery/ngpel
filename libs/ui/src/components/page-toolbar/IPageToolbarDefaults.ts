import type { Appearance } from '@pixel-brewery/mosaik-elements-foundation';

/**
 * Application defaults for the page toolbar. Label getters can read translation signals.
 *
 * @public
 */
export interface IPageToolbarDefaults {
    /** Optional short label for the primary start button in compact mode. */
    readonly compactPrimaryLabel?: string | (() => string);
    /** Accessible label of the menu for overflow actions. */
    readonly moreActionsLabel?: string | (() => string);
    /** Registered icon name of the overflow button. */
    readonly moreActionsIconName?: string;
    /** Appearance of the overflow button. */
    readonly moreActionsAppearance?: Appearance;
    /** Shows the overflow button label in a tooltip instead of on the button. */
    readonly moreActionsIconOnly?: boolean;
}
