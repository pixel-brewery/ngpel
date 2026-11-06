---
title: 'Interface: IOperationClock'
generated: true
editUrl: false
---
# Interface: IOperationClock

Defined in: [operation-queue/scheduling/interfaces/IOperationClock.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/scheduling/interfaces/IOperationClock.ts#L10)

Abstraction over the system clock, enabling deterministic testing.

## Methods

### now()

```ts
now(): number;
```

Defined in: [operation-queue/scheduling/interfaces/IOperationClock.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/scheduling/interfaces/IOperationClock.ts#L17)

Returns the current timestamp in milliseconds.

#### Returns

`number`

Current time in milliseconds.
