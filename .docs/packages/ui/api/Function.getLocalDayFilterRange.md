---
title: 'Function: getLocalDayFilterRange()'
generated: true
editUrl: false
---
# Function: getLocalDayFilterRange()

```ts
function getLocalDayFilterRange(values, key): IDateFilterRange;
```

Defined in: [libs/ui/src/components/filter-bar/getLocalDayFilterRange.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/getLocalDayFilterRange.ts#L15)

Resolves a filter on an instant to the inclusive boundaries of the selected browser-local day.
Each boundary is an RFC 3339 date-time with its own local offset.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `values` | [`FilterValues`](TypeAlias.FilterValues) | Current filter values. |
| `key` | `string` | The instant field key. |

## Returns

[`IDateFilterRange`](Interface.IDateFilterRange)

Inclusive local day bounds, or an empty range if the day is missing or invalid.
