---
title: 'Interface: ICollectionTableViewConfig\<TItem, TView\>'
generated: true
editUrl: false
---
# Interface: ICollectionTableViewConfig\<TItem, TView\>

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableViewConfig.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableViewConfig.ts#L14)

Configuration for the table projection of a collection view.

## Extends

- [`ICollectionViewDefinition`](Interface.ICollectionViewDefinition)\<`TView`\>

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-titem"></a> `TItem` |
| <a id="type-parameter-tview"></a> `TView` *extends* `string` |

## Properties

### additionalColumns?

```ts
readonly additionalColumns?: readonly IDataTableColumnDefinition<TItem>[];
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableViewConfig.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableViewConfig.ts#L23)

Additional table-only columns, such as actions.

***

### iconName?

```ts
readonly iconName?: string;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L20)

Optional icon name used by feature-specific toggles.

#### Inherited from

[`ICollectionViewDefinition`](Interface.ICollectionViewDefinition).[`iconName`](Interface.ICollectionViewDefinition#iconname)

***

### label?

```ts
readonly label?: string;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L15)

Optional display label used by feature-specific toggles.

#### Inherited from

[`ICollectionViewDefinition`](Interface.ICollectionViewDefinition).[`label`](Interface.ICollectionViewDefinition#label)

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
readonly viewKind: "table";
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableViewConfig.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableViewConfig.ts#L18)

Discriminator used by the collection-view factory.
