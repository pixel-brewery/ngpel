---
title: 'Type Alias: HydrationOperation'
generated: true
editUrl: false
---
# Type Alias: HydrationOperation

```ts
type HydrationOperation = Observable<unknown> | Promise<unknown> | undefined;
```

Defined in: [behaviors/HydrationOperation.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/HydrationOperation.ts#L13)

What a presenter may return from `onHydrate()`: a stream, a promise, or `undefined` when the
initial presentation needs no asynchronous data.
