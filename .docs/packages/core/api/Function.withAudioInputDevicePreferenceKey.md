---
title: 'Function: withAudioInputDevicePreferenceKey()'
generated: true
editUrl: false
---
# Function: withAudioInputDevicePreferenceKey()

```ts
function withAudioInputDevicePreferenceKey(key): IFeature<"preference-key">;
```

Defined in: [audio/devices/withAudioInputDevicePreferenceKey.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/withAudioInputDevicePreferenceKey.ts#L24)

Overrides the user-preference key the microphone selection is stored under. A product that
already persists a microphone keeps its own key here, so the stored value survives the move to
this package instead of silently resetting every browser profile.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The user-preference key; leading and trailing whitespace is removed. |

## Returns

[`IFeature`](Interface.IFeature)\<`"preference-key"`\>

A feature for `provideAudioInputDevices(...)`.

## Throws

Error when the key is empty.

## Example

```typescript
provideAudioInputDevices(withAudioInputDevicePreferenceKey('acme.audio.input-device.v1'))
```
