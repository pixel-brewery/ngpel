---
title: 'Function: getOptionFilterValue()'
generated: true
editUrl: false
---
# Function: getOptionFilterValue()

```ts
function getOptionFilterValue<TValue>(
   values,
   key,
   allowedValues
): TValue | undefined;
```

Defined in: [libs/ui/src/components/filter-bar/filterValues.ts:94](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/filterValues.ts#L94)

Resolves an option value when it is part of the allowed backend enum values.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-tvalue"></a> `TValue` *extends* `string` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `values` | [`FilterValues`](TypeAlias.FilterValues) |
| `key` | `string` |
| `allowedValues` | readonly `TValue`[] |

## Returns

`TValue` \| `undefined`
