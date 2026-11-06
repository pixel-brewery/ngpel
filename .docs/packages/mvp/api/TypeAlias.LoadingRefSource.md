---
title: 'Type Alias: LoadingRefSource'
generated: true
editUrl: false
---
# Type Alias: LoadingRefSource

```ts
type LoadingRefSource =
  | LoadingRef
  | {
  loadingRef: LoadingRef;
};
```

Defined in: [commands/LoadingRefSource.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/commands/LoadingRefSource.ts#L13)

Where an asynchronous command reports its loading state: a [LoadingRef](TypeAlias.LoadingRef) itself or an owner that
exposes one (typically a view presenter), so `asyncCommand(handler, gate, this)` reads naturally.
