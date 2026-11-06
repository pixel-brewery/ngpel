// #region Imports

import { ChangeDetectionStrategy, Component, inject, input, type Signal } from '@angular/core';
import { TextComponent, TypographyDirective } from '@pixel-brewery/mosaik-elements-angular';
import { ContentTableOfContentsComponentIntl, provideContentTableOfContentsComponentIntl } from './ContentTableOfContentsComponentIntl';
import { ContentFragmentLinkDirective } from './ContentFragmentLinkDirective';
import { ContentNavigationContext } from './ContentNavigationContext';
import type { IContentNavigationItem } from './IContentNavigationItem';

// #endregion

/**
 * Renders an accessible fragment-link navigation for registered page content.
 *
 * @public
 */
@Component({
    selector: 'ngp-content-table-of-contents',
    imports: [ContentFragmentLinkDirective, TextComponent, TypographyDirective],
    template: `
        @if (items().length > 0) {
            <nav part="navigation" [attr.aria-label]="label()" class="min-w-0">
                <mosaik-text part="title" class="mb-3" [mosaikTypography]="'overline'" [text]="label()" [wrap]="true" [readonly]="true" />
                <ol
                    part="items"
                    class="m-0 flex min-w-0 gap-2 p-0"
                    [class.flex-col]="orientation() === 'vertical'"
                    [class.flex-row]="orientation() === 'horizontal'"
                    [class.flex-wrap]="orientation() === 'horizontal'"
                >
                    @for (item of items(); track item.id) {
                        <li
                            part="item"
                            class="min-w-0"
                            [class.ml-3]="orientation() === 'vertical' && (item.level ?? 1) > 1"
                            [class.ml-6]="orientation() === 'vertical' && (item.level ?? 1) > 2"
                        >
                            <a
                                part="link"
                                class="block max-w-full px-2 py-1.5"
                                [ngpContentFragmentLink]="item.id"
                                [attr.aria-current]="activeItemId() === item.id ? 'location' : null"
                                [attr.data-active]="activeItemId() === item.id ? 'true' : null"
                            >
                                <mosaik-text
                                    [mosaikTypography]="activeItemId() === item.id ? 'subtitle2' : 'body1'"
                                    [text]="item.label"
                                    [wrap]="true"
                                    [readonly]="activeItemId() !== item.id"
                                />
                            </a>
                        </li>
                    }
                </ol>
            </nav>
        }
    `,
    styles: `
        :host {
            display: block;
        }

        [part='title'] {
            color: var(--mosaik-scheme-lowlight);
        }

        [part='items'] {
            list-style: none;
        }

        [part='link'] {
            background-color: var(--mosaik-scheme-transparent);
            border: 0;
            border-inline-start: calc(var(--mosaik-layout-thickness) * 2) solid var(--mosaik-scheme-transparent);
            border-radius: var(--mosaik-layout-radius);
            overflow-wrap: anywhere;
            text-decoration: none;
            transition-duration: var(--mosaik-duration-short);
            transition-property: background-color, border-color, color;
        }

        [part='link']:hover {
            text-decoration: underline;
        }

        [part='link']:focus-visible {
            outline: var(--mosaik-layout-thickness) solid var(--mosaik-color-info-500);
            outline-offset: var(--mosaik-layout-thickness);
        }

        [part='link'][data-active='true'] {
            background-color: var(--mosaik-color-highlight-100);
            border-inline-start-color: var(--mosaik-color-highlight-500);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        provideContentTableOfContentsComponentIntl({
            label: 'loc.contentTableOfContents.label',
        }),
    ],
})
export class ContentTableOfContentsComponent {
    // #region Fields

    private readonly _intl: ContentTableOfContentsComponentIntl =
        inject(ContentTableOfContentsComponentIntl, { optional: true }) ?? new ContentTableOfContentsComponentIntl();

    /**
     * Accessible label and visible heading for the navigation.
     *
     * @public
     * @readonly
     */
    public readonly label = input(this._intl.label);

    /**
     * Layout direction used by the surrounding shell.
     *
     * @public
     * @readonly
     */
    public readonly orientation = input<'horizontal' | 'vertical'>('vertical');

    private readonly _context = inject(ContentNavigationContext);

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    /**
     * Registered destinations visible to the template.
     *
     * @protected
     * @readonly
     */
    protected get items(): Signal<ReadonlyArray<IContentNavigationItem>> {
        return this._context.items;
    }

    /**
     * Destination currently represented by the viewport.
     *
     * @protected
     * @readonly
     */
    protected get activeItemId(): Signal<string | null> {
        return this._context.activeItemId;
    }

    // #endregion

    // #region Methods

    // #endregion
}
