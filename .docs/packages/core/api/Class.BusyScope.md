---
title: 'Class: BusyScope\<TState\>'
generated: true
editUrl: false
---
# Class: BusyScope\<TState\>

Defined in: [state/BusyScope.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScope.ts#L15)

A strictly typed busy scope holding multiple named busy states, each with its own nested
counter (enter/exit). All signals are created up front, so the scope is ready to bind to
templates immediately after construction.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TState` *extends* `string` | String union of the allowed state names. |

## Constructors

### Constructor

```ts
new BusyScope<TState>(allowedStates, scopeName?): BusyScope<TState>;
```

Defined in: [state/BusyScope.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScope.ts#L37)

Constructs a new instance of the `BusyScope` class with a fixed set of allowed states.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `allowedStates` | readonly `TState`[] | The only allowed state names for this scope. |
| `scopeName?` | `string` | Optional name for diagnostics. |

#### Returns

`BusyScope`\<`TState`\>

#### Throws

Error when no state is provided.

## Accessors

### busyRecord

#### Get Signature

```ts
get busyRecord(): Signal<Record<TState, boolean>>;
```

Defined in: [state/BusyScope.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScope.ts#L104)

A record of every state and its busy flag.

##### Returns

`Signal`\<`Record`\<`TState`, `boolean`\>\>

***

### isBusy

#### Get Signature

```ts
get isBusy(): Signal<boolean>;
```

Defined in: [state/BusyScope.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScope.ts#L95)

`true` while at least one state is busy.

##### Returns

`Signal`\<`boolean`\>

***

### scopeName

#### Get Signature

```ts
get scopeName(): string;
```

Defined in: [state/BusyScope.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScope.ts#L77)

The diagnostic name of this scope.

##### Returns

`string`

***

### stateNames

#### Get Signature

```ts
get stateNames(): Signal<readonly TState[]>;
```

Defined in: [state/BusyScope.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScope.ts#L86)

The allowed state names in registration order.

##### Returns

`Signal`\<readonly `TState`[]\>

## Methods

### aggregate()

```ts
aggregate(states): Signal<boolean>;
```

Defined in: [state/BusyScope.ts:183](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScope.ts#L183)

Produces a computed flag that becomes `true` if any of the provided states is busy.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `states` | readonly `TState`[] \| `ReadonlySet`\<`TState`\> | The states to aggregate. |

#### Returns

`Signal`\<`boolean`\>

A signal that is `true` when any listed state is busy.

***

### all()

```ts
all(states): Signal<boolean>;
```

Defined in: [state/BusyScope.ts:207](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScope.ts#L207)

Produces a computed flag that becomes `true` only if all of the provided states are busy.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `states` | readonly `TState`[] \| `ReadonlySet`\<`TState`\> | The states to check. |

#### Returns

`Signal`\<`boolean`\>

A signal that is `true` when every listed state is busy (and the list is not empty).

***

### any()

```ts
any(states): Signal<boolean>;
```

Defined in: [state/BusyScope.ts:196](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScope.ts#L196)

Convenience alias for [BusyScope.aggregate](#aggregate).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `states` | readonly `TState`[] \| `ReadonlySet`\<`TState`\> | The states to check. |

#### Returns

`Signal`\<`boolean`\>

A signal that is `true` when any listed state is busy.

***

### busy()

```ts
busy(state): Signal<boolean>;
```

Defined in: [state/BusyScope.ts:156](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScope.ts#L156)

Returns the stable, memoized busy flag for the given state.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `state` | `TState` | One of the allowed state names. |

#### Returns

`Signal`\<`boolean`\>

A signal that is `true` while the state counter is greater than zero.

***

### countOf()

```ts
countOf(state): Signal<number>;
```

Defined in: [state/BusyScope.ts:172](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScope.ts#L172)

Returns the nested counter signal for a given state.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `state` | `TState` | One of the allowed state names. |

#### Returns

`Signal`\<`number`\>

A signal representing the current nesting depth.

***

### enter()

```ts
enter(state): void;
```

Defined in: [state/BusyScope.ts:118](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScope.ts#L118)

Marks the beginning of the specified busy state by incrementing its nested counter.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `state` | `TState` | One of the allowed state names. |

#### Returns

`void`

***

### exit()

```ts
exit(state): void;
```

Defined in: [state/BusyScope.ts:128](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScope.ts#L128)

Marks the end of the specified busy state by decrementing its nested counter (never below zero).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `state` | `TState` | One of the allowed state names. |

#### Returns

`void`

***

### reset()

```ts
reset(state?): void;
```

Defined in: [state/BusyScope.ts:138](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/BusyScope.ts#L138)

Resets the specified state to not busy, or resets all states when `state` is omitted.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `state?` | `TState` | Optional state to reset. |

#### Returns

`void`
