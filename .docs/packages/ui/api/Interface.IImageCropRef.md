---
title: 'Interface: IImageCropRef'
generated: true
editUrl: false
---
# Interface: IImageCropRef

Defined in: [libs/ui/src/components/image-crop/IImageCropRef.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/IImageCropRef.ts#L13)

Public handle for observing and visually integrating an open image crop dialog.

## Properties

### closed

```ts
readonly closed: Observable<ICancel<File>>;
```

Defined in: [libs/ui/src/components/image-crop/IImageCropRef.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/IImageCropRef.ts#L22)

Emits the positive crop result or a negative dismissal.

***

### overlayRef

```ts
readonly overlayRef: OverlayRef;
```

Defined in: [libs/ui/src/components/image-crop/IImageCropRef.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/image-crop/IImageCropRef.ts#L30)

Underlying overlay used for application-level stacking integration.
