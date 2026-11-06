---
title: 'Function: renderMarkdown()'
generated: true
editUrl: false
---
# Function: renderMarkdown()

```ts
function renderMarkdown(text, breaks?): string;
```

Defined in: [libs/ui/src/markdown/rendering/renderMarkdown.ts:59](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/markdown/rendering/renderMarkdown.ts#L59)

Renders untrusted GitHub-flavored Markdown into Mosaik element markup without raw HTML
pass-through: embedded HTML degrades to literal text, every interpolated value is escaped for
the attribute it lands in and only http(s) targets become links.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `text` | `string` | `undefined` | The Markdown source. |
| `breaks` | `boolean` | `false` | Whether single newlines become line breaks. |

## Returns

`string`

The rendered markup.
