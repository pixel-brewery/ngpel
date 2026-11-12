---
title: 'Interface: ICollectionGalleryView\<TItem\>'
generated: true
editUrl: false
---
# Interface: ICollectionGalleryView\<TItem\>

Defined in: [libs/ui/src/collection-view/views/gallery/ICollectionGalleryView.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/gallery/ICollectionGalleryView.ts#L12)

Runtime gallery projection for a collection view.

## Extends

- `Omit`\<[`ICollectionGalleryViewConfig`](Interface.ICollectionGalleryViewConfig)\<`TItem`, `string`\>, `"type"` \| `"label"` \| `"iconName"` \| `"viewKind"`\>

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-titem"></a> `TItem` |

## Properties

### itemIconName?

```ts
readonly itemIconName?: (item) => string;
```

Defined in: [libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts#L37)

Optional icon name for gallery items.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string`

#### Inherited from

`Omit.itemIconName`

***

### metaText?

```ts
readonly metaText?: (item) => string;
```

Defined in: [libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts#L32)

Resolves the tertiary/meta text for a gallery item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string`

#### Inherited from

`Omit.metaText`

***

### primaryText

```ts
readonly primaryText: (item) => string;
```

Defined in: [libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts#L22)

Resolves the primary text for a gallery item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string`

#### Inherited from

`Omit.primaryText`

***

### secondaryText?

```ts
readonly secondaryText?: (item) => string;
```

Defined in: [libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts#L27)

Resolves the secondary text for a gallery item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string`

#### Inherited from

`Omit.secondaryText`

***

### viewIconName?

```ts
readonly viewIconName?: string;
```

Defined in: [libs/ui/src/collection-view/views/gallery/ICollectionGalleryView.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/gallery/ICollectionGalleryView.ts#L16)

Optional icon name used by feature-specific view toggles.
