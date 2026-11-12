---
title: 'Class: CollectionListItemDirective\<T\>'
generated: true
editUrl: false
---
# Class: CollectionListItemDirective\<T\>

Defined in: [libs/ui/src/components/collection-list/CollectionListItemDirective.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListItemDirective.ts#L15)

Marks the caller-provided row template of a collection list.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | Collection item type. |

## Constructors

### Constructor

```ts
new CollectionListItemDirective<T>(): CollectionListItemDirective<T>;
```

#### Returns

`CollectionListItemDirective`\<`T`\>

## Properties

### ngpCollectionListItem

```ts
readonly ngpCollectionListItem: InputSignal<readonly T[]>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListItemDirective.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListItemDirective.ts#L30)

Collection used to infer the row-template item type.

## Methods

### ngTemplateContextGuard()

```ts
static ngTemplateContextGuard<T>(directive, context): context is ICollectionListItemContext<T>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListItemDirective.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListItemDirective.ts#L46)

Narrows the Angular template context to the collection item contract.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-1"></a> `T` | Collection item type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `directive` | `CollectionListItemDirective`\<`T`\> | Directive instance whose generic item type is checked. |
| `context` | `unknown` | Template context to narrow. |

#### Returns

`context is ICollectionListItemContext<T>`

Whether the context matches the collection item contract.

#### Static
