---
title: 'Class: AudioActivityOrbComponent'
generated: true
editUrl: false
---
# Class: AudioActivityOrbComponent

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:221](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L221)

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

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:230](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L230)

Normalized audio activity from zero to one.

***

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:238](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L238)

Accessible description of the currently visualized activity.

***

### audioError

```ts
readonly audioError: OutputEmitterRef<Error>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:246](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L246)

Emits Web Audio or Canvas errors raised by the embedded waveform.

***

### auroraOpacityStyle

```ts
protected readonly auroraOpacityStyle: Signal<string>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:294](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L294)

Opacity used by the audio-reactive aurora.

***

### auroraScaleStyle

```ts
protected readonly auroraScaleStyle: Signal<string>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:306](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L306)

Scale used by the audio-reactive aurora.

***

### iconName

```ts
readonly iconName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:254](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L254)

Mosaik icon rendered in the center of the orb.

***

### mediaStream

```ts
readonly mediaStream: InputSignal<MediaStream | null>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:262](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L262)

Externally owned stream visualized by the embedded waveform.

***

### normalizedActivityLevel

```ts
protected readonly normalizedActivityLevel: Signal<number>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:318](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L318)

Activity level restricted to the supported visual range.

***

### size

```ts
readonly size: InputSignal<string | number>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:270](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L270)

Diameter of the complete orb. Numeric values are interpreted as CSS pixels.

***

### sizeStyle

```ts
protected readonly sizeStyle: Signal<string>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:330](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L330)

CSS size applied to the component root.

***

### state

```ts
readonly state: InputSignal<AudioActivityState>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:278](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L278)

Current visual activity state.

***

### waveformState

```ts
protected readonly waveformState: Signal<LiveAudioWaveformState>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:342](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L342)

Waveform state derived from the richer orb activity state.

***

### waveformVisible

```ts
readonly waveformVisible: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts:286](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/audio-activity-orb/AudioActivityOrbComponent.ts#L286)

Indicates whether the embedded waveform is rendered.
