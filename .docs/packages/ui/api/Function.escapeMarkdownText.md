---
title: 'Function: escapeMarkdownText()'
generated: true
editUrl: false
---
# Function: escapeMarkdownText()

```ts
function escapeMarkdownText(value): string;
```

Defined in: [libs/ui/src/markdown/escaping/escapeMarkdownText.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/markdown/escaping/escapeMarkdownText.ts#L18)

Escapes untrusted Markdown source for a `text` attribute that the receiving element renders as
HTML (Mosaik elements put such values on screen through `unsafeHTML`). The HTML parser already
consumes one level of escaping while parsing the attribute, so a single pass would hand live
markup to the element. Escaping twice makes embedded HTML arrive as the literal characters a
reader is supposed to see.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The untrusted value that lands in an HTML-rendering attribute. |

## Returns

`string`

The value escaped twice.
