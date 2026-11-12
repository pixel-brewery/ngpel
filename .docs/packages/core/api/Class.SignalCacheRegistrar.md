---
title: 'Abstract Class: SignalCacheRegistrar\<TKey, TValue\>'
generated: true
editUrl: false
---
# Abstract Class: SignalCacheRegistrar\<TKey, TValue\>

Defined in: [cache/SignalCacheRegistrar.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheRegistrar.ts#L15)

An in-memory key/value registry with signal-based change notification. Subclass it to build
product registries (navigation items, commands, widgets) that templates can observe.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-tkey"></a> `TKey` |
| <a id="type-parameter-tvalue"></a> `TValue` |

## Constructors

### Constructor

```ts
protected new SignalCacheRegistrar<TKey, TValue>(): SignalCacheRegistrar<TKey, TValue>;
```

Defined in: [cache/SignalCacheRegistrar.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheRegistrar.ts#L28)

Constructs a new instance of the `SignalCacheRegistrar` class.

#### Returns

`SignalCacheRegistrar`\<`TKey`, `TValue`\>

## Accessors

### changed

#### Get Signature

```ts
get changed(): Signal<ISignalCacheChange<TValue>>;
```

Defined in: [cache/SignalCacheRegistrar.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheRegistrar.ts#L42)

The latest change event.

##### Returns

`Signal`\<[`ISignalCacheChange`](Interface.ISignalCacheChange)\<`TValue`\>\>

***

### registrations

#### Get Signature

```ts
get protected registrations(): ReadonlyMap<TKey, TValue>;
```

Defined in: [cache/SignalCacheRegistrar.ts:49](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheRegistrar.ts#L49)

The current registrations.

##### Returns

`ReadonlyMap`\<`TKey`, `TValue`\>

## Methods

### clear()

```ts
clear(): this;
```

Defined in: [cache/SignalCacheRegistrar.ts:160](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheRegistrar.ts#L160)

Removes every registration.

#### Returns

`this`

***

### get()

```ts
get(key): TValue;
```

Defined in: [cache/SignalCacheRegistrar.ts:63](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheRegistrar.ts#L63)

Returns the value registered under `key`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `TKey` |

#### Returns

`TValue`

#### Throws

Error if the key is null or undefined, or if no registration exists for the key.

***

### has()

```ts
has(key): boolean;
```

Defined in: [cache/SignalCacheRegistrar.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheRegistrar.ts#L79)

Returns whether a registration exists for `key`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `TKey` |

#### Returns

`boolean`

***

### notifyChanged()

```ts
protected notifyChanged(reason): void;
```

Defined in: [cache/SignalCacheRegistrar.ts:170](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheRegistrar.ts#L170)

Publishes a change event carrying the current items.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `reason` | [`SignalCacheChangedReason`](TypeAlias.SignalCacheChangedReason) |

#### Returns

`void`

***

### remove()

```ts
remove(key): this;
```

Defined in: [cache/SignalCacheRegistrar.ts:126](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheRegistrar.ts#L126)

Removes the registration under `key`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `TKey` |

#### Returns

`this`

#### Throws

Error if the key is null or undefined.

***

### removeMany()

```ts
removeMany(keys): this;
```

Defined in: [cache/SignalCacheRegistrar.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheRegistrar.ts#L141)

Removes the registrations under every key of `keys`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `keys` | readonly `TKey`[] |

#### Returns

`this`

#### Throws

Error if the array itself or any of its keys is null or undefined.

***

### set()

```ts
set(key, value): this;
```

Defined in: [cache/SignalCacheRegistrar.ts:89](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheRegistrar.ts#L89)

Registers `value` under `key`, replacing an existing registration.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `TKey` |
| `value` | `TValue` |

#### Returns

`this`

#### Throws

Error if the key or value is null or undefined.

***

### setMany()

```ts
setMany(values): this;
```

Defined in: [cache/SignalCacheRegistrar.ts:105](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/SignalCacheRegistrar.ts#L105)

Registers every entry of `values`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `values` | `ReadonlyMap`\<`TKey`, `TValue`\> |

#### Returns

`this`

#### Throws

Error if the map itself or any of its keys or values is null or undefined.
