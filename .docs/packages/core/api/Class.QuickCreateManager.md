---
title: 'Class: QuickCreateManager'
generated: true
editUrl: false
---
# Class: QuickCreateManager

Defined in: [search/quick-create/QuickCreateManager.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/QuickCreateManager.ts#L16)

Resolves and executes contextual create actions registered by feature modules.

## Constructors

### Constructor

```ts
new QuickCreateManager(): QuickCreateManager;
```

Defined in: [search/quick-create/QuickCreateManager.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/QuickCreateManager.ts#L31)

Constructs a new instance of the `QuickCreateManager` class.

#### Returns

`QuickCreateManager`

## Accessors

### items

#### Get Signature

```ts
get items(): readonly IQuickCreateItem[];
```

Defined in: [search/quick-create/QuickCreateManager.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/QuickCreateManager.ts#L47)

Gets all registered actions that the current user is allowed to execute.
Dynamic sources are resolved for each read so permissions and translations stay current.

##### Returns

readonly [`IQuickCreateItem`](Interface.IQuickCreateItem)[]

## Methods

### execute()

```ts
execute(itemId): Promise<void>;
```

Defined in: [search/quick-create/QuickCreateManager.ts:103](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/QuickCreateManager.ts#L103)

Executes the permitted create action identified by the navigation item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemId` | `string` | Stable identifier of the action to execute. |

#### Returns

`Promise`\<`void`\>

***

### getItem()

```ts
getItem(itemId): IQuickCreateItem | undefined;
```

Defined in: [search/quick-create/QuickCreateManager.ts:74](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/QuickCreateManager.ts#L74)

Resolves an executable create action by its stable identifier.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemId` | `string` | Stable identifier of the action to resolve. |

#### Returns

[`IQuickCreateItem`](Interface.IQuickCreateItem) \| `undefined`

The permitted action, or `undefined` when it is unavailable.

***

### getItemForNavigation()

```ts
getItemForNavigation(navigationItemKey): IQuickCreateItem | undefined;
```

Defined in: [search/quick-create/QuickCreateManager.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/quick-create/QuickCreateManager.ts#L86)

Resolves the permitted action registered for a navigation item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `navigationItemKey` | `string` | Feature-owned navigation item key. |

#### Returns

[`IQuickCreateItem`](Interface.IQuickCreateItem) \| `undefined`

The permitted action, or `undefined` when no action is registered or available.
