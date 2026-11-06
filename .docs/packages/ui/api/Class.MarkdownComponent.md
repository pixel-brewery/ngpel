---
title: 'Class: MarkdownComponent'
generated: true
editUrl: false
---
# Class: MarkdownComponent

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:597](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L597)

Safely renders the supported Markdown dialect as semantic Angular DOM.

## Constructors

### Constructor

```ts
new MarkdownComponent(): MarkdownComponent;
```

#### Returns

`MarkdownComponent`

## Properties

### breaks

```ts
readonly breaks: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:614](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L614)

Whether single line breaks become explicit line breaks.

***

### document

```ts
protected readonly document: Signal<IMarkdownDocument>;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:635](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L635)

Safe normalized representation of the current Markdown source.

***

### linkResolver

```ts
readonly linkResolver: InputSignal<((href) => string | null) | null>;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:632](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L632)

Optionally maps safe Markdown destinations to application routes.

***

### mode

```ts
readonly mode: InputSignal<"inline" | "document">;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:626](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L626)

Selects complete document rendering or inline-only rendering.

***

### preset

```ts
readonly preset: InputSignal<"article" | "chat" | "compact">;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:629](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L629)

Selects the density and typography preset.

***

### renderedHtml

```ts
readonly renderedHtml: Signal<string>;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:623](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L623)

Standard HTML representation for consumers that need HTML instead of the component DOM.

***

### safeMarkdownText

```ts
readonly safeMarkdownText: Signal<string>;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:620](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L620)

Escaped source for consumers that need a text-only binding.

***

### sanitize

```ts
readonly sanitize: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:617](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L617)

Renders only standard Markdown, without custom block extensions.

***

### text

```ts
readonly text: InputSignal<string>;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:611](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L611)

Markdown source to render.

## Methods

### resolveLink()

```ts
protected resolveLink(href): string | null;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:637](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L637)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `href` | `string` |

#### Returns

`string` \| `null`
