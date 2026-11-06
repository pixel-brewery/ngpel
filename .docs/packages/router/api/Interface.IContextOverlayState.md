---
title: 'Interface: IContextOverlayState'
generated: true
editUrl: false
---
# Interface: IContextOverlayState

Defined in: [context-overlay/IContextOverlayState.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayState.ts#L6)

Address of one contextual overlay. Omitting the identifier selects the target's create mode.

## Properties

### context?

```ts
readonly optional context?: string;
```

Defined in: [context-overlay/IContextOverlayState.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayState.ts#L12)

Optional addressable context interpreted by the target.

***

### id?

```ts
readonly optional id?: string;
```

Defined in: [context-overlay/IContextOverlayState.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayState.ts#L10)

Identifier of an existing resource.

***

### key

```ts
readonly key: string;
```

Defined in: [context-overlay/IContextOverlayState.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/context-overlay/IContextOverlayState.ts#L8)

Registered target key.
