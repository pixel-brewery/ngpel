---
title: 'Function: byteSize()'
generated: true
editUrl: false
---
# Function: byteSize()

```ts
function byteSize(
   value,
   fallback?,
   locale?
): string;
```

Defined in: [libs/ui/src/pipes/bytes/byteSize.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/bytes/byteSize.ts#L27)

Formats a byte count as a human readable size.

Storage allowances are published in gigabytes while consumption is measured in bytes, so a fixed
unit would either drown small values in zeroes or truncate large ones. The unit is therefore
chosen per value and the precision shrinks as the number grows: `1536` becomes `1.5 KB`,
`52428800` becomes `50 MB`.

Exported as a function as well as through [BytesPipe](Class.BytesPipe), so text assembled outside a template
states a size exactly the way the templates do.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `value` | `number` \| `null` \| `undefined` | `undefined` | The number of bytes. |
| `fallback?` | `string` | `'0 B'` | The text for an unknown size, that is `null`, `undefined` or a non-finite number (defaults to `0 B`). |
| `locale?` | `string` | `undefined` | The locale for number formatting. Omitting it preserves the plain decimal representation. |

## Returns

`string`

The formatted size.
