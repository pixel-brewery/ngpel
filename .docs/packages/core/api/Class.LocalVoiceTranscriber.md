---
title: 'Class: LocalVoiceTranscriber'
generated: true
editUrl: false
---
# Class: LocalVoiceTranscriber

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L86)

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

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:116](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L116)

Constructs a new instance of the `LocalVoiceTranscriber` class. Its configuration comes from
[LOCAL\_VOICE\_TRANSCRIBER\_OPTIONS](Variable.LOCAL_VOICE_TRANSCRIBER_OPTIONS); without that binding the documented defaults apply.

#### Returns

`LocalVoiceTranscriber`

## Properties

### supportsLiveSessions

```ts
readonly supportsLiveSessions: true;
```

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:132](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L132)

Marks this strategy as recognizing speech while a session is active.

#### Implementation of

[`ILiveVoiceTranscriber`](Interface.ILiveVoiceTranscriber).[`supportsLiveSessions`](Interface.ILiveVoiceTranscriber#supportslivesessions)

## Accessors

### isSupported

#### Get Signature

```ts
get isSupported(): boolean;
```

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:135](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L135)

Whether the current browser exposes its speech recognition API.

##### Returns

`boolean`

## Methods

### cancelSession()

```ts
cancelSession(): void;
```

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:190](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L190)

Aborts an active recognition session and discards its result.

#### Returns

`void`

#### Implementation of

[`ILiveVoiceTranscriber`](Interface.ILiveVoiceTranscriber).[`cancelSession`](Interface.ILiveVoiceTranscriber#cancelsession)

***

### dictate()

```ts
dictate(options?): Promise<IDictationResult>;
```

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:231](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L231)

Starts dictation with the browser's default recognition engine. Delivers interim updates until
the browser ends the session, or the caller stops it with [stopSession](#stopsession).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`IDictationOptions`](Interface.IDictationOptions) | Dictation configuration and transcript callback. |

#### Returns

`Promise`\<[`IDictationResult`](Interface.IDictationResult)\>

The final transcript or the error code.

***

### startSession()

```ts
startSession(audioTrack?): Promise<void>;
```

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:152](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L152)

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

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:163](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L163)

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

Defined in: [audio/transcribers/LocalVoiceTranscriber.ts:218](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LocalVoiceTranscriber.ts#L218)

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
