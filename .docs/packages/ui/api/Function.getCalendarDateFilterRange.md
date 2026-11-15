---
title: 'Function: getCalendarDateFilterRange()'
generated: true
editUrl: false
---
# Function: getCalendarDateFilterRange()

```ts
function getCalendarDateFilterRange(values, key): IDateFilterRange;
```

Defined in: libs/ui/src/components/filter-bar/getCalendarDateFilterRange.ts:14

Resolves a calendar-day filter to the selected `YYYY-MM-DD` value at both bounds.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `values` | [`FilterValues`](TypeAlias.FilterValues) | Current filter values. |
| `key` | `string` | The calendar-day field key. |

## Returns

[`IDateFilterRange`](Interface.IDateFilterRange)

Equal date-only bounds, or an empty range if the day is missing or invalid.
