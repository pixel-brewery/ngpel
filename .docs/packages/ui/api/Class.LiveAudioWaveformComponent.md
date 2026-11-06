---
title: 'Class: LiveAudioWaveformComponent'
generated: true
editUrl: false
---
# Class: LiveAudioWaveformComponent

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:52](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L52)

Renders a reusable live audio spectrum without taking ownership of its media stream.

## Constructors

### Constructor

```ts
new LiveAudioWaveformComponent(): LiveAudioWaveformComponent;
```

#### Returns

`LiveAudioWaveformComponent`

## Properties

### ariaLabel

```ts
readonly ariaLabel: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L61)

Accessible label that overrides the state-specific default label.

***

### audioError

```ts
readonly audioError: OutputEmitterRef<Error>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:109](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L109)

Emits a technical Web Audio or Canvas error without changing the visual state.

***

### barColor

```ts
readonly barColor: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:69](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L69)

Optional CSS color used to draw the waveform bars.

***

### barGap

```ts
readonly barGap: InputSignal<number>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L77)

Horizontal gap between bars in CSS pixels.

***

### barHeight

```ts
readonly barHeight: InputSignal<number>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:85](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L85)

Minimum rendered bar height in CSS pixels.

***

### barRadius

```ts
readonly barRadius: InputSignal<number>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L93)

Corner radius of each waveform bar in CSS pixels.

***

### barWidth

```ts
readonly barWidth: InputSignal<number>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:101](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L101)

Width of each waveform bar in CSS pixels.

***

### canvasConfiguration

```ts
protected readonly canvasConfiguration: Signal<ILiveAudioWaveformCanvasConfiguration>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:205](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L205)

Internal canvas configuration derived from the public inputs.

***

### fadeEdges

```ts
readonly fadeEdges: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:117](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L117)

Indicates whether the waveform should fade at both horizontal edges.

***

### fadeWidth

```ts
readonly fadeWidth: InputSignal<number>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:125](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L125)

Width of each horizontal edge fade in CSS pixels.

***

### fftSize

```ts
readonly fftSize: InputSignal<number>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:133](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L133)

Fast Fourier transform size used by the internal analyser.

***

### height

```ts
readonly height: InputSignal<string | number>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L141)

Visible component height as a CSS length or pixel number.

***

### heightStyle

```ts
protected readonly heightStyle: Signal<string>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:228](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L228)

CSS height applied to the waveform container.

***

### historySize

```ts
readonly historySize: InputSignal<number>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:149](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L149)

Maximum amount of samples retained by scrolling mode.

***

### mediaStream

```ts
readonly mediaStream: InputSignal<MediaStream | null>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:157](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L157)

Externally owned media stream analysed while the state is `listening`.

***

### mode

```ts
readonly mode: InputSignal<LiveAudioWaveformMode>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:165](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L165)

Selects a mirrored spectrum or a right-to-left sample history.

***

### resolvedAriaLabel

```ts
protected readonly resolvedAriaLabel: Signal<string>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:240](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L240)

Accessible state description exposed by the control.

***

### sensitivity

```ts
readonly sensitivity: InputSignal<number>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:173](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L173)

Multiplier applied to analyser values before rendering.

***

### showsIdleBaseline

```ts
protected readonly showsIdleBaseline: Signal<boolean>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:252](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L252)

Indicates whether the reference-compatible dotted idle baseline is visible.

***

### smoothingTimeConstant

```ts
readonly smoothingTimeConstant: InputSignal<number>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:181](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L181)

Smoothing value applied by the Web Audio analyser.

***

### state

```ts
readonly state: InputSignal<LiveAudioWaveformState>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:189](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L189)

Current visual and analysis state.

***

### updateRate

```ts
readonly updateRate: InputSignal<number>;
```

Defined in: [libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts:197](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/live-audio-waveform/LiveAudioWaveformComponent.ts#L197)

Minimum delay between live analyser samples in milliseconds.
