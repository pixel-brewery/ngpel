---
title: 'Interface: IPreventableCloseAttempt'
generated: true
editUrl: false
---
# Interface: IPreventableCloseAttempt

Defined in: [rx/operators/IPreventableCloseAttempt.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/operators/IPreventableCloseAttempt.ts#L6)

Close attempt contract for implicit interactions (backdrop click, Escape) that can be cancelled.

## Methods

### preventClose()

```ts
preventClose(): void;
```

Defined in: [rx/operators/IPreventableCloseAttempt.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/operators/IPreventableCloseAttempt.ts#L12)

Prevents the current implicit close operation.

#### Returns

`void`
