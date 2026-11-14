// #region Imports

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, input, type InputSignal } from '@angular/core';
import { ScrollComponent } from '@pixel-brewery/mosaik-elements-angular';

// #endregion

/**
 * Provides the layout shell for an application navigation surface.
 *
 * Consumers project the brand, primary navigation, and footer controls into
 * dedicated content areas while retaining ownership of application state.
 *
 * @public
 */
@Component({
    selector: 'ngp-navigation',
    imports: [NgTemplateOutlet, ScrollComponent],
    template: `
        <section
            part="root"
            class="relative isolate flex h-full min-h-0 w-full min-w-0 flex-col"
            [attr.data-navigation-mode]="compact() ? 'compact' : 'expanded'"
        >
            <div
                part="backplate"
                aria-hidden="true"
                class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[65%] bg-[radial-gradient(ellipse_90%_60%_at_12%_105%,var(--mosaik-color-primary-500)_0%,transparent_70%),radial-gradient(ellipse_55%_42%_at_100%_32%,var(--mosaik-color-primary-700)_0%,transparent_68%)] opacity-[0.08]"
            ></div>

            <header
                part="brand"
                class="sticky top-0 z-10 box-border flex h-[64px] shrink-0 items-center pt-3 pb-1"
                [class.justify-center]="compact()"
                [class.justify-start]="!compact()"
                [class.px-2]="compact()"
                [class.px-4]="!compact()"
            >
                <ng-content select="[ngpNavigationBrand]" />
            </header>

            <nav
                part="content"
                class="min-h-0 flex-1 overflow-x-hidden"
                [class.overflow-y-auto]="!showScrollControls()"
                [class.overflow-y-hidden]="showScrollControls()"
                [attr.aria-label]="ariaLabel()"
            >
                <ng-template #content><ng-content select="[ngpNavigationContent]" /></ng-template>
                @if (showScrollControls()) {
                    <mosaik-scroll part="scroller" class="h-full min-h-0 w-full" [orientation]="'vertical'" [showScrollButtons]="true" [showScrollbar]="true">
                        <ng-container [ngTemplateOutlet]="content" />
                    </mosaik-scroll>
                } @else {
                    <ng-container [ngTemplateOutlet]="content" />
                }
            </nav>

            <footer part="footer" class="shrink-0">
                <ng-content select="[ngpNavigationFooter]" />
            </footer>
        </section>
    `,
    styles: `
        :host {
            display: block;
            width: 100%;
            height: 100%;
            min-width: 0;
            min-height: 0;
        }

        nav {
            scrollbar-width: thin;
            scrollbar-color: var(--mosaik-scheme-middlelight) transparent;
        }

        mosaik-scroll::part(scroller) {
            overscroll-behavior-y: contain;
            touch-action: pan-y;
            -webkit-overflow-scrolling: touch;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
    // #region Properties

    /** Host element used by a collapse toggle positioned alongside this navigation. */
    public readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /**
     * Accessible name for the primary navigation region.
     *
     * @public
     * @readonly
     */
    public readonly ariaLabel: InputSignal<string> = input.required<string>();

    /**
     * Whether the navigation is displayed as an icon-only rail.
     *
     * @public
     * @readonly
     */
    public readonly compact: InputSignal<boolean> = input<boolean>(false);

    /** Uses the Mosaik vertical scrollbar and scroll buttons for overflowing navigation. */
    public readonly showScrollControls = input(false);

    // #endregion
}
