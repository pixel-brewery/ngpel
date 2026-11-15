---
title: 'Function: endOfLocalDay()'
generated: true
editUrl: false
---
# Function: endOfLocalDay()

```ts
function endOfLocalDay(day): string | undefined;
```

Defined in: [date/endOfLocalDay.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/date/endOfLocalDay.ts#L14)

Resolves the last millisecond of a local calendar day as an RFC 3339 date-time with the local offset.

Use it for the inclusive upper bound of a filter that lets the user pick days for a point-in-time field, such as
"created until". A day of 23 or 25 hours at a daylight-saving change is covered completely.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `day` | `string` \| `Date` | Calendar day. |

## Returns

`string` \| `undefined`

The last instant of the day, or `undefined` when the value is no date.
