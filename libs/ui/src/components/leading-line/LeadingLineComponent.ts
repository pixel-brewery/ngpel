// #region Imports

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

// #endregion

/**
 * Primary shades applied from the first nested level onward, lightening with every deeper level.
 */
const LEADING_LINE_SHADES = ['var(--mosaik-color-primary-500)', 'var(--mosaik-color-primary-300)', 'var(--mosaik-color-primary-200)'] as const;

/**
 * Marks nested content with a narrow vertical line instead of a frame.
 *
 * The line owns how nesting depth is expressed in color. Consumers only supply the level, so the gradation
 * can change here without touching the components that render nested levels.
 *
 * @public
 */
@Component({
    selector: 'ngp-leading-line',
    template: '<div part="line" class="h-full w-full rounded-(--mosaik-layout-radius)" [style.background-color]="color()" aria-hidden="true"></div>',
    styles: `
        :host {
            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'block w-0.5 shrink-0 self-stretch',
    },
})
export class LeadingLineComponent {
    // #region Properties

    /**
     * Nesting level of the marked content, where the first nested level is `2`.
     *
     * @public
     * @readonly
     */
    public readonly level = input.required<number>();

    /**
     * Color of the line resolved from the nesting level.
     *
     * @protected
     * @readonly
     */
    protected readonly color = computed(() => LeadingLineComponent.resolveColor(this.level()));

    // #endregion

    // #region Methods

    /**
     * Resolves the shade of a nesting level; levels beyond the palette keep its last shade so the line never fades out.
     *
     * @param level - Nesting level of the marked content.
     * @returns A Mosaik color token expression.
     * @private
     * @static
     */
    private static resolveColor(level: number): string {
        const shadeIndex = Math.min(Math.max(level - 2, 0), LEADING_LINE_SHADES.length - 1);

        return LEADING_LINE_SHADES[shadeIndex] ?? LEADING_LINE_SHADES[0];
    }

    // #endregion
}
