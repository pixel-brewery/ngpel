// #region Imports

import type { MarkdownInlineNode } from './MarkdownInlineNode';

// #endregion

/**
 * Framework-independent block content understood by the Markdown renderer.
 *
 * @public
 */
export type MarkdownNode =
    | {
          readonly type: 'heading';
          readonly depth: 1 | 2 | 3 | 4 | 5 | 6;
          readonly children: ReadonlyArray<MarkdownInlineNode>;
      }
    | { readonly type: 'paragraph'; readonly children: ReadonlyArray<MarkdownInlineNode> }
    | { readonly type: 'thematic-break' }
    | {
          readonly type: 'code';
          readonly text: string;
          readonly language: string | null;
          readonly fileName: string | null;
          readonly highlights: string | null;
      }
    | {
          readonly type: 'blockquote';
          readonly variant: string;
          readonly children: ReadonlyArray<MarkdownNode>;
      }
    | {
          readonly type: 'list';
          readonly ordered: boolean;
          readonly start: number;
          readonly items: ReadonlyArray<{
              readonly task: boolean;
              readonly checked: boolean;
              readonly children: ReadonlyArray<MarkdownNode>;
          }>;
      }
    | {
          readonly type: 'table';
          readonly header: ReadonlyArray<{
              readonly align: 'center' | 'left' | 'right' | null;
              readonly children: ReadonlyArray<MarkdownInlineNode>;
          }>;
          readonly rows: ReadonlyArray<
              ReadonlyArray<{
                  readonly align: 'center' | 'left' | 'right' | null;
                  readonly children: ReadonlyArray<MarkdownInlineNode>;
              }>
          >;
      }
    | {
          readonly type: 'callout';
          readonly variant: string;
          readonly title: string | null;
          readonly children: ReadonlyArray<MarkdownNode>;
      }
    | {
          readonly type: 'details';
          readonly title: string;
          readonly children: ReadonlyArray<MarkdownNode>;
      }
    | {
          readonly type: 'card';
          readonly variant: string;
          readonly title: string;
          readonly subtitle: string | null;
          readonly children: ReadonlyArray<MarkdownNode>;
      }
    | {
          readonly type: 'button';
          readonly variant: string;
          readonly appearance: string;
          readonly label: string;
          readonly href: string;
      }
    | {
          readonly type: 'splits';
          readonly items: ReadonlyArray<{
              readonly variant: string | null;
              readonly title: ReadonlyArray<MarkdownInlineNode>;
              readonly children: ReadonlyArray<MarkdownNode>;
          }>;
      }
    | {
          readonly type: 'steps';
          readonly items: ReadonlyArray<{
              readonly title: string;
              readonly children: ReadonlyArray<MarkdownNode>;
          }>;
      }
    | {
          readonly type: 'tabs';
          readonly items: ReadonlyArray<{
              readonly variant: string | null;
              readonly title: string;
              readonly children: ReadonlyArray<MarkdownNode>;
          }>;
      };
