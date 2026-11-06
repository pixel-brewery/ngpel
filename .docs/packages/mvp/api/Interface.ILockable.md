---
title: 'Interface: ILockable'
generated: true
editUrl: false
---
# Interface: ILockable

Defined in: [behaviors/ILockable.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ILockable.ts#L14)

Contract of the Lockable presenter behavior: a nestable interaction lock the View can bind to
while a mutation must not be interrupted.

## Properties

### isInteractionLocked

```ts
readonly isInteractionLocked: Signal<boolean>;
```

Defined in: [behaviors/ILockable.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ILockable.ts#L26)

Whether the View must currently prevent interaction. Covers explicit locks and, when the
presenter is also composed with `Hydratable`, the initial hydration phase.

***

### isLocked

```ts
readonly isLocked: Signal<boolean>;
```

Defined in: [behaviors/ILockable.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ILockable.ts#L20)

Whether at least one explicit interaction lock is held.

***

### lockRef

```ts
readonly lockRef: LockRef;
```

Defined in: [behaviors/ILockable.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ILockable.ts#L35)

Lock reference for commands and manually coordinated operations.

#### Remarks

Public because TypeScript mixins cannot declare protected members. It is a subclass
integration point — do not bind it from a template.

## Methods

### runLocked()

```ts
runLocked<T>(operation): Promise<T>;
```

Defined in: [behaviors/ILockable.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/ILockable.ts#L53)

Runs an operation with the interaction lock held and always releases it, including when the
operation throws or rejects.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The result of the operation. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `operation` | () => `T` \| `PromiseLike`\<`T`\> | The operation to run while locked. |

#### Returns

`Promise`\<`T`\>

The result of the operation.

#### Remarks

Public because TypeScript mixins cannot declare protected members. It is a subclass
integration point — do not call it from a template.
