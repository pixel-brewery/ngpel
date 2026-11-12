---
title: 'Type Alias: IUserPreferenceCodec\<T\>'
generated: true
editUrl: false
---
# Type Alias: IUserPreferenceCodec\<T\>

```ts
type IUserPreferenceCodec<T> = IValueCodec<unknown, T>;
```

Defined in: [storage/preferences/IUserPreferenceCodec.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/IUserPreferenceCodec.ts#L14)

A codec over the JSON payload of a user preference. The storage adapter owns the JSON
serialization, so the codec sees the parsed payload as `unknown` and must validate it.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The preference value type. |
