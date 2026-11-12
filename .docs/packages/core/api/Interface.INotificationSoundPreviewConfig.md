---
title: 'Interface: INotificationSoundPreviewConfig'
generated: true
editUrl: false
---
# Interface: INotificationSoundPreviewConfig

Defined in: [notification/services/INotificationSoundPreviewConfig.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/INotificationSoundPreviewConfig.ts#L14)

Sound table of the [NotificationSoundPreviewService](Class.NotificationSoundPreviewService). `withAudioNotificationInterceptor()`
applies the interceptor's own table, so a preview always plays what the notification would.

## Properties

### defaultSound?

```ts
readonly defaultSound?: string;
```

Defined in: [notification/services/INotificationSoundPreviewConfig.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/INotificationSoundPreviewConfig.ts#L20)

Sound played for a severity the table does not name.

***

### options?

```ts
readonly options?: IAudioPlayOptions;
```

Defined in: [notification/services/INotificationSoundPreviewConfig.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/INotificationSoundPreviewConfig.ts#L25)

Volume, loop and seek settings handed to the player for every sound.

***

### sounds

```ts
readonly sounds: Partial<Record<NotificationType, string>>;
```

Defined in: [notification/services/INotificationSoundPreviewConfig.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/INotificationSoundPreviewConfig.ts#L30)

Sound source per severity.
