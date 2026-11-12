---
title: 'Type Alias: PresenterBehaviorBase'
generated: true
editUrl: false
---
# Type Alias: PresenterBehaviorBase

```ts
type PresenterBehaviorBase = abstract new (...args) => ViewPresenter;
```

Defined in: [behaviors/PresenterBehaviorBase.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/PresenterBehaviorBase.ts#L18)

Constraint every presenter behavior places on the class it is applied to: an abstract constructor
producing a [ViewPresenter](Class.ViewPresenter).

## Parameters

| Parameter | Type |
| ------ | ------ |
| ...`args` | `any`[] |

## Returns

[`ViewPresenter`](Class.ViewPresenter)

## Remarks

TypeScript accepts a class expression extending a generic base only when that base is declared
with a single rest parameter of type `any[]` (TS2545), so the parameter list cannot be narrowed.
Behaviors never read these arguments; they only forward them to the base constructor.
