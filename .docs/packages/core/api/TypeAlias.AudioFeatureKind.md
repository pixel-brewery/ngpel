---
title: 'Type Alias: AudioFeatureKind'
generated: true
editUrl: false
---
# Type Alias: AudioFeatureKind

```ts
type AudioFeatureKind = "transcriber" | "telemetry";
```

Defined in: [audio/features/AudioFeatureKind.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/features/AudioFeatureKind.ts#L14)

The kinds of features `provideAudioRecorder(...)` accepts. `transcriber` is non-multi — exactly
one recognition strategy may be registered — while `telemetry` is multi so several observers can
follow one recorder.
