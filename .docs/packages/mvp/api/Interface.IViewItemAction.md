---
title: 'Interface: IViewItemAction'
generated: true
editUrl: false
---
# Interface: IViewItemAction

Defined in: item-actions/IViewItemAction.ts:10

A feature-owned action for an item supplied by the current view.

## Properties

### choices?

```ts
readonly optional choices?: Signal<readonly IViewItemActionChoice[]>;
```

Defined in: item-actions/IViewItemAction.ts:17

***

### descriptionKey?

```ts
readonly optional descriptionKey?: string;
```

Defined in: item-actions/IViewItemAction.ts:14

***

### iconName

```ts
readonly iconName: string;
```

Defined in: item-actions/IViewItemAction.ts:15

***

### id

```ts
readonly id: string;
```

Defined in: item-actions/IViewItemAction.ts:11

***

### isAvailable

```ts
readonly isAvailable: Signal<boolean>;
```

Defined in: item-actions/IViewItemAction.ts:16

***

### labelKey

```ts
readonly labelKey: string;
```

Defined in: item-actions/IViewItemAction.ts:13

***

### order

```ts
readonly order: number;
```

Defined in: item-actions/IViewItemAction.ts:12

## Methods

### execute()

```ts
execute(resource, choiceId?): void | Promise<void>;
```

Defined in: item-actions/IViewItemAction.ts:20

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
optional open(): void;
```

Defined in: item-actions/IViewItemAction.ts:18

#### Returns

`void`

***

### prefetch()?

```ts
optional prefetch(): void;
```

Defined in: item-actions/IViewItemAction.ts:19

#### Returns

`void`
