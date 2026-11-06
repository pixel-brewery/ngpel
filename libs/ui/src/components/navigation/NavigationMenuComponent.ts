// #region Imports

import { ChangeDetectionStrategy, Component, input, type InputSignal } from '@angular/core';
import { MenuComponent } from '@pixel-brewery/mosaik-elements-angular';

// #endregion

/**
 * Wraps the Mosaik menu used by an application navigation surface.
 *
 * @public
 */
@Component({
    selector: 'ngp-navigation-menu',
    imports: [MenuComponent],
    template: `
        <mosaik-menu part="menu" class="w-full p-2">
            <ng-content />
        </mosaik-menu>
    `,
    styles: `
        :host {
            display: block;
            width: 100%;
        }

        mosaik-menu {
            --menu-background-color: var(--mosaik-scheme-transparent);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenuComponent {
    // #region Properties

    /**
     * Whether the menu is displayed as an icon-only rail.
     *
     * @public
     * @readonly
     */
    public readonly compact: InputSignal<boolean> = input<boolean>(false);

    // #endregion
}
