---
title: 'Type Alias: AudioInputSignalQuality'
generated: true
editUrl: false
---
# Type Alias: AudioInputSignalQuality

```ts
type AudioInputSignalQuality = "clipping" | "fair" | "good" | "no-signal" | "poor" | "unknown";
```

Defined in: [audio/devices/AudioInputSignalQuality.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputSignalQuality.ts#L7)

Normalized quality of the currently sampled microphone signal, derived from its RMS level and
its peak amplitude.
