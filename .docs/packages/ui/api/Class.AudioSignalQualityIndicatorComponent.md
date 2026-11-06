---
title: 'Class: AudioSignalQualityIndicatorComponent'
generated: true
editUrl: false
---
# Class: AudioSignalQualityIndicatorComponent

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:154](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L154)

Displays an accessible, business-agnostic audio signal quality state.

## Constructors

### Constructor

```ts
new AudioSignalQualityIndicatorComponent(): AudioSignalQualityIndicatorComponent;
```

#### Returns

`AudioSignalQualityIndicatorComponent`

## Properties

### activeBarCount

```ts
protected readonly activeBarCount: Signal<number>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:207](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L207)

Number of active meter bars derived from the current quality.

***

### bars

```ts
protected readonly bars: readonly number[];
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:163](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L163)

Stable bar identifiers used by the signal-strength meter.

***

### description

```ts
readonly description: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:175](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L175)

Optional supporting description, for example a measured decibel value.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:183](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L183)

Human-readable, localized label for the current quality state.

***

### quality

```ts
readonly quality: InputSignal<AudioSignalQuality>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:191](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L191)

Current technical audio signal quality.

***

### showMeter

```ts
readonly showMeter: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:199](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L199)

Indicates whether the four-bar signal meter is rendered.
