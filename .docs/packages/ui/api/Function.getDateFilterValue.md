---
title: 'Function: getDateFilterValue()'
generated: true
editUrl: false
---
# Function: getDateFilterValue()

```ts
function getDateFilterValue(values, key): unknown;
```

Defined in: [libs/ui/src/components/filter-bar/filterValues.ts:127](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/filterValues.ts#L127)

Reads the raw selected value of a date filter from a simple filter or the first matching
equality or on-date rule in an advanced filter. Callers choose how to interpret the stored date.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `values` | [`FilterValues`](TypeAlias.FilterValues) | Current filter values. |
| `key` | `string` | The date field key. |

## Returns

`unknown`

The selected value, if present.
