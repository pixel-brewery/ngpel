---
title: 'Class: TypewriterDirective'
generated: true
editUrl: false
---
# Class: TypewriterDirective

Defined in: [libs/ui/src/directives/typewriter/TypewriterDirective.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/typewriter/TypewriterDirective.ts#L37)

Types one or more text values into its host, character by character, and optionally rotates
through them.

The host keeps a zero-width space in front of the typed text, so an empty phase does not collapse
the line height. An element that exposes a `text` property — the Mosaik text element does — is
written through that property, every other element through its text content.

## Example

```html
<span [ngpTypewriter]="['Search orders', 'Search invoices']" [holdDuration]="2000"></span>
```

## Constructors

### Constructor

```ts
new TypewriterDirective(): TypewriterDirective;
```

Defined in: [libs/ui/src/directives/typewriter/TypewriterDirective.ts:52](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/typewriter/TypewriterDirective.ts#L52)

#### Returns

`TypewriterDirective`

## Properties

### holdDuration

```ts
readonly holdDuration: InputSignalWithTransform<number | undefined, string | number | null | undefined>;
```

Defined in: [libs/ui/src/directives/typewriter/TypewriterDirective.ts:105](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/typewriter/TypewriterDirective.ts#L105)

Time in milliseconds that a completed text remains visible before deletion starts.
Omitting the duration leaves the completed text visible.

***

### text

```ts
readonly text: InputSignal<string | readonly string[]>;
```

Defined in: [libs/ui/src/directives/typewriter/TypewriterDirective.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/typewriter/TypewriterDirective.ts#L86)

Text or text values typed in the supplied order. Several values rotate: each one is typed,
held and deleted again before the next one starts.

***

### typingSpeed

```ts
readonly typingSpeed: InputSignalWithTransform<number, string | number | null | undefined>;
```

Defined in: [libs/ui/src/directives/typewriter/TypewriterDirective.ts:94](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/typewriter/TypewriterDirective.ts#L94)

Number of characters typed per second.
