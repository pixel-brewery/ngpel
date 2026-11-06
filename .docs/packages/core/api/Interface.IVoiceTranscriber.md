---
title: 'Interface: IVoiceTranscriber'
generated: true
editUrl: false
---
# Interface: IVoiceTranscriber

Defined in: [audio/transcribers/IVoiceTranscriber.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/IVoiceTranscriber.ts#L13)

Port for converting recorded voice audio to text. Implementations decide where recognition
happens — in the browser, on a device, or behind an API of the product's own choosing.

## Extended by

- [`ILiveVoiceTranscriber`](Interface.ILiveVoiceTranscriber)

## Methods

### transcribe()

```ts
transcribe(input): Promise<string>;
```

Defined in: [audio/transcribers/IVoiceTranscriber.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/IVoiceTranscriber.ts#L23)

Transcribes recorded audio into text.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`ITranscriptionInput`](Interface.ITranscriptionInput) | The recorded audio and its metadata. |

#### Returns

`Promise`\<`string`\>

A promise resolving to the transcribed text.
