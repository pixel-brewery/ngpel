---
title: 'Type Alias: LocalStorageCodec\<T\>'
generated: true
editUrl: false
---
# Type Alias: LocalStorageCodec\<T\>

```ts
type LocalStorageCodec<T> = IValueCodec<string, T>;
```

Defined in: [storage/codecs/LocalStorageCodec.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/codecs/LocalStorageCodec.ts#L15)

A codec over the string representation of Web Storage (`localStorage`/`sessionStorage`).
Every built-in codec of this package (`stringCodec`, `booleanCodec`, `jsonCodec`, ...) has this
shape; `fromNullable` lifts it to `string | null` for URL parameters.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The typed application value. |
