---
title: 'Function: provideAudioInputDevices()'
generated: true
editUrl: false
---
# Function: provideAudioInputDevices()

```ts
function provideAudioInputDevices(...features): EnvironmentProviders;
```

Defined in: [audio/devices/provideAudioInputDevices.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/provideAudioInputDevices.ts#L30)

Registers the microphone discovery and voice-test services together with the persisted
selection. Persistence goes through the user-preference port of
`@pixel-brewery/ngpel-core/storage`, so an application that stores a microphone also composes
`provideUserPreferences(...)`; without it, injecting the preference service fails loudly
instead of dropping writes.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`features` | readonly [`IFeature`](Interface.IFeature)\<`"preference-key"`\>[] | Device features such as `withAudioInputDevicePreferenceKey(...)`. |

## Returns

`EnvironmentProviders`

Environment providers for the application or route composition root.

## Throws

Error when two preference-key features are given.

## Example

```typescript
export const appConfig = {
    providers: [provideUserPreferences(withLocalStorage()), provideAudioInputDevices()]
};
```
