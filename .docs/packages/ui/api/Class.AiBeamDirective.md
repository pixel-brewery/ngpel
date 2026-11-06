---
title: 'Class: AiBeamDirective'
generated: true
editUrl: false
---
# Class: AiBeamDirective

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L38)

Structural shorthand that wraps its template in an [AiBeamComponent](Class.AiBeamComponent), so a single element
gains an AI beam without an extra wrapper in the template.

## Example

```html
<article *ngpAiBeam="'pulse-outside'; palette: 'ocean'; active: isThinking()">…</article>
```

## Constructors

### Constructor

```ts
new AiBeamDirective(): AiBeamDirective;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L47)

#### Returns

`AiBeamDirective`

## Properties

### ngpAiBeam

```ts
readonly ngpAiBeam: InputSignal<AiBeamPreset>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L78)

***

### ngpAiBeamActivated

```ts
readonly ngpAiBeamActivated: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L79)

***

### ngpAiBeamActive

```ts
readonly ngpAiBeamActive: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L80)

***

### ngpAiBeamBloomOpacity

```ts
readonly ngpAiBeamBloomOpacity: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:81](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L81)

***

### ngpAiBeamBorderRadius

```ts
readonly ngpAiBeamBorderRadius: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:82](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L82)

***

### ngpAiBeamBrightness

```ts
readonly ngpAiBeamBrightness: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:83](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L83)

***

### ngpAiBeamDeactivated

```ts
readonly ngpAiBeamDeactivated: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:84](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L84)

***

### ngpAiBeamDuration

```ts
readonly ngpAiBeamDuration: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:85](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L85)

***

### ngpAiBeamHueRange

```ts
readonly ngpAiBeamHueRange: InputSignal<number>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L86)

***

### ngpAiBeamInnerOpacity

```ts
readonly ngpAiBeamInnerOpacity: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:87](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L87)

***

### ngpAiBeamPalette

```ts
readonly ngpAiBeamPalette: InputSignal<AiBeamPalette>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:88](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L88)

***

### ngpAiBeamSaturation

```ts
readonly ngpAiBeamSaturation: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:89](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L89)

***

### ngpAiBeamStaticColors

```ts
readonly ngpAiBeamStaticColors: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L90)

***

### ngpAiBeamStrength

```ts
readonly ngpAiBeamStrength: InputSignal<number>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L91)

***

### ngpAiBeamStrokeOpacity

```ts
readonly ngpAiBeamStrokeOpacity: InputSignal<number | null>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:92](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L92)

***

### ngpAiBeamTheme

```ts
readonly ngpAiBeamTheme: InputSignal<AiBeamTheme>;
```

Defined in: [libs/ui/src/components/ai-beam/AiBeamDirective.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-beam/AiBeamDirective.ts#L93)
