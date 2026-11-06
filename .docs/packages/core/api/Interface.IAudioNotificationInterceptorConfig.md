---
title: 'Interface: IAudioNotificationInterceptorConfig'
generated: true
editUrl: false
---
# Interface: IAudioNotificationInterceptorConfig

Defined in: [notification/interception/IAudioNotificationInterceptorConfig.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/IAudioNotificationInterceptorConfig.ts#L15)

Options of the [AudioNotificationInterceptor](Class.AudioNotificationInterceptor). The sound table is the only required part:
this package ships no audio assets, so the composing application names its own files.

## Properties

### defaultSound?

```ts
readonly optional defaultSound?: string;
```

Defined in: [notification/interception/IAudioNotificationInterceptorConfig.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/IAudioNotificationInterceptorConfig.ts#L22)

Sound played for a severity the table does not name. Without one such a notification stays
silent.

***

### isDisabled?

```ts
readonly optional isDisabled?: boolean;
```

Defined in: [notification/interception/IAudioNotificationInterceptorConfig.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/IAudioNotificationInterceptorConfig.ts#L27)

When `true` the interceptor stays registered but plays nothing.

***

### isEnabled?

```ts
readonly optional isEnabled?: (notification) => boolean;
```

Defined in: [notification/interception/IAudioNotificationInterceptorConfig.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/IAudioNotificationInterceptorConfig.ts#L33)

Per-notification gate consulted before a sound is played.
`withAudioNotificationInterceptor()` defaults it to the user's sound preferences.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `notification` | [`INotification`](Interface.INotification) |

#### Returns

`boolean`

***

### logger?

```ts
readonly optional logger?: Pick<Console, "error">;
```

Defined in: [notification/interception/IAudioNotificationInterceptorConfig.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/IAudioNotificationInterceptorConfig.ts#L38)

Diagnostic channel that receives rejected playback; defaults to the global console.

***

### options?

```ts
readonly optional options?: IAudioPlayOptions;
```

Defined in: [notification/interception/IAudioNotificationInterceptorConfig.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/IAudioNotificationInterceptorConfig.ts#L43)

Volume, loop and seek settings handed to the player for every sound.

***

### sounds

```ts
readonly sounds: Partial<Record<NotificationType, string>>;
```

Defined in: [notification/interception/IAudioNotificationInterceptorConfig.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/interception/IAudioNotificationInterceptorConfig.ts#L48)

Sound source per severity.
