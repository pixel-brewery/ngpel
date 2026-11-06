---
title: 'Function: notificationDurationToMilliseconds()'
generated: true
editUrl: false
---
# Function: notificationDurationToMilliseconds()

```ts
function notificationDurationToMilliseconds(duration): number;
```

Defined in: [notification/models/notificationDurationToMilliseconds.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/notificationDurationToMilliseconds.ts#L23)

Resolves a symbolic [NotificationDuration](TypeAlias.NotificationDuration) to its lifetime in milliseconds. The mapping is
total: everything that is not `'long'` resolves to the short lifetime, so a value that survived
an untyped boundary can never produce a notification without a lifetime.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `duration` | [`NotificationDuration`](TypeAlias.NotificationDuration) | The symbolic duration. |

## Returns

`number`

[LONG\_DURATION](Variable.LONG_DURATION) for `'long'`, otherwise [SHORT\_DURATION](Variable.SHORT_DURATION).

## Example

```typescript
const timeout = notificationDurationToMilliseconds('long');
```
