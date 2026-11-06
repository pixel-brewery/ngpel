---
title: 'Function: defineCollectionField()'
generated: true
editUrl: false
---
# Function: defineCollectionField()

```ts
function defineCollectionField<TItem>(field): ICollectionField<TItem>;
```

Defined in: [libs/ui/src/collection-view/fields/defineCollectionField.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/fields/defineCollectionField.ts#L15)

Defines a collection field with full type inference.

## Type Parameters

| Type Parameter |
| ------ |
| `TItem` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`ICollectionField`](Interface.ICollectionField)\<`TItem`\> | The collection field configuration. |

## Returns

[`ICollectionField`](Interface.ICollectionField)\<`TItem`\>

The field configuration.
