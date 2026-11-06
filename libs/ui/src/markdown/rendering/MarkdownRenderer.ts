// #region Imports

import type { Renderer } from 'marked';

// #endregion

/**
 * The subset of `marked`'s renderer that this package overrides with element markup.
 *
 * @public
 */
export type MarkdownRenderer = Partial<Omit<Renderer, 'options' | 'constructor'>>;
