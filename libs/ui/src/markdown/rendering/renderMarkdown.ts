// #region Imports

import { BlockquoteProcessor, CodeBlockProcessor } from '@pixel-brewery/markdowner-core';
import { Marked, type Token } from 'marked';
import { createMarkdownExtensions } from './createMarkdownExtensions';
import { createMarkedRenderer } from './createMarkedRenderer';
import { TextOnlyHtmlTokenizer } from './TextOnlyHtmlTokenizer';

// #endregion

/**
 * The configured `marked` instance together with the tokenizer it parses with. The tokenizer
 * travels as a parse option: `Marked.use` copies tokenizer members with `for...in`, which never
 * sees the non-enumerable methods of a class instance.
 */
interface IMarkdownPipeline {
    readonly parser: Marked;
    readonly tokenizer: TextOnlyHtmlTokenizer;
}

let pipeline: IMarkdownPipeline | undefined;

/**
 * Builds the pipeline on first use and memoizes it. One configured instance is shared by every
 * call: registering the extensions on the global `marked` export would stack another copy of
 * every extension per registration, and building it at module scope would be a side effect.
 */
function getPipeline(): IMarkdownPipeline {
    if (pipeline === undefined) {
        const blockquoteProcessor = new BlockquoteProcessor();
        const codeBlockProcessor = new CodeBlockProcessor();

        pipeline = {
            tokenizer: new TextOnlyHtmlTokenizer(),
            parser: new Marked({
                renderer: createMarkedRenderer(),
                extensions: createMarkdownExtensions((source: string) => renderMarkdown(source)),
                walkTokens: (token: Token): void => {
                    blockquoteProcessor.walkTokens(token);
                    codeBlockProcessor.walkTokens(token);
                },
            }),
        };
    }

    return pipeline;
}

/**
 * Renders untrusted GitHub-flavored Markdown into Mosaik element markup without raw HTML
 * pass-through: embedded HTML degrades to literal text, every interpolated value is escaped for
 * the attribute it lands in and only http(s) targets become links.
 *
 * @public
 * @param text The Markdown source.
 * @param breaks Whether single newlines become line breaks.
 * @returns The rendered markup.
 */
export function renderMarkdown(text: string, breaks = false): string {
    const { parser, tokenizer } = getPipeline();

    return parser.parse(text, { async: false, breaks, gfm: true, tokenizer });
}
