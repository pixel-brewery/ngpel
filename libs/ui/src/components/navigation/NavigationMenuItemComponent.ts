// #region Imports

import { ChangeDetectionStrategy, Component, ElementRef, inject, input, type InputSignal } from '@angular/core';
import { IconNameDirective, MenuItemComponent, TooltipDirective } from '@pixel-brewery/mosaik-elements-angular';
import type { INavItem } from '@pixel-brewery/ngpel-router/navigation';
import { NavDirective } from '../../directives/nav/NavDirective';

// #endregion

/**
 * Application navigation item backed by a Mosaik menu item.
 *
 * The compact state removes only the visual label. The accessible name remains
 * attached to the interactive Mosaik element and is also exposed as a tooltip.
 *
 * @public
 */
@Component({
    selector: 'ngp-navigation-menu-item',
    imports: [MenuItemComponent, NavDirective, TooltipDirective, IconNameDirective],
    template: `
        <div part="root" class="w-full" role="none">
            <mosaik-menu-item
                force-close="true"
                [attr.test-id]="item().key"
                [ngpNav]="item()"
                [label]="compact() ? '' : label()"
                [attr.aria-label]="label()"
                [menuMode]="menuMode()"
                [mosaikTooltip]="compact() ? label() : ''"
                [mosaikTooltipDisabled]="!compact()"
                [mosaikTooltipPlacement]="'right'"
                [iconName]="item().icon"
            >
                <span slot="end" class="flex min-w-0 items-center" [class.hidden]="compact()">
                    <ng-content select="[ngpNavigationItemEnd]" />
                </span>
                @if (compact()) {
                    <span slot="label" class="sr-only">{{ label() }}</span>
                } @else {
                    <ng-content />
                }
            </mosaik-menu-item>
        </div>
    `,
    styles: `
        :host {
            display: block;
            width: 100%;
            min-width: 0;
        }

        mosaik-menu-item {
            &:not([is-active]) {
                --menu-item-background-color: var(--mosaik-scheme-transparent);
            }

            &[is-active] {
                --menu-item-foreground-color: var(--mosaik-color-primary-500);

                mosaik-icon {
                    // --icon-background-color: var(--mosaik-color-primary-600);
                    // --icon-border-color: var(--mosaik-color-primary-700);
                    --icon-foreground-color: var(--mosaik-color-primary-500);
                }
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenuItemComponent {
    // #region Fields

    private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    // #endregion

    // #region Properties

    /**
     * Element reference used by contextual hover actions.
     *
     * @public
     * @readonly
     */
    public get elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /**
     * Whether the item is displayed without a visual label.
     *
     * @public
     * @readonly
     */
    public readonly compact: InputSignal<boolean> = input<boolean>(false);

    /**
     * Navigation item executed by the underlying navigation directive.
     *
     * @public
     * @readonly
     */
    public readonly item: InputSignal<INavItem> = input.required<INavItem>();

    /**
     * Already translated visual and accessible label.
     *
     * @public
     * @readonly
     */
    public readonly label: InputSignal<string> = input.required<string>();

    /**
     * Enables Mosaik's inline submenu behavior for expanded parent items.
     *
     * @public
     * @readonly
     */
    public readonly menuMode: InputSignal<'inline' | undefined> = input<'inline'>();

    // #endregion
}
