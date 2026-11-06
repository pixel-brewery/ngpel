// #region Imports

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
import { Lexer, Marked, type Token, type Tokens } from 'marked';
import type { IMarkdownDocument } from './MarkdownDocument';
import type { MarkdownInlineNode } from './MarkdownInlineNode';
import type { MarkdownNode } from './MarkdownNode';

// #endregion

const SAFE_LINK_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);
const SAFE_IMAGE_PROTOCOLS = new Set(['blob:', 'http:', 'https:']);
const IMAGE_DIMENSIONS = /\s*=\s*(?:(\d*)x(\d*)|x(\d+)|(\d+)x)\s*$/u;

/** Converts Markdown into a renderer-independent, safe document model. */
export class MarkdownParser {
    // #region Fields

    private readonly _blockquoteProcessor = new BlockquoteProcessor();
    private readonly _codeBlockProcessor = new CodeBlockProcessor();
    private readonly _marked: Marked;

    // #endregion

    // #region Ctor

    public constructor() {
        this._marked = new Marked({ gfm: true });
        this._marked.use({
            extensions: [
                new SplitProcessor().extension,
                new CalloutProcessor().extension,
                this._blockquoteProcessor.extension,
                this._codeBlockProcessor.extension,
                new TabProcessor().extension,
                new StepsProcessor().extension,
                new DetailsProcessor().extension,
                new ButtonProcessor().extension,
                new CardProcessor().extension,
            ],
        });
    }

    // #endregion

    // #region Properties

    // #endregion

    // #region Methods

    /** Parses source for both document and inline rendering without producing HTML. */
    public parse(source: string, breaks: boolean, standardOnly = false): IMarkdownDocument {
        if (source.length === 0) {
            return { blocks: [], inline: [], fallback: false };
        }

        try {
            this._marked.setOptions({ breaks, gfm: true });

            return {
                blocks: this.parseBlocks(standardOnly ? Lexer.lex(source, { breaks, gfm: true }) : this.lexBlocks(source)),
                inline: this.parseInline(Lexer.lexInline(source, { breaks, gfm: true })),
                fallback: false,
            };
        } catch {
            const inline: ReadonlyArray<MarkdownInlineNode> = [{ type: 'text', text: source }];

            return {
                blocks: [{ type: 'paragraph', children: inline }],
                inline,
                fallback: true,
            };
        }
    }

    private parseBlocks(tokens: ReadonlyArray<Token>): ReadonlyArray<MarkdownNode> {
        const nodes: MarkdownNode[] = [];

        for (const token of tokens) {
            const node = this.parseBlock(token);
            if (node !== null) {
                nodes.push(node);
            }
        }

        return nodes;
    }

    private lexBlocks(source: string): ReadonlyArray<Token> {
        const tokens = this._marked.lexer(source);

        this._marked.walkTokens(tokens, (token): void => this.enrichToken(token));

        return tokens;
    }

    private enrichToken(token: Token): void {
        this._blockquoteProcessor.walkTokens(token as Tokens.Generic);
        this._codeBlockProcessor.walkTokens(token as Tokens.Generic);
    }

    private parseBlock(token: Token): MarkdownNode | null {
        switch (token.type) {
            case 'space':
            case 'def':
                return null;
            case 'heading': {
                const heading = token as Tokens.Heading;

                return {
                    type: 'heading',
                    depth: normalizeHeadingDepth(heading.depth),
                    children: this.parseInline(heading.tokens),
                };
            }
            case 'paragraph': {
                const paragraph = token as Tokens.Paragraph;

                return { type: 'paragraph', children: this.parseInline(paragraph.tokens) };
            }
            case 'text': {
                const text = token as Tokens.Text;

                return {
                    type: 'paragraph',
                    children: text.tokens ? this.parseInline(text.tokens) : [{ type: 'text', text: text.text }],
                };
            }
            case 'hr':
                return { type: 'thematic-break' };
            case 'code': {
                const code = token as ICodeBlockToken;

                return {
                    type: 'code',
                    text: code.text,
                    language: code.meta?.lang ?? code.lang ?? null,
                    fileName: code.meta?.fileName ?? null,
                    highlights: code.meta?.highlights ?? null,
                };
            }
            case 'blockquote': {
                const blockquote = token as IBlockquoteToken;
                const source = blockquote.content ?? blockquote.text ?? '';

                return {
                    type: 'blockquote',
                    variant: blockquote.variant ?? 'neutral',
                    children: this.parseBlocks(this.lexBlocks(source)),
                };
            }
            case 'list': {
                const list = token as Tokens.List;

                return {
                    type: 'list',
                    ordered: list.ordered,
                    start: typeof list.start === 'number' ? list.start : 1,
                    items: list.items.map((item) => ({
                        task: item.task,
                        checked: item.checked === true,
                        children: this.parseBlocks(item.task ? item.tokens.filter((token) => token.type !== 'checkbox') : item.tokens),
                    })),
                };
            }
            case 'table': {
                const table = token as Tokens.Table;

                return {
                    type: 'table',
                    header: table.header.map((cell) => ({
                        align: cell.align,
                        children: this.parseInline(cell.tokens),
                    })),
                    rows: table.rows.map((row) => row.map((cell) => ({ align: cell.align, children: this.parseInline(cell.tokens) }))),
                };
            }
            case 'callout': {
                const callout = token as ICalloutToken;

                return {
                    type: 'callout',
                    variant: callout.variant,
                    title: callout.title ?? null,
                    children: this.parseBlocks(callout.tokens ?? []),
                };
            }
            case 'details': {
                const details = token as IDetailsToken;

                return { type: 'details', title: details.title, children: this.parseBlocks(details.tokens ?? []) };
            }
            case 'md_card': {
                const card = token as ICardToken;

                return {
                    type: 'card',
                    variant: card.variant,
                    title: card.header,
                    subtitle: card.subHeader || null,
                    children: this.parseBlocks(card.tokens ?? []),
                };
            }
            case 'md_button': {
                const button = token as IButtonToken;
                const href = cleanUrl(button.href, SAFE_LINK_PROTOCOLS);

                return href === null
                    ? { type: 'paragraph', children: [{ type: 'text', text: button.label }] }
                    : {
                          type: 'button',
                          variant: button.variant,
                          appearance: button.appearance,
                          label: button.label,
                          href,
                      };
            }
            case 'splits': {
                const splits = token as ISplitsToken;

                return {
                    type: 'splits',
                    items: splits.splits.map((split) => ({
                        variant: split.variant ?? null,
                        title: this.parseInline(split.title),
                        children: this.parseBlocks(split.tokens ?? []),
                    })),
                };
            }
            case 'steps': {
                const steps = token as IStepsToken;

                return {
                    type: 'steps',
                    items: steps.steps.map((step) => ({
                        title: step.title,
                        children: this.parseBlocks(step.tokens ?? []),
                    })),
                };
            }
            case 'tabs': {
                const tabs = token as ITabsToken;

                return {
                    type: 'tabs',
                    items: tabs.tabs.map((tab) => ({
                        variant: tab.variant ?? null,
                        title: tab.title,
                        children: this.parseBlocks(this.lexBlocks(tab.content)),
                    })),
                };
            }
            case 'html':
                return { type: 'paragraph', children: [{ type: 'text', text: token.raw }] };
            default:
                return token.raw.length === 0 ? null : { type: 'paragraph', children: [{ type: 'text', text: token.raw }] };
        }
    }

    private parseInline(tokens: ReadonlyArray<Token>): ReadonlyArray<MarkdownInlineNode> {
        const nodes: MarkdownInlineNode[] = [];

        for (const token of tokens) {
            nodes.push(...this.parseInlineToken(token));
        }

        return nodes;
    }

    private parseInlineToken(token: Token): ReadonlyArray<MarkdownInlineNode> {
        switch (token.type) {
            case 'text': {
                const text = token as Tokens.Text;

                return text.tokens ? this.parseInline(text.tokens) : [{ type: 'text', text: text.text }];
            }
            case 'escape':
                return [{ type: 'text', text: (token as Tokens.Escape).text }];
            case 'strong':
                return [{ type: 'strong', children: this.parseInline((token as Tokens.Strong).tokens) }];
            case 'em':
                return [{ type: 'emphasis', children: this.parseInline((token as Tokens.Em).tokens) }];
            case 'del':
                return [{ type: 'deletion', children: this.parseInline((token as Tokens.Del).tokens) }];
            case 'codespan':
                return [{ type: 'code', text: (token as Tokens.Codespan).text }];
            case 'br':
                return [{ type: 'break' }];
            case 'link': {
                const link = token as Tokens.Link;
                const children = this.parseInline(link.tokens);
                const href = cleanUrl(link.href, SAFE_LINK_PROTOCOLS);

                return href === null ? children : [{ type: 'link', href, title: link.title ?? null, children }];
            }
            case 'image': {
                const image = token as Tokens.Image;
                const dimensions = parseImageDimensions(image.href);
                const src = cleanUrl(dimensions.src, SAFE_IMAGE_PROTOCOLS);

                return src === null
                    ? [{ type: 'text', text: image.text }]
                    : [
                          {
                              type: 'image',
                              src,
                              alt: image.text,
                              title: image.title,
                              width: dimensions.width,
                              height: dimensions.height,
                          },
                      ];
            }
            case 'html':
                return [{ type: 'text', text: token.raw }];
            default:
                return token.raw.length === 0 ? [] : [{ type: 'text', text: token.raw }];
        }
    }

    // #endregion
}

function cleanUrl(value: string, protocols: ReadonlySet<string>): string | null {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
        return null;
    }

    const scheme = /^([a-z][a-z\d+.-]*:)/iu.exec(trimmed)?.[1]?.toLowerCase();
    if (scheme === undefined) {
        return trimmed;
    }

    return protocols.has(scheme) ? trimmed : null;
}

function normalizeHeadingDepth(depth: number): 1 | 2 | 3 | 4 | 5 | 6 {
    return Math.min(6, Math.max(1, depth)) as 1 | 2 | 3 | 4 | 5 | 6;
}

function parseImageDimensions(value: string): {
    readonly src: string;
    readonly width: number | null;
    readonly height: number | null;
} {
    const match = IMAGE_DIMENSIONS.exec(value);

    return {
        src: value.replace(IMAGE_DIMENSIONS, ''),
        width: parseDimension(match?.[1] ?? match?.[4]),
        height: parseDimension(match?.[2] ?? match?.[3]),
    };
}

function parseDimension(value: string | undefined): number | null {
    if (!value) {
        return null;
    }

    const dimension = Number(value);

    return Number.isSafeInteger(dimension) && dimension > 0 ? dimension : null;
}
