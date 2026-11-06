---
title: 'Function: withVoiceTranscriber()'
generated: true
editUrl: false
---
# Function: withVoiceTranscriber()

```ts
function withVoiceTranscriber(adapter): IFeature<AudioFeatureKind>;
```

Defined in: [audio/features/withVoiceTranscriber.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/features/withVoiceTranscriber.ts#L26)

Registers a product-owned recognition strategy under [VOICE\_TRANSCRIBER](Variable.VOICE_TRANSCRIBER) — an API-backed
transcriber, a desktop bridge, or any other adapter. It conflicts with
`withLocalTranscriber()` by design: one recorder recognizes through one strategy.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `adapter` | `Type`\<[`IVoiceTranscriber`](Interface.IVoiceTranscriber)\> | The adapter class, instantiated by the injector so it can inject its own dependencies. |

## Returns

[`IFeature`](Interface.IFeature)\<[`AudioFeatureKind`](TypeAlias.AudioFeatureKind)\>

A feature for `provideAudioRecorder(...)`.

## Example

```typescript
provideAudioRecorder(withVoiceTranscriber(ApiVoiceTranscriber))
```
