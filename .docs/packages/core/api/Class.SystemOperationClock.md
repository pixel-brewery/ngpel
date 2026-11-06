---
title: 'Class: SystemOperationClock'
generated: true
editUrl: false
---
# Class: SystemOperationClock

Defined in: [operation-queue/scheduling/SystemOperationClock.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/scheduling/SystemOperationClock.ts#L12)

Clock implementation delegating to Date.now.

## Implements

- [`IOperationClock`](Interface.IOperationClock)

## Constructors

### Constructor

```ts
new SystemOperationClock(): SystemOperationClock;
```

#### Returns

`SystemOperationClock`

## Methods

### now()

```ts
now(): number;
```

Defined in: [operation-queue/scheduling/SystemOperationClock.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/scheduling/SystemOperationClock.ts#L21)

Returns the current timestamp in milliseconds.

#### Returns

`number`

Current system time.

#### Implementation of

[`IOperationClock`](Interface.IOperationClock).[`now`](Interface.IOperationClock#now)
