---
title: 'Interface: IOperationIdFactory'
generated: true
editUrl: false
---
# Interface: IOperationIdFactory

Defined in: [operation-queue/identity/interfaces/IOperationIdFactory.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/identity/interfaces/IOperationIdFactory.ts#L10)

Strategy for generating unique operation entry identifiers.

## Methods

### create()

```ts
create(): string;
```

Defined in: [operation-queue/identity/interfaces/IOperationIdFactory.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/identity/interfaces/IOperationIdFactory.ts#L17)

Creates a new unique identifier string.

#### Returns

`string`

A unique identifier.
