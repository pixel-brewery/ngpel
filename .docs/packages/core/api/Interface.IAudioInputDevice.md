---
title: 'Interface: IAudioInputDevice'
generated: true
editUrl: false
---
# Interface: IAudioInputDevice

Defined in: [audio/devices/IAudioInputDevice.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/IAudioInputDevice.ts#L6)

Stable, serializable projection of a browser audio-input device.

## Properties

### deviceId

```ts
readonly deviceId: string;
```

Defined in: [audio/devices/IAudioInputDevice.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/IAudioInputDevice.ts#L12)

Browser-scoped device identifier.

***

### groupId

```ts
readonly groupId: string;
```

Defined in: [audio/devices/IAudioInputDevice.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/IAudioInputDevice.ts#L17)

Browser-scoped physical device group identifier, when the browser exposes one.

***

### label

```ts
readonly label: string;
```

Defined in: [audio/devices/IAudioInputDevice.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/IAudioInputDevice.ts#L22)

Browser-provided label, which stays empty until microphone permission is granted.
