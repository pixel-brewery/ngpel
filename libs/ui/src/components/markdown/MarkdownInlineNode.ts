/**
 * Framework-independent inline content understood by the Markdown renderer.
 *
 * @public
 */
export type MarkdownInlineNode =
    | { readonly type: 'text'; readonly text: string }
    | { readonly type: 'strong'; readonly children: ReadonlyArray<MarkdownInlineNode> }
    | { readonly type: 'emphasis'; readonly children: ReadonlyArray<MarkdownInlineNode> }
    | { readonly type: 'deletion'; readonly children: ReadonlyArray<MarkdownInlineNode> }
    | { readonly type: 'code'; readonly text: string }
    | { readonly type: 'break' }
    | {
          readonly type: 'link';
          readonly href: string;
          readonly title: string | null;
          readonly children: ReadonlyArray<MarkdownInlineNode>;
      }
    | {
          readonly type: 'image';
          readonly src: string;
          readonly alt: string;
          readonly title: string | null;
          readonly width: number | null;
          readonly height: number | null;
      };
