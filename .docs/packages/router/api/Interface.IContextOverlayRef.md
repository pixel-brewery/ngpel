---
title: 'Interface: IContextOverlayRef\<TResult\>'
generated: true
editUrl: false
---
# Interface: IContextOverlayRef\<TResult\>

Defined in: [context-overlay/IContextOverlayRef.ts:9](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayRef.ts#L9)

A mounted surface owned by a contextual overlay target.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TResult` | `unknown` | The surface's close result. |

## Properties

### closed

```ts
readonly closed: Observable<TResult>;
```

Defined in: [context-overlay/IContextOverlayRef.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayRef.ts#L11)

Emits the close result, or completes when the surface closes without a result.

## Methods

### close()

```ts
close(): void;
```

Defined in: [context-overlay/IContextOverlayRef.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayRef.ts#L13)

Closes the surface and settles its `closed` stream.

#### Returns

`void`

***

### onOpened()?

```ts
optional onOpened(): void;
```

Defined in: [context-overlay/IContextOverlayRef.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayRef.ts#L15)

Runs after the coordinator starts observing the mounted surface.

#### Returns

`void`
