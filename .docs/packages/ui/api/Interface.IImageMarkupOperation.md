---
title: 'Interface: IImageMarkupOperation'
generated: true
editUrl: false
---
# Interface: IImageMarkupOperation

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts#L14)

Immutable drawing operation stored by the markup editor history.

## Properties

### color

```ts
readonly color: string;
```

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts#L39)

CSS color used to render the operation.

***

### fontSize?

```ts
readonly optional fontSize?: number;
```

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts:71](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts#L71)

Text or symbol size in source-image pixels.

***

### points

```ts
readonly points: readonly IImageMarkupPoint[];
```

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts#L31)

Source-image points used by the operation.

***

### strokeWidth

```ts
readonly strokeWidth: number;
```

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts#L47)

Stroke width in source-image pixels.

***

### symbol?

```ts
readonly optional symbol?: ImageMarkupSymbolValue;
```

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts:63](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts#L63)

Optional symbol for symbol operations.

***

### text?

```ts
readonly optional text?: string;
```

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts:55](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts#L55)

Optional text content for text operations.

***

### tool

```ts
readonly tool: ImageMarkupToolValue;
```

Defined in: [libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-markup-editor/IImageMarkupOperation.ts#L23)

Tool that produced the operation.
