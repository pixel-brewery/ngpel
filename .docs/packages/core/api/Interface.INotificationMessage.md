---
title: 'Interface: INotificationMessage'
generated: true
editUrl: false
---
# Interface: INotificationMessage

Defined in: [notification/models/INotificationMessage.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotificationMessage.ts#L15)

What a caller hands to [NotificationService.push](Class.NotificationService#push): the raw message, before an id, a
timestamp and a resolved lifetime turn it into an [INotification](Interface.INotification).

## Properties

### content

```ts
readonly content: NotificationText;
```

Defined in: [notification/models/INotificationMessage.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotificationMessage.ts#L31)

Main text of the message.

***

### detail?

```ts
readonly detail?: NotificationText;
```

Defined in: [notification/models/INotificationMessage.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotificationMessage.ts#L36)

Optional diagnostic detail such as a correlation id.

***

### duration?

```ts
readonly duration?: NotificationDuration;
```

Defined in: [notification/models/INotificationMessage.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotificationMessage.ts#L51)

Symbolic lifetime; defaults to `'short'`.

***

### silent?

```ts
readonly silent?: boolean;
```

Defined in: [notification/models/INotificationMessage.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotificationMessage.ts#L46)

When `true` the message reaches the interceptors but is not kept in the history.

***

### subTitle?

```ts
readonly subTitle?: NotificationText;
```

Defined in: [notification/models/INotificationMessage.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotificationMessage.ts#L26)

Optional secondary headline.

***

### title

```ts
readonly title: NotificationText;
```

Defined in: [notification/models/INotificationMessage.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotificationMessage.ts#L21)

Headline of the message.

***

### type?

```ts
readonly type?: NotificationType;
```

Defined in: [notification/models/INotificationMessage.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotificationMessage.ts#L41)

Severity of the message; defaults to [NotificationType.None](Variable.NotificationType#property-none).
