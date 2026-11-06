// #region Imports

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { EmailLayoutSymbolComponentIntl, provideEmailLayoutSymbolComponentIntl } from './EmailLayoutSymbolComponentIntl';
import type { IEmailLayoutSymbolAppearance } from './IEmailLayoutSymbolAppearance';

// #endregion

/**
 * Renders a compact, inert representation of a configurable email layout.
 *
 * @public
 */
@Component({
    selector: 'ngp-email-layout-symbol',
    template: `
        <figure
            part="root"
            role="img"
            class="relative m-0 aspect-4/5 w-full overflow-hidden border p-[9%] shadow-sm"
            [attr.aria-label]="ariaLabel()"
            [style.background-color]="appearance().backgroundColor"
            [style.border-color]="appearance().mutedColor"
        >
            @if (appearance().accentPosition === 'START') {
                <div part="accent" class="absolute inset-y-0 left-0 w-[9%]" [style.background-color]="appearance().primaryColor"></div>
            } @else if (appearance().accentPosition === 'END') {
                <div part="accent" class="absolute inset-y-0 right-0 w-[9%]" [style.background-color]="appearance().primaryColor"></div>
            }

            <div
                part="surface"
                class="relative flex h-full w-full flex-col overflow-hidden"
                [class.border]="appearance().framed"
                [style.background-color]="appearance().surfaceColor"
                [style.border-color]="appearance().mutedColor"
                [style.padding]="appearance().compact ? '8%' : '11%'"
            >
                <div
                    part="header"
                    class="flex shrink-0 items-center"
                    [class.justify-start]="appearance().logoAlignment === 'START'"
                    [class.justify-center]="appearance().logoAlignment === 'CENTER'"
                    [class.justify-end]="appearance().logoAlignment === 'END'"
                    [style.height]="appearance().compact ? '15%' : '19%'"
                    [style.margin-left]="appearance().accentPosition === 'TOP' ? '-14%' : null"
                    [style.margin-right]="appearance().accentPosition === 'TOP' ? '-14%' : null"
                    [style.margin-top]="appearance().accentPosition === 'TOP' ? '-14%' : null"
                    [style.padding-left]="appearance().accentPosition === 'TOP' ? '14%' : null"
                    [style.padding-right]="appearance().accentPosition === 'TOP' ? '14%' : null"
                    [style.padding-top]="appearance().accentPosition === 'TOP' ? '10%' : null"
                    [style.background-color]="appearance().accentPosition === 'TOP' ? appearance().primaryColor : appearance().surfaceColor"
                >
                    <div
                        part="logo"
                        class="h-[28%] min-h-px w-2/5"
                        [style.background-color]="appearance().accentPosition === 'TOP' ? appearance().primaryContrastColor : appearance().primaryColor"
                    ></div>
                </div>

                <div
                    part="content"
                    class="flex min-h-0 flex-1 flex-col justify-center"
                    [class.items-start]="appearance().contentAlignment === 'START'"
                    [class.items-center]="appearance().contentAlignment === 'CENTER'"
                    [class.items-end]="appearance().contentAlignment === 'END'"
                    [style.gap]="appearance().compact ? '7%' : '9%'"
                >
                    <div part="heading" class="h-[7%] w-4/5" [style.background-color]="appearance().primaryColor"></div>
                    <div part="line" class="h-px w-full" [style.background-color]="appearance().mutedColor"></div>
                    <div part="line" class="h-px w-4/5" [style.background-color]="appearance().mutedColor"></div>
                    <div part="line" class="h-px w-3/5" [style.background-color]="appearance().mutedColor"></div>
                    <div
                        part="action-row"
                        class="flex w-full"
                        [class.justify-start]="appearance().actionAlignment === 'START'"
                        [class.justify-center]="appearance().actionAlignment === 'CENTER'"
                        [class.justify-end]="appearance().actionAlignment === 'END'"
                    >
                        <div
                            part="action"
                            class="h-2"
                            [class.w-1/2]="appearance().actionAlignment !== 'STRETCH'"
                            [class.w-full]="appearance().actionAlignment === 'STRETCH'"
                            [style.background-color]="appearance().primaryColor"
                        ></div>
                    </div>
                </div>

                <div
                    part="footer"
                    class="relative flex h-[14%] shrink-0 items-center gap-[8%]"
                    [style.margin-left]="appearance().footerTone !== 'SURFACE' ? '-14%' : null"
                    [style.margin-right]="appearance().footerTone !== 'SURFACE' ? '-14%' : null"
                    [style.margin-bottom]="appearance().footerTone !== 'SURFACE' ? '-14%' : null"
                    [style.padding-left]="appearance().footerTone !== 'SURFACE' ? '14%' : null"
                    [style.padding-right]="appearance().footerTone !== 'SURFACE' ? '14%' : null"
                    [style.padding-bottom]="appearance().footerTone !== 'SURFACE' ? '8%' : null"
                    [style.background-color]="
                        appearance().footerTone === 'PRIMARY'
                            ? appearance().primaryColor
                            : appearance().footerTone === 'MUTED'
                              ? appearance().backgroundColor
                              : appearance().surfaceColor
                    "
                >
                    <div
                        part="footer-line"
                        class="h-px w-2/3"
                        [style.background-color]="appearance().footerTone === 'PRIMARY' ? appearance().primaryContrastColor : appearance().mutedColor"
                    ></div>
                </div>
            </div>

            @if (appearance().accentPosition === 'BOTTOM') {
                <div part="accent" class="absolute inset-x-0 bottom-0 h-[9%]" [style.background-color]="appearance().primaryColor"></div>
            }
        </figure>
    `,
    styles: `
        :host {
            display: flex;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        provideEmailLayoutSymbolComponentIntl({
            ariaLabel: 'loc.emailLayoutSymbol.ariaLabel',
        }),
    ],
})
export class EmailLayoutSymbolComponent {
    // #region Fields

    private readonly _intl: EmailLayoutSymbolComponentIntl = inject(EmailLayoutSymbolComponentIntl, { optional: true }) ?? new EmailLayoutSymbolComponentIntl();

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
    public readonly appearance = input.required<IEmailLayoutSymbolAppearance>();

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties
    // #endregion

    // #region Methods
    // #endregion
}
