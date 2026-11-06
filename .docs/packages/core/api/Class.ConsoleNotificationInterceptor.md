---
title: 'Class: ConsoleNotificationInterceptor'
generated: true
editUrl: false
---
# Class: ConsoleNotificationInterceptor

Defined in: [notification/interception/ConsoleNotificationInterceptor.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/ConsoleNotificationInterceptor.ts#L19)

Writes every raised notification to a diagnostic channel, mapping the severity onto the matching
console level. Compose it with `withConsoleNotificationInterceptor()` to keep a record of what a
session was told in environments that have no visible notification surface.

## Extends

- [`NotificationInterceptor`](Class.NotificationInterceptor)\<[`IConsoleNotificationInterceptorConfig`](Interface.IConsoleNotificationInterceptorConfig)\>

## Constructors

### Constructor

```ts
new ConsoleNotificationInterceptor(): ConsoleNotificationInterceptor;
```

Defined in: [notification/interception/ConsoleNotificationInterceptor.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/ConsoleNotificationInterceptor.ts#L27)

Constructs a new instance of the `ConsoleNotificationInterceptor` class.

#### Returns

`ConsoleNotificationInterceptor`

#### Overrides

[`NotificationInterceptor`](Class.NotificationInterceptor).[`constructor`](Class.NotificationInterceptor#constructor)

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

#### Inherited from

[`NotificationInterceptor`](Class.NotificationInterceptor).[`config`](Class.NotificationInterceptor#config)

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
| `config` | [`IConsoleNotificationInterceptorConfig`](Interface.IConsoleNotificationInterceptorConfig) | The options to apply. |

#### Returns

`void`

#### Inherited from

[`NotificationInterceptor`](Class.NotificationInterceptor).[`configure`](Class.NotificationInterceptor#configure)

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

#### Inherited from

[`NotificationInterceptor`](Class.NotificationInterceptor).[`dispose`](Class.NotificationInterceptor#dispose)

***

### push()

```ts
push(notification): void;
```

Defined in: [notification/interception/ConsoleNotificationInterceptor.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/ConsoleNotificationInterceptor.ts#L42)

Writes the notification to the configured channel, unless writing is disabled.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `notification` | [`INotification`](Interface.INotification) | The raised notification. |

#### Returns

`void`

#### Overrides

[`NotificationInterceptor`](Class.NotificationInterceptor).[`push`](Class.NotificationInterceptor#push)
