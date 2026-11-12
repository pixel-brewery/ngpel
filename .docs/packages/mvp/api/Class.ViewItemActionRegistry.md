---
title: 'Class: ViewItemActionRegistry'
generated: true
editUrl: false
---
# Class: ViewItemActionRegistry

Defined in: [item-actions/ViewItemActionRegistry.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/ViewItemActionRegistry.ts#L11)

Resolves the actions contributed by enabled frontend features.

## Constructors

### Constructor

```ts
new ViewItemActionRegistry(): ViewItemActionRegistry;
```

Defined in: [item-actions/ViewItemActionRegistry.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/ViewItemActionRegistry.ts#L25)

#### Returns

`ViewItemActionRegistry`

## Properties

### available

```ts
readonly available: Signal<readonly IViewItemAction[]>;
```

Defined in: [item-actions/ViewItemActionRegistry.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/ViewItemActionRegistry.ts#L21)

Available actions in deterministic menu order.

## Methods

### resolve()

```ts
resolve(id): IViewItemAction | undefined;
```

Defined in: [item-actions/ViewItemActionRegistry.ts:54](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/ViewItemActionRegistry.ts#L54)

Finds one registered action by its feature-owned identity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | Stable action identifier. |

#### Returns

[`IViewItemAction`](Interface.IViewItemAction) \| `undefined`

The registered action, if present.
