---
title: 'Class: TypewriterDirective'
generated: true
editUrl: false
---
# Class: TypewriterDirective

Defined in: [libs/ui/src/directives/typewriter/TypewriterDirective.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/typewriter/TypewriterDirective.ts#L38)

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

Defined in: [libs/ui/src/directives/typewriter/TypewriterDirective.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/typewriter/TypewriterDirective.ts#L53)

#### Returns

`TypewriterDirective`

## Properties

### displayedText

```ts
readonly displayedText: Signal<string>;
```

Defined in: [libs/ui/src/directives/typewriter/TypewriterDirective.ts:118](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/typewriter/TypewriterDirective.ts#L118)

The current text without the host renderer's line-height placeholder.

***

### holdDuration

```ts
readonly holdDuration: InputSignalWithTransform<number | undefined, string | number | null | undefined>;
```

Defined in: [libs/ui/src/directives/typewriter/TypewriterDirective.ts:110](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/typewriter/TypewriterDirective.ts#L110)

Time in milliseconds that a completed text remains visible before deletion starts.
Omitting the duration leaves the completed text visible.

***

### renderToHost

```ts
readonly renderToHost: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/directives/typewriter/TypewriterDirective.ts:115](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/typewriter/TypewriterDirective.ts#L115)

When disabled, the caller renders the current text from [displayedText](#displayedtext).

***

### text

```ts
readonly text: InputSignal<string | readonly string[]>;
```

Defined in: [libs/ui/src/directives/typewriter/TypewriterDirective.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/typewriter/TypewriterDirective.ts#L91)

Text or text values typed in the supplied order. Several values rotate: each one is typed,
held and deleted again before the next one starts.

***

### typingSpeed

```ts
readonly typingSpeed: InputSignalWithTransform<number, string | number | null | undefined>;
```

Defined in: [libs/ui/src/directives/typewriter/TypewriterDirective.ts:99](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/typewriter/TypewriterDirective.ts#L99)

Number of characters typed per second.
