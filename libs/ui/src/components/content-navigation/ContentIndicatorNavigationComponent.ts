// #region Imports

import { ChangeDetectionStrategy, Component, computed, inject, input, type InputSignal, type Signal } from '@angular/core';
import { IndicatorComponent, TooltipComponent } from '@pixel-brewery/mosaik-elements-angular';
import { ContentNavigationContext } from './ContentNavigationContext';
import type { IContentNavigationItem } from './IContentNavigationItem';

// #endregion

/**
 * Renders registered content destinations as a compact Mosaik position indicator.
 *
 * @public
 */
@Component({
    selector: 'ngp-content-indicator-navigation',
    imports: [IndicatorComponent, TooltipComponent],
    template: `
        @if (items().length > 0) {
            <nav part="navigation" class="relative inline-flex p-1" [attr.aria-label]="label()">
                <mosaik-indicator
                    part="indicator"
                    class="pointer-events-none"
                    inert
                    aria-hidden="true"
                    [total]="items().length"
                    [selected]="activeIndex()"
                    [orientation]="orientation()"
                />
                <ol
                    part="items"
                    class="absolute inset-0 m-0 flex list-none p-0"
                    [class.flex-col]="orientation() === 'vertical'"
                    [class.flex-row]="orientation() === 'horizontal'"
                >
                    @for (item of items(); track item.id; let index = $index) {
                        <li part="item" class="min-h-0 min-w-0 flex-1">
                            <button
                                part="trigger"
                                class="h-full w-full cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-1"
                                type="button"
                                [id]="tooltipTriggerId(index)"
                                [attr.aria-label]="item.label"
                                [attr.aria-current]="contentNavigation.activeItemId() === item.id ? 'location' : null"
                                [attr.test-id]="resolveItemTestId(item)"
                                (click)="navigate(item.id)"
                            ></button>
                            <mosaik-tooltip [for]="tooltipTriggerId(index)" [content]="item.label" placement="left" />
                        </li>
                    }
                </ol>
            </nav>
        }
    `,
    styles: `
        @use '@pixel-brewery/mosaik-themes/scss' as themes;

        :host {
            @include themes.joy-style();

            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentIndicatorNavigationComponent {
    // #region Fields

    private static _nextId = 0;
    private readonly _tooltipIdPrefix = `ngp-content-indicator-trigger-${ContentIndicatorNavigationComponent._nextId++}`;

    /**
     * Accessible name of the section navigation.
     *
     * @public
     * @readonly
     */
    public readonly label: InputSignal<string> = input.required<string>();

    /**
     * Direction in which registered destinations are displayed.
     *
     * @public
     * @readonly
     */
    public readonly orientation: InputSignal<'horizontal' | 'vertical'> = input<'horizontal' | 'vertical'>('vertical');

    /**
     * Optional domain-specific prefix for interactive destination test identifiers.
     *
     * @public
     * @readonly
     */
    public readonly itemTestIdPrefix: InputSignal<string> = input('');

    /**
     * Content navigation state shared with the registered destinations.
     *
     * @protected
     * @readonly
     */
    protected readonly contentNavigation: ContentNavigationContext = inject(ContentNavigationContext);

    /**
     * Registered destinations in their deterministic display order.
     *
     * @protected
     * @readonly
     */
    protected readonly items: Signal<ReadonlyArray<IContentNavigationItem>> = this.contentNavigation.items;

    /**
     * Zero-based indicator position of the destination represented by the viewport.
     *
     * @protected
     * @readonly
     */
    protected readonly activeIndex: Signal<number> = computed(() => {
        const index = this.items().findIndex((item) => item.id === this.contentNavigation.activeItemId());

        return Math.max(index, 0);
    });

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    // #endregion

    // #region Methods

    /**
     * Navigates to a registered destination through its owning anchor.
     *
     * @param id - Registered destination identifier.
     * @protected
     */
    protected navigate(id: string): void {
        this.contentNavigation.navigate(id);
    }

    /** Returns the ID that pairs a tooltip with its trigger button. */
    protected tooltipTriggerId(index: number): string {
        return `${this._tooltipIdPrefix}-${index}`;
    }

    /**
     * Resolves a consumer-owned automation identifier for one destination.
     *
     * @param item - Registered destination metadata.
     * @returns Stable test identifier or `null` when no prefix was supplied.
     * @protected
     */
    protected resolveItemTestId(item: IContentNavigationItem): string | null {
        const prefix = this.itemTestIdPrefix().trim();

        return prefix.length > 0 ? `${prefix}-${item.id}` : null;
    }

    // #endregion
}
