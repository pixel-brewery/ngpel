---
title: 'Type Alias: AudioRecorderState'
generated: true
editUrl: false
---
# Type Alias: AudioRecorderState

```ts
type AudioRecorderState =
  | "idle"
  | "acquiring"
  | "recording"
  | "paused"
  | "stopping"
  | "error"
  | "disposed";
```

Defined in: [audio/recorder/AudioRecorderState.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorderState.ts#L7)

Lifecycle states of a browser audio recording session. `stopping` is entered while the browser
still delivers its final chunk, and `disposed` is terminal.
