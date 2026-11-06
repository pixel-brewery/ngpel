// #region Imports

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DocumentLayoutSymbolComponentIntl, provideDocumentLayoutSymbolComponentIntl } from './DocumentLayoutSymbolComponentIntl';
import type { IDocumentLayoutSymbolAppearance } from './IDocumentLayoutSymbolAppearance';

// #endregion

/**
 * Renders a compact, inert representation of a configurable document layout.
 *
 * @public
 */
@Component({
    selector: 'ngp-document-layout-symbol',
    template: `
        <figure
            part="root"
            role="img"
            class="relative m-0 aspect-210/297 w-full overflow-hidden border p-[10%] shadow-sm"
            [attr.aria-label]="ariaLabel()"
            [style.background-color]="appearance().surfaceColor"
            [style.border-color]="appearance().mutedColor"
        >
            @if (appearance().headerStyle === 'SIDE') {
                <div part="side-header" class="absolute inset-y-0 left-0 w-[13%]" [style.background-color]="appearance().primaryColor"></div>
            }

            <div
                part="page"
                class="flex h-full w-full flex-col"
                [style.padding-left]="appearance().headerStyle === 'SIDE' ? '8%' : null"
                [style.background-color]="appearance().surfaceColor"
            >
                <div
                    part="header"
                    class="relative flex h-[19%] shrink-0 items-center gap-[7%]"
                    [class.justify-start]="appearance().logoPlacement === 'START'"
                    [class.justify-center]="appearance().logoPlacement === 'CENTER'"
                    [class.justify-end]="appearance().logoPlacement === 'END'"
                    [class.border-b]="appearance().headerStyle === 'CLASSIC'"
                    [style.border-color]="appearance().primaryColor"
                >
                    @if (appearance().headerStyle === 'SPLIT') {
                        <div part="header-split" class="absolute inset-x-0 top-0 flex h-[24%]">
                            <div part="header-primary" class="h-full w-1/2" [style.background-color]="appearance().primaryColor"></div>
                            <div part="header-secondary" class="h-full w-1/2" [style.background-color]="appearance().accentColor"></div>
                        </div>
                    } @else if (appearance().headerStyle === 'CENTERED') {
                        <div part="header-accent" class="absolute inset-x-[20%] bottom-0 h-px" [style.background-color]="appearance().accentColor"></div>
                    }
                    @if (appearance().logoPlacement !== 'NONE' && appearance().logoPlacement !== 'FOOTER') {
                        <div
                            part="logo"
                            class="h-[26%] w-2/5"
                            [class.w-1/3]="appearance().headerStyle === 'MINIMAL'"
                            [style.background-color]="appearance().primaryColor"
                        ></div>
                    }
                </div>

                @if (appearance().showAddressLine) {
                    <div part="address-line" class="mt-[6%] h-px w-3/4" [style.background-color]="appearance().mutedColor"></div>
                }

                <div part="content" class="flex min-h-0 flex-1 flex-col justify-center gap-[7%]">
                    <div part="parties" class="flex gap-[6%]">
                        <div
                            part="party"
                            class="h-3 flex-1 border"
                            [style.border-color]="appearance().mutedColor"
                            [style.background-color]="appearance().surfaceColor"
                        ></div>
                        @if (appearance().partyColumns === 2) {
                            <div
                                part="party"
                                class="h-3 flex-1 border"
                                [style.border-color]="appearance().mutedColor"
                                [style.background-color]="appearance().surfaceColor"
                            ></div>
                        }
                    </div>

                    @if (appearance().itemStyle === 'CARDS') {
                        <div part="items" class="grid grid-cols-2 gap-[6%]">
                            <div part="item-card" class="h-4" [style.background-color]="appearance().accentColor"></div>
                            <div part="item-card" class="h-4" [style.background-color]="appearance().accentColor"></div>
                        </div>
                    } @else {
                        <div part="items" class="flex flex-col" [style.gap]="appearance().itemStyle === 'COMPACT_ROWS' ? '4%' : '8%'">
                            <div part="item-row" class="h-px w-full" [style.background-color]="appearance().mutedColor"></div>
                            <div part="item-row" class="h-px w-full" [style.background-color]="appearance().mutedColor"></div>
                            <div part="item-row" class="h-px w-4/5" [style.background-color]="appearance().mutedColor"></div>
                        </div>
                    }

                    <div
                        part="totals-row"
                        class="flex w-full"
                        [class.justify-start]="appearance().totalsAlignment === 'START'"
                        [class.justify-end]="appearance().totalsAlignment === 'END'"
                    >
                        <div
                            part="totals"
                            class="h-2"
                            [class.w-1/2]="appearance().totalsAlignment !== 'STRETCH'"
                            [class.w-full]="appearance().totalsAlignment === 'STRETCH'"
                            [style.background-color]="appearance().primaryColor"
                        ></div>
                    </div>
                </div>

                <div
                    part="footer"
                    class="relative flex h-[18%] shrink-0 items-center gap-[7%]"
                    [style.margin-left]="appearance().footerStyle === 'BAND' ? '-12%' : null"
                    [style.margin-right]="appearance().footerStyle === 'BAND' ? '-12%' : null"
                    [style.margin-bottom]="appearance().footerStyle === 'BAND' ? '-12%' : null"
                    [style.padding-left]="appearance().footerStyle === 'BAND' ? '12%' : null"
                    [style.padding-right]="appearance().footerStyle === 'BAND' ? '12%' : null"
                    [style.padding-bottom]="appearance().footerStyle === 'BAND' ? '8%' : null"
                    [style.background-color]="appearance().footerStyle === 'BAND' ? appearance().primaryColor : appearance().surfaceColor"
                >
                    @if (appearance().footerStyle === 'COLUMNS') {
                        <div part="footer-column" class="h-3 flex-1 border-l" [style.border-color]="appearance().mutedColor"></div>
                        <div part="footer-column" class="h-3 flex-1 border-l" [style.border-color]="appearance().mutedColor"></div>
                        <div part="footer-column" class="h-3 flex-1 border-l" [style.border-color]="appearance().mutedColor"></div>
                    } @else {
                        <div
                            part="footer-line"
                            class="h-px flex-1"
                            [style.background-color]="appearance().footerStyle === 'BAND' ? appearance().surfaceColor : appearance().mutedColor"
                        ></div>
                    }
                    @if (appearance().logoPlacement === 'FOOTER') {
                        <div
                            part="footer-logo"
                            class="h-[18%] w-1/4"
                            [style.background-color]="appearance().footerStyle === 'BAND' ? appearance().surfaceColor : appearance().primaryColor"
                        ></div>
                    }
                    @if (appearance().showPageNumber) {
                        <div
                            part="page-number"
                            class="h-1.5 w-1.5 shrink-0 rounded-full"
                            [style.background-color]="appearance().footerStyle === 'BAND' ? appearance().surfaceColor : appearance().primaryColor"
                        ></div>
                    }
                </div>
            </div>
        </figure>
    `,
    styles: `
        :host {
            display: flex;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        provideDocumentLayoutSymbolComponentIntl({
            ariaLabel: 'loc.documentLayoutSymbol.ariaLabel',
        }),
    ],
})
export class DocumentLayoutSymbolComponent {
    // #region Fields

    private readonly _intl: DocumentLayoutSymbolComponentIntl =
        inject(DocumentLayoutSymbolComponentIntl, { optional: true }) ?? new DocumentLayoutSymbolComponentIntl();

    /**
     * Accessible label for the visual symbol.
     *
     * @public
     * @readonly
     */
    public readonly ariaLabel = input(this._intl.ariaLabel);

    /**
     * Domain-independent visual configuration.
     *
     * @public
     * @readonly
     */
    public readonly appearance = input.required<IDocumentLayoutSymbolAppearance>();

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties
    // #endregion

    // #region Methods
    // #endregion
}
