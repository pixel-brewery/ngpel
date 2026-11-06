---
title: 'Function: defineGalleryCollectionView()'
generated: true
editUrl: false
---
# Function: defineGalleryCollectionView()

```ts
function defineGalleryCollectionView<TItem, TView>(config): ICollectionGalleryViewConfig<TItem, TView>;
```

Defined in: [libs/ui/src/collection-view/views/gallery/defineGalleryCollectionView.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/gallery/defineGalleryCollectionView.ts#L16)

Defines a gallery collection view with full type inference.

## Type Parameters

| Type Parameter |
| ------ |
| `TItem` |
| `TView` *extends* `string` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `Omit`\<[`ICollectionGalleryViewConfig`](Interface.ICollectionGalleryViewConfig)\<`TItem`, `TView`\>, `"viewKind"`\> | The gallery view configuration. |

## Returns

[`ICollectionGalleryViewConfig`](Interface.ICollectionGalleryViewConfig)\<`TItem`, `TView`\>

The gallery view configuration.
