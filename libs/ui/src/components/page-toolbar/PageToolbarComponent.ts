// #region Imports

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ToolbarComponent } from '@pixel-brewery/mosaik-elements-angular';

// #endregion

/**
 * Hosts a plain Mosaik toolbar between two page-wide separator lines.
 *
 * @public
 */
@Component({
    selector: 'ngp-page-toolbar',
    imports: [ToolbarComponent],
    template: `
        <div part="root" class="border-y border-(--mosaik-scheme-highlight)">
            <mosaik-toolbar part="toolbar" role="toolbar" [attr.aria-label]="ariaLabel()" [appearance]="'plain'" [fit]="'width'">
                <ng-content />
            </mosaik-toolbar>
        </div>
    `,
    styles: `
        :host {
            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'block min-w-0',
        slot: 'preContent',
    },
})
export class PageToolbarComponent {
    // #region Fields
    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /**
     * Accessible name that describes the actions offered by the toolbar.
     *
     * @public
     * @readonly
     */
    public readonly ariaLabel = input.required<string>();

    // #endregion

    // #region Methods
    // #endregion
}
