---
title: 'Class: NavigationManager'
generated: true
editUrl: false
---
# Class: NavigationManager

Defined in: [navigation/NavigationManager.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationManager.ts#L32)

The signal-based navigation registry: it collects every contributed [INavItem](Interface.INavItem), runs the
registered [INavigationGuard](Interface.INavigationGuard)s over them, indexes the result by key, region and parent, and
exposes it as signals so hosts re-render on their own.

Guard evaluation is asynchronous, so [NavigationManager.isReady](#isready) reports whether the
current evaluation has completed. Whenever a guard's `stateChanges` fires — a sign-in, a
sign-out, a permission refresh — the registry is cleared immediately and evaluated again; a
monotonic registration version makes a slower, outdated evaluation discard its result instead of
restoring the navigation of a previous user.

Registered by `provideNavigation(...)`.

## Constructors

### Constructor

```ts
new NavigationManager(): NavigationManager;
```

Defined in: [navigation/NavigationManager.ts:59](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationManager.ts#L59)

Constructs a new instance of the `NavigationManager` class.

#### Returns

`NavigationManager`

## Accessors

### all

#### Get Signature

```ts
get all(): Signal<readonly INavItem[]>;
```

Defined in: [navigation/NavigationManager.ts:116](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationManager.ts#L116)

Every registered item, sorted by order.

##### Returns

`Signal`\<readonly [`INavItem`](Interface.INavItem)[]\>

***

### isReady

#### Get Signature

```ts
get isReady(): Signal<boolean>;
```

Defined in: [navigation/NavigationManager.ts:96](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationManager.ts#L96)

Whether the current guard evaluation has completed. It drops back to `false` while the
registry is rebuilt, so a host can hold its skeleton instead of flashing an empty menu.

##### Returns

`Signal`\<`boolean`\>

***

### items

#### Get Signature

```ts
get items(): Signal<ReadonlyMap<string, INavItem>>;
```

Defined in: [navigation/NavigationManager.ts:106](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationManager.ts#L106)

Every registered item by key.

##### Returns

`Signal`\<`ReadonlyMap`\<`string`, [`INavItem`](Interface.INavItem)\>\>

***

### roots

#### Get Signature

```ts
get roots(): Signal<readonly INavItem[]>;
```

Defined in: [navigation/NavigationManager.ts:126](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationManager.ts#L126)

Every item without a registered parent, sorted by order.

##### Returns

`Signal`\<readonly [`INavItem`](Interface.INavItem)[]\>

## Methods

### byRegion()

```ts
byRegion(region): Signal<readonly INavItem[]>;
```

Defined in: [navigation/NavigationManager.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationManager.ts#L141)

Creates a signal of the items of one region, sorted by order.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `region` | `string` \| `undefined` | The region, for example `'main'`. |

#### Returns

`Signal`\<readonly [`INavItem`](Interface.INavItem)[]\>

The region's items.

***

### children()

```ts
children(parentKey): Signal<readonly INavItem[]>;
```

Defined in: [navigation/NavigationManager.ts:193](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationManager.ts#L193)

Creates a signal of an item's children, sorted by order.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentKey` | `string` | The parent's key. |

#### Returns

`Signal`\<readonly [`INavItem`](Interface.INavItem)[]\>

The children.

***

### execute()

```ts
execute(keyOrItem): Promise<void>;
```

Defined in: [navigation/NavigationManager.ts:221](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationManager.ts#L221)

Executes an item's handle.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `keyOrItem` | `string` \| [`INavItem`](Interface.INavItem) | The item, or the key of a registered item. |

#### Returns

`Promise`\<`void`\>

A promise that settles when the handle has been executed.

#### Throws

Error when the key is not registered, or the handle cannot be executed.

***

### has()

```ts
has(key): Signal<boolean>;
```

Defined in: [navigation/NavigationManager.ts:209](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationManager.ts#L209)

Creates a signal telling whether an item is registered.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The item key. |

#### Returns

`Signal`\<`boolean`\>

Whether the item is registered.

***

### item()

```ts
item(key): Signal<INavItem | undefined>;
```

Defined in: [navigation/NavigationManager.ts:167](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationManager.ts#L167)

Creates a signal of one item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The item key. |

#### Returns

`Signal`\<[`INavItem`](Interface.INavItem) \| `undefined`\>

The item, or `undefined` while it is not registered.

***

### parent()

```ts
parent(childKey): Signal<INavItem | undefined>;
```

Defined in: [navigation/NavigationManager.ts:178](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationManager.ts#L178)

Creates a signal of an item's parent.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `childKey` | `string` | The child's key. |

#### Returns

`Signal`\<[`INavItem`](Interface.INavItem) \| `undefined`\>

The parent, or `undefined` for a root item.

***

### rootsByRegion()

```ts
rootsByRegion(region): Signal<readonly INavItem[]>;
```

Defined in: [navigation/NavigationManager.ts:152](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationManager.ts#L152)

Creates a signal of the items of one region that have no registered parent, sorted by order.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `region` | `string` \| `undefined` | The region, for example `'main'`. |

#### Returns

`Signal`\<readonly [`INavItem`](Interface.INavItem)[]\>

The region's root items.

***

### tryExecute()

```ts
tryExecute(keyOrItem): Promise<boolean>;
```

Defined in: [navigation/NavigationManager.ts:238](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NavigationManager.ts#L238)

Executes an item's handle, reporting failure instead of throwing.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `keyOrItem` | `string` \| [`INavItem`](Interface.INavItem) | The item, or the key of a registered item. |

#### Returns

`Promise`\<`boolean`\>

Whether the handle was executed.
