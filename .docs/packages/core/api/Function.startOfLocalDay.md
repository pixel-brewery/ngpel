---
title: 'Function: startOfLocalDay()'
generated: true
editUrl: false
---
# Function: startOfLocalDay()

```ts
function startOfLocalDay(day): string | undefined;
```

Defined in: date/startOfLocalDay.ts:14

Resolves the first instant of a local calendar day as an RFC 3339 date-time with the local offset.

Use it for the lower bound of a filter that lets the user pick days for a point-in-time field, such as "created
from". The day comes from a date control (`Date`) or in its transport form `YYYY-MM-DD`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `day` | `string` \| `Date` | Calendar day. |

## Returns

`string` \| `undefined`

The first instant of the day, or `undefined` when the value is no date.
