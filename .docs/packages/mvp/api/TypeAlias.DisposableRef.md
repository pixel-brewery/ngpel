---
title: 'Type Alias: DisposableRef'
generated: true
editUrl: false
---
# Type Alias: DisposableRef

```ts
type DisposableRef = {
  dispose(): void;
};
```

Defined in: [refs/DisposableRef.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/refs/DisposableRef.ts#L6)

Represents a type that can be disposed.

## Extended by

- [`IViewPresenter`](Interface.IViewPresenter)

## Methods

### dispose()

```ts
dispose(): void;
```

Defined in: [refs/DisposableRef.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/refs/DisposableRef.ts#L12)

Disposes the instance and releases resources.

#### Returns

`void`
