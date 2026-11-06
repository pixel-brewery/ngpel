---
title: 'Function: Hydratable()'
generated: true
editUrl: false
---
# Function: Hydratable()

```ts
function Hydratable<T>(base): PresenterBehaviorReturn<T, IHydratable>;
```

Defined in: [behaviors/Hydratable.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/Hydratable.ts#L39)

Adds a one-time initial hydration to a presenter, separate from the loading state of everything
that happens afterwards.

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`PresenterBehaviorBase`](TypeAlias.PresenterBehaviorBase) |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `base` | `T` | The class to extend. |

## Returns

[`PresenterBehaviorReturn`](TypeAlias.PresenterBehaviorReturn)\<`T`, [`IHydratable`](Interface.IHydratable)\>

An abstract class that additionally implements [IHydratable](Interface.IHydratable).

## Remarks

The presenter starts out hydrating, before the first render, and leaves that state when the
operation returned by `onHydrate()` completes, fails, or is torn down — an unsubscribed stream
ends hydration too, so a cancelled load never strands the View in a skeleton. Each
`initialize()` starts a new generation: a completion belonging to an earlier one is ignored, so
a re-initialize or a disposal cannot be undone by a straggler. An empty hydration is finished in
a microtask rather than synchronously, because a synchronous finish inside `ngOnInit` can leave
an `OnPush` control-flow block empty. Whichever shape the operation had, hydration ends before
`onHydrationError()` runs, so a handler that reads `isHydrating()` always sees the settled state.

## Example

```typescript
class OrderViewPresenter extends Hydratable(ViewPresenter) {
    public override onHydrate(): HydrationOperation {
        return this._orders.load();
    }
}
```
