---
title: 'Class: CryptoOperationIdFactory'
generated: true
editUrl: false
---
# Class: CryptoOperationIdFactory

Defined in: [operation-queue/identity/CryptoOperationIdFactory.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/identity/CryptoOperationIdFactory.ts#L12)

Generates operation IDs using the Web Crypto API with a Math.random fallback.

## Implements

- [`IOperationIdFactory`](Interface.IOperationIdFactory)

## Constructors

### Constructor

```ts
new CryptoOperationIdFactory(): CryptoOperationIdFactory;
```

#### Returns

`CryptoOperationIdFactory`

## Methods

### create()

```ts
create(): string;
```

Defined in: [operation-queue/identity/CryptoOperationIdFactory.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/operation-queue/identity/CryptoOperationIdFactory.ts#L21)

Creates a new unique identifier.

#### Returns

`string`

A UUID v4 string or a pseudo-random fallback.

#### Implementation of

[`IOperationIdFactory`](Interface.IOperationIdFactory).[`create`](Interface.IOperationIdFactory#create)
