---
title: 'Interface: IAudioLevelMeasurement'
generated: true
editUrl: false
---
# Interface: IAudioLevelMeasurement

Defined in: [audio/level/IAudioLevelMeasurement.ts:2](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/IAudioLevelMeasurement.ts#L2)

One measured window of the mono audio input.

## Properties

### decibels

```ts
readonly decibels: number | null;
```

Defined in: [audio/level/IAudioLevelMeasurement.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/IAudioLevelMeasurement.ts#L10)

RMS level in dBFS, or `null` for digital silence.

***

### durationMs

```ts
readonly durationMs: number;
```

Defined in: [audio/level/IAudioLevelMeasurement.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/IAudioLevelMeasurement.ts#L13)

Duration of the measured samples. The final window can be shorter than requested.

***

### peak

```ts
readonly peak: number;
```

Defined in: [audio/level/IAudioLevelMeasurement.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/IAudioLevelMeasurement.ts#L7)

Highest absolute sample amplitude, from zero to one.

***

### rms

```ts
readonly rms: number;
```

Defined in: [audio/level/IAudioLevelMeasurement.ts:4](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/IAudioLevelMeasurement.ts#L4)

Root mean square amplitude, from zero to one.

***

### timestampMs

```ts
readonly timestampMs: number;
```

Defined in: [audio/level/IAudioLevelMeasurement.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/IAudioLevelMeasurement.ts#L16)

Monotonic start time, anchored when monitoring starts and advanced by the samples measured.
