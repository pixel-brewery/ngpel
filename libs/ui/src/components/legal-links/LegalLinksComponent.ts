// #region Imports

import { ChangeDetectionStrategy, Component, computed, inject, input, type Signal } from '@angular/core';
import { TextComponent, TranslateDirective, TypographyDirective } from '@pixel-brewery/mosaik-elements-angular';
import { LegalLinksComponentIntl, provideLegalLinksComponentIntl } from './LegalLinksComponentIntl';
import type { ILegalLink } from './ILegalLink';

// #endregion

/**
 * Renders trusted website-level legal navigation without accepting HTML content.
 *
 * @public
 */
@Component({
    selector: 'ngp-legal-links',
    imports: [TextComponent, TranslateDirective, TypographyDirective],
    template: `
        <nav part="navigation" [attr.aria-label]="ariaLabel()" [attr.data-tone]="tone()" class="flex min-w-0 w-full flex-col gap-y-1">
            @for (row of linkRows(); track $index; let rowIndex = $index) {
                <ul
                    part="links"
                    class="m-0 flex w-full min-w-0 list-none items-center gap-x-2 gap-y-1 p-0"
                    [class.flex-wrap]="!fixedRows()"
                    [class.justify-center]="alignment() === 'center'"
                    [class.justify-start]="alignment() === 'start'"
                >
                    @for (link of row; track link.url + (link.translationKey ?? link.label)) {
                        <li part="item" class="inline-flex max-w-full shrink-0 items-center gap-x-2 whitespace-nowrap">
                            @if (!$first || (rowIndex === 0 && leadingSeparator())) {
                                <mosaik-text part="separator" aria-hidden="true" [mosaikTypography]="'caption'" [text]="'·'" [readonly]="true" />
                            }
                            <a
                                part="link"
                                class="max-w-full min-w-0"
                                [href]="link.url"
                                [attr.target]="link.openInNewTab === false ? null : '_blank'"
                                [attr.rel]="link.openInNewTab === false ? null : 'noopener noreferrer'"
                                referrerpolicy="no-referrer"
                            >
                                @if (link.translationKey; as key) {
                                    <mosaik-text
                                        *mosaikTranslate="let t"
                                        [mosaikTypography]="'caption'"
                                        [text]="t(key) ?? link.label"
                                        [wrap]="false"
                                        [readonly]="tone() === 'default'"
                                    />
                                } @else {
                                    <mosaik-text [mosaikTypography]="'caption'" [text]="link.label" [wrap]="false" [readonly]="tone() === 'default'" />
                                }
                            </a>
                        </li>
                    }
                </ul>
            }
        </nav>
    `,
    styles: `
        @use '@pixel-brewery/mosaik-themes/scss' as themes;

        :host {
            @include themes.joy-style();

            display: block;
        }

        [part='navigation'][data-tone='inverse'] [part='link'] {
            --text-foreground-color: var(--ngp-legal-links-inverse-foreground, var(--mosaik-color-neutral-0));
        }

        [part='link'] {
            border-radius: var(--mosaik-layout-radius);
            text-decoration: none;
            transition-duration: var(--mosaik-duration-short);
            transition-property: color;
        }

        [part='link']:hover,
        [part='link']:active {
            text-decoration: underline;
        }

        [part='link']:focus-visible {
            outline: var(--mosaik-layout-thickness) solid var(--mosaik-color-info-500);
            outline-offset: var(--mosaik-layout-thickness);
        }

        [part='separator'] {
            color: var(--mosaik-scheme-middlelight);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        provideLegalLinksComponentIntl({
            ariaLabel: 'loc.legalLinks.ariaLabel',
        }),
    ],
})
export class LegalLinksComponent {
    // #region Fields

    /**
     * The website and legal navigation to render. Every product ships its own, so this package
     * carries no defaults.
     *
     * @public
     * @readonly
     */
    public readonly links = input.required<ReadonlyArray<ILegalLink>>();

    /**
     * Additional website-level links such as tenant-specific terms and conditions.
     * Contract attachments are intentionally outside this component's responsibility.
     *
     * @public
     * @readonly
     */
    public readonly additionalLinks = input<ReadonlyArray<ILegalLink>>([]);

    private readonly _intl: LegalLinksComponentIntl = inject(LegalLinksComponentIntl, { optional: true }) ?? new LegalLinksComponentIntl();

    /**
     * Accessible navigation label.
     *
     * @public
     * @readonly
     */
    public readonly ariaLabel = input(this._intl.ariaLabel);

    /**
     * Horizontal alignment used by the surrounding shell.
     *
     * @public
     * @readonly
     */
    public readonly alignment = input<'center' | 'start'>('center');

    /**
     * Color treatment for light and inverse shell backgrounds.
     *
     * @public
     * @readonly
     */
    public readonly tone = input<'default' | 'inverse'>('default');

    /**
     * Whether the first link is prefixed with a separator supplied by the surrounding sequence.
     *
     * @public
     * @readonly
     */
    public readonly leadingSeparator = input(false);

    /** Number of links in the first fixed row. Remaining links form a second row. Omit for flexible wrapping. */
    public readonly firstRowSize = input<number>();

    private readonly _fixedRowSize = computed(() => {
        const size = this.firstRowSize();
        return size !== undefined && Number.isSafeInteger(size) && size > 0 ? size : undefined;
    });
    protected readonly fixedRows = computed(() => this._fixedRowSize() !== undefined);
    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    /**
     * Legal links grouped into the configured display rows.
     *
     * @protected
     * @readonly
     */
    protected readonly linkRows: Signal<ReadonlyArray<ReadonlyArray<ILegalLink>>> = computed(() => {
        const links = [...this.links(), ...this.additionalLinks()];
        const size = this._fixedRowSize();
        return size !== undefined && links.length > size ? [links.slice(0, size), links.slice(size)] : [links];
    });

    // #endregion

    // #region Methods

    // #endregion
}
