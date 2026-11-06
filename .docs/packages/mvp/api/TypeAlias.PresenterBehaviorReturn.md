---
title: 'Type Alias: PresenterBehaviorReturn\<TBase, TBehavior\>'
generated: true
editUrl: false
---
# Type Alias: PresenterBehaviorReturn\<TBase, TBehavior\>

```ts
type PresenterBehaviorReturn<TBase, TBehavior> = (...args) => TBehavior & TBase;
```

Defined in: [behaviors/PresenterBehaviorReturn.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/PresenterBehaviorReturn.ts#L13)

Result of applying a presenter behavior: the base class constructor intersected with the
behavior's own contract, so composed presenters keep every member of every applied behavior.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TBase` | - | The constructor type the behavior was applied to. |
| `TBehavior` | `object` | The contract the behavior adds. |

## Remarks

The rest parameter must stay `any[]` for the same reason as in [PresenterBehaviorBase](TypeAlias.PresenterBehaviorBase):
TypeScript only accepts a mixin constructor declared that way.
