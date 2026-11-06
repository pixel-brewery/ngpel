---
title: 'Variable: VIEW\_PRESENTER'
generated: true
editUrl: false
---
# Variable: VIEW\_PRESENTER

```ts
const VIEW_PRESENTER: InjectionToken<IViewPresenter>;
```

Defined in: [presenters/VIEW\_PRESENTER.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/VIEW_PRESENTER.ts#L18)

Token a [View](Class.View) resolves its presenter through. Views provide the concrete presenter in
component-level DI, typically via [provideViewPresenter](Function.provideViewPresenter).

## Remarks

The token is compared by identity, so an application must resolve every provider site against
this single token; two copies of the package would produce two incompatible tokens.
