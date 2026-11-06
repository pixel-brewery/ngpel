---
title: 'Variable: AUDIO\_INPUT\_DEVICE\_PREFERENCE\_KEY'
generated: true
editUrl: false
---
# Variable: AUDIO\_INPUT\_DEVICE\_PREFERENCE\_KEY

```ts
const AUDIO_INPUT_DEVICE_PREFERENCE_KEY: InjectionToken<string>;
```

Defined in: [audio/devices/AUDIO\_INPUT\_DEVICE\_PREFERENCE\_KEY.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AUDIO_INPUT_DEVICE_PREFERENCE_KEY.ts#L16)

Injection token carrying the user-preference key the
[AudioInputDevicePreferenceService](Class.AudioInputDevicePreferenceService) stores its selection under. It defaults to a neutral,
versioned key; a product that already persists a microphone under its own key keeps that key by
composing `provideAudioInputDevices(withAudioInputDevicePreferenceKey('acme.audio.input-device.v1'))`
instead of migrating the stored value.
