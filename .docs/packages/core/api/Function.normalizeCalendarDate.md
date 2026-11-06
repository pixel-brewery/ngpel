---
title: 'Function: normalizeCalendarDate()'
generated: true
editUrl: false
---
# Function: normalizeCalendarDate()

```ts
function normalizeCalendarDate(value): string | undefined;
```

Defined in: [date/normalizeCalendarDate.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/date/normalizeCalendarDate.ts#L14)

Normalizes a date-only value or legacy calendar date-time to `YYYY-MM-DD`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` \| `null` \| `undefined` | Stored calendar date. |

## Returns

`string` \| `undefined`

The normalized day or `undefined` when the input is empty or invalid.
