---
title: 'Interface: IContextDrawerTarget\<TData, TResult\>'
generated: true
editUrl: false
---
# Interface: IContextDrawerTarget\<TData, TResult\>

Defined in: [libs/ui/src/context-overlay/IContextDrawerTarget.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/context-overlay/IContextDrawerTarget.ts#L12)

A feature-owned contextual overlay presented through Mosaik drawers.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TData` | Data passed to the drawer content. |
| `TResult` | Result returned by the drawer content. |

## Properties

### canOpen

```ts
readonly canOpen: (mode) => boolean;
```

Defined in: [libs/ui/src/context-overlay/IContextDrawerTarget.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/context-overlay/IContextDrawerTarget.ts#L18)

Application authorization for the requested mode.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `mode` | `"create"` \| `"detail"` |

#### Returns

`boolean`

***

### createData?

```ts
readonly optional createData?: (context?, transient?) => TData;
```

Defined in: [libs/ui/src/context-overlay/IContextDrawerTarget.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/context-overlay/IContextDrawerTarget.ts#L26)

Enables create mode and validates any creation context.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context?` | `string` |
| `transient?` | `unknown` |

#### Returns

`TData`

***

### detailData

```ts
readonly detailData: (id, context?, transient?) => TData;
```

Defined in: [libs/ui/src/context-overlay/IContextDrawerTarget.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/context-overlay/IContextDrawerTarget.ts#L22)

Validates a detail address and builds its initial drawer data.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |
| `context?` | `string` |
| `transient?` | `unknown` |

#### Returns

`TData`

***

### key

```ts
readonly key: string;
```

Defined in: [libs/ui/src/context-overlay/IContextDrawerTarget.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/context-overlay/IContextDrawerTarget.ts#L14)

Registered URL target key.

***

### loadView

```ts
readonly loadView: (mode) => Promise<Type<unknown>>;
```

Defined in: [libs/ui/src/context-overlay/IContextDrawerTarget.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/context-overlay/IContextDrawerTarget.ts#L20)

Lazy view for the requested mode.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `mode` | `"create"` \| `"detail"` |

#### Returns

`Promise`\<`Type`\<`unknown`\>\>

***

### onClosed?

```ts
readonly optional onClosed?: (result, state) => void;
```

Defined in: [libs/ui/src/context-overlay/IContextDrawerTarget.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/context-overlay/IContextDrawerTarget.ts#L30)

Observes an interactive close and its typed outcome.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | `ICancel`\<`TResult`\> \| `undefined` |
| `state` | `IContextOverlayState` |

#### Returns

`void`

***

### onOpened?

```ts
readonly optional onOpened?: (ref, state) => void;
```

Defined in: [libs/ui/src/context-overlay/IContextDrawerTarget.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/context-overlay/IContextDrawerTarget.ts#L28)

Observes the mounted drawer.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ref` | `IDrawerRef`\<`TData`, `TResult`\> |
| `state` | `IContextOverlayState` |

#### Returns

`void`

***

### resolveDetailData?

```ts
readonly optional resolveDetailData?: (id, context, signal) => Promise<TData>;
```

Defined in: [libs/ui/src/context-overlay/IContextDrawerTarget.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/context-overlay/IContextDrawerTarget.ts#L24)

Loads detail data when opening an address without transient data.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |
| `context` | `string` \| `undefined` |
| `signal` | `AbortSignal` |

#### Returns

`Promise`\<`TData`\>

***

### size?

```ts
readonly optional size?: Partial<ISizeLike>;
```

Defined in: [libs/ui/src/context-overlay/IContextDrawerTarget.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/context-overlay/IContextDrawerTarget.ts#L16)

Feature-specific size override. The shell's drawer defaults apply otherwise.
