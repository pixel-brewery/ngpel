---
title: 'Class: AudioSignalQualityIndicatorComponent'
generated: true
editUrl: false
---
# Class: AudioSignalQualityIndicatorComponent

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:165](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L165)

Displays an accessible, business-agnostic audio signal quality state.

## Constructors

### Constructor

```ts
new AudioSignalQualityIndicatorComponent(): AudioSignalQualityIndicatorComponent;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:183](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L183)

Starts bounded sampling when the caller opts into a settled display.

#### Returns

`AudioSignalQualityIndicatorComponent`

## Properties

### activeBarCount

```ts
protected readonly activeBarCount: Signal<number>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:261](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L261)

Number of active meter bars derived from the current quality.

***

### bars

```ts
protected readonly bars: readonly number[];
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:176](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L176)

Stable bar identifiers used by the signal-strength meter.

***

### description

```ts
readonly description: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:215](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L215)

Optional supporting description, for example a measured decibel value.

***

### descriptionVisible

```ts
readonly descriptionVisible: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:218](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L218)

Whether to display the description alongside the quality label.

***

### displayedDescription

```ts
protected readonly displayedDescription: Signal<string | null>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:249](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L249)

***

### displayedLabel

```ts
protected readonly displayedLabel: Signal<string>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:248](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L248)

***

### displayedQuality

```ts
protected readonly displayedQuality: Signal<AudioSignalQuality>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:247](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L247)

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:226](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L226)

Human-readable, localized label for the current quality state.

***

### quality

```ts
readonly quality: InputSignal<AudioSignalQuality>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:234](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L234)

Current technical audio signal quality.

***

### settleTime

```ts
readonly settleTime: InputSignal<number>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:237](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L237)

Sampling window in milliseconds, capped at 30 seconds. Zero displays values immediately.

***

### showMeter

```ts
readonly showMeter: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts:245](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-signal-quality-indicator/AudioSignalQualityIndicatorComponent.ts#L245)

Indicates whether the four-bar signal meter is rendered.
