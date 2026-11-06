// #region Imports

import { ChangeDetectionStrategy, Component, input, type InputSignal } from '@angular/core';
import { DividerComponent, MenuItemGroupComponent } from '@pixel-brewery/mosaik-elements-angular';

// #endregion

/**
 * Wraps a Mosaik navigation menu group.
 *
 * The compact state replaces the visual group heading with an equally high
 * divider so navigation items retain their vertical position.
 *
 * @public
 */
@Component({
    selector: 'ngp-navigation-menu-group',
    host: {
        class: 'mt-4 block w-full first:mt-2',
    },
    imports: [DividerComponent, MenuItemGroupComponent],
    template: `
        <mosaik-menu-item-group part="group" [attr.test-id]="testId()" [header]="compact() ? '' : label()" [orientation]="'vertical'">
            @if (compact()) {
                <div slot="header" class="flex h-[34px] items-center px-2">
                    <mosaik-divider class="w-full" [attr.aria-label]="label()" />
                </div>
            }

            <ng-content />
        </mosaik-menu-item-group>
    `,
    styles: `
        :host {
            min-width: 0;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenuGroupComponent {
    // #region Properties

    /**
     * Whether the visual group heading is replaced by a divider.
     *
     * @public
     * @readonly
     */
    public readonly compact: InputSignal<boolean> = input<boolean>(false);

    /**
     * Visible group label.
     *
     * @public
     * @readonly
     */
    public readonly label: InputSignal<string> = input.required<string>();

    /**
     * Stable test identifier for the group.
     *
     * @public
     * @readonly
     */
    public readonly testId: InputSignal<string> = input.required<string>();

    // #endregion
}
