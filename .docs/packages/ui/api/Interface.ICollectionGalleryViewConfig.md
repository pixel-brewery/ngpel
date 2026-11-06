---
title: 'Interface: ICollectionGalleryViewConfig\<TItem, TView\>'
generated: true
editUrl: false
---
# Interface: ICollectionGalleryViewConfig\<TItem, TView\>

Defined in: [libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts#L13)

Configuration for the gallery projection of a collection view.

## Extends

- [`ICollectionViewDefinition`](Interface.ICollectionViewDefinition)\<`TView`\>

## Type Parameters

| Type Parameter |
| ------ |
| `TItem` |
| `TView` *extends* `string` |

## Properties

### iconName?

```ts
readonly optional iconName?: string;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L20)

Optional icon name used by feature-specific toggles.

#### Inherited from

[`ICollectionViewDefinition`](Interface.ICollectionViewDefinition).[`iconName`](Interface.ICollectionViewDefinition#iconname)

***

### itemIconName?

```ts
readonly optional itemIconName?: (item) => string;
```

Defined in: [libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts#L37)

Optional icon name for gallery items.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string`

***

### label?

```ts
readonly optional label?: string;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L15)

Optional display label used by feature-specific toggles.

#### Inherited from

[`ICollectionViewDefinition`](Interface.ICollectionViewDefinition).[`label`](Interface.ICollectionViewDefinition#label)

***

### metaText?

```ts
readonly optional metaText?: (item) => string;
```

Defined in: [libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts#L32)

Resolves the tertiary/meta text for a gallery item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string`

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

***

### secondaryText?

```ts
readonly optional secondaryText?: (item) => string;
```

Defined in: [libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts#L27)

Resolves the secondary text for a gallery item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string`

***

### type

```ts
readonly type: TView;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L10)

Stable view type key.

#### Inherited from

[`ICollectionViewDefinition`](Interface.ICollectionViewDefinition).[`type`](Interface.ICollectionViewDefinition#type)

***

### viewKind

```ts
readonly viewKind: "gallery";
```

Defined in: [libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/gallery/ICollectionGalleryViewConfig.ts#L17)

Discriminator used by the collection-view factory.
