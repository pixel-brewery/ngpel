// #region Imports

import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    contentChild,
    input,
    output,
    TemplateRef,
    type InputSignal,
    type OutputEmitterRef,
    type Signal,
} from '@angular/core';
import { DropDownButtonComponent, IconComponent, MenuComponent, MenuItemComponent } from '@pixel-brewery/mosaik-elements-angular';
import type { Variant } from '@pixel-brewery/mosaik-elements-foundation';
import { CollectionListEmptyDirective } from './CollectionListEmptyDirective';
import { CollectionListItemDirective } from './CollectionListItemDirective';
import type { ICollectionListItemContext } from './ICollectionListItemContext';
import type { ICollectionListMenu } from './ICollectionListMenu';
import type { ICollectionListMenuSelection } from './ICollectionListMenuSelection';

// #endregion

/**
 * Renders a collection heading and menus above caller-templated rows in one scrolling region.
 *
 * @typeParam T - Collection item type.
 * @public
 */
@Component({
    selector: 'ngp-collection-list',
    host: { class: 'flex min-h-0 w-full flex-1 flex-col', role: 'region' },
    imports: [DropDownButtonComponent, IconComponent, MenuComponent, MenuItemComponent, NgTemplateOutlet],
    template: `
        <div
            part="header"
            class="flex min-h-13 flex-none min-w-0 items-center justify-between gap-2 px-2 py-2 max-[44rem]:h-auto max-[44rem]:flex-col max-[44rem]:items-start"
        >
            <div part="header-heading" class="flex min-w-0 items-center gap-2">
                @if (headingIcon(); as icon) {
                    <mosaik-icon part="heading-icon" [icon]="icon" [appearance]="'plain'" [variant]="headingIconVariant()" [size]="'small'" />
                }
                <strong part="heading">{{ heading() }}</strong>
            </div>
            @if (menus().length) {
                <div part="menus" class="flex min-w-0 items-center gap-2 max-[44rem]:w-full max-[44rem]:justify-end">
                    @for (menu of menus(); track menu.id) {
                        <mosaik-dropdown-button
                            #menuButton
                            part="menu"
                            [attr.test-id]="menu.testId ?? null"
                            [label]="menu.label"
                            [appearance]="'plain'"
                            [dropDownPlacement]="'bottom-end'"
                        >
                            <mosaik-menu>
                                @for (option of menu.options; track option.id) {
                                    <mosaik-menu-item
                                        part="menu-option"
                                        [attr.test-id]="option.testId ?? null"
                                        [label]="option.label"
                                        [isChecked]="option.checked"
                                        (activated)="onMenuOptionActivated(menu.id, option.id, menuButton)"
                                    />
                                }
                            </mosaik-menu>
                        </mosaik-dropdown-button>
                    }
                </div>
            }
        </div>
        <ng-content />
        @if (itemTemplate(); as rowTemplate) {
            @if (items().length || !emptyTemplate()) {
                <ul part="list" class="m-0 min-h-0 flex-1 list-none overflow-x-hidden overflow-y-auto overscroll-contain p-0" [attr.aria-label]="listLabel()">
                    @for (item of items(); track itemKey()(item)) {
                        <ng-container *ngTemplateOutlet="rowTemplate; context: { $implicit: item, index: $index }" />
                    }
                </ul>
            } @else {
                <ng-container *ngTemplateOutlet="emptyTemplate() ?? null" />
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionListComponent<T> {
    // #region Fields
    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /**
     * Ordered collection items.
     *
     * @public
     * @readonly
     */
    public readonly items: InputSignal<ReadonlyArray<T>> = input.required<ReadonlyArray<T>>();

    /**
     * Resolves the stable key used to track each item.
     *
     * @public
     * @readonly
     */
    public readonly itemKey: InputSignal<(item: T) => number | string> = input.required<(item: T) => number | string>();

    /**
     * Summary heading displayed above the collection.
     *
     * @public
     * @readonly
     */
    public readonly heading: InputSignal<string> = input.required<string>();

    /**
     * Optional resolved Mosaik icon data displayed before the heading.
     *
     * @public
     * @readonly
     */
    public readonly headingIcon: InputSignal<string | undefined> = input<string>();

    /**
     * Visual variant of the optional heading icon.
     *
     * @public
     * @readonly
     */
    public readonly headingIconVariant: InputSignal<Variant> = input<Variant>('neutral');

    /**
     * Menus displayed beside the collection heading.
     *
     * @public
     * @readonly
     */
    public readonly menus: InputSignal<ReadonlyArray<ICollectionListMenu>> = input<ReadonlyArray<ICollectionListMenu>>([]);

    /**
     * Accessible name of the scrolling result list.
     *
     * @public
     * @readonly
     */
    public readonly listLabel: InputSignal<string> = input.required<string>();

    /**
     * Emits the menu and option identifiers activated by the user.
     *
     * @public
     * @readonly
     */
    public readonly menuOptionActivated: OutputEmitterRef<ICollectionListMenuSelection> = output<ICollectionListMenuSelection>();

    /**
     * Caller-provided row template.
     *
     * @protected
     * @readonly
     */
    protected readonly itemTemplate: Signal<TemplateRef<ICollectionListItemContext<T>> | undefined> = contentChild<
        CollectionListItemDirective<T>,
        TemplateRef<ICollectionListItemContext<T>>
    >(CollectionListItemDirective, { read: TemplateRef });

    /**
     * Caller-provided empty-state template.
     *
     * @protected
     * @readonly
     */
    protected readonly emptyTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(CollectionListEmptyDirective, { read: TemplateRef });

    // #endregion

    // #region Methods

    /**
     * Emits one menu selection and closes its dropdown.
     *
     * @param menuId - Identifier of the owning menu.
     * @param optionId - Identifier of the activated option.
     * @param menuButton - Dropdown button that owns the activated option.
     * @protected
     */
    protected onMenuOptionActivated(menuId: string, optionId: string, menuButton: DropDownButtonComponent): void {
        this.menuOptionActivated.emit({ menuId, optionId });
        menuButton.invoke('close');
    }

    // #endregion
}
