---
title: 'Function: colorFromString()'
generated: true
editUrl: false
---
# Function: colorFromString()

```ts
function colorFromString(value): string;
```

Defined in: [libs/ui/src/pipes/color/colorFromString.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/color/colorFromString.ts#L24)

Derives a stable colour from text, so the same tenant, tag or user always shows the same tint
without anybody storing a colour for it.

The text is hashed with FNV-1a and the hash is spread over the full hue circle at a mid
saturation and lightness, which keeps every generated colour legible next to its neighbours.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The text to derive the colour from. |

## Returns

`string`

The colour as a `#rrggbb` string.
