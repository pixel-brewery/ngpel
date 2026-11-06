---
title: 'Function: Pageable()'
generated: true
editUrl: false
---
# Function: Pageable()

```ts
function Pageable<T>(base, pageSize?): PresenterBehaviorReturn<T, IPageable>;
```

Defined in: [behaviors/Pageable.ts:49](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/Pageable.ts#L49)

Adds a paging window and a page-change command to a presenter.

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`PresenterBehaviorBase`](TypeAlias.PresenterBehaviorBase) |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `base` | `T` | `undefined` | The class to extend. |
| `pageSize` | `number` | `DEFAULT_PAGE_SIZE` | Items per page; defaults to [DEFAULT\_PAGE\_SIZE](Variable.DEFAULT_PAGE_SIZE). |

## Returns

[`PresenterBehaviorReturn`](TypeAlias.PresenterBehaviorReturn)\<`T`, [`IPageable`](Interface.IPageable)\>

An abstract class that additionally implements [IPageable](Interface.IPageable).

## Remarks

The behavior owns `skip`/`take`/`total` and derives the one-based `currentPage` from them;
reloading is left to the presenter, which overrides `onPageChanged()`. The command normalises the
three shapes a paginator commonly emits without binding the behavior to any UI library.

## Example

```typescript
class OrderListViewPresenter extends Pageable(ViewPresenter, 50) {
    public override onPageChanged(): void {
        this.load();
    }
}
```
