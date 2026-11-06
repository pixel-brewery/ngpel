---
title: 'Class: MarkdownComponent'
generated: true
editUrl: false
---
# Class: MarkdownComponent

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:399](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L399)

Renders markdown content using the `marked` library with a Mosaik-component-based renderer.

## Remarks

This component uses `ViewEncapsulation.ShadowDom` to encapsulate its styles
and prevent leaking into the rest of the application. The rendered HTML is
generated via `marked` and injected via `innerHTML`.

Uses all `@pixel-brewery/markdowner-core` processors:
- SplitProcessor — side-by-side columns
- CalloutProcessor — banners with variant
- BlockquoteProcessor — styled message boxes
- CodeBlockProcessor — code blocks with language detection
- TabProcessor — tabbed content
- StepsProcessor — vertical stepper
- DetailsProcessor — expandable sections
- ButtonProcessor — styled buttons
- CardProcessor — highlighted box cards

## Constructors

### Constructor

```ts
new MarkdownComponent(): MarkdownComponent;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:409](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L409)

#### Returns

`MarkdownComponent`

## Properties

### breaks

```ts
breaks: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:571](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L571)

Whether to enable line breaks in the markdown output.

***

### renderedHtml

```ts
renderedHtml: Signal<string | SafeHtml>;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:594](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L594)

The rendered HTML output as a safe HTML binding.

***

### safeMarkdownText

```ts
safeMarkdownText: Signal<string>;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:585](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L585)

Markdown source with raw HTML escaped before Mosaik formats the supported Markdown syntax.

***

### sanitize

```ts
sanitize: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:578](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L578)

Whether to render standard Markdown through Mosaik's safe text formatter.

***

### text

```ts
text: InputSignal<string>;
```

Defined in: [libs/ui/src/components/markdown/MarkdownComponent.ts:564](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/markdown/MarkdownComponent.ts#L564)

The markdown text to render.
