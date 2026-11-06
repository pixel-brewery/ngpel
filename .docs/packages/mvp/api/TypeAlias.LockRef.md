---
title: 'Type Alias: LockRef'
generated: true
editUrl: false
---
# Type Alias: LockRef

```ts
type LockRef = {
  enter: void;
  leave: void;
};
```

Defined in: [refs/LockRef.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/refs/LockRef.ts#L6)

Controls a nestable interaction lock.

## Methods

### enter()

```ts
enter(): void;
```

Defined in: [refs/LockRef.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/refs/LockRef.ts#L12)

Acquires one interaction lock.

#### Returns

`void`

***

### leave()

```ts
leave(): void;
```

Defined in: [refs/LockRef.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/refs/LockRef.ts#L17)

Releases one interaction lock.

#### Returns

`void`
