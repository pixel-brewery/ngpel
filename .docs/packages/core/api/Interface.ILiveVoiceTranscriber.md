---
title: 'Interface: ILiveVoiceTranscriber'
generated: true
editUrl: false
---
# Interface: ILiveVoiceTranscriber

Defined in: [audio/transcribers/ILiveVoiceTranscriber.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/ILiveVoiceTranscriber.ts#L16)

Extends a voice transcriber with a manually controlled live recognition session.

Browser speech recognition cannot consume a previously recorded blob. A strategy with this
capability therefore listens while the recording user interface is active and returns the
accumulated transcript only when the user explicitly finishes the session.

## Extends

- [`IVoiceTranscriber`](Interface.IVoiceTranscriber)

## Properties

### supportsLiveSessions

```ts
readonly supportsLiveSessions: true;
```

Defined in: [audio/transcribers/ILiveVoiceTranscriber.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/ILiveVoiceTranscriber.ts#L23)

Stable capability marker, checked by [isLiveVoiceTranscriber](Function.isLiveVoiceTranscriber) so callers never depend
on a concrete implementation.

## Methods

### cancelSession()

```ts
cancelSession(): void;
```

Defined in: [audio/transcribers/ILiveVoiceTranscriber.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/ILiveVoiceTranscriber.ts#L51)

Aborts the active session and discards its recognized text.

#### Returns

`void`

***

### startSession()

```ts
startSession(audioTrack?): Promise<void>;
```

Defined in: [audio/transcribers/ILiveVoiceTranscriber.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/ILiveVoiceTranscriber.ts#L36)

Starts a manually controlled live recognition session.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `audioTrack?` | `MediaStreamTrack` | Already authorized live microphone track to recognize instead of the browser default, which avoids a second permission prompt while recording. |

#### Returns

`Promise`\<`void`\>

***

### stopSession()

```ts
stopSession(): Promise<string>;
```

Defined in: [audio/transcribers/ILiveVoiceTranscriber.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/ILiveVoiceTranscriber.ts#L44)

Stops the active session and returns all recognized text.

#### Returns

`Promise`\<`string`\>

A promise resolving to the accumulated transcript.

***

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

#### Inherited from

[`IVoiceTranscriber`](Interface.IVoiceTranscriber).[`transcribe`](Interface.IVoiceTranscriber#transcribe)
