---
title: 'Function: withLocalTranscriber()'
generated: true
editUrl: false
---
# Function: withLocalTranscriber()

```ts
function withLocalTranscriber(options?): IFeature<AudioFeatureKind>;
```

Defined in: [audio/features/withLocalTranscriber.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/features/withLocalTranscriber.ts#L26)

Registers the browser-based [LocalVoiceTranscriber](Class.LocalVoiceTranscriber) under [VOICE\_TRANSCRIBER](Variable.VOICE_TRANSCRIBER). It
also satisfies the live-session contract, so a recorder user interface can dictate while
recording.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ILocalVoiceTranscriberOptions`](Interface.ILocalVoiceTranscriberOptions) | Recognition language and result options; defaults apply per option. |

## Returns

[`IFeature`](Interface.IFeature)\<[`AudioFeatureKind`](TypeAlias.AudioFeatureKind)\>

A feature for `provideAudioRecorder(...)`.

## Example

```typescript
provideAudioRecorder(withLocalTranscriber({ language: 'de-DE' }))
```
