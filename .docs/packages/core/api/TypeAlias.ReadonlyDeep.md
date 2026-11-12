---
title: 'Type Alias: ReadonlyDeep\<T\>'
generated: true
editUrl: false
---
# Type Alias: ReadonlyDeep\<T\>

```ts
type ReadonlyDeep<T> = T extends ReadonlyDeepAtom ? T : T extends ReadonlyArray<infer TItem> ? ReadonlyArray<ReadonlyDeep<TItem>> : T extends ReadonlyMap<infer TKey, infer TValue> ? ReadonlyMap<ReadonlyDeep<TKey>, ReadonlyDeep<TValue>> : T extends ReadonlySet<infer TItem> ? ReadonlySet<ReadonlyDeep<TItem>> : T extends object ? { readonly [TKey in keyof T]: ReadonlyDeep<T[TKey]> } : T;
```

Defined in: [search/models/ReadonlyDeep.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ReadonlyDeep.ts#L11)

Recursively marks `T` and everything reachable from it as `readonly`. Dates, regular expressions
and functions keep their identity instead of being mapped structurally.

The type is inlined on purpose: the payload of a search result must be immutable for consumers,
but that guarantee may not cost the entry point a `type-fest` peer dependency.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The type to freeze structurally. |
