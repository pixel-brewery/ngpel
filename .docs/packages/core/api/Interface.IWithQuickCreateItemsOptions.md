---
title: 'Interface: IWithQuickCreateItemsOptions'
generated: true
editUrl: false
---
# Interface: IWithQuickCreateItemsOptions

Defined in: [search/quick-create/IWithQuickCreateItemsOptions.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/IWithQuickCreateItemsOptions.ts#L14)

Options for contributing contextual create actions.

## Properties

### id

```ts
readonly id: string;
```

Defined in: [search/quick-create/IWithQuickCreateItemsOptions.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/IWithQuickCreateItemsOptions.ts#L18)

Stable unique id for this feature contribution.

***

### items?

```ts
readonly items?: readonly IQuickCreateItem[];
```

Defined in: [search/quick-create/IWithQuickCreateItemsOptions.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/IWithQuickCreateItemsOptions.ts#L23)

Static quick-create items to contribute.

***

### sources?

```ts
readonly sources?: readonly Type<IQuickCreateItemSource>[];
```

Defined in: [search/quick-create/IWithQuickCreateItemsOptions.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/IWithQuickCreateItemsOptions.ts#L28)

Injectable classes that provide quick-create items dynamically.
