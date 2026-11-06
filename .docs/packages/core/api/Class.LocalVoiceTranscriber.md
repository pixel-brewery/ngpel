---
title: 'Class: LocalVoiceTranscriber'
generated: true
editUrl: false
---
# Class: LocalVoiceTranscriber

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L79)

Browser-based [ILiveVoiceTranscriber](Interface.ILiveVoiceTranscriber) over the Web Speech API.

A live session runs continuously: the engine is restarted whenever the browser ends it after a
speech pause, and interim results are joined into the running transcript, so a dictation keeps
going until the user stops it. When the browser offers an on-device dictation language pack it
is used — and downloaded in the background if necessary — which keeps the audio on the device;
otherwise recognition falls back to the browser's own service. Passing the already authorized
microphone track of a running recording avoids a second permission prompt.

## Implements

- [`ILiveVoiceTranscriber`](Interface.ILiveVoiceTranscriber)

## Constructors

### Constructor

```ts
new LocalVoiceTranscriber(): LocalVoiceTranscriber;
```

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:108](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L108)

Constructs a new instance of the `LocalVoiceTranscriber` class. Its configuration comes from
[LOCAL\_VOICE\_TRANSCRIBER\_OPTIONS](Variable.LOCAL_VOICE_TRANSCRIBER_OPTIONS); without that binding the documented defaults apply.

#### Returns

`LocalVoiceTranscriber`

## Properties

### supportsLiveSessions

```ts
readonly supportsLiveSessions: true;
```

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L124)

Marks this strategy as recognizing speech while a session is active.

#### Implementation of

[`ILiveVoiceTranscriber`](Interface.ILiveVoiceTranscriber).[`supportsLiveSessions`](Interface.ILiveVoiceTranscriber#supportslivesessions)

## Methods

### cancelSession()

```ts
cancelSession(): void;
```

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:179](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L179)

Aborts an active recognition session and discards its result.

#### Returns

`void`

#### Implementation of

[`ILiveVoiceTranscriber`](Interface.ILiveVoiceTranscriber).[`cancelSession`](Interface.ILiveVoiceTranscriber#cancelsession)

***

### startSession()

```ts
startSession(audioTrack?): Promise<void>;
```

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:139](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L139)

Starts continuous recognition that stays active across speech pauses until it is stopped.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `audioTrack?` | `MediaStreamTrack` | Already authorized live microphone track to recognize instead of the browser default. |

#### Returns

`Promise`\<`void`\>

A promise that resolves once recognition runs.

#### Throws

Error when the browser has no speech recognition or a session is already active.

#### Implementation of

[`ILiveVoiceTranscriber`](Interface.ILiveVoiceTranscriber).[`startSession`](Interface.ILiveVoiceTranscriber#startsession)

***

### stopSession()

```ts
stopSession(): Promise<string>;
```

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:150](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L150)

Stops a manually controlled recognition session and returns its accumulated text.

#### Returns

`Promise`\<`string`\>

The recognized text of the session.

#### Throws

Error when the session ended with a recognition failure.

#### Implementation of

[`ILiveVoiceTranscriber`](Interface.ILiveVoiceTranscriber).[`stopSession`](Interface.ILiveVoiceTranscriber#stopsession)

***

### transcribe()

```ts
transcribe(_input): Promise<string>;
```

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:210](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L210)

Recognizes one utterance from the microphone. Browser speech recognition cannot read a
recorded blob, so the recorded audio of `input` is ignored and the engine listens instead;
a caller that wants recognition while recording uses [startSession](#startsession) instead.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_input` | [`ITranscriptionInput`](Interface.ITranscriptionInput) | The recorded audio, which this strategy cannot replay. |

#### Returns

`Promise`\<`string`\>

The recognized text.

#### Throws

Error when the browser has no speech recognition or recognition failed.

#### Implementation of

[`ILiveVoiceTranscriber`](Interface.ILiveVoiceTranscriber).[`transcribe`](Interface.ILiveVoiceTranscriber#transcribe)
