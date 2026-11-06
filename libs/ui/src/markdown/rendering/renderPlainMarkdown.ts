// #region Imports

import { Marked, Renderer, type Tokens } from 'marked';
import { escapeMarkdownAttribute } from '../escaping/escapeMarkdownAttribute';
import { cleanExternalUrl } from './cleanExternalUrl';
import { TextOnlyHtmlTokenizer } from './TextOnlyHtmlTokenizer';

// #endregion

/**
 * Emits links as external anchors and drops anything that is not http(s).
 */
class ExternalLinkRenderer extends Renderer {
    // #region Methods

    /**
     * Renders a link token as an anchor opening in a new context, or as its bare label when the
     * target is not http(s).
     *
     * @param token The link token.
     * @returns The rendered markup.
     */
    public override link(token: Tokens.Link): string {
        const text = this.parser.parseInline(token.tokens ?? []);
        const href = cleanExternalUrl(token.href);

        if (href === null) {
            return text;
        }

        const title = token.title ? ` title="${escapeMarkdownAttribute(token.title)}"` : '';

        return `<a href="${escapeMarkdownAttribute(href)}" target="_blank" rel="noopener noreferrer"${title}>${text}</a>`;
    }

    // #endregion
}

/**
 * The plain `marked` instance together with the renderer and tokenizer it parses with. Both
 * travel as parse options: `Marked.use` copies renderer members with `for...in`, which never sees
 * the non-enumerable methods of a class instance.
 */
interface IPlainMarkdownPipeline {
    readonly parser: Marked;
    readonly renderer: ExternalLinkRenderer;
    readonly tokenizer: TextOnlyHtmlTokenizer;
}

let pipeline: IPlainMarkdownPipeline | undefined;

/**
 * Builds the plain pipeline on first use and memoizes it, so importing the module stays free of
 * side effects.
 */
function getPipeline(): IPlainMarkdownPipeline {
    if (pipeline === undefined) {
        pipeline = {
            parser: new Marked(),
            renderer: new ExternalLinkRenderer(),
            tokenizer: new TextOnlyHtmlTokenizer(),
        };
    }

    return pipeline;
}

/**
 * Renders untrusted GitHub-flavored Markdown to plain HTML. A dense preview wants a few clipped
 * lines of text rather than the element compositions the default renderer builds, and a host's
 * own HTML sanitizer stays active on this path because no custom elements are involved.
 *
 * @public
 * @param text The Markdown source.
 * @param breaks Whether single newlines become line breaks.
 * @returns The rendered HTML.
 */
export function renderPlainMarkdown(text: string, breaks = false): string {
    const { parser, renderer, tokenizer } = getPipeline();

    return parser.parse(text, { async: false, breaks, gfm: true, renderer, tokenizer });
}
