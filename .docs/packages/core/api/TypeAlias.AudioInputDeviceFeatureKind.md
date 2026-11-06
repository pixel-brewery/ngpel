---
title: 'Type Alias: AudioInputDeviceFeatureKind'
generated: true
editUrl: false
---
# Type Alias: AudioInputDeviceFeatureKind

```ts
type AudioInputDeviceFeatureKind = "preference-key";
```

Defined in: [audio/devices/AudioInputDeviceFeatureKind.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceFeatureKind.ts#L13)

The kinds of features `provideAudioInputDevices(...)` accepts. The preference-key kind is
non-multi: one composition stores its microphone selection under exactly one key.
