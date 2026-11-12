---
title: 'Interface: IFileItem'
generated: true
editUrl: false
---
# Interface: IFileItem

Defined in: [libs/ui/src/components/files/IFileItem.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/IFileItem.ts#L13)

Framework-independent view model rendered by the generic files container.

## Properties

### contentType?

```ts
readonly contentType?: string | null;
```

Defined in: [libs/ui/src/components/files/IFileItem.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/IFileItem.ts#L21)

Optional MIME type used to infer a preview.

***

### description?

```ts
readonly description?: string | null;
```

Defined in: [libs/ui/src/components/files/IFileItem.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/IFileItem.ts#L24)

Optional supporting text.

***

### disabled?

```ts
readonly disabled?: boolean;
```

Defined in: [libs/ui/src/components/files/IFileItem.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/IFileItem.ts#L27)

Whether this individual file rejects interactions.

***

### fileName

```ts
readonly fileName: string;
```

Defined in: [libs/ui/src/components/files/IFileItem.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/IFileItem.ts#L18)

User-facing file name.

***

### id

```ts
readonly id: string | number;
```

Defined in: [libs/ui/src/components/files/IFileItem.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/IFileItem.ts#L15)

Stable identifier returned by item interaction events.

***

### preview?

```ts
readonly preview?: ThumbnailPreview | null;
```

Defined in: [libs/ui/src/components/files/IFileItem.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/IFileItem.ts#L30)

Optional explicit Mosaik thumbnail preview.

***

### previewUrl?

```ts
readonly previewUrl?: string | null;
```

Defined in: [libs/ui/src/components/files/IFileItem.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/IFileItem.ts#L33)

Optional media URL used to infer an image, video, or audio preview.

***

### progress?

```ts
readonly progress?: number;
```

Defined in: [libs/ui/src/components/files/IFileItem.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/IFileItem.ts#L36)

Determinate progress between zero and one.

***

### sizeInBytes?

```ts
readonly sizeInBytes?: number | null;
```

Defined in: [libs/ui/src/components/files/IFileItem.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/IFileItem.ts#L39)

File size in bytes.

***

### state?

```ts
readonly state?: FileStateValue;
```

Defined in: [libs/ui/src/components/files/IFileItem.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/IFileItem.ts#L42)

Current visual and interaction state.

***

### stateLabel?

```ts
readonly stateLabel?: string | null;
```

Defined in: [libs/ui/src/components/files/IFileItem.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/files/IFileItem.ts#L45)

Accessible label for the current state.
