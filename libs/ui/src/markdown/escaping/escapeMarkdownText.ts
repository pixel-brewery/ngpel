// #region Imports

import { escapeMarkdownAttribute } from './escapeMarkdownAttribute';

// #endregion

/**
 * Escapes untrusted Markdown source for a `text` attribute that the receiving element renders as
 * HTML (Mosaik elements put such values on screen through `unsafeHTML`). The HTML parser already
 * consumes one level of escaping while parsing the attribute, so a single pass would hand live
 * markup to the element. Escaping twice makes embedded HTML arrive as the literal characters a
 * reader is supposed to see.
 *
 * @public
 * @param value The untrusted value that lands in an HTML-rendering attribute.
 * @returns The value escaped twice.
 */
export function escapeMarkdownText(value: string): string {
    return escapeMarkdownAttribute(escapeMarkdownAttribute(value));
}
