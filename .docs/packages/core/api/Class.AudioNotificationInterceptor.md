---
title: 'Class: AudioNotificationInterceptor'
generated: true
editUrl: false
---
# Class: AudioNotificationInterceptor

Defined in: [notification/interception/AudioNotificationInterceptor.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/AudioNotificationInterceptor.ts#L23)

Plays a sound for a raised notification through the [AudioPlayer](Class.AudioPlayer). Playback is started but
never awaited, so a browser that refuses to play unprompted audio slows nothing down: the
rejection is reported on the configured diagnostic channel and the notification keeps travelling
through the remaining interceptors.

An unconfigured interceptor stays silent, as does one whose gate rejects the notification or
whose sound table names no source for its severity.

## Extends

- [`NotificationInterceptor`](Class.NotificationInterceptor)\<[`IAudioNotificationInterceptorConfig`](Interface.IAudioNotificationInterceptorConfig)\>

## Constructors

### Constructor

```ts
new AudioNotificationInterceptor(audioPlayer?): AudioNotificationInterceptor;
```

Defined in: [notification/interception/AudioNotificationInterceptor.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/AudioNotificationInterceptor.ts#L38)

Constructs a new instance of the `AudioNotificationInterceptor` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `audioPlayer?` | [`AudioPlayer`](Class.AudioPlayer) | The player the sounds are played through. |

#### Returns

`AudioNotificationInterceptor`

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
| `config` | [`IAudioNotificationInterceptorConfig`](Interface.IAudioNotificationInterceptorConfig) | The options to apply. |

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

Defined in: [notification/interception/AudioNotificationInterceptor.ts:55](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/AudioNotificationInterceptor.ts#L55)

Plays the sound configured for the severity of the notification.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `notification` | [`INotification`](Interface.INotification) | The raised notification. |

#### Returns

`void`

#### Overrides

[`NotificationInterceptor`](Class.NotificationInterceptor).[`push`](Class.NotificationInterceptor#push)
