---
title: 'Function: escapeMarkdownAttribute()'
generated: true
editUrl: false
---
# Function: escapeMarkdownAttribute()

```ts
function escapeMarkdownAttribute(value): string;
```

Defined in: [libs/ui/src/markdown/escaping/escapeMarkdownAttribute.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/markdown/escaping/escapeMarkdownAttribute.ts#L11)

Escapes an untrusted value for one HTML attribute of the generated markup. The ampersand is
escaped first so the entities produced by the later replacements are not escaped a second time.
Elements that treat their `text` attribute as plain content need exactly this single pass,
because the HTML parser decodes the attribute once before the element ever sees it.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The untrusted value that lands in an attribute. |

## Returns

`string`

The value with `&`, `"`, `'`, `<` and `>` replaced by their entities.
