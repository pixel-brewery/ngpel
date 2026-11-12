---
title: 'Interface: INotification'
generated: true
editUrl: false
---
# Interface: INotification

Defined in: [notification/models/INotification.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotification.ts#L16)

A raised notification. It is what [NotificationService](Class.NotificationService) materializes from an
[INotificationMessage](Interface.INotificationMessage) and hands to every interceptor: identified, timestamped and with
every text normalized to a signal, so an interceptor never has to know whether the caller passed
a string or a reactive caption.

## Properties

### body

```ts
readonly body: Signal<string>;
```

Defined in: [notification/models/INotification.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotification.ts#L42)

Main text of the notification.

***

### detail?

```ts
readonly detail?: Signal<string>;
```

Defined in: [notification/models/INotification.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotification.ts#L47)

Diagnostic detail such as a correlation id, shown only where there is room for it.

***

### duration

```ts
readonly duration: number;
```

Defined in: [notification/models/INotification.ts:52](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotification.ts#L52)

Lifetime in milliseconds, resolved from the message's symbolic duration.

***

### id

```ts
readonly id: string;
```

Defined in: [notification/models/INotification.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotification.ts#L22)

Identifier unique to this notification, used to remove it from the history again.

***

### subTitle

```ts
readonly subTitle: Signal<string>;
```

Defined in: [notification/models/INotification.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotification.ts#L37)

Secondary headline; empty when the message stated none.

***

### timeStamp

```ts
readonly timeStamp: Date;
```

Defined in: [notification/models/INotification.ts:57](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotification.ts#L57)

Moment the notification was raised.

***

### title

```ts
readonly title: Signal<string>;
```

Defined in: [notification/models/INotification.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotification.ts#L32)

Headline of the notification.

***

### type

```ts
readonly type: NotificationType;
```

Defined in: [notification/models/INotification.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/models/INotification.ts#L27)

Severity of the notification.
