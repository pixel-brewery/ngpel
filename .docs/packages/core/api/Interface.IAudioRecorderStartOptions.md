---
title: 'Interface: IAudioRecorderStartOptions'
generated: true
editUrl: false
---
# Interface: IAudioRecorderStartOptions

Defined in: [audio/recorder/IAudioRecorderStartOptions.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecorderStartOptions.ts#L14)

Configures microphone acquisition and incremental browser recording. Every option is optional;
an empty object records the default microphone with Opus in WebM at 128 kbit/s, one chunk per
second, retained in memory.

## Properties

### audioBitsPerSecond?

```ts
readonly audioBitsPerSecond?: number | null;
```

Defined in: [audio/recorder/IAudioRecorderStartOptions.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecorderStartOptions.ts#L31)

Target encoded audio bitrate in bits per second.

***

### audioConstraints?

```ts
readonly audioConstraints?: MediaTrackConstraints | null;
```

Defined in: [audio/recorder/IAudioRecorderStartOptions.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecorderStartOptions.ts#L21)

Browser audio-track constraints applied during microphone acquisition, such as
`echoCancellation`, `noiseSuppression`, `autoGainControl` or `sampleRate`.

***

### audioDeviceId?

```ts
readonly audioDeviceId?: string | null;
```

Defined in: [audio/recorder/IAudioRecorderStartOptions.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecorderStartOptions.ts#L26)

Exact microphone device identifier. It overrides `audioConstraints.deviceId`.

***

### chunkIntervalMs?

```ts
readonly chunkIntervalMs?: number | null;
```

Defined in: [audio/recorder/IAudioRecorderStartOptions.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecorderStartOptions.ts#L36)

Maximum requested interval between incremental chunks in milliseconds.

***

### preferredMimeTypes?

```ts
readonly preferredMimeTypes?: readonly string[] | null;
```

Defined in: [audio/recorder/IAudioRecorderStartOptions.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecorderStartOptions.ts#L41)

Ordered MIME type preferences; the first one the browser supports wins.

***

### retention?

```ts
readonly retention?:
  | AudioRecordingRetention
  | null;
```

Defined in: [audio/recorder/IAudioRecorderStartOptions.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecorderStartOptions.ts#L46)

Determines whether the recorder assembles a final in-memory audio blob.
