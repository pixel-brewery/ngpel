---
title: 'Interface: IImagePreviewImage'
generated: true
editUrl: false
---
# Interface: IImagePreviewImage

Defined in: [libs/ui/src/components/image-preview/IImagePreviewImage.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewImage.ts#L6)

Describes an image or video rendered by the preview.

## Properties

### alt?

```ts
readonly alt?: string;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewImage.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewImage.ts#L13)

Accessible alternative text for the image.

***

### captions?

```ts
readonly captions?:
  | {
  label: string;
  language: string;
  src: string;
}
  | null;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewImage.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewImage.ts#L16)

Optional WebVTT captions for video playback.

***

### height?

```ts
readonly height?: string | number;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewImage.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewImage.ts#L28)

Intrinsic or preferred image height.

***

### mediaKind?

```ts
readonly mediaKind?: "image" | "video";
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewImage.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewImage.ts#L31)

Type of media to render. Defaults to an image.

***

### poster?

```ts
readonly poster?: string | null;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewImage.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewImage.ts#L34)

Optional still image shown before a video starts.

***

### src

```ts
readonly src: string;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewImage.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewImage.ts#L42)

Image source URL.

***

### srcset?

```ts
readonly srcset?: string;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewImage.ts:50](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewImage.ts#L50)

Optional responsive image source set.

***

### width?

```ts
readonly width?: string | number;
```

Defined in: [libs/ui/src/components/image-preview/IImagePreviewImage.ts:58](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-preview/IImagePreviewImage.ts#L58)

Intrinsic or preferred image width.
