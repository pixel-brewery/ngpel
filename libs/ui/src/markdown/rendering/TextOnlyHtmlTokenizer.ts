// #region Imports

import { Tokenizer } from 'marked';

// #endregion

/**
 * Drops raw HTML tokens so embedded markup falls back to plain text. The pipeline renders content
 * that nobody in the consuming application authored, and the elements the default renderer emits
 * put their `text` on screen through `unsafeHTML`. Refusing the tokens is what keeps that path
 * inert; escaping the Markdown source instead would corrupt code fences, where the escapes are
 * literal content.
 *
 * @public
 */
export class TextOnlyHtmlTokenizer extends Tokenizer {
    // #region Methods

    /**
     * Refuses block-level HTML so it is lexed as paragraph text instead.
     *
     * @public
     * @returns Always `undefined`.
     */
    public override html(): undefined {
        return undefined;
    }

    /**
     * Refuses inline HTML tags so they are lexed as inline text instead.
     *
     * @public
     * @returns Always `undefined`.
     */
    public override tag(): undefined {
        return undefined;
    }

    // #endregion
}
