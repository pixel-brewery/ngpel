---
title: 'Interface: IRefreshable'
generated: true
editUrl: false
---
# Interface: IRefreshable

Defined in: [behaviors/IRefreshable.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IRefreshable.ts#L13)

Contract for a presenter whose current projection can be reloaded on demand.

## Properties

### canRefresh

```ts
readonly canRefresh: Signal<boolean>;
```

Defined in: [behaviors/IRefreshable.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IRefreshable.ts#L24)

Whether a refresh can start without overlapping an active load.

***

### refreshCommand

```ts
readonly refreshCommand: Command<void>;
```

Defined in: [behaviors/IRefreshable.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IRefreshable.ts#L19)

Command that reloads the presenter's current projection.

## Methods

### onExecuteRefresh()

```ts
onExecuteRefresh(): void;
```

Defined in: [behaviors/IRefreshable.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/IRefreshable.ts#L37)

Reloads the current projection when the refresh command executes.

#### Returns

`void`

#### Remarks

Public because TypeScript mixins cannot declare protected extension points. Override in a
concrete presenter; Views invoke [IRefreshable.refreshCommand](#refreshcommand) instead.
