---
title: 'Type Alias: AbortRef'
generated: true
editUrl: false
---
# Type Alias: AbortRef

```ts
type AbortRef = {
  abort(): void;
  signal: AbortSignal;
};
```

Defined in: [refs/AbortRef.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/refs/AbortRef.ts#L6)

Represents a reference to an AbortController's signal and abort method.

## Properties

### signal

```ts
readonly signal: AbortSignal;
```

Defined in: [refs/AbortRef.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/refs/AbortRef.ts#L12)

AbortSignal to be passed to async operations.

## Methods

### abort()

```ts
abort(): void;
```

Defined in: [refs/AbortRef.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/refs/AbortRef.ts#L21)

Aborts the current operation.

#### Returns

`void`
