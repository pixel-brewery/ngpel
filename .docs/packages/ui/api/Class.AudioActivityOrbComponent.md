---
title: 'Class: AudioActivityOrbComponent'
generated: true
editUrl: false
---
# Class: AudioActivityOrbComponent

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:285](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L285)

Renders the central audio activity surface for listening and speaking experiences.

The consumer owns all audio resources. This component only visualizes a supplied
stream and normalized activity level.

## Constructors

### Constructor

```ts
new AudioActivityOrbComponent(): AudioActivityOrbComponent;
```

#### Returns

`AudioActivityOrbComponent`

## Properties

### activityLevel

```ts
readonly activityLevel: InputSignal<number>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:294](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L294)

Normalized audio activity from zero to one.

***

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:302](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L302)

Accessible description of the currently visualized activity.

***

### audioError

```ts
readonly audioError: OutputEmitterRef<Error>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:310](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L310)

Emits Web Audio or Canvas errors raised by the embedded waveform.

***

### auroraOpacityStyle

```ts
protected readonly auroraOpacityStyle: Signal<string>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:361](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L361)

Opacity used by the audio-reactive aurora.

***

### auroraScaleStyle

```ts
protected readonly auroraScaleStyle: Signal<string>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:373](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L373)

Scale used by the audio-reactive aurora.

***

### compact

```ts
readonly compact: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:313](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L313)

Scales the orb's effects and waveform to fit a compact surface.

***

### iconName

```ts
readonly iconName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:321](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L321)

Mosaik icon rendered in the center of the orb.

***

### mediaStream

```ts
readonly mediaStream: InputSignal<MediaStream | null>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:329](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L329)

Externally owned stream visualized by the embedded waveform.

***

### normalizedActivityLevel

```ts
protected readonly normalizedActivityLevel: Signal<number>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:385](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L385)

Activity level restricted to the supported visual range.

***

### size

```ts
readonly size: InputSignal<string | number>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:337](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L337)

Diameter of the complete orb. Numeric values are interpreted as CSS pixels.

***

### sizeStyle

```ts
protected readonly sizeStyle: Signal<string>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:397](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L397)

CSS size applied to the component root.

***

### state

```ts
readonly state: InputSignal<AudioActivityState>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:345](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L345)

Current visual activity state.

***

### waveformState

```ts
protected readonly waveformState: Signal<LiveAudioWaveformState>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:409](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L409)

Waveform state derived from the richer orb activity state.

***

### waveformVisible

```ts
readonly waveformVisible: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:353](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L353)

Indicates whether the embedded waveform is rendered.
