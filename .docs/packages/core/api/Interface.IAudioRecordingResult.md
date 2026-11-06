---
title: 'Interface: IAudioRecordingResult'
generated: true
editUrl: false
---
# Interface: IAudioRecordingResult

Defined in: [audio/recorder/IAudioRecordingResult.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecordingResult.ts#L12)

Metadata produced when an audio recording ends successfully.

## Properties

### blob

```ts
readonly blob: Blob | null;
```

Defined in: [audio/recorder/IAudioRecordingResult.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecordingResult.ts#L18)

Complete audio payload, or `null` when the session deliberately retained nothing.

***

### chunkCount

```ts
readonly chunkCount: number;
```

Defined in: [audio/recorder/IAudioRecordingResult.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecordingResult.ts#L23)

Number of non-empty chunks emitted during the recording.

***

### durationMs

```ts
readonly durationMs: number;
```

Defined in: [audio/recorder/IAudioRecordingResult.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecordingResult.ts#L28)

Active recording duration excluding paused intervals.

***

### mimeType

```ts
readonly mimeType: string;
```

Defined in: [audio/recorder/IAudioRecordingResult.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecordingResult.ts#L33)

Effective encoded MIME type of the recording.

***

### retention

```ts
readonly retention: AudioRecordingRetention;
```

Defined in: [audio/recorder/IAudioRecordingResult.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecordingResult.ts#L38)

Retention strategy the recording used.
