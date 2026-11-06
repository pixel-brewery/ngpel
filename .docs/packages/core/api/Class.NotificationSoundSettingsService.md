---
title: 'Class: NotificationSoundSettingsService'
generated: true
editUrl: false
---
# Class: NotificationSoundSettingsService

Defined in: [notification/services/NotificationSoundSettingsService.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationSoundSettingsService.ts#L24)

Holds the user's notification sound preferences for the running session and answers the gate the
[AudioNotificationInterceptor](Class.AudioNotificationInterceptor) consults before it plays anything.

The service is deliberately in-memory: persistence is a product concern, so an application that
stores the preferences on a user profile writes them back with
[NotificationSoundSettingsService.set](#set) whenever the profile is loaded or changed.

Registered by `withAudioNotificationInterceptor()`.

## Constructors

### Constructor

```ts
new NotificationSoundSettingsService(): NotificationSoundSettingsService;
```

#### Returns

`NotificationSoundSettingsService`

## Accessors

### settings

#### Get Signature

```ts
get settings(): Signal<Readonly<Record<NotificationSoundSettingKey, boolean>>>;
```

Defined in: [notification/services/NotificationSoundSettingsService.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationSoundSettingsService.ts#L39)

The preferences of the running session.

##### Returns

`Signal`\<`Readonly`\<`Record`\<[`NotificationSoundSettingKey`](TypeAlias.NotificationSoundSettingKey), `boolean`\>\>\>

## Methods

### isEnabled()

```ts
isEnabled(type): boolean;
```

Defined in: [notification/services/NotificationSoundSettingsService.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationSoundSettingsService.ts#L75)

Reports whether a sound is wanted for a severity. An ungraded notification has no preference
and is always allowed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | [`NotificationType`](TypeAlias.NotificationType) | The severity of the notification. |

#### Returns

`boolean`

***

### set()

```ts
set(settings?): void;
```

Defined in: [notification/services/NotificationSoundSettingsService.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationSoundSettingsService.ts#L53)

Replaces the preferences, filling every severity the argument leaves out with its default.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings?` | \| `Partial`\<`Readonly`\<`Record`\<[`NotificationSoundSettingKey`](TypeAlias.NotificationSoundSettingKey), `boolean`\>\>\> \| `null` | The preferences to apply; `null` or omitted restores the defaults. |

#### Returns

`void`

***

### setEnabled()

```ts
setEnabled(key, isEnabled): void;
```

Defined in: [notification/services/NotificationSoundSettingsService.ts:64](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/notification/services/NotificationSoundSettingsService.ts#L64)

Changes the preference of one severity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`NotificationSoundSettingKey`](TypeAlias.NotificationSoundSettingKey) | The severity to change. |
| `isEnabled` | `boolean` | Whether its sound is wanted. |

#### Returns

`void`
