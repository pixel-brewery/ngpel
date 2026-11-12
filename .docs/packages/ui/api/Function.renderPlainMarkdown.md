---
title: 'Function: renderPlainMarkdown()'
generated: true
editUrl: false
---
# Function: renderPlainMarkdown()

```ts
function renderPlainMarkdown(text, breaks?): string;
```

Defined in: [libs/ui/src/markdown/rendering/renderPlainMarkdown.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/markdown/rendering/renderPlainMarkdown.ts#L78)

Renders untrusted GitHub-flavored Markdown to plain HTML. A dense preview wants a few clipped
lines of text rather than the element compositions the default renderer builds, and a host's
own HTML sanitizer stays active on this path because no custom elements are involved.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `text` | `string` | `undefined` | The Markdown source. |
| `breaks?` | `boolean` | `false` | Whether single newlines become line breaks. |

## Returns

`string`

The rendered HTML.
