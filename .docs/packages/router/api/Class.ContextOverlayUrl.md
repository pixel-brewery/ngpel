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

### add()

```ts
add(
   value,
   key,
   id?,
   context?
): string;
```

Defined in: [context-overlay/ContextOverlayUrl.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayUrl.ts#L95)

Builds a link that adds a target above the current page and its existing overlays.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | In-scope application URL. |
| `key` | `string` | Registered target key. |
| `id?` | `string` | Detail identifier. Omit it to address a create surface. |
| `context?` | `string` | Optional addressable context for the target. |

#### Returns

`string`

The URL with the additional overlay.

#### Throws

Error when the URL or target address is invalid.

***

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

### remove()

```ts
remove(value): string;
```

Defined in: [context-overlay/ContextOverlayUrl.ts:105](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayUrl.ts#L105)

Builds a link to the state beneath the top overlay.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | Application-relative URL. |

#### Returns

`string`

The URL without the top overlay, or the original URL if it has no active stack.

#### Throws

Error when the URL or its overlay parameters are malformed.

***

### writeStack()

```ts
writeStack(value, stack): string;
```

Defined in: [context-overlay/ContextOverlayUrl.ts:119](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/ContextOverlayUrl.ts#L119)

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
