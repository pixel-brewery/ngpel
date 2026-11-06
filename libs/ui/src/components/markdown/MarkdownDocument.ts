// #region Imports

import type { MarkdownInlineNode } from './MarkdownInlineNode';
import type { MarkdownNode } from './MarkdownNode';

// #endregion

/**
 * Safe, normalized Markdown document consumed by the Angular renderer.
 *
 * @public
 */
export interface IMarkdownDocument {
    readonly blocks: ReadonlyArray<MarkdownNode>;
    readonly inline: ReadonlyArray<MarkdownInlineNode>;
    readonly fallback: boolean;
}
