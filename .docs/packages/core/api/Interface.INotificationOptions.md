---
title: 'Interface: INotificationOptions'
generated: true
editUrl: false
---
# Interface: INotificationOptions

Defined in: [notification/models/INotificationOptions.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotificationOptions.ts#L14)

The parts of an [INotificationMessage](Interface.INotificationMessage) the typed convenience methods of
[NotificationService](Class.NotificationService) do not take positionally.

## Properties

### duration?

```ts
readonly duration?: NotificationDuration;
```

Defined in: [notification/models/INotificationOptions.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotificationOptions.ts#L20)

Symbolic lifetime; defaults to `'short'`.

***

### silent?

```ts
readonly silent?: boolean;
```

Defined in: [notification/models/INotificationOptions.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotificationOptions.ts#L25)

When `true` the message reaches the interceptors but is not kept in the history.

***

### subTitle?

```ts
readonly subTitle?: NotificationText;
```

Defined in: [notification/models/INotificationOptions.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotificationOptions.ts#L30)

Optional secondary headline.
