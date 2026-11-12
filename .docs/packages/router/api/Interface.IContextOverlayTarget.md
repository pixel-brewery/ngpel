---
title: 'Interface: IContextOverlayTarget\<TResult\>'
generated: true
editUrl: false
---
# Interface: IContextOverlayTarget\<TResult\>

Defined in: [context-overlay/IContextOverlayTarget.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayTarget.ts#L10)

A feature-owned target addressable above the current page.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tresult"></a> `TResult` | `unknown` | The close result delivered back to this target. |

## Properties

### canOpen

```ts
readonly canOpen: (state) => boolean;
```

Defined in: [context-overlay/IContextOverlayTarget.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayTarget.ts#L14)

Checks whether the requested resource and mode may be opened.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`IContextOverlayState`](Interface.IContextOverlayState) |

#### Returns

`boolean`

***

### key

```ts
readonly key: string;
```

Defined in: [context-overlay/IContextOverlayTarget.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayTarget.ts#L12)

Unique key written into the URL.

***

### onClosed?

```ts
readonly onClosed?: (result, state) => void;
```

Defined in: [context-overlay/IContextOverlayTarget.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayTarget.ts#L18)

Receives an interactive close result. Route-driven closes do not call it.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | `TResult` \| `undefined` |
| `state` | [`IContextOverlayState`](Interface.IContextOverlayState) |

#### Returns

`void`

***

### prepare

```ts
readonly prepare: (state, transient?) => ContextOverlayLoader<TResult>;
```

Defined in: [context-overlay/IContextOverlayTarget.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayTarget.ts#L16)

Validates the address synchronously and prepares the loader without mounting anything.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`IContextOverlayState`](Interface.IContextOverlayState) |
| `transient?` | `unknown` |

#### Returns

[`ContextOverlayLoader`](TypeAlias.ContextOverlayLoader)\<`TResult`\>
