---
title: 'Abstract Class: ReactiveCacheRegistrar\<TKey, TValue\>'
generated: true
editUrl: false
---
# Abstract Class: ReactiveCacheRegistrar\<TKey, TValue\>

Defined in: [rx/cache/ReactiveCacheRegistrar.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheRegistrar.ts#L15)

An in-memory key/value registry with observable change notification. Subclass it to build
product registries whose consumers react through RxJS streams.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-tkey"></a> `TKey` |
| <a id="type-parameter-tvalue"></a> `TValue` |

## Constructors

### Constructor

```ts
protected new ReactiveCacheRegistrar<TKey, TValue>(): ReactiveCacheRegistrar<TKey, TValue>;
```

Defined in: [rx/cache/ReactiveCacheRegistrar.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheRegistrar.ts#L28)

Constructs a new instance of the `ReactiveCacheRegistrar` class.

#### Returns

`ReactiveCacheRegistrar`\<`TKey`, `TValue`\>

## Accessors

### changed

#### Get Signature

```ts
get changed(): Observable<IReactiveCacheChange<TValue>>;
```

Defined in: [rx/cache/ReactiveCacheRegistrar.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheRegistrar.ts#L42)

Emits after every change, carrying the reason and the current items.

##### Returns

`Observable`\<[`IReactiveCacheChange`](Interface.IReactiveCacheChange)\<`TValue`\>\>

***

### registrations

#### Get Signature

```ts
get protected registrations(): ReadonlyMap<TKey, TValue>;
```

Defined in: [rx/cache/ReactiveCacheRegistrar.ts:49](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheRegistrar.ts#L49)

The current registrations.

##### Returns

`ReadonlyMap`\<`TKey`, `TValue`\>

## Methods

### clear()

```ts
clear(): this;
```

Defined in: [rx/cache/ReactiveCacheRegistrar.ts:160](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheRegistrar.ts#L160)

Removes every registration.

#### Returns

`this`

***

### get()

```ts
get(key): TValue;
```

Defined in: [rx/cache/ReactiveCacheRegistrar.ts:63](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheRegistrar.ts#L63)

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

Defined in: [rx/cache/ReactiveCacheRegistrar.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheRegistrar.ts#L79)

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

Defined in: [rx/cache/ReactiveCacheRegistrar.ts:170](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheRegistrar.ts#L170)

Publishes a change event carrying the current items.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `reason` | [`ReactiveCacheChangedReason`](TypeAlias.ReactiveCacheChangedReason) |

#### Returns

`void`

***

### remove()

```ts
remove(key): this;
```

Defined in: [rx/cache/ReactiveCacheRegistrar.ts:126](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheRegistrar.ts#L126)

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

Defined in: [rx/cache/ReactiveCacheRegistrar.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheRegistrar.ts#L141)

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

Defined in: [rx/cache/ReactiveCacheRegistrar.ts:89](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheRegistrar.ts#L89)

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

Defined in: [rx/cache/ReactiveCacheRegistrar.ts:105](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/ReactiveCacheRegistrar.ts#L105)

Registers every entry of `values`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `values` | `ReadonlyMap`\<`TKey`, `TValue`\> |

#### Returns

`this`

#### Throws

Error if the map itself or any of its keys or values is null or undefined.
