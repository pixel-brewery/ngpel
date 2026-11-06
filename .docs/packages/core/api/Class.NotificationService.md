---
title: 'Class: NotificationService'
generated: true
editUrl: false
---
# Class: NotificationService

Defined in: [notification/services/NotificationService.ts:64](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationService.ts#L64)

Raises notifications and fans them out to every composed [INotificationInterceptor](Interface.INotificationInterceptor).

Raising is idempotent within a notification's own lifetime: an identical message pushed again
while the first one is still alive returns that first notification instead of raising a second
one, which keeps a retry loop from flooding the user. Everything that is not `silent` is kept in
a history a product can render through [NotificationService.all](#all) and
[NotificationService.changed](#changed).

Register it with `provideNotification()`.

## Constructors

### Constructor

```ts
new NotificationService(): NotificationService;
```

Defined in: [notification/services/NotificationService.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationService.ts#L80)

Constructs a new instance of the `NotificationService` class. The sinks are the ones
registered on `NOTIFICATION_INTERCEPTORS`, and none when no interceptor feature was composed.

#### Returns

`NotificationService`

## Accessors

### changed

#### Get Signature

```ts
get changed(): Observable<IReactiveCacheChange<INotification>>;
```

Defined in: [notification/services/NotificationService.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationService.ts#L95)

Emits after every change of the notification history.

##### Returns

`Observable`\<[`IReactiveCacheChange`](Interface.IReactiveCacheChange)\<[`INotification`](Interface.INotification)\>\>

## Methods

### all()

```ts
all(): readonly INotification[];
```

Defined in: [notification/services/NotificationService.ts:231](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationService.ts#L231)

Returns the kept notifications, newest first.

#### Returns

readonly [`INotification`](Interface.INotification)[]

***

### push()

```ts
push(message): INotification;
```

Defined in: [notification/services/NotificationService.ts:185](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationService.ts#L185)

Materializes a message and hands it to every composed interceptor.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | [`INotificationMessage`](Interface.INotificationMessage) | The message to raise. |

#### Returns

[`INotification`](Interface.INotification)

The raised notification, or the still-alive identical one, which reached no
interceptor a second time.

***

### remove()

```ts
remove(id?): void;
```

Defined in: [notification/services/NotificationService.ts:218](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationService.ts#L218)

Removes one notification from the history, or clears it entirely.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id?` | `string` | Identifier of the notification to remove; omit it to clear the history. |

#### Returns

`void`

***

### showError()

```ts
showError(
   title,
   content,
   options?
): INotification;
```

Defined in: [notification/services/NotificationService.ts:138](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationService.ts#L138)

Raises an error notification.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `title` | [`NotificationText`](TypeAlias.NotificationText) | Headline of the message. |
| `content` | [`NotificationText`](TypeAlias.NotificationText) | Main text of the message. |
| `options?` | [`INotificationOptions`](Interface.INotificationOptions) | Lifetime, history and sub-title overrides. |

#### Returns

[`INotification`](Interface.INotification)

The raised notification, or the still-alive identical one.

***

### showInfo()

```ts
showInfo(
   title,
   content,
   options?
): INotification;
```

Defined in: [notification/services/NotificationService.ts:112](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationService.ts#L112)

Raises an informational notification.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `title` | [`NotificationText`](TypeAlias.NotificationText) | Headline of the message. |
| `content` | [`NotificationText`](TypeAlias.NotificationText) | Main text of the message. |
| `options?` | [`INotificationOptions`](Interface.INotificationOptions) | Lifetime, history and sub-title overrides. |

#### Returns

[`INotification`](Interface.INotification)

The raised notification, or the still-alive identical one.

***

### showSignalValidationError()

```ts
showSignalValidationError(
   issues,
   fallbackTitle,
   content,
   options?
): INotification;
```

Defined in: [notification/services/NotificationService.ts:167](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationService.ts#L167)

Raises an error notification headed by the first user-facing message a set of Signal Forms
validation issues carries, so a submit failure names the actual problem instead of a generic
caption. Falls back to `fallbackTitle` when no issue exposes a readable message.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `issues` | readonly [`ISignalValidationIssueLike`](Interface.ISignalValidationIssueLike)[] | The validation issues of the rejected form. |
| `fallbackTitle` | [`NotificationText`](TypeAlias.NotificationText) | Headline used when no issue carries a readable message. |
| `content` | [`NotificationText`](TypeAlias.NotificationText) | Main text of the message. |
| `options?` | [`INotificationOptions`](Interface.INotificationOptions) | Lifetime, history and sub-title overrides. |

#### Returns

[`INotification`](Interface.INotification)

The raised notification, or the still-alive identical one.

***

### showSuccess()

```ts
showSuccess(
   title,
   content,
   options?
): INotification;
```

Defined in: [notification/services/NotificationService.ts:151](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationService.ts#L151)

Raises a success notification.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `title` | [`NotificationText`](TypeAlias.NotificationText) | Headline of the message. |
| `content` | [`NotificationText`](TypeAlias.NotificationText) | Main text of the message. |
| `options?` | [`INotificationOptions`](Interface.INotificationOptions) | Lifetime, history and sub-title overrides. |

#### Returns

[`INotification`](Interface.INotification)

The raised notification, or the still-alive identical one.

***

### showWarning()

```ts
showWarning(
   title,
   content,
   options?
): INotification;
```

Defined in: [notification/services/NotificationService.ts:125](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationService.ts#L125)

Raises a warning notification.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `title` | [`NotificationText`](TypeAlias.NotificationText) | Headline of the message. |
| `content` | [`NotificationText`](TypeAlias.NotificationText) | Main text of the message. |
| `options?` | [`INotificationOptions`](Interface.INotificationOptions) | Lifetime, history and sub-title overrides. |

#### Returns

[`INotification`](Interface.INotification)

The raised notification, or the still-alive identical one.
