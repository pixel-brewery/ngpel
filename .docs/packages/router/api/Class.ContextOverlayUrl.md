---
title: 'Class: ContextOverlayUrl'
generated: true
editUrl: false
---
# Class: ContextOverlayUrl

Defined in: [context-overlay/ContextOverlayUrl.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayUrl.ts#L15)

Reads and writes an ordered overlay stack in a relative application URL. The first layer uses
`overlay`, `overlayId`, and `overlayContext`. Further layers use suffixes `.1` through `.7`.

## Constructors

### Constructor

```ts
new ContextOverlayUrl(supportsPath): ContextOverlayUrl;
```

Defined in: [context-overlay/ContextOverlayUrl.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayUrl.ts#L27)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supportsPath` | (`path`) => `boolean` | Application policy for paths allowed to host overlays. |

#### Returns

`ContextOverlayUrl`

## Methods

### parseStack()

```ts
parseStack(value):
  | readonly IContextOverlayState[]
  | "invalid";
```

Defined in: [context-overlay/ContextOverlayUrl.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayUrl.ts#L41)

Parses up to eight layers. Out-of-scope paths and URLs with no overlay yield an empty stack.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | Application-relative URL. |

#### Returns

  \| readonly [`IContextOverlayState`](Interface.IContextOverlayState)[]
  \| `"invalid"`

The ordered stack, or `invalid` for an invalid URL or malformed overlay parameters.

***

### writeStack()

```ts
writeStack(value, stack): string;
```

Defined in: [context-overlay/ContextOverlayUrl.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayUrl.ts#L95)

Replaces the overlay parameters while preserving the path, unrelated query parameters and
fragment, including their original encoding and order.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | In-scope application URL. |
| `stack` | readonly [`IContextOverlayState`](Interface.IContextOverlayState)[] | Desired stack, with its bottom layer first. |

#### Returns

`string`

The URL with the requested overlays.

#### Throws

Error when the URL is outside the configured scope or the stack is invalid.
