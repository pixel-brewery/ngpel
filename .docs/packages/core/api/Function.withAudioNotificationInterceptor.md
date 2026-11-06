---
title: 'Function: withAudioNotificationInterceptor()'
generated: true
editUrl: false
---
# Function: withAudioNotificationInterceptor()

```ts
function withAudioNotificationInterceptor(options): IFeature<NotificationFeatureKind>;
```

Defined in: [notification/provider/withAudioNotificationInterceptor.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/provider/withAudioNotificationInterceptor.ts#L43)

Adds the [AudioNotificationInterceptor](Class.AudioNotificationInterceptor) to `provideNotification()`, so every raised
notification also plays the sound its severity is mapped to.

The feature is self-sufficient: it brings the [AudioPlayer](Class.AudioPlayer) it plays through, the
[NotificationSoundSettingsService](Class.NotificationSoundSettingsService) that holds the user's preferences and the
[NotificationSoundPreviewService](Class.NotificationSoundPreviewService) a settings screen previews the same sounds through.
Unless the caller states its own gate, the sound of a severity the user silenced is skipped.
Both the interceptor and the preview service are configured while they are constructed, so a
settings screen can preview before the first notification was ever raised, and the interceptor is
disposed with the injector it was composed into.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`IAudioNotificationInterceptorConfig`](Interface.IAudioNotificationInterceptorConfig) | The sound table plus optional gate, volume and diagnostic channel. |

## Returns

[`IFeature`](Interface.IFeature)\<[`NotificationFeatureKind`](TypeAlias.NotificationFeatureKind)\>

The feature to pass to `provideNotification()`.

## Example

```typescript
provideNotification(
    withAudioNotificationInterceptor({
        defaultSound: '/audio/notify.mp3',
        sounds: { error: '/audio/alert.mp3' },
        options: { volume: 0.4 }
    })
);
```
