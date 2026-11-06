---
title: 'Function: Lockable()'
generated: true
editUrl: false
---
# Function: Lockable()

```ts
function Lockable<T>(base): PresenterBehaviorReturn<T, ILockable>;
```

Defined in: [behaviors/Lockable.ts:55](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/Lockable.ts#L55)

Adds a nestable interaction lock around critical presenter operations.

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`PresenterBehaviorBase`](TypeAlias.PresenterBehaviorBase) |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `base` | `T` | The class to extend. |

## Returns

[`PresenterBehaviorReturn`](TypeAlias.PresenterBehaviorReturn)\<`T`, [`ILockable`](Interface.ILockable)\>

An abstract class that additionally implements [ILockable](Interface.ILockable).

## Remarks

Explicit locks are independent of the presenter's loading state, so background reads stay
non-blocking while a save, an upload or a delete can block the whole View. Locks are counted:
nested and parallel operations keep the View locked until the last one settles. When the
presenter is composed with `Hydratable` — in either order — `isInteractionLocked` additionally
covers the initial hydration.

## Example

```typescript
class OrderViewPresenter extends Lockable(Hydratable(ViewPresenter)) {
    public save(): Promise<void> {
        return this.runLocked(() => this._orders.save());
    }
}
```
