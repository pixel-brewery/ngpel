---
title: 'Function: Closeable()'
generated: true
editUrl: false
---
# Function: Closeable()

```ts
function Closeable<T>(base): PresenterBehaviorReturn<T, ICloseable>;
```

Defined in: [behaviors/Closeable.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/Closeable.ts#L32)

Adds a close command with its own enable gate to a presenter.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` *extends* [`PresenterBehaviorBase`](TypeAlias.PresenterBehaviorBase) |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `base` | `T` | The class to extend. |

## Returns

[`PresenterBehaviorReturn`](TypeAlias.PresenterBehaviorReturn)\<`T`, [`ICloseable`](Interface.ICloseable)\>

An abstract class that additionally implements [ICloseable](Interface.ICloseable).

## Remarks

The behavior owns the command and the gate; what closing means stays with the presenter, which
overrides `onExecuteClose()`. Executing the command while the gate is closed does nothing, so a
View can bind the command unconditionally.

## Example

```typescript
class OrderDialogViewPresenter extends Closeable(ViewPresenter) {
    public override onExecuteClose(): void {
        this._dialog.close();
    }
}
```
