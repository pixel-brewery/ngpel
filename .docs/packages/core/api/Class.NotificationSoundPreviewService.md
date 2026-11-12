---
title: 'Class: NotificationSoundPreviewService'
generated: true
editUrl: false
---
# Class: NotificationSoundPreviewService

Defined in: [notification/services/NotificationSoundPreviewService.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationSoundPreviewService.ts#L20)

Plays a notification sound on demand without raising a notification, so a settings screen can let
a user hear what they are about to switch on. It ignores the sound preferences by design — a
preview of a silenced severity has to be audible.

Registered and configured by `withAudioNotificationInterceptor()`.

## Constructors

### Constructor

```ts
new NotificationSoundPreviewService(audioPlayer?): NotificationSoundPreviewService;
```

Defined in: [notification/services/NotificationSoundPreviewService.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationSoundPreviewService.ts#L36)

Constructs a new instance of the `NotificationSoundPreviewService` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `audioPlayer?` | [`AudioPlayer`](Class.AudioPlayer) | The player the previews are played through. |

#### Returns

`NotificationSoundPreviewService`

## Methods

### configure()

```ts
configure(config): void;
```

Defined in: [notification/services/NotificationSoundPreviewService.ts:50](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationSoundPreviewService.ts#L50)

Applies the sound table previews are played from, replacing any earlier one.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`INotificationSoundPreviewConfig`](Interface.INotificationSoundPreviewConfig) | The sound table. |

#### Returns

`void`

***

### play()

```ts
play(type): Promise<void>;
```

Defined in: [notification/services/NotificationSoundPreviewService.ts:63](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationSoundPreviewService.ts#L63)

Plays the sound configured for a severity. Does nothing when the service is unconfigured or
the severity has no sound.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | [`NotificationType`](TypeAlias.NotificationType) | The severity to preview. |

#### Returns

`Promise`\<`void`\>

A promise that resolves once the player reports playback.

#### Throws

The browser playback failure when the sound cannot start.
