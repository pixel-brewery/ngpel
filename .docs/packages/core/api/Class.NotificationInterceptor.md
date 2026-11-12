---
title: 'Abstract Class: NotificationInterceptor\<TConfig\>'
generated: true
editUrl: false
---
# Abstract Class: NotificationInterceptor\<TConfig\>

Defined in: [notification/interception/NotificationInterceptor.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/NotificationInterceptor.ts#L20)

Base class for a notification sink. It owns the configuration handshake so a subclass only has to
answer [NotificationInterceptor.push](#push): the composing `with*` factory calls
[NotificationInterceptor.configure](#configure) once, and the options are readable from
[NotificationInterceptor.config](#config) afterwards.

A subclass that holds browser resources overrides [NotificationInterceptor.dispose](#dispose); one
that holds none inherits the no-op.

## Extended by

- [`AudioNotificationInterceptor`](Class.AudioNotificationInterceptor)
- [`ConsoleNotificationInterceptor`](Class.ConsoleNotificationInterceptor)

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tconfig"></a> `TConfig` *extends* `object` | `object` | Shape of the options the composing `with*` factory passes in. |

## Implements

- [`INotificationInterceptor`](Interface.INotificationInterceptor)\<`TConfig`\>

## Constructors

### Constructor

```ts
protected new NotificationInterceptor<TConfig>(): NotificationInterceptor<TConfig>;
```

Defined in: [notification/interception/NotificationInterceptor.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/NotificationInterceptor.ts#L34)

Constructs a new instance of the `NotificationInterceptor` class in its unconfigured state.

#### Returns

`NotificationInterceptor`\<`TConfig`\>

## Accessors

### config

#### Get Signature

```ts
get protected config(): TConfig | null;
```

Defined in: [notification/interception/NotificationInterceptor.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/NotificationInterceptor.ts#L47)

The applied options, or `null` while the interceptor is unconfigured.

##### Returns

`TConfig` \| `null`

## Methods

### configure()

```ts
configure(config): void;
```

Defined in: [notification/interception/NotificationInterceptor.ts:71](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/NotificationInterceptor.ts#L71)

Applies the options the composing feature was created with, replacing any earlier ones.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `TConfig` | The options to apply. |

#### Returns

`void`

#### Implementation of

[`INotificationInterceptor`](Interface.INotificationInterceptor).[`configure`](Interface.INotificationInterceptor#configure)

***

### dispose()

```ts
dispose(): void;
```

Defined in: [notification/interception/NotificationInterceptor.ts:82](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/NotificationInterceptor.ts#L82)

Releases the resources of the interceptor. The base implementation holds none and does
nothing; a subclass that owns browser resources overrides it.

#### Returns

`void`

#### Implementation of

[`INotificationInterceptor`](Interface.INotificationInterceptor).[`dispose`](Interface.INotificationInterceptor#dispose)

***

### push()

```ts
abstract push(notification): void;
```

Defined in: [notification/interception/NotificationInterceptor.ts:62](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/NotificationInterceptor.ts#L62)

Handles one raised notification.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `notification` | [`INotification`](Interface.INotification) | The raised notification. |

#### Returns

`void`

#### Implementation of

[`INotificationInterceptor`](Interface.INotificationInterceptor).[`push`](Interface.INotificationInterceptor#push)
