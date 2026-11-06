---
title: 'Function: fromCalendarDate()'
generated: true
editUrl: false
---
# Function: fromCalendarDate()

```ts
function fromCalendarDate(value): Date | null;
```

Defined in: [date/fromCalendarDate.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/date/fromCalendarDate.ts#L17)

Creates the local date shown by a date control for a stored calendar day.

Accepts `YYYY-MM-DD` and legacy date-times. A date-time at midnight UTC uses its UTC day.
Other date-times are interpreted in the browser's local time zone.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` \| `null` \| `undefined` | Stored calendar date. |

## Returns

`Date` \| `null`

The local date or `null` when the input is empty or invalid.
