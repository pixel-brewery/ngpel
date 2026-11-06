---
title: 'Type Alias: AudioSignalQuality'
generated: true
editUrl: false
---
# Type Alias: AudioSignalQuality

```ts
type AudioSignalQuality = "clipping" | "fair" | "good" | "no-signal" | "poor" | "unknown";
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQuality.ts:9](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQuality.ts#L9)

Technical input-signal quality visualized by the signal indicator.

The values describe audio capture quality only. They deliberately do not
claim semantic transcription or assistant-understanding confidence.
