---
title: 'Class: FilePreviewPipe'
generated: true
editUrl: false
---
# Class: FilePreviewPipe

Defined in: [libs/ui/src/components/file/FilePreviewPipe.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FilePreviewPipe.ts#L19)

Creates a lifecycle-safe Mosaik thumbnail preview for a browser file.

## Implements

- `OnDestroy`
- `PipeTransform`

## Constructors

### Constructor

```ts
new FilePreviewPipe(): FilePreviewPipe;
```

#### Returns

`FilePreviewPipe`

## Methods

### ngOnDestroy()

```ts
ngOnDestroy(): void;
```

Defined in: [libs/ui/src/components/file/FilePreviewPipe.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FilePreviewPipe.ts#L77)

Releases the current browser object URL.

#### Returns

`void`

#### Implementation of

```ts
OnDestroy.ngOnDestroy
```

***

### transform()

```ts
transform(value): ThumbnailPreview;
```

Defined in: [libs/ui/src/components/file/FilePreviewPipe.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/file/FilePreviewPipe.ts#L43)

Converts a browser file into the Mosaik thumbnail contract.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `File` \| `null` \| `undefined` | File selected by the user. |

#### Returns

`ThumbnailPreview`

A Mosaik thumbnail preview or the generic document fallback.

#### Implementation of

```ts
PipeTransform.transform
```
