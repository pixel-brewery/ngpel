---
title: 'Class: AudioRecorder'
generated: true
editUrl: false
---
# Class: AudioRecorder

Defined in: [audio/recorder/AudioRecorder.ts:52](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L52)

Owns one microphone and emits bounded, ordered audio chunks while recording remains active.

`stop()` resolves only after the browser delivered its final chunk, so a caller can await the
complete recording instead of racing the encoder. Chunks are published as they arrive, which
lets a long session stream to storage or a transport with `retention: 'none'` and never build a
large in-memory blob. The media APIs — `mediaDevices`, `MediaRecorder` and the object-URL
factory — are reached through the injected `DOCUMENT`, while timers and the clock remain the
ambient ones. The microphone is released when the owning injector is destroyed.

## Constructors

### Constructor

```ts
new AudioRecorder(): AudioRecorder;
```

Defined in: [audio/recorder/AudioRecorder.ts:109](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L109)

Constructs a new instance of the `AudioRecorder` class. Transcription stays unavailable
until [VOICE\_TRANSCRIBER](Variable.VOICE_TRANSCRIBER) is bound.

#### Returns

`AudioRecorder`

## Accessors

### audioBlob

#### Get Signature

```ts
get audioBlob(): Signal<Blob | null>;
```

Defined in: [audio/recorder/AudioRecorder.ts:123](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L123)

Complete recording payload when memory retention was enabled.

##### Returns

`Signal`\<`Blob` \| `null`\>

***

### audioUrl

#### Get Signature

```ts
get audioUrl(): Signal<string | null>;
```

Defined in: [audio/recorder/AudioRecorder.ts:133](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L133)

Object URL for the retained recording payload.

##### Returns

`Signal`\<`string` \| `null`\>

***

### chunkAvailable

#### Get Signature

```ts
get chunkAvailable(): Observable<IAudioRecorderChunk>;
```

Defined in: [audio/recorder/AudioRecorder.ts:143](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L143)

Ordered audio fragments, emitted as the browser produces them.

##### Returns

`Observable`\<[`IAudioRecorderChunk`](Interface.IAudioRecorderChunk)\>

***

### durationLabel

#### Get Signature

```ts
get durationLabel(): Signal<string>;
```

Defined in: [audio/recorder/AudioRecorder.ts:163](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L163)

Active recording duration formatted as `mm:ss`.

##### Returns

`Signal`\<`string`\>

***

### durationMs

#### Get Signature

```ts
get durationMs(): Signal<number>;
```

Defined in: [audio/recorder/AudioRecorder.ts:153](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L153)

Active recording duration in milliseconds, excluding paused intervals.

##### Returns

`Signal`\<`number`\>

***

### error

#### Get Signature

```ts
get error(): Signal<AudioRecorderError | null>;
```

Defined in: [audio/recorder/AudioRecorder.ts:173](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L173)

Last typed capture or encoding failure.

##### Returns

`Signal`\<[`AudioRecorderError`](Class.AudioRecorderError) \| `null`\>

***

### isActive

#### Get Signature

```ts
get isActive(): Signal<boolean>;
```

Defined in: [audio/recorder/AudioRecorder.ts:183](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L183)

Indicates whether acquisition, recording, pausing, or stopping is in progress.

##### Returns

`Signal`\<`boolean`\>

***

### isMuted

#### Get Signature

```ts
get isMuted(): Signal<boolean>;
```

Defined in: [audio/recorder/AudioRecorder.ts:193](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L193)

Indicates whether the owned microphone track currently emits silence.

##### Returns

`Signal`\<`boolean`\>

***

### isPaused

#### Get Signature

```ts
get isPaused(): Signal<boolean>;
```

Defined in: [audio/recorder/AudioRecorder.ts:203](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L203)

Indicates whether the current recording is paused.

##### Returns

`Signal`\<`boolean`\>

***

### isRecording

#### Get Signature

```ts
get isRecording(): Signal<boolean>;
```

Defined in: [audio/recorder/AudioRecorder.ts:213](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L213)

Indicates whether encoded recording is active or paused.

##### Returns

`Signal`\<`boolean`\>

***

### latestChunk

#### Get Signature

```ts
get latestChunk(): Signal<IAudioRecorderChunk | null>;
```

Defined in: [audio/recorder/AudioRecorder.ts:223](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L223)

Most recently emitted bounded audio fragment.

##### Returns

`Signal`\<[`IAudioRecorderChunk`](Interface.IAudioRecorderChunk) \| `null`\>

***

### mediaStream

#### Get Signature

```ts
get mediaStream(): Signal<MediaStream | null>;
```

Defined in: [audio/recorder/AudioRecorder.ts:233](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L233)

Owned live microphone stream, for waveform analysis or a parallel transport.

##### Returns

`Signal`\<`MediaStream` \| `null`\>

***

### mimeType

#### Get Signature

```ts
get mimeType(): Signal<string | null>;
```

Defined in: [audio/recorder/AudioRecorder.ts:243](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L243)

Effective encoded MIME type of the current or last completed recording.

##### Returns

`Signal`\<`string` \| `null`\>

***

### recordingCompleted

#### Get Signature

```ts
get recordingCompleted(): Observable<IAudioRecordingResult>;
```

Defined in: [audio/recorder/AudioRecorder.ts:253](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L253)

Successful recording completions, including memory-free streamed recordings.

##### Returns

`Observable`\<[`IAudioRecordingResult`](Interface.IAudioRecordingResult)\>

***

### recordingResult

#### Get Signature

```ts
get recordingResult(): Signal<IAudioRecordingResult | null>;
```

Defined in: [audio/recorder/AudioRecorder.ts:263](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L263)

Metadata of the last successful recording completion.

##### Returns

`Signal`\<[`IAudioRecordingResult`](Interface.IAudioRecordingResult) \| `null`\>

***

### state

#### Get Signature

```ts
get state(): Signal<AudioRecorderState>;
```

Defined in: [audio/recorder/AudioRecorder.ts:273](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L273)

Current recorder lifecycle state.

##### Returns

`Signal`\<[`AudioRecorderState`](TypeAlias.AudioRecorderState)\>

## Methods

### cancel()

```ts
cancel(): Promise<void>;
```

Defined in: [audio/recorder/AudioRecorder.ts:483](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L483)

Ends the active session and discards all retained recording output.

#### Returns

`Promise`\<`void`\>

A promise that resolves once the browser released the session.

***

### dispose()

```ts
dispose(): void;
```

Defined in: [audio/recorder/AudioRecorder.ts:553](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L553)

Releases browser resources immediately and permanently closes this recorder instance.

#### Returns

`void`

***

### isSupported()

```ts
isSupported(): boolean;
```

Defined in: [audio/recorder/AudioRecorder.ts:544](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L544)

Indicates whether the required browser recording APIs are currently available.

#### Returns

`boolean`

`true` when microphone acquisition and `MediaRecorder` are supported.

***

### pause()

```ts
pause(): void;
```

Defined in: [audio/recorder/AudioRecorder.ts:353](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L353)

Pauses encoding while keeping the microphone stream available to other consumers.

#### Returns

`void`

#### Throws

AudioRecorderError when the browser encoder rejects the transition.

***

### requestData()

```ts
requestData(): void;
```

Defined in: [audio/recorder/AudioRecorder.ts:402](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L402)

Requests an additional chunk without ending the recording.

#### Returns

`void`

#### Throws

AudioRecorderError when the browser encoder rejects the request.

***

### resume()

```ts
resume(): void;
```

Defined in: [audio/recorder/AudioRecorder.ts:377](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L377)

Resumes encoding after a pause.

#### Returns

`void`

#### Throws

AudioRecorderError when the browser encoder rejects the transition.

***

### setMuted()

```ts
setMuted(muted): void;
```

Defined in: [audio/recorder/AudioRecorder.ts:420](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L420)

Mutes or unmutes the owned microphone tracks without changing the session timeline.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `muted` | `boolean` | `true` to emit silent audio frames while keeping the tracks alive. |

#### Returns

`void`

***

### start()

```ts
start(options?): Promise<void>;
```

Defined in: [audio/recorder/AudioRecorder.ts:290](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L290)

Starts microphone capture and immediately requests periodic encoded chunks.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`IAudioRecorderStartOptions`](Interface.IAudioRecorderStartOptions) | Microphone, encoding, chunking, and retention options. |

#### Returns

`Promise`\<`void`\>

A promise that resolves once the browser encoder runs.

#### Throws

AudioRecorderError when the microphone or the encoder is unavailable.

#### Throws

RangeError when an option is outside its documented range.

***

### stop()

```ts
stop(): Promise<IAudioRecordingResult | null>;
```

Defined in: [audio/recorder/AudioRecorder.ts:441](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L441)

Stops recording after the browser delivered its final chunk. Repeated calls share one
completion.

#### Returns

`Promise`\<[`IAudioRecordingResult`](Interface.IAudioRecordingResult) \| `null`\>

Completion metadata, or `null` when no recording was active.

***

### transcribe()

```ts
transcribe(filename?): Promise<string>;
```

Defined in: [audio/recorder/AudioRecorder.ts:520](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorder.ts#L520)

Transcribes the retained recording through the configured strategy.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filename?` | `string` | File name passed to the transcription strategy. |

#### Returns

`Promise`\<`string`\>

The transcribed text.

#### Throws

Error when nothing was retained or no transcriber is registered.
