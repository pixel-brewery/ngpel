---
title: 'Function: toCalendarDate()'
generated: true
editUrl: false
---
# Function: toCalendarDate()

```ts
function toCalendarDate(value): string | undefined;
```

Defined in: [date/toCalendarDate.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/date/toCalendarDate.ts#L14)

Formats the local calendar day shown by a date control as `YYYY-MM-DD`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `Date` | Date from the control. |

## Returns

`string` \| `undefined`

The calendar day or `undefined` for an invalid date.
