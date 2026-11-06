// #region Imports

import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { TextComponent, TypographyDirective } from '@pixel-brewery/mosaik-elements-angular';
import {
    BlockquoteProcessor,
    ButtonProcessor,
    CalloutProcessor,
    CardProcessor,
    CodeBlockProcessor,
    DetailsProcessor,
    SplitProcessor,
    StepsProcessor,
    TabProcessor,
    type IBlockquoteToken,
    type IButtonToken,
    type ICalloutToken,
    type ICardToken,
    type ICodeBlockToken,
    type IDetailsToken,
    type ISplitsToken,
    type IStepsToken,
    type ITabsToken,
} from '@pixel-brewery/markdowner-core';
import { marked, type Tokens } from 'marked';
import { createMarkedRenderer, type MarkdownRenderer } from './MarkdownRenderer';

// #endregion

/**
 * Renders markdown content using the `marked` library with a Mosaik-component-based renderer.
 *
 * @remarks
 * This component uses `ViewEncapsulation.ShadowDom` to encapsulate its styles
 * and prevent leaking into the rest of the application. The rendered HTML is
 * generated via `marked` and injected via `innerHTML`.
 *
 * Uses all `@pixel-brewery/markdowner-core` processors:
 * - SplitProcessor — side-by-side columns
 * - CalloutProcessor — banners with variant
 * - BlockquoteProcessor — styled message boxes
 * - CodeBlockProcessor — code blocks with language detection
 * - TabProcessor — tabbed content
 * - StepsProcessor — vertical stepper
 * - DetailsProcessor — expandable sections
 * - ButtonProcessor — styled buttons
 * - CardProcessor — highlighted box cards
 *
 * @public
 */
@Component({
    selector: 'ngp-markdown',
    template: `
        @if (sanitize()) {
            <mosaik-text class="ngp-markdown" [mosaikTypography]="'body1'" [text]="safeMarkdownText()" [formatter]="'markdown'" [wrap]="true" />
        } @else {
            <div class="ngp-markdown" [innerHTML]="renderedHtml()"></div>
        }
    `,
    styles: `
        /* This component requires custom SCSS because it styles dynamically generated innerHTML from the markdown renderer.
           Tailwind utility classes cannot be applied to runtime-generated HTML content. */

        :host {
            // ----------------------------------------
            // CSS Variable Definitions
            // ----------------------------------------

            // Spacing
            --markdown-spacing: calc(var(--mosaik-layout-space) * 2);
            --markdown-gap: var(--markdown-spacing);
            --markdown-gap-small: calc(var(--markdown-spacing) / 2);
            --markdown-gap-large: calc(var(--markdown-spacing) * 3);
            --markdown-padding: var(--markdown-spacing);
            --markdown-padding-sm: var(--markdown-gap-small);
            --markdown-padding-md: var(--mosaik-spacing-md);
            --markdown-padding-lg: var(--mosaik-spacing-lg);

            // Radius and borders
            --markdown-thickness: var(--mosaik-layout-thickness);
            --markdown-radius: var(--mosaik-layout-radius);

            // Typography
            --markdown-font-body: var(--mosaik-typography-body1);
            --markdown-font-mono: var(--mosaik-font-family);
            --markdown-font-table: var(--mosaik-typography-body2-font-size);

            --markdown-font-heading-1: var(--mosaik-typography-headline1);
            --markdown-font-heading-2: var(--mosaik-typography-headline2);
            --markdown-font-heading-3: var(--mosaik-typography-headline3);
            --markdown-font-heading-4: var(--mosaik-typography-headline4);
            --markdown-font-heading-5: var(--mosaik-typography-headline5);
            --markdown-font-heading-6: var(--mosaik-typography-headline6);

            // Colors
            --markdown-color-text: var(--mosaik-scheme-foreground);
            --markdown-color-link: var(--mosaik-color-primary-500);
            --markdown-color-link-hover: var(--mosaik-color-primary-700);
            --markdown-color-border: var(--mosaik-color-neutral-300);
            --markdown-color-divider: var(--mosaik-scheme-middlelight);
            --markdown-color-blockquote-bg: var(--mosaik-color-neutral-100);
            --markdown-color-blockquote-border: var(--mosaik-color-primary-300);
            --markdown-color-code-bg: var(--mosaik-color-neutral-100);
            --markdown-color-marker: var(--mosaik-scheme-middlelight);

            // ----------------------------------------
            // Reset
            // ----------------------------------------

            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            ul,
            ol,
            li,
            blockquote,
            pre,
            code,
            table,
            th,
            td,
            img,
            iframe {
                all: unset;
                display: revert;
                box-sizing: border-box;
            }

            ul,
            ol {
                list-style-position: inside;
            }

            table {
                border-collapse: collapse;
                width: 100%;
            }

            th,
            td {
                box-sizing: border-box;
            }

            img {
                max-width: 100%;
                height: auto;
                display: block;
            }

            // ----------------------------------------
            // Base Layout
            // ----------------------------------------

            display: block;
            width: 100%;
            height: 100%;
            font: var(--markdown-font-body);
            color: var(--markdown-color-text);

            // ----------------------------------------
            // Headings
            // ----------------------------------------

            .heading-1,
            h1 {
                font: var(--markdown-font-heading-1);
            }
            .heading-2,
            h2 {
                font: var(--markdown-font-heading-2);
            }
            .heading-3,
            h3 {
                font: var(--markdown-font-heading-3);
            }
            .heading-4,
            h4 {
                font: var(--markdown-font-heading-4);
            }
            .heading-5,
            h5 {
                font: var(--markdown-font-heading-5);
            }
            .heading-6,
            h6 {
                font: var(--markdown-font-heading-6);
            }

            .heading ~ .paragraph,
            .heading ~ .code,
            .paragraph ~ .code,
            .code ~ .paragraph,
            .paragraph ~ .heading {
                margin-block-start: var(--markdown-gap);
            }

            // ----------------------------------------
            // Paragraph
            // ----------------------------------------

            .paragraph,
            p {
                font: var(--markdown-font-body);
                margin-block: var(--markdown-gap-small);
            }

            .strong {
                font-weight: var(--mosaik-typography-button-font-weight);
                display: inline;
            }

            .br {
                display: block;
                height: calc(var(--mosaik-layout-space) * 2);
                content: '';
            }

            // ----------------------------------------
            // Links
            // ----------------------------------------

            .link,
            a {
                color: var(--markdown-color-link);
                text-decoration: underline;
                transition: color var(--mosaik-duration-short) ease;

                &:hover {
                    color: var(--markdown-color-link-hover);
                }
            }

            mosaik-anchor {
                display: inline-block;
            }

            // ----------------------------------------
            // Images & Embeds
            // ----------------------------------------

            .image,
            img {
                display: block;
                max-width: 100%;
                margin-block: var(--markdown-gap);
                border-radius: var(--markdown-radius);
            }

            iframe {
                width: 100%;
            }

            // ----------------------------------------
            // Blockquote
            // ----------------------------------------

            .blockquote,
            div:has(> blockquote) {
                background-color: var(--markdown-color-blockquote-bg);
                margin: var(--markdown-gap-small) auto;
                padding: var(--markdown-padding);
                border-radius: var(--markdown-radius);
                border-left: calc(var(--mosaik-layout-thickness) * 4) solid var(--markdown-color-blockquote-border);
                color: var(--markdown-color-text);
            }

            blockquote p::before {
                content: '\\201C';
            }

            blockquote p::after {
                content: '\\201D';
            }

            blockquote + p {
                text-align: right;
            }

            // ----------------------------------------
            // Code
            // ----------------------------------------

            .code {
                font-family: var(--markdown-font-mono);
                background: var(--markdown-color-code-bg);
                padding: var(--markdown-padding-md);
                border-radius: var(--markdown-radius);
                font-size: var(--mosaik-typography-body2-font-size);
                overflow-x: auto;
            }

            .codespan {
                font-family: var(--markdown-font-mono);
                background: var(--markdown-color-code-bg);
                padding: 0.2em 0.4em;
                border-radius: var(--markdown-radius);
                font-size: var(--mosaik-typography-body2-font-size);
                display: inline;
            }

            // ----------------------------------------
            // Divider
            // ----------------------------------------

            .divider,
            mosaik-divider {
                margin-block: var(--markdown-gap-large);
            }

            .divider {
                display: flex;
                justify-content: center;
                gap: var(--markdown-gap-small);

                span {
                    display: inline-block;
                    border-radius: var(--mosaik-layout-radius);
                    width: calc(var(--mosaik-layout-thickness) * 3);
                    height: calc(var(--mosaik-layout-thickness) * 3);
                    background-color: var(--markdown-color-divider);
                }
            }

            // ----------------------------------------
            // Checkbox
            // ----------------------------------------

            .checkbox {
                margin-right: var(--markdown-gap-small);
                vertical-align: middle;
            }

            // ----------------------------------------
            // Table
            // ----------------------------------------

            .table {
                width: 100%;
                border-collapse: collapse;
                margin-block: var(--markdown-gap);
                font-size: var(--markdown-font-table);
            }

            .table-row {
                border-bottom: var(--mosaik-layout-thickness) solid var(--markdown-color-border);
            }

            .table-cell {
                padding: var(--markdown-padding-sm) var(--markdown-padding);
                text-align: left;
            }

            // ----------------------------------------
            // Lists
            // ----------------------------------------

            ul,
            ol {
                padding-left: var(--markdown-padding-lg);
                margin-block: var(--markdown-gap-small);

                li {
                    margin-bottom: var(--markdown-gap-small);
                    line-height: var(--mosaik-typography-body1-line-height);
                    padding-left: var(--markdown-padding-sm);

                    &::marker {
                        color: var(--markdown-color-marker);
                    }
                }

                ul li {
                    list-style-type: circle;
                }

                ol li {
                    list-style-type: lower-alpha;
                }
            }

            ul li {
                list-style-type: disc;
            }

            ol li {
                list-style-type: decimal;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.ShadowDom,
    imports: [TextComponent, TypographyDirective],
})
export class MarkdownComponent {
    // #region Fields

    private readonly _sanitizer: DomSanitizer = inject(DomSanitizer);
    private readonly _renderer: MarkdownRenderer;

    // #endregion

    // #region Ctor

    public constructor() {
        this._renderer = createMarkedRenderer();

        const blockquoteProcessor = new BlockquoteProcessor();
        const codeBlockProcessor = new CodeBlockProcessor();

        marked.use({
            renderer: this._renderer,
            walkTokens: (token): void => {
                blockquoteProcessor.walkTokens(token);
                codeBlockProcessor.walkTokens(token);
            },
            extensions: [
                {
                    ...new SplitProcessor().extension,
                    renderer(
                        this: {
                            parser: {
                                parse(tokens: Tokens.Generic[]): string;
                                parseInline(tokens: Tokens.Generic[]): string;
                            };
                        },
                        _token: Tokens.Generic,
                    ): string {
                        const token = _token as ISplitsToken;

                        return `
                        <mosaik-stack orientation="horizontal" gap="small">
                            ${token.splits
                                .map(
                                    (split) => `
                            <mosaik-box fit="both" inset="all" highlighted="true" cornered="true">
                                <h6>${this.parser.parseInline(split.title)}</h6>
                                ${this.parser.parse(split.tokens ?? [])}
                            </mosaik-box>
                            `,
                                )
                                .join('')}
                        </mosaik-stack>
                        `.trim();
                    },
                },
                {
                    ...new CalloutProcessor().extension,
                    renderer(this: { parser: { parse(tokens: Tokens.Generic[]): string } }, _token: Tokens.Generic): string {
                        const token = _token as ICalloutToken;

                        return `
                        <mosaik-banner appearance="soft" variant="${token.variant}" header="${token.title}">
                            <div slot="subHeader">${this.parser.parse(token.tokens ?? [])}</div>
                        </mosaik-banner>
                        `.trim();
                    },
                },
                {
                    ...new BlockquoteProcessor().extension,
                    renderer: (_token): string => {
                        const token = _token as IBlockquoteToken;
                        const variant = token.variant ?? 'neutral';
                        const header = variant !== 'neutral' ? variant.charAt(0).toUpperCase() + variant.slice(1) : '';
                        const content = token.content ?? token.text ?? '';

                        return `<mosaik-message appearance="soft" variant="${variant}"${header ? ` header="${header}"` : ''}><mosaik-text slot="content" formatter="markdown" text="${content}" wrap="true"></mosaik-text></mosaik-message>`;
                    },
                },
                {
                    ...new CodeBlockProcessor().extension,
                    renderer: (_token): string => {
                        const token = _token as ICodeBlockToken;
                        const lang = token.meta?.lang ?? token.lang ?? '';

                        if (lang === 'mermaid') {
                            return `<div class="code diagram mermaid">${token.text}</div>`;
                        }

                        return `<mosaik-code-editor class="code" text="${token.text}" language="${lang}" theme="boysandgirls" copyable></mosaik-code-editor>`;
                    },
                },
                {
                    ...new TabProcessor().extension,
                    renderer(this: { parser: { parse(tokens: Tokens.Generic[]): string } }, _token: Tokens.Generic): string {
                        const token = _token as ITabsToken;

                        return `
                        <mosaik-tab appearance="soft">
                            ${token.tabs
                                .map(
                                    (tab) => `
                            <mosaik-tab-item label="${tab.title}" variant="${tab.variant}" id="${tab.id}">
                                ${this.parser.parse(tab.tokens ?? [])}
                            </mosaik-tab-item>
                            `,
                                )
                                .join('')}
                        </mosaik-tab>
                        `.trim();
                    },
                },
                {
                    ...new StepsProcessor().extension,
                    renderer(this: { parser: { parse(tokens: Tokens.Generic[]): string } }, _token: Tokens.Generic): string {
                        const token = _token as IStepsToken;

                        return `
                        <mosaik-stepper orientation="vertical">
                            ${token.steps
                                .map(
                                    (step) => `
                            <mosaik-stepper-item header="${step.title}" state="completed" id="${step.id}">
                                ${this.parser.parse(step.tokens ?? [])}
                            </mosaik-stepper-item>
                            `,
                                )
                                .join('')}
                        </mosaik-stepper>
                        `.trim();
                    },
                },
                {
                    ...new DetailsProcessor().extension,
                    renderer(this: { parser: { parse(tokens: Tokens.Generic[]): string } }, _token: Tokens.Generic): string {
                        const token = _token as IDetailsToken;

                        return `<mosaik-expander header="${token.title}" appearance="soft">${this.parser.parse(token.tokens ?? [])}</mosaik-expander>`;
                    },
                },
                {
                    ...new ButtonProcessor().extension,
                    renderer: (_token): string => {
                        const token = _token as IButtonToken;

                        return `<mosaik-button label="${token.label}" href="${token.href}" variant="${token.variant}" appearance="${token.appearance}"></mosaik-button>`;
                    },
                },
                {
                    ...new CardProcessor().extension,
                    renderer(this: { parser: { parse(tokens: Tokens.Generic[]): string } }, _token: Tokens.Generic): string {
                        const token = _token as ICardToken;

                        return `<mosaik-box fit="auto" inset="all" highlighted="true" cornered="true"><h6>${token.header}</h6>${token.subHeader ? `<small>${token.subHeader}</small>` : ''}${this.parser.parse(token.tokens ?? [])}</mosaik-box>`;
                    },
                },
            ],
        });
    }

    // #endregion

    // #region Properties

    /**
     * The markdown text to render.
     *
     * @public
     */
    public text = input<string>('');

    /**
     * Whether to enable line breaks in the markdown output.
     *
     * @public
     */
    public breaks = input<boolean>(false);

    /**
     * Whether to render standard Markdown through Mosaik's safe text formatter.
     *
     * @public
     */
    public sanitize = input<boolean>(false);

    /**
     * Markdown source with raw HTML escaped before Mosaik formats the supported Markdown syntax.
     *
     * @public
     */
    public safeMarkdownText = computed<string>(() =>
        this.text().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'),
    );

    /**
     * The rendered HTML output as a safe HTML binding.
     *
     * @public
     */
    public renderedHtml = computed<SafeHtml | string>(() => {
        const text = this.text();
        if (!text) {
            return '';
        }

        const rawHtml = marked(text, {
            breaks: this.breaks(),
            gfm: true,
        }) as string;

        return this._sanitizer.bypassSecurityTrustHtml(rawHtml);
    });

    // #endregion
}
