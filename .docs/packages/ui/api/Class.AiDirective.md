---
title: 'Class: AiDirective'
generated: true
editUrl: false
---
# Class: AiDirective

Defined in: [libs/ui/src/directives/ai/AiDirective.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/ai/AiDirective.ts#L45)

Marks an element as AI-enhanced and applies the configured presentation to it.

The directive is element-independent: variant-aware Mosaik controls react to the `variant`
attribute, and input controls additionally receive a border color through their design tokens, so
an AI-filled field stays visibly marked without focus. Everything the directive touches is
captured beforehand and handed back when the presentation is switched off or the host is
destroyed, which is what lets the marker stay on an element whose AI provenance changes.

## Example

```html
<mosaik-textbox ngpAi [ngpAiEnabled]="isAiFilled()" />
<div ngpAi ngpAiAttention="pulse">AI result</div>
```

## Constructors

### Constructor

```ts
new AiDirective(): AiDirective;
```

Defined in: [libs/ui/src/directives/ai/AiDirective.ts:69](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/ai/AiDirective.ts#L69)

Constructs a new instance of the `AiDirective` class.

#### Returns

`AiDirective`

## Properties

### attention

```ts
readonly attention: InputSignal<AiAttention>;
```

Defined in: [libs/ui/src/directives/ai/AiDirective.ts:128](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/ai/AiDirective.ts#L128)

Attention treatment applied while the directive is active. Pulse is opt-in.

***

### borderColor

```ts
readonly borderColor: InputSignal<string>;
```

Defined in: [libs/ui/src/directives/ai/AiDirective.ts:120](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/ai/AiDirective.ts#L120)

Color written to the supported Mosaik input border tokens.

***

### enabled

```ts
readonly enabled: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/directives/ai/AiDirective.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/ai/AiDirective.ts#L95)

Whether the AI presentation is active at all.

***

### presentationEnabled

```ts
readonly presentationEnabled: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/directives/ai/AiDirective.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/ai/AiDirective.ts#L104)

Whether the presentation is currently enabled. This second input lets the marker stay on an
element whose AI provenance changes at runtime.

***

### pulseClass

```ts
readonly pulseClass: InputSignal<string>;
```

Defined in: [libs/ui/src/directives/ai/AiDirective.ts:138](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/ai/AiDirective.ts#L138)

Class added for the `pulse` attention treatment. It defaults to the motion-safe Tailwind
utility, so reduced-motion preferences are honored where Tailwind is present; supply your own
class name in an application that styles the pulse differently.

***

### variant

```ts
readonly variant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/directives/ai/AiDirective.ts:112](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/ai/AiDirective.ts#L112)

Variant applied to the host while the presentation is active.
