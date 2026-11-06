---
title: 'Type Alias: AudioRecordingRetention'
generated: true
editUrl: false
---
# Type Alias: AudioRecordingRetention

```ts
type AudioRecordingRetention = "memory" | "none";
```

Defined in: [audio/recorder/AudioRecordingRetention.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecordingRetention.ts#L7)

Controls whether emitted chunks are also retained for a final in-memory recording. `none` keeps
a long session memory-free for callers that persist or upload every chunk themselves.
