---
title: 'Function: provideAudioRecorder()'
generated: true
editUrl: false
---
# Function: provideAudioRecorder()

```ts
function provideAudioRecorder(...features): EnvironmentProviders;
```

Defined in: [audio/features/provideAudioRecorder.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/features/provideAudioRecorder.ts#L27)

Registers the [AudioRecorder](Class.AudioRecorder) together with the features contributed to it. Without a
transcriber feature the recorder still records; only `transcribe()` stays unavailable.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`features` | readonly [`IFeature`](Interface.IFeature)\<[`AudioFeatureKind`](TypeAlias.AudioFeatureKind)\>[] | Recorder features such as `withLocalTranscriber()`, `withVoiceTranscriber(...)` and `withTelemetry(...)`. |

## Returns

`EnvironmentProviders`

Environment providers for the application or route composition root.

## Throws

Error when two transcriber features are given.

## Example

```typescript
export const appConfig = {
    providers: [provideAudioRecorder(withLocalTranscriber({ language: 'de-DE' }))]
};
```
