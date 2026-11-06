---
title: 'Interface: IContextOverlayRoutingOptions'
generated: true
editUrl: false
---
# Interface: IContextOverlayRoutingOptions

Defined in: [context-overlay/IContextOverlayRoutingOptions.ts:2](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayRoutingOptions.ts#L2)

Application policies for contextual overlay routing.

## Properties

### onInvalidUrl

```ts
readonly onInvalidUrl: (url, error) => void | Promise<unknown>;
```

Defined in: [context-overlay/IContextOverlayRoutingOptions.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayRoutingOptions.ts#L6)

Handles malformed, unregistered, forbidden or failed overlay URLs.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `error` | `unknown` |

#### Returns

`void` \| `Promise`\<`unknown`\>

***

### supportsPath

```ts
readonly supportsPath: (path) => boolean;
```

Defined in: [context-overlay/IContextOverlayRoutingOptions.ts:4](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayRoutingOptions.ts#L4)

Selects the application paths allowed to host overlay URLs.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

#### Returns

`boolean`
