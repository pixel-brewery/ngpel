---
title: 'Interface: IViewItemAction'
generated: true
editUrl: false
---
# Interface: IViewItemAction

Defined in: [item-actions/IViewItemAction.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/IViewItemAction.ts#L10)

A feature-owned action for an item supplied by the current view.

## Properties

### choices?

```ts
readonly choices?: Signal<readonly IViewItemActionChoice[]>;
```

Defined in: [item-actions/IViewItemAction.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/IViewItemAction.ts#L17)

***

### descriptionKey?

```ts
readonly descriptionKey?: string;
```

Defined in: [item-actions/IViewItemAction.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/IViewItemAction.ts#L14)

***

### iconName

```ts
readonly iconName: string;
```

Defined in: [item-actions/IViewItemAction.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/IViewItemAction.ts#L15)

***

### id

```ts
readonly id: string;
```

Defined in: [item-actions/IViewItemAction.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/IViewItemAction.ts#L11)

***

### isAvailable

```ts
readonly isAvailable: Signal<boolean>;
```

Defined in: [item-actions/IViewItemAction.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/IViewItemAction.ts#L16)

***

### labelKey

```ts
readonly labelKey: string;
```

Defined in: [item-actions/IViewItemAction.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/IViewItemAction.ts#L13)

***

### order

```ts
readonly order: number;
```

Defined in: [item-actions/IViewItemAction.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/IViewItemAction.ts#L12)

## Methods

### execute()

```ts
execute(resource, choiceId?): void | Promise<void>;
```

Defined in: [item-actions/IViewItemAction.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/IViewItemAction.ts#L20)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `resource` | [`IViewMentionOption`](Interface.IViewMentionOption) |
| `choiceId?` | `string` |

#### Returns

`void` \| `Promise`\<`void`\>

***

### open()?

```ts
open?(): void;
```

Defined in: [item-actions/IViewItemAction.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/IViewItemAction.ts#L18)

#### Returns

`void`

***

### prefetch()?

```ts
prefetch?(): void;
```

Defined in: [item-actions/IViewItemAction.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/IViewItemAction.ts#L19)

#### Returns

`void`
