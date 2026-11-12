---
title: 'Type Alias: LoadingRef'
generated: true
editUrl: false
---
# Type Alias: LoadingRef

```ts
type LoadingRef = {
  enter(): void;
  leave(): void;
};
```

Defined in: [refs/LoadingRef.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/refs/LoadingRef.ts#L6)

Defines a reference for managing loading states.

## Methods

### enter()

```ts
enter(): void;
```

Defined in: [refs/LoadingRef.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/refs/LoadingRef.ts#L12)

Indicates the start of a loading operation.

#### Returns

`void`

***

### leave()

```ts
leave(): void;
```

Defined in: [refs/LoadingRef.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/refs/LoadingRef.ts#L17)

Indicates the end of a loading operation.

#### Returns

`void`
