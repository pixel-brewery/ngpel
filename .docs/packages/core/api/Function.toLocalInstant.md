---
title: 'Function: toLocalInstant()'
generated: true
editUrl: false
---
# Function: toLocalInstant()

```ts
function toLocalInstant(value): string | undefined;
```

Defined in: date/toLocalInstant.ts:16

Formats an instant as an RFC 3339 date-time with the browser's local offset, e.g.
`2026-09-15T00:00:00.000+02:00`.

The value names exactly the same instant as `toISOString()` and additionally keeps the user's local wall-clock time
and offset, which the API accepts for every point in time.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `Date` | Instant. |

## Returns

`string` \| `undefined`

The date-time with offset, or `undefined` for an invalid date.
