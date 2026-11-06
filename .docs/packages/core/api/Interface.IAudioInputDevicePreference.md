---
title: 'Interface: IAudioInputDevicePreference'
generated: true
editUrl: false
---
# Interface: IAudioInputDevicePreference

Defined in: [audio/devices/IAudioInputDevicePreference.ts:9](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/IAudioInputDevicePreference.ts#L9)

Locally persisted, successfully tested audio-input selection.

Device identifiers and microphone permissions are browser-local, so this preference belongs to
the browser profile and deliberately not to a server-side user profile.

## Properties

### deviceId

```ts
readonly deviceId: string;
```

Defined in: [audio/devices/IAudioInputDevicePreference.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/IAudioInputDevicePreference.ts#L15)

Browser-scoped device identifier.

***

### label

```ts
readonly label: string;
```

Defined in: [audio/devices/IAudioInputDevicePreference.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/IAudioInputDevicePreference.ts#L20)

Last known device label, used for recovery messaging when the device disappears.

***

### schemaVersion

```ts
readonly schemaVersion: 1;
```

Defined in: [audio/devices/IAudioInputDevicePreference.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/IAudioInputDevicePreference.ts#L25)

Preference payload schema version.

***

### testedAt

```ts
readonly testedAt: string;
```

Defined in: [audio/devices/IAudioInputDevicePreference.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/IAudioInputDevicePreference.ts#L30)

ISO timestamp of the last successful voice test.
