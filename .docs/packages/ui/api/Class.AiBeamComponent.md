---
title: 'Class: AiBeamComponent'
generated: true
editUrl: false
---
# Class: AiBeamComponent

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:795](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L795)

Renders an animated border around arbitrary projected content, the visual language products use
to mark that something is being produced by an AI.

The animation is driven by one shared, frame-rate-capped loop rather than by CSS keyframes per
instance, so many beams on one page stay cheap. A beam pauses itself while it is scrolled out of
view and renders a static border when the visitor prefers reduced motion.

Prefer the [AiBeamDirective](Class.AiBeamDirective) shorthand when the beam wraps a single element.

## Example

```html
<ngp-ai-beam preset="pulse-outside" palette="ocean" [active]="isThinking()">
    <article>…</article>
</ngp-ai-beam>
```

## Constructors

### Constructor

```ts
new AiBeamComponent(): AiBeamComponent;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:821](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L821)

#### Returns

`AiBeamComponent`

## Properties

### activated

```ts
readonly activated: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:852](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L852)

***

### active

```ts
readonly active: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:853](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L853)

***

### bloomOpacity

```ts
readonly bloomOpacity: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:854](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L854)

***

### borderRadius

```ts
readonly borderRadius: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:855](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L855)

***

### brightness

```ts
readonly brightness: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:856](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L856)

***

### contentTemplate

```ts
protected readonly contentTemplate: Signal<TemplateRef<unknown> | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:869](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L869)

***

### deactivated

```ts
readonly deactivated: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:857](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L857)

***

### duration

```ts
readonly duration: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:858](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L858)

***

### glowScale

```ts
protected readonly glowScale: Signal<{
  x: number;
  y: number;
}>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:870](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L870)

***

### hueRange

```ts
readonly hueRange: InputSignal<number>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:859](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L859)

***

### innerOpacity

```ts
readonly innerOpacity: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:860](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L860)

***

### palette

```ts
readonly palette: InputSignal<AiBeamPalette>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:861](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L861)

***

### paused

```ts
protected readonly paused: Signal<boolean>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:871](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L871)

***

### phase

```ts
protected readonly phase: Signal<AiBeamPhase>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:872](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L872)

***

### preset

```ts
readonly preset: InputSignal<AiBeamPreset>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:862](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L862)

***

### reducedMotion

```ts
protected readonly reducedMotion: Signal<boolean>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:873](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L873)

***

### resolvedBloomOpacity

```ts
protected readonly resolvedBloomOpacity: Signal<number>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:874](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L874)

***

### resolvedBorderRadius

```ts
protected readonly resolvedBorderRadius: Signal<number>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:875](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L875)

***

### resolvedBrightness

```ts
protected readonly resolvedBrightness: Signal<number>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:878](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L878)

***

### resolvedDuration

```ts
protected readonly resolvedDuration: Signal<number>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:879](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L879)

***

### resolvedHueRange

```ts
protected readonly resolvedHueRange: Signal<number>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:880](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L880)

***

### resolvedInnerOpacity

```ts
protected readonly resolvedInnerOpacity: Signal<number>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:881](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L881)

***

### resolvedLineBloomHueRange

```ts
protected readonly resolvedLineBloomHueRange: Signal<string>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:885](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L885)

***

### resolvedLineBreatheDuration

```ts
protected readonly resolvedLineBreatheDuration: Signal<string>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:884](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L884)

***

### resolvedLineSpike2Duration

```ts
protected readonly resolvedLineSpike2Duration: Signal<string>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:887](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L887)

***

### resolvedLineSpikeDuration

```ts
protected readonly resolvedLineSpikeDuration: Signal<string>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:886](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L886)

***

### resolvedSaturation

```ts
protected readonly resolvedSaturation: Signal<number>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:888](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L888)

***

### resolvedStaticColors

```ts
protected readonly resolvedStaticColors: Signal<boolean>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:889](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L889)

***

### resolvedStrength

```ts
protected readonly resolvedStrength: Signal<number>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:890](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L890)

***

### resolvedStrokeOpacity

```ts
protected readonly resolvedStrokeOpacity: Signal<number>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:891](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L891)

***

### resolvedTheme

```ts
protected readonly resolvedTheme: Signal<AiBeamResolvedTheme>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:894](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L894)

***

### saturation

```ts
readonly saturation: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:863](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L863)

***

### showsActiveLayers

```ts
protected readonly showsActiveLayers: Signal<boolean>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:898](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L898)

***

### staticColors

```ts
readonly staticColors: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:864](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L864)

***

### strength

```ts
readonly strength: InputSignal<number>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:865](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L865)

***

### strokeOpacity

```ts
readonly strokeOpacity: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:866](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L866)

***

### theme

```ts
readonly theme: InputSignal<AiBeamTheme>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:867](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L867)

***

### visualConfig

```ts
protected readonly visualConfig: Signal<IAiBeamVisualConfig>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:899](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L899)

## Methods

### handleAnimationEnd()

```ts
protected handleAnimationEnd(event): void;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamComponent.ts:921](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamComponent.ts#L921)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `AnimationEvent` |

#### Returns

`void`
