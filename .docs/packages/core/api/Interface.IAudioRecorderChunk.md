---
title: 'Interface: IAudioRecorderChunk'
generated: true
editUrl: false
---
# Interface: IAudioRecorderChunk

Defined in: [audio/recorder/IAudioRecorderChunk.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecorderChunk.ts#L6)

One ordered audio fragment emitted while recording is still active.

## Properties

### blob

```ts
readonly blob: Blob;
```

Defined in: [audio/recorder/IAudioRecorderChunk.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecorderChunk.ts#L12)

Encoded audio payload for immediate persistence or transport.

***

### elapsedMs

```ts
readonly elapsedMs: number;
```

Defined in: [audio/recorder/IAudioRecorderChunk.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecorderChunk.ts#L17)

Active recording duration when the chunk became available.

***

### mimeType

```ts
readonly mimeType: string;
```

Defined in: [audio/recorder/IAudioRecorderChunk.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecorderChunk.ts#L22)

Effective encoded MIME type of this chunk.

***

### sequence

```ts
readonly sequence: number;
```

Defined in: [audio/recorder/IAudioRecorderChunk.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecorderChunk.ts#L27)

Zero-based sequence number within the current recording.

***

### timecodeMs

```ts
readonly timecodeMs: number | null;
```

Defined in: [audio/recorder/IAudioRecorderChunk.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/IAudioRecorderChunk.ts#L32)

Browser-provided media timecode, or `null` when the browser omits it.
