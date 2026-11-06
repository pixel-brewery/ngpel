---
title: 'Function: createMarkdownExtensions()'
generated: true
editUrl: false
---
# Function: createMarkdownExtensions()

```ts
function createMarkdownExtensions(parseMarkdown): TokenizerAndRendererExtension[];
```

Defined in: [libs/ui/src/markdown/rendering/createMarkdownExtensions.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/markdown/rendering/createMarkdownExtensions.ts#L38)

The authored Markdown dialect that `@pixel-brewery/markdowner-core` adds on top of
GitHub-flavored Markdown, rendered as Mosaik element compositions: `::: splits`, `::: callout`,
`> [!TYPE]`, fenced code, `::: tabs`, `::: steps`, `::: details`, `::: button` and `::: card`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parseMarkdown` | (`source`) => `string` | Renders a nested Markdown source with the same configured pipeline. |

## Returns

`TokenizerAndRendererExtension`[]

The nine tokenizer/renderer extensions to register on a `Marked` instance.
