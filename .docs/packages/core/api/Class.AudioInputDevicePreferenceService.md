---
title: 'Class: AudioInputDevicePreferenceService'
generated: true
editUrl: false
---
# Class: AudioInputDevicePreferenceService

Defined in: [audio/devices/AudioInputDevicePreferenceService.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDevicePreferenceService.ts#L47)

Persists the verified microphone selection for the current browser profile.

The value is written through the [USER\_PREFERENCE\_STORAGE](Variable.USER_PREFERENCE_STORAGE) port of
`@pixel-brewery/ngpel-core/storage` under the key of
[AUDIO\_INPUT\_DEVICE\_PREFERENCE\_KEY](Variable.AUDIO_INPUT_DEVICE_PREFERENCE_KEY), so the product decides both where preferences live
and under which key this one is stored.

## Constructors

### Constructor

```ts
new AudioInputDevicePreferenceService(): AudioInputDevicePreferenceService;
```

#### Returns

`AudioInputDevicePreferenceService`

## Accessors

### preference

#### Get Signature

```ts
get preference(): Signal<
  | IAudioInputDevicePreference
| null>;
```

Defined in: [audio/devices/AudioInputDevicePreferenceService.ts:64](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDevicePreferenceService.ts#L64)

Last successfully tested microphone preference of this browser profile.

##### Returns

`Signal`\<
  \| [`IAudioInputDevicePreference`](Interface.IAudioInputDevicePreference)
  \| `null`\>

## Methods

### clear()

```ts
clear(): void;
```

Defined in: [audio/devices/AudioInputDevicePreferenceService.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDevicePreferenceService.ts#L77)

Removes the stored microphone preference.

#### Returns

`void`

***

### save()

```ts
save(
   deviceId,
   label,
   testedAt?
): void;
```

Defined in: [audio/devices/AudioInputDevicePreferenceService.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDevicePreferenceService.ts#L90)

Stores a microphone after a successful voice test.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `deviceId` | `string` | Browser-scoped device identifier. |
| `label` | `string` | Last known browser device label. |
| `testedAt` | `Date` | Timestamp of the successful test. |

#### Returns

`void`
