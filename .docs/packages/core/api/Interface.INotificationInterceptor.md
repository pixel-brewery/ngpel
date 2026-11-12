---
title: 'Interface: INotificationInterceptor\<TConfig\>'
generated: true
editUrl: false
---
# Interface: INotificationInterceptor\<TConfig\>

Defined in: [notification/interception/INotificationInterceptor.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/INotificationInterceptor.ts#L15)

A sink every raised notification is fanned out to: a console logger, a sound, a toast. The
pipeline is deliberately fire-and-forget — an interceptor reports nothing back, so one sink can
never influence another or the raising caller.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tconfig"></a> `TConfig` *extends* `object` | `object` | Shape of the options the composing `with*` factory passes in. |

## Methods

### configure()

```ts
configure(config): void;
```

Defined in: [notification/interception/INotificationInterceptor.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/INotificationInterceptor.ts#L29)

Applies the options the composing feature was created with. Called once, while the
composition root builds the interceptor list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `TConfig` | The options to apply. |

#### Returns

`void`

***

### dispose()

```ts
dispose(): void;
```

Defined in: [notification/interception/INotificationInterceptor.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/INotificationInterceptor.ts#L21)

Disposes the interceptor and releases resources.

#### Returns

`void`

***

### push()

```ts
push(notification): void;
```

Defined in: [notification/interception/INotificationInterceptor.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/INotificationInterceptor.ts#L36)

Handles one raised notification.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `notification` | [`INotification`](Interface.INotification) | The raised notification. |

#### Returns

`void`
