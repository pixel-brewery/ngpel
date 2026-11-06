// #region Imports

import { ChangeDetectionStrategy, Component, input, type InputSignal } from '@angular/core';
import { TextComponent, TypographyDirective } from '@pixel-brewery/mosaik-elements-angular';

// #endregion

/**
 * Displays a section heading with its explanatory description.
 *
 * @public
 */
@Component({
    selector: 'ngp-section-header',
    imports: [TextComponent, TypographyDirective],
    template: `
        <div class="flex flex-col">
            <mosaik-text [text]="header()" [wrap]="true" [mosaikTypography]="'subtitle2'" [disabled]="disabled()" />
            <mosaik-text [text]="description()" [mosaikTypography]="'body2'" [wrap]="true" [readonly]="true" [disabled]="disabled()" />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'block',
    },
})
export class SectionHeaderComponent {
    // #region Properties

    /**
     * Primary section heading.
     *
     * @public
     * @readonly
     */
    public readonly header: InputSignal<string> = input.required<string>();

    /**
     * Explanatory text displayed below the heading.
     *
     * @public
     * @readonly
     */
    public readonly description: InputSignal<string> = input.required<string>();

    /**
     * Whether the heading is displayed as disabled.
     *
     * @public
     * @readonly
     */
    public readonly disabled: InputSignal<boolean> = input<boolean>(false);

    // #endregion
}
