// #region Imports

import type { Renderer, Token, Tokens } from 'marked';

// #endregion

/**
 * Partial renderer type for `marked`.
 *
 * @public
 */
export type MarkdownRenderer = Partial<Omit<Renderer, 'options' | 'constructor'>>;

/**
 * Options for the markdown renderer.
 *
 * @public
 */
export interface IMarkdownRendererOptions {
    readonly wrapText: boolean;
    readonly variant: string;
    readonly appearance: string;
}

/**
 * Creates a `marked` renderer that outputs Mosaik web component HTML.
 *
 * @public
 */
export function createMarkedRenderer(options?: Partial<IMarkdownRendererOptions>): MarkdownRenderer {
    const resolved: IMarkdownRendererOptions = {
        wrapText: true,
        variant: 'primary',
        appearance: 'default',
        ...options,
    };

    return {
        heading(token: Tokens.Heading): string {
            let depth = token.depth;
            if (depth < 4) {
                depth = 4;
            }

            return `
            <mosaik-text class="heading heading-${depth} h${depth}" style="font: var(--mosaik-typography-headline${depth}); letter-spacing: var(--mosaik-typography-headline${depth}-letter-spacing);" text="${escapeText(token.text)}" formatter="markdown" wrap="${resolved.wrapText}">
            </mosaik-text>
        `.trim();
        },

        hr(): string {
            return `
            <div class="divider" role="separator"><span></span><span></span><span></span></div>
        `.trim();
        },

        table(token: Tokens.Table): string {
            const header = token.header
                .map((x) => `<mosaik-table-header-cell text="${escapeText(x.text)}" formatter="markdown" text-overflow="wrap"></mosaik-table-header-cell>`)
                .join('');
            const body = token.rows
                .map(
                    (row) =>
                        `<mosaik-table-body-row>${row.map((cell) => `<mosaik-table-body-cell align="${cell.align ?? 'left'}" text="${escapeText(cell.text)}" formatter="markdown" text-overflow="wrap"></mosaik-table-body-cell>`).join('')}</mosaik-table-body-row>`,
                )
                .join('');

            return `<mosaik-table class="table">
                <mosaik-table-header>
                    <mosaik-table-header-row>
                        ${header}
                    </mosaik-table-header-row>
                </mosaik-table-header>
                <mosaik-table-body>
                    ${body}
                </mosaik-table-body>
            </mosaik-table>`.trim();
        },

        tablerow(token: Tokens.TableRow): string {
            return `
            <mosaik-table-body-row class="table-row">
                ${token.text}
            </mosaik-table-body-row>
        `.trim();
        },

        tablecell(token: Tokens.TableCell): string {
            return `
            <mosaik-table-body-cell class="table-cell" align="${token.align}" text-overflow="wrap">
                ${token.text}
            </mosaik-table-body-cell>
        `.trim();
        },

        link(token: Tokens.Link): string {
            const cleanHref = cleanUrl(token.href);
            if (cleanHref === null) {
                return token.text;
            }

            let out = `<mosaik-anchor class="link" href="${cleanHref}" variant="${resolved.variant}" appearance="${resolved.appearance}"`;
            if (token.title) {
                out += ` title="${escapeText(token.title)}"`;
            }
            if (token.text) {
                out += ` label="${escapeText(token.text)}"`;
            }
            out += '></mosaik-anchor>';

            return out;
        },

        code({ text, lang, escaped }: { text: string; lang?: string; escaped?: boolean }): string {
            if (!escaped) {
                text = escapeText(text);
            }

            if (lang) {
                lang = lang.toLowerCase();
            }

            return `<mosaik-code-editor class="code" text="${text}" language="${lang ?? ''}" theme="boysandgirls" copyable></mosaik-code-editor>`;
        },

        blockquote(token: Tokens.Blockquote): string {
            return `
            <div class="blockquote">
                <mosaik-text formatter="markdown" wrap="${resolved.wrapText}" text="${escapeText(token.tokens.map((t) => t.raw).join(' '))}"></mosaik-text>
            </div>
        `.trim();
        },

        paragraph(token: Tokens.Paragraph): string {
            if (token.tokens.some((t) => t.type === 'image')) {
                const imageToken = token.tokens.find((t) => t.type === 'image') as Tokens.Image;

                return renderImage(imageToken);
            }

            return `
            <mosaik-text class="paragraph" formatter="markdown" wrap="${resolved.wrapText}" text="${escapeText(token.tokens.map((t) => t.raw).join(' '))}"></mosaik-text>
        `.trim();
        },

        br(): string {
            return '<br class="br">';
        },

        image(token: Tokens.Image): string {
            return renderImage(token);
        },

        codespan({ text }: { text: string }): string {
            return `<mosaik-code class="codespan" text="${escapeText(text)}" style="display: inline;"></mosaik-code>`;
        },

        del({ tokens }: { tokens: Array<Token> }): string {
            return `<del>${tokens.map((t) => t.raw).join('')}</del>`;
        },

        strong({ tokens }: { tokens: Array<Token> }): string {
            return `<mosaik-text class="strong" formatter="markdown" wrap="${resolved.wrapText}" text="${escapeText(tokens.map((token) => token.raw).join(' '))}" style="font-weight: bold; display: inline;"></mosaik-text>`;
        },

        em({ tokens }: { tokens: Array<Token> }): string {
            return `<mosaik-text class="emphasis" formatter="markdown" wrap="${resolved.wrapText}" text="${escapeText(tokens.map((token) => token.raw).join(' '))}" style="font-style: italic; display: inline;"></mosaik-text>`;
        },

        checkbox(token: Tokens.Checkbox): string {
            return `<mosaik-checkbox class="checkbox" is-checked="${token.checked}" appearance="soft" variant="${resolved.variant}" style="display: inline-block;"></mosaik-checkbox>`;
        },

        list(token: Tokens.List): string {
            const type = token.ordered ? 'ordered' : 'unordered';
            const appearance = token.ordered ? 'soft' : 'plain';

            let body = '';
            for (const item of token.items) {
                body += renderListItem(item, resolved);
            }

            return `<mosaik-listing class="list" type="${type}"${token.ordered && token.start !== 1 ? ` start="${token.start}"` : ''} variant="${resolved.variant}" appearance="${appearance}">${body}</mosaik-listing>`;
        },

        listitem(item: Tokens.ListItem): string {
            return renderListItem(item, resolved);
        },
    };
}

/**
 * Renders a single list item.
 */
function renderListItem(item: Tokens.ListItem, options: IMarkdownRendererOptions): string {
    let text = item.tokens.map((t) => t.raw).join(' ');
    if (item.task) {
        text = `<mosaik-checkbox is-checked="${item.checked}" appearance="soft" variant="${options.variant}" style="display: inline-block;"></mosaik-checkbox> ${text}`;
    }

    return `<mosaik-listing-item class="list-item"><mosaik-text formatter="markdown" wrap="${options.wrapText}" text="${escapeText(text)}"></mosaik-text></mosaik-listing-item>`;
}

/**
 * Renders an image token.
 */
function renderImage(token: Tokens.Image): string {
    const dimensionMatch = /\s*=\s*(?:(\d*)x(\d*)|x(\d+)|(\d+)x)\s*$/.exec(token.href);
    const width = dimensionMatch?.[1] ?? dimensionMatch?.[4] ?? '';
    const height = dimensionMatch?.[2] ?? dimensionMatch?.[3] ?? '';
    const cleanSrc = token.href.replace(/\s*=\s*(?:\d*x\d*|x\d+|\d+x)\s*$/, '');

    return `
    <mosaik-image
        class="image"
        src="${cleanSrc}"
        ${width ? `width="${width}px"` : ''}
        ${height ? `height="${height}px"` : ''}
        ${token.title || token.text ? `legend="${escapeText(token.title ?? token.text)}" legend-position="bottom"` : ''}
        ${token.text ? `alt="${escapeText(token.text)}"` : ''}
    ></mosaik-image>
    `.trim();
}

/**
 * Sanitizes a URL for safe use in attributes.
 */
function cleanUrl(href: string): string | null {
    try {
        href = encodeURI(href).replace(/%25/g, '%');
    } catch {
        return null;
    }

    return href;
}

/**
 * Escapes text for safe use in HTML attributes.
 */
function escapeText(text: string): string {
    return text.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Default renderer instance.
 *
 * @public
 */
export const DEFAULT_MARKDOWN_RENDERER: MarkdownRenderer = createMarkedRenderer();
