---
title: 'Variable: AudioFeatureKinds'
generated: true
editUrl: false
---
# Variable: AudioFeatureKinds

```ts
const AudioFeatureKinds: {
  Telemetry: FeatureKind<AudioFeatureKind>;
  Transcriber: FeatureKind<AudioFeatureKind>;
};
```

Defined in: [audio/features/AudioFeatureKind.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/features/AudioFeatureKind.ts#L22)

The branded kind vocabulary of the audio entry point. Products that ship their own recognition
strategy create features with these kinds, so the kernel still rejects a second transcriber.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-telemetry"></a> `Telemetry` | [`FeatureKind`](TypeAlias.FeatureKind)\<[`AudioFeatureKind`](TypeAlias.AudioFeatureKind)\> | [audio/features/AudioFeatureKind.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/features/AudioFeatureKind.ts#L24) |
| <a id="property-transcriber"></a> `Transcriber` | [`FeatureKind`](TypeAlias.FeatureKind)\<[`AudioFeatureKind`](TypeAlias.AudioFeatureKind)\> | [audio/features/AudioFeatureKind.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/features/AudioFeatureKind.ts#L23) |
