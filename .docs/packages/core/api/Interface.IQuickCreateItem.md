---
title: 'Interface: IQuickCreateItem'
generated: true
editUrl: false
---
# Interface: IQuickCreateItem

Defined in: [search/quick-create/IQuickCreateItem.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/IQuickCreateItem.ts#L6)

Represents a single contextual create action registered by a feature module.

## Properties

### description?

```ts
readonly optional description?: string;
```

Defined in: [search/quick-create/IQuickCreateItem.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/IQuickCreateItem.ts#L25)

Optional description used to explain the create action.

***

### id

```ts
readonly id: string;
```

Defined in: [search/quick-create/IQuickCreateItem.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/IQuickCreateItem.ts#L10)

Stable unique identifier supplied by the contributing feature.

***

### label

```ts
readonly label: string;
```

Defined in: [search/quick-create/IQuickCreateItem.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/IQuickCreateItem.ts#L20)

Display label supplied by the contributing feature.

***

### navigationItemKey?

```ts
readonly optional navigationItemKey?: string;
```

Defined in: [search/quick-create/IQuickCreateItem.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/IQuickCreateItem.ts#L15)

Optional feature-owned navigation item key that exposes this action.

## Methods

### canExecute()

```ts
canExecute(): boolean;
```

Defined in: [search/quick-create/IQuickCreateItem.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/IQuickCreateItem.ts#L31)

Returns whether the current user is allowed to execute this action.
Items where `canExecute()` returns `false` are not exposed in the navigation.

#### Returns

`boolean`

***

### execute()

```ts
execute(): void | Promise<void>;
```

Defined in: [search/quick-create/IQuickCreateItem.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/IQuickCreateItem.ts#L36)

Executes the create action.

#### Returns

`void` \| `Promise`\<`void`\>
